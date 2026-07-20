---
sidebar_position: 3
title: 下载
description: 下载 CatOS 2026.07.19 系统镜像并核对 SHA-256 校验值。
---

# 下载

CatOS 以 ISO 镜像文件的方式分发。当前发布版本为 **CatOS 2026.07.19**，提供普通版和 NVIDIA 版两个镜像。

下载完成后，请务必核对文件名与 SHA-256 校验值。

## 普通版

文件名：

```text
catos-2026.07.19-x86_64.iso
```

SHA-256：

```text
5543f37bbe0c96eee1753a99012d9d5cb56e007ee0ab5aada1883ae4d1553b16
```

下载地址：

- [OneDrive](https://sym2005-my.sharepoint.com/:u:/g/personal/symwww_sym2005_onmicrosoft_com/IQAA2n9PY2WhSbLlW678lh3dAXeqAQpvMrU_QMbE_WoRmb0?e=JdcvL1)
- [123云盘](https://1690957.share.123pan.cn/123pan/2LH9-kzQEv)
- [SourceForge](https://sourceforge.net/projects/catos/files/catos-2026.07.19-x86_64.iso)

## NVIDIA 版

文件名：

```text
catos-for-nvidia-2026.07.19-x86_64.iso
```

SHA-256：

```text
a1d2808c43e33054d6d2099c91c076a8d44c3d90aefc3f8bfa2845b1ec1d38e7
```

下载地址：

- [OneDrive](https://sym2005-my.sharepoint.com/:u:/g/personal/symwww_sym2005_onmicrosoft_com/IQBzeP0HJsmEQZgzn9fFwhEJATrTUjGVpXgnA-2E3-_VFZ8?e=mbVfiS)
- [123云盘](https://1690957.share.123pan.cn/123pan/2LH9-EzQEv)
- [SourceForge](https://sourceforge.net/projects/catos/files/catos-for-nvidia-2026.07.19-x86_64.iso)

## 校验镜像

Linux 下可使用：

```bash
sha256sum catos-2026.07.19-x86_64.iso
sha256sum catos-for-nvidia-2026.07.19-x86_64.iso
```

命令输出必须与本页列出的 SHA-256 完全一致。校验失败时不要继续安装，请重新下载镜像。

## 获取帮助

安装前请阅读[安装前准备](./installation/preparation.md)。如需获取测试镜像或反馈问题，可加入 CatOS 官方 QQ 群（群号：`428382413`）。

![CatOS QQ群二维码](/img/qrcode_catos2.jpg)
