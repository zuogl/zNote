---
title: update
tags:
  - SQL

author: 小左同学
date: '2022-03-02'
---

### 1.update

1. 功能

   `update`语句用于修改表中的数据。

2. 语法

   ```sql
   update 表名 set 要跟新的数据列名1 = 新的值,要跟新的数据列名2 = 新的值,... where 列名 = 值
   ```

   **请注意一下，where 语句，where 子句规定了哪条记录或者哪些记录需要更新，如果忽略，所有的记录都会被更新。**

3. 例子

   我们为 lastName 是 "Wilson" 的人添加 firstName

   ```sql
   update Person set firstName = 'Fred' where lastName = 'Wilson';
   ```

   | id  | lastName | firstName | address           | city       |
   | :-- | :------- | :-------- | :---------------- | :--------- |
   | 1   | 'Gates'  | 'Bill'    | 'Xuanwumen 10'    | ' Beijing' |
   | 2   | 'Wilson' | 'Fred'    | 'Champs-Elysees ' |            |

   我们来尝试一下一次性更新多列的数据，将 lastName 是 "Wilson" 的人的 firstName 更改为'Steve',并将其 city 设置为'San Francisco'

   ```sql
   update Person set firstName = 'Steve',city = 'San Francisco' where lastName = 'Wilson';
   ```

   | id  | lastName | firstName | address           | city            |
   | :-- | :------- | :-------- | :---------------- | :-------------- |
   | 1   | 'Gates'  | 'Bill'    | 'Xuanwumen 10'    | ' Beijing'      |
   | 2   | 'Wilson' | 'Steve'   | 'Champs-Elysees ' | 'San Francisco' |

### 本文所用的数据表如下

Person

| id  | lastName | firstName | address           | city       |
| :-- | :------- | :-------- | :---------------- | :--------- |
| 1   | 'Gates'  | 'Bill'    | 'Xuanwumen 10'    | ' Beijing' |
| 2   | 'Wilson' |           | 'Champs-Elysees ' |            |
