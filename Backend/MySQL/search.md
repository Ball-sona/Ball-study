# 특정 조건의 데이터 검색

## LIKE

```sql
SELECT * FROM table WHERE name LIKE 'A%'; # 이름이 A로 시작하는 데이터 검색
SELECT * FROM table WHERE name LIKE '%A'; # 이름이 A로 끝나는 데이터 검색
SELECT * FROM table WHERE name LIKE '%A%'; # 이름에 A가 포함되어 있는 데이터 검색

SELECT * FROM users WHERE dept NOT LIKE 'd%'; # d로 시작하지 않는 부서
```

## REGEXP

```sql
SELECT * FROM table WHERE name REGEXP 'A|B'; # 이름이 A나 B를 포함하는 데이터 검색
```

## Between

```sql
# select range
SELECT * FROM users WHERE age BETWEEN 20 AND 25;
```

## IN

```sql
SELECT * FROM users WHERE dept IN ('design', 'sales');
```
