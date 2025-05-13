---
aliases: null
created: 2025-05-03
modified: 2025-05-07T18:13
title: 非分割エルゴキーボードを作りたい
uid: 1E5kRj
---

# 非分割エルゴキーボードを作りたい

分割[[1E8vrM|キーボード]]は充電やら持ち運んでセッティングやらがだるい
非分割を探すとBluetoothが使えてGateron LPなやつがありそうでない

## 要件

- 形状: 42keys column staggered splay unibody
- MCU: Xiao BLE
- キースイッチ: Gateron LP

## 類似のキーボード

- [PJE66/hummingbird](https://github.com/PJE66/hummingbird)
    - Xiao BLE, Choc v1, 30keys
- [lpgalaxy/revxlp](https://gitlab.com/lpgalaxy/revxlp)
    - Xiao BLE, Choc v1, 42keys
- [kapee1/osprey-remix](https://github.com/kapee1/osprey-remix)
    - nice!nano, Choc v1, 42keys
- [penk/LoremIpsum36](https://github.com/penk/LoremIpsum36)
    - RP2040-Zero, Gateron LP, 36keys
- [gtips/reviung](https://github.com/gtips/reviung)
    - nice!nano, MX, 41keys
    - [Creating a New ZMK Shield for the Reviung41 - YouTube](https://www.youtube.com/watch?v=KDYQkJblhgY)

## 学ぶべきこと

- KiCadで基板を設計
- [[1E5cv5|ZMK]]でファームウェアを実装
- Fusion360でケースをモデリング
- はんだ付け