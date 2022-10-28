---
title: insert into
tags:
  - SQL

author: 小左同学
date: '2022-03-02'
---

### 1. insert into

1. 功能

   `insert into`语句用于向表中插入新记录,有指定列名和不指定列名两种方式。

2. 语法

   ```sql
   insert into 表名称 values (值1,值2,值3,...);//不指定列名的写法

   insert into 表名称 (列名称1，列名称2,...) values (值1,值2,...);//指定列名称的写法
   ```

   当我们采用不指定列名的写法的时候，插入的值是按照从前往后顺序插入的，且一定要完整，不能多不能少，否则会报错，每个值的属性需要与对应表中的列名属性相匹配;

   当我们采用指定列名称的写法时，值和前边的列名称是一一对应的，要求数量一致，值的类型和列的规定类型一致。

> 如果要为表中的每一列都插入数据，推荐使用第一种写法；如果只是为特定列插入数据，推荐使用第二种

3. 例子

   让我们为 teachers 插入两行数据，其语句及结果如下：

   ```sql
   insert into teachers values ('xiaozuo','zuogl448@163.com',26,'CN')
   insert into teachers (name,age) values ('zuotongxue',27)
   ```

   | id  | name               | email                       | age | country |
   | :-- | :----------------- | :-------------------------- | :-- | :------ |
   | 1   | 'Eastern heretic'  | 'eastern.heretic@gmail.com' | 20  | 'UK'    |
   | 2   | 'Northern Beggar'  | 'northern.beggar@qq.com'    | 21  | 'CN'    |
   | 3   | 'Western Venom'    | 'western.venom@163.com'     | 28  | 'USA'   |
   | 4   | 'Southern Emperor' | 'southern.emperor@qq.com'   | 21  | 'JP'    |
   | 5   | 'Linghu Chong'     | None                        | 18  | 'CN'    |
   | 6   | 'xiaozuo'          | 'zuogl448@163.com'           | 26  | 'CN'    |
   | 7   | 'zuotongxue'       |                             | 27  |         |

### 本文所用的数据表如下

teachers

| id  | name               | email                       | age | country |
| :-- | :----------------- | :-------------------------- | :-- | :------ |
| 1   | 'Eastern heretic'  | 'eastern.heretic@gmail.com' | 20  | 'UK'    |
| 2   | 'Northern Beggar'  | 'northern.beggar@qq.com'    | 21  | 'CN'    |
| 3   | 'Western Venom'    | 'western.venom@163.com'     | 28  | 'USA'   |
| 4   | 'Southern Emperor' | 'southern.emperor@qq.com'   | 21  | 'JP'    |
| 5   | 'Linghu Chong'     | None                        | 18  | 'CN'    |
