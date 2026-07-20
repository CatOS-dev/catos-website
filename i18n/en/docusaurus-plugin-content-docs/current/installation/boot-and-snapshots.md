---
title: Boot methods and snapshots
sidebar_position: 6
description: Compare GRUB, Limine, systemd-boot, UKI and EFI Stub and understand CatOS Snapper integration.
---

# Boot methods and snapshots

| Boot method | Firmware | Recommended ESP | Bootable Btrfs snapshots | Recommended for |
| --- | --- | ---: | --- | --- |
| GRUB | UEFI and legacy BIOS | 300 MiB | Yes | Compatibility, dual boot and legacy BIOS |
| Limine | UEFI + GPT | 2 GiB | Yes | Modern, explicit boot configuration |
| systemd-boot | UEFI + GPT | 2 GiB | Yes | Compact UEFI boot management |
| UKI | UEFI + GPT | 2 GiB | No current boot-snapshot integration | Advanced UKI users |
| EFI Stub | UEFI + GPT | 2 GiB | No current boot-snapshot integration | Direct firmware boot users |

Choose GRUB when uncertain. CatOS manages Limine with `limine-tool`, systemd-boot with `kernel-install`, and UKI with systemd tooling.

## Snapshot combinations

Bootable snapshots require a Btrfs root filesystem and a supported boot method:

```text
GRUB         + Btrfs → Snapper + grub-btrfs
Limine       + Btrfs → Snapper + limine-btrfs
systemd-boot + Btrfs → Snapper + sdboot-btrfs
UKI          + Btrfs → no automatic snapshot setup; configure Snapper manually
EFI Stub     + Btrfs → no automatic snapshot setup; configure Snapper manually
```

## Automatic snapshot policy

`catos-snapper-config` creates a single pre-transaction snapshot when:

- a transaction changes kernel, initramfs, firmware, DKMS, UKI, encryption or other boot-critical paths; or
- at least 25 distinct packages are changed in one transaction.

It records the reason and package count, enables number-based cleanup and does not enable hourly snapshots by default.

## Booting versus rolling back

Booting a snapshot lets you test an earlier system state. A permanent rollback is a separate explicit operation. Snapshots normally share the same disk as the live system and do not replace independent backups.

After installation, check:

```bash
findmnt /
snapper list
systemctl status snapper-cleanup.timer
```
