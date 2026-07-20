---
title: Hardware drivers
sidebar_position: 7
description: Understand offline driver cleanup and online chwd automatic hardware configuration.
---

# Hardware drivers

Driver handling differs by installation mode.

## Offline installation

Offline installation keeps drivers from the selected image and removes components that are not appropriate for the target:

- the standard image does not include the modern NVIDIA stack;
- the NVIDIA image removes NVIDIA-only packages when no NVIDIA GPU is detected;
- physical installations remove live VirtualBox, VMware and QEMU guest tools.

It does not run the complete `chwd --autoconfigure` process, so selecting the correct image is important.

## Online installation

Calamares runs the following command inside the installed target system:

```bash
chwd --autoconfigure
```

The process scans PCI and USB devices, matches hardware IDs against profiles, installs driver packages and writes module, initramfs and device-specific configuration.

Profiles cover major Intel, AMD and NVIDIA graphics configurations, hybrid NVIDIA laptops, some legacy NVIDIA branches, selected network devices, virtual-machine guests, handheld devices, T2 Macs and some fingerprint devices.

## Projects and documentation

- [CachyOS upstream chwd](https://github.com/CachyOS/chwd)
- [CatOS chwd fork](https://github.com/CatOS-dev/chwd)
- [CachyOS Wiki chwd documentation](https://wiki.cachyos.org/features/chwd/chwd/)

CatOS uses its fork so hardware profiles can match CatOS repositories, kernels, images and installer behavior while continuing to inherit upstream design and hardware data.

## NVIDIA

- GTX 10 Series or older: standard image.
- GTX 16 and RTX 20 through RTX 40: NVIDIA image recommended.
- RTX 50 or newer: NVIDIA image required.

See the [CatOS image guide](/en/docs/download#choosing-the-correct-image) and [ArchWiki NVIDIA page](https://wiki.archlinux.org/title/NVIDIA).

## Limits of automatic configuration

New device IDs, vendor-specific hybrid graphics, external GPUs, third-party DKMS modules and firmware defects may still require manual work. Test display outputs, suspend, Wi-Fi, Bluetooth, sound and input devices after installation.

Useful checks:

```bash
lspci -k -d ::03xx
lspci -nnk
nvidia-smi
chwd --help
```
