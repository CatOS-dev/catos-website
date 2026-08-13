---
title: 使用 Discover 软件商店
sidebar_position: 4
description: 在 KDE Plasma 中使用 Discover 搜索、安装和移除仓库应用，并理解它与 Pacman、AUR 和滚动更新的边界。
---

# 使用 Discover 软件商店

KDE Plasma 预设提供 Discover，适合通过图形界面浏览和管理带有 AppStream 元数据的桌面应用。Discover 是软件包管理前端，实际软件仍来自系统已经配置的仓库。

它不是 Pacman 和 AUR 的替代品：仓库中的命令行包不一定会出现在 Discover 中，AUR 的 `PKGBUILD` 也不应被当作 CatOS 或 Arch 官方仓库软件。

## 搜索和安装应用

1. 从应用菜单打开 **Discover**；
2. 在搜索框输入应用名称；
3. 打开详情页，检查名称、版本和软件来源；
4. 确认无误后点击“安装”。

如果 Discover 搜不到某个软件，先用 Pacman 判断它是否实际存在于同步仓库：

```bash
pacman -Ss keyword
```

如果 `pacman -Ss` 能找到而 Discover 找不到，通常只是该软件没有适合 Discover 展示的 AppStream 元数据，并不表示仓库损坏。

## 查看和移除已安装应用

Discover 的“已安装的软件包”页面主要面向它能够识别的桌面应用。进入应用详情后可以执行移除。

需要查看**所有**已安装软件包时，Pacman 更完整：

```bash
pacman -Q
```

查看某个包的详细信息：

```bash
pacman -Qi package-name
```

## Discover 与系统更新

Discover 可以处理仓库更新，但在 CatOS 的滚动更新环境中，应始终遵守同一条规则：**同一时间只运行一个软件包管理前端**。

Discover 工作时不要同时运行：

```text
pacman
yay
paru
另一个 Discover 更新任务
```

否则不同前端会争用 Pacman 数据库锁。

涉及大规模系统更新、内核、DKMS、Secure Boot 或需要阅读软件包替换提示时，终端中的完整更新输出更容易诊断：

```bash
sudo pacman -Syu
```

如果还维护 AUR 软件，使用长期选择的一个 AUR 助手完成完整更新。详细说明见[更新系统](./update.md)。

## Discover 长时间停在“正在获取”

首先不要删除 Pacman 锁文件。按顺序检查：

1. 确认没有其他 Pacman、yay、paru 或 Discover 更新任务正在运行；
2. 确认网络和仓库本身可以正常访问；
3. 在终端完成一次 `sudo pacman -Syu`，观察是否存在镜像、keyring 或依赖错误；
4. 关闭并重新打开 Discover。

如果 Pacman 可以正常同步和安装，而 Discover 仍无法加载，问题通常更接近 Discover、PackageKit 或 AppStream 元数据层，而不是 CatOS 仓库本身。

## AUR 软件

AUR 软件由社区维护并在本机构建，不应仅因为 Discover 没有显示就添加来源不明的二进制仓库。需要 AUR 软件时请阅读[使用 AUR](./aur.md)。
