---
title: CatOS 软件仓库
description: 了解 CatOS 仓库与 Arch Linux 仓库的关系、签名验证、软件来源和常用诊断命令。
---

# CatOS 软件仓库

CatOS 采用 Arch Linux 的滚动更新模型。通用软件优先来自 Arch Linux 官方仓库，CatOS 自己的软件仓库主要交付发行版集成层，例如安装器配置、桌面 Profile、主题、启动工具、品牌资源和系统维护组件。

因此，安装完成后的 CatOS 并不是一套与 Arch Linux 隔离的软件生态；正常系统更新会同时解析 Arch Linux 与 CatOS 仓库中的软件包。

## 查看当前启用的仓库

```bash
pacman-conf --repo-list
```

只查看当前机器的 CatOS 仓库配置：

```bash
pacman-conf --repo catos
```

镜像地址和仓库配置可能随滚动更新调整，不建议从旧教程手工复制一段固定的 `[catos]` 配置覆盖当前系统。

## CatOS 仓库通常提供什么

常见软件包括：

- Calamares 与 CatOS 安装器配置；
- KDE、GNOME、Xfce、Niri、Sway、Labwc、Wayfire 等桌面配置或 Profile；
- `catdot`、`catos-secureboot` 等系统集成工具；
- CatOS 主题、图标、品牌和 Shell 配置；
- 为发行版安装流程或硬件支持打包的辅助组件。

搜索 CatOS 仓库：

```bash
pacman -Sl catos
```

查看某个仓库包：

```bash
pacman -Si catdot
pacman -Si catos-secureboot
```

## 软件包签名与 keyring

CatOS 安装环境包含 `catos-keyring`，正常安装后的 Pacman 配置使用签名验证策略。遇到签名或 keyring 错误时，不要为了临时安装软件把仓库改成：

```text
SigLevel = Never
```

这会关闭 Pacman 对该仓库的签名验证。

先检查系统时间和当前 keyring：

```bash
timedatectl
pacman -Q archlinux-keyring catos-keyring
```

需要刷新 keyring 时，应与完整系统升级连续执行：

```bash
sudo pacman -Sy archlinux-keyring catos-keyring
sudo pacman -Su
```

不要在 `pacman -Sy` 后停止并长期继续使用系统，否则会形成 Arch Linux 不支持的部分更新状态。

## 判断一个包来自哪里

查看已安装包信息：

```bash
pacman -Qi package-name
```

查看仓库中的候选版本：

```bash
pacman -Si package-name
```

查看某个文件属于哪个已安装软件包：

```bash
pacman -Qo /path/to/file
```

列出不属于当前同步仓库的已安装包：

```bash
pacman -Qm
```

`pacman -Qm` 中常见 AUR、本地构建或已经从仓库移除的软件包。它并不自动表示这些包有问题，但更新和排障时应额外关注来源。

## 第三方仓库与优先级

用户可以自行启用 CachyOS、Arch Linux CN 或其他第三方仓库，但仓库越多，出现以下问题的概率越高：

- 同名软件包由不同仓库提供；
- 版本更新速度不同；
- `provides`、`conflicts` 或替换关系变化；
- 第三方包覆盖 Arch 或 CatOS 组件；
- 不同仓库使用不同 keyring 和签名策略。

添加第三方仓库前应确认它的维护者、签名方式和仓库顺序。遇到依赖冲突时，不要先使用 `--nodeps` 或 `--overwrite '*'` 绕过问题，应先确认实际选中的软件包来源。

## 更新原则

CatOS 与 Arch Linux 一样应执行完整系统更新：

```bash
sudo pacman -Syu
```

如果还使用 AUR，请参阅[使用 AUR](../usage/aur.md)；完整更新、Catdot Profile 和 Secure Boot 更新后的处理方式见[更新系统](../usage/update.md)。
