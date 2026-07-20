---
title: 安装至物理硬盘
sidebar_position: 3
description: 使用旧版 CatOS LiveCD 和 Calamares 安装系统。
---

# 安装至物理硬盘

:::note 旧站内容

以下步骤和截图来自旧版安装介质。当前安装器的选项、启动器和页面顺序可能已经变化。

:::

本节内容将引导您将CatOS安装至物理硬盘。在此之前，请先完成[安装前准备](./preparation.md)。

## 一、启动至LiveCD模式

旧版CatOS不支持安全启动，需要在BIOS/UEFI中关闭Secure Boot后再启动安装介质。

1. 插入准备好的系统启动U盘；
2. 重启计算机，在开机阶段按`F2`或`Esc`进入BIOS/UEFI；
3. 找到启动顺序，将USB设备设置为第一启动项；
4. 保存并退出，系统将启动至LiveCD模式。

不同型号进入BIOS/UEFI和关闭安全启动的方法不同，请查阅设备说明或搜索对应型号的操作方法。

## 二、安装CatOS

进入LiveCD后，点击桌面左上角的“安装CatOS”图标进入安装向导。旧版桌面还提供“安装CatOS（联网）”入口，允许选择桌面环境和软件包，但该模式当时仍处于开发阶段。

1. 打开安装向导，点击下一步。

   ![打开CatOS安装器](/img/docs/install_catos_01.png)

2. 选择时区，然后点击下一步。

   ![选择时区](/img/docs/install_catos_02.png)

3. 选择键盘布局，无特殊需要可保持默认。

   ![选择键盘布局](/img/docs/install_catos_03.png)

4. 在“选择存储器”中选择目标硬盘。旧版教程使用“抹除磁盘”，并允许选择Swap和文件系统。

   ![选择目标磁盘](/img/docs/install_catos_04.png)

   :::warning

   安装过程会格式化选中的磁盘，磁盘中的所有数据都会丢失，请谨慎确认目标设备。

   :::

5. 填写用户名、密码和计算机名。

   ![填写用户信息](/img/docs/install_catos_05.png)

6. 查看安装摘要，确认无误后点击“安装”。

   ![查看安装摘要](/img/docs/install_catos_06.png)

7. 在确认对话框中点击“现在开始安装”。

   ![确认开始安装](/img/docs/install_catos_07.png)

8. 等待安装完成。旧版教程给出的参考时间为3至10分钟。

   ![安装系统](/img/docs/install_catos_08.png)

   ![安装进度](/img/docs/install_catos_09.png)

9. 安装完成后点击“完成”并重启。

   ![安装完成并重启](/img/docs/install_catos_10.png)

如果重启后没有进入CatOS，请确认CatOS所在磁盘或对应启动项已设为第一启动项。

## 三、安装完成

![CatOS安装完成](/img/docs/install_complete.jpg)

恭喜，您已经完成CatOS安装。
