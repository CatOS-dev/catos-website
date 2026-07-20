---
title: 使用 AUR
sidebar_position: 5
---

# 使用 AUR

Arch User Repository（AUR）保存用户贡献的 `PKGBUILD`。它不是二进制软件仓库，AUR 助手通常会下载构建脚本、获取源码，并在本机生成 Arch 软件包。

CatOS 镜像包含 `yay` 和 `paru`。两者作用相近，选择其中一个长期使用即可，不需要在同一次操作中交替运行。

## 搜索软件

```bash
yay -Ss keyword
```

或：

```bash
paru -Ss keyword
```

## 安装 AUR 软件

```bash
yay -S package_name
```

或：

```bash
paru -S package_name
```

AUR 助手不应以 root 身份运行。它只会在需要通过 pacman 安装依赖或最终软件包时请求 sudo。

## 安装前检查什么

至少检查：

- `PKGBUILD` 和相关安装脚本；
- `source` 指向的上游地址；
- 是否执行未知的预编译二进制；
- 最近维护时间和评论中的已知问题；
- 包名是否会覆盖官方仓库或 CatOS 包；
- 是否需要导入额外签名密钥。

:::warning

AUR 内容由社区用户维护，不经过 Arch Linux 或 CatOS 官方仓库的同一套审核和构建流程。使用 AUR 等于信任对应维护者和构建脚本。

:::

## 更新 AUR 软件

```bash
yay -Syu
```

或：

```bash
paru -Syu
```

更新前仍应阅读将要重建的 AUR 包变更。涉及内核、DKMS、显卡驱动或启动组件时，更新后应检查模块和启动状态。

## 只下载并检查构建文件

```bash
yay -G package_name
```

然后进入目录检查 `PKGBUILD`，再手动构建：

```bash
makepkg -si
```

## 卸载软件

```bash
sudo pacman -Rns package_name
```

AUR 软件安装后仍然是标准 pacman 软件包，因此卸载和查询应使用 pacman。
