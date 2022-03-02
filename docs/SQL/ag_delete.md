---
title: delete
tags:
  - SQL
  - delete

author: 小左同学
date: '2022-03-02'
---

### 1.delete

1. 功能

   `update` 语句用于删除表中的行。

2. 语法

   ```sql
   delete from 表名 where 列名 = 值;
   ```
  
   在不删除表的情况下删除所有的行。这意味着表的结构、属性和索引都是完整的：
   ```sql
   delete from 表名 ;
   delete * from 表名;
   ```

   **请注意一下，where 语句，where 子句规定了哪条记录或者哪些记录需要删除，如果忽略，所有的记录都会被删除。**

3. 例子

   我们来删除 lastName 是 "Gates" 的人。

   ```sql
   delete from Person lastName = 'Gates';
   ```
   | id  | lastName | firstName | address           | city       |
   | :-- | :------- | :-------- | :---------------- | :--------- |
   | 1   | 'Wilson' |           | 'Champs-Elysees ' |            |


### 本文所用的数据表如下

Person

| id  | lastName | firstName | address           | city       |
| :-- | :------- | :-------- | :---------------- | :--------- |
| 1   | 'Gates'  | 'Bill'    | 'Xuanwumen 10'    | ' Beijing' |
| 2   | 'Wilson' |           | 'Champs-Elysees ' |            |
