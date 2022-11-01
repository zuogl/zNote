---
title: in
tags:
  - SQL

author: 小左同学
date: '2022-03-03'
---

### 1. in

1. 功能

   `in`操作符允许我们在`where`子句中规定多个值，当我们查询条件过多时，可以用`in`来简化条件间的`or`连接或者嵌套。

2. 语法

   ```sql
   select 列名 from 表名 where 列名 in (值1,值2,...);
   ```

3. 例子

   我们来查找 lastName 是 "Gates" 或者'Wilson'的人。

   ```sql
   delete from Person where lastName in ('Gates','Wilson');
   ```

   | id  | lastName | firstName | address           | city       |
   | :-- | :------- | :-------- | :---------------- | :--------- |
   | 1   | 'Gates'  | 'Bill'    | 'Xuanwumen 10'    | ' Beijing' |
   | 2   | 'Wilson' |           | 'Champs-Elysees ' |            |

### 本文所用的数据表如下

Person

| id  | lastName | firstName | address           | city       |
| :-- | :------- | :-------- | :---------------- | :--------- |
| 1   | 'Gates'  | 'Bill'    | 'Xuanwumen 10'    | ' Beijing' |
| 2   | 'Wilson' |           | 'Champs-Elysees ' |            |
| 3   | 'Bush'   | 'George'  | 'Champs-Elysees ' |            |
