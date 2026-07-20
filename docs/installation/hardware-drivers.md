---
title: 硬件驱动
sidebar_position: 7
description: 了解离线和在线安装的驱动处理方式，以及 CatOS 如何使用 chwd 自动配置硬件。
---

# 硬件驱动

CatOS 的驱动处理取决于安装方式。离线安装继承镜像内置驱动并清理不适用的软件包；在线安装会在目标系统中运行 chwd，根据实际硬件选择驱动配置。

## 离线安装

离线安装不会执行完整的 `chwd --autoconfigure` 流程。

- 普通镜像面向 Intel、AMD 和较早的 NVIDIA 显卡；
- NVIDIA 镜像预装现代 NVIDIA 驱动组合；
- NVIDIA 镜像安装到没有 NVIDIA 显卡的设备时，收尾脚本会移除 NVIDIA 专用软件包；
- 物理机安装会清理 VirtualBox、VMware 和 QEMU 的 Live 客体工具。

因此，离线安装前应先在[下载页面](/docs/download)选择正确镜像。

## 在线安装

在线安装先安装基础系统、桌面和软件包，然后由 Calamares 在目标根目录中执行：

```bash
chwd --autoconfigure
```

chwd 的基本流程是：

```text
扫描 PCI 和 USB 设备
        ↓
匹配硬件 ID 和 chwd 配置文件
        ↓
选择适用的硬件配置
        ↓
安装驱动与辅助软件包
        ↓
写入模块、initramfs 和设备相关配置
```

安装器会把 chwd 的输出写入 Calamares 日志。驱动配置失败时，在线安装应报告错误，而不是静默跳过。

## chwd 可以处理什么

当前配置覆盖的主要范围包括：

- NVIDIA、AMD、Intel 显卡；
- NVIDIA 混合显卡所需的 Prime 和切换组件；
- 新版和部分旧版 NVIDIA 驱动分支；
- Broadcom 等部分网络设备；
- QEMU/KVM、VirtualBox 和 VMware 客体驱动；
- 部分掌机设备；
- Apple T2 Mac 相关配置；
- 部分指纹设备。

具体结果取决于硬件 ID、所选软件仓库以及安装时可用的软件包。

## CatOS 与 CachyOS chwd

chwd 最初由 CachyOS 开发。CatOS 使用自己的分支，使硬件配置与 CatOS 仓库、内核、安装器和 NVIDIA 镜像保持一致。

- [CachyOS 原版 chwd](https://github.com/CachyOS/chwd)
- [CatOS chwd 分支](https://github.com/CatOS-dev/chwd)
- [CachyOS Wiki：chwd](https://wiki.cachyos.org/features/chwd/chwd/)

CatOS 分支保留上游的硬件检测和配置模型，并根据 CatOS 的软件包与安装流程进行调整。硬件数据库和驱动支持仍会随上游和软件仓库更新而变化。

## NVIDIA 显卡

NVIDIA 用户首先应选择正确的安装镜像：

- GTX 10 系列及更早：普通版；
- GTX 16、RTX 20、RTX 30、RTX 40：建议 NVIDIA 版；
- RTX 50 及更新型号：必须使用 NVIDIA 版。

在线安装时，chwd 会根据设备 ID 选择现代 NVIDIA、旧版分支或 Nouveau 配置，并在笔记本混合显卡场景中加入相应组件。

更完整的架构和驱动说明见：

- [CatOS 镜像选择](/docs/download#如何选择镜像)
- [ArchWiki：NVIDIA](https://wiki.archlinux.org/title/NVIDIA)

## 自动配置的边界

chwd 可以减少手工选择驱动，但不能保证所有硬件无需调整。以下情况可能需要人工处理：

- 刚发布、硬件 ID 尚未进入数据库的设备；
- 厂商定制的混合显卡或 MUX 设计；
- 外接 GPU；
- 特殊内核、第三方 DKMS 模块；
- 需要专有固件但仓库暂未提供的设备；
- BIOS/UEFI 固件缺陷。

安装后应实际测试显示输出、休眠、外接屏、Wi-Fi、蓝牙、音频和触摸板。

## 安装后检查驱动

查看显卡及当前内核驱动：

```bash
lspci -k -d ::03xx
```

查看所有 PCI 设备和驱动：

```bash
lspci -k
```

NVIDIA 用户可检查：

```bash
nvidia-smi
lsmod | grep -E 'nvidia|nouveau'
```

查看 chwd 可识别的硬件配置时，请参考项目文档和命令帮助：

```bash
chwd --help
```

出现问题时，请同时提供 `lspci -nnk`、内核版本和 Calamares 日志。
