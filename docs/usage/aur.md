---
title: 使用 AUR
sidebar_position: 5
description: 在 CatOS 上安全地使用 yay 或 paru 构建、更新和维护 AUR 软件包。
---

# 使用 AUR

Arch User Repository（AUR）保存社区用户贡献的 `PKGBUILD` 和相关构建文件。AUR 本身**不是二进制软件仓库**：AUR 助手会下载构建脚本与源码，在本机执行构建，然后把生成的标准 Arch 软件包交给 Pacman 安装。

CatOS 默认环境提供 `yay` 和 `paru`。两者功能重叠，选择一个长期使用即可，不需要在同一次维护过程中交替运行。

## 搜索与安装

使用 yay：

```bash
yay -Ss keyword
yay -S package_name
```

或使用 paru：

```bash
paru -Ss keyword
paru -S package_name
```

AUR 助手不应以 root 身份启动。构建过程应由普通用户执行，只在通过 Pacman 安装依赖和最终软件包时请求 sudo。

## 安装前必须检查什么

至少检查：

- `PKGBUILD` 和 `.install` 等相关脚本；
- `source` 指向的上游地址；
- 是否下载或执行来源不明的预编译二进制；
- 最近维护时间、AUR 评论和已知问题；
- 包名、`provides`、`conflicts` 是否会覆盖 Arch 或 CatOS 仓库包；
- 是否要求导入额外签名密钥；
- Git/VCS 包最终会构建哪个提交或标签。

:::warning AUR 的信任边界

AUR 内容由社区用户维护，不经过 Arch Linux 或 CatOS 二进制仓库的同一套审核和受控构建流程。确认安装意味着你选择信任对应的构建脚本和上游来源。

:::

## 先下载构建文件再检查

```bash
yay -G package_name
cd package_name
```

阅读 `PKGBUILD` 后，可以手工构建：

```bash
makepkg -si
```

如果使用 paru，也可以在安装确认前查看它展示的 PKGBUILD 差异。

## 更新 AUR 软件

让一个 AUR 助手同时处理仓库和 AUR 更新：

```bash
yay -Syu
```

或：

```bash
paru -Syu
```

不要在另一个终端同时运行 `pacman -Syu` 或 Shelly 更新任务。

AUR 包是在本机针对当时的软件库构建的。系统共享库、Python、Electron、内核或其他 ABI 发生较大变化后，某些 AUR 包可能需要重新构建；遇到“软件包仍已安装但程序无法加载库”的情况，应检查它是否属于 AUR/本地构建来源。

## 找出 AUR 和本地包

```bash
pacman -Qm
```

这个列表表示当前已安装、但不在当前同步仓库中的包，通常包括 AUR 和本地构建软件。它也可能包含后来从仓库移除的包，因此需要结合 `pacman -Qi` 判断来源。

## 卸载

AUR 软件安装完成后仍然是标准 Pacman 软件包：

```bash
sudo pacman -Rns package_name
```

卸载前阅读最终事务，确认 Pacman 计算出的依赖删除范围符合预期。

完整系统更新与 Catdot、Secure Boot 的后续处理见[更新系统](./update.md)。
