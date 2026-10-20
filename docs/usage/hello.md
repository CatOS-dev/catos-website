---
title: CatOS Hello 欢迎与维护中心
sidebar_position: 3
description: 使用 CatOS Hello 进入安装器、系统维护、软件管理和 Catdot 桌面 Profile 预览。
---

# CatOS Hello

**CatOS Hello** 是 CatOS 提供的图形化欢迎与维护应用。安装了 `catos-hello` 软件包后，可以从应用菜单打开 **CatOS Hello**，也可以在终端运行：

```bash
catos-hello
```

它会识别当前是 Live 安装环境还是已经安装的系统，并提供不同的操作入口。

## 在 Live 环境中

欢迎页提供 **安装 CatOS** 和 **高级安装器** 入口。高级安装器用于选择在线安装配置与额外软件包。在安装前，也可以从磁盘与恢复工具中打开分区工具、终端，或查看安装日志。

安装方式和磁盘操作参阅 [安装概览](../installation/overview.md)。

## 在已安装的系统中

主要导航包括：

| 页面 | 可以做什么 |
| --- | --- |
| **首页** | 查看当前系统与桌面环境，访问初次使用操作 |
| **软件与桌面** | 进入图形软件管理，并查看、预览或切换 Catdot Profile |
| **系统维护** | 选择软件镜像源、检查仓库设置、查看失败的服务与 Pacman 日志、收集诊断日志 |
| **关于 CatOS** | 查看发行版信息与相关项目入口 |

软件包安装、移除和更新也可以直接使用 [Shelly](./shelly.md) 或 [Pacman](./pacman.md)。不要同时从多个前端发起包管理事务。

## 预览与切换桌面 Profile

在 **软件与桌面** 页面选择一个可用的 Catdot Profile，再点击 **查看并切换 Profile**：

1. Hello 调用 Catdot 获取预览，展示需要安装的软件包、将写入或移除的配置，以及可能被影响的现有路径。
2. 确认后，Catdot 才执行实际的 Profile 激活。
3. 切换桌面配置后，通常需要注销再登录。

**预览不会修改文件或安装软件包。** Catdot 会在实际覆盖文件前备份已有配置，但这不等于完整系统快照。没有安装 Catdot 或没有可用 Profile 时，该页面可能只显示说明。

同样可以在终端使用：

```bash
catdot list
catdot plan catos-niri-dms
catdot select catos-niri-dms
```

更多说明见 [Catdot Profile](./catdot.md)。

## 维护入口与日志

CatOS Hello 的系统维护页提供镜像源选择、仓库编辑、失败服务检查、Pacman 更新历史和诊断日志收集。部分操作会打开外部工具或终端，并可能要求管理员授权。请先查看拟执行的操作，再确认修改。

关于滚动更新、签名和系统恢复，请参阅 [更新系统](./update.md) 与 [系统维护](../system/maintenance.md)。
