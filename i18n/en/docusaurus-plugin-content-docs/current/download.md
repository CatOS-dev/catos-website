---
sidebar_position: 3
title: Download
description: Download CatOS 2026.11.12 standard and NVIDIA ISO images with mirrors and SHA-256 checksums.
---

# Download

CatOS is distributed as an ISO image. The current release is **CatOS 2026.11.12**, available as a standard image and an NVIDIA image. Previous releases remain available further down this page.

After downloading, verify both the filename and the SHA-256 checksum.

:::tip Already running CatOS?

CatOS is a rolling release. Existing users can receive regular package updates without reinstalling. See the [CatOS 2026.11.12 release notes](/en/news/2026-11-12-release) for changes in this release.

:::

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

## CatOS 2026.11.12

See the [CatOS 2026.11.12 release notes](/en/news/2026-11-12-release).

### Standard image

Filename:

```text
catos-2026.11.12-x86_64.iso
```

SHA-256:

```text
cac97535ad7af96297b0e31f64236e8b6027c38f97179c688584800a1edb8256
```

Download mirrors:

- [SourceForge](https://sourceforge.net/projects/catos/files/catos-2026.11.12-x86_64.iso/download)
- [Google Drive](https://drive.google.com/file/d/1accHaqtnAFLOnCqI3_QMcJDFn7dfoelq/view?usp=drive_link)
- [MEGA](https://mega.nz/file/YRhTFAhL#SHSO1m7KnSro0499IPIngz9622bGLeau8lZO21KYArY)
- [Baidu Netdisk (code: 6s9q)](https://pan.baidu.com/s/1-ZnGM_x-RAy8fOMZGneC7A?pwd=6s9q)

### NVIDIA image

Filename:

```text
catos-for-nvidia-2026.11.12-x86_64.iso
```

SHA-256:

```text
1a6aec3dc365be7d7a86f7a338810b49063dc53602972cacb54465ace0502254
```

Download mirrors:

- [SourceForge](https://sourceforge.net/projects/catos/files/catos-for-nvidia-2026.11.12-x86_64.iso/download)
- [MEGA](https://mega.nz/file/cFQDERAL#9Ik-214wB8ApZNywr5yMhhNwBjJTg3Hg5IiIJE5xcqQ)
- [Baidu Netdisk (code: 65ds)](https://pan.baidu.com/s/1p4b6zHruedxWKsC95zlbMw?pwd=65ds)

## Previous release: CatOS 2026.08.05

See the [CatOS 2026.08.05 release notes](/en/news/2026-08-05-release) for the main changes in this release.

### Standard image

Filename:

```text
catos-2026.08.05-x86_64.iso
```

SHA-256:

```text
b7611e316dbcd56e56ed2319274400f91d03fe1c0ab012499b125d9c7495a296
```

Download:

- [123 Cloud](https://1690957.share.123pan.cn/123pan/2LH9-M25ov?pwd=qgb8#)
- [Google Drive](https://drive.google.com/file/d/11QZjaZNfUx4OdVFtzPnQy7cLeLrXVntk/view?usp=sharing)
- [Baidu Netdisk](https://pan.baidu.com/s/1QFFmhDPiwgWylSfgt2X_jw?pwd=fiuk)
- [SourceForge](https://sourceforge.net/projects/catos/files/catos-2026.08.05-x86_64.iso)

### NVIDIA image

Filename:

```text
catos-for-nvidia-2026.08.05-x86_64.iso
```

SHA-256:

```text
c943c4561de6fc06285280a5948e0e515ae833205854768787f915eb772f4856
```

Download:

- [123 Cloud](https://1690957.share.123pan.cn/123pan/2LH9-qHWov?pwd=dNX9#)
- [Google Drive](https://drive.google.com/file/d/1Hw71UlVhFtN1cUtf9qOtgEsktxcBj1J8/view?usp=sharing)
- [Baidu Netdisk](https://pan.baidu.com/s/1VKMbnbQC1dXiS8FIqotwuA?pwd=iamd)
- [SourceForge](https://sourceforge.net/projects/catos/files/catos-for-nvidia-2026.08.05-x86_64.iso)

## Previous release: CatOS 2026.07.19

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
sha256sum catos-2026.11.12-x86_64.iso
sha256sum catos-for-nvidia-2026.11.12-x86_64.iso
sha256sum catos-2026.08.05-x86_64.iso
sha256sum catos-for-nvidia-2026.08.05-x86_64.iso
sha256sum catos-2026.07.19-x86_64.iso
sha256sum catos-for-nvidia-2026.07.19-x86_64.iso
```

The output must exactly match the SHA-256 value shown on this page. Do not install an image that fails verification.
