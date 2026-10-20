---
slug: 2026-10-20-rolling
title: CatOS 2026 年 10 月更新：欢迎程序、桌面与安装器
authors: []
tags: [updates, CatOS, rolling]
---

10 月的更新重点是让 CatOS 更好用：欢迎程序重新设计，切换桌面配置前可以先查看改动，软件管理和在线安装也做了改进。

<!-- truncate -->

## CatOS Hello 0.1.2

欢迎程序重新整理了界面，不用再从一堆按钮里找功能。

- **使用安装盘时**，可以直接启动安装器、选择高级安装，或打开磁盘工具和安装日志。
- **安装完成后**，软件与桌面、系统维护和系统信息有了各自的页面。
- **维护系统时**，可以管理镜像源、查看失败的服务和 Pacman 记录，或收集故障日志。
- **切换桌面时**，可以先预览需要安装的软件包和可能被修改的配置文件。

详细用法见 [CatOS Hello 使用指南](/docs/usage/hello)。

## Catdot：切换桌面前先看改动

现在可以先预览桌面 Profile 的改动，而不用立即切换：

```bash
catdot plan catos-niri-dms
```

它会列出还缺少哪些软件包、准备修改或删除哪些文件。预览不会改动系统。确认后再使用 `catdot select PROFILE` 切换；已有桌面配置可以通过 `catdot update` 更新，原有文件会在覆盖前备份。CatOS Hello 也提供了图形化的切换预览。

详见 [Catdot 使用指南](/docs/usage/catdot)。

## 软件与桌面更新

- **Shelly** 图形软件管理器已加入 CatOS 软件仓库，可以搜索、安装和更新软件。熟悉终端的用户仍可以使用 `pacman`、`paru` 或 `yay`。
- **Noctalia v5** 增加了面向 Niri 和 Hyprland 的桌面配置方案。
- **KDE** 修正了 Plasma Welcome 重复启动的问题。
- **硬件支持** 更新了 CHWD 与 NVIDIA 驱动软件包。

相关说明：[Shelly 软件管理器](/docs/usage/shelly) · [桌面环境](/docs/desktops)。

## 在线安装改进

安装器在网络不稳定时更容易继续操作：

- 在线软件包列表加载最多等待 **10 秒**，避免长时间卡住。
- 不再因为进入安装器时的一次网络检查而直接阻止安装；需要下载软件包的步骤仍会正常检查网络。
- 调整了部分桌面选项对应的软件包列表。

参阅 [在线安装指南](/docs/installation/online-installation)。
