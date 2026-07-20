---
title: 分辨 Wayland、X11 与 XWayland
sidebar_position: 1
description: 判断当前桌面会话和单个应用使用的是 Wayland、X11 还是 XWayland。
---

# 分辨 Wayland、X11 与 XWayland

现代 Linux 桌面中，“当前会话使用 Wayland”并不代表所有窗口都是原生 Wayland。为了兼容旧程序，Wayland 会话通常还会运行 XWayland，使 X11 程序能够继续显示。

这一区别会影响输入法、缩放、屏幕共享、全局快捷键和窗口自动化。排查某个程序的问题时，应同时确认**桌面会话类型**和**该程序自身的窗口协议**。

## 查看桌面会话类型

首先运行：

```bash
echo "$XDG_SESSION_TYPE"
```

常见输出：

- `wayland`：当前是 Wayland 会话；
- `x11`：当前是传统 X11 会话；
- 空值：当前启动方式没有设置该变量，可继续使用 `loginctl` 检查。

```bash
loginctl show-session "$XDG_SESSION_ID" -p Type
```

在 Wayland 会话中通常同时存在：

```bash
echo "$WAYLAND_DISPLAY"
echo "$DISPLAY"
```

`WAYLAND_DISPLAY` 供原生 Wayland 程序使用，`DISPLAY` 供 XWayland 程序使用。因此，**看到 `DISPLAY` 不代表当前会话就是 X11**。

## 判断一个窗口是不是 XWayland

下面的方法只在 Wayland 会话中有区分意义。在 X11 会话中，所有普通图形窗口本来就是 X11 窗口。

### 使用 `xprop` 或 `xwininfo`

运行：

```bash
xprop
```

或：

```bash
xwininfo
```

鼠标指针会变成选择状态，然后点击目标窗口：

- 能正常打印窗口属性：目标是 X11/XWayland 窗口；
- 无法选中或没有得到窗口信息：目标通常是原生 Wayland 窗口。

### 使用 `xeyes`

运行：

```bash
xeyes
```

移动鼠标经过不同窗口：

- 眼睛能够跟随鼠标：该窗口可被 X11 客户端观察，通常是 XWayland；
- 鼠标进入窗口后眼睛不再跟随：通常是原生 Wayland。

这是一个方便的快速判断方法，但不应把它当作程序兼容性的完整测试。

## 常见工具包的强制启动方式

这些命令适合临时排查，不建议未经测试就写入全局环境变量。

### Qt 5 / Qt 6

原生 Wayland：

```bash
QT_QPA_PLATFORM=wayland application
```

X11/XWayland：

```bash
QT_QPA_PLATFORM=xcb application
```

### GTK 3 / GTK 4

原生 Wayland：

```bash
GDK_BACKEND=wayland application
```

X11/XWayland：

```bash
GDK_BACKEND=x11 application
```

### Chromium / Electron

原生 Wayland：

```bash
application --ozone-platform=wayland
```

X11/XWayland：

```bash
application --ozone-platform=x11
```

不同 Electron 程序可能会过滤或覆盖命令行参数，应以程序自己的文档为准。

## 为什么输入法排查需要先分辨协议

Fcitx 与应用之间可能通过不同路径通信：

- 原生 Wayland 应用通常使用 Wayland `text-input` 协议；
- GTK、Qt 等程序也可以使用 Fcitx 输入法模块；
- X11/XWayland 程序可以使用 XIM 或工具包输入法模块；
- SDL、Chromium、Electron 和封闭源 Qt 程序可能有各自的兼容路径。

因此，“Fcitx 在一个程序里不能用”不一定是 Fcitx 本身没有启动，也可能只是该程序选择了不同的显示协议或没有携带对应输入法模块。

继续阅读：[使用和排查 Fcitx5](./input-method.md)。

参考资料：[Fcitx 官方 Wayland 使用说明](https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland/zh-cn)。
