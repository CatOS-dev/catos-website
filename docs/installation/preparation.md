---
title: 安装前准备
sidebar_position: 2
description: CatOS 的配置要求、镜像获取和启动盘制作方法。
---

# 安装前准备

:::note 旧站内容

以下教程来自旧版网站。镜像版本、硬件支持和工具界面可能已经变化。

:::

在正式开始安装CatOS前，需要先进行一些准备工作。

## 系统配置要求

为了保证顺利地完成系统安装，请先确认您的计算机满足以下配置要求。

:::note

旧版CatOS仅支持x86架构处理器，不支持ARM、LoongArch等架构。

:::

### 最低配置

- CPU：1GHz
- 内存：2GB
- 硬盘：20GB

### 推荐配置

- CPU：双核2GHz
- 内存：4GB
- 硬盘：50GB，推荐使用固态硬盘

## 获取系统镜像

请前往[下载页面](/docs/download)获取CatOS系统安装镜像。

## 创建USB启动盘

:::note

如果您计划将CatOS安装至虚拟机，则可跳过此步骤。

:::

在安装系统至物理磁盘之前，需要先创建一个USB启动盘。请准备一个容量至少4GB的U盘，推荐使用8GB以上的USB 3.0接口U盘。

:::warning

创建USB启动盘会格式化U盘，U盘中的所有数据都会被抹除，请提前备份。

:::

### Windows

如果当前使用Windows，旧版教程推荐使用Rufus：

1. 将U盘插入计算机；
2. 下载并打开[Rufus](https://rufus.ie/)；
3. 在“设备”中选择刚才插入的U盘；
4. 在“引导类型选择”处点击“选择”，选择CatOS安装镜像；
5. 其他选项保持默认，点击“开始”；
6. 弹出提示框后点击“OK”；
7. 等待写入完成后关闭软件。

![Rufus选择设备和镜像](/img/docs/windows_rufus_01.jpg)

![Rufus写入提示](/img/docs/windows_rufus_02.jpg)

![Rufus写入完成](/img/docs/windows_rufus_03.jpg)

除Rufus外，也可以使用Balena Etcher、Ventoy等工具。

### Linux

旧版教程推荐使用ISO Image Writer：

Arch Linux：

```bash
sudo pacman -S isoimagewriter
```

Ubuntu：

```bash
sudo apt install isoimagewriter
```

Fedora：

```bash
sudo dnf install isoimagewriter
```

CentOS：

```bash
sudo yum install isoimagewriter
```

打开ISO Image Writer后，在“至此USB驱动器”中选择U盘，在“写入此ISO镜像”中选择CatOS镜像，然后点击“创建”。

![ISO Image Writer](/img/docs/linux_isowriter.png)

也可以使用Balena Etcher、Ventoy或命令行工具`dd`。

## 准备就绪

完成以上步骤后，即可继续阅读[安装至物理硬盘](./physical-installation.md)。
