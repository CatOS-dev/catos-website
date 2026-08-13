---
title: Secure Boot
sidebar_position: 2
description: 了解 CatOS 2026.08.05 的 Secure Boot 启动链、支持的启动器、机器密钥和更新维护方式。
---

# Secure Boot

CatOS 2026.08.05 的发布镜像加入 Secure Boot 启动链，并通过 `catos-secureboot` 管理安装后系统的 Secure Boot 生命周期。

## 支持范围

安装器检测到当前 Live 环境以 Secure Boot 启动后，会自动限制启动方式选择并准备目标系统。

| 启动方式 | 自动 Secure Boot 集成 |
| --- | --- |
| GRUB | 支持 |
| Limine | 支持 |
| systemd-boot | 支持 |
| Unified Kernel Image（UKI） | 支持 |
| rEFInd | 当前不支持 |
| Linux EFI Stub | 当前不支持 |

Secure Boot 启用时，rEFInd 和 EFI Stub 不会作为安装器可选项显示。

## 信任模型

Live 镜像使用 CatOS 发布证书建立启动信任。安装后的系统不会携带 CatOS 发布私钥，而是由 `catos-secureboot` 为每台机器建立独立的机器级 MOK。

该机器密钥用于维护：

- 已安装内核；
- `updates/` 和 `extramodules/` 中的外部内核模块；
- 所选启动器拥有的 EFI 文件；
- shim、MokManager 和第二阶段启动文件之间的启动链。

`catos-secureboot` 使用固定版本、由 Fedora 签名的 shim 与 MokManager 作为 vendor 输入，不会重新签名这些文件。

## 安装与首次启动

当安装器检测到 Secure Boot 已启用时，会调用 `catos-secureboot` 为目标系统生成机器密钥、签名启动资源并提交 MOK 注册。首次重启时，shim 可能进入 MokManager 完成机器证书注册。

安装期间生成的一次性 MOK 密码保存在目标系统：

```text
/var/lib/catos-secureboot/enrollment-password
```

该文件仅 root 可读，并会在 `catos-secureboot` 确认机器证书已注册后删除。如果首次进入 MokManager 时没有记录密码，不要猜测密码：选择继续启动，登录系统后执行：

```bash
sudo cat /var/lib/catos-secureboot/enrollment-password
```

记录密码后重启，再在 MokManager 中完成机器证书注册。

完成注册后可检查：

```bash
mokutil --sb-state
sudo catos-secureboot status
sudo catos-secureboot verify
```

如果状态仍显示 enrollment pending，应先完成 MOK 注册，再判断驱动或外部模块的签名问题。

## 系统更新后的维护

`catos-secureboot` 安装 Pacman hook。内核、启动文件或外部模块发生变化后，它会执行维护流程，包括：

1. 等待 DKMS 模块构建完成；
2. 签名外部内核模块并执行 `depmod`；
3. 重新生成 initramfs；
4. 签名已安装内核与启动器 EFI 文件；
5. 重新部署所需启动链并刷新固件启动项。

正常更新系统时不需要每次手工重新执行 `enable`。

## 手工命令

```text
catos-secureboot enable
catos-secureboot enable --generate-enrollment-password
catos-secureboot status
catos-secureboot verify
catos-secureboot maintain
```

`enable` 用于手工建立或重新建立 Secure Boot 状态。已经由安装器配置完成的系统通常只需要 `status`、`verify` 和自动维护 hook。

## 排查信息

Secure Boot 相关问题至少收集：

```bash
mokutil --sb-state
efibootmgr -v
sudo catos-secureboot status
sudo catos-secureboot verify
journalctl -b
```

使用 NVIDIA、其他 DKMS 驱动或自行编译的外部内核模块时，还应确认对应模块已经成功构建并签名。
