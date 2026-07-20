---
title: Using and troubleshooting Fcitx5
sidebar_position: 2
description: CatOS Fcitx5 packages, environment variables, daily use, and toolkit-specific troubleshooting.
---

# Using and troubleshooting Fcitx5

CatOS uses Fcitx5 as its default Chinese input framework. Selecting Fcitx5 during online installation installs the framework, configuration tool, GTK and Qt integration, Chinese engines, Rime, additional dictionaries, and the CatOS preset.

## Included components

The main packages are:

- `fcitx5` and `fcitx5-configtool`;
- `fcitx5-gtk` and `fcitx5-qt`;
- `fcitx5-chinese-addons` and `fcitx5-rime`;
- `fcitx5-pinyin-moegirl` and `fcitx5-pinyin-zhwiki`;
- `fcitx5-material-color`;
- `catos-fcitx5-config`.

Check the installed set with:

```bash
pacman -Q | grep '^fcitx5'
```

## Basic configuration

Open “Fcitx 5 Configuration” from the application menu, or run:

```bash
fcitx5-configtool
```

Use it to add Pinyin, Rime, or another engine, reorder input methods, and adjust dictionaries and candidate behavior.

The CatOS preset contains these global shortcuts:

| Action | Default setting |
| --- | --- |
| Trigger input method | `Shift+Shift_L` |
| Enumerate forward | `Ctrl+Space` |
| Enumerate backward | `Ctrl+Shift+Space` |
| Next input-method group | `Super+Space` |
| Previous / next page | `Up` / `Down` |
| Previous / next candidate | `Shift+Tab` / `Tab` |

The literal `Shift+Shift_L` value is the Fcitx key expression stored by the preset. Change it in Global Options if it is inconvenient. Editors often reserve `Ctrl+Space` for completion.

## Environment configured by CatOS

CatOS distinguishes Wayland and X11 instead of forcing the same variables in every session.

### Wayland

CatOS exports:

```text
XMODIFIERS=@im=fcitx
```

It does not globally export `GTK_IM_MODULE`, `QT_IM_MODULE`, or `SDL_IM_MODULE`. Native GTK and Qt Wayland clients can therefore use compositor text-input protocols, while XWayland/XIM clients still receive `XMODIFIERS`.

### X11

CatOS exports:

```text
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```

### GTK configuration files

New CatOS users also receive:

```text
~/.gtkrc-2.0
~/.config/gtk-3.0/settings.ini
~/.config/gtk-4.0/settings.ini
```

with the toolkit setting:

```ini
gtk-im-module=fcitx
```

This enables the Fcitx module for GTK on X11/XWayland without globally overriding native Wayland GTK applications.

Environment changes require logging out and back in.

## Identify the application backend first

Read [Identifying Wayland, X11, and XWayland](./display-protocols.md) before changing global variables. The same application can use different input paths under Wayland and XWayland.

## Fcitx does not work anywhere

Check whether it is running:

```bash
pgrep -a fcitx5
```

Start it temporarily if needed:

```bash
fcitx5 -d
```

On Plasma Wayland, select Fcitx 5 under System Settings → Virtual Keyboard so KWin launches it as an input-method client. Do not use the tray “restart” action for a process launched this way, because the replacement process cannot reuse the socket passed by KWin.

Confirm that Pinyin, Rime, or another engine is present in `fcitx5-configtool`.

Generate a diagnostic report:

```bash
fcitx5-diagnose > ~/fcitx5-diagnose.txt
```

Check the process and D-Bus status, display protocol, environment, GTK/Qt modules, input contexts, and configured engines. Review the file before sharing it because it can contain usernames, application names, and system details.

## Qt 5 and Qt 6 applications

### Plasma Wayland

KWin supports the Qt Wayland input protocols. Native Qt Wayland clients should normally keep:

```bash
unset QT_IM_MODULE
```

Do not set `QT_IM_MODULE=fcitx` globally for the entire Plasma session merely to fix one application.

### GNOME, Sway, Niri, and other non-KWin compositors

Qt 5 and some Qt 6 applications commonly need the Fcitx module:

```bash
QT_IM_MODULE=fcitx application
```

Qt 6.7 or newer can also try a fallback order:

```bash
QT_IM_MODULES='wayland;fcitx;ibus' application
```

This does not replace `QT_IM_MODULE` for Qt 5.

Force XWayland when necessary:

```bash
QT_QPA_PLATFORM=xcb QT_IM_MODULE=fcitx application
```

A proprietary application may not bundle the Fcitx plugin. Check its plugin directory and the `fcitx5-diagnose` report, or try a bundled IBus plugin with `QT_IM_MODULE=ibus`.

## GTK applications

Check that the module is installed:

```bash
pacman -Q fcitx5-gtk
```

Native GTK 3/4 Wayland applications should normally keep `GTK_IM_MODULE` unset. If the compositor lacks the required protocol, test one application with:

```bash
GTK_IM_MODULE=fcitx application
```

GTK 2 and GTK X11/XWayland applications use the toolkit configuration value:

```ini
gtk-im-module=fcitx
```

Do not write `GTK_IM_MODULE=fcitx` inside `settings.ini`; environment syntax and GTK settings syntax are different.

GNOME users can inspect XSettings with:

```bash
gsettings get org.gnome.settings-daemon.plugins.xsettings overrides
```

## X11 and XWayland applications

```bash
printf '%s\n' "$XMODIFIERS"
xprop -root | grep XIM_SERVERS
```

`XMODIFIERS` should be `@im=fcitx`. Traditional Xlib applications use XIM, while GTK, Qt, and SDL usually prefer their toolkit integrations.

## Chromium and Electron

For native Wayland, try:

```bash
application --ozone-platform=wayland --enable-wayland-ime
```

If that path is incompatible, test XWayland:

```bash
GTK_IM_MODULE=fcitx application --ozone-platform=x11
```

Chromium and Electron behavior changes between releases, so avoid applying complex flags globally before testing the affected application.

## Avoid conflicting global settings

Do not stack contradictory values such as `GTK_IM_MODULE=fcitx` and `GTK_IM_MODULE=wayland`, or `QT_IM_MODULE=fcitx` and `QT_IM_MODULE=ibus`. Test a per-application command first instead of immediately editing `/etc/environment`.

## References

- [Using Fcitx 5 on Wayland](https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland/en)
- [Input method related environment variables](https://fcitx-im.org/wiki/Input_method_related_environment_variables)
- [Fcitx5-diagnose](https://fcitx-im.org/wiki/Fcitx5-diagnose)
- [Troubleshooting](https://fcitx-im.org/wiki/Troubleshooting)
- [Fcitx FAQ](https://fcitx-im.org/wiki/FAQ/en)
