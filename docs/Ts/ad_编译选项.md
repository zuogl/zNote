---
title: TS编译选项
tags:
 - TS

author: 小左同学
date: '2022-05-07'
---



<!-- 监视对应的文件并自动编译 -->
tsc xxx.ts -W


tsconfig.json文件是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译


再使用ts模块化时，打包需要注意配置resolve.extensions,否则会报错。
