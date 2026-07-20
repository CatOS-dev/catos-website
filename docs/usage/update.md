---
title: 更新系统
sidebar_position: 6
---

# 更新系统

CatOS 基于 Arch Linux，采用滚动更新。更新通常同时涉及 Arch、CatOS，以及用户选择启用的 CachyOS 或 AUR 软件。

## 更新前

建议先完成：

```bash
checkupdates
```

`checkupdates` 由 `pacman-contrib` 提供，用于在不改变系统软件包数据库状态的情况下查看可用更新。

如果根文件系统使用 Btrfs，可以查看最近快照：

```bash
snapper list
```

CatOS 会在启动关键文件变化或大型软件事务前创建系统快照，但快照不能代替数据备份。

## 执行完整更新

只使用 Arch 和 CatOS 仓库时：

```bash
sudo pacman -Syu
```

还需要更新 AUR 软件时，使用长期选择的一个 AUR 助手：

```bash
yay -Syu
```

或：

```bash
paru -Syu
```

不要并行运行多个更新前端。

## 更新时应阅读什么

重点关注：

- 软件包替换和冲突提示；
- `.pacnew`、`.pacsave` 文件；
- 内核、initramfs、DKMS 和显卡驱动输出；
- 启动器配置生成是否成功；
- AUR 构建脚本是否变化；
- 仓库签名或密钥错误。

查找需要合并的配置：

```bash
sudo find /etc -name '*.pacnew' -o -name '*.pacsave'
```

不要直接覆盖旧配置，应比较差异后合并。

## 更新后是否需要重启

Linux 不要求每次更新都重启，但出现以下情况时建议重启：

- 内核或 CPU 微码更新；
- NVIDIA、AMD GPU 驱动栈更新；
- systemd、glibc 等基础组件更新；
- 当前运行程序仍在使用已经替换的共享库；
- 启动器、initramfs 或磁盘解锁配置变化。

重启前先确认更新过程没有报错。

## 常见错误

### 数据库锁

先确认没有 pacman、Discover、yay 或 paru 正在运行，不要在包管理器工作时删除锁文件。

### 镜像同步不一致

刷新镜像或稍后重试，不要通过忽略依赖、强制覆盖文件来绕过仓库同步问题。

### 签名错误

先检查系统时间和密钥包：

```bash
timedatectl
sudo pacman -Sy archlinux-keyring catos-keyring
sudo pacman -Su
```

这里将刷新数据库与更新操作连续执行，不能在 `pacman -Sy` 后中止并继续日常使用。

### 更新后无法启动

使用 Btrfs 且启用了兼容的启动器快照集成时，可以从启动菜单进入更新前快照进行诊断。详细说明见[快照与恢复](../system/snapshots.md)。
