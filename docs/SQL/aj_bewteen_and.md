---
title: between and
tags:
  - SQL

author: 小左同学
date: '2022-03-03'
---

### 1. between and

1. 功能

   `between and` 会选取介于两个值之间的数据范围。这些值可以是数值、文本或者日期。

2. 语法

   ```sql
   select 列名 from 表名 where 列名 between 值1 and 值2;
   ```

   需要注意的是，**不同的数据库，between 选取到的值不同**，会有以下三种情况：

   - 不包括两个边界值， 类似于 (0,100),不包括 0 和 100
   - 包括边界值，类似于[0,100],包括 0 和 100
   - 包括开始边界值，不包括结束边界值，类似于[0,100),包括 0 不包括 100

3. 例子

   > 本例中，用的是 MySQL 数据库，对于 between 的处理是，包括边界值的，就是`between 200 and 250`选取结果会包括 200 和 250

   我们来查询国籍不为中国和英国的 20~25 岁老师。

   ```sql
   select * from teachers where (age between 20 and 25) and (country in ('CN','UK'));
   ```

   | id  | name               | email                     | age | country |
   | :-- | :----------------- | :------------------------ | :-- | :------ |
   | 4   | 'Southern Emperor' | 'southern.emperor@qq.com' | 21  | 'JP'    |

### 本文所用的数据表如下

### teachers

| id  | name               | email                       | age | country |
| :-- | :----------------- | :-------------------------- | :-- | :------ |
| 1   | 'Eastern heretic'  | 'eastern.heretic@gmail.com' | 20  | 'UK'    |
| 2   | 'Northern Beggar'  | 'northern.beggar@qq.com'    | 21  | 'CN'    |
| 3   | 'Western Venom'    | 'western.venom@163.com'     | 28  | 'USA'   |
| 4   | 'Southern Emperor' | 'southern.emperor@qq.com'   | 21  | 'JP'    |
| 5   | 'Linghu Chong'     | None                        | 18  | 'CN'    |
