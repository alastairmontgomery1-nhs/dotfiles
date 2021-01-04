PATH=$PATH:/Users/amontgomery/cx/dev_tools/scripts:~/gitrp/connect:~/gitrp/pcscripts:$HOME/.jenv/bin:$HOME/.tfenv/bin
eval "$(jenv init -)"
eval "$(rbenv init -)"
source /Users/amontgomery/gitrp/pcscripts/mac_bashrc

#OktaAWSCLI
if [ -f "/Users/amontgomery/.okta/bash_functions" ]; then
    . "/Users/amontgomery/.okta/bash_functions"
fi


export PATH="$HOME/.cargo/bin:$PATH"
