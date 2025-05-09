---
aliases: null
created: 2025-05-08
modified: 2025-05-09T18:59
tags:
- Quartz
title: Quartzのソートに手こずった
uid: 1E7rqa
---

# Quartzのソートに手こずった

QuartzにはデフォルトでExplorerというノートの一覧を左サイドに表示する機能がある

この一覧を更新順にソートしたい

## 結論

`contentIndex.tsx`内の`date`を削除している行をコメントアウトする

```diff title="contentIndex.tsx"
- delete content.date
+ // delete content.date
```

`quartz.layout.ts`にソート関数を実装して`Explorer`に与える

```ts title="quarts.layout.ts"
import { Options } from "./quartz/components/Explorer"
...
const sortFn: Options["sortFn"] = (a, b) => {
  if (a.data?.date && b.data?.date) {
    const aDate = new Date(a.data?.date)
    const bDate = new Date(b.data?.date)
    const order = bDate.getTime() - aDate.getTime()
    if (order != 0) return order
  }
  return a.displayName.localeCompare(b.displayName)
}
...
export const defaultContentPageLayout: PageLayout = {
  ...
  left: [
    ...
    Component.Explorer({ sortFn }),
  ],
  ...
}
```

## 紆余曲折

軽く調べると、`quartz.layout.ts`からソート関数を差し込めることがわかる

```ts title="quartz.layout.ts"
export const defaultContentPageLayout: PageLayout = {
  ...
  left: [
    ...
    Component.Explorer({ sortFn }),
  ],
}
```

ソート関数は以下のような形をしている

```ts
const sortFn: Options["sortFn"] = (a, b) => {
  return 1 // or -1
}
```

`a`と`b`は`FileTrieNode<ContentDetails>`型である
`ContentDetails`の定義を見てみると

```ts title="contentIndex.tsx" {9}
export type ContentDetails = {
  slug: FullSlug
  filePath: FilePath
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
}
```

`date`あるじゃん！
じゃあということでソート関数を実装する

```ts quartz.layout.ts
const sortFn: Options["sortFn"]: (a, b) => {
  const aDate = a.data?.date
  const bDate = b.data?.date
  if (aDate && bDate) {
    const order = bDate.getTime() - aDate.getTime()
    if (order != 0) return order
  }
  return a.displayName.localeCompare(b.displayName)
}
```

これでビルドしてみると`date`は`undefined`ですよって言われる
なので`date`が格納されるところを見に行く

実は、`Explorer`は`contentIndex.json`を非同期に受け取って表示している
その`json`が作られているところを見に行くと

```ts title="contentIndex.tsx" {7}
const simplifiedIndex = Object.fromEntries(
  Array.from(linkIndex).map(([slug, content]) => {
    // remove description and from content index as nothing downstream
    // actually uses it. we only keep it in the index as we need it
    // for the RSS feed
    delete content.description
    delete content.date
    return [slug, content]
  }),
)

yield write({
  ctx,
  content: JSON.stringify(simplifiedIndex),
  slug: fp,
  ext: ".json",
})
```

なんと`date`が消されている！
これをコメントアウトする

今度こそ上手くいっただろうとビルドすると
`date`に`getTime`なんてメソッドないですよって言われる

実は、jsonをパースする都合上`ContentDetails`の`date`は`Date`型にキャストされずに`string`型のままになっている

ソート関数側で`Date`型を作ってやると上手くいった

## 余談

このあと、フォルダ機能を使わないのと日付が見えててほしいという理由で`RecentNotes`をいじって使うことにした
その結果ほとんど`Explorer`と同じロジックを実装することになった
今思えば`Explorer`の見た目を変えるほうがまだ修正コストが低かったかもしれない