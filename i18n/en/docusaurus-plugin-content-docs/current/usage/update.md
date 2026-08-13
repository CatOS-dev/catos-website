---
title: Updating the system
sidebar_position: 6
description: Fully update CatOS while handling AUR, Catdot Profiles, Secure Boot, reboot decisions, and recovery correctly.
---

# Updating the system

CatOS follows the Arch Linux rolling-release model. An update may involve Arch, CatOS, optional CachyOS repositories, and user-installed AUR packages.

One distinction matters: **package upgrades** and **Catdot Profile configuration updates** are separate operations. `pacman -Syu` can install a newer Profile package without automatically replacing the Catdot-managed configuration revision that the user previously accepted.

## Before updating

Preview repository updates with `checkupdates` from `pacman-contrib`:

```bash
checkupdates
```

This inspects available upgrades without creating a partial-upgrade package database state.

On Btrfs systems, inspect recent snapshots before a major update:

```bash
snapper list
```

CatOS creates system snapshots around some boot-critical changes and large package transactions, but snapshots are not a substitute for backups of personal data.

## Run a complete package upgrade

For repository packages:

```bash
sudo pacman -Syu
```

To include AUR packages, use one long-term helper:

```bash
yay -Syu
```

or:

```bash
paru -Syu
```

Do not run pacman, Discover, yay, paru, or other package-management frontends concurrently.

## What to read during an update

Pay attention to:

- replacement, conflict, and optional-dependency prompts;
- `.pacnew` and `.pacsave` files;
- kernel, initramfs, DKMS, and graphics-driver output;
- bootloader configuration and EFI artifact updates;
- AUR PKGBUILD or upstream-source changes;
- repository signature, keyring, and mirror-sync errors.

Find system configuration files that need review:

```bash
sudo find /etc -name '*.pacnew' -o -name '*.pacsave'
```

Compare and merge them deliberately instead of replacing the current configuration blindly.

## Catdot: package upgrades do not automatically accept new configuration

If the active desktop uses Catdot, first identify the current Profile:

```bash
catdot current
```

After a package upgrade, `/usr/share/<profile-id>` may contain a newer Profile revision while Catdot continues using the previously accepted managed snapshot. To explicitly accept the current Profile's new managed configuration, run:

```bash
catdot update
```

You can also update a specific retained Profile:

```bash
catdot update catos-niri-dms
```

For an active Profile, Catdot backs up existing managed files under `~/.local/state/catdot/backups/` before replacement. Seed files are not reapplied by `catdot update`. If the update changes compositor, shell, or portal configuration, log out and back in when necessary.

See [Catdot](./catdot.md) for ownership and recovery details.

## Secure Boot: package hooks maintain the chain automatically

On systems managed by `catos-secureboot`, relevant package transactions affecting kernels, external modules, or boot artifacts trigger a Pacman hook. The maintenance path waits for DKMS, signs external modules, regenerates initramfs, signs kernels and EFI files, and redeploys the boot chain.

Do **not** repeatedly run `catos-secureboot enable` after normal upgrades. Verify the resulting state with:

```bash
sudo catos-secureboot status
sudo catos-secureboot verify
```

If the system still reports `enrollment-pending`, complete the machine-certificate enrollment in MokManager first. See [Secure Boot](../system/secure-boot.md).

## When to reboot

Linux does not require a reboot after every update, but reboot after changes such as:

- kernel or CPU microcode updates;
- NVIDIA or AMD graphics-stack updates;
- systemd, glibc, or other core runtime updates;
- replacement of shared libraries still used by running applications;
- bootloader, initramfs, Secure Boot, or disk-unlock configuration changes.

Before rebooting, confirm that the package transaction, DKMS builds, and boot-chain maintenance completed without errors.

## Common problems

### Package database lock

Confirm that pacman, Discover, yay, or paru is not still running. Do not remove `/var/lib/pacman/db.lck` while a package manager is active.

### Mirror synchronization mismatch

Refresh mirrors or retry later. Do not bypass repository synchronization problems by ignoring dependencies or forcing file overwrites.

### Signature or keyring errors

Check the clock, update the keyrings, and immediately finish the full upgrade:

```bash
timedatectl
sudo pacman -Sy archlinux-keyring catos-keyring
sudo pacman -Su
```

Do not stop after the database refresh and continue using the system in that partial-upgrade state.

### The system no longer boots after an update

If Btrfs boot snapshots are enabled with a compatible boot method, use an earlier snapshot from the boot menu for diagnosis. See [Snapshots and recovery](../system/snapshots.md).
