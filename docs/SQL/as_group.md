---
title: 分组
tags:
  - SQL
  - 分组

author: 小左同学
date: '2022-03-08'
---

### 1. group by

1. 语法

`group by`就是`SQL`中用来实现分组的函数，其用于结合计算函数，能根据给定数据列的每个成员对查询结果进行分组统计，最终得到一个分组汇总表。

```sql
select 列名, 计算函数 from 表名 where 列名 操作符 值 group by 列名;
```

2. 例子

   2.1 查询不同国家教师的人数:

   ```sql
   select country, count(country) as teacher_count from teachers group by country order by teacher_count,country;
   ```

   | country | teacher_count |
   | :------ | :------------ |
   | 'JP'    | 1             |
   | 'UK'    | 1             |
   | 'USA'   | 1             |
   | 'CN'    | 2             |

   2.2 统计每个老师教授课程的学生总数:

   ```sql
   select t.name as teacher_name,ifnull(sum(c.student_count),0) as student_count from courses c right join teachers t on c.teacher_id = t.id group by t.id;
   ```

   | teacher_name       | student_count |
   | :----------------- | :------------ |
   | 'Eastern Heretic'  | 3200          |
   | 'Northern Beggar'  | 0             |
   | 'Western Venom'    | 4570          |
   | 'Southern Emperor' | 1520          |
   | 'Linghu Chong'     | 0             |

### 2. having

1. 语法

   `having`子句可以对分组统计的函数进行过滤。

   ```sql
     select 列名,统计函数(列名) from 表名 where 列名 运算符 值 group by 列名 having 统计函数(列名) 运算符 值;
   ```

2. 例子

   2.1 查询教师全部课程学生总数不足 3000 人的教师姓名及学生总数：

   ```sql
   select t.name , ifnull(sum(c.student_count),0) as student_count from courese c right join teachers t on c.teacher_id = t.id group by t.id having student_count <3000 order by student_count,name;
   ```

   | name               | student_count |
   | :----------------- | :------------ |
   | 'Linghu Chong'     | 0             |
   | 'Northern Beggar'  | 0             |
   | 'Southern Emperor' | 1520          |


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
| 12  | 'Dynamic Programming'     | 2000          | '2018-8-18' | 1          |

### teachers

| id  | name               | email                       | age | country |
| :-- | :----------------- | :-------------------------- | :-- | :------ |
| 1   | 'Eastern Heretic'  | 'eastern.heretic@gmail.com' | 20  | 'UK'    |
| 2   | 'Northern Beggar'  | 'northern.beggar@qq.com'    | 21  | 'CN'    |
| 3   | 'Western Venom'    | 'western.venom@163.com'     | 28  | 'USA'   |
| 4   | 'Southern Emperor' | 'southern.emperor@qq.com'   | 21  | 'JP'    |
| 5   | 'Linghu Chong'     | None                        | 18  | 'CN'    |
