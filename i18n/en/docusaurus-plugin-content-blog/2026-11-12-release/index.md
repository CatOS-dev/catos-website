---
slug: 2026-11-12-release
title: CatOS 2026.11.12 Release — More Desktop Choices and System Tools
authors: []
tags: [release, CatOS, 2026.11.12]
---

CatOS 2026.11.12 is now available in standard and NVIDIA editions. This release adds GXDE, Denial, and Pantheon desktop choices, improves Niri and Hyprland configurations, and updates software management and hardware support.

<!-- truncate -->

## 20 graphical choices in the installer

The online installer now offers **20 graphical desktop options**, plus **No Desktop** for a command-line system. Three additional desktop environments come with installer previews:

- **GXDE**: a desktop with a classic Deepin-style interface.
- **Denial**: another complete desktop environment.
- **Pantheon**: a desktop with a simple layout and integrated applications.

KDE Plasma remains the default. See the [desktop guide](/en/docs/desktops) for all available options.

## Niri, Hyprland, and Noctalia

Niri and Hyprland can be installed with **Dux Shell** or **Noctalia Shell**. Noctalia has been updated to 5.5.0 and provides a panel, launcher, notifications, control center, and other desktop tools.

These combinations are available in the online installer. Existing CatOS users can also adjust their setup using the corresponding packages and Catdot Profiles.

## Software management and hardware support

**Shelly** is now included in the installation images. It provides graphical software search, installation, and updates, including Flatpak integration. Pacman, paru, and yay remain available for command-line users.

**CHWD** has been updated to 1.25.0 for hardware detection and driver configuration.

See the [Shelly guide](/en/docs/usage/shelly) for more information.

## Two experimental system management tools

The CatOS repository now provides two experimental graphical applications:

- **CatOS Boot Manager**: configure GRUB, Limine, systemd-boot, and rEFInd, manage boot menus and UEFI firmware entries, and perform boot repairs.
- **CatOS Hardware Manager**: inspect devices, drivers, and support profiles, and manage driver changes through CHWD.

Both applications are **experimental** and are **not preinstalled** in the ISO images. Install them separately if you would like to try them:

```bash
sudo pacman -S catos-boot-manager catos-hardware-manager
```

## Download CatOS 2026.11.12

Both editions are available through **SourceForge, MEGA, and Baidu Netdisk**, with **Google Drive** also available for the standard edition.

Visit the [download page](/en/docs/download) to choose an image for your graphics hardware and verify its SHA-256 checksum after downloading.
