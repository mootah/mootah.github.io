---
created: 2025-05-04
modified: 2025-05-04 17:02:13
title: Quartzでローカルフォントを使う
uid: 1E5Izk
---

# Quartzでローカルフォントを使う

[[1E6pdS|Quartz]]

[かえでさんの記事](https://obsidian.kaedesato.work/Box/Quartz%E3%81%A7%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E3%82%92%E4%BD%BF%E3%81%86%E6%96%B9%E6%B3%95)を参考にした

## Config

```ts title="quartz.config.ts"
const config: QuartzConfig = {
  configuration: {
    ... 
    theme: {
      fontOrigin: "local",
      cdnCaching: false,
      typography: {
        header: "LINE Seed JP",
        body: "LINE Seed JP",
        code: "Juisee",
      },
    },
    ... 
  },
}
```

## フォントフェイス

```scss title="quartz/styles/custom.scss"
@use "./base.scss";

@font-face {
    font-family: "LINE Seed JP";
    src: url("/static/fonts/LINESeedJP_OTF_Rg.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: "LINE Seed JP";
    src: url("/static/fonts/LINESeedJP_OTF_Bd.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: "Juisee";
    src: url("/static/fonts/Juisee-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: "Juisee";
    src: url("/static/fonts/Juisee-Bold.ttf") format("truetype");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}
```

## OGP

デフォルトではローカルフォントを見てくれない
あと、woffに対応していないので注意

### ローカルフォントをとってくるユーティリティを作る

フォントの名前解決をよしなにしてほしい...

```ts title="quartz/util/font.ts"
import { promises as fs } from "fs"
import path from "path"
import { QUARTZ } from "./path"
import { FontWeight } from "satori/wasm"
import chalk from "chalk"

const fontDir = path.join(QUARTZ, "static", "fonts")

type FontDict = { [rawFontName: string]: { [weight: number]: string } }

const localFonts: FontDict = {
  "LINE Seed JP": {
    400: "LINESeedJP_OTF_Rg.otf",
    700: "LINESeedJP_OTF_Bd.otf",
  },
  "Juisee": {
    400: "Juisee-Regular.ttf",
    700: "Juisee-Bold.ttf",
  },
}

export async function getLocalFontData(rawFontName: string, weight: FontWeight) {
  const fontName = localFonts[rawFontName][weight]
  const fontPath = path.join(fontDir, fontName)
  try {
    await fs.access(fontPath)
    return fs.readFile(fontPath)
  } catch (error) {
    console.log(
      chalk.blue(
        `\nInfo: Failed to get local font ${rawFontName} with weight ${weight}`,
      ),
    )
  }
  return undefined
}
```

### Google Fontsを取りに行く前に差し込む

```ts title="quartz/util/og.tsx"
import { getLocalFontData } from "./font"

...

export async function fetchTtf(
  rawFontName: string,
  weight: FontWeight,
): Promise<Buffer<ArrayBufferLike> | undefined> {

  const localFontData = await getLocalFontData(rawFontName, weight)
  if (localFontData) {
    return localFontData;
  }
  ...  
}
```