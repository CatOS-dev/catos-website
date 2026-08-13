---
title: Boot methods and snapshots
sidebar_position: 6
description: Compare GRUB, Limine, rEFInd, systemd-boot, UKI and EFI Stub, including Secure Boot and CatOS Snapper integration.
---

# Boot methods and snapshots

Online installation can select the boot method. Firmware support, Secure Boot, EFI System Partition size and snapshot integration differ between choices.

## Choosing a boot method

| Boot method | Firmware | Recommended ESP | Bootable Btrfs snapshots | Recommended for |
| --- | --- | ---: | --- | --- |
| GRUB | UEFI and legacy BIOS | 300 MiB | Yes | Compatibility, dual boot and legacy BIOS |
| Limine | UEFI + GPT | 2 GiB | Yes | Modern, explicit boot configuration |
| rEFInd | UEFI + GPT | 512 MiB | Not currently integrated | Graphical UEFI management and automatic discovery |
| systemd-boot | UEFI + GPT | 2 GiB | Yes | Compact UEFI boot management |
| UKI | UEFI + GPT | 2 GiB | Not currently integrated | Advanced UKI users |
| EFI Stub | UEFI + GPT | 2 GiB | Not currently integrated | Direct firmware boot users |

Choose GRUB when uncertain.

### Limine

CatOS manages Limine with `limine-tool`, applies `catos-limine-theme`, and uses `limine-btrfs` to generate and verify snapshot entries. The current profile requires UEFI, GPT and at least a 1 GiB ESP; 2 GiB is recommended.

### rEFInd

rEFInd is a graphical UEFI boot manager that can discover installed operating systems and Linux kernels. CatOS generates `refind_linux.conf` from the installed root and kernel configuration.

The current CatOS integration requires UEFI and GPT, recommends a 512 MiB ESP, does not provide automatic bootable Btrfs snapshots, and is hidden when Secure Boot is active.

### systemd-boot

CatOS manages systemd-boot through `kernel-install` and `catos-systemd-boot-config`, with `sdboot-btrfs` for bootable snapshot entries.

### Unified Kernel Image (UKI)

UKI combines the kernel, initramfs and command line into one EFI executable. CatOS does not currently provide automatic bootable Btrfs snapshots for the UKI path.

### Linux EFI Stub

EFI Stub registers Linux kernel boot entries directly with UEFI firmware. CatOS does not currently provide automatic bootable Btrfs snapshots for this path, and the option is hidden while Secure Boot is active.

## Secure Boot support

CatOS 2026.08.05 adds Secure Boot support to the live image and installed-system workflow.

| Boot method | Automatic Secure Boot setup |
| --- | --- |
| GRUB | Supported |
| Limine | Supported |
| rEFInd | Not currently supported |
| systemd-boot | Supported |
| UKI | Supported |
| EFI Stub | Not currently supported |

For supported methods, `catos-secureboot` creates a machine-specific MOK and maintains signatures for kernels, external modules and EFI boot artifacts. See [Secure Boot](/en/docs/system/secure-boot).

## Snapshot combinations

Bootable snapshots require a Btrfs root filesystem and a supported boot method:

```text
GRUB         + Btrfs → Snapper + grub-btrfs
Limine       + Btrfs → Snapper + limine-btrfs
rEFInd       + Btrfs → no automatic boot-snapshot setup; configure Snapper manually
systemd-boot + Btrfs → Snapper + sdboot-btrfs
UKI          + Btrfs → no automatic boot-snapshot setup; configure Snapper manually
EFI Stub     + Btrfs → no automatic boot-snapshot setup; configure Snapper manually
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
