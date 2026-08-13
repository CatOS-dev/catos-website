---
title: Post-installation checks
sidebar_position: 8
description: Verify updates, filesystems, boot, snapshots, drivers, network and desktop after first boot.
---

# Post-installation checks

Remove the installation USB drive and confirm the machine boots from the target disk.

## Update the complete system

```bash
sudo pacman -Syu
```

Do not maintain a partially upgraded Arch-based system.

## Kernel, time and mounts

```bash
uname -a
timedatectl
findmnt /
findmnt /boot/efi
lsblk -f
swapon --show
```

Confirm the expected root filesystem, ESP and swap configuration.

## Boot entries

On UEFI systems:

```bash
efibootmgr -v
```

For GRUB, inspect generated entries:

```bash
grep -E '^menuentry ' /boot/grub/grub.cfg | head
```

For Limine, rEFInd, systemd-boot, UKI and EFI Stub, verify their generated configuration and EFI files.

rEFInd users can also check:

```bash
test -f /boot/refind_linux.conf && echo 'rEFInd kernel options present'
```

## Secure Boot

If the live environment was started with Secure Boot enabled during installation, check after reboot:

```bash
mokutil --sb-state
sudo catos-secureboot status
sudo catos-secureboot verify
```

If the machine certificate is still enrollment-pending, complete MokManager enrollment first. See [Secure Boot](/en/docs/system/secure-boot).

## Snapshots

On Btrfs:

```bash
snapper list
systemctl status snapper-cleanup.timer
```

When using GRUB, Limine or systemd-boot snapshot integration, also verify that snapshot entries appear in the boot menu.

## Graphics and hardware

```bash
lspci -k -d ::03xx
nmcli device
systemctl status NetworkManager
systemctl status bluetooth
```

NVIDIA users should also run:

```bash
nvidia-smi
```

Test internal and external displays, Wi-Fi, Bluetooth, audio, microphone, camera, touchpad, suspend and resume.

## Desktop session

Confirm the login session matches the selected desktop or window manager. When several environments are installed, verify the display manager and XDG Portal used by the primary desktop.

## Keep diagnostic information

Useful information for bug reports:

```bash
journalctl -b
lspci -nnk
lsblk -f
efibootmgr -v
```

The Calamares log is normally stored in the live session at:

```text
~/.cache/calamares/session.log
```

Include the image filename, offline or online mode, repository, boot method, partition table, filesystem, desktop and GPU model.

Finally, create an independent backup. Btrfs snapshots do not protect against loss of the physical disk.
