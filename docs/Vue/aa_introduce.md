---
title: 第一章 权衡的艺术
tags:
 - Vue3

author: 小左同学
date: '2022-11-01'
---

### 0. 两个问题
1. 什么是`声明式`和`命令式`，各有什么优缺点？
2. `运行时`和`编译时`是什么意思，各有什么优缺点？
### 1. 命令式和声明式
#### 1.1 命令式
jQuery 就是典型的命令式框架，命令式最大的特点就是**关注过程**。
假如我们需要获取id为app的div，并将其文本内容设置为`hello world`,在点击时弹出`Ok`,JQ和原生JS的操作分别如下：
```js
# JQ
$('#app') //  获取div
    .text('hello world') // 设置文本内容
    .on('click',()=>{alert('Ok')}) //  绑定点击事件
```
```js
# 原生JS
const div = document.querySelector('#app')
div.innerText = 'hello world'
div.addEventListener('click',()=>{alert('Ok')})
```
通过以上的代码我们看到，命令式的框架和原生JS很像，他们的代码和我们需要做的事情是能够一一对应的，代码本身就是描述的`做事情的过程`
#### 1.2 声明式
声明式的框架更加**关注结果**,同样的要实现上述功能，用vue来实现，代码如下:
```js
<div @click="()=>{alert('Ok')}">hello world</div>
```
声明式框架的内部也是用的命令式来操作dom的，但是暴露给用户的更加贴近`声明式`
   