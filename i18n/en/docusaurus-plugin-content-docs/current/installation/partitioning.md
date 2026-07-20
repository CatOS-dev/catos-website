---
title: Partitioning and filesystems
sidebar_position: 5
description: Choose GPT or MBR, automatic or manual partitioning, filesystems and swap.
---

# Partitioning and filesystems

Partitioning determines where system data is stored and limits boot, encryption, hibernation and snapshot choices. Back up important data before changing partitions.

## Partition table

| Environment | Recommendation | Notes |
| --- | --- | --- |
| Modern UEFI system | GPT | Supports every CatOS UEFI boot method |
| Windows 10/11 dual boot | GPT | Use the same firmware mode as Windows |
| Legacy BIOS | MBR or GPT | GRUB only; GPT may need a BIOS Boot partition |
| Limine | GPT | Current CatOS profile requires UEFI + GPT |
| systemd-boot, UKI, EFI Stub | GPT | UEFI only |

Do not mix UEFI and legacy BIOS on the same dual-boot installation.

## Installation methods

- **Erase disk:** simplest option, destroys all data on the target disk.
- **Install alongside:** shrinks an existing partition for dual boot.
- **Replace a partition:** formats one selected partition.
- **Manual partitioning:** required for custom layouts, reused ESPs and advanced dual boot.

## Manual partitioning

A UEFI installation needs:

1. a FAT32 EFI System Partition mounted at `/boot/efi`;
2. a root filesystem mounted at `/`;
3. optional swap.

An existing Windows ESP can usually be reused without formatting. Verify its free space first.

## EFI System Partition size

| Boot method | Minimum | Recommended |
| --- | ---: | ---: |
| GRUB | 300 MiB | 300 MiB or more |
| Limine | 1 GiB | 2 GiB |
| systemd-boot | 1 GiB | 2 GiB |
| UKI | 1 GiB | 2 GiB |
| EFI Stub | 1 GiB | 2 GiB |

Non-GRUB methods may store kernels, initramfs files or UKIs in the ESP and therefore need more space.

## Filesystems

The installer offers Btrfs, ext4, ext3, JFS, XFS and F2FS.

- **Btrfs:** CatOS default; supports subvolumes, Snapper and bootable snapshots with supported boot methods.
- **ext4:** simple and broadly compatible; no CatOS Btrfs snapshot integration.
- **XFS:** for experienced users who understand its management and shrinking limitations.
- **F2FS:** for specific flash-storage workloads, not automatically better for every SSD.
- **ext3 and JFS:** compatibility choices, not recommended for a new general desktop installation.

Snapshots are not backups and do not protect against disk failure.

## Separate `/home`

A separate `/home` partition is optional. It can simplify retaining user files during reinstallation, but user configuration can still cause compatibility issues and the partition still needs a backup. For a normal Btrfs installation, subvolumes are often more flexible.

## Swap

Available choices are no swap, a small swap partition, swap sized for hibernation and a swap file.

- Use hibernation-sized swap when you need suspend-to-disk.
- A swap file or small swap is suitable for ordinary desktop use.
- Low-memory systems should not disable swap without understanding out-of-memory behavior.
