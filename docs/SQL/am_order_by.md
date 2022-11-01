---
title: order by
tags:
  - SQL

author: 小左同学
date: '2022-03-03'
---

### 1. order by

1. 功能

   `order by`关键字用于对结果集按照一个列或者多个列进行排序，其具有 asc（升序,默认,可以不写）和 desc（降序）两个关键字，且默认按照升序排列。

2. 语法

   ```sql
   select 列名 from 表名 where 条件 order by 列名；
   ```

   > 注意，当`order by`和`where`一起使用的时候，需要先条件查询再排序，否则会报错。

3. 例子

   3.1 以字母顺序显示公司名称。

   ```sql
   select company , orderNumber from Orders  order by company;
   ```

   | company  | orderNumber |
   | :------- | :---------- |
   | Apple    | 4698        |
   | BOB      | 2000        |
   | IBM      | 3532        |
   | W3school | 6953        |
   | W3school | 2356        |

   3.2 查询订单数大于 2000 的数据，结果以逆字母顺序显示公司名称，并以数字顺序显示顺序号

   ```sql
   select * from Orders where orderNumber > 2000 order by company desc,orderNumber ;
   ```

   | company  | orderNumber |
   | :------- | :---------- |
   | W3school | 2356        |
   | W3school | 6953        |
   | IBM      | 3532        |
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
