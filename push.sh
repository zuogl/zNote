#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build


# 先提交本项目到仓库
git add -A
git commit -m '自动生成sidbar添加文章tag和作者以及时间'
git push

cd ..

cp -Rf zNote/docs/.vuepress/dist/* zblog

cd zblog

git add .
git commit -m '自动生成sidbar添加文章tag和作者以及时间'
git push


cd -
