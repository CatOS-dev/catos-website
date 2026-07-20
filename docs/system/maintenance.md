---
title: 日常系统维护
sidebar_position: 1
description: CatOS 的更新、服务、磁盘、日志、软件包和内核日常检查。
---

# 日常系统维护

CatOS 不需要通过“系统清理工具”频繁重置配置。更可靠的维护方式是完整更新、检查失败服务、控制日志和软件包缓存、关注磁盘空间，并保留必要的恢复路径。

## 定期执行完整更新

```bash
sudo pacman -Syu
```

不要长期只更新某个基础包，也不要使用 `pacman -Sy` 制造部分更新状态。详细说明见[更新系统](../usage/update.md)。

## 检查失败的 systemd 服务

```bash
systemctl --failed
systemctl --user --failed
```

查看某个服务本次启动日志：

```bash
journalctl -b -u service-name
```

不要看到服务失败就直接禁用；先确认它是否属于当前硬件、桌面或可选功能。

## 检查本次启动的重要错误

```bash
journalctl -b -p warning
```

只查看错误级别：

```bash
journalctl -b -p err
```

日志中常会包含无害警告。应结合实际故障、时间和对应服务判断，而不是追求“日志完全没有红字”。

## 检查磁盘空间

```bash
df -h
lsblk -f
```

Btrfs 根文件系统还应查看数据和元数据空间：

```bash
sudo btrfs filesystem usage /
```

Btrfs 的 `df` 输出不能完整反映数据、元数据和未分配空间，因此磁盘接近满载时应同时检查 `btrfs filesystem usage`。

## 管理 pacman 缓存

安装 `pacman-contrib` 后：

```bash
sudo paccache -r
```

默认保留每个包的最近版本。不要经常删除全部旧包，否则更新回归时会失去方便的降级来源。

查看缓存占用：

```bash
du -sh /var/cache/pacman/pkg
```

## 检查孤立软件包

```bash
pacman -Qdtq
```

逐项确认后再决定是否删除。某些手动需要的软件可能只是没有被其他包声明为依赖。

## 管理 systemd 日志空间

查看占用：

```bash
journalctl --disk-usage
```

按总空间限制清理旧日志：

```bash
sudo journalctl --vacuum-size=500M
```

这只删除旧日志，不修复当前服务问题。

## 检查内核和模块

当前运行内核：

```bash
uname -r
```

已安装模块目录：

```bash
ls /usr/lib/modules
```

更新内核、DKMS 或 NVIDIA 驱动后，确认构建过程成功，再重启进入新内核。若当前运行内核已经没有对应模块目录，应尽快完成一次正常重启。

## 检查配置更新文件

```bash
sudo find /etc -name '*.pacnew' -o -name '*.pacsave'
```

`.pacnew` 是新版默认配置，`.pacsave` 是卸载或替换时保留的旧配置。应使用差异工具合并，不要机械覆盖。

## Btrfs scrub

Scrub 会读取并校验文件系统数据，在有冗余副本时尝试修复损坏。它不是磁盘健康检测，也不是备份。

查看状态：

```bash
sudo btrfs scrub status /
```

手动运行并等待完成：

```bash
sudo btrfs scrub start -Bd /
```

Scrub 会产生持续磁盘 I/O，笔记本应接通电源，并避免在磁盘高负载时运行。

## 维护前的基本原则

- 先读取命令输出，再执行删除或修复；
- 不同时运行多个包管理器；
- 不把快照当作数据备份；
- 不直接删除不认识的系统目录；
- 遇到启动、文件系统或驱动问题时，先保存日志和当前状态。
