---
title: 算数函数
tags:
  - SQL
  - avg
  - max
  - min
  - round
  - count
  - sum
  - ifnull
  - isnull

author: 小左同学
date: '2022-03-03'
---

### 1. avg

1. 功能

   `avg`函数，用于求出数值列的平均值。它可以用来返回所有列的平均值，也可以用来返回特定列和行的平均值。但是当参数列中的数据均为空时，结果会返回`NULL`。

2. 语法

   ```sql
   select avg(列名) from 表名 ；
   ```

3. 例子

   查询教师表 teachers 中教师邮箱为 '@qq.com' 结尾的年龄的平均值，最后返回结果列名显示为 'average_teacher_age' 。

   ```sql
   select avg(age) as average_teacher_age from teachers where email like '%@qq.com';
   ```

   其中`as`关键字的作用是赋予 `avg(age)` 计算结果列显示在列表中的**别名**。别名是一个字段或值的替换名，由关键字`as`赋予。别名还有其他用途，常见的用途包括在实际的表列名包含不符合规定的字符（如空格）时重新命名它，在原来的表列名含糊或者容易误解时扩充它等。别名常与函数联用，给使用函数之后的新计算列一个名字，方便我们查看和使用。

   | average_teacher_age |
   | :------------------ |
   | 21.0                |

### 2. max

1. 功能

   `max`函数，用于返回指定列中的最大值。它只有一个表示指定列名的参数。但是当参数列中的数据均为空时，结果会返回`NULL`。

2. 语法

   ```sql
   select max(列名) from 表名 ；
   ```

3. 例子

   查询最年长的中国教师信息，并返回该教师的年龄，最后返回结果列名显示为 'max_age' 。

   ```sql
   select max(age) as max_age from teachers where country = 'CN';
   ```

   | max_age |
   | :------ |
   | 21      |

### 3. min

1. 功能

   `min`函数，用于返回指定列中的最小值。它只有一个表示指定列名的参数。但是当参数列中的数据均为空时，结果会返回`NULL`。

2. 语法

   ```sql
   select min(列名) from 表名 ；
   ```

3. 例子

   查询年龄最小的教师的年龄，最后返回结果列名显示为 'max_age' 。

   ```sql
   select min(age) as min_age from teachers ;
   ```

   | min_age |
   | :------ |
   | 18      |

### 4. sum

1. 功能

   `sum`函数，用于统计数值列的总数并返回其值,但是当参数列中的数据均为空时，结果会返回`NULL`。

2. 语法

   ```sql
   select sum(列名) from 表名 ；
   ```

3. 例子

   统计中国教师的年龄总和，最后返回结果列名显示为 'sum_age' 。

   ```sql
   select avg(age) as sum_age from teachers where country = 'CN';
   ```

   | sum_age |
   | :------ |
   | 39.0    |

### 5. round

1. 功能

   `round`函数函数用于把数值字段舍入为指定的小数位数。

2. 语法

   ```sql
   select round(列名,小数位数D) from 表名 ；
   ```

   - 当 D 为正数时，返回一个 D 指定位数的数据
   - 当 D 为 0 时，返回的数据为一个整数
   - 当 D 为负数时，列名对应的数据小数点左侧部分按照 D 指定的位置进行四舍五入。
     - round(929.0 ,-3) 返回的数据为 1000
     - round(929.0,-2) 返回的数据为 900
     - round(929.0,-1) 返回的数据为 930

3. 例子

   查询教师表`teachers`中，20 岁（不包含 20 岁）以上教师的平均年龄，返回的字段为 `avg_teacher_age` ，结果保留四舍五入后的整数 。

   ```sql
   select round(avg(age),0) as avg_teacher_age from teachers where age > 20;
   ```

   | avg_teacher_age |
   | :-------------- |
   | 23              |

### 6. isnull

1. 功能

   `isnull`函数，判断字段是否为`NULL`。它只有一个参数--列名，根据列名中的字段是否为`NULL`值返回 1 或者 0。

2. 语法

   ```sql
   select isnull(列名) from 表名;
   ```

   如果 isnull()函数的参宿列中的字段为`NULL`则返回 1，不是则返回 0。

### 7. ifnull

1. 功能

   `ifnull`函数，也用于判断字段是否为`NULL`，接收两个参数，列名和备用值。如果列名中的某个字段不是`NULL`,则返回该值，如果是`NULL`,则返回备用值。

   `coalesce(列名，备用值)`和`ifnull`的功能及作用相同。

2. 语法

   ```sql
   select ifnull(列名，备用值) from 表名 ；
   ```

3. 例子

   ```sql
   select name , email,isnull(email) as isnull_email,ifnull(email,'0') as ifnull_email,coalesce(email,'0') as coalesce_email from teachers;
   ```

   | name               | email                       | isnull_email | ifnull_email                | coalesce_email              |
   | :----------------- | :-------------------------- | :----------- | :-------------------------- | :-------------------------- |
   | 'Eastern heretic'  | 'eastern.heretic@gmail.com' | 0            | 'eastern.heretic@gmail.com' | 'eastern.heretic@gmail.com' |
   | 'Northern Beggar'  | 'northern.beggar@qq.com'    | 0            | 'northern.beggar@qq.com'    | 'northern.beggar@qq.com'    |
   | 'Western Venom'    | 'western.venom@163.com'     | 0            | 'western.venom@163.com'     | 'western.venom@163.com'     |
   | 'Southern Emperor' | 'southern.emperor@qq.com'   | 0            | 'southern.emperor@qq.com'   | 'southern.emperor@qq.com'   |
   | 'Linghu Chong'     | None                        | 1            | '0'                         | '0'                         |

### 8. count

1. 功能

   `count()`函数用于计数，可利用其确定表中行的数目或者符合特定条件的行的数目。当`count()`中的参数不同时，其的用途也是有明显的不同的，主要可分为以下三种情况：`count(列名)`,`count(*)`,`count(distinct 列名)`。

2. 语法

- 2.1 count (列名)

  ```sql
  select count(列名) from 表名；
  ```

  `count (列名)`函数会对指定列具有的行数进行计数，但是会除去值为`NULL`的行。该函数主要用于查看各列数据的数量情况，便于统计数据的缺失值。假如出现某一列的数据全为`NULL`值的情况，则返回 0

- 2.2 count(\*)

  ```sql
  select count(*) from 表名；
  ```

  `count(*)`函数会对表中行的数目进行计数，包括值为`NULL`所在行和重复项所在行。该函数主要用于查看表中的记录数。正常来说，表都会有主键，而主键不为空，所以`count(*)`在有主键的表中等同于 count(主键名)，即查询有多少条记录。

- 2.3 count(distinct 列名)

  ```sql
  select count(distinct 列名) from 表名；
  ```

  `count(distinct 列名)`函数返回指定列的不同值的数目

3. 例子

   统计教师表中年龄在 20 到 28 岁之间，且国籍为中国或英国的教师人数，最后返回统计值，结果列名显示为`teacher_count`。

   ```sql
   select count(*) as teacher_count from teachers where (age between 20 and 28) and country in ('CN','UK');
   ```

   | teacher_count |
   | :------------ |
   | 2             |

### 本文所用的数据表如下

### teachers

| id  | name               | email                       | age | country |
| :-- | :----------------- | :-------------------------- | :-- | :------ |
| 1   | 'Eastern heretic'  | 'eastern.heretic@gmail.com' | 20  | 'UK'    |
| 2   | 'Northern Beggar'  | 'northern.beggar@qq.com'    | 21  | 'CN'    |
| 3   | 'Western Venom'    | 'western.venom@163.com'     | 28  | 'USA'   |
| 4   | 'Southern Emperor' | 'southern.emperor@qq.com'   | 21  | 'JP'    |
| 5   | 'Linghu Chong'     | None                        | 18  | 'CN'    |
