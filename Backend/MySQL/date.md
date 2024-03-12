# Date

## Format

```sql
DATE_FORMAT(date, format)
```

- 일자
  - %Y, %y : 4자리, 2자리 년도
  - %M, %b: 긴 월(영문), 짧은 월(영문)
  - %m: 숫자 월(2자리)
  - %d: 두자리 일자
  - %e: 일자 (한자리는 한자리로)

- 요일 
  - %W, %a: 긴 요일, 짧은 요일
- 시간 
  - %I, %H: 시간(12시간), 시간(24시간)
  - %i: 분 
  - %S: 초
  - %T: `hh:mm:SS`
  - %r: `hh:mm:ss AM,PM`

## Year, Month, Day

```sql
Year(date)
Month(date)
Day(date)
```

## 기간 계산 

### DATEDIFF

```sql
SELECT DATEDIFF(date1, date2) # date2 ~ date1
```

### TIMESTAMPDIFF

```sql
SELECT TIMESTAMPDIFF(format, date1, date2)
```

- second, minute, hour, day, week, month, year
- quater: 분기

