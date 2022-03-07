---
title: 约束
tags:
  - SQL
  - 约束

author: 小左同学
date: '2022-03-07'
---

在`SQL`中，约束是规定表中的数据规则。若存在违反约束的行为，行为就会被阻止。它能帮助管理员更好地管理数据库，并且确保数据库中数据的正确性和有效性。

### 1. 非空约束-not null

1. 语法

   `not null`约束强制列不接受`NULL`值,强制字段始终包含值，这意味着，如果不向字段添加值，就无法插入新纪录或者更新记录。

2. 例子

   2.1 新建一个`Persons`表，强制`id`,`lastName`,`firstName`不接受`NULL`值:

   ```sql
   create table Persons (id int not null,lastName varchar(256) not null , firstName varchar(256) not null, age int);
   ```

   2.2 在一个已创建的表的`Age`字段中添加`NOT NULL`约束如下所示：

   ```sql
   alter table Persons modify age int not null;
   ```

   2.3 在一个已创建的表的`Age`字段中删除`NOT NULL`约束如下所示：

   ```sql
   alter table Persons modify age int  null;
   ```

   > `NULL`值和空串是两个概念，不要混淆!

### 2. 唯一约束 unique

1. 语法

   唯一约束`unique`可以使表中的被约束列没有重复值(不允许出现重复值)

2. 例子

   2.1 在创建`Persons`表时，给`p_id`创建`uniqe`约束：

   ```sql
   <!-- 单个列的unique约束 -->
   create table Persons (
      p_id int not null,
      lastNumae varchar(256) not null,
      unique(p_id)
   );
   <!-- 命名unique约束，并约束多个列 -->
      create table Persons (
      p_id int not null,
      lastName varchar(256) not null,
     constraint idAndName unique(p_id,lastName)
   );
   ```

   2.2 在表已经被创建后，再给`p_id`添加`uniqe`约束：

   ```sql
   alter table Persons add unique(p_id);
   alter table Persons add constraint idAndName unique(P_id,lastName)
   ```

   2.3 撤销`uniqe`约束：

   ```sql
   alter table Persons drop index idAndName ;
   ```

### 3.主键约束--primary key

1. 语法

   `primary key`约束唯一标识数据库表中的每条记录 。

   - 主键必须包含唯一的值
   - 主键列不能包含`NULL`值
   - 每个表都应该有一个主键，且每个表都只能有一个主键

2. 例子

   2.1 在创建`Persons`表时，给`p_id`创建`primary key`约束：

   ```sql
   <!-- 单个列的primary key约束 -->
   create table Persons (
      p_id int not null,
      lastNumae varchar(256) not null,
      primary key(p_id)
   );
   <!-- 命名primary key约束，并约束多个列 -->
      create table Persons (
      p_id int not null,
      lastName varchar(256) not null,
     constraint idAndName primary key(p_id,lastName)
   );
   ```

   2.2 在表已经被创建后，再给`p_id`添加`primary key`约束：

   ```sql
   alter table Persons add primary key(p_id);
   alter table Persons add constraint idAndName primary key(P_id,lastName)
   ```

   2.3 撤销`primary key`约束：

   ```sql
   alter table Persons drop primary key ;
   alter table Persons drop constraint idAndName ;
   ```

### 4. 外键约束--foreign key

1. 语法

   一个表中的`foreign key`指向另一个表的`primary key`;  
   `foreign key`约束用于预防破坏表之间连接的动作。
   `foreign key`约束也能防止非法数据插入外键列，因为它必须是它指向的那个表中的值之一。

   **Persons 表**
   | id_P | lastNmae | firstName | address | city |
   | :--- | :------- | :-------- | :--------------- | :--------- |
   | 1 | 'Adams' | 'John' | 'Oxford Street' | 'London' |
   | 2 | ' Bush' | 'George' | 'Fifth Avenue' | 'New York' |
   | 3 | 'Carter' | 'Thomas' | 'Changan Street' | 'Beijing' |

   **Orders 表**

   | id_O | orderNo | id_P |
   | :--- | :------ | :--- |
   | 1    | 77895   | 3    |
   | 2    | 44689   | 3    |
   | 3    | 22563   | 1    |
   | 4    | 36958   | 1    |

   - `Orders`中的`id_P`列指向`Persons`表中的 "id_P" 列。

   - `Persons`表中的`id_P`列是`Persons`表中的 primary key。

   - `Orders`表中的`id_P`列是`Orders`表中的 foreign key。

2. 例子

   2.1 在创建`Orders`表时，给`id_P`创建`foreign key`约束：

   ```sql
   <!-- 单个foreign key -->
   create table Orders (
      id_O int not null,
      orderNo int not null,
      id_P int,
      primary key(id_O),
      foreign key (id_P) references Persons(id_P)
   );
   <!-- 命名foreign key约束 -->
   create table Orders (
      id_O int not null,
      orderNo int not null,
      id_P int,
      primary key(id_O),
      constraint Fk foreign key (id_P) references Persons(id_P)
   );
   ```

   2.2 在表已经被创建后，再给`id_P`添加`foreign key`约束：

   ```sql
   alter table Orders add foreign key(id_P) references Persons(id_P);
   alter table Orders add constraint foreign key(id_P) references Persons(id_P);
   ```

   2.3 撤销`foreign key`约束：

   ```sql
   alter table Orders drop foreign key FK;
   ```

### 5.检查约束 check

1. 语法

   `check`约束用于限制列中的值的范围。
   如果单对列定义`check`约束，那么该列只允许特定的值。
   如果对一个表定义`check`约束，那么此约束会在特定的列中对值进行限制。

2. 例子

   2.1 在创建课程表`courses`时，给学生总数`student_count`字段加上一个大于 0 的约束。
   ```sql
   create table courses
   (
   id int,
   name varchar(255),
   student_count int,
   created_at date,
   teacher_id int,
   check (`student_count` > 0)
   );
   <!-- 命名check约束 -->
   create table courses
   (
   id int,
   name varchar(255),
   student_count int,
   created_at date,
   teacher_id int,
   constraint checkName check (`student_count` > 0)
   );
   <!-- 同时给teacher_id也添加check约束 -->
   create table courses
   (
   id int,
   name varchar(255),
   student_count int,
   created_at date,
   teacher_id int,
   check (student_count > 0 and teacher_id >0)
   );
   ```

   2.2 课程表`courses`已存在的情况下为学生总数`student_count`字段添加一个大于 0 的`check`约束。
   ```sql
   alter table courses add check(student_count >0);
   alter table courses add check(student_count >0 and teacher_id >0);
   ```

   2.3 撤销`check`约束
   ```sql
   alter table courses drop check checkName;
   ```

### 6. 默认约束--default

1. 语法

  `defalut`约束用于给列插入默认值。如果在更新表时，没有向该列中插入值，就会自动用默认值代替。

2. 例子

  2.1 在创建`Persons`时，给`country`创建默认值`CN`:
  ```sql
   create table Persons (
      p_id int not null,
      lastName varchar(256) not null,
      firstName varchar(256) ,
      address varchar(256),
      country varchar(256) default 'CN'
   )
  ```
  2.2 `Persons表已经存在了，给``country`创建默认值`CN`:
  ```sql
   alter table Persons alter country set defalut 'CN';
  ```
  2.3 删除默认值:
  ```sql
   alter table Persons alter country drop default
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
