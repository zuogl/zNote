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

   查询`courses`表中，2020 年 8 月前创建的课程，将创建时间以`created_date`返回，并返回课程名称。

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

   查询`courses`表中，返回创建时间以及课程名称，并从创建时间中提取出创建的具体小时和秒数分别以`created_hour`和`created_second`，将创建时间以`created_date`返回，并返回课程名称。

   ```sql
   select name ,created_at,extract(hour from created_at) as created_hour,extract(second from created_at) as created_second from courses;
   ```

   | name                      | created_at            | created_hour | created_second |
   | :------------------------ | :-------------------- | :----------- | :------------- |
   | 'Advanced Algorithms'     | '2020-06-01T09:10:12' | 9            | 12             |
   | 'System Design'           | '2020-07-18T10:11:12' | 10           | 12             |
   | 'Django'                  | '2020-02-29T12:10:12' | 12           | 12             |
   | 'Web'                     | '2020-04-22T13:01:12' | 13           | 12             |
   | 'Big Data'                | '2020-09-11T16:01:12' | 16           | 12             |
   | 'Artificial Intelligence' | '2018-05-13T18:12:30' | 18           | 30             |
   | 'Java P6+'                | '2019-01-19T13:31:12' | 13           | 12             |
   | 'Data Analysis'           | '2019-07-12T13:01:12' | 13           | 12             |
   | 'Object Oriented Design'  | '2020-08-08T13:01:12' | 13           | 12             |
   | 'Dynamic Programming'     | '2018-08-18T20:01:12' | 20           | 12             |

### 4.格式化输出日期

1. 语法

   我们可以使用`DATE_FORMAT()`来格式化输出日期和时间。

   ```sql
   select date_format(data,format);
   ```

   其中，`data`是一个有效的日期或者时间，`format`是要输出的格式。**返回结果日期是字符串格式**

   [常见的时间 formate 格式](https://www.w3school.com.cn/sql/func_date_format.asp)

2) 例子

   查询`courses`表，查询课程创建时间，按照`年-月-日 时:分:秒`的格式返回结果，返回列名显示为`DATE_FORMAT`。

   ```sql
   select date_format(created_at,'%Y-%m-%d %H:%i:%s') as DATE_FORMAT from courses;
   ```

   | DATE_FORMAT           |
   | :-------------------- |
   | '2020-06-01 09:03:12' |
   | '2020-07-18 10:03:12' |
   | '2020-02-29 12:03:12' |
   | '2020-04-22 13:03:12' |
   | '2020-09-11 16:03:12' |
   | '2018-05-13 18:03:12' |
   | '2019-01-19 13:03:12' |
   | '2019-07-12 13:03:12' |
   | '2020-08-08 13:03:12' |
   | '2018-08-18 20:03:12' |

### 5. 修改时间-增加

1. 语法

   `date_add()`函数是常用的时间函数之一，用于向日期添加指定的时间间隔。

   ```sql
   select date_add(date,interval expr type) from 表名;
   ```

   - 其中，`date`是要被操作的时间，为起始时间;
   - `expr`,是希望添加的时间间隔的数值(`expr`是一个字符串，对于负值的间隔，可以以 ”-“ 开头);
   - type 是具体的数据类型,表示加上时间间隔的单位和`extract()`函数的`unit`一样。

2. 例子

   修改`courses`表中课程的课程创建日期，将课程创建日期均推迟一天，最后返回课程名称`name`及修改后的课程创建时间，修改后的课程创建时间命名为`new_created`。

   ```sql
   select name,date_add(created_at,interval 1 day) from courses;
   ```

   | name                      | new_created  |
   | :------------------------ | :----------- |
   | 'Advanced Algorithms'     | '2020-06-02' |
   | 'System Design'           | '2020-07-19' |
   | 'Django'                  | '2020-03-01' |
   | 'Web'                     | '2020-04-23' |
   | 'Big Data'                | '2020-09-12' |
   | 'Artificial Intelligence' | '2018-05-14' |
   | 'Java P6+'                | '2019-01-20' |
   | 'Data Analysis'           | '2019-07-13' |
   | 'Object Oriented Design'  | '2020-08-09' |
   | 'Dynamic Programming'     | '2018-08-19' |

### 5. 修改时间-减少

1. 语法

   `date_sub()`函数是常用的时间函数之一，用于向日期减去指定的时间间隔。

   ```sql
   select date_sub(date,interval expr type) from 表名;
   ```

   - 其中，`date`是要被操作的时间，为起始时间;
   - `expr`,是希望添加的时间间隔的数值(`expr`是一个字符串，对于负值的间隔，可以以 ”-“ 开头);
   - type 是具体的数据类型,表示加上时间间隔的单位和`extract()`函数的`unit`一样。

2. 例子

   修改`courses`表中课程的课程创建日期，将课程创建日期均提前一天，最后返回课程名称`name`及修改后的课程创建时间，修改后的课程创建时间命名为`new_created`。

   ```sql
   select id,name,date_sub(created_at,interval 1 day) from courses;
   ```

   | id  | name                      | new_created  |
   | :-- | :------------------------ | :----------- |
   | 1   | 'Advanced Algorithms'     | '2020-05-31' |
   | 2   | 'System Design'           | '2020-07-17' |
   | 3   | 'Django'                  | '2020-02-28' |
   | 4   | 'Web'                     | '2020-04-21' |
   | 5   | 'Big Data'                | '2020-09-10' |
   | 6   | 'Artificial Intelligence' | '2018-05-12' |
   | 7   | 'Java P6+'                | '2019-01-18' |
   | 8   | 'Data Analysis'           | '2019-07-11' |
   | 10  | 'Object Oriented Design'  | '2020-08-07' |
   | 12  | 'Dynamic Programming'     | '2018-08-17' |

### 6. 时间计算

1. 语法

   `datediff()`函数可以计算天数差，`timestampdiff()`函数可以计算指定类型(年、月、分、周等)的时间差;

   ```sql
   select datediff(时间1,时间2) as 别名 from 表名;
   select timestampdiff(类型,时间1,时间2) as 别名 from 表名;
   ```

2. 例子

   查询`courses`表,计算课程创建时间与`2022-03-07`的月数差，返回列名显示为`monthDiff`。

   ```sql
   select timestampdiff(month,created_at,'2020-03-07') as monthDiff from courses;
   ```

   | monthDiff |
   | :-------- |
   | -2        |
   | -4        |
   | 0         |
   | -1        |
   | -6        |
   | 21        |
   | 13        |
   | 7         |
   | -5        |
   | 18        |

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
