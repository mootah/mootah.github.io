---
created: 2025-07-09T03:28+09:00
modified: 2025-07-09T04:07+09:00
title: LLMが上手くいく理由
uid: 1Ermdx
---

# LLMが上手くいく理由

LLMの訓練過程で行われる損失関数の最小化が、実質的にこのソロモノフ事前分布を近似していることが数学的に証明された
また、次トークン予測が、ソロモノフ帰納の計算可能な近似になっていることも示された

## ソロモノフ事前分布

コルモゴロフ複雑性が低いデータほど高い確率を割り当てる確率分布
「シンプルな説明ほど確からしい」というオッカムの剃刀のアイディアを形式化したもの

## ソロモノフ帰納

最短の予測器が任意の計算可能な予測器より良い性能であることを帰納的に保証している

## コルモゴロフ複雑性

有限長のプログラムの複雑さを表す指標
ある出力に対する最小のプログラム長で定義される

## 参照

- [2505.15784 Large Language Models as Computable Approximations to Solomonoff Induction](https://arxiv.org/abs/2505.15784)
- [60年前の数学理論がLLMの謎を解明した話｜しまだ@AI×マーケ/デザイン](https://note.com/shimada_g/n/n67323d499694)
- [ソロモノフ帰納が示すLLMの源泉とマルチエージェント化の意味｜kz@sewasees.com](https://note.com/sewasees/n/nfbc7a0a9dec4)
- [アルゴリズム的確率 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0%E7%9A%84%E7%A2%BA%E7%8E%87)
- [コルモゴロフ複雑性 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%AB%E3%83%A2%E3%82%B4%E3%83%AD%E3%83%95%E8%A4%87%E9%9B%91%E6%80%A7)