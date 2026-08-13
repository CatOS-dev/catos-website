---
title: CatOS repository
description: Understand how the CatOS repository relates to Arch Linux, including signature verification, package origins, and common diagnostics.
---

# CatOS repository

CatOS follows the Arch Linux rolling-release model. General-purpose software normally comes from the official Arch Linux repositories, while the CatOS repository primarily delivers the distribution integration layer: installer configuration, desktop Profiles, themes, boot tools, branding, and system-maintenance components.

An installed CatOS system therefore does not use a software ecosystem isolated from Arch Linux. Normal system upgrades resolve packages from both Arch Linux and CatOS repositories.

## Inspect enabled repositories

```bash
pacman-conf --repo-list
```

Inspect only the CatOS repository configuration on the current machine:

```bash
pacman-conf --repo catos
```

Mirror addresses and repository configuration may change through rolling updates. Avoid replacing the current configuration with a fixed `[catos]` block copied from an old guide.

## What the CatOS repository usually contains

Typical packages include:

- Calamares and CatOS installer configuration;
- desktop configuration or Profiles for KDE, GNOME, Xfce, Niri, Sway, Labwc, Wayfire, and others;
- system-integration tools such as `catdot` and `catos-secureboot`;
- CatOS themes, icons, branding, and shell configuration;
- helper components packaged for the distribution's installation or hardware workflows.

List the repository:

```bash
pacman -Sl catos
```

Inspect individual repository packages:

```bash
pacman -Si catdot
pacman -Si catos-secureboot
```

## Package signatures and keyrings

The CatOS installation environment includes `catos-keyring`, and the normal installed Pacman configuration uses package signature verification. If a signature or keyring error occurs, do not work around it by changing the repository to:

```text
SigLevel = Never
```

That disables Pacman's signature verification for the repository.

First check the system clock and installed keyrings:

```bash
timedatectl
pacman -Q archlinux-keyring catos-keyring
```

When keyrings need refreshing, immediately complete the full upgrade:

```bash
sudo pacman -Sy archlinux-keyring catos-keyring
sudo pacman -Su
```

Do not stop after `pacman -Sy` and continue normal use in a partial-upgrade state; Arch Linux does not support partial upgrades.

## Determine where a package came from

Inspect an installed package:

```bash
pacman -Qi package-name
```

Inspect the current repository candidate:

```bash
pacman -Si package-name
```

Find which installed package owns a file:

```bash
pacman -Qo /path/to/file
```

List installed packages that are not present in the currently synchronized repositories:

```bash
pacman -Qm
```

`pacman -Qm` commonly includes AUR packages, local builds, or packages that have since disappeared from a repository. This is not automatically an error, but package origin deserves extra attention during updates and troubleshooting.

## Third-party repositories and priority

Users may enable CachyOS, Arch Linux CN, or other third-party repositories, but additional repositories increase the chance of:

- the same package name being provided by multiple repositories;
- different repository update cadences;
- changing `provides`, `conflicts`, or replacement relationships;
- third-party packages overriding Arch or CatOS components;
- different keyrings and signature policies.

Before adding a third-party repository, verify its maintainer, signing model, and repository order. When dependency conflicts occur, do not start by bypassing them with `--nodeps` or `--overwrite '*'`; first determine which repository is actually providing each package.

## Upgrade policy

Like Arch Linux, CatOS should be upgraded as a complete system:

```bash
sudo pacman -Syu
```

If you also use the AUR, see [Using the AUR](../usage/aur.md). For package upgrades together with Catdot Profile and Secure Boot behavior, see [Updating the system](../usage/update.md).
