---
aliases: []
created: 2025-05-12
modified: 2025-05-12T21:58+09:00
title: yt-dlpで字幕をダウンロードする
uid: 1E8tUI
---

# yt-dlpで字幕をダウンロードする

[yt-dlp](https://github.com/yt-dlp/yt-dlp)で字幕を取得する

`"<url>"`にはチャンネルのurlを渡して全動画の一括DLができる

- 投稿動画全て
    - `"https://youtube.com/channel/<channel_id>/videos"`
- 配信アーカイブ全て
    - `"https://youtube.com/channel/<channel_id>/streams"`

## 手入力の字幕

`--write-subs`とすれば手入力の字幕を取得できる
`--sub-lang`で言語を指定する（ちなみに`"id"`はインドネシア語）

```zsh title="zsh"
yt-dlp --write-subs --sub-lang "id" \
       --skip-download --download-archive archive.txt \
       --force-write-archive --sleep-subtitles 5 \
       -o "vtt/%(id)s.%(ext)s" \
       "<url>"
```

## 自動生成された字幕

`--write-auto-subs`とすれば自動生成された字幕を取得できる
`--sub-lang`は`"id.orig"`などとしないと自動翻訳された字幕が混ざる

```zsh title="zsh"
yt-dlp --write-auto-subs --sub-lang "id.orig" \
       --skip-download --download-archive archive.txt \
       --force-write-archive --sleep-subtitles 5 \
       -o "vtt/%(id)s.%(ext)s" \
       "<url>"

```