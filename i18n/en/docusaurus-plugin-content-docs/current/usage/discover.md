---
title: Using Discover
sidebar_position: 4
description: Use Discover in KDE Plasma to browse repository applications while understanding its boundaries with Pacman, the AUR, and rolling updates.
---

# Using Discover

The KDE Plasma preset includes Discover for browsing and managing desktop applications that provide suitable AppStream metadata. Discover is a package-management frontend; the software still comes from repositories already configured on the system.

It does not replace Pacman or the AUR. Command-line repository packages may not appear in Discover, and AUR `PKGBUILD` recipes should not be treated as official Arch or CatOS repository packages.

## Search and install applications

1. Open **Discover** from the application menu.
2. Search for the application name.
3. Open its detail page and inspect the name, version, and source.
4. Install it after confirming the package is the one you expect.

If Discover cannot find a package, first check whether the synchronized repositories contain it:

```bash
pacman -Ss keyword
```

If Pacman finds the package but Discover does not, the package may simply lack AppStream metadata suitable for Discover. That does not by itself indicate a repository problem.

## Inspect and remove installed applications

Discover's installed-applications view focuses on software it can represent as desktop applications. Use Pacman when you need the complete installed package list:

```bash
pacman -Q
```

Inspect one installed package with:

```bash
pacman -Qi package-name
```

## Discover and system updates

Discover can process repository updates, but CatOS is rolling release and the same package-management rule always applies: **only one frontend should modify the package database at a time**.

Do not run Discover updates concurrently with:

```text
pacman
yay
paru
another Discover update
```

For large system upgrades, kernel or DKMS changes, Secure Boot maintenance, or transactions with package replacement prompts, the complete terminal output is easier to diagnose:

```bash
sudo pacman -Syu
```

If you also maintain AUR packages, use one long-term AUR helper for the complete update. See [Updating the system](./update.md).

## Discover remains on “Fetching”

Do not start by deleting the Pacman lock file. Check in this order:

1. make sure no other Pacman, yay, paru, or Discover transaction is running;
2. confirm networking and repository access work normally;
3. run `sudo pacman -Syu` in a terminal and read any mirror, keyring, or dependency errors;
4. close and reopen Discover.

If Pacman can synchronize and install packages normally while Discover still cannot load, the problem is more likely in the Discover, PackageKit, or AppStream metadata layer than in the CatOS repository itself.

## AUR software

AUR software is community-maintained and built locally. Do not add an unknown binary repository merely because an AUR application is absent from Discover. See [Using the AUR](./aur.md).
