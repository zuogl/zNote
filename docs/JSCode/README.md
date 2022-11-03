---
title: JScode代码集合
tags:
 - JSCode

author: 小左同学
date: '2022-11-03'
---

这个系列为左同学在日常学习和工作中用到的一些JS代码(包含网络搜集)，如有需要，请直接使用。

### 1. 获取几个数中的最大值
```js
function getMax(...args){
    let arr = new Array(...args).filter(i=>typeof i === 'number')
    return Math.max.apply(null,arr)
}
```
### 2. 获取数组中的最大值
```js
const getArrayMaxWithApply = (arr) => Math.max.apply(null, arr)
const getArrayMaxWithCall = (arr) => Math.max.call(null, ...arr)
const getArrayMaxWithMax = (arr) => Math.max(...arr)
const getArrayMaxWithSort = (arr) => arr.sort((a,b)=>b-a)[0]

console.log(getArrayMaxWithApply([100, 20, 30, -5])) // 100
console.log(getArrayMaxWithSort([100, 20, 30,undefined, -5])) // 100
```
需要注意的是当传入的数组中包含`undefined`或者`null`时，`getArrayMaxWithApply`、`getArrayMaxWithCall`、`getArrayMaxWithMax`会给出`NaN`,而getArrayMaxWithSort能拿到正确的值。