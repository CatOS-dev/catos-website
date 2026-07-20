---
title: 启动方式与快照
sidebar_position: 6
description: 比较 GRUB、Limine、systemd-boot、UKI 和 EFI Stub，并说明 CatOS 的 Snapper 快照与启动集成。
---

# 启动方式与快照

在线安装允许选择启动方式。不同方案支持的固件、EFI 系统分区大小和快照能力不同。

## 如何选择

| 启动方式 | 固件支持 | ESP 建议值 | 可启动 Btrfs 快照 | 建议用户 |
| --- | --- | ---: | --- | --- |
| GRUB | UEFI、传统 BIOS | 300 MiB | 支持 | 兼容性优先、双系统、传统 BIOS |
| Limine | UEFI + GPT | 2 GiB | 支持 | 希望使用现代、配置清晰的启动器 |
| systemd-boot | UEFI + GPT | 2 GiB | 支持 | 希望使用精简 UEFI 启动管理器 |
| UKI | UEFI + GPT | 2 GiB | 当前不支持 | 熟悉统一内核镜像和 UEFI 的高级用户 |
| EFI Stub | UEFI + GPT | 2 GiB | 当前不支持 | 希望由固件直接启动 Linux 内核的高级用户 |

### GRUB

默认且兼容性最广：

- 支持 UEFI 和传统 BIOS；
- 适合双系统；
- 使用 `grub-btrfs` 生成 Btrfs 快照菜单；
- 在 GPT + BIOS 下可能需要 BIOS Boot 分区。

不确定时选择 GRUB。

### Limine

CatOS 使用 `limine-tool` 管理 Limine 启动配置，并使用 `limine-btrfs` 生成和验证快照条目。

要求：

- UEFI；
- GPT；
- 至少 1 GiB ESP，建议 2 GiB。

### systemd-boot

精简的 UEFI 启动管理器，CatOS 通过 `kernel-install` 和 `catos-systemd-boot-config` 管理内核条目，并使用 `sdboot-btrfs` 生成快照入口。

要求：

- UEFI；
- GPT；
- 至少 1 GiB ESP，建议 2 GiB。

### Unified Kernel Image（UKI）

将内核、initramfs 和命令行组合为统一 EFI 可执行文件。适合希望围绕 UKI、签名和固件启动构建系统的高级用户。

当前 CatOS 的 UKI 方案不提供可启动 Btrfs 快照集成。

### Linux EFI Stub

将 Linux 内核作为 EFI 应用，由固件启动项直接启动。结构简单，但对固件行为、ESP 管理和内核更新流程要求更高。

当前 CatOS 的 EFI Stub 方案不提供可启动 Btrfs 快照集成。

## 快照何时可用

CatOS 的系统快照要求：

1. 根文件系统使用 Btrfs；
2. 启动方式支持快照集成；
3. 安装器成功建立 Snapper 根配置和对应启动工具。

当前支持组合：

```text
GRUB         + Btrfs → Snapper + grub-btrfs
Limine       + Btrfs → Snapper + limine-btrfs
systemd-boot + Btrfs → Snapper + sdboot-btrfs
UKI          + Btrfs → 安装器不配置快照；需要安装后自行配置 Snapper
EFI Stub     + Btrfs → 安装器不配置快照；需要安装后自行配置 Snapper
```

## CatOS 自动快照策略

CatOS 使用 `catos-snapper-config` 管理事务前快照。它不会为每一个小软件包操作都创建快照。

默认在以下情况创建单一的预事务快照：

- 事务修改内核、initramfs、固件、DKMS、UKI、加密或其他启动关键路径；
- 一次事务涉及至少 25 个不同软件包。

快照会记录创建原因和软件包数量。系统默认启用数量清理，不默认创建每小时快照。

## 启动快照和回滚不是一回事

从快照启动用于验证旧系统状态能否正常运行。真正恢复系统可能还需要执行 Snapper 回滚或其他明确操作。

不要把快照当作备份：

- 快照通常与原系统位于同一块磁盘；
- 磁盘损坏会同时影响原系统和快照；
- 用户重要文件仍应备份到其他磁盘或远端；
- `/boot` 或 ESP 中的启动资源需要由对应启动集成单独管理。

## 安装后检查

Btrfs 安装完成后可执行：

```bash
findmnt /
snapper list
systemctl status snapper-cleanup.timer
```

再根据启动方式检查菜单或配置。详见[安装完成后的检查](./post-installation.md)。
