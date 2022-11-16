---
title: 第四章 响应系统的作用与实现
tags:
  - Vue3

author: 小左同学
date: '2022-11-16'
---

### 1. 响应式数据与副作用函数

副作用函数指的是会产生副作用的函数，如下边的代码：

```js
function effect () {
  document.body.innerText = 'hello Vue3'
}
```

当 effect 函数执行时，他会设置 body 的文本内容，但是除了 effect 函数外的任何函数都有可能读取或者设置 body 的文本内容。也就是说，effect 函数的执行会直接或间接影响其他函数的执行，这时我们说 effect 函数产生了副作用。副作用很容易产生。例如下边的代码，当一个函数修改了全局变量的时候，也发生了副作用。

```js
let val = 1 // 全局变量
function effect () {
  val = 3 // 修改全局变量，产生副作用
}
```

我们再来看一下什么是响应式数据，假设我现在有一个对象和一个副作用函数，这个副作用函数用到了对象中的某个属性。假设当对象中的属性发生变化时，副作用函数能够自动执行，那么该对象就是一个响应式数据。

```js
const obj = { text: 'hello vue3' }
function effect () {
  document.body.innerText = obj.text
}
obj.text = 'hello world' // 修改obj.text的值，希望副作用函数自动重新执行
```

显然这个对象仅仅是一个普通数据，不是一个响应式的数据，我们下一节会讨论如何实现一个简单的响应式数据

### 2. 响应式数据的基本实现
