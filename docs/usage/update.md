---
title: 更新系统
sidebar_position: 6
description: 完整更新 CatOS，并正确处理 AUR、Catdot Profile、Secure Boot 与更新后的重启和恢复。
---

# 更新系统

CatOS 基于 Arch Linux，采用滚动更新。一次更新可能同时涉及 Arch、CatOS、用户启用的 CachyOS 仓库，以及自行安装的 AUR 软件。

需要特别区分两件事：**软件包更新**和 **Catdot Profile 配置更新**不是同一个操作。`pacman -Syu` 可以安装新版 Profile 软件包，但不会自动替换用户已经接受的 Catdot 管理配置。

## 更新前

可以先查看仓库中有哪些更新：

```bash
checkupdates
```

`checkupdates` 由 `pacman-contrib` 提供，用于在不制造部分更新状态的情况下查看可用更新。

如果根文件系统使用 Btrfs，可以查看最近快照：

```bash
snapper list
```

CatOS 会在部分启动关键文件变化或大型软件事务前创建系统快照，但系统快照不能代替个人数据备份。

## 执行完整软件包更新

只使用仓库软件时：

```bash
sudo pacman -Syu
```

如果还需要更新 AUR 软件，长期使用一个 AUR 助手即可：

```bash
yay -Syu
```

或：

```bash
paru -Syu
```

不要同时运行 pacman、Discover、yay、paru 等多个包管理前端。

## 更新时应阅读什么

重点关注：

- 软件包替换、冲突和可选依赖提示；
- `.pacnew`、`.pacsave` 文件；
- 内核、initramfs、DKMS 和显卡驱动输出；
- 启动器配置或 EFI 文件更新是否成功；
- AUR PKGBUILD 或上游来源是否发生变化；
- 仓库签名、密钥和镜像同步错误。

查找需要合并的系统配置：

```bash
sudo find /etc -name '*.pacnew' -o -name '*.pacsave'
```

应比较差异后再合并，不要机械覆盖当前配置。

## Catdot：软件包升级不会自动接受新配置

如果当前桌面使用 Catdot，可以先确认活动 Profile：

```bash
catdot current
```

升级包含 Profile 的软件包后，`/usr/share/<profile-id>` 中可能已经有新版配置，但 Catdot 会继续使用用户此前接受的 managed 配置快照。要主动接受当前 Profile 的新版 managed 配置，执行：

```bash
catdot update
```

也可以更新指定的已保留 Profile：

```bash
catdot update catos-niri-dms
```

对于活动 Profile，Catdot 会在替换 managed 文件前把原文件备份到 `~/.local/state/catdot/backups/`；seed 文件不会因为 `catdot update` 再次覆盖。更新桌面 Profile 后，如窗口管理器、Shell 或 Portal 配置发生变化，可能需要注销并重新登录。

更多行为和恢复边界见 [Catdot](./catdot.md)。

## Secure Boot：相关更新由 hook 自动维护

如果安装后的系统已由 `catos-secureboot` 管理，内核、外部模块或启动文件发生相关软件包事务后，Pacman hook 会自动执行维护流程，包括等待 DKMS、签名外部模块、重新生成 initramfs、签名内核和 EFI 文件，并重新部署启动链。

正常更新后**不要反复执行 `catos-secureboot enable`**。需要确认状态时运行：

```bash
sudo catos-secureboot status
sudo catos-secureboot verify
```

如果仍处于 `enrollment-pending`，应先完成 MokManager 中的机器证书注册。详见 [Secure Boot](../system/secure-boot.md)。

## 更新后是否需要重启

Linux 不要求每次更新都重启，但出现以下情况时建议重启：

- 内核或 CPU 微码更新；
- NVIDIA、AMD GPU 驱动栈更新；
- systemd、glibc 等基础组件更新；
- 当前运行程序仍在使用已经替换的共享库；
- 启动器、initramfs、Secure Boot 或磁盘解锁配置变化。

重启前先确认软件包事务、DKMS 和启动链维护没有报错。

## 常见错误

### 数据库锁

先确认没有 pacman、Discover、yay 或 paru 正在运行。不要在包管理器工作时删除 `/var/lib/pacman/db.lck`。

### 镜像同步不一致

刷新镜像或稍后重试，不要通过忽略依赖或强制覆盖文件来绕过仓库同步问题。

### 签名或 keyring 错误

先检查系统时间和密钥包：

```bash
timedatectl
sudo pacman -Sy archlinux-keyring catos-keyring
sudo pacman -Su
```

这里的数据库刷新与完整更新必须连续完成。不要在 `pacman -Sy` 后中止更新并继续日常使用系统。

### 更新后无法启动

使用 Btrfs 且启用了兼容的启动器快照集成时，可以从启动菜单进入更新前快照进行诊断。详细说明见[快照与恢复](../system/snapshots.md)。
