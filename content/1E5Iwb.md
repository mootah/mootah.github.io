---
aliases: null
created: 2025-05-04
modified: 2025-05-05T14:28
title: QuartzのURLをUIDにする
uid: 1E5Iwb
---

# QuartzのURLをUIDにする

## 問題点

[[1E5q66|Obsidianでファイル名をUIDにする]]とwikiリンクの恩恵を受けにくくなる

具体的には、

```md title="01.md"
# hoge
[[fuga]]
```

というファイルがあって

```md title="02.md"
# fuga
```

というファイルをあとから作ったときに

```md title="01.md"
# hoge
[[02|fuga]]
```

と、自動的に更新してくれない

## 解決策

そこで、[[1E6phh|Obsidian]]内ではあくまでH1をファイル名として扱い、
[[1E6pdS|Quartz]]側の実行スクリプトでUIDに置換する、ということをやる

### frontmatterの設定

```yaml title="frontmatter"
uid: "<Templaterで生成>"
title: "<File Title Updaterで更新>"
aliases: []
tags: []
created: "<Templaterで生成>"
modified: "<Update Time on Editで更新>"
```

### Quartzプロジェクトのディレクトリ構成

```zsh title="tree"
./
├── content/
├── obsidian -> symlink or submodule
├── scripts/
...
```

- obsidianはvaultのことで、シンボリックリンクかサブモジュールにする
- content内は空にしておき、obsidianから前処理したページを移動してくる
- scriptsディレクトリを用意する

### 前処理するスクリプトを書く

[scripts/rename_with_uid - GitHub](https://github.com/mootah/mootah.github.io/blob/main/scripts/rename_with_uid)

- 全てのファイルのfrontmatterからuidをとってきてリネームする
- 全てのファイルのwikiリンクをuidで更新する
    - `[[title]]`      -> `[[uid|title]]`
    - `[[title|alias]]` -> `[[uid|alias]]`

### 実行権限を与える

```zsh title="zsh"
chmod +x scripts/rename_with_uid
```

### 使い方

```zsh title="zsh"
scripts/rename_with_uid -h
```

```
usage: rename_with_uid [-h] [-i I] [-o O] [--ignore IGNORE]

Rename files with uid, then update wiki links

options:
  -h, --help       show this help message and exit
  -i I             Obsidian vault (default: obsidian)
  -o O             Quartz content (default: content)
  --ignore IGNORE  Prefix to ignore (default: "_ .")
```

- `-i`
    - 生成元のファイルがあるディレクトリ
    - 指定した相対パス配下を全て処理する
    - デフォルトは`./obsidian`
- `-o`
    - 生成先のディレクトリ
    - 生成元のディレクトリ構成を受け継ぐ
    - デフォルトは`./content`
- `--ignore`
    - 無視するディレクトリを前方一致で指定できるようにした
    - スペース区切りで列挙できる
    - デフォルトは`_`と`.`

### syncコマンド一発でpushまで行う

```bash title="scripts/sync"
#!/usr/bin/env bash
DIR=`dirname $0`
$DIR/rename_with_uid && bun quartz sync
```

```zsh title="zsh"
chmod +x scripts/sync
```

```zsh title="zsh"
scripts/sync
```