---
created: 2025-05-01
modified: 2025-05-06T13:44
title: Quartzのセットアップ
uid: 1E4Dcm
---

# Quartzのセットアップ

[[1E8FZz|環境構築]]

[[1E6phh|Obsidian]]で書いたノートを[[1E6pdS|Quartz]]で公開する

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