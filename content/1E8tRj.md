---
aliases: null
created: 2025-05-12
modified: 2025-05-12T21:53+09:00
tags:
- 言語学習
title: 字幕から頻度順の単語リストを得る
uid: 1E8tRj
---

# 字幕から頻度順の単語リストを作る

## 字幕の取得

[[1E8tUI|yt-dlpで字幕をダウンロードする]]

## 字幕ファイルをtxtファイルにする

[glasslion/vtt2text.py - GitHub Gist](https://gist.github.com/glasslion/b2fcad16bc8a9630dbd7a945ab5ebf5e)

## txtファイルから単語リストを作る

言語によって辞書ライブラリが充実していなかったりするが
[adbar/simplemma - GitHub](https://github.com/adbar/simplemma)をベースに調整すれば良さそう
英語なら簡単

### 仕様

こんな感じで使って、

```zsh title="zsh"
./tokenize subs.txt -o out.csv --lang en
```

`見出し語, 原形, 言語, 出現数`という形のcsvを出力する

### 実装

```python title="tokenize"
#!/usr/bin/env python3
import re, csv, collections, argparse
from simplemma import is_known, lemmatize

def read(ifile):
    data = ""
    try:
        with open(ifile) as f:
            data = f.read()
        return data
    except Exception as e:
        print(f"Error on reading {ifile}: {e}")
        exit(1)

def write(data, ofile):
    try:
        with open(ofile, "w") as f:
            writer = csv.writer(f)
            writer.writerows(data)
    except Exception as e:
        print(f"Error on writing {ofile}: {e}")
        exit(1)

def tokenize(text):
    text = text.lower()
    text = re.sub("[^a-zA-Z-]", " ", text)
    tokens = [t.strip() for t in text.split() if t.strip()]
    print(f"{len(tokens):,} tokens (total)")
    return tokens

def count(tokens): 
    c = collections.Counter(tokens)
    counts = c.most_common()
    print(f"{len(counts):,} tokens (unique)")
    return counts

def lookup(token, lang):
    root = lemmatize(token, lang=lang)

    if is_known(token, lang=lang):
        return [token, root, lang]

    return [token, root, ""]

def main(ifile, ofile, lang):
    text = read(ifile)
    tokens = tokenize(text)
    counts = count(tokens)
    data = [lookup(t, lang) + [c] for t, c in counts]
    write(data, ofile)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Make frequent list from text")
    parser.add_argument(
        "input", 
        help="input text file")
    parser.add_argument(
        "-o", default="",
        help="output filename (default: *.out.csv)")
    parser.add_argument(
        "--lang", default="en",
        help="language (default: en)")

    args = parser.parse_args()
    ifile = args.input
    ofile = ifile + ".out.csv"
    if args.o:
        ofile = args.o
    lang = args.lang

    main(ifile, ofile, lang)
```