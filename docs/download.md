---
sidebar_position: 3
title: 下载
description: 下载 CatOS 2026.08.05 系统镜像，并保留 CatOS 2026.07.19 历史版本下载与 SHA-256 校验信息。
---

# 下载

CatOS 以 ISO 镜像文件的方式分发。当前发布版本为 **CatOS 2026.08.05**，提供普通版和 NVIDIA 版两个镜像。CatOS 2026.07.19 的下载信息继续保留在本页下方。

下载完成后，请务必核对文件名与 SHA-256 校验值。

## 如何选择镜像

镜像的主要区别是 NVIDIA 显卡驱动和启动环境。请按机器中实际存在的独立显卡型号选择；笔记本即使同时带有 Intel 或 AMD 核显，只要还带有 NVIDIA 独立显卡，也应按 NVIDIA 独显型号判断。

| 显卡情况 | 建议镜像 | 说明 |
| --- | --- | --- |
| 仅 Intel、AMD 显卡，或没有 NVIDIA 显卡 | **普通版** | 不需要 NVIDIA 专用启动和驱动配置。 |
| GeForce GTX 10 系列及更早型号 | **普通版** | 这些显卡早于 GTX 16 系列，不属于 NVIDIA 版主要面向的现代显卡范围。 |
| GeForce GTX 16、RTX 20、RTX 30、RTX 40 系列 | **建议 NVIDIA 版** | GTX 16 与 RTX 20 属于 Turing，RTX 30 属于 Ampere，RTX 40 属于 Ada Lovelace。普通版通常也能够启动并进入桌面，但 NVIDIA 版更适合作为安装和日常使用的首选。 |
| GeForce RTX 50 系列及更新型号 | **必须使用 NVIDIA 版** | RTX 50 使用 Blackwell 架构，需要 NVIDIA 版提供的现代 NVIDIA 驱动和启动环境。 |

简化判断：

- **没有 NVIDIA 显卡：选择普通版。**
- **GTX 10 系列及更早：选择普通版。**
- **GTX 16 / RTX 20 到 RTX 40：优先选择 NVIDIA 版；普通版一般也能进入桌面。**
- **RTX 50 及更新型号：必须选择 NVIDIA 版。**

:::tip 不确定显卡型号时

在已有 Linux 系统或 CatOS Live 环境中，可以执行：

```bash
lspci -k -d ::03xx
```

在 Windows 中可打开“设备管理器”并查看“显示适配器”。混合显卡笔记本需要同时检查核显和独立显卡，不要只根据当前负责输出画面的显卡判断。

:::

NVIDIA 在不同架构上使用的驱动包和支持状态并不完全相同。更完整的分代、驱动选择与故障排查说明请参考 [ArchWiki：NVIDIA](https://wiki.archlinux.org/title/NVIDIA)。

## CatOS 2026.08.05

本次版本的主要变化见 [CatOS 2026.08.05 更新日志](/news/2026-08-05-release)。

### 普通版

文件名：

```text
catos-2026.08.05-x86_64.iso
```

SHA-256：

```text
b7611e316dbcd56e56ed2319274400f91d03fe1c0ab012499b125d9c7495a296
```

下载地址：

- [123云盘](https://1690957.share.123pan.cn/123pan/2LH9-M25ov?pwd=qgb8#)
- [Google Drive](https://drive.google.com/file/d/11QZjaZNfUx4OdVFtzPnQy7cLeLrXVntk/view?usp=sharing)
- [百度网盘](https://pan.baidu.com/s/1QFFmhDPiwgWylSfgt2X_jw?pwd=fiuk)
- [SourceForge](https://sourceforge.net/projects/catos/files/catos-2026.08.05-x86_64.iso)

### NVIDIA 版

文件名：

```text
catos-for-nvidia-2026.08.05-x86_64.iso
```

SHA-256：

```text
c943c4561de6fc06285280a5948e0e515ae833205854768787f915eb772f4856
```

下载地址：

- [123云盘](https://1690957.share.123pan.cn/123pan/2LH9-qHWov?pwd=dNX9#)
- [Google Drive](https://drive.google.com/file/d/1Hw71UlVhFtN1cUtf9qOtgEsktxcBj1J8/view?usp=sharing)
- [百度网盘](https://pan.baidu.com/s/1VKMbnbQC1dXiS8FIqotwuA?pwd=iamd)
- [SourceForge](https://sourceforge.net/projects/catos/files/catos-for-nvidia-2026.08.05-x86_64.iso)

## 历史版本：CatOS 2026.07.19

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
sha256sum catos-2026.08.05-x86_64.iso
sha256sum catos-for-nvidia-2026.08.05-x86_64.iso
sha256sum catos-2026.07.19-x86_64.iso
sha256sum catos-for-nvidia-2026.07.19-x86_64.iso
```

命令输出必须与本页列出的 SHA-256 完全一致。校验失败时不要继续安装，请重新下载镜像。

## 获取帮助

安装前请阅读[安装前准备](./installation/preparation.md)。如需获取测试镜像或反馈问题，可加入 CatOS 官方 QQ 群（群号：`428382413`）。

![CatOS QQ群二维码](/img/qrcode_catos2.jpg)
