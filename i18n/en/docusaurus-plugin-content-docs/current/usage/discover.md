---
title: Using Discover
sidebar_position: 4
---

# Using Discover

The KDE Plasma preset includes Discover as a graphical package-management frontend. Search for an application, inspect its source and version, and use its detail page to install or remove it.

![Searching in Discover](/img/docs/discover_search.jpg)

![Installing in Discover](/img/docs/discover_install.jpg)

The Installed page lists applications that Discover can represent through AppStream metadata.

![Installed applications](/img/docs/discover_query.jpg)

![Removing an application](/img/docs/discover_remove.jpg)

Do not run Discover updates while pacman, yay, or paru is modifying the package database.

If Discover cannot find a package, check the full repository with:

```bash
pacman -Ss keyword
```

Discover does not necessarily display every command-line package. For community build recipes, read [Using the AUR](./aur.md).
