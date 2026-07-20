---
sidebar_position: 3
title: Download
description: Download CatOS 2026.07.19 images and verify their SHA-256 checksums.
---

# Download

CatOS is distributed as an ISO image. The current release is **CatOS 2026.07.19**, available as a standard image and an NVIDIA image.

After downloading, verify both the filename and the SHA-256 checksum.

## Choosing the correct image

The main difference is the NVIDIA driver and boot environment. Choose based on the discrete GPU actually installed in the machine. On a hybrid-graphics laptop, the presence of an Intel or AMD integrated GPU does not change the choice: use the NVIDIA GPU model to decide.

| Graphics hardware | Recommended image | Notes |
| --- | --- | --- |
| Intel or AMD graphics only, with no NVIDIA GPU | **Standard image** | No NVIDIA-specific boot or driver setup is required. |
| GeForce GTX 10 Series or older | **Standard image** | These cards predate the GTX 16 Series and are outside the modern NVIDIA range targeted by the NVIDIA image. |
| GeForce GTX 16, RTX 20, RTX 30, or RTX 40 Series | **NVIDIA image recommended** | GTX 16 and RTX 20 are Turing, RTX 30 is Ampere, and RTX 40 is Ada Lovelace. The standard image can usually still boot to the desktop, but the NVIDIA image is the preferred choice for installation and regular use. |
| GeForce RTX 50 Series or newer | **NVIDIA image required** | RTX 50 uses the Blackwell architecture and requires the modern NVIDIA driver and boot environment included in the NVIDIA image. |

In brief:

- **No NVIDIA GPU: use the standard image.**
- **GTX 10 Series or older: use the standard image.**
- **GTX 16 / RTX 20 through RTX 40: prefer the NVIDIA image; the standard image can usually still reach the desktop.**
- **RTX 50 or newer: the NVIDIA image is required.**

:::tip If you do not know the GPU model

On an existing Linux system or in a CatOS live environment, run:

```bash
lspci -k -d ::03xx
```

On Windows, open Device Manager and inspect Display adapters. On a hybrid-graphics laptop, check both the integrated and discrete GPUs instead of looking only at the GPU currently driving the display.

:::

Driver packages and support status differ between NVIDIA architectures. See the [ArchWiki NVIDIA page](https://wiki.archlinux.org/title/NVIDIA) for the full architecture and driver matrix and troubleshooting guidance.

## Standard image

Filename:

```text
catos-2026.07.19-x86_64.iso
```

SHA-256:

```text
5543f37bbe0c96eee1753a99012d9d5cb56e007ee0ab5aada1883ae4d1553b16
```

Download mirrors:

- [OneDrive](https://sym2005-my.sharepoint.com/:u:/g/personal/symwww_sym2005_onmicrosoft_com/IQAA2n9PY2WhSbLlW678lh3dAXeqAQpvMrU_QMbE_WoRmb0?e=JdcvL1)
- [123 Cloud](https://1690957.share.123pan.cn/123pan/2LH9-kzQEv)
- [SourceForge](https://sourceforge.net/projects/catos/files/catos-2026.07.19-x86_64.iso)

## NVIDIA image

Filename:

```text
catos-for-nvidia-2026.07.19-x86_64.iso
```

SHA-256:

```text
a1d2808c43e33054d6d2099c91c076a8d44c3d90aefc3f8bfa2845b1ec1d38e7
```

Download mirrors:

- [OneDrive](https://sym2005-my.sharepoint.com/:u:/g/personal/symwww_sym2005_onmicrosoft_com/IQBzeP0HJsmEQZgzn9fFwhEJATrTUjGVpXgnA-2E3-_VFZ8?e=mbVfiS)
- [123 Cloud](https://1690957.share.123pan.cn/123pan/2LH9-EzQEv)
- [SourceForge](https://sourceforge.net/projects/catos/files/catos-for-nvidia-2026.07.19-x86_64.iso)

## Verify the image

On Linux, run:

```bash
sha256sum catos-2026.07.19-x86_64.iso
sha256sum catos-for-nvidia-2026.07.19-x86_64.iso
```

The output must exactly match the SHA-256 value shown on this page. Do not install an image that fails verification.
