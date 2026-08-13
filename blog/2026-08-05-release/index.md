---
slug: 2026-08-05-release
title: CatOS 2026.08.05 更新日志
authors: []
tags: [release, CatOS, 2026.08.05]
---

CatOS 2026.08.05 是一次以安装、启动链和桌面配置管理为核心的更新。相比 2026.07.19，本次版本加入 Secure Boot 支持、Catdot Profile 管理、新的 Niri + Noctalia 桌面方案，并重做了在线安装的进度反馈和多项启动器集成。

<!-- truncate -->

## Secure Boot 与 ISO 构建链

发布镜像现在使用固定版本的 Archiso 构建链，并加入签名 ISO 构建、构建前检查和真实镜像验证。标准版与 NVIDIA 版 Live ISO 均切换到支持 Secure Boot 的 UEFI 启动流程。

安装后的 Secure Boot 生命周期由新的 `catos-secureboot` 管理。安装器在 Secure Boot 已启用时会为支持的启动方案准备机器级密钥、签名内核、外部内核模块和 EFI 启动文件，并在后续内核、DKMS 或启动文件更新后继续维护签名状态。

当前自动集成的启动方案包括 GRUB、Limine、systemd-boot 和 UKI。rEFInd 与 Linux EFI Stub 在 Secure Boot 已启用时不会作为可选方案显示。

## 在线安装进度现在可以真正反映下载状态

此前在线安装的大部分时间只能看到笼统的安装阶段。2026.08.05 重做了 Pacman 与 pacstrap 的进度采集，现在安装界面可以显示：

- 已下载数据量与总下载量；
- 实时下载速度；
- 当前正在下载的软件包；
- 软件仓库刷新和软件包事务阶段；
- 更连续的全局安装进度。

![CatOS 在线安装实时下载进度](/img/blog/2026-08-05/install-progress.png)

安装失败时也会保留最近的 Pacman / pacstrap 输出、失败命令和退出状态，便于定位软件源、签名或具体软件包问题。相关状态文本已加入本地化支持。

同时，CachyOS 软件源选项现在会根据 CPU 是否支持 x86-64-v3 决定是否显示，并增加了备用镜像和更可靠的 keyring 初始化流程。

## Catdot：桌面配置开始使用 Profile 管理

本次版本加入 `catdot`，用于管理完整的 CatOS 用户配置 Profile。Profile 同时声明需要的软件包、由 Catdot 持续管理的 HOME 路径，以及只在首次启用时写入的初始配置。

Catdot 在覆盖现有用户配置前会创建备份，并保留最近五次操作的备份。配置更新是显式操作，系统软件包升级不会自动覆盖已经接受的桌面配置版本。

常用命令包括：

```bash
catdot list
catdot current
catdot show PROFILE
catdot select PROFILE
catdot update [PROFILE]
catdot remove PROFILE
catdot prune
```

安装器在已经完成软件包部署后会使用验证模式激活对应 Profile，从而避免重复执行 Pacman 安装事务。除两套 Niri 方案外，Sway、Labwc 和 Wayfire 也在本次版本迁移到各自的 Catdot Profile。

## Niri + DMS 完成独立 Profile，新增 Niri + Noctalia

Niri + DMS 现在拥有独立的 `catos-niri-dms` Profile，统一管理 Niri 会话、Portal、GTK 基线、图标与相关桌面工具，同时将需要长期由用户维护的输入、输出和规则配置保留为一次性 seed。

安装器还新增 **Niri + Noctalia**，组合 Niri、Noctalia Shell、XWayland Satellite 和对应 Catdot Profile。CatOS 2026.08.05 因此提供 **16 种图形桌面或窗口管理器方案**，另有 No Desktop 基础系统选项。

Niri + Noctalia 是本次新增方案，测试覆盖和成熟度仍低于 KDE Plasma 等长期维护的默认桌面。

## 启动方式：加入 rEFInd，完善 Limine

在线安装现在提供六种启动方式：

- GRUB；
- Limine；
- rEFInd；
- systemd-boot；
- Unified Kernel Image（UKI）；
- Linux EFI Stub。

Limine 集成增加 CatOS 主题、`limine-tool` 管理和 Btrfs 快照入口验证。安装完成后会生成并检查实际可启动的内核资源，而不是只判断配置文件是否存在。

![CatOS Limine 启动界面](/img/blog/2026-08-05/limine.png)

rEFInd 作为新的 UEFI 图形启动管理器加入安装器，适合希望使用自动发现操作系统和 Linux 内核的用户；当前不提供 CatOS 的 Btrfs 可启动快照集成。

## 桌面外观与登录流程

Live 环境从 SDDM 切换到 Plasma Login Manager，并清理旧的 SDDM 配置。KDE 主题新增 CatOS Light 全局主题与浅色 Plasma 主题，同时修复面板布局、任务状态和光标主题等细节。

GNOME、Xfce、Labwc、Sway、Wayfire 和共享 GTK 设置也统一了品牌资源、壁纸和图标依赖，修复部分面板或桌面图标引用错误。

## Shell 与终端默认配置

CatOS 新增独立的 Bash、Fish、Zsh 和 Vim 配置包，并加入统一的 Starship Prompt 与终端符号字体。在线安装的 Shell 选择现在安装完整的 CatOS 配置，而不只是单独安装 Shell 软件包。

## 其他修复

- Live ISO 加入 `archlinuxcn-keyring`，减少 Arch Linux CN 软件源首次使用时的签名问题；
- 加入 `ckbcomp`，完善安装器键盘布局预览；
- 加入 RTKit，修复部分 Live 会话音频实时调度环境；
- 修复中文键盘布局映射到控制台 keymap 时的处理；
- 在线与离线安装的清理流程分离，避免在线安装执行只适用于 Live 系统的软件包删除列表；
- 显示管理器与桌面 Profile 配置改为独立步骤，桌面定制失败不再轻易破坏已经可启动的基础系统；
- 修复多个桌面的图标主题依赖和资源路径。

完整安装与使用说明已经同步到文档站。下载 CatOS 2026.08.05 前请核对对应镜像的 SHA-256。
