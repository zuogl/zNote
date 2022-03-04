---
title: 时间函数
tags:
  - SQL
  - 时间函数

author: 小左同学
date: '2022-03-04'
---

### 1. 获取当前时间日期

1. 语法

   在 SQL 中，获取当前时间常用的又如下三种：

   - `now()`:返回当前日期和时间，格式`YYYY-MM-DD hh:mm:ss`
   - `curdate()`:返回当前日期，格式`YYYY-MM-DD`
   - `curtime()`:返回当前时间，格式`hh:mm:ss`

   在使用`now()`和`curtime()`时，如果需要精确到秒以后的话，可以在()中加数字，比如`now(3)`就是表示精确到毫秒，`2022-03-04 11:47:30.321`

2. 例子

   向记录表`records`中插入当前的日期。

   ```sql
   insert into records values (curdate());
   ```

   注意需要用括号将`curdate()`括起来。

### 2. 提取日期和时间

1. 语法

   `date()`函数可以从目标中提取出日期，`time()`函数可以从目标中提取出时间。

2. 例子

   查询`courses`表中，2020年8月前创建的课程，将创建时间以`created_date`返回，并返回课程名称。

   ```sql
   select name , date(created_at) as created_date from courses where created_at < '2020-08-01';
   ```

   | name                      | created_date |
   | :------------------------ | :----------- |
   | 'Advanced Algorithms'     | '2020-06-01' |
   | 'System Design'           | '2020-07-18' |
   | 'Django'                  | '2020-02-29' |
   | 'Web'                     | '2020-04-22' |
   | 'Artificial Intelligence' | '2018-05-13' |
   | 'Java P6+'                | '2019-01-19' |
   | 'Data Analysis'           | '2019-07-12' |
   | 'Dynamic Programming'     | '2018-08-18' |


### 3. 提取指定的时间信息
1. 语法

    `extract()`函数可以从目标中提取出指定的日期格式。
    ```sql
    select extract(unit from 时间列) from 表名;
    ```
   其中`unit`是需要返回的时间部分,如：`year`、`month`、`day`、`hour`、`minute`、`second`等。

2. 例子

   查询`courses`表中，返回创建时间以及课程名称，并从创建时间中提取出创建的具体小时和秒数分别以`created_hour`和`created_at`，将创建时间以`created_date`返回，并返回课程名称。

   ```sql
   select name ,created_at,extract(hour from created_at) as created_hour,extract(second from created_at) as created_second from courses;
   ```



### 本文所用的数据表如下

### courses

| id  | name                      | student_count | created_at           | teacher_id |
| :-- | :------------------------ | :------------ | :------------------- | :--------- |
| 1   | 'Advanced Algorithms'     | 880           | '2020-6-1 09:10:12'  | 4          |
| 2   | 'System Design'           | 1350          | '2020-7-18 10:11:12' | 3          |
| 3   | 'Django'                  | 780           | '2020-2-29 12:10:12' | 3          |
| 4   | 'Web'                     | 340           | '2020-4-22 13:01:12' | 4          |
| 5   | 'Big Data'                | 700           | '2020-9-11 16:01:12' | 1          |
| 6   | 'Artificial Intelligence' | 1660          | '2018-5-13 18:12:30' | 3          |
| 7   | 'Java P6+'                | 780           | '2019-1-19 13:31:12' | 3          |
| 8   | 'Data Analysis'           | 500           | '2019-7-12 13:01:12' | 1          |
| 10  | 'Object Oriented Design'  | 300           | '2020-8-8 13:01:12'  | 4          |
| 12  | 'Dynamic Programming'     | 2000          | '2018-8-18 20:01:12' | 1          |
