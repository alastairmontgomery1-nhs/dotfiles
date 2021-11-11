export ZSH=~/.oh-my-zsh
ZSH_THEME="agnoster"
plugins=(git zsh-autosuggestions)
source $ZSH/oh-my-zsh.sh
source ~/gitrp/pcscripts/alias.sh
source ~/gitrp/pcscripts/dwp_zsh.sh
source ~/gitrp/pcscripts/func_bash.sh
export VAULT_SKIP_VERIFY=true
PATH=~/bin:$PATH:~/gitrp/code/python/automate_python:~/gitrp/pcscripts
eval "$(starship init zsh)"
if [ -d "$HOME/.bookmarks" ]; then
    export CDPATH=".:$HOME/.bookmarks:/"
    alias goto="cd -P"
fi
