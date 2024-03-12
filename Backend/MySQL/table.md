# 테이블 다루기

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
   is_admin TINYINT(1), # 0과 1 중 하나
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

테이블 정렬

```sql
SELECT * FROM users ORDER BY last_name ASC;
SELECT * FROM users ORDER BY last_name DESC;
# 다중 정렬
SELECT * FROM users ORDER BY last_name ASC, email DESC;
# column 번호 지정 가능
SELECT * FROM users ORDER BY 2 ASC, 3 DESC;
```

## LIMIT

```sql
FROM animal_ins
ORDER BY datetime ASC
LIMIT 10,5; # 9번째 레코드부터 5개만 조회
```
