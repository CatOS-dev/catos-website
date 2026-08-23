---
title: Using the AUR
sidebar_position: 5
description: Safely use yay or paru on CatOS to build, update, inspect, and maintain AUR packages.
---

# Using the AUR

The Arch User Repository (AUR) contains community-contributed `PKGBUILD` files and related build instructions. The AUR is **not a binary package repository**: an AUR helper downloads the build recipe and sources, builds a normal Arch package locally, and then hands that package to Pacman for installation.

The default CatOS environment provides both `yay` and `paru`. Their roles overlap; choose one for regular use rather than alternating between them during the same maintenance workflow.

## Search and install

With yay:

```bash
yay -Ss keyword
yay -S package_name
```

Or with paru:

```bash
paru -Ss keyword
paru -S package_name
```

Do not launch an AUR helper as root. The build should run as a normal user and request sudo only when Pacman needs to install dependencies or the finished package.

## What to inspect before installing

At minimum, review:

- the `PKGBUILD` and related `.install` scripts;
- upstream URLs listed in `source`;
- unknown prebuilt binaries that are downloaded or executed;
- recent maintenance, AUR comments, and known issues;
- package names, `provides`, and `conflicts` that may replace Arch or CatOS packages;
- extra signing keys requested by the build;
- the actual commit or tag built by Git/VCS packages.

:::warning AUR trust boundary

AUR content is community-maintained and does not go through the same review and controlled binary build process as Arch Linux or CatOS repository packages. Approving an AUR build means choosing to trust that build recipe and its upstream sources.

:::

## Download the build files first

```bash
yay -G package_name
cd package_name
```

After reviewing the `PKGBUILD`, build it manually if desired:

```bash
makepkg -si
```

When using paru, you can also inspect the PKGBUILD differences shown before approving an installation.

## Update AUR packages

Use one AUR helper to process repository and AUR upgrades together:

```bash
yay -Syu
```

or:

```bash
paru -Syu
```

Do not run `pacman -Syu` or a Shelly update concurrently in another terminal or session.

AUR packages are built locally against the libraries available at build time. Large changes to shared libraries, Python, Electron, kernels, or other ABIs can require an AUR package rebuild. If a package is still installed but suddenly cannot load a library, check whether it came from the AUR or another local build.

## Find AUR and local packages

```bash
pacman -Qm
```

This lists installed packages that are absent from the currently synchronized repositories. It commonly includes AUR and locally built packages, but it can also include packages that were later removed from a repository, so combine it with `pacman -Qi` when determining origin.

## Remove a package

Once installed, an AUR package is a normal Pacman package:

```bash
sudo pacman -Rns package_name
```

Read the final transaction before confirming and make sure Pacman's dependency removal set is expected.

For complete system updates together with Catdot and Secure Boot behavior, see [Updating the system](./update.md).
