---
aliases: null
created: 2025-05-07
modified: 2025-05-07T19:26
tags:
- ZMK
- 自キ
- キーボード
title: ZMKを読む（Keymap）
uid: 1E6OhK
---

# ZMKを読む（Keymap）

ZMKのキーマップは`<name>.keymap`という[[1E6Ncr|Devicetreeファイル]]で定義する

## 用語

### Stock

- boardやshieldに定義されたデフォルトのキーマップをstockという
- zmk-configをセットアップするとユーザコンフィグにコピーされる

### Behaviors

- 特定のキーやセンサ、コンボ等にバインドして、特定のイベントが発火したときに特定のアクションを実行するという動作をbehaviorという
- behaviorの一覧はここ
    - [Behavior Overview \| ZMK Firmware](https://zmk.dev/docs/keymaps/behaviors)

### Layers

- 想像の通りのレイヤ、スタックになっていて`0`がデフォルト
- デフォルトレイヤは常に有効化されている
- 特定のバインドによって他のレイヤを有効化/無効化する
- 有効なレイヤのうち、スタックの最も上のレイヤがアクティブになる
- アクティブなレイヤは発火したイベントをその位置のbehaviorに渡す
- behaviorはイベントを消費するか、下位の有効なレイヤに渡す

## Behaviorをバインドする

- behaviorキープレス(`&kp`)は1つのパラメータをとる
- `A`は生のHIDキーコードを持つ定数

```c title="example.keymap"
&kp A
```

- behaviorモッドタップ(`&mt`)は2つのパラメータ`hold`と`tap`をとる

```c title="example.keymap"
&mt LSHIFT D
```

## キーマップファイルを作る

### Includes

- キーマップファイルはたいてい2行インクルードしている

```c title="example.keymap"
#include <behaviors.dtsi>  
#include <dt-bindings/zmk/keys.h>
```

- 1行目は`&kp`などの全てのbehaviorを定義している
- 2行目は`A`などの全てのキーコード定数を定義している
- 他にも`#include <dt-bindings/zmk/bt.h>`をインクルードすればbluetooth関係の定数が使える

### Root Node

- 全てのノードはルートノード配下に記述する

```c title="example.keymap"
/ {
    // Everything else goes here!  
};
```

### Keymap Node

- keymapノードは`"zmk,keymap"`型を指定する
- `keymap`というノード名はなんでもいい

```c title="example.keymap"
/ {
    keymap {  
        compatible = "zmk,keymap";  
    };
};
```

### Layer Node

- layerノードはkeymap配下に定義する
- `layer_default`等のノード名はなんでもいい
- 定義順にナンバリングされる
- `display-name`はZMK Studioでの表示に使われる

```c title="example.keymap"
/ {
    keymap {  
        compatible = "zmk,keymap";  
        layer_default { // Layer 0  
            display-name = "Base";  
            // | Z    | M     | K      |  
            // | MO1  | Space | Return |  
            bindings = <  
                &kp Z &kp M     &kp K  
                &mo 1 &kp SPACE &kp RET
            >;  
        };
        layer_second { // Layer 1
            ...
        };
    };
};
```