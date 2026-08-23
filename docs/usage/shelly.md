---
title: 使用 Shelly 软件管理器
sidebar_position: 4
description: 使用 CatOS 默认的 Shelly 图形软件管理器管理仓库、AUR、Flatpak 和 AppImage 软件。
---

# 使用 Shelly 软件管理器

CatOS 各桌面预设统一提供 **Shelly** 作为图形软件管理器。Shelly 直接使用 Arch Linux 的 libalpm 管理 Pacman 仓库软件，同时提供 AUR、Flatpak 和 AppImage 支持；Flatpak 功能由独立的 `shelly-flatpak-backend` 提供。

## 软件来源

在安装或更新前应确认软件来源：

- **Repository**：来自系统 `pacman.conf` 中配置的 Arch、CatOS 等软件仓库；
- **AUR**：社区维护的 `PKGBUILD`，在本机进行构建，不属于 Arch 或 CatOS 官方仓库；
- **Flatpak**：来自已配置的 Flatpak remote；
- **AppImage**：由 Shelly 管理的独立应用镜像。

对于 AUR 软件，应像使用 `paru` 或 `yay` 一样检查 PKGBUILD、来源和变更内容。

## 安装和移除

从应用菜单打开 **Shelly**，搜索软件并确认来源后执行安装。Shelly 也可以显示已安装软件并执行移除。

需要查看完整的 Pacman 软件包信息时，仍可使用：

```bash
pacman -Ss keyword
pacman -Qi package-name
```

## 系统更新

CatOS 是滚动发行版。无论使用 Shelly、Pacman、paru 还是 yay，**同一时间只能有一个前端修改 Pacman 数据库**。

不要在 Shelly 正在执行事务时同时运行：

```text
pacman
paru
yay
另一个 Shelly 事务
```

涉及复杂的软件包替换、内核、DKMS 或 Secure Boot 维护时，终端中的完整输出通常更便于诊断：

```bash
sudo pacman -Syu
```

详细规则见[更新系统](./update.md)。

## 遇到数据库锁或更新失败

不要直接删除 `/var/lib/pacman/db.lck`。先确认 Shelly、Pacman、paru 和 yay 都没有正在执行的软件包事务，再检查镜像、keyring 和依赖错误。

如果 Shelly 出现问题而 Pacman 可以正常工作，可以先使用终端完成维护，并保留错误信息用于诊断。

## 命令行

Shelly 同时提供 CLI：

```bash
shelly --help
shelly search standard keyword
shelly list-updates all
```

Pacman、paru 和 yay 仍然保留，用户可以继续使用熟悉的 Arch 软件管理工作流。
