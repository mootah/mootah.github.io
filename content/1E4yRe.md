---
aliases: []
created: 2025-05-01
modified: 2025-05-01
title: Neovimのセットアップ
uid: 1E4yRe
---

# Neovimのセットアップ

[[1E8FZz|環境構築]]

## Neovimのインストール

Windowsの[[1E8FUR|WSL]](Ubuntu 22.04.5 LTS)上にインストールする
aptの[[1E8Gii|Neovim]]は古いので最新版を[github](https://github.com/neovim/neovim/releases)から拾ってくる

zinitに管理させてるので詳細は[[1E4Aca|Zshのセットアップ]]を参照

```zsh title="zsh"
# 確認
nvim -v
```

## Lazyの導入

packerなき今、最有力のplugin manager

[🛠️ Installation \| lazy.nvim](https://lazy.folke.io/installation)

ここの通りやればおｋ

## テーマ設定

好きなの入れたらええ

```lua title="init.lua"
require("lazy").setup({
    { -- カラースキーム
        "EdenEast/nightfox.nvim",
        config = function()
            vim.cmd("colorscheme carbonfox")
            -- カーソル行に下線
            vim.api.nvim_set_hl(
                0, 'CursorLine', { underline = true })
        end
    },
    { -- ステータスバーをいい感じに
        "nvim-lualine/lualine.nvim",
        dependencies = { 'nvim-tree/nvim-web-devicons' },
        config = function()
            require("lualine").setup{
                options = { theme = "auto" }
            }
        end
    },
    
    ︙
    
})
```

## その他のプラグイン

```lua title="init.lua"
require("lazy").setup({

    ︙

    { -- インサートモードを抜けるとIMEを切ってくれる
        "pepo-le/win-ime-con.nvim"
    },
    { -- 閉じ括弧
        "windwp/nvim-autopairs",
        event = "InsertEnter",
        config = true
    },
    { -- 囲い込み
        "kylechui/nvim-surround",
        version = "^3.0.0",
        event = "VeryLazy",
        config = function()
            require("nvim-surround").setup({})
        end
    }
    { -- コメントアウト
        "numToStr/Comment.nvim",
        config = function()
            require('Comment').setup({
                toggler = {
                    line = '<c-t>',
                },
                opleader = {
                    line = '<c-t>',
                },
            })
        end
    },
})
```

## オプション

```lua title="init.lua"
vim.opt.encoding = "utf-8"
vim.opt.fileencoding = "utf-8"
vim.opt.fileencodings = "utf-8,iso-2022-jp,euc-jp,cp932"
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.smartindent = true
vim.opt.autoindent = true
vim.opt.expandtab = true
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.number = true
vim.opt.numberwidth = 4
vim.opt.cursorline = true
vim.opt.wrap = true
vim.opt.incsearch = true
vim.opt.foldmethod = "marker"
vim.opt.backup = false
vim.opt.writebackup = false
vim.opt.swapfile = false
vim.opt.clipboard = "unnamedplus"
vim.opt.mouse = "a"
```

## 余談

[[1E5mVA|大西配列]]にしてからしばらくキーバインドを変えたりしたけど、結果的に特殊なことはしなくなった
`hjkl`は矢印キーのレイヤー作ったら要らなくなったし、他のキーは覚え直した
唯一、`ciw`は左中薬薬で圧倒的に打ちにくい