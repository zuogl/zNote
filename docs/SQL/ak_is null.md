---
title: is null
tags:
  - SQL
  - is null

author: 小左同学
date: '2022-03-03'
---

### 1. is null

1. 功能

   `is null` 用来判断某列中的数据是不是 null 值。

2. 语法

   ```sql
   select 列名 from 表名 where 列名 is null;
   ```

   `NULL` 值代表遗漏的未知数据。数据库中表的列默认可以存放`NULL`值;无法使用 `=` `<` `>` `!=`等比较运算符来比较`NULL`，必须用 `is null` 或者 `is not null` 来判断是不是空值。

3. 例子

   我们来查询 email 为空的教师信息。

   ```sql
   select * from teachers where email is null;
   ```

   | id  | name           | email | age | country |
   | :-- | :------------- | :---- | :-- | :------ |
   | 5   | 'Linghu Chong' | None  | 18  | 'CN'    |

### 本文所用的数据表如下

### teachers

| id  | name               | email                       | age | country |
| :-- | :----------------- | :-------------------------- | :-- | :------ |
| 1   | 'Eastern heretic'  | 'eastern.heretic@gmail.com' | 20  | 'UK'    |
| 2   | 'Northern Beggar'  | 'northern.beggar@qq.com'    | 21  | 'CN'    |
| 3   | 'Western Venom'    | 'western.venom@163.com'     | 28  | 'USA'   |
| 4   | 'Southern Emperor' | 'southern.emperor@qq.com'   | 21  | 'JP'    |
| 5   | 'Linghu Chong'     | None                        | 18  | 'CN'    |
