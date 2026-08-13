---
sidebar_position: 1
slug: /intro
title: Introduction
description: Understand CatOS, its rolling-release model, installation media, desktop choices, Secure Boot, and configuration model.
---

# Introduction

CatOS is an **open-source, Arch Linux-based distribution for desktop and everyday use**. It keeps the Arch rolling-release model, `pacman`, AUR, and standard system layout while packaging the installer, repositories, hardware support, desktop presets, themes, and system integration as a complete distribution.

The newest installation media currently listed on the download page is **CatOS 2026.08.05**. CatOS itself is rolling release, so except for release notes, ISO downloads, and media-specific installation details, the usage, desktop, and maintenance documentation tracks the **currently published packages in the CatOS repositories** rather than freezing at the ISO build date.

## What CatOS is intended to solve

A direct Arch Linux installation gives you a highly flexible base system, but users normally still need to configure partitioning, boot, a graphical desktop, input methods, graphics drivers, repositories, themes, and everyday tools. CatOS moves those tasks into the distribution and installer so that you can start from a working Live environment and deploy a complete system through a graphical workflow.

CatOS does not hide the underlying Arch system. After installation you can still use:

- `pacman` and the official Arch Linux repositories;
- the CatOS repositories;
- AUR with common helpers such as `yay` and `paru`;
- ArchWiki and upstream project documentation;
- standard systemd, Btrfs, Wayland/X11, and Linux configuration methods.

## Two installation paths

CatOS 2026.08.05 provides two installation workflows:

- **Offline installation** copies the Live system to the target disk. It is intended for a fast default installation or situations where installation-time networking is unavailable.
- **Online installation** deploys packages according to your choices and can select the desktop, boot method, kernels, repositories, shell, development and virtualization components, and additional software.

Both workflows use Calamares and share the core partitioning, user, boot, and Secure Boot integration. See the [installation overview](./installation/overview.md) for the detailed differences.

## More than one desktop

The installer currently provides **16 graphical desktop or window-manager choices**, plus a **No Desktop** base-system option.

KDE Plasma is the default option and has the broadest CatOS test coverage. Other choices include GNOME, Xfce, Cinnamon, COSMIC, Deepin, Niri + DMS, Niri + Noctalia, Hyprland + DMS, Sway, Labwc, and Wayfire.

Several Wayland environments use [Catdot](./usage/catdot.md) Profiles for user configuration. Catdot distinguishes distribution-managed configuration from one-time seed files and creates backups before replacing user-owned configuration.

See [Desktop environments and window managers](./desktops.md) for the complete list.

## Boot chain and Secure Boot

CatOS 2026.08.05 release images support UEFI Secure Boot. When installation takes place in a Secure Boot environment, the installer can prepare a signed installed-system chain for supported boot methods, while `catos-secureboot` maintains signatures for kernels, external modules, and EFI boot artifacts afterward.

Online installation currently provides six boot methods: GRUB, Limine, rEFInd, systemd-boot, UKI, and EFI Stub. GRUB, Limine, systemd-boot, and UKI support CatOS automatic Secure Boot integration.

See [Secure Boot](./system/secure-boot.md) and [Boot methods and snapshots](./installation/boot-and-snapshots.md).

## Choose the correct image

The current release provides:

- the **standard image** for Intel, AMD, and systems that do not need the modern NVIDIA-specific live environment;
- the **NVIDIA image** for systems requiring modern NVIDIA drivers, especially newer GeForce GTX/RTX hardware.

See [Download CatOS](./download.md) for model guidance, mirrors, and SHA-256 checksums.

## Rolling updates and configuration updates

CatOS follows the Arch Linux rolling-release model, so normal software updates do not require waiting for a new ISO. System packages are updated through `pacman`. When the active desktop uses Catdot, accepting a newer Profile configuration revision is a separate, explicit `catdot update` operation.

See [Updating the system](./usage/update.md).

## Start here

- [Why CatOS](./why.md) for the distribution's main features and intended use cases;
- [Download CatOS](./download.md) to choose and verify an image;
- [Installation preparation](./installation/preparation.md) for boot media, UEFI, disk, and network checks;
- [Installation overview](./installation/overview.md) to choose offline or online installation;
- [Post-installation checks](./installation/post-installation.md) for updates, drivers, boot configuration, and Secure Boot verification.
