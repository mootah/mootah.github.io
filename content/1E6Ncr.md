---
created: 2025-05-07
modified: 2025-05-07T19:31
title: Devicetreeファイル
uid: 1E6Ncr
---

# Devicetreeファイル

[[1E8FNl|ZMK]]においてハードウェア定義を記述するファイル
ビルド時に複数のファイルからノードツリーを構成する
キーマップ定義にも使われる

## 拡張子

用途によってファイル拡張子を区別するが、
どの拡張子にしても処理に影響はない

- `.dts`
    - ベースとなるハードウェア定義
- `.overlay`
    - `.dts`ファイル内の定義の上書き、追加を行うファイル
- `.keymap`
    - キーマップとユーザー固有のハードウェア設定を記述するファイル
- `.dtsi`
    - `#include`によって別ファイルから読み込むためのファイル

## 書き方

以下のように記述する

```c title="example.dts"
/ {
    // node
    chosen {
        // property  
        zmk,kscan = &kscan0;  
    };  

    // label: node_name
    kscan0: kscan {
        // property
        compatible = "zmk,kscan-gpio-matrix";  
    };  
};
```

各ノードに設定できるプロパティは[zmk/app/dts/bindings](https://github.com/zmkfirmware/zmk/tree/main/app/dts/bindings)以下のyamlファイルに定義されている

必要なプロパティを探す場合、board内の`.dts`、shield内の`.overlay`、includeされている`.dtsi`を見に行けば、たいてい見つかる

`compatible`プロパティはそのnodeの型を示す
ある型のnodeがどんなプロパティをサポートするかはドキュメントを検索すればわかる

- ["mk,kscan-gpio-matrix"の例](https://zmk.dev/docs/config/kscan#devicetree-3)

定義済みのnodeに変更を加える場合、次のように書く

```c title="example.keymap"
// &labelでnodeにアクセス
&kscan0 {
    // debounceしない
    debounce-press-ms = <0>;  
};
```

もし、定義にラベルが付与されていない場合は再定義することで上書きできる

```c title="example.keymap"
/ {  
    kscan {  
        debounce-press-ms = <0>;  
    };  
};
```

## 型

- bool
    - `property;`とすればtrueになる
    - 既にtrueにされているプロパティをfalseにする場合
        - `/delete-property/ property;`
- int
    - `property = <42>;`
- string
    - `property = "foo";`
- array
    - `property = <1 2 3 4>;`
- phandle
    - 単一のnodeの参照
    - `property = <&label>`
- phandles
    - phandleの配列
    - `property = <&label1 &label2 &label3>`
- phandle array
    - phandleとparameterからなるgroupの配列
    - `property = <&foo 1 2>, <&bar 3>, <&baz 4 5>;` 
- path
    - nodeへのパス、参照か文字列で与える
    - `property = &label`
    - `property = "/path/to/node"`