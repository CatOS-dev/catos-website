---
title: Secure Boot
sidebar_position: 2
description: Understand the CatOS 2026.08.05 Secure Boot chain, supported boot methods, machine keys and update maintenance.
---

# Secure Boot

CatOS 2026.08.05 adds a Secure Boot chain to the release images and uses `catos-secureboot` to manage the installed system lifecycle.

## Supported boot methods

When the installer detects that the live environment itself was started with Secure Boot enabled, it restricts the boot-method choices and prepares the target system accordingly.

| Boot method | Automatic Secure Boot integration |
| --- | --- |
| GRUB | Supported |
| Limine | Supported |
| systemd-boot | Supported |
| Unified Kernel Image (UKI) | Supported |
| rEFInd | Not currently supported |
| Linux EFI Stub | Not currently supported |

rEFInd and EFI Stub are hidden from the installer while Secure Boot is active.

## Trust model

The live image uses the CatOS release certificate for its boot trust. The installed system does not contain the CatOS release private key. Instead, `catos-secureboot` creates a machine-specific MOK.

That machine key is used to maintain installed kernels, external modules under `updates/` and `extramodules/`, EFI files owned by the selected boot provider, and the chain between shim, MokManager and the second-stage loader.

`catos-secureboot` uses a pinned Fedora-signed shim and MokManager pair as vendor inputs and never re-signs those files.

## Installation and first boot

When Secure Boot is active, the installer invokes `catos-secureboot` to create the machine key, sign boot resources and submit MOK enrollment. The first reboot may enter MokManager to complete enrollment of the machine certificate.

After enrollment, check:

```bash
mokutil --sb-state
sudo catos-secureboot status
sudo catos-secureboot verify
```

If the state remains enrollment-pending, complete MOK enrollment before diagnosing driver or external-module signature failures.

## Maintenance after updates

`catos-secureboot` installs a Pacman hook. When kernels, boot files or external modules change, its maintenance path waits for DKMS builds, signs external modules, runs `depmod`, regenerates initramfs, signs installed kernels and provider-owned EFI files, redeploys the required boot chain, and refreshes the firmware entry.

A normally configured system does not need a manual `enable` after every update.

## Manual commands

```text
catos-secureboot enable
catos-secureboot enable --generate-enrollment-password
catos-secureboot status
catos-secureboot verify
catos-secureboot maintain
```

`enable` is intended for creating or rebuilding Secure Boot state manually. Systems already prepared by the installer normally rely on `status`, `verify`, and the automatic maintenance hook.

## Troubleshooting data

Collect at least:

```bash
mokutil --sb-state
efibootmgr -v
sudo catos-secureboot status
sudo catos-secureboot verify
journalctl -b
```

For NVIDIA, other DKMS drivers or locally built external modules, also confirm that the module build and signing step completed successfully.
