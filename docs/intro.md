---
sidebar_position: 1
slug: /intro
title: 简介
description: 了解 CatOS 的定位、滚动更新方式、安装介质、桌面选择、Secure Boot 与配置管理方式。
---

# 简介

CatOS 是一个**开源、基于 Arch Linux、面向桌面与日常使用场景**的 Linux 发行版。它保留 Arch Linux 的滚动更新、`pacman`、AUR 和标准系统结构，同时把安装器、软件仓库、硬件支持、桌面预设、主题与常用系统集成整理成可以直接部署的一套发行版。

当前下载页提供的最新安装介质是 **CatOS 2026.08.05**。CatOS 本身采用滚动更新，因此除发布日志、ISO 下载和特定安装介质说明外，本站的使用、桌面和系统维护文档以 **CatOS 软件仓库当前发布的软件包状态**为准，而不是停留在 ISO 制作当天。

## CatOS 解决什么问题

直接安装 Arch Linux 可以获得高度自由的基础系统，但用户通常还需要自行完成分区、引导、图形桌面、输入法、显卡驱动、软件源、主题和常用工具配置。CatOS 将这些工作放进发行版和安装器中，让用户可以从一个可工作的 Live 环境开始，并通过图形化流程得到完整系统。

CatOS 不试图隐藏 Arch Linux。安装完成后仍然可以直接使用：

- `pacman` 和 Arch Linux 官方仓库；
- CatOS 软件仓库；
- AUR，以及 `yay`、`paru` 等常用工具；
- ArchWiki 和上游软件文档；
- 标准 systemd、Btrfs、Wayland/X11 和 Linux 配置方式。

## 两种安装方式

CatOS 2026.08.05 提供两条安装路径：

- **离线安装**：把 Live 系统复制到目标磁盘，适合希望快速获得与 Live 环境接近的默认系统，或安装时网络不可用的场景；
- **在线安装**：按选择重新部署软件包，可选择桌面、启动方式、内核、软件源、Shell、开发/虚拟化组件和其他软件。

两种安装方式都使用 Calamares，并共享分区、用户、启动和 Secure Boot 等基础安装能力。具体区别见[安装概览](./installation/overview.md)。

## 桌面不是只有一种

安装器当前提供 **16 种图形桌面或窗口管理器方案**，以及 **No Desktop** 基础系统选项。

KDE Plasma 是默认且测试覆盖最完整的桌面选项；同时也提供 GNOME、Xfce、Cinnamon、COSMIC、Deepin，以及 Niri + DMS、Niri + Noctalia、Hyprland + DMS、Sway、Labwc、Wayfire 等不同工作流。

部分 Wayland 桌面使用 [Catdot](./usage/catdot.md) Profile 管理用户配置。Catdot 会区分发行版管理的配置和一次性种子文件，并在覆盖用户配置前创建备份。

完整列表见[桌面环境与窗口管理器](./desktops.md)。

## 启动链与 Secure Boot

CatOS 2026.08.05 的发布镜像支持 UEFI Secure Boot。安装器在 Secure Boot 环境中可以为受支持的启动方式建立安装后签名链，并由 `catos-secureboot` 继续维护内核、外部模块和 EFI 启动文件的签名状态。

在线安装当前提供 GRUB、Limine、rEFInd、systemd-boot、UKI 和 EFI Stub 六种启动方式；其中 GRUB、Limine、systemd-boot 和 UKI 支持 CatOS 的自动 Secure Boot 集成。

详细说明见 [Secure Boot](./system/secure-boot.md) 和[启动方式与快照](./installation/boot-and-snapshots.md)。

## 选择正确的镜像

当前发布提供：

- **标准版**：面向 Intel、AMD 和不需要现代 NVIDIA 专用驱动环境的设备；
- **NVIDIA 版**：面向需要现代 NVIDIA 驱动的设备，特别是较新的 GeForce GTX/RTX 系列。

具体型号范围、下载地址和 SHA-256 校验值见[下载 CatOS](./download.md)。

## 滚动更新与配置更新

CatOS 跟随 Arch Linux 的滚动更新模型，不需要等待下一张 ISO 才能获取日常软件更新。系统软件包通过 `pacman` 更新；如果当前桌面使用 Catdot，Profile 的用户配置修订则由用户显式执行 `catdot update` 接受，两者是独立层次。

更新方式见[更新系统](./usage/update.md)。

## 从这里开始

- [为什么选择 CatOS](./why.md)：了解发行版功能和适用场景；
- [下载 CatOS](./download.md)：选择标准版或 NVIDIA 版并校验镜像；
- [安装前准备](./installation/preparation.md)：制作启动盘并检查 UEFI、磁盘和网络；
- [安装概览](./installation/overview.md)：选择离线或在线安装；
- [安装后检查](./installation/post-installation.md)：首次启动后检查更新、驱动、启动器和 Secure Boot。
