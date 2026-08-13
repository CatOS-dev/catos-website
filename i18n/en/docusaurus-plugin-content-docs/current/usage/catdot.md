---
title: Catdot Profiles
sidebar_position: 7
description: Select, update and maintain CatOS desktop Profiles with Catdot, including configuration backups and package cleanup boundaries.
---

# Catdot Profiles

Catdot switches complete CatOS user-configuration Profiles. In CatOS 2026.08.05, Niri + DMS, Niri + Noctalia, Sway, Labwc and Wayfire use it to deliver desktop packages and HOME configuration as one maintainable unit.

## What a Profile contains

A Profile declares exact Pacman package names, HOME-relative paths that remain managed by Catdot, and one-time seed configuration.

**Managed** content is refreshed when the Profile is selected or explicitly updated. **Seed** content establishes the initial state only and remains user-owned afterwards.

## Inspect and select Profiles

```bash
catdot list
catdot current
catdot show catos-niri-dms
```

Select Niri + DMS:

```bash
catdot select catos-niri-dms
```

Select Niri + Noctalia:

```bash
catdot select catos-niri-noctaliav5
```

`catdot select` installs declared packages through Pacman by default. When an installer has already deployed packages, use:

```bash
catdot select PROFILE --packages=verify
```

This verifies that every declared package is present without invoking `sudo pacman` again.

A complete desktop Profile switch normally requires logging out and back in. Catdot does not restart running desktop components, applications or services.

## Accept a newer Profile revision

A normal system package upgrade does not silently replace the accepted Profile configuration. Refresh Profiles explicitly with:

```bash
catdot update
```

Or update one Profile:

```bash
catdot update catos-niri-dms
```

If the Profile is active, Catdot backs up the old managed content and applies the new revision. Updating an inactive Profile does not switch to it or change the HOME configuration currently in use.

## Backups

Before deleting or replacing an existing HOME target, Catdot stores the previous content under:

```text
~/.local/state/catdot/backups/<operation>/home/...
```

The five most recent backup generations are retained.

Catdot currently has no automatic rollback command. Restore files manually from the relevant backup generation when needed. If an underlying filesystem error interrupts an operation, fix that error first and then rerun the command.

## Remove Profiles and prune packages

Forget an inactive Profile with:

```bash
catdot remove PROFILE
```

`remove` deletes Catdot state and cached content but does not uninstall packages.

To remove direct packages that were originally introduced by Catdot and are no longer referenced by any retained Profile:

```bash
catdot prune
```

Pacman still calculates the final dependency closure and asks for confirmation. Packages that were already installed before Catdot first requested them are never added to the prune set.

:::warning Multi-user systems

Catdot package ownership is per-user and is not combined into a system-wide reference database. Do not independently use `catdot prune` from multiple user accounts to manage one shared package set.

:::

## Command reference

```text
catdot list
catdot show PROFILE
catdot current
catdot select PROFILE [--packages=install|verify]
catdot update [PROFILE]
catdot remove PROFILE
catdot prune
catdot validate PROFILE_ROOT
```
