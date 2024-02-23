# MySQL Cheat Sheet

> Help with SQL commands to interact with a MySQL database

## MySQL Locations

- Mac _/usr/local/mysql/bin_
- Windows _/Program Files/MySQL/MySQL *version*/bin_
- Xampp _/xampp/mysql/bin_

## Add mysql to your PATH

```bash
# Current Session
export PATH=${PATH}:/usr/local/mysql/bin
# Permanantly
echo 'export PATH="/usr/local/mysql/bin:$PATH"' >> ~/.bash_profile
```

On Windows - https://www.qualitestgroup.com/resources/knowledge-center/how-to-guide/add-mysql-path-windows/

## Users

### Login

```
mysql -u root -p
```

### Show Users

```sql
SELECT User, Host FROM mysql.user;
```

### Create User

```sql
CREATE USER 'someuser'@'localhost' IDENTIFIED BY 'somepassword';
```

### Delete User

```sql
DROP USER 'someuser'@'localhost';
```

## Grant

### Grant All Priveleges On All Databases

```sql
GRANT ALL PRIVILEGES ON * . * TO 'someuser'@'localhost';
FLUSH PRIVILEGES;
```

### Show Grants

```sql
SHOW GRANTS FOR 'someuser'@'localhost';
```

### Remove Grants

```sql
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'someuser'@'localhost';
```

## Database

### Show Databases

```sql
SHOW DATABASES
```

### Create Database

```sql
CREATE DATABASE acme;
```

### Delete Database

```sql
DROP DATABASE acme;
```

### Select Database

```sql
USE acme;
```

## Table

### 테이블 생성

```sql
CREATE TABLE users(
id INT AUTO_INCREMENT,
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   email VARCHAR(50),
   password VARCHAR(20),
   location VARCHAR(100),
   dept VARCHAR(100),
   is_admin TINYINT(1),
   register_date DATETIME,
   PRIMARY KEY(id)
);

CREATE TABLE posts(
id INT AUTO_INCREMENT,
   user_id INT,
   title VARCHAR(100),
   body TEXT,
   publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   FOREIGN KEY (user_id) REFERENCES users(id)  # foreign key!
);
```

### 테이블 삭제

```sql
DROP TABLE tablename;
```

### 모든 테이블 조회

```sql
SHOW TABLES;
```

## Record

### 레코드 삽입

```sql
INSERT INTO users (first_name, last_name, email, password, location, dept, is_admin, register_date) values ('Brad', 'Traversy', 'brad@gmail.com', '123456','Massachusetts', 'development', 1, now());
```

### 여러개의 레코드 삽입

```sql
INSERT INTO users (first_name, last_name, email, password, location, dept,  is_admin, register_date) values ('Fred', 'Smith', 'fred@gmail.com', '123456', 'New York', 'design', 0, now()), ('Sara', 'Watson', 'sara@gmail.com', '123456', 'New York', 'design', 0, now()),('Will', 'Jackson', 'will@yahoo.com', '123456', 'Rhode Island', 'development', 1, now()),('Paula', 'Johnson', 'paula@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now()),('Tom', 'Spears', 'tom@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now());
```

### 레코드 조회

```sql
SELECT * FROM users;
# 특정 열만 조회
SELECT first_name, last_name FROM users;
# 중복 제거 후 조회
SELECT DISTINCT location FROM users;
```

### 조건문과 함께 조회

```sql
SELECT * FROM users WHERE location='Massachusetts';
SELECT * FROM users WHERE location='Massachusetts' AND dept='sales';
SELECT * FROM users WHERE is_admin = 1;
SELECT * FROM users WHERE is_admin > 0;
```

### 특정 레코드 삭제

```sql
DELETE FROM users WHERE id = 6;
```

### 레코드 업데이트

```sql
UPDATE users SET email = 'freddy@gmail.com' WHERE id = 2;
```

## Column

### Column 추가

```sql
ALTER TABLE users ADD age VARCHAR(3);
```

### Column 수정

```sql
ALTER TABLE users MODIFY COLUMN age INT(3);
```

### 특정 Column 연결

```sql
SELECT CONCAT(first_name, ' ', last_name) AS 'Name', dept FROM users;
```

## Order By

```sql
SELECT * FROM users ORDER BY last_name ASC;
SELECT * FROM users ORDER BY last_name DESC;
# 다중 정렬
SELECT * FROM users ORDER BY last_name ASC, email DESC;
# column 번호 지정 가능
SELECT * FROM users ORDER BY 2 ASC, 3 DESC;
```

## Between

```sql
# select range
SELECT * FROM users WHERE age BETWEEN 20 AND 25;
```

## Like

```sql
# search
SELECT * FROM users WHERE dept LIKE 'd%';
SELECT * FROM users WHERE dept LIKE 'dev%';
SELECT * FROM users WHERE dept LIKE '%t';
SELECT * FROM users WHERE dept LIKE '%e%';
# not like search
SELECT * FROM users WHERE dept NOT LIKE 'd%';
```

## IN

```sql
SELECT * FROM users WHERE dept IN ('design', 'sales');
```

## Index

```sql
CREATE INDEX LIndex On users(location);
DROP INDEX LIndex ON users;
```

## Join

### Inner Join (교집합)

```sql
SELECT
  users.first_name,
  users.last_name,
  posts.title,
  posts.publish_date
FROM users
INNER JOIN posts
ON users.id = posts.user_id # 겹치지 않는 행은 제외된다.
ORDER BY posts.title;
```

### Left Join (합집합)

```sql
SELECT
	comments.body,
	posts.title
FROM comments
LEFT JOIN posts ON posts.id = comments.post_id  # 겹치지 않은 posts 테이블의 행은 NULL 
ORDER BY posts.title;
```

## Join Multiple Tables

```sql
SELECT
	comments.body,
	posts.title,
	users.first_name,	
	users.last_name
FROM comments
INNER JOIN posts on posts.id = comments.post_id
INNER JOIN users on users.id = comments.user_id
ORDER BY posts.title;
```

## Aggregate

```sql
# null 포함
SELECT COUNT(*) FROM users;
# 특정 레코드의 개수만 세는 경우엔 null 제거
SELECT COUNT(id) FROM users;
# 레코드 중복 제거하고 개수 세기
SELECT COUNT(DISTINCT name) FROM users;
# 최대, 최소, 합
SELECT MAX(age) FROM users;
SELECT MIN(age) FROM users;
SELECT SUM(age) FROM users;
# uppercase, lowercase
SELECT UCASE(first_name), LCASE(last_name) FROM users;
```

## Group By

```sql
SELECT age, COUNT(age) FROM users GROUP BY age;
SELECT age, COUNT(age) FROM users WHERE age > 20 GROUP BY age;
# age가 중복된 열만 추출
SELECT age, COUNT(age) FROM users GROUP BY age HAVING count(age) >=2;
```

## LIMIT

```sql
FROM animal_ins
ORDER BY datetime ASC
LIMIT 10,5; # 9번째 레코드부터 5개만 조회
```

## Union

여러 테이블 합치기

```sql
SELECT 
DATE_FORMAT(SALES_DATE,"%Y-%m-%d") AS SALES_DATE, # date_format(date, format)
PRODUCT_ID,
USER_ID,
SALES_AMOUNT
FROM ONLINE_SALE
WHERE DATE_FORMAT(SALES_DATE,"%Y-%m-%d") LIKE "2022-03%" # 2022/03 데이터만 추출

UNION ALL # union all은 중복된 값을 모두 보여주고, union은 중복된 값을 제거한다.

SELECT 
DATE_FORMAT(SALES_DATE,"%Y-%m-%d") AS SALES_DATE,
PRODUCT_ID,
NULL AS USER_ID,
SALES_AMOUNT
FROM OFFLINE_SALE
WHERE DATE_FORMAT(SALES_DATE,"%Y-%m-%d") LIKE "2022-03%"
```
