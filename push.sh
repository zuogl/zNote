#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build


# 先提交本项目到仓库
git add -A
git commit -m 'deploy'
git push

cd ..

cp -Rf zwrite/docs/.vuepress/dist/* zblog

git add .
git commit -m '提交'
git push


cd -
