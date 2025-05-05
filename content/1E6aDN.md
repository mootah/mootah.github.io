---
aliases: []
created: 2025-05-05
modified: 2025-05-05T21:41
tags: []
title: Quartzに2-Hop-Linkを実装する
uid: 1E6aDN
---

# Quartzに2-Hop-Linkを実装する

QuartzにScrapbox(現Cosense)のような2-Hop-Linkを実装する

## 挙動

[2ホップリンク - namaraii.com](https://namaraii.com/notes/twohop_link)で述べられている通り、
自身のリンク先のバックリンクを2ホップリンクとして表示する

つまり、自身のバックリンクの関連ページは表示しない

また、1ホップリンクはアウトゴーイングリンクとバックリンクを結合して表示する

## 実装

`quartz/components/Backlinks.tsx`をベースに実装した

## 使い方

- [quartz/components/TwohopLinks.tsx](https://github.com/mootah/mootah.github.io/blob/main/quartz/components/TwohopLinks.tsx)
- [quartz/components/styles/twohoplinks.scss](https://github.com/mootah/mootah.github.io/blob/main/quartz/components/styles/twohoplinks.scss)

を所定の場所に配置して、`quartz/components/index.ts`に取り込む

```ts title="quartz/components/index.ts"
...
import TwohopLinks from "./TwohopLinks"

export {
  ...
  TwohopLinks,
}
```

`quartz/quartz.layout.ts`に設定すれば使用できる

```ts title="quartz/quartz.layout.ts"
...
export const defaultContentPageLayout: PageLayout = {
  ...
  right: [
    ...
    Component.TwohopLinks(),
  ],
}
```