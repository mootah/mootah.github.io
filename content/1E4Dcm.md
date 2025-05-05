---
aliases:
- Quartz
created: 2025-05-01
modified: 2025-05-05T15:10
tags:
- Quartz
- Obsidian
- 環境構築
title: Quartzのセットアップ
uid: 1E4Dcm
---

# Quartzのセットアップ

## Quartz

静的サイトジェネレータ
[[1E4vtE|Obsidian]]をWeb公開できる

[Welcome to Quartz 4](https://quartz.jzhao.xyz/)を読んでやってく

手元のnodeがv12とかだったので最新版をインストールする
- [[1E4E33|Nodeをインストールする]]
- [[1E4FYt|Bunをインストールする]]

## Quartzプロジェクトを作る

公式通りだとcloneしてorigin変えるみたいな感じっぽかった
forkしてObsidian Vaultをsubmoduleにすれば良さそう

```zsh title="zsh"
gh repo fork jackyzha0/quartz --clone
cd quartz
bun i
bun quartz create
```

とりあえずObsidian Vaultをシンボリックリンクとして運用する
[[1E5Iwb|QuartzでUIDを使う]]ために`content`ではないディレクトリにする

```zsh title="zsh"
ln -s <vault path> obsidian
```

## 各種コマンド

### Build

```zsh title="zsh"
bun quartz build
```

`public`以下にhtml等を生成する

### Serve

```zsh title="zsh"
bun quartz build --serve
```

ローカルサーバを立ち上げる

### Sync

```zsh title="zsh"
bun quartz sync
```

`git push`までを実行する
`content`がシンボリックリンクだった場合も実体に戻して`push`する

## GitHubで公開する

[[1E638F|QuartzをGitHubで公開する]]

## Syncを定期実行する

[[1E63xu|Quartzのデプロイを自動化する]]