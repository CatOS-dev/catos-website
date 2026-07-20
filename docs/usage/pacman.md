---
title: 使用 pacman 管理软件
sidebar_position: 3
---

# 使用 pacman 管理软件

CatOS 使用 pacman 管理 Arch Linux 和 CatOS 仓库中的软件包。pacman 会处理依赖关系、签名验证、文件数据库和完整系统升级。

## 搜索和查看软件包

搜索仓库：

```bash
pacman -Ss keyword
```

查看仓库中的软件包信息：

```bash
pacman -Si package_name
```

搜索已安装软件包：

```bash
pacman -Qs keyword
```

查看已安装软件包信息：

```bash
pacman -Qi package_name
```

查询某个文件属于哪个已安装包：

```bash
pacman -Qo /path/to/file
```

## 安装软件

```bash
sudo pacman -S package_name
```

安装软件并同时执行完整系统升级：

```bash
sudo pacman -Syu package_name
```

## 更新系统

```bash
sudo pacman -Syu
```

:::warning 不要进行部分更新

不要只运行 `sudo pacman -Sy` 后继续安装软件。它只刷新数据库而不升级已安装包，可能让本机进入 Arch Linux 不支持的部分更新状态。

:::

## 卸载软件

仅卸载指定软件包：

```bash
sudo pacman -R package_name
```

同时删除不再需要的依赖和系统级备份配置：

```bash
sudo pacman -Rns package_name
```

执行前仔细阅读 pacman 给出的删除列表。

## 检查孤立依赖

```bash
pacman -Qdtq
```

没有输出表示当前没有孤立包。不要不加检查地把输出直接交给删除命令，一些手动保留的软件可能会被标记为孤立依赖。

## 软件包缓存

pacman 会把下载的软件包保存在 `/var/cache/pacman/pkg/`，便于降级和离线重装。安装 `pacman-contrib` 后，可以只保留最近版本：

```bash
sudo paccache -r
```

不要为了节省少量空间频繁清空所有缓存；出现更新回归时，旧包是重要的恢复手段。

## pacman 被其他程序占用

Discover、pacman、yay 和 paru 不能同时修改软件包数据库。遇到数据库锁时，先确认没有更新程序仍在运行：

```bash
pgrep -a pacman
pgrep -a packagekitd
```

只有确认没有包管理进程后，才能考虑处理 `/var/lib/pacman/db.lck`。不要在安装或更新仍在执行时删除锁文件。
