@echo off
git config --global user.name WhiteSpringLife
git config --global user.email WhiteSpringLife@gmail.com
git add .
git commit -m %1
git push