---
title: Secure Boot
sidebar_position: 2
description: Understand the CatOS Secure Boot chain, supported boot methods, machine keys, and rolling-update maintenance.
---

# Secure Boot

Current CatOS release images support the Secure Boot chain, while `catos-secureboot` manages the installed-system lifecycle. Later kernel, module, and boot-artifact changes are maintained through rolling package updates rather than requiring a new ISO.

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

When Secure Boot is active, the installer invokes `catos-secureboot` to create the machine key, sign boot resources and submit MOK enrollment. The first reboot may enter MokManager through shim to complete enrollment of the machine certificate.

The one-time MOK password generated during installation is stored on the target system at:

```text
/var/lib/catos-secureboot/enrollment-password
```

The file is root-only and is removed after `catos-secureboot` observes that the machine certificate has been enrolled. If MokManager appears before you have recorded the password, do not guess it: choose to continue booting, sign in, and run:

```bash
sudo cat /var/lib/catos-secureboot/enrollment-password
```

Record the password, reboot, and then complete the machine-certificate enrollment in MokManager.

## First-boot MOK enrollment guide

MokManager runs before the operating system, so it uses the firmware's own display mode. The real QEMU/OVMF screenshots below are **1280×800**; after enrollment the test system returns to the documentation desktop baseline of **1920×1080**. Physical firmware may use another resolution, but the menu text and flow are the same.

If the machine MOK is not trusted yet, shim may first show `Verification failed: (0x1A) Security Violation`. Press **Enter** on the dialog to continue to MokManager.

![Security Violation before first MOK enrollment](/img/docs/secure-boot/mok-security-violation.png)

On the `Shim UEFI key management` countdown screen, press any key to enter MOK management.

### Normal pending-MOK enrollment

The installer submits the machine certificate through `mokutil`. If the MokManager menu contains **Enroll MOK**, select it, then choose **Continue → Yes** and enter the one-time password generated during installation. The password is stored at:

```text
/var/lib/catos-secureboot/enrollment-password
```

If you reached MokManager before recording the password, do not guess repeatedly. Continue booting, sign in, and read it with:

```bash
sudo cat /var/lib/catos-secureboot/enrollment-password
```

Record it, reboot, and complete the pending `Enroll MOK` request.

### If Enroll MOK is missing: enroll the machine certificate from disk

If MokManager shows only `Continue boot`, `Enroll key from disk`, and `Enroll hash from disk`, the machine certificate already deployed to the ESP can be enrolled manually.

Choose **Enroll key from disk**:

![Enroll key from disk in MokManager](/img/docs/secure-boot/mok-management-menu.png)

Select the **ESP of the installed system**. In the test environment below, the first `PciRoot(...)/HD(...)` entry is the target ESP, while `ARCHISO_EFI` is the still-attached installation image. Do not choose the installer media.

![Selecting the installed-system ESP in MokManager](/img/docs/secure-boot/mok-select-esp.png)

CatOS deploys the certificate as `EFI/CatOS/catos-machine.cer` and also places a convenience copy named `catos-machine.cer` in the ESP root for MokManager. Select **catos-machine.cer**:

![Selecting catos-machine.cer](/img/docs/secure-boot/mok-select-certificate.png)

MokManager then displays the `Enroll MOK` page. **View key 0** can be used to inspect the certificate; choose **Continue** once it is confirmed:

![Confirming the machine MOK](/img/docs/secure-boot/mok-enroll-confirm.png)

Choose **Yes** on `Enroll the key(s)?`. After enrollment, the main menu changes to **Reboot**; select it to restart:

![Reboot after enrolling the machine certificate](/img/docs/secure-boot/mok-reboot.png)

:::warning

Disk enrollment is a recovery path for a missing pending-MOK menu item. Do not import arbitrary `.cer` files from unknown removable media. Select only the `catos-machine.cer` deployed by the CatOS installer to the target ESP.

:::

After enrollment, check:

```bash
mokutil --sb-state
sudo catos-secureboot status
sudo catos-secureboot verify
```

If the state remains enrollment-pending, complete MOK enrollment before diagnosing driver or external-module signature failures.

If manual enrollment still leaves `catos-secureboot status` reporting `certificate_enrolled: False` or `phase: degraded`, do not treat a successful boot as proof that enrollment is complete. Submit a fresh CatOS-managed request:

```bash
sudo catos-secureboot enable --generate-enrollment-password
sudo cat /var/lib/catos-secureboot/enrollment-password
```

Record the new password, reboot, complete the pending `Enroll MOK` request if it appears, and run `status` and `verify` again.

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
