#!/bin/bash
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/ mattie@host.lgbt:~/discord/himitsubotsou
ssh mattie@host.lgbt "cp ~/himitsubotsou.config.json ~/discord/himitsubotsou/config.json && sed -i '\$s/}/,\n\"version\":\"$TRAVIS_BRANCH\"}/' config.json && cd discord/himitsubotsou && npm install && pm2 restart index.js"