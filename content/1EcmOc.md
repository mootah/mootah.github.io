---
created: 2025-05-24T15:51+09:00
modified: 2025-05-24T16:01+09:00
title: IME切り替えをComboにした
uid: 1EcmOc
---

# IME切り替えをComboにした

QWERTYでいうと`df`に`IME_OFF`、`jk`に`IME_ON`を配置した
切り替えが快適なって、元々当ててたレイヤにも空きができていい感じ

## 実装

```c title="keymap"
combos {
    compatible = "zmk,combos";

    ime_off {
        bindings = <&kp LANG2>;
        key-positions = <15 16>;
    };

    ime_on {
        bindings = <&kp LANG1>;
        key-positions = <19 20>;
    };
};
```

[[1E8FNl|ZMK]]