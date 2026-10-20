---
slug: 2026-10-20-rolling
title: CatOS 2026 年 10 月更新日志：桌面、安装器与系统工具
authors: []
tags: [updates, CatOS, rolling]
---

自 2026.08.05 安装镜像发布以来，CatOS 继续通过软件仓库交付桌面与系统更新。本轮重点是新版 CatOS Hello、Catdot Profile 预览、图形软件管理、在线安装容错，以及 Wayland 桌面配置。

<!-- truncate -->

:::info 安装镜像与滚动更新

**本篇记录的是已发布的软件包更新和近期开发进展，不是新的 ISO 发布公告。** 截至 2026 年 10 月 20 日，公开下载页仍提供 **CatOS 2026.08.05** 标准版和 NVIDIA 版镜像。已安装的 CatOS 可以通过正常的软件包更新获得正式仓库中的改进；尚未发布的新镜像构建和源码提交不等同于已交付的软件包。

:::

## CatOS Hello 0.1.2：重新组织欢迎与维护入口

`catos-hello` 已更新到 **0.1.2**。新版界面根据运行环境显示不同功能：

- **Live 环境**：直接启动安装器、选择高级安装，以及访问磁盘工具和安装日志；
- **已安装系统**：将首次使用引导、软件与桌面、系统维护和系统信息整理到独立页面；
- **日常维护**：集中提供镜像源选择、仓库配置、失败服务检查、Pacman 历史记录和日志收集入口；
- **桌面 Profile**：列出已安装的 Catdot Profile，在切换前展示待安装软件包及可能受影响的配置路径。

其中 Profile 切换仍由 Catdot 执行；预览不修改系统，正式应用前会要求用户确认。参阅 [CatOS Hello 使用说明](/docs/usage/hello)。

## Catdot：先预览，再切换桌面配置

Catdot 的命令行接口增加了结构化查询和无副作用的激活计划：

```bash
catdot list --json
catdot current --json
catdot plan catos-niri-dms
catdot plan catos-niri-dms --json
```

`plan` 会列出 Profile 需要的软件包、文件写入与删除，以及可能受影响的现有配置，**但不执行切换**。CatOS Hello 使用这些接口展示操作前预览。真正切换仍使用 `catdot select PROFILE`；系统软件包更新后，如需接受新的桌面配置版本，仍须显式执行 `catdot update`。Catdot 继续在覆盖用户文件之前保留备份。

详细操作参阅 [Catdot Profile 指南](/docs/usage/catdot)。

## 软件管理与桌面配置

- **Shelly** 已进入 CatOS 软件仓库，并被纳入后续 ISO 构建配置，作为图形软件管理入口；它与 `pacman`、`paru`、`yay` 可以按各自工作流使用，但不要同时发起包管理事务。
- **Noctalia v5** 的 Niri 与 Hyprland Profile 已发布，使用 `catos-niri-noctaliav5`、`catos-hyprland-noctaliav5` 的统一命名。
- **KDE** 配置取消了冗余的 Plasma Welcome 自动启动。
- **硬件支持** 持续同步 CHWD 和 NVIDIA 驱动软件包。

相关文档：[Shelly](/docs/usage/shelly) · [桌面选项](/docs/desktops)。

## 在线安装器：减少无关阻断

本轮发布的 Calamares 与安装配置更新改进了在线安装流程：

- 远程软件包列表请求设定 **10 秒超时**，避免网络请求无限等待；
- 移除安装流程入口处的全局网络门槛，由实际需要下载的软件包操作处理网络问题；
- 进一步对齐桌面选项和对应的软件包集合。

离线安装仍不应依赖安装阶段的外部网络访问。详见 [在线安装](/docs/installation/online-installation) 和 [离线安装](/docs/installation/offline-installation)。

## 已合并源码与后续镜像构建

以下变更已经进入相应源码，但**不能据此认定当前公开下载的 2026.08.05 ISO 或正式仓库软件包已包含它们**：

- ISO 构建链补充了 NVIDIA、Broadcom DKMS 模块的构建和签名处理，并适配 GRUB 2.16 的 SBAT 生成；
- 10 月 20 日合并的 Niri + DMS 源码修复涉及 DMS 与 Niri 的输入、显示输出、模糊配置、GTK 主题以及 Fcitx5 主题钩子。

这些源码变更要等相应的软件包或新镜像发布后才会进入用户的更新路径。获取镜像请以 [下载页](/docs/download) 的实际文件名、下载地址和 SHA-256 为准。
