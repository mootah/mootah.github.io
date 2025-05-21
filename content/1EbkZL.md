---
created: 2025-05-21T12:58+09:00
modified: 2025-05-21T17:38+09:00
title: ZMKのHold-Tap
uid: 1EbkZL
---

# ZMKのHold-Tap

[Hold-Tap Behavior \| ZMK Firmware](https://zmk.dev/docs/keymaps/behaviors/hold-tap)

- Mod-Tap
- Layer-Tap

## Interrupt Flavors

![Gyazo](https://i.gyazo.com/6fb6674964ff3622be8f264adb386cf6.png)


- Hold-preferred
    - `mod-tap`のデフォルト
    - `tapping-term-ms`が経過するか、他のキーが押されると`hold`として振る舞う
    - QMKの`HOLD_ON_OTHER_KEY_PRESS`に相当
- Balanced
    - `tapping-term-ms`が経過するか、押下中に他のキーが`press`され`release`されると`hold`として振る舞う
    - QMKの`PERMISSIVE_HOLD`に相当
- Tap-Preferred
    - `layer-tap`のデフォルト
    - `tapping-term-ms`が経過した場合のみ`hold`として振る舞う
    - QMKのデフォルトに相当
- Tap-Unless-Interrupted
    - `tapping-term-ms`が経過する前に他のキーが押された場合のみ`hold`として振る舞う

[[1E8FNl|ZMK]]