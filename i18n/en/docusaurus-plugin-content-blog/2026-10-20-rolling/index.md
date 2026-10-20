---
slug: 2026-10-20-rolling
title: CatOS October 2026 Update — Welcome App, Desktops, and Installer
authors: []
tags: [updates, CatOS, rolling]
---

October's updates make CatOS easier to use: a redesigned welcome app, previews before switching desktop configurations, improved software management, and a smoother online installation process.

<!-- truncate -->

## CatOS Hello 0.1.2

The welcome app has been reorganized so the tools you need are easier to find.

- **On installation media**, launch the standard or advanced installer, open disk tools, or check installation logs.
- **On an installed system**, find separate pages for software and desktops, maintenance, and system information.
- **For maintenance**, manage mirrors, inspect failed services or Pacman history, and collect diagnostic logs.
- **When switching desktops**, preview which packages will be installed and which configuration files may change.

See the [CatOS Hello guide](/en/docs/usage/hello).

## Catdot: see the changes before switching desktops

You can now preview a desktop Profile without applying it:

```bash
catdot plan catos-niri-dms
```

The preview shows missing packages and files that would be changed or removed, without changing your system. When ready, use `catdot select PROFILE` to switch. You can update an existing configuration with `catdot update`; Catdot backs up existing files before replacing them. CatOS Hello also offers a graphical preview.

See the [Catdot guide](/en/docs/usage/catdot).

## Software and desktop updates

- **Shelly** is now available in the CatOS repositories as a graphical app for finding, installing, and updating software. You can still use `pacman`, `paru`, or `yay` from the terminal.
- **Noctalia v5** adds desktop configurations for Niri and Hyprland.
- **KDE** fixes the issue where Plasma Welcome would start unnecessarily.
- **Hardware support** receives updated CHWD and NVIDIA driver packages.

Related guides: [Shelly](/en/docs/usage/shelly) · [Desktop environments](/en/docs/desktops).

## Online installation improvements

The installer handles unreliable networks better:

- Loading remote package lists now has a **10-second timeout**, so it won't hang indefinitely.
- An initial network check no longer blocks entry to the installer. Steps that need to download packages still check the network as needed.
- Package selections have been adjusted for several desktop options.

See the [online installation guide](/en/docs/installation/online-installation).
