---
sidebar_position: 3
title: Download
description: Download CatOS 2026.07.19 images and verify their SHA-256 checksums.
---

# Download

CatOS is distributed as an ISO image. The current release is **CatOS 2026.07.19**, available as a standard image and an NVIDIA image.

After downloading, verify both the filename and the SHA-256 checksum.

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
