---
aliases:
- Quartz
created: 2025-05-01
modified: 2025-05-04 17:02:04
tags:
- Quartz
- 環境構築
- Obsidian
title: Quartzのセットアップ
uid: 1E4Dcm
---

# Quartzのセットアップ

[[1E4vtE|Obsidian]]用の静的サイトジェネレータ

[Welcome to Quartz 4](https://quartz.jzhao.xyz/)を読んでやってく

手元のnodeがv12とかだったので最新版をインストールする
- [[1E4E33|Nodeをインストールする]]
- [[1E4FYt|Bunをインストールする]]

## Quartz

公式通りだとcloneしてorigin変えるみたいな感じっぽかった
forkしてObsidian Vaultをsubmoduleにすれば良さそう

```zsh title="zsh"
gh repo fork jackyzha0/quartz --clone
cd quartz
bun i
bun quartz create
```

とりあえずObsidian Vaultをシンボリックリンクとして運用する

```zsh title="zsh"
ln -s <vault path> obsidian
```

[[1E5Iwb|QuartzでのみUIDを使う]]