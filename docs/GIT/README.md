---
title: git常用命令
---

## 1. 当远程分支存在，本地分支不存在，可以使用下边的命令来快速的关联跟踪远程分支
```js
git checkout --track origin/远程分支名
```
比如以下案例，本地分支只有3个，远程分支有5个。
```js
$ git branch -a
  hzfh
* hzfh_v2
  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/hzfh
  remotes/origin/hzfh_v2
  remotes/origin/master
  remotes/origin/origin/waihuv2
```
我们现在想在本地新建一个本地分支，并和远程分支`remotes/origin/origin/waihuv2`建立关联；可以使用如下命令：
```js
 git checkout --track origin/origin/waihuv2
```
然后就可以看到，本地已经多了一个分支，并且成功和远程分支`remotes/origin/origin/waihuv2`建立了关联。
```js
$ git branch -a
  hzfh
  hzfh_v2
  master
* origin/waihuv2
  remotes/origin/HEAD -> origin/master
  remotes/origin/hzfh
  remotes/origin/hzfh_v2
  remotes/origin/master
  remotes/origin/origin/waihuv2
```