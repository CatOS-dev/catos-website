---
title: Catdot 配置 Profile
sidebar_position: 7
description: 使用 Catdot 选择、更新和维护 CatOS 桌面配置 Profile，并了解配置备份和软件包清理边界。
---

# Catdot 配置 Profile

Catdot 用来切换完整的 CatOS 用户配置 Profile。当前 CatOS 软件仓库中的 Niri + DMS、Niri + Noctalia、Sway、Labwc 和 Wayfire 使用 Catdot 将桌面软件包与 HOME 下的配置文件作为一个可维护的整体交付。

## Profile 中包含什么

一个 Profile 包含三类信息：

1. 需要安装的精确 Pacman 软件包名；
2. 由 Catdot 持续管理的 HOME 相对路径；
3. 只在第一次启用该 Profile 时写入的 seed 配置。

**Managed** 配置会在选择或显式更新 Profile 时刷新。**Seed** 配置只负责建立初始状态，之后由用户维护，不会因为 Profile 更新而被重复覆盖。

## 查看和选择 Profile

```bash
catdot list
catdot current
catdot show catos-niri-dms
```

在切换前，可以先查看将执行的操作：

```bash
catdot plan catos-niri-dms
```

`plan` 会预览待安装的软件包、配置路径的写入与删除，以及可能被替换的已有文件。**该命令只生成计划，不会执行安装或修改用户配置。**

如果需要给其他程序读取结构化结果，可以使用：

```bash
catdot list --json
catdot current --json
catdot show catos-niri-dms --json
catdot plan catos-niri-dms --json
```

CatOS Hello 也使用上述接口提供桌面 Profile 切换预览，参阅 [CatOS Hello](./hello.md)。

选择 Niri + DMS：

```bash
catdot select catos-niri-dms
```

选择 Niri + Noctalia：

```bash
catdot select catos-niri-noctaliav5
```

`catdot select` 默认会通过 Pacman 安装 Profile 声明的软件包。安装器已经完成软件包部署时，可以使用：

```bash
catdot select PROFILE --packages=verify
```

此模式只验证软件包是否已经存在，不会再次调用 `sudo pacman`。

切换完整桌面 Profile 后通常应注销并重新登录。Catdot 不负责重启正在运行的桌面组件、应用或服务。

## 接受新的 Profile 配置

系统更新不会自动覆盖当前已经接受的 Profile 配置版本。需要显式执行：

```bash
catdot update
```

更新单个 Profile：

```bash
catdot update catos-niri-dms
```

如果 Profile 当前处于启用状态，Catdot 会备份旧的 managed 配置并应用新版本。更新未启用的 Profile 不会切换桌面，也不会修改 HOME 中当前正在使用的配置。

## 配置备份

在删除或覆盖现有 HOME 文件前，Catdot 会把原内容保存到：

```text
~/.local/state/catdot/backups/<operation>/home/...
```

默认保留最近五代备份。

Catdot 当前没有自动 rollback 命令。需要恢复时，应从对应备份目录手工取回文件。发生磁盘空间不足、只读文件系统等底层错误后，先修复原因，再重新运行原命令。

## 删除 Profile 与清理软件包

忘记一个未启用的 Profile：

```bash
catdot remove PROFILE
```

`remove` 只删除 Catdot 保存的 Profile 状态和缓存，不会卸载软件包。

清理已经没有任何保留 Profile 引用、并且最初由 Catdot 直接引入的软件包：

```bash
catdot prune
```

最终删除事务仍由 Pacman 计算依赖关系并要求确认。Catdot 不会把在第一次选择 Profile 之前就已经安装的软件包加入 prune 集合。

:::warning 多用户系统

Catdot 的软件包归属记录是按用户保存的，并不会在多个用户之间合并。不要让多个用户分别执行 `catdot prune` 管理同一台机器的软件包集合，否则一个用户可能删除另一个用户 Profile 仍在使用的软件包。

:::

## 相关命令

```text
catdot list [--json]
catdot show PROFILE [--json]
catdot current [--json]
catdot plan PROFILE [--json]
catdot select PROFILE [--packages=install|verify]
catdot update [PROFILE]
catdot remove PROFILE
catdot prune
catdot validate PROFILE_ROOT
```
