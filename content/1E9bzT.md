---
created: 2025-05-15T00:38+09:00
modified: 2025-05-15T02:04+09:00
title: OklabとOklch
uid: 1E9bzT
---

# OklabとOklch

知覚的色空間
人間の視覚特性を考慮して設計された色空間
HSVで明度を揃えても眩しさが揃わない問題を解消している
特に青色領域での色の変化をより自然に表現できる

## Oklab（直交座標）

- `l` : 明度
- `a` : 赤緑成分
- `b` : 青黄成分

## Oklch（極座標）

- `l` : 明度
- `c` : 彩度
- `h` : 色相

## 参考

- [Oklab color space - Wikipedia](https://en.wikipedia.org/wiki/Oklab_color_space)
- [A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/)
- [GitHub - NeverCease/uchu: the color palette for internet lovers](https://github.com/NeverCease/uchu)
- [OKLCHに対応した拡張された色域のカラーパレットを生成できる「uchu」 - GIGAZINE](https://gigazine.net/news/20250219-oklch-uchu-style/)