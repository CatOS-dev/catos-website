---
title: 快照与恢复
sidebar_position: 2
description: CatOS 中 Btrfs、Snapper、软件事务快照和启动快照的工作方式。
---

# 快照与恢复

CatOS 使用 Btrfs 提供子卷快照能力，使用 Snapper 管理快照、描述和保留策略，并根据启动方式安装相应的启动快照集成。

快照主要用于系统更新和配置变更后的恢复。它不是个人文件备份，也不能防止整块磁盘损坏或丢失。

## 启用条件

CatOS 自动快照和可启动快照要求：

1. 根文件系统使用 Btrfs；
2. 安装器成功创建 Snapper 的 `root` 配置；
3. 选择支持快照集成的启动方式。

当前启动集成：

| 启动方式 | 快照菜单组件 |
| --- | --- |
| GRUB | `grub-btrfs` |
| Limine | `limine-btrfs` |
| systemd-boot | `sdboot-btrfs` |
| UKI | 安装器不自动配置启动快照 |
| EFI Stub | 安装器不自动配置启动快照 |

## CatOS 何时自动创建快照

`catos-snapper-config` 会在 pacman 事务执行前检查变更内容。

满足以下任一条件时创建单一预事务快照：

- 事务触及内核、initramfs、固件、DKMS、UKI、加密或其他启动关键路径；
- 一次事务涉及至少 25 个不同软件包。

普通的小型应用安装通常不会创建快照。CatOS 默认也不创建每小时快照。

查看策略配置：

```bash
cat /etc/catos-snapper.conf
```

## 查看快照

```bash
snapper list
```

查看某个快照的详细信息：

```bash
snapper status NUMBER..0
```

比较文件变化：

```bash
snapper diff NUMBER..0
```

快照描述和 userdata 会记录创建原因，例如：

```text
boot-critical
large-transaction
catos_package_count
```

## 手动创建快照

进行高风险配置修改前，可以创建单一快照：

```bash
sudo snapper -c root create \
  --type single \
  --cleanup-algorithm number \
  --description 'Before manual system change'
```

不要为每个小操作无限创建快照；快照共享数据块，但持续变化的系统仍会占用空间。

## 从快照启动和回滚的区别

### 从快照启动

启动器加载某个历史根文件系统视图，用于：

- 确认问题是否由最近更新引起；
- 临时进入可用系统；
- 保存日志和重要文件；
- 为正式恢复做准备。

从快照启动不等于已经永久回滚。

### 正式恢复

恢复会改变默认启动和根文件系统状态，必须确认：

- 目标快照时间正确；
- 内核和 initramfs 与该快照匹配；
- 新产生的数据和配置是否需要保留；
- 当前启动器支持的恢复流程。

不要在不了解子卷布局时手工修改默认 Btrfs 子卷或把只读快照直接改为可写。

## 为什么还需要捕获启动资源

根子卷快照不一定包含 `/boot` 中的内核和 initramfs。更新后只保留根文件系统，而没有匹配的启动资源，历史快照可能无法可靠启动。

因此 CatOS 的 GRUB、Limine 和 systemd-boot 集成会分别维护与快照对应的启动条目和所需资源，而不是只扫描 `.snapshots` 目录生成菜单文字。

## 清理快照

查看 Snapper 清理服务：

```bash
systemctl status snapper-cleanup.timer
```

CatOS 默认启用数量清理，并保留一定数量的普通和重要快照。手动删除前先查看：

```bash
snapper list
sudo btrfs filesystem usage /
```

删除指定快照：

```bash
sudo snapper delete NUMBER
```

不要删除当前恢复流程正在依赖的快照。

## 快照不是备份

Btrfs 快照通常仍位于同一文件系统和同一磁盘上，无法抵御：

- 磁盘物理损坏；
- 整盘误格式化；
- 设备丢失；
- 文件系统整体损坏；
- 同步程序把错误变更传播到所有副本。

重要数据仍应保存在独立磁盘或远程备份中。
