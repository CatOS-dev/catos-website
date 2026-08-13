---
title: Preparation
sidebar_position: 2
description: Check hardware, verify the image and create installation media with Ventoy, Rufus, Etcher or ISO Image Writer.
---

# Preparation

## System requirements

CatOS 2026.08.05 is provided only for `x86_64`. It does not support ARM, LoongArch or 32-bit x86 processors.

Minimum:

- 64-bit dual-core processor;
- 4 GB RAM;
- 30 GB free disk space;
- 8 GB or larger USB drive.

Recommended:

- 64-bit processor with four or more cores;
- 8 GB or more RAM;
- 64 GB or larger SSD;
- UEFI firmware;
- stable wired network or reliable Wi-Fi for online installation.

## Download and verify the image

Choose the standard or NVIDIA image on the [download page](/en/docs/download), then verify it:

```bash
sha256sum catos-2026.08.05-x86_64.iso
sha256sum catos-for-nvidia-2026.08.05-x86_64.iso
```

Do not write or install an image whose checksum does not match.

## Choose a USB creation tool

| Tool | Platforms | Best use |
| --- | --- | --- |
| Ventoy | Windows, Linux | Store multiple ISO files and replace them without reflashing |
| Rufus | Windows | Direct image writing with firmware and partition options |
| balenaEtcher | Windows, Linux, macOS | Simple single-image flashing workflow |
| ISO Image Writer | Linux | KDE graphical ISO writing tool |
| `dd` | Linux, macOS | Advanced users familiar with block devices |

:::warning Data on the selected device will be destroyed

Always identify the USB drive by model and size. Selecting the wrong device can erase another disk.

:::

## Ventoy

Ventoy installs a boot environment on the USB drive. Afterwards, copy ISO files to its data partition instead of flashing the drive again. Ventoy lists all copied images at boot.

Links:

- [Ventoy website](https://www.ventoy.net/en/index.html)
- [Getting started](https://www.ventoy.net/en/doc_start.html)
- [Download page](https://www.ventoy.net/en/download.html)
- [GitHub releases](https://github.com/ventoy/Ventoy/releases)
- [Source repository](https://github.com/ventoy/Ventoy)

### Windows

1. Download and extract Ventoy.
2. Run `Ventoy2Disk.exe`.
3. Select the USB drive.
4. Install Ventoy and confirm the destructive operation.
5. Copy the CatOS ISO to the Ventoy data partition.
6. Boot the USB drive and select the ISO from the menu.

### Linux

Extract Ventoy and run:

```bash
sudo sh Ventoy2Disk.sh -i /dev/sdX
```

`/dev/sdX` must be the whole USB device, not a partition such as `/dev/sdX1`. Verify it first:

```bash
lsblk -o NAME,SIZE,MODEL,TRAN,MOUNTPOINTS
```

CatOS 2026.08.05 itself supports UEFI Secure Boot, but Ventoy adds its own boot chain and key-enrollment path. If Ventoy cannot boot CatOS with Secure Boot enabled, try a direct write with Rufus, Etcher or ISO Image Writer first; temporarily disabling Secure Boot should be a troubleshooting step rather than the default requirement.

## Rufus on Windows

- [Rufus website](https://rufus.ie/)
- [Rufus source repository](https://github.com/pbatard/rufus)

Select the USB device and CatOS ISO, keep the default partition settings unless you have a specific requirement, and start writing.

![Rufus device and image selection](/img/docs/windows_rufus_01.jpg)

![Rufus write confirmation](/img/docs/windows_rufus_02.jpg)

![Rufus completed](/img/docs/windows_rufus_03.jpg)

If Rufus asks between ISO and DD mode, try the recommended mode first. Recreate the drive in DD mode if it does not boot.

## balenaEtcher

- [balenaEtcher website](https://etcher.balena.io/)
- [balenaEtcher source repository](https://github.com/balena-io/etcher)

Etcher is suitable when you want a simple select-image, select-device and flash workflow.

## ISO Image Writer on Linux

- [KDE ISO Image Writer](https://apps.kde.org/isoimagewriter/)

Arch Linux:

```bash
sudo pacman -S isoimagewriter
```

Ubuntu:

```bash
sudo apt install isoimagewriter
```

Fedora:

```bash
sudo dnf install isoimagewriter
```

![ISO Image Writer](/img/docs/linux_isowriter.png)

## Direct writing with `dd`

Use only when you can identify the block device confidently:

```bash
sudo dd if=catos-2026.08.05-x86_64.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

Use the NVIDIA filename when writing that image. The output must be the whole device, not a numbered partition.

## Boot the installation media

Use the firmware boot menu, commonly opened with `F12`, `F11`, `Esc` or `F8`, and prefer the entry marked `UEFI`. If boot fails, verify the image again and check Secure Boot settings.
