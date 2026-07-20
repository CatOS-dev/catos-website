---
title: 安装前准备
sidebar_position: 2
description: 检查硬件、验证镜像，并使用 Ventoy、Rufus、Etcher 或 ISO Image Writer 制作启动介质。
---

# 安装前准备

## 系统要求

CatOS 2026.07.19 仅提供 `x86_64` 镜像，不支持 ARM、LoongArch 或 32 位 x86 处理器。

### 最低配置

- 64 位双核处理器；
- 4 GB 内存；
- 30 GB 可用磁盘空间；
- 8 GB 或更大的 U 盘。

### 推荐配置

- 4 核或更高规格的 64 位处理器；
- 8 GB 或更多内存；
- 64 GB 或更大的固态硬盘；
- UEFI 固件；
- 在线安装时使用稳定的有线网络或可靠 Wi-Fi。

最低配置只表示可以完成安装。桌面环境、浏览器、开发工具和虚拟机对内存及磁盘空间有更高要求。

## 下载并验证镜像

前往[下载页面](/docs/download)选择普通版或 NVIDIA 版。下载后必须核对 SHA-256：

```bash
sha256sum catos-2026.07.19-x86_64.iso
sha256sum catos-for-nvidia-2026.07.19-x86_64.iso
```

校验结果必须与下载页面完全一致。校验失败时不要继续写入或安装。

## 选择启动盘制作工具

| 工具 | 支持平台 | 适合场景 |
| --- | --- | --- |
| Ventoy | Windows、Linux | 一个 U 盘存放多个 ISO，之后只需复制或替换镜像文件 |
| Rufus | Windows | 直接写入镜像，并提供分区和固件相关选项 |
| balenaEtcher | Windows、Linux、macOS | 操作简单，适合直接写入单个镜像 |
| ISO Image Writer | Linux | KDE 提供的图形化 ISO 写入工具 |
| `dd` | Linux、macOS | 熟悉块设备的高级用户 |

:::warning 写入会破坏目标设备上的数据

无论使用哪种工具，都要再次确认目标设备。不要仅凭盘符顺序猜测 U 盘，写错设备可能清空其他硬盘。

:::

## Ventoy

Ventoy 会在 U 盘上建立可启动环境。之后不需要反复“烧录”镜像，只需将 ISO 文件复制到 Ventoy 数据分区。启动计算机时，Ventoy 会列出 U 盘中的所有 ISO。

适合：

- 同一个 U 盘保存 CatOS、Windows 安装盘和其他 Linux 镜像；
- 经常更新测试镜像；
- 希望保留 U 盘剩余空间存放普通文件。

相关链接：

- [Ventoy 官方网站](https://www.ventoy.net/en/index.html)
- [Ventoy 使用入门](https://www.ventoy.net/en/doc_start.html)
- [Ventoy 下载页面](https://www.ventoy.net/en/download.html)
- [Ventoy GitHub Releases](https://github.com/ventoy/Ventoy/releases)
- [Ventoy 源码仓库](https://github.com/ventoy/Ventoy)

### Windows 安装 Ventoy

1. 下载并解压 Ventoy；
2. 运行 `Ventoy2Disk.exe`；
3. 在设备列表中选择目标 U 盘；
4. 点击“安装”，确认清空设备；
5. 安装完成后，将 CatOS ISO 直接复制到 Ventoy 数据分区；
6. 从 U 盘启动，在 Ventoy 菜单中选择 CatOS ISO。

### Linux 安装 Ventoy

解压 Ventoy 后，在其目录中执行：

```bash
sudo sh Ventoy2Disk.sh -i /dev/sdX
```

`/dev/sdX` 必须是整个 U 盘设备，不是 `/dev/sdX1` 之类的分区。可先使用以下命令核对：

```bash
lsblk -o NAME,SIZE,MODEL,TRAN,MOUNTPOINTS
```

安装完成后，将 ISO 复制到 Ventoy 数据分区即可。

:::tip Ventoy 无法启动时

部分固件、Secure Boot 配置或特殊 USB 控制器可能与 Ventoy 不兼容。遇到问题时，先关闭 Secure Boot，再尝试 Rufus、Etcher 或 ISO Image Writer 直接写入。

:::

## Rufus（Windows）

Rufus 适合在 Windows 中直接制作单镜像启动盘。

- [Rufus 官方网站](https://rufus.ie/)
- [Rufus 源码仓库](https://github.com/pbatard/rufus)

步骤：

1. 插入 U 盘并打开 Rufus；
2. 在“设备”中选择目标 U 盘；
3. 在“引导类型选择”中选择 CatOS ISO；
4. 没有特殊需求时保留默认分区选项；
5. 点击“开始”，确认清空 U 盘；
6. 等待写入和校验完成。

![Rufus 选择设备和镜像](/img/docs/windows_rufus_01.jpg)

![Rufus 写入提示](/img/docs/windows_rufus_02.jpg)

![Rufus 写入完成](/img/docs/windows_rufus_03.jpg)

如果 Rufus 询问 ISO 模式或 DD 模式，可先使用推荐模式；启动失败时重新写入并尝试 DD 模式。

## balenaEtcher

Etcher 提供简单的“选择镜像—选择设备—写入”流程，并在写入后进行校验。

- [balenaEtcher 官方网站](https://etcher.balena.io/)
- [balenaEtcher 源码仓库](https://github.com/balena-io/etcher)

Etcher 适合不需要 Ventoy 多镜像功能，也不希望处理 Rufus 高级选项的用户。

## ISO Image Writer（Linux）

KDE ISO Image Writer 是 Linux 下的图形化写入工具。

- [KDE ISO Image Writer](https://apps.kde.org/isoimagewriter/)

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

打开工具后，选择 CatOS ISO 和目标 U 盘，然后点击“创建”。

![ISO Image Writer](/img/docs/linux_isowriter.png)

## 使用 `dd` 直接写入

仅在能够准确识别块设备时使用：

```bash
sudo dd if=catos-2026.07.19-x86_64.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

NVIDIA 镜像请替换输入文件名。

:::danger 不要把输出设备写成分区

正确目标类似 `/dev/sdX` 或 `/dev/nvmeXnY`，不是 `/dev/sdX1`。执行前使用 `lsblk` 检查型号、容量和传输类型。

:::

## 从 U 盘启动

1. 保存工作并关闭计算机；
2. 插入启动 U 盘；
3. 开机时使用设备厂商提供的启动菜单按键，常见为 `F12`、`F11`、`Esc` 或 `F8`；
4. 优先选择带有 `UEFI` 标识的 U 盘启动项；
5. 如果无法启动，检查 Secure Boot 设置，并确认镜像校验正确。

进入 Live 环境后，可先测试显示、网络、声音、触摸板和键盘，再开始安装。
