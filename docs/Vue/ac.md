---
title: 第三章 Vue.js的设计思路
tags:
  - Vue3

author: 小左同学
date: '2022-11-09'
---

### 1. 声明式地描述UI
我们都知道在写前端页面的时候，通常会涉及以下内容：
  - DOM元素：例如写的是div标签还是a标签
  - 属性：比如a标签的href属性，id、class等通用属性
  - 事件：比如click、keydown等
  - 元素的层级结构：Dom树的层级结构，既有子节点，又有父节点等


Vue.js在描述前端的页面时，基本与上述的一致，并且新增了许多模版语法：
  - 使用:或者v-bind来描述动态绑定的属性,eg：`<div :id="testId"></div>`
  - 使用@或者v-on来描述事件，eg:`<div @click="handleClick"></div>`
  - ......

正是有了这些模版语法，让我们不用去写命令的代码（比如原生的绑定事件），这就是所谓的**声明式描述UI**。

除了使用这种模版来声明式的描述UI外，我们还可以用JS对象来描述，比如：
```js
const title = {
  tag:'h1',
  props:{
    onClick:handler
  },
  children:[
    {
      tag:'span'
    }
  ]
}
```
其实，上边的代码对应到Vue.js模版就是`<div @click="handler"><span></span></div>`
虽然，这种用JS来描述UI的方式对程序员来不够友好，但是它是很灵活的。比如有这样一个需求：我们要表示一个标题，根据标题级别的不同，我们会分别采用h1~h6这几个标签，用JS的代码的方式可以如下：
```js
let level = 3
const title = {
  tag:`h${level}` // h3标签
}
```
但是如果用模版语法来写的话，我们就得穷举了。
```js
<h1 v-if="level === 1"></h1>
<h1 v-else-if="level === 2"></h1>
<h1 v-else-if="level === 3"></h1>
<h1 v-else-if="level === 4"></h1>
<h1 v-else-if="level === 5"></h1>
<h1 v-else-if="level === 6"></h1>
```
这种通过JS对象来描述UI的方式，就是所谓的**虚拟Dom**

在Vue.js中，组件中手写的渲染函数就是使用虚拟Dom来描述UI的，代码如下;
```js
import {h} from 'vue'
export default {
  render(){
    return h('h1',{onClick:hanler}) // h函数返回的就是一个虚拟Dom
  }
}
```
**渲染函数h是一个辅助创建虚拟Dom的工具函数**
### 2. 初识渲染器
什么是渲染器？ 渲染器就是将虚拟DOM变为真实DOM的一个函数对象。
![](./img/render1.png)

下边我们来写一个简单的渲染器
首先我们先定义一个虚拟DOM
```js
let vnode = {
    tag:'div',
    props:{
        onClick:()=>{alert('hello')}
    },
    children:'click me'
}
```
接下来编写一个渲染器：
```js

```
