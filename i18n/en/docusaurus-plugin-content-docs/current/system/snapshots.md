---
title: Snapshots and recovery
description: Responsibilities of Btrfs, Snapper, and bootable snapshots in CatOS.
---

# Snapshots and recovery

Btrfs provides the snapshot mechanism and Snapper manages snapshot creation, metadata, and retention. Boot integration exposes suitable snapshots in Limine without taking over Snapper's responsibilities.

Snapshots are not backups. They normally remain on the same storage device and cannot protect against disk loss or complete device failure.
