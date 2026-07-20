---
title: Routine system maintenance
sidebar_position: 1
description: Updates, services, logs, storage, package cache, kernels, and configuration checks.
---

# Routine system maintenance

CatOS does not need frequent “cleanup” resets. Reliable maintenance consists of complete upgrades, checking failed services and logs, monitoring storage, retaining useful package cache, and keeping a recovery path.

Complete upgrades with:

```bash
sudo pacman -Syu
```

Check failed system and user services:

```bash
systemctl --failed
systemctl --user --failed
```

Inspect current-boot warnings and a specific service:

```bash
journalctl -b -p warning
journalctl -b -u service-name
```

Check storage:

```bash
df -h
lsblk -f
sudo btrfs filesystem usage /
```

Btrfs data, metadata, and unallocated space are not fully represented by a simple `df` reading.

Manage the pacman cache with `pacman-contrib`:

```bash
sudo paccache -r
du -sh /var/cache/pacman/pkg
```

Review orphaned packages before removing anything:

```bash
pacman -Qdtq
```

Inspect and limit old journal data:

```bash
journalctl --disk-usage
sudo journalctl --vacuum-size=500M
```

Check the running kernel and installed module trees:

```bash
uname -r
ls /usr/lib/modules
```

Find package-manager configuration updates:

```bash
sudo find /etc -name '*.pacnew' -o -name '*.pacsave'
```

Compare and merge them instead of overwriting files blindly.

For Btrfs, inspect or run a scrub when appropriate:

```bash
sudo btrfs scrub status /
sudo btrfs scrub start -Bd /
```

Scrub produces sustained I/O, is not a backup, and can repair data only when a redundant good copy exists.
