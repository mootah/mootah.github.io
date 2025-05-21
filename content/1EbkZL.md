---
created: 2025-05-21T12:58+09:00
modified: 2025-05-21T16:21+09:00
title: ZMKのHold-Tap
uid: 1EbkZL
---

# ZMKのHold-Tap

[Hold-Tap Behavior \| ZMK Firmware](https://zmk.dev/docs/keymaps/behaviors/hold-tap)

- Mod-Tap
- Layer-Tap

## Interrupt Flavors

![zmk.dev/assets/images/comparison-90bcec61f679e88a74490eb261d92940.svg](https://zmk.dev/assets/images/comparison-90bcec61f679e88a74490eb261d92940.svg)

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