---
title: select
tags:
 - SQL

author: 小左同学
date: '2022-02-28'
---

### 1.select语句
1. 功能

   SELECT 语句用于从数据库中选取数据，并将结果存储在一个临时结果表中，这个表称为**结果集**。结果集实际上也是一种包含行与列的表，只不过是未持久化的，即**临时表**。
   **`select`语句可以多层嵌套，也可以作为子句嵌套进`update`，`delect`,`insert into`等语句。**
2. 语法

    在使用 SELECT 语句检索表数据时，至少需要给出两条信息——想检索的列名（column_name）和被检索内容的表名（table_name）。
    ```sql
    SELECT column_name FROM table_name;

    <!-- 当筛选多列数据时，可以将列明用逗号,隔开 -->
    SELECT column_name1，column_name2 FROM table_name;
    ```
3. 例子

    如果我们需要筛选出`courses`数据表中的课程名称的sql语句如下：
    ```sql
    select name from courses;
    ```
其结果如下：
|           name            |
| :------------------------ |
| 'Advanced Algorithms'     |
| 'System Design'           |
| 'Django'                  |
| 'Web'                     |
| 'Big Data'                |
| 'Artificial Intelligence' |
| 'Java P6+'                |
| 'Data Analysis'           |
| 'Object Oriented Design'  |
| 'Dynamic Programming'     |

### 2. select * 语句
1. 功能

   SELECT * 语句可以直接检索表中所有信息，即检索所有的列，输出的列的顺序一般是列在表定义中出现的物理顺序。
2. 语法
   ```sql
    select * from 表名称
   ```

3. 例子

    如果我们需要筛选出`courses`数据表中的所有课程信息的sql语句如下：
    ```sql
    select * from courses;
    ```
其结果如下：
| id |           name            | student_count | created_at  | teacher_id |
| :- | :------------------------ | :------------ | :---------- | :--------- |
| 1  | 'Advanced Algorithms'     | 880           | '2020-6-1'  | 4          |
| 2  | 'System Design'           | 1350          | '2020-7-18' | 3          |
| 3  | 'Django'                  | 780           | '2020-2-29' | 3          |
| 4  | 'Web'                     | 340           | '2020-4-22' | 4          |
| 5  | 'Big Data'                | 700           | '2020-9-11' | 1          |
| 6  | 'Artificial Intelligence' | 1660          | '2018-5-13' | 3          |
| 7  | 'Java P6+'                | 780           | '2019-1-19' | 3          |
| 8  | 'Data Analysis'           | 500           | '2019-7-12' | 1          |
| 10 | 'Object Oriented Design'  | 300           | '2020-8-8'  | 4          |
| 12 | 'Dynamic Programming'     | 2000          | '2018-8-18' | 1          |


### 本文所用的数据表如下
courses数据表

| id |           name            | student_count | created_at  | teacher_id |
| :- | :------------------------ | :------------ | :---------- | :--------- |
| 1  | 'Advanced Algorithms'     | 880           | '2020-6-1'  | 4          |
| 2  | 'System Design'           | 1350          | '2020-7-18' | 3          |
| 3  | 'Django'                  | 780           | '2020-2-29' | 3          |
| 4  | 'Web'                     | 340           | '2020-4-22' | 4          |
| 5  | 'Big Data'                | 700           | '2020-9-11' | 1          |
| 6  | 'Artificial Intelligence' | 1660          | '2018-5-13' | 3          |
| 7  | 'Java P6+'                | 780           | '2019-1-19' | 3          |
| 8  | 'Data Analysis'           | 500           | '2019-7-12' | 1          |
| 10 | 'Object Oriented Design'  | 300           | '2020-8-8'  | 4          |
| 12 | 'Dynamic Programming'     | 2000          | '2018-8-18' | 1          |