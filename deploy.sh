#!/usr/bin/env bash

git status;
echo '~~~ Compilation ~~~';
grunt serve:dist;
git add dist && git ci -m 'Mise en prod';
git push origin;
git push github;

echo '~~~ Deployment angular.geoffrey.pro ~~~';
ssh angular@geoffrey.pro "cd ~/www; git pull";

echo '~~~ Deployment m.rad.co ~~~';
ssh raaad@ns66.hiwit.net "cd ~/web/mobile; git pull";

echo '~~~ Developement constants ~~~';
grunt ngconstant:development;

echo '~~~ Slack notification ~~~';
curl -X POST --data-urlencode 'payload={"channel": "#angular-app", "username": "Script de deploiement", "text": "<@channel>: Une mise à jour est disponible sur http://angular.geoffrey.pro"}' https://hooks.slack.com/services/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
curl -X POST --data-urlencode 'payload={"channel": "#angular-app", "username": "Script de deploiement", "text": "<@channel>: Une mise à jour est disponible sur http://m.rad.co"}' https://hooks.slack.com/services/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
