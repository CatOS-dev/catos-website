---
title: Managing packages with pacman
sidebar_position: 3
---

# Managing packages with pacman

CatOS uses pacman for Arch Linux and CatOS repository packages.

Search repositories and installed packages:

```bash
pacman -Ss keyword
pacman -Qs keyword
```

Inspect repository or installed metadata:

```bash
pacman -Si package_name
pacman -Qi package_name
```

Install a package:

```bash
sudo pacman -S package_name
```

Perform a complete upgrade:

```bash
sudo pacman -Syu
```

Never run `pacman -Sy` as a standalone daily operation. Refreshing package databases without upgrading installed packages creates an unsupported partial-upgrade state.

Remove a package and unused dependencies:

```bash
sudo pacman -Rns package_name
```

List orphaned dependencies and review them before removal:

```bash
pacman -Qdtq
```

With `pacman-contrib`, keep recent package-cache versions using:

```bash
sudo paccache -r
```

Do not run pacman, Shelly, yay, and paru concurrently. Before touching `/var/lib/pacman/db.lck`, confirm that no package transaction is still active.
