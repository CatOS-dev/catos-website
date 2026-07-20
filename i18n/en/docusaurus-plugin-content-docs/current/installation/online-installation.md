---
title: Online installation
sidebar_position: 4
description: Install CatOS from repositories and choose repositories, boot method, desktop, drivers and optional software.
---

# Online installation

Online installation builds the target system from repositories instead of copying the live environment. It lets you select repositories, boot method, desktop and optional software, then runs chwd inside the target system to configure hardware drivers.

## Requirements

You need a stable network, correct system time and access to the Arch Linux, CatOS and, when selected, CachyOS repositories. Repository synchronization or network failures can abort installation; keep the Calamares log when reporting a failure.

## Flow

```text
Locale and keyboard
        ↓
Repository selection
        ↓
Boot method
        ↓
Partitioning and filesystem
        ↓
Desktop or window manager
        ↓
Input method, shell, kernels and applications
        ↓
User account and summary
        ↓
Repository installation
        ↓
chwd hardware configuration
        ↓
Boot and snapshot integration
```

## Repository selection

### CatOS repositories

The default uses Arch Linux official repositories plus CatOS repositories. It keeps a standard Arch package stack while adding CatOS installer, desktop presets, themes, boot tools and integration packages.

### CatOS + CachyOS repositories

This option keeps CatOS repositories, enables CachyOS repositories selected for the current CPU and installs `linux-cachyos`. It changes the kernel and some package sources; select it when you specifically want the CachyOS optimized stack.

## Boot method

Available options are GRUB, Limine, systemd-boot, Unified Kernel Image and Linux EFI Stub. Firmware mode, partition table, ESP size and snapshot requirements determine which one is appropriate. See [boot methods and snapshots](./boot-and-snapshots.md).

## Filesystem

Btrfs is the default. ext4, ext3, JFS, XFS and F2FS are also available. Choose Btrfs for Snapper and bootable snapshot integration, or ext4 for a traditional filesystem without those features. See [partitioning and filesystems](./partitioning.md).

## Desktop and optional software

The installer can install a complete desktop, a lightweight desktop, a Wayland workflow or a command-line system without a desktop. KDE Plasma is selected by default. Choose one primary desktop preset to avoid duplicated applications, display managers and configuration.

See [desktop environments and window managers](/en/docs/desktops).

Additional selections include Fcitx5 or IBus, Fish or Zsh, LTS/Mainline/Zen/Hardened kernels, virtualization tools, Docker, Podman, development tools, Distroshelf and common applications.

## Driver configuration

After installing the target packages, Calamares runs:

```bash
chwd --autoconfigure
```

chwd matches PCI and USB devices against hardware profiles and installs the required graphics, network, virtual-machine guest and device-specific packages and configuration. See [hardware drivers](./hardware-drivers.md).

## Before confirming

Review the repository, boot method, target disk, filesystems, swap, desktop, extra kernels, optional software, username and timezone. After reboot, complete the [post-installation checks](./post-installation.md).
