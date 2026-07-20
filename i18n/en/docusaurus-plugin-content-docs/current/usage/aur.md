---
title: Using the AUR
sidebar_position: 5
---

# Using the AUR

The Arch User Repository contains user-contributed `PKGBUILD` files. An AUR helper downloads build instructions and source files, then builds a normal Arch package locally.

CatOS images include both `yay` and `paru`. Choose one for regular use.

```bash
yay -Ss keyword
yay -S package_name
```

or:

```bash
paru -Ss keyword
paru -S package_name
```

Do not run an AUR helper as root. It requests sudo only for package installation steps.

Before building, review the `PKGBUILD`, install scripts, source URLs, binary downloads, recent maintenance, package conflicts, and signing keys. AUR content does not receive the same review or controlled build process as Arch or CatOS repository packages.

Update repository and AUR packages with one helper:

```bash
yay -Syu
```

or:

```bash
paru -Syu
```

Download build files for manual inspection:

```bash
yay -G package_name
cd package_name
makepkg -si
```

After installation, AUR packages are standard pacman packages and can be removed with:

```bash
sudo pacman -Rns package_name
```
