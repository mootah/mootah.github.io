---
aliases: null
created: 2025-05-04
modified: 2025-05-04T21:10
tags:
- Quartz
- Obsidian
title: QuartzでのみUIDを使う
uid: 1E5Iwb
---

# QuartzでのみUIDを使う

## 問題点

[[1E5q66|Obsidianでファイル名をUIDにする]]とwikiリンクの恩恵を受けにくくなる

具体的には、

```md title="01.md"
# hoge
[[fuga]]
```

というファイルがあって

```md title="02.md"
# fuga
```

というファイルをあとから作ったときに

```md title="01.md"
# hoge
[[02|fuga]]
```

と、自動的に更新してくれない

## 解決策

そこで、Obsidian内ではあくまでH1をファイル名として扱い、
Quartz側の実行スクリプトでUIDに置換する、ということをやる

まず、frontmatterを以下のようにする

```yaml title="frontmatter"
uid: "<Templaterで生成>"
title: "<File Title Updaterで更新>"
aliases: []
tags: []
created: "<Templaterで生成>"
modified: "<Update Time on Editで更新>"
```

次に、Quartzプロジェクトを以下のようにする

```zsh title="tree"
./
├── content/
├── obsidian -> symlink or submodule
├── scripts/
...
```

obsidianはvaultのことで、シンボリックリンクかサブモジュールにする
content内は空にしておき、obsidianから前処理したページを移動してくる

前処理するスクリプトを書く
- 全てのファイルのfrontmatterからuidをとってきてリネームする
- 全てのファイルのwikiリンクをuidで更新する
    - `[[title]]`      -> `[[uid|title]]`
    - `[[title|alias]]` -> `[[uid|alias]]`


```python title="scripts/preprocess"
#!/usr/bin/env python3
import os, re, shutil, datetime, traceback
from pathlib import Path
import frontmatter

def read(ifile):
  try:
    with open(ifile, "r", encoding="utf-8") as f:
      return frontmatter.load(f)
  except Exception as e:
    print(f"Error on reading {ifile}: {e}")
    traceback.print_exc()
    exit(1)

def write(post, ofile):
  try:
    with open(ofile, "w", encoding="utf-8") as f:
      f.write(frontmatter.dumps(post))
  except Exception as e:
    print(f"Error on writing {ofile}: {e}")
    traceback.print_exc()
    exit(1)

def rename_with_uid(idir, odir):
  mdfiles = list(Path(idir).rglob("*.md"))
  
  uids = {}
  for md in mdfiles:
    post = read(md)
    uid = post.metadata.get("uid")
    if md.stem == "Home":
      uids[md.stem] = "index"
    elif uid:
      uids[md.stem] = uid
    else:
      uids[md.stem] = md.stem

  for md in mdfiles:
    post = read(md)
    content = post.content
    outpath = odir / f"{uids[md.stem]}.md"

    # Update wiki links
    for title, uid in uids.items():
      # title -> uid|title
      pattern1 = re.compile(
        r"\[\[\s*"
        + re.escape(title)
        + r"\s*\]\]")
      content = pattern1.sub(
        f"[[{uid}|{title}]]", content)
      
      # title|alias -> uid|alias
      pattern2 = re.compile(
        r"\[\[\s*"
        + re.escape(title)
        + r"\s*\|\s*([^\]]+)\s*\]\]")
      content = pattern2.sub(
        f"[[{uid}|\\1]]", content)
      
      post.content = content
      write(post, outpath)

tmpdir = ""

def make_backup(odir):
  print("Creating backup...")
  global tmpdir
  now = int(datetime.datetime.now().timestamp())
  tmpdir = Path(f"/tmp/quartz_backup_{now}")
  os.makedirs(tmpdir, exist_ok=True)
  for p in odir.glob("*"):
    shutil.move(p, tmpdir)

def clear_backup():
  print("Clearing backup...")
  shutil.rmtree(tmpdir)

def rollback(odir):
  print("Rollback processing...")
  shutil.rmtree(odir)
  os.makedirs(odir, exist_ok=True)
  for p in tmpdir.glob("*"):
    shutil.move(p, odir)

if __name__ == "__main__":
  pdir = Path(__file__).parent.parent
  # input directory
  idir = pdir / "obsidian" / "box"
  # output directory
  odir = pdir / "content"
  
  make_backup(odir)
  try:
    rename_with_uid(idir, odir)
    print("Processing complete!")
    clear_backup()
  except:
    rollback(odir)
    traceback.print_exc()
```

実行権限を与える

```zsh title="zsh"
chmod +x scripts/preprocess
```

ビルド前に叩けばOK

```zsh title="zsh"
scripts/preprocess && bun quartz build --serve
```