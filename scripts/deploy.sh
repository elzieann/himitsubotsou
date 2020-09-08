#!/bin/bash
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/ mattie@host.lgbt:~/discord/himitsubotsou
ssh mattie@host.lgbt "cp himitsoubotsou.config.js ~/discord/himitsubotsou/config.json && cd discord/himitsubotsou && npm install && pm2 restart index.js"