---
title: CatOS repository
description: How the CatOS repository relates to Arch Linux repositories.
---

# CatOS repository

The CatOS repository delivers distribution integration packages such as installer configuration, desktop presets, themes, boot tools, and system policy. General-purpose software should continue to come from the official Arch Linux repositories when possible.

A package already published to the repository must not be rebuilt from the same source commit and silently replaced. A rebuild requires a new source commit so the artifact has a distinct and traceable build identity.
