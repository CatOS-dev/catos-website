---
title: 使用和排查 Fcitx5
sidebar_position: 2
description: CatOS 的 Fcitx5 组件、环境变量、使用方法与 Qt、GTK、XWayland 故障排查。
---

# 使用和排查 Fcitx5

CatOS 默认使用 Fcitx5 作为中文输入框架。在线安装中选择 Fcitx5 后，会安装输入法框架、配置工具、GTK/Qt 集成、中文附加组件、Rime、扩展词库和 CatOS 默认配置。

## CatOS 包含的组件

主要组件包括：

- `fcitx5`：输入法框架；
- `fcitx5-configtool`：图形配置工具；
- `fcitx5-gtk`：GTK 输入法模块；
- `fcitx5-qt`：Qt 输入法模块；
- `fcitx5-chinese-addons`：拼音等中文输入引擎；
- `fcitx5-rime`：Rime 输入法引擎；
- `fcitx5-pinyin-moegirl`、`fcitx5-pinyin-zhwiki`：扩展拼音词库；
- `fcitx5-material-color`：候选框主题；
- `catos-fcitx5-config`：CatOS 的快捷键、界面和会话环境配置。

实际安装内容取决于安装模式和用户选择，可以使用下面的命令检查：

```bash
pacman -Q | grep '^fcitx5'
```

## 基本使用

从应用菜单打开“Fcitx 5 配置”，或运行：

```bash
fcitx5-configtool
```

在“输入法”页面中可以：

1. 添加“拼音”“Rime”或其他输入法；
2. 调整输入法顺序；
3. 删除不需要的输入法；
4. 修改每个输入法的词库、模糊音和候选设置。

CatOS 默认配置包含这些全局快捷键：

| 功能 | 默认配置 |
| --- | --- |
| 触发输入法 | `Shift+Shift_L` |
| 向前轮换输入法 | `Ctrl+Space` |
| 向后轮换输入法 | `Ctrl+Shift+Space` |
| 向前切换输入法组 | `Super+Space` |
| 候选上一页 / 下一页 | `↑` / `↓` |
| 上一个 / 下一个候选 | `Shift+Tab` / `Tab` |

`Shift+Shift_L` 是 Fcitx 配置文件中的按键表达。如果这一组合不符合使用习惯，可以在“全局选项”中直接改为更熟悉的快捷键。部分编辑器会占用 `Ctrl+Space` 用于代码补全，遇到冲突时应修改其中一方。

## CatOS 设置了哪些输入法环境

CatOS 不会在所有桌面会话中无条件设置同一组变量，而是区分 Wayland 和 X11。

### Wayland 会话

默认全局变量：

```text
XMODIFIERS=@im=fcitx
```

CatOS 默认不全局设置：

```text
GTK_IM_MODULE
QT_IM_MODULE
SDL_IM_MODULE
```

这样做的目的，是让原生 GTK/Qt Wayland 程序优先使用桌面合成器提供的 `text-input` 协议，同时保留 `XMODIFIERS` 供 XWayland/XIM 程序使用。

### X11 会话

CatOS 会为 X11 会话导出：

```text
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```

### GTK 配置文件

CatOS 还会为新用户准备：

```text
~/.gtkrc-2.0
~/.config/gtk-3.0/settings.ini
~/.config/gtk-4.0/settings.ini
```

其中使用：

```ini
gtk-im-module=fcitx
```

它可以让 GTK 程序在 X11/XWayland 下使用 Fcitx 模块，同时避免用全局 `GTK_IM_MODULE=fcitx` 强制覆盖所有原生 Wayland GTK 程序。

:::note

环境变量只会在登录会话创建时传递给程序。修改后应注销并重新登录，而不是只关闭一个终端窗口。

:::

## 先确认程序使用什么协议

在继续修改变量前，先阅读[分辨 Wayland、X11 与 XWayland](./display-protocols.md)。

同一个程序在原生 Wayland 和 XWayland 下可能使用完全不同的输入法路径。盲目全局设置 `GTK_IM_MODULE` 或 `QT_IM_MODULE`，可能修好一个程序，却让另一个程序出现候选框闪烁、位置错误或无法输入。

## 输入法完全不能使用

依次检查：

### 1. Fcitx5 是否运行

```bash
pgrep -a fcitx5
```

没有输出时，可以临时启动：

```bash
fcitx5 -d
```

在 Plasma Wayland 中，推荐在“系统设置 → 虚拟键盘”中选择 Fcitx 5，让 KWin 以输入法客户端方式启动它。通过这种方式启动后，不建议使用托盘菜单中的“重启”，因为重新启动的进程无法复用 KWin 传递的输入法套接字。

### 2. 是否已经添加中文输入法

打开：

```bash
fcitx5-configtool
```

确认列表中除了键盘布局外，还有“拼音”“Rime”等输入法引擎。

### 3. 运行诊断工具

```bash
fcitx5-diagnose > ~/fcitx5-diagnose.txt
```

重点检查：

- Fcitx5 进程和 D-Bus 是否正常；
- 当前是 Wayland 还是 X11；
- `XMODIFIERS` 是否正确；
- GTK、Qt 输入法模块是否存在；
- 出问题的程序是否出现在 Input Context 列表中；
- 当前用户配置是否真的包含输入法引擎。

诊断文件可能包含用户名、运行中的程序和系统信息，公开上传前应先检查内容。

## 只有 Qt 5 / Qt 6 程序不能输入

### Plasma Wayland

KWin 支持 Qt 的 Wayland 输入协议。原生 Qt Wayland 程序应优先保持：

```bash
unset QT_IM_MODULE
```

不要为了一个程序无条件在整个 Plasma 会话中设置 `QT_IM_MODULE=fcitx`，否则可能导致候选窗口闪烁等问题。

### GNOME、Sway、Niri 等非 KWin Wayland 环境

Qt 5 和部分 Qt 6 程序通常需要 Fcitx Qt 模块：

```bash
QT_IM_MODULE=fcitx application
```

Qt 6.7 及更新版本还可以尝试按优先级回退：

```bash
QT_IM_MODULES='wayland;fcitx;ibus' application
```

这不会替代 Qt 5 使用的 `QT_IM_MODULE`。

### 强制程序通过 XWayland

```bash
QT_QPA_PLATFORM=xcb QT_IM_MODULE=fcitx application
```

封闭源程序可能没有打包 `fcitx` 插件。此时可以检查程序目录中是否存在名称包含 `fcitx` 的 Qt platform input context 插件，或者尝试其自带的 IBus 插件：

```bash
QT_IM_MODULE=ibus application
```

## 只有 GTK 程序不能输入

先确认已经安装：

```bash
pacman -Q fcitx5-gtk
```

### GTK 3 / GTK 4 原生 Wayland

一般应保持：

```bash
unset GTK_IM_MODULE
```

让 GTK 使用内置 Wayland 输入法模块。若当前合成器不支持所需协议，才对单个程序尝试：

```bash
GTK_IM_MODULE=fcitx application
```

### GTK 2 或 X11/XWayland GTK 程序

确认配置文件中存在正确的小写键名：

```ini
gtk-im-module=fcitx
```

对应文件：

```text
~/.gtkrc-2.0
~/.config/gtk-3.0/settings.ini
~/.config/gtk-4.0/settings.ini
```

不要写成 `GTK_IM_MODULE=fcitx` 放进 `settings.ini`；环境变量语法和 GTK 配置文件语法不是一回事。

GNOME 用户还可以检查 XSettings：

```bash
gsettings get org.gnome.settings-daemon.plugins.xsettings overrides
```

## X11 / XWayland 程序不能输入

先检查：

```bash
printf '%s\n' "$XMODIFIERS"
```

应输出：

```text
@im=fcitx
```

再检查 XIM 服务：

```bash
xprop -root | grep XIM_SERVERS
```

传统 Xlib 程序主要依赖 XIM；GTK、Qt 和 SDL 程序则通常优先使用各自输入法模块。

## Chromium 和 Electron 程序

先确认程序运行在 Wayland 还是 XWayland。

原生 Wayland 可尝试：

```bash
application --ozone-platform=wayland --enable-wayland-ime
```

如果原生 Wayland 输入法存在兼容问题，可以临时退回 XWayland：

```bash
GTK_IM_MODULE=fcitx application --ozone-platform=x11
```

Chromium 和 Electron 的输入法实现会随版本变化，不建议把复杂启动参数直接全局应用到所有程序。具体参数可继续参考 Fcitx 官方的 Wayland 页面。

## 常见错误做法

不要同时全局叠加多套互相冲突的设置，例如：

```text
GTK_IM_MODULE=fcitx
GTK_IM_MODULE=wayland
QT_IM_MODULE=fcitx
QT_IM_MODULE=ibus
```

同一个变量只能有一个最终值。也不要为了修复单个应用，直接修改 `/etc/environment`；应先使用临时命令验证，再决定是否为特定桌面或特定程序持久化。

## 参考资料

- [Fcitx：在 Wayland 上使用 Fcitx5](https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland/zh-cn)
- [Fcitx：输入法相关环境变量](https://fcitx-im.org/wiki/Input_method_related_environment_variables/zh-hans)
- [Fcitx5-diagnose](https://fcitx-im.org/wiki/Fcitx5-diagnose)
- [Fcitx 故障排查](https://fcitx-im.org/wiki/Troubleshooting)
- [Fcitx 常见问题](https://fcitx-im.org/wiki/FAQ/zh-hans)
