---
title: Updating the system
sidebar_position: 6
---

# Updating the system

CatOS follows the Arch Linux rolling-release model. An update may involve Arch, CatOS, optional CachyOS repositories, and user-selected AUR packages.

Preview repository updates with `checkupdates` from `pacman-contrib`:

```bash
checkupdates
```

On Btrfs systems, inspect recent snapshots before a major update:

```bash
snapper list
```

Run a complete repository upgrade:

```bash
sudo pacman -Syu
```

To include AUR packages, use one helper:

```bash
yay -Syu
```

or:

```bash
paru -Syu
```

Read replacement and conflict prompts, `.pacnew` and `.pacsave` notices, kernel and DKMS output, graphics-driver messages, bootloader generation, and AUR recipe changes.

Find pending configuration files:

```bash
sudo find /etc -name '*.pacnew' -o -name '*.pacsave'
```

Reboot after kernel, CPU microcode, graphics-driver, systemd, glibc, initramfs, encryption, or bootloader changes. Confirm the update completed successfully first.

For keyring errors, check the clock, update keyrings, and immediately finish the upgrade:

```bash
timedatectl
sudo pacman -Sy archlinux-keyring catos-keyring
sudo pacman -Su
```

Do not stop after the database refresh.

If an update prevents booting and Btrfs boot snapshots are enabled, use an earlier snapshot for diagnosis. See [Snapshots and recovery](../system/snapshots.md).
