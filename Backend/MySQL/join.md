# 테이블 합치기

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
<LEFT|RIGHT|FULL> JOIN posts ON posts.id = comments.post_id  # 겹치지 않은 posts 테이블의 행은 NULL 
ORDER BY posts.title;
```

```sql
JOIN posts USING(id); # 필드 이름 같은 경우
```

### Join Multiple Tables

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

