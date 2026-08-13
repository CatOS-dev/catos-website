---
sidebar_position: 2
title: 为什么选择 CatOS
description: CatOS 当前滚动系统的主要特点、安装介质与适用场景。
---

# 为什么选择 CatOS

CatOS 不只是预装桌面环境的 Arch Linux。它将安装器、桌面预设、软件仓库、硬件支持和常用工具作为同一个发行版进行整理，让系统安装完成后可以直接使用，同时保留 Arch Linux 的开放性和可定制性。

## 📤 开箱即用，但不限制用户

CatOS 默认提供中文输入环境、发行版主题、图标、壁纸、常用硬件组件、软件源和图形化工具，减少从基础系统开始逐项配置的工作。

这些默认配置不会隐藏 Arch Linux 的工作方式。用户仍然可以直接使用 `pacman`、AUR、ArchWiki 和标准的系统配置文件，也可以替换 CatOS 提供的任何桌面组件。

## 💻 图形化安装，选择仍在自己手中

CatOS 使用定制的 Calamares 图形化安装程序。默认安装适合希望快速完成部署的用户，高级安装配置则可以在安装阶段选择：

- 桌面环境或纯命令行系统；
- CatOS 标准软件源或 CatOS + CachyOS 优化软件源；
- 输入法与 Shell；
- LTS、Mainline、Zen、Hardened 等额外内核；
- 虚拟化、容器、开发和常用桌面软件。

这些选择在安装阶段完成，不需要先安装一套庞大的默认系统，再手工删除不需要的组件。

## 🖥️ 从完整桌面到 Wayland 工作流

CatOS 当前安装器提供 **16 种图形桌面或窗口管理器方案**，以及不安装图形桌面的基础系统选项。

其中既有 KDE Plasma、GNOME、Xfce、Cinnamon 等完整桌面，也有 Niri + DMS、Niri + Noctalia、Hyprland + DMS、Sway、Labwc、Wayfire 等 Wayland 工作流。Niri + DMS、Niri + Noctalia、Sway、Labwc 和 Wayfire 已使用 Catdot Profile 管理桌面配置；KDE、GNOME、Xfce 等方案也维护了独立配置仓库。

完整列表、适用场景和对应定制仓库请参阅[桌面环境与窗口管理器](./desktops.md)。

## 🔐 Secure Boot 与多启动器支持

当前 CatOS 发布镜像支持 Secure Boot 启动链，安装器可以在 Secure Boot 已启用时为 GRUB、Limine、systemd-boot 和 UKI 自动准备安装后的签名环境。

在线安装还提供 rEFInd，并继续支持 EFI Stub。不同启动器对 Secure Boot、Btrfs 快照和 ESP 大小的要求不同，安装前可参阅[启动方式与快照](./installation/boot-and-snapshots.md)和 [Secure Boot](./system/secure-boot.md)。

## 🎮 针对现代 NVIDIA 显卡提供独立镜像

当前下载页同时提供普通版和 NVIDIA 版安装介质。普通版面向 Intel、AMD 和较早的 NVIDIA 显卡；NVIDIA 版包含现代 NVIDIA 显卡需要的驱动和启动环境。

GTX 16、RTX 20 至 RTX 40 系列建议使用 NVIDIA 版，RTX 50 系列及更新型号必须使用 NVIDIA 版。具体型号判断和下载地址请参阅[下载页面](./download.md)。

## 🏵️ Arch Linux 生态与 CatOS 软件仓库

CatOS 继承 Arch Linux 的滚动更新模型、官方仓库和 AUR 生态，并使用独立的 CatOS 软件仓库交付：

- 安装器和发行版配置；
- 桌面预设、主题和品牌资源；
- CatOS 应用与系统集成工具；
- 面向不同硬件和使用场景的配置包。

系统默认包含 `yay` 和 `paru`，用户可以继续使用熟悉的 Arch 软件管理方式。AUR 软件由社区维护，安装前仍应检查 PKGBUILD 和上游来源。

## 🧰 面向开发、虚拟化和容器使用

高级安装配置可以直接选择 QEMU/KVM、Virt-Manager、VirtualBox、Docker、Podman、额外内核、开发工具和常用 Shell。

CatOS 还包含 Distroshelf，可用于创建和管理其他 Linux 发行版环境，适合软件测试、开发工具隔离或临时使用其他发行版的软件生态。

## 🛠️ 配置公开，欢迎参与定制

CatOS 的安装器配置、桌面预设、主题和系统工具都在 [CatOS-dev](https://github.com/CatOS-dev) 组织中公开维护。桌面体验不是封闭在 ISO 中的一组不可追踪脚本，而是可以独立查看、讨论和改进的软件包与配置仓库。

欢迎通过 Issue 或 Pull Request 提交新的桌面预设、主题调整、默认配置和兼容性改进。具体入口请参阅[桌面环境与窗口管理器](./desktops.md#参与-catos-桌面定制)。
