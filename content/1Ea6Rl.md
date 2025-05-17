---
created: 2025-05-17T20:04+09:00
modified: 2025-05-17T21:08+09:00
title: 二分探索
uid: 1Ea6Rl
---

# 二分探索

ソート済みの配列から特定の値を $O(\log{n})$ で探索する

## `lower_bound()` の気持ち

- `a[key] >= target` という条件を満たす最小の `key` を見つけたい

## 一般化した二分探索法
 
- 以下の場合に、条件を満たす最小の `x` を見つけたい
    - 左端は条件を満たさない
    - 右端は条件を満たす
    - 左右端の間に条件を満たすようになる境界がある（単調性）

## 実装

- `left` は「常に」条件を満たさない
- `right` は「常に」条件を満たす
- `right - left = 1` になるまで範囲を狭める 
    - 最終的に `right` が条件を満たす最小となる

```cpp title="binary_search.cpp"
while (right - left > 1) {
    ll mid = (left + right) / 2;

    if (check(mid, target)) {
        right = mid;
    } else {
        left = mid;
    }
}
```

## めぐる式二分探索

- 最小を求めたいときと最大を求めたいときがある
- 条件を満たす側を`ok`、満たさない側を`ng`として実装する
- `abs(ok - ng) = 1`となるまで範囲を狭める
    - 最終的に`ok`が条件を満たす境界となる

```cpp title="binary_search.cpp"
while (abs(ok - ng) > 1) {
    ll mid = (ok + ng) / 2;

    if (check(mid, target)) {
        ok = mid;
    } else {
        ng = mid;
    }
}
```

## 参考

- https://qiita.com/oyutaka_jp/items/e8f836903f87a5f3bead
- https://qiita.com/drken/items/97e37dd6143e33a64c8c

## 問題

- https://atcoder.jp/contests/typical-algorithm/tasks/typical_algorithm_a