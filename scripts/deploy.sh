#!/bin/bash
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/ mattie@host.lgbt:~/discord/himitsubotsou
ssh mattie@host.lgbt "cp ~/himitsubotsou.config.json ~/discord/himitsubotsou/config.js && cd ~/discord/himitsubotsou && sed -i '\$s/}/,\n\"VERSION\":\"$TRAVIS_BRANCH\"}/' config.js && npm install && pm2 restart index.js"