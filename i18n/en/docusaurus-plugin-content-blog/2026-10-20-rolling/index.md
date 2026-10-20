---
slug: 2026-10-20-rolling
title: CatOS October 2026 Updates — Desktops, Installer, and System Tools
authors: []
tags: [updates, CatOS, rolling]
---

Since the 2026.08.05 installation images, CatOS has continued delivering desktop and system improvements through its package repositories. This update covers the refreshed CatOS Hello, Catdot Profile previews, graphical package management, network-installation handling, and Wayland desktop configurations.

<!-- truncate -->

:::info Installation media versus rolling updates

**This is a summary of released package updates and recent source development, not a new ISO release announcement.** As of October 20, 2026, the publicly listed download images remain **CatOS 2026.08.05**, in standard and NVIDIA editions. Installed systems can receive released package improvements through regular updates. Unpublished image builds and source commits are not the same as shipped packages.

:::

## CatOS Hello 0.1.2: a clearer welcome and maintenance workflow

`catos-hello` has been updated to **0.1.2**. Its pages now depend on the current environment:

- **Live session:** launch the standard or advanced installer and access disk tools and installation logs;
- **Installed system:** browse onboarding, software and desktop, system maintenance, and system information pages;
- **Maintenance:** find mirror selection, repository configuration, failed services, Pacman transaction history, and diagnostic log collection;
- **Desktop Profiles:** inspect installed Catdot Profiles and preview packages or existing configuration paths affected before switching.

Catdot performs the actual Profile switch. The preview does not modify the system, and applying a Profile requires confirmation. See the [CatOS Hello guide](/en/docs/usage/hello).

## Catdot: preview desktop changes before applying them

Catdot now provides structured queries and a non-mutating activation plan:

```bash
catdot list --json
catdot current --json
catdot plan catos-niri-dms
catdot plan catos-niri-dms --json
```

`plan` describes required packages, file writes and removals, and potentially affected existing paths **without switching Profiles**. CatOS Hello uses these interfaces for its preview. The switch still uses `catdot select PROFILE`. After package upgrades, accepting a new desktop configuration revision still requires an explicit `catdot update`. Catdot continues backing up files before replacement.

See the [Catdot Profile guide](/en/docs/usage/catdot).

## Software management and desktop configurations

- **Shelly** is available in the CatOS package repositories and is included in newer ISO build configurations as the graphical package-management entry point. You may also use `pacman`, `paru`, or `yay`, but do not run concurrent package transactions.
- **Noctalia v5** Profiles have been published for Niri and Hyprland under the consistent names `catos-niri-noctaliav5` and `catos-hyprland-noctaliav5`.
- **KDE** settings no longer start the redundant Plasma Welcome instance automatically.
- **Hardware integration** continues to receive CHWD and NVIDIA driver package updates.

Related guides: [Shelly](/en/docs/usage/shelly) · [Desktop options](/en/docs/desktops).

## Online installer: fewer unnecessary blockers

Recent Calamares and installer-configuration package updates improve network installation:

- Remote package-list requests now have a **10-second timeout**, rather than waiting indefinitely.
- The installer no longer has a global network gate at entry. Network requirements are handled by the package operations that actually need them.
- Desktop selections and their package sets have been aligned.

Offline installation should continue to work without external network access during installation. Read the [online installation](/en/docs/installation/online-installation) and [offline installation](/en/docs/installation/offline-installation) guides.

## Merged source changes and future installation media

The following changes are in source repositories, but **this does not mean they are part of the publicly available 2026.08.05 ISO or already released packages**:

- The ISO build pipeline has gained NVIDIA and Broadcom DKMS module building and signing, and GRUB 2.16 SBAT generation updates.
- Niri + DMS source fixes merged on October 20 address Niri/DMS inputs and outputs, blur configuration, GTK theming, and an Fcitx5 theming hook.

These changes reach users when the corresponding packages or new images are published. Always use the [download page](/en/docs/download) for actual filenames, download links, and SHA-256 checksums.
