---
created: 2025-05-21T16:38+09:00
modified: 2025-05-21T17:12+09:00
title: ZMK Studioに対応する
uid: 1EbobJ
---

# ZMK Studioに対応する

VIAやRemapの[[1E8FNl|ZMK]]版であるZMK Studioに対応したファームウェアを作る

## 準備

該当するキーボードの`zmk-config`のリポジトリをcloneしてくる

```zsh title="tree"
./
├── build.yaml
├── config/
│   ├── boards/
│   │   └── shields/
│   │       └── osprey-remix/
│   │           ├── Kconfig.defconfig
│   │           ├── Kconfig.shield
│   │           ├── osprey-remix.conf
│   │           ├── osprey-remix.dtsi
│   │           ├── osrpey-remix.overlay
│   │           └── osrpey-remix.zmk.yml
│   ├── info.json
│   ├── osprey-remix.conf
│   ├── osrpey-remix.keymap
│   └── west.yml
└── README.md
        
```

## ビルドにスニペットを使用する

ZMK Studio使用するUSB通信のエンドポイントを有効化する

```yaml title="build.yaml" {5}
---
include:
  - board: nice_nano_v2
    shield: osrpey-remix
    snippet: studio-rpc-usb-uart
    artifact-name: osprey-remix-zmk
```

## ZMK Studioを有効化する

configに次の設定を書く

```c title="config/osprey-remix.conf"
CONFIG_ZMK_STUDIO=y
CONFIG_ZMK_STUDIO_LOCKING=n
```

## Physical Layoutを定義する

[ドキュメント](https://zmk.dev/docs/development/hardware-integration/physical-layouts#optional-keys-property)を読むとQMK JSONから変換するように書いてあるが、変換ツールが上手く起動しなかった

[zmk/app/dts/layouts/common at main · zmkfirmware/zmk · GitHub](https://github.com/zmkfirmware/zmk/tree/main/app/dts/layouts/common)
からコピペして適当に修正して使った

```c title="config/boards/shields/osprey-remix/osprey-remix.dtsi"
#include <dt-bindings/zmk/matrix_transform.h>
#include <physical_layouts.dtsi>

/ {
    chosen {
        zmk,physical-layout = &osprey_physical_layout;
    };

    osprey_physical_layout: osprey_physical_layout {
        compatible = "zmk,physical-layout";
        display-name = "Osprey";
        transform = <&default_transform>;
        kscan = <&kscan0>;

        keys  //                     w   h    x    y     rot    rx    ry
            = <&key_physical_attrs 100 100    0    0       0     0     0>
            , ...
            ;
    };

    ...
};

```