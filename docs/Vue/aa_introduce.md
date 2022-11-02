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
声明式框架的内部也是用的命令式来操作dom的，但是暴露给用户的更加贴近`声明式`。Vue是声明式框架

### 2. 性能与可维护性
如果我们需要将以上的`hello world`修改为`hello world3`, 命令式框架需要程序员直接修改`div.textContent = 'hello world3'`；声明式框架只需要在`hello world`后边加一个`3`就好。 但是声明式框架为了实现最优的性能，需要找出更改前后有差异的地方并且只更新有变化的地方。如果直接修改的性能为A，找出差异的性能消耗为B，那么声明式框架的性能永远比命令式的框架，多消耗了一个B。**声明式框架的性能不可能超过命令式框架,但是在可维护性上，声明式框架更好维护！**

### 3. 运行时和编译时
#### 3.1 运行时框架
自己的理解：运行时框架需要用户提供相对应的数据结构，`在渲染时直接生成命令式代码`。
比如某个运行时框架需要的数据结构为：每个对象都有两个属性，`tag`表示标签名称，`children`既可以是一个数组（代表子节点），也可以是一段文本（文本子节点）
```js
const obj = {
    tag:"div",
    children:[
        tag:"span",
        children:"hello world"
    ]
}
```
该框架提供的渲染函数为`Render`
```js
function Render(obj,root){
    const el = document.createElement(obj.tag)
    if(typeof obj.children ==='string'){
        const text = document.createTextNode(obj.children)
        el.appendChild(text)
    }else if(obj.children){
        obj.children.forEach((child)=>{Render(child,el)}) // 递归调用
    }
    root.appendChild(el) // 将元素添加到root
}
```
用户在使用时，将自己写好的树形结构和挂载点传递给Render函数。`Render(obj,document.body)`
#### 3.2 编译 + 运行时
自己的理解：在项目构建时将`Html`结构通过`编译器`转换为树形结构，再交给`Render`函数进行处理渲染。
```js
<div>
    <span>hello world</span>      
</div>
    执行编译
const obj = {
tag:"div",
children:[
    tag:"span",
    children:"hello world"
    ]
}

Render(obj,document.body)
```
Vue是编译 + 运行时框架
#### 3.3 编译时
自己的理解：编译时就是项目在构建时将`Html`结构通过`编译器`直接转换为命令式代码。
```js
<div>
    <span>hello world</span>      
</div>
    执行编译
const div = document.createElement('div')
cosnt span = document.createElement('span')
span.innerText = 'hello world'
div.appendChild(span)
document.body.appendChild(div)
```
