---
title: limit
tags:
  - SQL

author: 小左同学
date: '2022-03-03'
---

### 1. limit

1. 功能

   `limit`关键字用于对结果集进行约束，接收两个参数`offset`和`count`,两个参数都是整型数字，但通常只用一个。

2. 语法

   ```sql
   select 列名 from 表名 limit 起始位置(默认从0开始，可以不写) 返回数量；
   ```

   > 注意，当`limit`和`order by`一起使用的时候，需要先排序再限制数量，否则会报错。

3. 例子

   筛选订单数大于2000的公司，并返回订单数最高的两家。

   ```sql
   select * from Orders where orderNumber >2000  order by orderNumber desc limit 2;
   ```

   | company  | orderNumber |
   | :------- | :---------- |
   | W3school | 6953        |
   | Apple    | 4698        |



### 本文所用的数据表如下

### Orders

| company  | orderNumber |
| :------- | :---------- |
| IBM      | 3532        |
| W3school | 2356        |
| Apple    | 4698        |
| W3school | 6953        |
| BOB      | 2000        |
