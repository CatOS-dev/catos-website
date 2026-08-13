---
title: Niri + DMS
sidebar_position: 1
description: Use the CatOS Niri + Dank Material Shell desktop and understand Catdot ownership, user configuration files, and common shortcuts.
---

# Niri + DMS

Niri + DMS is CatOS's scrolling-tiling Wayland desktop option. Niri manages windows and workspaces, while Dank Material Shell (DMS) provides the launcher, settings, notifications, clipboard, lock screen, wallpaper controls, and other desktop-shell functions.

The current CatOS repository delivers this setup through the `catos-niri-dms` Profile, with [Catdot](../usage/catdot.md) managing the distribution-owned user configuration.

## Check the active Profile

```bash
catdot current
```

For this desktop the active Profile should be `catos-niri-dms`. To select it again:

```bash
catdot select catos-niri-dms
```

Profile selection does not restart Niri or desktop applications. Log out and back in after switching complete desktop Profiles.

## Configuration owned by CatOS

Catdot refreshes the main Niri configuration and CatOS baseline modules, including:

```text
~/.config/niri/config.kdl
~/.config/niri/catos/
~/.config/environment.d/80-catos-niri.conf
~/.config/xdg-desktop-portal/niri-portals.conf
```

The GTK baseline and default icon theme are managed as well. Direct edits can work temporarily, but a later `catdot update` may replace managed files with a newer Profile revision. Catdot creates a backup before replacement.

## Where to put personal Niri configuration

The DMS Profile provides three **one-time seed** files. They are created on first activation and are not managed by later Catdot updates:

```text
~/.config/niri/custom/catos-niri-dms/input.kdl
~/.config/niri/custom/catos-niri-dms/outputs.kdl
~/.config/niri/custom/catos-niri-dms/rules.kdl
```

The managed `config.kdl` already includes them, so use:

- `input.kdl` for keyboard, touchpad, and mouse settings;
- `outputs.kdl` for display modes, scaling, and layout;
- `rules.kdl` for personal window and layer rules.

List output names and modes with:

```bash
niri msg outputs
```

For example:

```kdl
output "eDP-1" {
    mode "1920x1080"
    scale 1.0
}
```

Do not place long-term personal changes under `~/.config/niri/catos/`; that directory is part of the distribution baseline.

## DMS-generated configuration

DMS dynamically generates colors, layout fragments, window-rule fragments, Qt color schemes, and terminal palettes. These runtime-generated files are owned by DMS rather than Catdot and are not intended for long-term manual editing.

Use DMS settings and wallpaper controls for appearance changes instead of editing generated files directly.

## Common shortcuts

`Mod` normally means the `Super` key in a regular Niri session.

| Action | Default shortcut |
| --- | --- |
| DMS application launcher | `Mod` + `Space` |
| Open Ghostty | `Mod` + `T` |
| DMS settings | `Mod` + `,` |
| Clipboard | `Mod` + `V` |
| Task manager | `Mod` + `M` |
| Notification center | `Mod` + `N` |
| Overview | `Mod` + `O` or `Mod` + `Tab` |
| Close window | `Mod` + `Q` |
| Focus left/down/up/right | `Mod` + arrows or `Mod` + `H/J/K/L` |
| Move a window/column | `Mod` + `Shift` + arrows or `H/J/K/L` |
| Switch workspace | `Mod` + `1`…`9` |
| Native region screenshot | `Print` |
| Native output screenshot | `Ctrl` + `Print` |
| Native window screenshot | `Alt` + `Print` |
| Region screenshot, then edit in Satty | `Shift` + `Print` |
| Search CatOS Niri shortcuts | `Mod` + `/` |
| Cycle DMS output profile | `Mod` + `P` |

Niri's built-in hotkey overlay is also available with `Mod` + `Shift` + `/`.

## Updating desktop configuration

Package upgrades and Profile configuration updates are separate. After a normal system upgrade, explicitly accept a newer managed `catos-niri-dms` revision with:

```bash
catdot update catos-niri-dms
```

Catdot backs up managed files before replacement. Seed files such as `input.kdl`, `outputs.kdl`, and `rules.kdl` are not overwritten by this command.

Backups are normally stored under:

```text
~/.local/state/catdot/backups/
```

See [Updating the system](../usage/update.md) and [Catdot](../usage/catdot.md) for the full update model.

## Portals and XWayland

The Profile configures Niri's XDG Desktop Portal and starts `xwayland-satellite` for X11 compatibility. For screen sharing, screenshots, file chooser, or legacy X11 application problems, first identify the session and application protocol as described in [Distinguishing Wayland, X11, and XWayland](../usage/display-protocols.md).
