---
title: Niri + Noctalia
sidebar_position: 2
description: 使用 CatOS 的 Niri + Noctalia 桌面，了解当前发布 Profile 的配置边界、更新方式和常用快捷键。
---

# Niri + Noctalia

Niri + Noctalia 是 CatOS 提供的另一套滚动平铺式 Wayland 桌面。Niri 负责窗口与工作区，Noctalia 提供面板、启动器、控制中心、通知、剪贴板和主题等 Shell 功能。

当前 CatOS 软件仓库通过 `catos-niri-noctaliav5` Profile 交付这套桌面。它同样使用 [Catdot](../usage/catdot.md)，但当前已发布 Profile 的配置所有权与 Niri + DMS 不完全相同。

:::note 滚动发布说明

本文描述 **CatOS 软件仓库当前发布的 `catos-niri-noctaliav5` 包**。项目 Git 仓库可能包含尚未发布到软件仓库的后续调整；这些改动在正式打包前不会提前作为用户行为写入本文档。

:::

## 确认当前 Profile

```bash
catdot current
```

如果使用此桌面，应看到：

```text
catos-niri-noctaliav5
```

重新选择可执行：

```bash
catdot select catos-niri-noctaliav5
```

切换完整桌面 Profile 后建议注销并重新登录。

## 当前 Profile 的管理边界

当前已发布版本由 Catdot 管理：

```text
~/.config/niri/config.kdl
~/.config/niri/noctalia.kdl
~/.config/niri/noctalia/
~/.config/noctalia/config.toml
~/.config/xdg-desktop-portal/niri-portals.conf
```

这些属于发行版 managed 配置。执行 `catdot update catos-niri-noctaliav5` 接受新版 Profile 时，Catdot 可能替换这些文件，并在操作前备份旧内容。

与当前 DMS Profile 不同，当前已发布 Noctalia Profile **没有提供独立的 `custom/.../input.kdl`、`outputs.kdl`、`rules.kdl` 作为稳定用户扩展接口**。因此不要假设直接修改 managed Niri 文件一定能跨 Profile 更新长期保留。

如果已经对这些文件做了个人修改，在执行 `catdot update` 前先查看 Catdot 备份和新版 Profile 差异，再决定如何合并。

## Noctalia 与会话组件

当前 Profile 会启动 Noctalia、Fcitx5 和 Polkit 认证代理，并为 Niri 配置 GTK/GNOME Portal 组合。Noctalia 的主题模板可以协同生成 GTK、Qt 和 Niri 外观配置。

如果登录管理器使用 Noctalia Greeter，它属于登录阶段组件；桌面内的 Noctalia Shell 与 Greeter 是两个不同的运行阶段。

## 常用快捷键

`Mod` 在正常 Niri 会话中通常代表 `Super`。

| 操作 | 默认快捷键 |
| --- | --- |
| Noctalia 控制中心 | `Mod` + `S` |
| Noctalia 设置 | `Mod` + `,` |
| Noctalia 剪贴板 | `Mod` + `V` |
| Noctalia 窗口切换器 | `Alt` + `Tab` |
| 打开 Kitty | `Mod` + `T` |
| Niri Overview | `Mod` + `O` |
| 关闭窗口 | `Mod` + `Q` |
| 左/下/上/右切换焦点 | `Mod` + 方向键，或 `Mod` + `H/J/K/L` |
| 切换工作区 | `Mod` + `1`…`9` |
| 截取区域 | `Print` |
| 截取当前输出 | `Ctrl` + `Print` |
| 截取窗口 | `Alt` + `Print` |
| 显示 Niri 热键帮助 | `Mod` + `Shift` + `/` |

Noctalia 与 Niri 都可能提供自己的快捷键层。排查快捷键冲突时，应同时检查 `~/.config/niri/config.kdl` 和 `~/.config/niri/noctalia/`。

## 更新 Profile

正常 `pacman -Syu` 只更新软件包。需要接受新版 Noctalia Profile managed 配置时，再显式执行：

```bash
catdot update catos-niri-noctaliav5
```

更新前后可以查看：

```bash
catdot current
catdot show catos-niri-noctaliav5
```

Catdot 备份位于：

```text
~/.local/state/catdot/backups/
```

参阅[更新系统](../usage/update.md)和 [Catdot](../usage/catdot.md)。

## 屏幕共享与 XWayland

Niri 是 Wayland compositor，旧 X11 应用仍可能通过 XWayland 兼容层运行。遇到输入法、屏幕共享或特定应用窗口行为问题时，先判断应用到底是原生 Wayland 还是 XWayland，见[分辨 Wayland、X11 与 XWayland](../usage/display-protocols.md)。
