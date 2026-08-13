---
title: 在线安装
sidebar_position: 4
description: 从软件仓库安装 CatOS，并选择仓库、启动器、桌面、驱动和附加软件。
---

# 在线安装

在线安装从软件仓库构建目标系统，而不是复制 Live 环境。它能够选择软件仓库、启动方式、桌面环境和附加软件，并在目标系统内运行 chwd 自动配置硬件驱动。

## 开始前

在线安装需要：

- 稳定网络；
- 正确的系统时间；
- 能够访问 Arch Linux、CatOS，以及选择后可能使用的 CachyOS 仓库；
- 足够的安装时间，软件包数量和网络速度都会影响完成时间。

网络中断或仓库同步异常可能导致安装失败。安装器会显示当前下载量、总下载量、速度和正在下载的软件包，并在失败时保留最近的软件包管理器输出、失败命令和退出状态。反馈问题时请一并提供安装日志。

## 安装流程

```text
选择语言、时区和键盘
        ↓
选择软件仓库
        ↓
选择启动方式
        ↓
磁盘分区和文件系统
        ↓
选择桌面环境或窗口管理器
        ↓
选择输入法、Shell、内核和附加软件
        ↓
创建用户并确认摘要
        ↓
从仓库安装基础系统和所选软件
        ↓
chwd 自动配置硬件驱动
        ↓
配置启动器和可用的快照集成
```

## 软件仓库选择

### CatOS 软件源

默认选项使用：

```text
Arch Linux 官方仓库
+ CatOS 软件仓库
```

适合希望保持标准 Arch 软件栈、减少额外软件来源的用户。CatOS 仓库提供安装器、桌面预设、主题、启动工具和发行版集成软件包。

### CatOS + CachyOS 软件源

此选项会：

- 保留 Arch Linux 和 CatOS 仓库；
- 根据当前 CPU 启用对应的 CachyOS 优化仓库；
- 安装 `linux-cachyos` 内核；
- 让后续系统更新同时依赖 CatOS 与 CachyOS 仓库。

这不是单纯更换下载镜像，而是改变部分软件包来源和默认内核。希望使用 CachyOS 优化内核与软件包时再选择它。

安装器只会在当前 CPU 支持 x86-64-v3 时显示 CachyOS 选项，避免在不支持对应优化级别的处理器上建立不可启动或无法更新的软件栈。

## 启动方式

在线安装目前提供：

- GRUB；
- Limine；
- rEFInd；
- systemd-boot；
- Unified Kernel Image（UKI）；
- Linux EFI Stub。

固件模式、分区表、EFI 系统分区大小、Secure Boot 状态以及快照需求都会影响选择。多数用户应选择 GRUB；仅 UEFI 设备可选择其他方案。

如果当前 Live 环境以 Secure Boot 启动，安装器只提供 GRUB、Limine、systemd-boot 和 UKI 等能够自动完成 Secure Boot 配置的方案。rEFInd 与 EFI Stub 会被隐藏。

详细比较见[启动方式与快照](./boot-and-snapshots.md)。

## 分区和文件系统

CatOS 默认文件系统是 Btrfs。安装器也提供 ext4、ext3、JFS、XFS 和 F2FS。

- 希望使用 Snapper 和可启动快照：选择 Btrfs；
- 希望使用结构简单、兼容广的传统文件系统：选择 ext4；
- 双系统或已有分区布局：使用手动分区并谨慎复用 EFI 系统分区。

详细说明见[磁盘分区与文件系统](./partitioning.md)。

## 桌面环境与窗口管理器

在线安装可以选择完整桌面、轻量桌面、Wayland 工作流，也可以安装不带图形界面的命令行系统。

安装器默认选择 KDE Plasma。每次安装只应选择一个主要桌面预设，以免引入重复应用、显示管理器或配置冲突。

Niri + DMS 与 Niri + Noctalia 使用 Catdot Profile 完成用户配置部署。安装器在软件包安装完成后使用验证模式激活 Profile，不会再次重复安装同一组软件包。

查看全部选项：[桌面环境与窗口管理器](/docs/desktops)。

## 输入法、Shell 和额外内核

安装器还可以选择：

- Fcitx5 或 IBus 输入法框架；
- Bash、Fish 或 Zsh 的 CatOS 配置；
- LTS、Mainline、Zen、Hardened 等额外内核；
- 其他终端模拟器；
- 音视频、图形设计和常用应用。

额外内核会增加磁盘占用和启动菜单条目。一般用户保留默认内核即可；需要备用内核或特定调度、安全特性时再添加。

## 开发、虚拟化和容器

可选内容包括：

- QEMU/KVM 与 Virt-Manager；
- VirtualBox；
- Docker；
- Podman；
- 开发工具；
- Distroshelf 多发行版环境；
- 浏览器、办公软件和聊天客户端。

这些选项由仓库实时安装，实际可用版本取决于安装时的软件仓库状态。

## 驱动自动配置

基础系统和桌面安装完成后，Calamares 会进入目标系统执行：

```bash
chwd --autoconfigure
```

chwd 根据 PCI 和 USB 设备匹配硬件配置文件，并安装显卡、网络、虚拟机客体和其他硬件所需的软件包及配置。

详细说明见[硬件驱动](./hardware-drivers.md)。

## 安装摘要

开始安装前，至少确认：

- 软件仓库选择；
- 启动方式；
- 目标磁盘和将被格式化的分区；
- 文件系统和 Swap；
- 桌面环境；
- 附加内核和软件；
- 用户名、计算机名和时区。

在线安装完成后，重启并按照[安装完成后的检查](./post-installation.md)验证系统。
