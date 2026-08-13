---
title: Niri + Noctalia
sidebar_position: 2
description: Use the CatOS Niri + Noctalia desktop and understand the ownership, update behavior, and shortcuts of the currently published Profile.
---

# Niri + Noctalia

Niri + Noctalia is another CatOS scrolling-tiling Wayland desktop. Niri manages windows and workspaces, while Noctalia provides the panel, launcher, control center, notifications, clipboard, theming, and other shell functions.

The current CatOS package repository delivers this desktop through the `catos-niri-noctaliav5` Profile. It also uses [Catdot](../usage/catdot.md), but its current published ownership model is not identical to Niri + DMS.

:::note Rolling-release documentation

This page describes the **currently published `catos-niri-noctaliav5` package in the CatOS repositories**. The project's Git repository may contain later changes that have not yet been packaged; those changes are not documented as user-visible behavior until they are released to the package repository.

:::

## Check the active Profile

```bash
catdot current
```

For this desktop it should report:

```text
catos-niri-noctaliav5
```

To select it again:

```bash
catdot select catos-niri-noctaliav5
```

Log out and back in after switching a complete desktop Profile.

## Current Profile ownership

The currently published Profile manages:

```text
~/.config/niri/config.kdl
~/.config/niri/noctalia.kdl
~/.config/niri/noctalia/
~/.config/noctalia/config.toml
~/.config/xdg-desktop-portal/niri-portals.conf
```

These are distribution-managed files. When you explicitly accept a newer revision with `catdot update catos-niri-noctaliav5`, Catdot may replace them after backing up the previous content.

Unlike the current DMS Profile, the currently published Noctalia Profile **does not provide separate `custom/.../input.kdl`, `outputs.kdl`, and `rules.kdl` files as a stable user-extension interface**. Do not assume that direct edits to managed Niri files will remain across Profile updates.

If you have customized managed files, review the Catdot backup and the new Profile revision before merging your changes after an update.

## Noctalia and session components

The current Profile starts Noctalia, Fcitx5, and a Polkit authentication agent and configures the GTK/GNOME portal combination for Niri. Noctalia theme templates can coordinate GTK, Qt, and Niri appearance output.

If the system uses Noctalia Greeter as the display manager, that is a login-stage component; the Noctalia desktop shell runs separately inside the user session.

## Common shortcuts

`Mod` normally means `Super` in a regular Niri session.

| Action | Default shortcut |
| --- | --- |
| Noctalia control center | `Mod` + `S` |
| Noctalia settings | `Mod` + `,` |
| Noctalia clipboard | `Mod` + `V` |
| Noctalia window switcher | `Alt` + `Tab` |
| Open Kitty | `Mod` + `T` |
| Niri overview | `Mod` + `O` |
| Close window | `Mod` + `Q` |
| Focus left/down/up/right | `Mod` + arrows or `Mod` + `H/J/K/L` |
| Switch workspace | `Mod` + `1`…`9` |
| Region screenshot | `Print` |
| Current-output screenshot | `Ctrl` + `Print` |
| Window screenshot | `Alt` + `Print` |
| Niri hotkey overlay | `Mod` + `Shift` + `/` |

Both Noctalia and Niri contribute shortcut layers. When diagnosing conflicts, inspect both `~/.config/niri/config.kdl` and `~/.config/niri/noctalia/`.

## Updating the Profile

A normal `pacman -Syu` updates packages only. Explicitly accept a newer managed Noctalia Profile revision with:

```bash
catdot update catos-niri-noctaliav5
```

Before or after updating, inspect:

```bash
catdot current
catdot show catos-niri-noctaliav5
```

Catdot backups are stored under:

```text
~/.local/state/catdot/backups/
```

See [Updating the system](../usage/update.md) and [Catdot](../usage/catdot.md).

## Screen sharing and XWayland

Niri is a Wayland compositor, while legacy X11 applications may run through an XWayland compatibility layer. For input-method, screen-sharing, or application-window problems, first determine whether the application is native Wayland or XWayland as described in [Distinguishing Wayland, X11, and XWayland](../usage/display-protocols.md).
