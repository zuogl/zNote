---
title: distinct语句
tags:
  - SQL
  - distinct

author: 小左同学
date: '2022-03-02'
---

### 1. distinct

1. 定义
   在`select`语句的查询结果中，返回的结果可能有重复值，但是，有时候我们只希望看到唯一不同的值，这就是`distinct`的作用。

2. 语法

   ```sql
   select distinct 列名称 from 表名称
   ```

3. 例子
   如果我们直接用 select 来筛选 Orders 表中的 company 的话，结果如下：

   ```sql
   select company from Orders;
   ```

   | company |
   | :------ |
   | baidu   |
   | ali     |
   | tengxun |
   | baidu   |
   | tengxun |
   | ali     |
   | baidu   |

   但是，我们仅仅希望列出所有的公司，而不希望看到重复的公司，就可以用到`distinct`语句了

   ```sql
    select distinct company from Orders;
   ```

   | company |
   | :------ |
   | baidu   |
   | ali     |
   | tengxun |

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
