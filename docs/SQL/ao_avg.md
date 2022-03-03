---
title: 算数函数
tags:
  - SQL
  - avg

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

   `isnull`函数，判断字段是否为`NULL`。它只有一个参数--列名，根据列名中的字段是否为`NULL`值返回1或者0。

2. 语法

   ```sql
   select isnull(列名) from 表名;
   ```
   如果isnull()函数的参宿列中的字段为`NULL`则返回1，不是则返回0。

3. 例子

   查询教师表 teachers 中教师邮箱为 '@qq.com' 结尾的年龄的平均值，最后返回结果列名显示为 'average_teacher_age' 。

   ```sql
   select avg(age) as average_teacher_age from teachers where email like '%@qq.com';
   ```


### 7. ifnull

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

### 本文所用的数据表如下

### teachers

| id  | name               | email                       | age | country |
| :-- | :----------------- | :-------------------------- | :-- | :------ |
| 1   | 'Eastern heretic'  | 'eastern.heretic@gmail.com' | 20  | 'UK'    |
| 2   | 'Northern Beggar'  | 'northern.beggar@qq.com'    | 21  | 'CN'    |
| 3   | 'Western Venom'    | 'western.venom@163.com'     | 28  | 'USA'   |
| 4   | 'Southern Emperor' | 'southern.emperor@qq.com'   | 21  | 'JP'    |
| 5   | 'Linghu Chong'     | None                        | 18  | 'CN'    |
