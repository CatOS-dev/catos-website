---
sidebar_position: 3
title: Desktop environments and window managers
description: Desktop choices, Wayland workflows, and customization repositories available in the CatOS installer.
---

# Desktop environments and window managers

The advanced CatOS installation configuration can select a desktop environment or window manager during installation. It currently provides **16 graphical choices**, as well as **No Desktop** for a base system without a graphical interface.

The customization depth is not identical for every option. Some desktops have dedicated CatOS configuration repositories, while others primarily use upstream defaults together with shared CatOS GTK, icon, font, or common-tool settings.

## Complete desktop environments

| Choice | Intended use | CatOS customization |
| --- | --- | --- |
| **KDE Plasma** | A complete and highly customizable Qt desktop; the current default | Dedicated [KDE settings](https://github.com/CatOS-dev/catos-kde-settings) and [KDE theme](https://github.com/CatOS-dev/catos-kde-theme) repositories |
| **GNOME** | A modern desktop focused on consistency and an integrated workflow | Dedicated [GNOME settings](https://github.com/CatOS-dev/catos-gnome-settings), plus shared [GTK settings](https://github.com/CatOS-dev/catos-gtk-settings) |
| **Deepin Desktop** | A complete desktop with tightly integrated components | Primarily upstream Deepin components and installer presets |
| **Xfce** | A traditional desktop with relatively low resource usage | Dedicated [Xfce settings](https://github.com/CatOS-dev/catos-xfce-settings), plus shared GTK configuration |
| **Cinnamon** | A familiar, traditional desktop based on GTK | Primarily upstream components and shared GTK configuration |
| **COSMIC** | A modern Wayland desktop written primarily in Rust | Primarily upstream components and installer presets |
| **Budgie** | A clean and approachable GTK desktop | Primarily upstream components and shared GTK configuration |
| **LXDE** | A minimal X11 desktop for low-resource systems | Primarily upstream components and installer presets |
| **LXQt** | A lightweight Qt desktop with a classic layout | Primarily upstream components and installer presets |
| **MATE** | A traditional desktop continuing the GNOME 2 workflow | Primarily upstream components and shared GTK configuration |

## Wayland desktops and window managers

| Choice | Intended use | CatOS customization |
| --- | --- | --- |
| **Niri + DMS** | A scrolling tiling Wayland desktop using Dank Material Shell | Uses the dedicated `catos-niri-dms` Catdot Profile for Niri, portals, the GTK baseline, and desktop tools |
| **Niri + Noctalia** | A scrolling tiling Wayland desktop using Noctalia Shell | Uses the dedicated `catos-niri-noctaliav5` Catdot Profile and can use Noctalia Greeter |
| **Hyprland + DMS** | A dynamic tiling Wayland desktop using Dank Material Shell | Assembled by the installer from Hyprland, DMS, and common desktop components; dedicated customization is still being organized |
| **Sway** | A stable, keyboard-driven tiling Wayland environment | Uses the dedicated [Sway settings](https://github.com/CatOS-dev/catos-sway-settings) Catdot Profile, plus [Waybar settings](https://github.com/CatOS-dev/catos-waybar-settings) |
| **Labwc** | A lightweight floating Wayland desktop inspired by Openbox | Uses the dedicated [Labwc settings](https://github.com/CatOS-dev/catos-labwc-settings) Catdot Profile, plus shared Waybar configuration |
| **Wayfire** | A lightweight floating Wayland environment with desktop effects | Uses the dedicated [Wayfire settings](https://github.com/CatOS-dev/catos-wayfire-settings) Catdot Profile |

### Niri + DMS

Niri manages scrolling-tiling windows and workspaces, while Dank Material Shell (DMS) provides the launcher, settings, notifications, clipboard, lock screen, wallpaper controls, and other shell functions. The current CatOS repository delivers this setup through the `catos-niri-dms` Profile, with [Catdot](./usage/catdot.md) managing distribution-owned user configuration.

Check or reselect the Profile with:

```bash
catdot current
catdot select catos-niri-dms
```

Catdot manages the main Niri configuration, CatOS baseline modules, environment configuration, and portal configuration, including:

```text
~/.config/niri/config.kdl
~/.config/niri/catos/
~/.config/environment.d/80-catos-niri.conf
~/.config/xdg-desktop-portal/niri-portals.conf
```

Long-term personal configuration belongs in the one-time seed files created on first Profile activation:

```text
~/.config/niri/custom/catos-niri-dms/input.kdl
~/.config/niri/custom/catos-niri-dms/outputs.kdl
~/.config/niri/custom/catos-niri-dms/rules.kdl
```

Use them for input devices, displays, and personal window rules respectively. List display names and modes with `niri msg outputs`. Avoid keeping personal changes under `~/.config/niri/catos/`, which is part of the distribution baseline.

Common defaults:

| Action | Niri + DMS |
| --- | --- |
| DMS launcher | `Mod` + `Space` |
| Ghostty | `Mod` + `T` |
| DMS settings | `Mod` + `,` |
| Clipboard | `Mod` + `V` |
| Overview | `Mod` + `O` / `Mod` + `Tab` |
| Close window | `Mod` + `Q` |
| Move focus | `Mod` + arrows / `H/J/K/L` |
| Workspaces | `Mod` + `1`…`9` |
| Screenshots | `Print` / `Ctrl` + `Print` / `Alt` + `Print` |

Explicitly accept a newer managed Profile revision with:

```bash
catdot update catos-niri-dms
```

Catdot backs up managed files before replacement and does not overwrite the seed files. The Profile also configures Niri's XDG Desktop Portal and `xwayland-satellite`; see [Distinguishing Wayland, X11, and XWayland](./usage/display-protocols.md) for screen-sharing or legacy-X11 problems.

### Niri + Noctalia

Niri + Noctalia uses the same Niri window model while Noctalia provides the panel, launcher, control center, notifications, clipboard, theming, and other shell functions. The current CatOS repository delivers it through the `catos-niri-noctaliav5` Profile.

```bash
catdot current
catdot select catos-niri-noctaliav5
```

The currently published Profile manages:

```text
~/.config/niri/config.kdl
~/.config/niri/noctalia.kdl
~/.config/niri/noctalia/
~/.config/noctalia/config.toml
~/.config/xdg-desktop-portal/niri-portals.conf
```

Unlike the DMS Profile, the currently published Noctalia Profile **does not expose `input.kdl`, `outputs.kdl`, and `rules.kdl` as stable user seed interfaces**. Direct edits to managed Niri files may need to be merged manually after a future `catdot update`; Catdot creates a backup before replacement.

Common defaults:

| Action | Niri + Noctalia |
| --- | --- |
| Noctalia control center | `Mod` + `S` |
| Noctalia settings | `Mod` + `,` |
| Noctalia clipboard | `Mod` + `V` |
| Window switcher | `Alt` + `Tab` |
| Kitty | `Mod` + `T` |
| Niri overview | `Mod` + `O` |
| Close window | `Mod` + `Q` |
| Workspaces | `Mod` + `1`…`9` |
| Niri hotkey overlay | `Mod` + `Shift` + `/` |

Accept a newer Profile revision with:

```bash
catdot update catos-niri-noctaliav5
```

If the system uses Noctalia Greeter, it is a login-stage component; the Noctalia shell inside the desktop session is separate. Input-method, screen-sharing, and XWayland problems are covered in [Display protocol troubleshooting](./usage/display-protocols.md).

:::note Rolling-release documentation

The Niri behavior above tracks the **currently published packages in the CatOS repositories**. Later Git commits are not documented as user-visible behavior until they are packaged and published.

:::

## No Desktop

Selecting **No Desktop** installs a command-line system without a graphical environment. It is useful for:

- building a desktop or window-manager setup from scratch;
- development machines, test environments, or lightweight servers;
- users who only want the CatOS installer, repositories, and base-system integration.

No Desktop does not indicate an incomplete installation. Any desktop components can be installed afterwards with `pacman` or the AUR.

## Choosing a desktop

- For the most complete default experience and the broadest customization options, choose **KDE Plasma**.
- For a focused and consistent workflow, choose **GNOME**.
- For lower-resource systems or a traditional desktop, choose **Xfce, LXQt, LXDE, or MATE**.
- For a modern scrolling tiling workflow, choose **Niri + DMS** or **Niri + Noctalia**.
- For a keyboard-driven tiling environment, choose **Sway**.
- For a lightweight floating Wayland desktop, choose **Labwc or Wayfire**.
- For complete manual control, choose **No Desktop**.

:::note Before choosing

Upstream maturity, hardware compatibility, and CatOS customization depth differ between desktops. KDE Plasma is the default choice. The availability of other options provides flexibility, but does not imply identical test coverage or feature completeness for every desktop.

:::

## Contributing to CatOS desktop customization

All public projects are available in the [CatOS-dev GitHub organization](https://github.com/CatOS-dev). Contributions are welcome for improving defaults, fixing compatibility issues, or creating complete CatOS presets for desktops that do not yet have dedicated repositories.

Useful entry points:

- [catos-calamares-config](https://github.com/CatOS-dev/catos-calamares-config): desktop choices, package groups, and installation workflow;
- [catos-kde-settings](https://github.com/CatOS-dev/catos-kde-settings): KDE Plasma defaults;
- [catos-gnome-settings](https://github.com/CatOS-dev/catos-gnome-settings): GNOME defaults;
- [catos-xfce-settings](https://github.com/CatOS-dev/catos-xfce-settings): Xfce defaults;
- [catos-sway-settings](https://github.com/CatOS-dev/catos-sway-settings): Sway session configuration;
- [catos-labwc-settings](https://github.com/CatOS-dev/catos-labwc-settings): Labwc session configuration;
- [catos-wayfire-settings](https://github.com/CatOS-dev/catos-wayfire-settings): Wayfire session configuration;
- [catos-waybar-settings](https://github.com/CatOS-dev/catos-waybar-settings): shared Waybar configuration for multiple Wayland sessions;
- [catos-niri-dms](https://github.com/CatOS-dev/catos-niri-dms): the Niri + DMS Catdot Profile;
- [catos-niri-noctaliav5](https://github.com/CatOS-dev/catos-niri-noctaliav5): the Niri + Noctalia Catdot Profile;
- [catos-gtk-settings](https://github.com/CatOS-dev/catos-gtk-settings): shared GTK theme and base settings;
- [catos-kde-theme](https://github.com/CatOS-dev/catos-kde-theme): CatOS KDE theme resources.

A new or modified desktop preset should document its package set, display manager, XDG portal, session files, default applications, and removal boundaries to avoid file conflicts or leftover configuration between desktop choices.
