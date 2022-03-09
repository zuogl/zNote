---
title: 联结
tags:
  - SQL
  - 联结

author: 小左同学
date: '2022-03-08'
---

在`SQL`中，可以通过使用联结功能使得一个`select`语句可以查询多个表,在设置关联条件时，为避免不同表被引用的列名相同，我们需要使用完全限定列名(用一个点分隔表名和列名)否则会返回错误。`表1.列名= 表2.列名`。在`SQL`中，`JOIN`连接子句用于将数据库中两个或者两个以上表中的记录组合起来,常见的`JOIN`类型有如下几种：

- inner join:如果表中至少有一个匹配，则返回行,
- left join:即使右表中没有匹配，也从左表返回所有的行,
- right join:即使左表中没有匹配,也从右表中返回所有的行,
- full join:只要其中一个表中存在匹配,则返回行,
- cross join:又称作`笛卡尔积`,两个表数据一一对应,返回结果的行数等于两个表行数的乘积

### 1. 内连接 -- inner join

1. 语法

   内连接选取的是两个表的交集，返回的结果就是连接的两张表中都满足的部分。

   ```sql
   select c.id,c.name as course_name,t.name as teacher_name from courses c inner join teachers t on c.teacher_id = t.id where 条件;
   ```

   其中，`courses c`和`teachers t`中的`c`和`t`分别是`courses`表和`teachers`表的别名，`inner join`中的 inner 可以省略不写。

2. 例子

   2.1 将课程表`courses`和教师表`teachers`进行内连接，查询`Eastern Heretic`老师所教的所有课程的课程名和课程编号 , 且结果列名分别以课程编号`id`、课程名称`course_name`和教师姓名`teacher_name`显示:

   ```sql
   select c.id,c.name as course_name,t.name as teacher_name from courses c join teachers t on c.teacher_id = t.id where t.name = 'Eastern Heretic';
   ```

   | id  | course_name           | teacher_name      |
   | :-- | :-------------------- | :---------------- |
   | 5   | 'Big Data'            | 'Eastern Heretic' |
   | 8   | 'Data Analysis'       | 'Eastern Heretic' |
   | 12  | 'Dynamic Programming' | 'Eastern Heretic' |

### 2. 外连接 -- outer join

1. 语法

   外连接可以将某个表中的数据返回，及时再另外一张表格中没有对应的数据也能返回。外连接分为三类：

   - 左外连接：left join,
   - 右外连接:right join,
   - 全外连接,mySql 不支持全连接，可以用 union 来联合左连接和右连接来实现。union 要求两次查询的列数必须一致，同时，每条 SELECT 语句中的列的顺序必须相同，union 默认对结果去重，如果不想去重，需要使用 union all

   ```sql
     select c.id,c.name as course_name,t.name as teacher_name from courses c left | right | full (outer) join teachers t on c.teacher_id = t.id where 条件;
   ```

   其中，在`join`前边的称为左表，在`join`后边的称为右表。

2. 例子

   2.1 统计所有在校教师的姓名及其教授的课程：

   ```sql
   select c.name as course_name,t.name as teacher_name from teachers t left join courses c on c.teacher_id = t.id;
   ```

   | course_name               | teacher_name       |
   | :------------------------ | :----------------- |
   | 'Big Data'                | 'Eastern Heretic'  |
   | 'Data Analysis'           | 'Eastern Heretic'  |
   | 'Dynamic Programming'     | 'Eastern Heretic'  |
   | NULL                      | 'Northern Beggar'  |
   | 'System Design'           | 'Western Venom'    |
   | 'Django'                  | 'Western Venom'    |
   | 'Artificial Intelligence' | 'Western Venom'    |
   | 'Java P6+'                | 'Western Venom'    |
   | 'Senior Algorithm'        | 'Southern Emperor' |
   | 'Web'                     | 'Southern Emperor' |
   | 'Object Oriented Design'  | 'Southern Emperor' |
   | NULL                      | 'Linghu Chong'     |

2.2 统计所有在校教师的姓名、邮箱及其教授的课程：

```sql
select c.name as course_name,t.name as teacher_name,t.email as teacher_email from courses c right join teacher t on c.teacher_id = t.id
```

| course_name               | teacher_name       | teacher_email               |
| :------------------------ | :----------------- | :-------------------------- |
| 'Advanced Algorithms'     | 'Southern Emperor' | 'southern.emperor@qq.com'   |
| 'System Design'           | 'Western Venom'    | 'western.venom@163.com'     |
| 'Django'                  | 'Western Venom'    | 'western.venom@163.com'     |
| 'Web'                     | 'Southern Emperor' | 'southern.emperor@qq.com'   |
| 'Big Data'                | 'Eastern Heretic'  | 'eastern.heretic@gmail.com' |
| 'Artificial Intelligence' | 'Western Venom'    | 'western.venom@163.com'     |
| 'Java P6+'                | 'Western Venom'    | 'western.venom@163.com'     |
| 'Data Analysis'           | 'Eastern Heretic'  | 'eastern.heretic@gmail.com' |
| 'Object Oriented Design'  | 'Southern Emperor' | 'southern.emperor@qq.com'   |
| 'Dynamic Programming'     | 'Eastern Heretic'  | 'eastern.heretic@gmail.com' |
| '...'                     | '...'              | '...'                       |

2.3 统计学校所有教师的年龄和其教授的课程：

```sql
select c.name as course_name,t.age as teacher_age form courses c left join tehchers t on c.teacher_id = t.id union  select c.name as course_name,t.age as teacher_age form courses c right join tehchers t on c.teacher_id = t.id;
```

| course_name               | teacher_age |
| :------------------------ | :---------- |
| 'Big Data'                | 20          |
| 'Data Analysis'           | 20          |
| 'Dynamic Programming'     | 20          |
| 'System Design'           | 28          |
| 'Django'                  | 28          |
| 'Artificial Intelligence' | 28          |
| 'Java P6+'                | 28          |
| 'Advanced Algorithms'     | 21          |
| 'Web'                     | 21          |
| 'Object Oriented Design'  | 21          |
| '...'                     | '...'       |

### 3.交叉连接 -- cross join

1. 语法

   交叉连接,返回左表中的所有行，左表中的每一行与右表中的所有行组合。即将两个表的数据一一对应，其查询结果的行数为左表中的行数乘以右表中的行数。

   笛卡尔乘积是指在数学中，两个集合 X 和 Y 的笛卡尓积（Cartesian product），又称直积，表示为 X × Y，第一个对象是 X 的成员而第二个对象是 Y 的所有可能有序对的其中一个成员。

   交叉连接有两种实现方式：显示和隐式

   ```sql
   <!-- 隐式 -->
   select table1.column1,table2.column2 from table1,table2;
   <!-- 显示 -->
   select table1.column1,table2.column2 from table1 cross join table2;
   ```

   由于交叉连接产生的数据比较大，经常加`where`子句进行限制。

### 本文所用的数据表如下

### courses

| id  | name                      | student_count | created_at  | teacher_id |
| :-- | :------------------------ | :------------ | :---------- | :--------- |
| 1   | 'Senior Algorithm'        | 880           | '2020-6-1'  | 4          |
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
