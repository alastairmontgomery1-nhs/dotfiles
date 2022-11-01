# If you come from bash you might have to change your $PATH.
# Fig pre block. Keep at the top of this file.
[[ -f "$HOME/.fig/shell/zshrc.pre.zsh" ]] && builtin source "$HOME/.fig/shell/zshrc.pre.zsh"

. /usr/local/opt/asdf/libexec/asdf.sh
source $HOME/gitrp/pcscripts/alias.sh
source $HOME/gitrp/pcscripts/func_bash.sh

# Fig post block. Keep at the bottom of this file.
[[ -f "$HOME/.fig/shell/zshrc.post.zsh" ]] && builtin source "$HOME/.fig/shell/zshrc.post.zsh"

