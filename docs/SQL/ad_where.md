---
title: where
tags:
  - SQL
  - where

author: 小左同学
date: '2022-03-02'
---

### 1. where

1. 功能

   where 可以帮助我们有条件的查询数据表。
2. 语法

   ```sql
   select 列名称1 from 表名称 where 列名称2 运算符 值
   ```
   在这个语法中，列名称 1 和列名称 2 可以一致也可以不一致。常见的运算符及其含义见`常见运算符表`

3. 例子

    例如我们需要查询订单数大于3000的公司,其语句和结果如下
    ```sql
    select company from Orders where orderNumber > 3000
    ```
   | company |
   | :------ |
   | tengxun |
   | tengxun |
   | ali     |
   | baidu   |


### 2. 常见运算符表

| 操作符  | 描述         |
| :------ | :----------- |
| =       | 等于         |
| <>      | 不等于       |
| >       | 大于         |
| <       | 小于         |
| >=      | 大于等于     |
| <=      | 小于等于     |
| BETWEEN | 在某个范围内 |
| LIKE    | 搜索某种模式 |

> 在某些版本的 SQL 中，操作符 `<>` 可以写为 `!=`。


### 本文所用的数据表如下

Orders 表

| company | orderNumber |
| :------ | :---------- |
| baidu   | 1000        |
| ali     | 2335        |
| tengxun | 3362        |
| baidu   | 2203        |
| tengxun | 5563        |
| ali     | 3302        |
| baidu   | 6635        |