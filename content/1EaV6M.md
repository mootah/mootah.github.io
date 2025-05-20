---
created: 2025-05-20T05:16+09:00
modified: 2025-05-20T05:34+09:00
title: AHKでマウスのボタン割当てを変更する
uid: 1EaV6M
---

# AHKでマウスのボタン割当てを変更する

トラックボール（ProtoArc EM04）のボタン割当てがデフォルトだと手前が戻る、奥が進むになっている
指を曲げなきゃいけない手前のボタンに使用頻度の高い戻るが割当てられているのでスワップしたい

変更ソフト等が特に用意されていないのでAHKで変更する

```ahk title="trackball.ahk"
#Requires AutoHotkey v2.0

; 進む (XButton2) -> 戻る (XButton1)
XButton2::Send("{XButton1}")

; 戻る (XButton1) -> 進む (XButton2)
XButton1::Send("{XButton2}")
```