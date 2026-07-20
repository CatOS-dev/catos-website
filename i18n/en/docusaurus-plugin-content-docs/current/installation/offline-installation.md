---
title: Offline installation
sidebar_position: 3
description: Copy the CatOS live system to disk and install the default configuration without a network connection.
---

# Offline installation

Offline installation copies the live system to the target disk, then writes user, locale, network, boot and cleanup configuration. It does not require a network connection and produces a system close to the live desktop and software set.

Use it when the network is unavailable, you want the default desktop, or you prefer a fast installation before updating and customizing the system.

## Driver handling

Offline installation does not run the full `chwd --autoconfigure` process.

- The standard image does not carry the modern NVIDIA driver set.
- The NVIDIA image removes NVIDIA-only packages when no NVIDIA GPU is detected.
- On physical hardware it removes VirtualBox, VMware and QEMU guest tools used by the live environment.

Choose the correct image on the [download page](/en/docs/download) before installing.

## Installation steps

The screenshots are from an older Calamares interface. The layout may differ, but the main decisions are unchanged.

1. Open the offline “Install CatOS” launcher.

   ![Open the CatOS installer](/img/docs/install_catos_01.png)

2. Select language, timezone and keyboard layout.

   ![Select timezone](/img/docs/install_catos_02.png)

   ![Select keyboard layout](/img/docs/install_catos_03.png)

3. Select the target disk and partition method.

   ![Select target disk](/img/docs/install_catos_04.png)

   :::danger Partition changes are destructive

   Verify the disk model and size. Existing partitions and files may become unrecoverable once writing starts.

   :::

   See [partitioning and filesystems](./partitioning.md) before using manual partitioning or dual boot.

4. Create the user account and hostname.

   ![Create user](/img/docs/install_catos_05.png)

5. Review the installation summary and start installation.

   ![Installation summary](/img/docs/install_catos_06.png)

   ![Confirm installation](/img/docs/install_catos_07.png)

6. Wait without removing the USB drive or powering off the machine.

   ![Install system](/img/docs/install_catos_08.png)

   ![Installation progress](/img/docs/install_catos_09.png)

7. Reboot and remove the USB drive.

   ![Installation complete](/img/docs/install_catos_10.png)

After first boot, update the complete system:

```bash
sudo pacman -Syu
```

Then follow the [post-installation checks](./post-installation.md).
