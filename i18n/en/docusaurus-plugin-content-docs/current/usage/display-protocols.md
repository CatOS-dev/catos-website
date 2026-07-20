---
title: Identifying Wayland, X11, and XWayland
sidebar_position: 1
description: Determine the protocol used by the desktop session and by an individual application window.
---

# Identifying Wayland, X11, and XWayland

A Wayland desktop session may still run X11 applications through XWayland. This distinction affects input methods, scaling, screen sharing, global shortcuts, and window automation.

## Check the session type

```bash
echo "$XDG_SESSION_TYPE"
```

The usual values are `wayland` and `x11`. If it is empty, use:

```bash
loginctl show-session "$XDG_SESSION_ID" -p Type
```

A Wayland session normally has both variables:

```bash
echo "$WAYLAND_DISPLAY"
echo "$DISPLAY"
```

`WAYLAND_DISPLAY` is used by native Wayland clients. `DISPLAY` exists for XWayland clients, so the presence of `DISPLAY` alone does not mean the whole session is X11.

## Check an individual window

These methods are useful while the desktop session itself is Wayland.

### `xprop` or `xwininfo`

Run either command and click the target window:

```bash
xprop
```

```bash
xwininfo
```

If the command prints window information, the target is an X11/XWayland window. If it cannot select the window, the target is normally a native Wayland client.

### `xeyes`

```bash
xeyes
```

Move the pointer across application windows. The eyes can observe the pointer over X11/XWayland windows, but normally stop tracking it over native Wayland windows.

## Temporarily force a backend

Use these commands for diagnosis rather than as untested global settings.

Qt native Wayland:

```bash
QT_QPA_PLATFORM=wayland application
```

Qt X11/XWayland:

```bash
QT_QPA_PLATFORM=xcb application
```

GTK native Wayland:

```bash
GDK_BACKEND=wayland application
```

GTK X11/XWayland:

```bash
GDK_BACKEND=x11 application
```

Chromium or Electron:

```bash
application --ozone-platform=wayland
application --ozone-platform=x11
```

## Why this matters for input methods

Fcitx can communicate through Wayland text-input protocols, toolkit input modules, XIM, or application-specific integrations. A problem limited to one application may therefore be caused by the application's selected display backend rather than by Fcitx itself.

Continue with [Using and troubleshooting Fcitx5](./input-method.md).

Reference: [Using Fcitx 5 on Wayland](https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland/en).
