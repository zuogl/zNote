---
title: and、or、not
tags:
  - SQL

author: 小左同学
date: '2022-03-03'
---

### 1. and

1. 功能

   逻辑运算符`and`可以将`where`子句中将两个或两个以上的条件结合起来，其结果是满足`and`连接的所有条件的数据。

2. 语法

   ```sql
   select 列名 from 表名 where 条件1 and 条件2;
   ```

3. 例子

   我们来查找出 lastName 为`Gates`并且居住地为`Tianjin`的人。

   ```sql
   select * from Person where lastName = 'Gates' and city = 'Tianjin';
   ```

   | id  | lastName | firstName | address        | city       |
   | :-- | :------- | :-------- | :------------- | :--------- |
   | 1   | 'Gates'  | 'niketa'  | 'Xuanwumen 10' | ' Tianjin' |

### 2. or

1. 功能

   如果`where`子句中有多个查询条件且都是以`or`连接，那么只要满足其中的一个条件就会被查询出来。

2. 语法

   ```sql
   select 列名 from 表名 where 条件1 or 条件2;
   ```

3. 例子

   我们来查找出 lastName 为`Gates`或者居住地为`Chongqin`的人。

   ```sql
   select * from Person where lastName = 'Gates' or city = 'Chongqin';
   ```

   | id  | lastName | firstName | address        | city        |
   | :-- | :------- | :-------- | :------------- | :---------- |
   | 1   | 'Gates'  | 'Bill'    | 'Xuanwumen 10' | ' Beijing'  |
   | 2   | 'Gates'  | 'niketa'  | 'Xuanwumen 10' | ' Tianjin'  |
   | 3   | 'shuta'  | 'beita'   | 'Xuanwumen 10' | ' Chongqin' |

### 3. not

1. 功能

   逻辑运算符`not`可以过滤掉`where`子句中不满足条件的结果集。

2. 语法

   ```sql
   select 列名 from 表名 where not 条件;
   ```

3. 例子

   我们来查找出 lastName 不是`Gates`的人。

   ```sql
   select * from Person where not lastName = 'Gates';
   ```

   | id  | lastName | firstName | address        | city        |
   | :-- | :------- | :-------- | :------------- | :---------- |
   | 1   | 'shuta'  | 'beita'   | 'Xuanwumen 10' | ' Chongqin' |

### 本文所用的数据表如下

Person

| id  | lastName | firstName | address           | city        |
| :-- | :------- | :-------- | :---------------- | :---------- |
| 1   | 'Gates'  | 'Bill'    | 'Xuanwumen 10'    | ' Beijing'  |
| 2   | 'Gates'  | 'niketa'  | 'Xuanwumen 10'    | ' Tianjin'  |
| 3   | 'shuta'  | 'beita'   | 'Xuanwumen 10'    | ' Chongqin' |
| 4   | 'Wilson' |           | 'Champs-Elysees ' |             |
