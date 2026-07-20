---
title: 使用 Discover 软件商店
sidebar_position: 4
---

# 使用 Discover 软件商店

KDE Plasma 预设提供 Discover，用图形界面搜索、安装、卸载和更新软件。Discover 是包管理前端，底层仍然使用系统的软件包服务和仓库。

## 搜索和安装

1. 从应用菜单打开 Discover；
2. 在搜索框输入软件名称；
3. 打开详情页，确认来源、版本和权限；
4. 点击“安装”。

![Discover搜索软件](/img/docs/discover_search.jpg)

![Discover安装软件](/img/docs/discover_install.jpg)

## 查看和卸载软件

在“已安装”页面查看系统中的应用，进入详情页后点击“移除”。

![Discover查询软件](/img/docs/discover_query.jpg)

![Discover卸载软件](/img/docs/discover_remove.jpg)

## 更新系统

Discover 可以显示仓库更新，但更新期间不要同时运行：

```text
pacman
yay
paru
另一个 Discover 更新任务
```

多个前端同时修改 pacman 数据库会互相阻塞。

## Discover 找不到软件

先在终端确认仓库中是否存在：

```bash
pacman -Ss keyword
```

Discover 主要展示带有 AppStream 元数据的图形应用，并不一定显示仓库中的所有命令行包。AUR 软件也不应默认被当作官方仓库软件处理，请参考[使用 AUR](./aur.md)。
