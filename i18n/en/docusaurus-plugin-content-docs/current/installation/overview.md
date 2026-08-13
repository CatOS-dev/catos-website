---
title: Install CatOS
sidebar_position: 1
description: Choose offline or online installation and review the important decisions before installing.
---

# Install CatOS

CatOS 2026.08.05 provides **offline installation** and **online installation**. Both use the Calamares graphical installer, but they differ in system source, customization and driver handling.

## Choose an installation mode

| Item | Offline installation | Online installation |
| --- | --- | --- |
| Network | Not required | Stable network required |
| System source | Copies the live system to disk | Installs the target system from repositories |
| Desktop | Uses the desktop included in the image | Choose a desktop, window manager or no desktop |
| Software | Uses the image software set | Choose input method, shell, kernels, virtualization, containers and applications |
| Repositories | Uses the image configuration | Choose CatOS or CatOS + CachyOS repositories |
| Boot method | Uses the offline default | Choose GRUB, Limine, rEFInd, systemd-boot, UKI or EFI Stub |
| Drivers | Keeps image drivers and removes unneeded components | Runs `chwd --autoconfigure` in the target system |
| Speed | Fast and independent of network quality | Depends on network and repository speed |

Choose [offline installation](./offline-installation.md) for a quick default installation without a network connection.

Choose [online installation](./online-installation.md) when you want to select repositories, boot method, desktop, kernels and additional software.

CatOS 2026.08.05 release images support Secure Boot. When the live environment itself was started with Secure Boot enabled, the installer only offers boot methods for which it can automatically prepare the installed system. See [Secure Boot](/en/docs/system/secure-boot).

## Before installing

1. Select the correct image on the [download page](/en/docs/download) and verify its SHA-256 checksum.
2. Back up all important data on the target disk.
3. Determine whether the machine boots with UEFI or legacy BIOS.
4. For dual boot, identify the existing EFI System Partition and save the Windows recovery key.
5. Prepare a reliable network for online installation.
6. To use bootable snapshots, choose Btrfs and a boot method with snapshot integration.

## Recommended reading

1. [Preparation](./preparation.md)
2. [Partitioning and filesystems](./partitioning.md)
3. [Boot methods and snapshots](./boot-and-snapshots.md)
4. [Desktop environments and window managers](/en/docs/desktops)
5. [Hardware drivers](./hardware-drivers.md)
6. [Post-installation checks](./post-installation.md)
