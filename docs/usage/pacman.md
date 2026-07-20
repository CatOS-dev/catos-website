---
title: 安装卸载软件(包管理器)
sidebar_position: 1
---

# 安装卸载软件(包管理器)

CatOS使用pacman作为系统的软件包管理器。pacman允许用户通过命令搜索、安装、查询和卸载软件，并自动处理软件依赖。

## 搜索软件

```bash
sudo pacman -Ss pkg_name
```

例如以`neofetch`为关键词搜索软件：

![pacman搜索软件](/img/docs/pacman_search.jpg)

## 安装软件

```bash
sudo pacman -S pkg_name
```

![pacman安装软件](/img/docs/pacman_install.jpg)

## 卸载软件

仅卸载指定软件：

```bash
sudo pacman -R pkg_name
```

同时清理不再需要的依赖：

```bash
sudo pacman -Rs pkg_name
```

![pacman卸载软件](/img/docs/pacman_remove.jpg)

## 查询软件

查询系统上安装的包：

```bash
sudo pacman -Qs
```

查询特定包：

```bash
sudo pacman -Qs pkg_name
```
