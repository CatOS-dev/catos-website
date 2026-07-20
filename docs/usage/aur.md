---
title: 安装卸载软件(AUR)
sidebar_position: 3
---

# 安装卸载软件(AUR)

Arch用户软件仓库（Arch User Repository，AUR）是由社区维护的软件仓库。AUR通过分享PKGBUILD扩展Arch Linux的软件生态，许多未进入官方仓库的软件都可以在AUR中找到。

旧版CatOS内置AUR助手`yay`，用于搜索、安装和卸载AUR软件。

:::warning

AUR软件包由用户维护，使用前应检查PKGBUILD和来源，风险由使用者自行承担。

:::

## 搜索软件

```bash
yay -Ss pkg_name
```

![yay搜索AUR软件](/img/docs/aur_search.jpg)

## 安装软件

```bash
yay -S pkg_name
```

## 卸载软件

```bash
yay -R pkg_name
```

同时清理不再需要的依赖：

```bash
yay -Rs pkg_name
```

## 查询软件

```bash
yay -Qs
yay -Qs pkg_name
```
