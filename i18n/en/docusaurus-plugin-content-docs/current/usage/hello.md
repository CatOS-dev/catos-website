---
title: CatOS Hello Welcome and Maintenance Center
sidebar_position: 3
description: Use CatOS Hello for installation, system maintenance, software management, and Catdot desktop Profile previews.
---

# CatOS Hello

**CatOS Hello** is the graphical welcome and maintenance application shipped by CatOS. When the `catos-hello` package is installed, open **CatOS Hello** from the application menu or launch it in a terminal:

```bash
catos-hello
```

It detects whether it is running in the Live installation environment or on an installed system, then presents the relevant actions.

## In a Live session

The welcome page offers **Install CatOS** and **Advanced installer**. The advanced path lets you choose network installation configuration and additional packages. Before installing, you can also access the disk and recovery tools to open a partition editor or terminal, or inspect installation logs.

See the [installation overview](../installation/overview.md) for installation modes and disk preparation.

## On an installed system

The main navigation includes:

| Page | What it provides |
| --- | --- |
| **Home** | System and desktop information, and onboarding actions |
| **Software and desktop** | Graphical package-management entry points and Catdot Profile listing, preview, and switching |
| **System maintenance** | Package mirror selection, repository configuration, failed service checks, Pacman logs, and diagnostic log collection |
| **About CatOS** | Distribution information and project links |

You can also manage packages directly through [Shelly](./shelly.md) or [Pacman](./pacman.md). Do not start package transactions simultaneously from multiple frontends.

## Preview and switch a desktop Profile

On **Software and desktop**, select a Catdot Profile and choose **Review and switch Profile**:

1. Hello asks Catdot for a preview showing required packages, configuration files to be added or removed, and affected existing paths.
2. Only after you confirm does Catdot perform activation.
3. Switching a complete desktop Profile normally requires signing out and back in.

**Previewing does not write files or install packages.** Catdot backs up existing content before replacing it during activation, but these backups are not full system snapshots. If Catdot is not installed or no Profiles are available, the desktop section may only show an explanation.

The equivalent terminal commands are:

```bash
catdot list
catdot plan catos-niri-dms
catdot select catos-niri-dms
```

See the [Catdot Profile guide](./catdot.md) for details.

## Maintenance and diagnostic tools

CatOS Hello provides mirror selection, repository editing, failed service inspection, Pacman transaction history, and diagnostic log collection. Some actions open external tools or a terminal and may require administrator authorization. Review each operation before confirming a system change.

For rolling updates, package signatures, and recovery, see [Updating the system](./update.md) and [System maintenance](../system/maintenance.md).
