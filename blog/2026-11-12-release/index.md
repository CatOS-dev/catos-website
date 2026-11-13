---
slug: 2026-11-12-release
title: CatOS 2026.11.12 发布：更多桌面选择与系统管理工具
authors: []
tags: [release, CatOS, 2026.11.12]
---

CatOS 2026.11.12 已发布，提供普通版和 NVIDIA 版两个安装镜像。本次更新增加了 GXDE、Denial、Pantheon 等桌面选项，改进 Niri、Hyprland 的桌面配置，并更新了软件管理和硬件支持。

<!-- truncate -->

## 在线安装现有 20 种图形桌面方案

安装器新增 **GXDE、Denial 和 Pantheon**，并为它们提供桌面预览图。现在在线安装可以从 **20 种图形桌面方案**中选择，也可以使用 **No Desktop** 安装命令行系统。

- **GXDE**：延续经典的 Deepin 桌面风格。
- **Denial**：另一种完整桌面环境选择。
- **Pantheon**：采用简洁的桌面布局与应用体验。

KDE Plasma 仍然是默认桌面。更多选项见[桌面环境与窗口管理器](/docs/desktops)。

## Niri、Hyprland 与 Noctalia

Niri 和 Hyprland 的桌面选择进一步整理，可以搭配 **Dux Shell** 或 **Noctalia Shell** 使用。Noctalia 更新到 5.5.0，继续提供面板、启动器、通知和控制中心等桌面功能。

不同的桌面组合可以在在线安装时直接选择。已经安装 CatOS 的用户，也可以通过相应的软件包和 Catdot Profile 调整桌面配置。

## 软件管理与硬件支持

**Shelly** 图形软件管理器现在随安装镜像预装，可以在桌面中搜索、安装和更新软件，并使用 Flatpak 相关功能。熟悉命令行的用户仍然可以继续使用 Pacman、paru 和 yay。

硬件配置工具 **CHWD** 更新到 1.25.0，继续负责检测硬件并配置相应驱动。

详见 [Shelly 使用指南](/docs/usage/shelly)。

## 两款实验性系统管理工具

CatOS 软件仓库新增了两款可供体验的图形工具：

- **CatOS Boot Manager**：管理 GRUB、Limine、systemd-boot、rEFInd 等引导器的配置、启动菜单和 UEFI 固件启动项，并提供引导修复功能。
- **CatOS Hardware Manager**：查看硬件设备、驱动和支持配置，并通过 CHWD 管理驱动变更。

两款工具目前处于**实验阶段**，尚未预装进 ISO。有兴趣的用户可以自行安装：

```bash
sudo pacman -S catos-boot-manager catos-hardware-manager
```

## 下载 CatOS 2026.11.12

普通版和 NVIDIA 版均已提供 **SourceForge、MEGA 和百度网盘**下载渠道，普通版另外提供 **Google Drive** 下载。

请在[下载页面](/docs/download)选择适合自己显卡的镜像，并在下载完成后核对 SHA-256。
