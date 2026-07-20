---
title: Snapshots and recovery
sidebar_position: 2
description: Btrfs, Snapper, transaction snapshots, and bootable snapshots in CatOS.
---

# Snapshots and recovery

CatOS uses Btrfs for subvolume snapshots, Snapper for snapshot metadata and retention, and bootloader-specific integration for bootable snapshots.

Automatic and bootable snapshots require a Btrfs root filesystem, a working Snapper `root` configuration, and a supported boot method.

| Boot method | Snapshot menu integration |
| --- | --- |
| GRUB | `grub-btrfs` |
| Limine | `limine-btrfs` |
| systemd-boot | `sdboot-btrfs` |
| UKI | Not configured automatically |
| EFI Stub | Not configured automatically |

## Automatic CatOS snapshots

`catos-snapper-config` evaluates a pacman transaction before it runs. It creates a single pre-transaction snapshot when either:

- the transaction touches kernel, initramfs, firmware, DKMS, UKI, encryption, or other boot-critical paths; or
- the transaction changes at least 25 distinct packages.

Small ordinary application installs normally do not create a snapshot, and hourly timeline snapshots are disabled by default.

```bash
cat /etc/catos-snapper.conf
snapper list
```

Inspect changes relative to the current system:

```bash
snapper status NUMBER..0
snapper diff NUMBER..0
```

Create a manual snapshot before a risky change:

```bash
sudo snapper -c root create \
  --type single \
  --cleanup-algorithm number \
  --description 'Before manual system change'
```

## Booting versus rolling back

Booting a historical snapshot is useful for diagnosis and data recovery, but does not by itself make that snapshot the permanent root state. A real rollback must account for the target snapshot, current data, kernel and initramfs resources, and the selected bootloader workflow.

Do not manually change the default Btrfs subvolume or make a read-only snapshot writable without understanding the installed subvolume layout.

## Boot resources

A root snapshot may not include the kernel and initramfs stored under `/boot`. CatOS GRUB, Limine, and systemd-boot integrations therefore maintain the snapshot menu and required boot resources instead of merely listing `.snapshots` directories.

## Cleanup

```bash
systemctl status snapper-cleanup.timer
sudo btrfs filesystem usage /
snapper list
```

Delete a confirmed snapshot with:

```bash
sudo snapper delete NUMBER
```

Snapshots normally remain on the same filesystem and disk. They do not protect against device loss, full-disk formatting, or filesystem-wide damage, so important data still needs an independent backup.
