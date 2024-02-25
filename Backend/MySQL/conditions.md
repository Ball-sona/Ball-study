# 조건문

## IF

```sql
# GENDER = 1 ? "FEMALE" : "MALE"
IF(GENDER,1,"FEMALE","MALE")
```

## IFNULL

```sql
IFNULL(GENDER,"AILEN")
```

## CASE

if-then-else-end

```sql
SELECT CASE 
	WHEN GENDER = 1 THEN "FEMALE"
	WHEN GENDER = 2 THEN "MALE"
	ELSE "AILEN"
	END AS gender
FROM USER;
```

