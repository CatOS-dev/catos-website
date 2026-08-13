---
title: Secure Boot
sidebar_position: 2
description: 了解 CatOS 的 Secure Boot 启动链、支持的启动器、机器密钥和滚动更新维护方式。
---

# Secure Boot

当前 CatOS 发布镜像支持 Secure Boot 启动链，并通过 `catos-secureboot` 管理安装后系统的 Secure Boot 生命周期。后续内核、模块和启动文件更新通过滚动软件包更新继续维护，不需要等待下一张 ISO。

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

## MOK 首次注册指引

MokManager 在操作系统启动前运行，因此它使用固件自己的显示模式。下面的真实 QEMU/OVMF 截图为 **1280×800**；完成注册进入桌面后，测试系统恢复到文档基准 **1920×1080**。真实机器的固件分辨率可能不同，但菜单文字和流程一致。

首次启动时，如果机器 MOK 尚未建立信任，shim 可能先显示 `Verification failed: (0x1A) Security Violation`。这是进入 MokManager 前的提示，按 **Enter** 确认即可。

![Secure Boot 首次启动的 Security Violation 提示](/img/docs/secure-boot/mok-security-violation.png)

随后在 `Shim UEFI key management` 倒计时页面按任意键进入 MOK 管理。

### 正常的待处理 MOK 注册

安装器会通过 `mokutil` 提交机器证书注册请求。若 MokManager 主菜单显示 **Enroll MOK**，选择它，然后依次选择 **Continue → Yes**，并输入安装期间生成的一次性密码。密码保存在：

```text
/var/lib/catos-secureboot/enrollment-password
```

如果第一次进入 MokManager 时还没有记录密码，不要反复猜测。先选择继续启动，登录系统执行：

```bash
sudo cat /var/lib/catos-secureboot/enrollment-password
```

记录密码后再次重启，完成 `Enroll MOK`。

### 没有 Enroll MOK 时：从磁盘注册机器证书

如果 MokManager 没有显示待处理的 `Enroll MOK`，而是只显示 `Continue boot`、`Enroll key from disk`、`Enroll hash from disk`，可以使用安装器已经部署到 ESP 的机器证书完成注册。

先选择 **Enroll key from disk**：

![MokManager 主菜单中的 Enroll key from disk](/img/docs/secure-boot/mok-management-menu.png)

然后选择**已安装系统的 ESP**。在下面的测试环境中，第一项 `PciRoot(...)/HD(...)` 是目标磁盘 ESP，`ARCHISO_EFI` 是仍然连接着的安装镜像；不要选安装介质。

![在 MokManager 中选择已安装系统的 ESP](/img/docs/secure-boot/mok-select-esp.png)

CatOS 会把机器证书部署到 `EFI/CatOS/catos-machine.cer`，同时在 ESP 根目录放置一份 `catos-machine.cer` 方便 MokManager 直接选择。进入目标 ESP 后选择 **catos-machine.cer**：

![在 ESP 中选择 catos-machine.cer](/img/docs/secure-boot/mok-select-certificate.png)

选择证书后，MokManager 会显示 `Enroll MOK` 页面。可先用 **View key 0** 查看证书信息；确认无误后选择 **Continue**：

![确认待注册的机器 MOK](/img/docs/secure-boot/mok-enroll-confirm.png)

在 `Enroll the key(s)?` 页面选择 **Yes**。完成后主菜单会变成 **Reboot**，选择它重新启动：

![MokManager 注册完成后的 Reboot](/img/docs/secure-boot/mok-reboot.png)

:::warning

“从磁盘注册”是待处理 MOK 项缺失时的恢复路径。不要从未知 U 盘或其他磁盘随意导入 `.cer` 文件。只选择 CatOS 安装器部署到目标 ESP 的 `catos-machine.cer`。

:::

完成注册后可检查：

```bash
mokutil --sb-state
sudo catos-secureboot status
sudo catos-secureboot verify
```

如果状态仍显示 enrollment pending，应先完成 MOK 注册，再判断驱动或外部模块的签名问题。

如果手工注册后 `catos-secureboot status` 仍显示 `certificate_enrolled: False` 或 `phase: degraded`，不要把“能启动”当成注册成功。重新提交一次由 `catos-secureboot` 管理的注册请求：

```bash
sudo catos-secureboot enable --generate-enrollment-password
sudo cat /var/lib/catos-secureboot/enrollment-password
```

记录新密码后重启，并优先完成 MokManager 中出现的 `Enroll MOK` 待处理项，然后再次运行 `status` 和 `verify`。

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
