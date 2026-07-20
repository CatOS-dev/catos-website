---
title: 更新系统
sidebar_position: 4
---

# 更新系统

CatOS基于Arch Linux，采用滚动更新机制。及时更新可以获得安全修复、软件功能和系统改进。

旧版教程提供命令行和Discover两种更新方式。

## 命令行方式

```bash
sudo pacman -Syu
```

输入命令后，根据提示确认安装。

![命令行更新系统](/img/docs/update_system01.jpg)

## 图形化方式

在Discover的“更新”页面中选择并安装更新。

![Discover更新系统](/img/docs/update_system02.jpg)

:::note

Arch Linux不支持长期部分更新。请使用完整系统更新，不要只同步数据库或只升级少量基础包。

:::
