---
title: 安装完成后的检查
sidebar_position: 8
description: 首次启动后检查更新、磁盘、启动器、快照、驱动、网络和桌面状态。
---

# 安装完成后的检查

安装完成并重启后，先拔出安装 U 盘，确认系统从目标磁盘启动。随后按本页检查基础状态。

## 1. 完整更新系统

离线镜像中的软件版本固定在镜像制作日期；在线安装也可能在安装过程中遇到仓库更新。首次启动后执行：

```bash
sudo pacman -Syu
```

不要只升级单个软件包而长期跳过完整更新。

## 2. 检查内核和系统时间

```bash
uname -a
timedatectl
```

确认内核能够正常启动，时区和时间同步正确。

## 3. 检查根文件系统和挂载点

```bash
findmnt /
findmnt /boot/efi
lsblk -f
```

确认：

- 根分区是预期设备和文件系统；
- UEFI 安装中 ESP 挂载到 `/boot/efi`；
- 没有意外格式化或遗漏需要的分区；
- Swap 已按选择启用。

查看 Swap：

```bash
swapon --show
```

## 4. 检查启动项

UEFI 设备可执行：

```bash
efibootmgr -v
```

确认存在 CatOS 对应启动项，并且固件启动顺序正确。

使用 GRUB 时可检查：

```bash
grep -E '^menuentry ' /boot/grub/grub.cfg | head
```

Limine、systemd-boot、UKI 和 EFI Stub 用户应确认对应配置、内核或 EFI 文件已经生成。

## 5. 检查 Btrfs 和快照

使用 Btrfs 时执行：

```bash
snapper list
systemctl status snapper-cleanup.timer
```

确认 `root` 配置存在，并且清理定时器已启用。

如果选择 GRUB、Limine 或 systemd-boot 的可启动快照集成，还应确认启动菜单能看到由对应工具生成的快照入口。

## 6. 检查显卡驱动

```bash
lspci -k -d ::03xx
```

确认每块显卡的 `Kernel driver in use` 符合预期。

NVIDIA 用户再执行：

```bash
nvidia-smi
```

混合显卡笔记本还应测试：

- 内置屏幕和外接屏；
- 独显应用启动；
- 休眠和唤醒；
- 显卡切换工具。

更多内容见[硬件驱动](./hardware-drivers.md)。

## 7. 检查网络、声音和蓝牙

```bash
nmcli device
systemctl status NetworkManager
systemctl status bluetooth
```

实际测试：

- 有线网络和 Wi-Fi；
- 扬声器、耳机和麦克风；
- 蓝牙设备；
- 摄像头；
- 触摸板、触摸屏和功能键。

## 8. 检查桌面会话

确认登录界面中的会话与安装时选择一致。安装多个桌面或窗口管理器时，检查默认显示管理器和 XDG Portal 是否符合主要桌面。

桌面选项说明见[桌面环境与窗口管理器](/docs/desktops)。

## 9. 保留安装日志

出现安装后问题时，不要只描述“无法启动”或“驱动有问题”。至少保存：

```bash
journalctl -b
lspci -nnk
lsblk -f
efibootmgr -v
```

Calamares 日志通常位于 Live 环境的：

```text
~/.cache/calamares/session.log
```

反馈问题时说明：

- 使用的镜像文件名；
- 离线或在线安装；
- 软件仓库和启动方式；
- 分区表与文件系统；
- 桌面环境；
- 显卡型号；
- 错误发生在安装、首次启动还是更新之后。

## 10. 建立独立备份

Btrfs 快照不能替代备份。重要文件应复制到其他物理磁盘、NAS 或可信远端存储，并定期验证能否恢复。
