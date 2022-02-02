---
title: 初体验
author: 小左同学
date: '2022-02-02'
---

webpack是一个模块打包器，会将所有的代码资源`js css`等和非代码资源:图片、字体等都当作一个个的模块来进行打包；模块之间会存在一定的依赖关系，这个依赖关系会形成一颗依赖树。

webpack4.0 将webpack和webpack-cli是分离的，所以在项目中使用时，需要安装这两个

```js
npm i webpack webpack-cli --save-dev
```
webpack的默认配置文件是：`webpack.config.js` ，但是，我们可以根据 `webpack --config` 来指定配置文件。如下，在运行`npm run dev` 的时候，读取的就是`build`文件夹下的`webpack.dev.conf.js`这个配置文件。

```js
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  },
```

> 在安装依赖时，如果依赖需要创建一些命令的话，都会创建在`node_modules`下的`.bin`目录中，`package.json`默认可以读取这些命令。

