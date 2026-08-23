---
title: Using Shelly
sidebar_position: 4
description: Use CatOS's default Shelly graphical package manager for repositories, the AUR, Flatpak, and AppImage software.
---

# Using Shelly

CatOS desktop presets provide **Shelly** as the common graphical package manager. Shelly uses Arch Linux libalpm directly for Pacman repository packages and also supports the AUR, Flatpak, and AppImage. Flatpak support is provided by the separate `shelly-flatpak-backend` package.

## Software sources

Check the source before installing or updating software:

- **Repository**: Arch, CatOS, and other repositories configured in `pacman.conf`;
- **AUR**: community-maintained `PKGBUILD` recipes built locally, not official Arch or CatOS repository packages;
- **Flatpak**: applications from configured Flatpak remotes;
- **AppImage**: standalone application images managed by Shelly.

Review AUR PKGBUILDs, sources, and changes just as you would with `paru` or `yay`.

## Install and remove software

Open **Shelly** from the application menu, search for software, verify its source, and install it. Shelly can also list installed software and remove packages or applications.

For complete Pacman package information, the command line remains available:

```bash
pacman -Ss keyword
pacman -Qi package-name
```

## System updates

CatOS is a rolling release. Whether you use Shelly, Pacman, paru, or yay, **only one frontend may modify the Pacman database at a time**.

Do not run these while a Shelly transaction is active:

```text
pacman
paru
yay
another Shelly transaction
```

For complex package replacements, kernel or DKMS changes, or Secure Boot maintenance, complete terminal output is often easier to diagnose:

```bash
sudo pacman -Syu
```

See [Updating the system](./update.md) for the full update guidance.

## Database locks and failed updates

Do not start by deleting `/var/lib/pacman/db.lck`. First confirm that Shelly, Pacman, paru, and yay have no active package transaction, then inspect mirror, keyring, and dependency errors.

If Shelly fails while Pacman still works, use the terminal to complete maintenance and keep the Shelly error output for diagnosis.

## Command line

Shelly also provides a CLI:

```bash
shelly --help
shelly search standard keyword
shelly list-updates all
```

Pacman, paru, and yay remain available for users who prefer the standard Arch command-line workflows.
