---
title: like
tags:
  - SQL

author: 小左同学
date: '2022-03-03'
---

### 1. like

1. 功能

   `like` 通常用于实现模糊搜索。

2. 语法

   ```sql
   select 列名 from 表名 where 列名 like 值;
   ```

   在`like`子句中，后边的值一般都会包含通配符，SQL 中常见的通配符如下：
   | 通配符 | 描述 |
   | :-- | :------------- |
   | % | 替代 0 个或多个字符 |
   | \_ | 替代 1 个字符 |
   | [ 字符数组 ] | 字符列中的任何单一字符 |
   | [ ! 字符数组 ] | 不在字符列中的任何单一字符 |

3. 例子

   我们来查询以字母 'D' 开头的所有课程信息。

   ```sql
   select * from courses where name like 'D%';
   ```

   | id  | name                  | student_count | created_at   | teacher_id |
   | :-- | :-------------------- | :------------ | :----------- | :--------- |
   | 3   | 'Django'              | 780           | '2020-02-29' | 3          |
   | 8   | 'Data Analysis'       | 500           | '2019-07-12' | 1          |
   | 12  | 'Dynamic Programming' | 2000          | '2018-08-18' | 1          |

### 本文所用的数据表如下

### courses

| id  | name                      | student_count | created_at  | teacher_id |
| :-- | :------------------------ | :------------ | :---------- | :--------- |
| 1   | 'Advanced Algorithms'     | 880           | '2020-6-1'  | 4          |
| 2   | 'System Design'           | 1350          | '2020-7-18' | 3          |
| 3   | 'Django'                  | 780           | '2020-2-29' | 3          |
| 4   | 'Web'                     | 340           | '2020-4-22' | 4          |
| 5   | 'Big Data'                | 700           | '2020-9-11' | 1          |
| 6   | 'Artificial Intelligence' | 1660          | '2018-5-13' | 3          |
| 7   | 'Java P6+'                | 780           | '2019-1-19' | 3          |
| 8   | 'Data Analysis'           | 500           | '2019-7-12' | 1          |
| 10  | 'Object Oriented Design'  | 300           | '2020-8-8'  | 4          |
| 12  | 'Dynamic Programming'     | 2000          | '2018-8-18' | 1          | 'CN' |
