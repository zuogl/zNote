#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build


# 先提交本项目到仓库
git add -A
git commit -m '新增JSCode模块'
git push

cd ..

cp -Rf zNote/docs/.vuepress/dist/* zblog

cd zblog

git add .
git commit -m '新增JSCode模块'
git push


cd -
