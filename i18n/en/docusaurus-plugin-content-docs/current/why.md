---
sidebar_position: 2
title: Why CatOS
summary: The main advantages and intended use cases of CatOS 2026.07.19.
---

# Why CatOS

CatOS is more than Arch Linux with a desktop preinstalled. It brings the installer, desktop presets, package repositories, hardware support, and practical tools together as one distribution, making the installed system immediately usable without taking away the openness and customizability of Arch Linux.

## 📤 Ready to use without locking the user in

CatOS provides a Chinese input environment, distribution themes, icons, wallpapers, common hardware components, repositories, and graphical tools by default, reducing the amount of work required after installing a base system.

These defaults do not hide how Arch Linux works. Users can still use `pacman`, the AUR, ArchWiki, and standard system configuration files directly, and every CatOS desktop component can be replaced.

## 💻 A graphical installer that keeps choices visible

CatOS uses a customized Calamares installer. The default path is suitable for users who want a quick installation, while the advanced configuration can select during installation:

- a desktop environment or a command-line-only system;
- the standard CatOS repositories or CatOS with CachyOS optimized repositories;
- input methods and shells;
- additional LTS, Mainline, Zen, or Hardened kernels;
- virtualization, container, development, and common desktop software.

These decisions are made during installation instead of installing a large default system and removing unwanted components afterwards.

## 🖥️ From complete desktops to Wayland workflows

The current CatOS installer provides **15 graphical desktop or window-manager choices**, plus a base system without a graphical desktop.

The list includes complete desktops such as KDE Plasma, GNOME, Xfce, and Cinnamon, as well as Wayland workflows such as Niri + DMS, Hyprland + DMS, Sway, Labwc, and Wayfire. CatOS maintains dedicated configuration repositories for KDE, GNOME, Xfce, Sway, Labwc, and Wayfire, while other choices primarily use upstream components and shared CatOS styling.

See [Desktop environments and window managers](./desktops.md) for the complete list, intended use cases, and customization repositories.

## 🎮 A dedicated image for modern NVIDIA GPUs

CatOS 2026.07.19 is available as both a standard image and an NVIDIA image. The standard image targets Intel, AMD, and older NVIDIA graphics, while the NVIDIA image contains the driver and boot environment required by modern NVIDIA GPUs.

The NVIDIA image is recommended for GTX 16 and RTX 20 through RTX 40 systems, and is required for RTX 50 Series and newer hardware. See the [download page](./download.md) for the full selection guide and download links.

## 🏵️ The Arch Linux ecosystem with CatOS repositories

CatOS inherits the Arch Linux rolling-release model, official repositories, and AUR ecosystem, while using its own repository to deliver:

- installer and distribution configuration;
- desktop presets, themes, and branding resources;
- CatOS applications and system-integration tools;
- configuration packages for different hardware and use cases.

Both `yay` and `paru` are included by default, so users can continue using familiar Arch package-management workflows. AUR packages remain community-maintained, and their PKGBUILDs and upstream sources should still be reviewed before installation.

## 🧰 Development, virtualization, and containers

The advanced installation configuration can directly select QEMU/KVM, Virt-Manager, VirtualBox, Docker, Podman, additional kernels, development tools, and common shells.

CatOS also includes Distroshelf for creating and managing environments from other Linux distributions. This is useful for software testing, isolating development toolchains, or temporarily using another distribution's package ecosystem.

## 🛠️ Public configuration and open customization

The CatOS installer configuration, desktop presets, themes, and system tools are developed publicly in the [CatOS-dev](https://github.com/CatOS-dev) organization. The desktop experience is not an untraceable collection of scripts embedded in the ISO: it is delivered through packages and configuration repositories that can be inspected and improved independently.

Issues and pull requests for new desktop presets, theme changes, defaults, and compatibility improvements are welcome. See [Desktop environments and window managers](./desktops.md#contributing-to-catos-desktop-customization) for the relevant repositories.
