# MySQL

MySQL은 SQL언어를 사용하는 관계형 데이터베이스 관리 시스템 중 하나이다.

데이터를 변수, 즉 컴퓨터 메모리에 저장하게 되면 서버 종료시 메모리가 정리되면서 데이터가 사라져버린다. 반면 데이터베이스에 데이터를 저장하게 되면 서버의 하드 디스크나 SSD 등의 저장 매체에 데이터를 저장하므로, 저장 매체가 고장나거나 사용자가 직접 데이터를 지우지 않는 이상 데이터를 계속 보존할 수 있다.

## mysql 설치

mysql 새롭게 설치하는 방법

```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

mysql 프롬포트 접속하기

```bash
mysql -h localhost -u root -p
```

## 데이터베이스 생성

mysql 에 접속했다면 데이터베이스를 생성해보자. (편의상 대문자 대신 소문자를 사용하겠다..)

```sql
mysql> CREATE SCHEMA `node-study`
mysql> use `node-study`;
```

```sql
mysql> CREATE TABLE `node-study`.`users`(
    -> id int not null auto_increment,
    -> name varchar(20) not null,
    -> age int unsigned not null,
    -> married tinyint not null,
    -> comment text null,
    -> create_at datetime not null default now(),
    -> primary key(id),
    -> unique index name_unique (name ASC))
    -> comment = '사용자 정보'
    -> default charset=utf8
    -> engine=innoDB;
```

### 자료형

- `INT` .`FLOAT`. `DOUBLE`
- `VHARCHAR(n)` 는 가변 길이(0~n) 문자열.
- `CHAR(n)` 는 고정 길이(n) 문자열. n보다 짧은 문자열을 넣으면 부족한 자릿수만큼 스페이스가 채워진다.
- `TEXT` 는 긴 글. 몇백 자 이내는 `VARCHAR` 를 사용하고 그보다 길면 `TEXT` 를 사용한다.
- `TINYINT` 는 -127~128 까지의 정수. 1이나 0만 저장한다면 boolean 같은 역할을 할 수 있다.
- `DATETIME` 는 날짜와 시간에 대한 정보. 날짜만 담는 `DATE` 나 시간만 담는 `TIME` 도 있다.

### 옵션

- `NULL` 이나 `NOT NULL` 은 빈칸을 허용할지 여부. (NN)
- `AUTO_INCREAMENT` 는 숫자로 저절로 올려주는 옵션. 위에서 id에 해당 옵션이 걸려있으므로, 컬럼이 추가될때마다 id가 1씩 늘어난다. (AI)
- `UNSIGNED` 는 숫자 자료형에 적용되는 옵션으로, 음수가 무시되어 저장된다. (`float`나 `double` 자료형에는 적용이 불가하다) (UN)
- `ZEROFILL` 은 `INT(4)` 처럼 숫자의 자릿수가 고정되어 있을 때 사용되는 옵션으로, 만약 `1` 이 들어왔다면 `0001` 로 바꿔준다. (ZF)

- `DEFAULT now()` 는 데이터베이스 저장 시 해당 컬럼에 값이 없다면 기본값을 넣어주는 옵션이다. `now()` 는 현재 시각을 넣으라는 뜻으로, `CURRENT TIMESTAMP` 와 같은 뜻이다. 즉 컬럼에 넣는 순간 시각이 자동으로 기록된다.
- `PRIMARY KEY` 는 기본 키를 설정하는 옵션이다. (PK)
- `UNIQUE INDEX` 는 해당 값이 고유해야 하는지에 대한 옵션이다. `UNIQUE INDEX name_UNIQUE (name ASC)` 는 name 값이 고유해야하고, 해당 칼럼을 오름차순으로 관리하겠다는 뜻이다. (UQ)

### 테이블 설정

- `COMMENT ` 는 테이블에 대한 보충 설명.
- `DEFAULT CHARSET ` 는 한글로 입력하기 위해서 반드시 **utf8** 로 설정해야한다.
- `ENGINE` 는 MyISAM 와 INNODB가 많이 사용된다.

### 외래키

다른 테이블의 기본 키를 저장하는 컬럼을 외래키(foriegn key)라고 한다.

```mysql
CONSTRAINT commenter FORIEGN KEY (commenter) REFERENCES `node-study`.`users` (id)
```

위 구문은 `commenter` 컬럼과 users 테이블의 `id` 컬럼을 연결한다.

```sql
CREATE TABLE `node-study`.`comments` (
  `id` INT NOT NULL,
  `commenter` INT NOT NULL,
  `comment` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  INDEX `commenter_idx` (`commenter` ASC) VISIBLE,
  CONSTRAINT `commenter`
    FOREIGN KEY (`commenter`)
    REFERENCES `node-study`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
COMMENT = '댓글';
```

## 테이블 관련 명령어

만들어진 테이블 확인하기

```sql
DESC [테이블 이름];
```

테이블 제거하기

```sql
DROP TABLE [테이블 이름]
```

테이블 조회하기

```sql
SHOW TABLES;
```

## CRUD 작업하기

CRUD는 Create, Read, Update, Delete의 두문자어로, 데이터베이스에서 많이 하는 작업 4가지를 일컫는다.

### Create

```sql
INSERT into `node-study`.users(name, age, married, comment) values ('sona', 25, 0, '안 녕 난 공소나')
INSERT INTO `node-study`.comments( commenter, comment) values(1, '안녕');
```

### Read

```sql
SELECT * FROM `node-study`.users;
```

```
+----+-------+-----+---------+-----------------------+---------------------+
| id | name  | age | married | comment               | create_at           |
+----+-------+-----+---------+-----------------------+---------------------+
|  1 | sona  |  25 |       0 | 안 녕 난 공소나       		| 2023-02-24 18:24:37 |
|  2 | sona2 |  26 |       1 | 안녕 난 공소나2      	  | 2023-02-24 18:25:25 |
+----+-------+-----+---------+-----------------------+---------------------+
```

특정 컬럼만 조회하기

```sql
SELECT name, married FROM users;
```

특정 조건을 가진 데이터만 조회하기

```sql
SELECT name, married FROM users WHERE married 1 AND age > 30;
```

데이터 정렬해서 조회하기

```sql
SELECT id,name FROM users ORDERED BY age DESC;
```

조회할 데이터 개수 설정하기

```sql
SELECT id,name FROM users ORDERED BY age DESC LIMIT 10 OFFSET 10;
```

`LIMIT` 은 조회할 로우 개수이고, `OFFSET` 은 건너뛸 숫자를 의미한다. 이 명령어는 페이지네이션 기능을 구현할 때 유용하다. 예를 들어 첫번째 페이지에 1~10번 게시물을 보여줬다면 두번째 페이지는 11번~20번 게시물을 보여줘야한다. 이때 '처음 10개는 건너뛰고 다음 10개를 조회해달라' 식의 명령이 가능하다.

### Update

```sql
UPDATE users SET comment = '바꿀 내용' WHERE id = 2;
```

### DELETE

```sql
DELETE FROM users WHERE id = 2;
```
