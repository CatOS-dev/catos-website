---
title: Niri + DMS
sidebar_position: 1
description: 使用 CatOS 的 Niri + Dank Material Shell 桌面，理解 Catdot 管理边界、用户配置文件和常用快捷键。
---

# Niri + DMS

Niri + DMS 是 CatOS 提供的滚动平铺式 Wayland 桌面方案。Niri 负责窗口与工作区，Dank Material Shell（DMS）提供启动器、设置、通知、剪贴板、锁屏、壁纸和其他桌面 Shell 功能。

当前 CatOS 仓库通过 `catos-niri-dms` Profile 交付这套配置，并由 [Catdot](../usage/catdot.md) 管理发行版拥有的用户配置。

## 确认当前 Profile

```bash
catdot current
```

如果当前使用此桌面，应看到 `catos-niri-dms`。重新选择 Profile 可执行：

```bash
catdot select catos-niri-dms
```

Profile 切换不会自动重启 Niri 或桌面应用。切换完整桌面后建议注销并重新登录。

## 哪些配置由 CatOS 管理

Catdot 会刷新 Niri 的主配置和 CatOS 基线模块，包括：

```text
~/.config/niri/config.kdl
~/.config/niri/catos/
~/.config/environment.d/80-catos-niri.conf
~/.config/xdg-desktop-portal/niri-portals.conf
```

GTK 基线和默认图标主题也属于 Profile 的 managed 内容。直接修改这些文件可以临时生效，但以后执行 `catdot update` 时可能被新版 Profile 替换；替换前 Catdot 会创建备份。

## 应该在哪里写自己的 Niri 配置

CatOS 为 DMS Profile 预留了三个**一次性 seed** 文件。它们在第一次激活 Profile 时创建，此后不再由 Catdot 更新：

```text
~/.config/niri/custom/catos-niri-dms/input.kdl
~/.config/niri/custom/catos-niri-dms/outputs.kdl
~/.config/niri/custom/catos-niri-dms/rules.kdl
```

主 `config.kdl` 已经自动 include 这些文件，因此：

- 键盘、触摸板和鼠标配置写入 `input.kdl`；
- 显示器模式、缩放和布局写入 `outputs.kdl`；
- 自定义窗口规则和 layer 规则写入 `rules.kdl`。

查看显示器名称和可用模式：

```bash
niri msg outputs
```

例如：

```kdl
output "eDP-1" {
    mode "1920x1080"
    scale 1.0
}
```

不要把长期个人修改写进 `~/.config/niri/catos/`，那部分属于发行版基线。

## DMS 生成的配置

DMS 会动态生成颜色、布局、窗口规则和主题片段，例如 Niri 的 `dms/` 配置片段、Qt 配色和终端颜色。这些文件由 DMS 运行时拥有，不属于 Catdot 的 managed 配置，也不适合手工长期维护。

希望改变外观时优先使用 DMS 自己的设置和壁纸功能，而不是直接编辑生成文件。

## 常用快捷键

`Mod` 在正常 Niri 会话中通常就是 `Super` 键。

| 操作 | 默认快捷键 |
| --- | --- |
| 打开 DMS 应用启动器 | `Mod` + `Space` |
| 打开 Ghostty | `Mod` + `T` |
| DMS 设置 | `Mod` + `,` |
| 剪贴板 | `Mod` + `V` |
| 任务管理器 | `Mod` + `M` |
| 通知中心 | `Mod` + `N` |
| Overview | `Mod` + `O` 或 `Mod` + `Tab` |
| 关闭窗口 | `Mod` + `Q` |
| 左/下/上/右切换焦点 | `Mod` + 方向键，或 `Mod` + `H/J/K/L` |
| 移动窗口/列 | `Mod` + `Shift` + 方向键，或 `H/J/K/L` |
| 切换工作区 | `Mod` + `1`…`9` |
| 原生区域截图 | `Print` |
| 原生整屏截图 | `Ctrl` + `Print` |
| 原生窗口截图 | `Alt` + `Print` |
| 区域截图后用 Satty 编辑 | `Shift` + `Print` |
| 搜索 CatOS Niri 快捷键 | `Mod` + `/` |
| 轮换 DMS 显示配置 | `Mod` + `P` |

Niri 自带热键帮助也可以通过 `Mod` + `Shift` + `/` 打开。

## 更新桌面配置

系统软件包更新和 Profile 配置更新是两件事。完成正常系统更新后，如果希望接受 `catos-niri-dms` 中新的 managed 配置：

```bash
catdot update catos-niri-dms
```

Catdot 会在覆盖 managed 文件前备份当前版本；`input.kdl`、`outputs.kdl`、`rules.kdl` 等 seed 文件不会因为这个命令重新覆盖。

备份默认位于：

```text
~/.local/state/catdot/backups/
```

详细更新语义见[更新系统](../usage/update.md)和 [Catdot](../usage/catdot.md)。

## Portal 与 XWayland

Profile 会配置 Niri 的 XDG Desktop Portal，并在会话中启动 `xwayland-satellite` 以兼容 X11 应用。遇到屏幕共享、截图、文件选择器或旧 X11 程序问题时，先确认当前会话和应用协议，参阅[分辨 Wayland、X11 与 XWayland](../usage/display-protocols.md)。
