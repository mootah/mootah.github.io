---
aliases: []
created: 2025-05-01
modified: 2025-05-01
title: Zshのセットアップ
uid: 1E4Aca
---

# Zshのセットアップ

[[1E8FZz|環境構築]]

Ubuntuに[[Zsh]]いれる

```bash title="bash"
$ lsb_release -a
# No LSB modules are available.
# Distributor ID: Ubuntu
# Description:    Ubuntu 22.04.5 LTS
# Release:        22.04
# Codename:       jammy
```

## インストール

```bash title="bash"
sudo apt update
sudo apt install zsh
```

シェルを変更して起動

```bash title="bash"
chsh -s /bin/zsh
exec $SHELL -l
```

## 設定ファイルを作成

```zsh title="zsh"
vim ~/.zshrc
```

```zsh title="~/.zshrc"
export LANG=ja_JP.UTF-8

typeset -U path PATH
path+=$HOME/.local/bin

typeset -U fpath FPATH
fpath+=$HOME/.zsh_completion

autoload -Uz compinit
compinit -u

setopt AUTO_CD
setopt CORRECT
setopt CORRECT_ALL
setopt EXTENDED_HISTORY
setopt INC_APPEND_HISTORY
setopt SHARE_HISTORY
setopt HIST_EXPIRE_DUPS_FIRST
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_ALL_DUPS

export HISTFILE=~/.zsh_history
export HISTSIZE=100000
export SAVEHIST=$HISTSIZE
```

## Zinitをインストール

つよつよパッケージマネージャ

> Zinit is a flexible and fast Zshell plugin manager that will allow you to install everything from GitHub and other sites.

```zsh title="zsh"
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
zinit self-update
```

## プラグイン(各種コマンド)のインストール

```zsh title="~/.zshrc"
# theme
zinit depth=1 light-mode for romkatv/powerlevel10k

# fast syntax highlighting
zinit wait lucid light-mode for zdharma-continuum/fast-syntax-highlighting

# auto suggestion
zinit wait lucid light-mode for zsh-users/zsh-autosuggestions

# auto completion
zstyle ':completion:*' menu true
zstyle ':completion:*' matcher 'm:{a-z}={A-Z}'
zinit wait lucid light-mode for zsh-users/zsh-completions

# fuzzy finder for auto completion
zinit wait lucid light-mode for Aloxaf/fzf-tab

# fuzzy finder
zinit wait lucid from"gh-r" sbin"fzf" light-mode for @junegunn/fzf
compdef _gnu_generic fzf

# ls alternative
zinit wait lucid for \
  from"gh-r" sbin"eza" light-mode @eza-community/eza \
  as"completion" "https://github.com/eza-community/eza/blob/HEAD/completions/zsh/_eza"

alias ls="eza --classify=always"
alias ll="eza -l --classify=always"
alias la="eza -la --classify=always"
alias tree="eza -T --classify=always"

# cat alternative
zinit wait lucid from"gh-r" sbin"bat*/bat" \
  mv"bat*/autocomplete/bat.zsh -> _bat" \
  light-mode for @sharkdp/bat

export BAT_THEME="Visual Studio Dark+"
export PAGER=bat
alias cat=bat

# grep alternative
zinit wait lucid from"gh-r" sbin"ripgrep*/rg" \
  light-mode for @BurntSushi/ripgrep

# find alternative
zinit wait lucid from"gh-r" sbin"fd*/fd" \
  light-mode for @sharkdp/fd

# nvim
zinit wait lucid from"gh-r" ver"v0.11.1" \
  bpick"nvim-linux-x86_64.tar.gz" sbin"**/nvim" \
  light-mode for @neovim/neovim

alias vi=nvim
alias vim=nvim
export EDITOR=nvim
export VISUAL=nvim

```

## その他のエイリアス

```zsh title="~/.zshrc"
# rc
alias vrc="vi ~/.config/nvim/init.lua"
alias rc="vi ~/.zshrc && source ~/.zshrc"

# windows exe
alias clip="clip.exe"
alias open="explorer.exe"
```