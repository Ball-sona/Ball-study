# Search

## LIKE

```sql
SELECT * FROM table WHERE name LIKE 'A%'; # 이름이 A로 시작하는 데이터 검색
SELECT * FROM table WHERE name LIKE '%A'; # 이름이 A로 끝나는 데이터 검색
SELECT * FROM table WHERE name LIKE '%A%'; # 이름에 A가 포함되어 있는 데이터 검색
```

## REGEXP

```sql
SELECT * FROM table WHERE name REGEXP 'A|B'; # 이름이 A나 B를 포함하는 데이터 검색
```

