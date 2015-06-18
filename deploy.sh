#!/bin/sh

echo -e "\e[0m[\e[31mGIT\e[0m] fetch\e[0m"
git fetch;

echo -e "\e[0m[\e[31mGIT\e[0m] push github\e[0m"
git push github;
git checkout master;

echo -e "\e[0m[\e[31mGIT\e[0m] merge\e[0m"
git merge dev -m "Merge branch 'dev'";

echo -e "\e[0m[\e[31m+\e[0m] Building and push \e[0m"
grunt serve:dist && git add dist && git ci -m 'Mise en prod' && git push origin;
git push github;

echo -e "\e[0m[\e[31mGIT\e[0m] pull in server\e[0m"
ssh angular@geoffrey.pro "cd ~/www; git pull";

echo -e "\e[0m[\e[31mGIT\e[0m] Switch dev branch\e[0m"
git checkout dev;
grunt ngconstant:development;
open 'http://angular.geoffrey.pro'
