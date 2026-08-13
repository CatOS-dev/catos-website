---
sidebar_position: 3
title: 桌面环境与窗口管理器
description: CatOS 安装器提供的桌面、Wayland 工作流和对应定制仓库。
---

# 桌面环境与窗口管理器

CatOS 的高级安装配置允许在安装阶段选择桌面环境或窗口管理器。当前提供 **16 种图形方案**，也可以选择 **No Desktop** 安装不带图形界面的基础系统。

不同选项的维护深度并不完全相同：部分桌面拥有独立的 CatOS 配置仓库，部分桌面主要使用上游默认组件并共享 CatOS 的 GTK、图标、字体或通用工具配置。

## 完整桌面环境

| 选项 | 定位 | CatOS 定制情况 |
| --- | --- | --- |
| **KDE Plasma** | 功能完整、可高度定制的 Qt 桌面，也是当前默认选项 | 维护独立的 [KDE 设置](https://github.com/CatOS-dev/catos-kde-settings) 与 [KDE 主题](https://github.com/CatOS-dev/catos-kde-theme) 仓库 |
| **GNOME** | 注重一致性和工作流整合的现代桌面 | 维护独立的 [GNOME 设置](https://github.com/CatOS-dev/catos-gnome-settings)，并使用共享的 [GTK 设置](https://github.com/CatOS-dev/catos-gtk-settings) |
| **Deepin Desktop** | 界面和组件高度整合的完整桌面 | 当前主要使用上游 Deepin 组件和安装器预设 |
| **Xfce** | 资源占用较低的传统桌面 | 维护独立的 [Xfce 设置](https://github.com/CatOS-dev/catos-xfce-settings)，并使用共享的 GTK 配置 |
| **Cinnamon** | 使用 GTK、操作习惯传统的桌面 | 当前主要使用上游组件和共享的 GTK 配置 |
| **COSMIC** | 主要使用 Rust 开发的现代 Wayland 桌面 | 当前主要使用上游组件和安装器预设 |
| **Budgie** | 简洁、易上手的 GTK 桌面 | 当前主要使用上游组件和共享的 GTK 配置 |
| **LXDE** | 面向低配置设备的精简 X11 桌面 | 当前主要使用上游组件和安装器预设 |
| **LXQt** | 使用 Qt、布局经典的轻量桌面 | 当前主要使用上游组件和安装器预设 |
| **MATE** | 延续 GNOME 2 使用方式的传统桌面 | 当前主要使用上游组件和共享的 GTK 配置 |

## Wayland 桌面与窗口管理器

| 选项 | 定位 | CatOS 定制情况 |
| --- | --- | --- |
| **Niri + DMS** | 使用 Dank Material Shell 的滚动平铺式 Wayland 桌面 | 使用独立的 `catos-niri-dms` Catdot Profile 管理 Niri、Portal、GTK 基线和桌面工具 |
| **Niri + Noctalia** | 使用 Noctalia Shell 的滚动平铺式 Wayland 桌面 | 使用独立的 `catos-niri-noctaliav5` Catdot Profile，并可使用 Noctalia Greeter |
| **Hyprland + DMS** | 使用 Dank Material Shell 的动态平铺式 Wayland 桌面 | 由安装器组合 Hyprland、DMS 和通用桌面组件；专用定制仍在持续整理 |
| **Sway** | 稳定、键盘驱动的平铺式 Wayland 环境 | 使用独立的 [Sway 设置](https://github.com/CatOS-dev/catos-sway-settings) Catdot Profile，并使用 [Waybar 设置](https://github.com/CatOS-dev/catos-waybar-settings) |
| **Labwc** | 受 Openbox 启发的轻量 Wayland 浮动桌面 | 使用独立的 [Labwc 设置](https://github.com/CatOS-dev/catos-labwc-settings) Catdot Profile，并使用 Waybar 通用配置 |
| **Wayfire** | 带有适度桌面特效的轻量 Wayland 浮动环境 | 使用独立的 [Wayfire 设置](https://github.com/CatOS-dev/catos-wayfire-settings) Catdot Profile |

## No Desktop

选择 **No Desktop** 会安装不带图形桌面的命令行系统，适用于：

- 自己从零搭建桌面或窗口管理器；
- 作为开发机、测试环境或轻量服务器使用；
- 只希望使用 CatOS 安装器、仓库和基础系统集成的用户。

No Desktop 不代表安装失败。安装完成后可以通过 `pacman` 或 AUR 手工安装任意桌面组件。

## 如何选择

- 希望获得完成度最高、定制选项最丰富的默认体验：选择 **KDE Plasma**。
- 偏好统一、简洁的工作流：选择 **GNOME**。
- 设备资源较少或偏好传统桌面：选择 **Xfce、LXQt、LXDE 或 MATE**。
- 希望使用现代滚动平铺工作流：选择 **Niri + DMS** 或 **Niri + Noctalia**。
- 熟悉键盘驱动的平铺窗口管理：选择 **Sway**。
- 希望获得轻量浮动 Wayland 桌面：选择 **Labwc 或 Wayfire**。
- 希望完全自己配置：选择 **No Desktop**。

:::note 选择前请注意

不同桌面的上游成熟度、硬件兼容性和 CatOS 定制程度不同。KDE Plasma 是默认选项；其他桌面用于提供选择空间，不表示所有方案具有完全相同的测试覆盖和功能完整度。

:::

## 参与 CatOS 桌面定制

所有公开项目都位于 [CatOS-dev GitHub 组织](https://github.com/CatOS-dev)。欢迎提交问题、改进默认配置，或为尚未拥有独立配置仓库的桌面建立更完整的 CatOS 预设。

常用入口：

- [catos-calamares-config](https://github.com/CatOS-dev/catos-calamares-config)：安装器中的桌面列表、软件组合和安装流程；
- [catos-kde-settings](https://github.com/CatOS-dev/catos-kde-settings)：KDE Plasma 默认设置；
- [catos-gnome-settings](https://github.com/CatOS-dev/catos-gnome-settings)：GNOME 默认设置；
- [catos-xfce-settings](https://github.com/CatOS-dev/catos-xfce-settings)：Xfce 默认设置；
- [catos-sway-settings](https://github.com/CatOS-dev/catos-sway-settings)：Sway 会话配置；
- [catos-labwc-settings](https://github.com/CatOS-dev/catos-labwc-settings)：Labwc 会话配置；
- [catos-wayfire-settings](https://github.com/CatOS-dev/catos-wayfire-settings)：Wayfire 会话配置；
- [catos-waybar-settings](https://github.com/CatOS-dev/catos-waybar-settings)：多个 Wayland 会话共享的 Waybar 配置；
- [catos-niri-dms](https://github.com/CatOS-dev/catos-niri-dms)：Niri + DMS 的 Catdot Profile；
- [catos-niri-noctaliav5](https://github.com/CatOS-dev/catos-niri-noctaliav5)：Niri + Noctalia 的 Catdot Profile；
- [catos-gtk-settings](https://github.com/CatOS-dev/catos-gtk-settings)：GTK 桌面共享的主题和基础设置；
- [catos-kde-theme](https://github.com/CatOS-dev/catos-kde-theme)：CatOS KDE 主题资源。

新增或修改桌面预设时，应同时说明软件包组成、显示管理器、Portal、会话文件、默认应用和卸载边界，避免不同桌面之间产生文件冲突或残留配置。
