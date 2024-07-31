# SQLD

## 1. 데이터 모델링의 이해

### 모델링

- 현실 세계를 단순화하여 표현하는 기법
- 특징: 추상화, 단순화, 명확화
- 3가지 관점: 데이터 관점, 프로세스 관점, 데이터와 프로세스의 상관 관점(둘의 관계를 위주로 모델링)
- 3가지 단계: 개념적(업무 중심적이고 포괄적) -> 논리적(키, 속성, 관계 등 표현) -> 물리적(성능 및 가용성 등 고려)
- 3단계 스키마 구조: 외부 스키마(사용자 관점) > 개념 스키마(통합된 관점) > 내부 스키마(물리적 관점)
  - ANSI-SPARC 아키텍처
  - 사용자의 관점과 데이터베이스가 실제로 표현되는 물리적인 방식을 분리하여 독립성 보장
- ERD: 시스템 엔티티들의 관계를 나타내는 다이어그램

### 엔티티

- 식별이 가능한 객체 = 독립체
- 데이터를 '명확한 기준에 따라' 용도별로 분류해놓은 그룹
- 유형 vs 무형 에 따라 분류

  - 유형 엔티티: 물리적인 형태로 존재, 안정적이고 지속적. (ex. 상품, 회원)
  - 개념 엔티티: 물리적 형태 없음, 개념적. (ex. 부서, 학과)
  - 사건 엔티티: 행위를 함으로써 발생, 빈번함. (ex. 주문, 이벤트 응모)

- 발생 시점에 따라 분류
  - 기본 엔티티: 독립적으로 생성되고, 자식 엔티티 가질 수 있음. (ex. 상품, 회원)
  - 중심 엔티티: 기본 엔티티로부터 파생, 행위 엔티티 생성. (ex. 주문)
  - 행위 엔티티: 2개 이상의 엔티티로부터 파생. (ex. 주문 내역, 이벤트 응모 이력)

> 엔티티:Table / 인스턴스:Row / 속성:Column

> 엔티티명: 띄어쓰기 금지. 단수 명사 금지. 주문-결제 처럼 의미상 중복 금지.

### 속성

- 엔티티의 특징을 나타내는 최소 데이터 단위 -> 더이상 쪼갤 수 없음
- 하나의 엔티티는 **2개 이상의 속성**을 갖는다.
- 하나의 속성은 **1개 이상의 속성값**을 갖는다.
- 특성에 따라 분류
  - 기본 속성: 업무 프로세스 분석을 통해 바로 정의 가능한 속성 (ex. 이름, 주민등록번호)
  - 설계 속성: 업무에 존재하지는 않지만, 설계 과정에서 필요하여 도출해낸 속성 (ex. 학번)
  - 파생 속성: 다른 속성의 속성값을 계산하거나 변형하여 생성한 속성 (ex. 상품 재고, 이벤트 응모건수)
- 구성방식에 따른 분류

  - PK 속성: 엔티티 인스턴스들을 식별 가능 (ex. 학번)
  - FK 속성: 다른 엔티티와의 관계를 맺게 해주는 매개체 역할 하는 속성 (ex. 부서코드, 학과코드)
  - 일반 속성: PK, FK가 아닌 나머지 속성

- 도메인 = 속성이 가질 수 있는 속성값의 범위 (ex. 우편번호는 다섯자리 숫자다)

> 속성값이 가질 수 있는 데이터 유형에는 **CHAR, VARCHAR, CLOB, NUMBER, DATE**가 있다.

> CHAR과 VARCHAR는 크기가 고정이나 가변이냐 차이다. 즉 20byte로 정의한 컬럼에 실제로 6byte짜리 데이터를 저장했을 때, CHAR은 20byte를 그대로 다 쓰지만 VARCHAR은 6byte를 쓴다. 또 두 문자열을 비교할 때 CHAR은 공백을 무시하지만, VARCHAR은 공백을 포함하여 비교한다.

### 관계

- 엔티티와 엔티티와의 관계
- 연관성에 따라 분류
  - 존재 관계: 존재 자체로 연관성 있음 (ex. 학생-학과, 직원-부서)
  - 행위 관계: 특정한 행위를 함으로써 연광성 생김 (ex. 학생-출석부)
- 관계차수(Cardinality) = 관계에 참여하는 수
  - 1:1, 1:M, N:M

### 식별자

- 각각의 인스턴스를 구분 가능하게 만들어주는 대표 격의 속성 (ex. 회원번호, 상품코드, 학번)
- 주식별자 = 기본키, PK 속성
  - 유일성, 최소성(최소 개수면 좋음), 불변성(되도록 변해선 안됨), 존재성(NULL일 수 없음)
- 주식별자 vs 보조식별자
- 내부식별자 vs 외부식별자
- 단일식별자 vs 복합식별자
- 본질식별자 vs 인조식별자
  - 2개 이상의 속성을 하나로 묶어 사용하면 인조식별자 (ex. 주문번호 = 주문일자 + 순번)
  - 본질 식별자는 업무에 의해 만들어지는 꼭 필요한 식별자
  - 인조 식별자는 편의성을 위해 인위적으로 만들어지는 식별자 -> 데이터 품질 저하 및 저장 공간 낭비 + DML 성능 저하 가능

## 2. 데이터 모델과 SQL

### 정규화

- **데이터 정합성**을 위해 엔티티를 작은 단위로 분리하는 과정

  - 데이터 정합성 = 데이터 정확성 및 일관성을 유지하고 보장
  - 정규화를 하면 일반적으로 입력, 수정, 삭제 성능이 향상되지만, 불필요한 조인으로 인해 조회 성능은 저하될 수 있음.
  - 그러나 엔티티를 무작정 분리해서는 안되기에 <u>정규화를 하는데 일정한 룰이 존재</u>

- **제 1정규형: 모든 속성은 반드시 하나만 가져야 한다.**
  - ex. '직업'의 속성값으로 `배우, 가수, 사업가` 을 갖는다.
- **제 2정규형: 모든 일반 속성은 반드시 모든 주식별자에 종속되어야 한다.**
  - ex. 주식별자가 '주문번호 + 음료코드'로 복합식별자인 상황에서, '음료명' 속성은 '음료코드' 속성에만 종속됨. 따라서 '음료코드, 음료명'으로 구성된 엔티티를 분리할 것
- **제 3정규형: 주식별자가 아닌 모든 속성 간에는 서로 종속될 수 없다.**
  - ex. 주식별자가 아닌 '소속사코드'와 '소속사명' 속성이 같은 엔티티에 들어가있어 서로 종속됨. 따라서 '소속사코드, 소속사명'으로 구성된 엔티티를 분리할 것

### 반정규화

- 데이터 조회 성능을 향상시키기 위해 데이터 중복을 허용하거나 데이터를 그룹핑하는 과정
  - 입력, 수정, 삭제 성능이 저하되거나 정합성 이슈가 발생할 수 잇음.
  - <u>정규화가 끝난 후에 거치게 되며</u>, 정규화와 마찬가지로 일정한 룰이 존재. -> 모든 정규화를 마친 후 성능상 이슈가 있을 때만 고려하는 것이 원칙임
- 테이블 반정규화: 테이블 병합, 분할, 추가
- 컬럼 반정규화
- 관계 반정규화(중복관계 추가)

### 관계와 조인의 이해

- 관계: 부모 엔티티의 식별자를 자식에 상속하고, 상속된 속성을 조인키로 활용 ??

  - 존재 관계
  - 행위 관계

- 조인: 정규화에 의해 분리된 테이블들을 출력 및 참조 등을 위해 연결하는 과정

### 계층적 데이터 모델

- 하나의 엔티티 내에서 인스턴스끼리 계층 구조를 가지는 구조?

### 트랜잭션

- 데이터를 조작하기 위한 **하나의 논리적인 작업 단위** (ex. 이벤트 응모 기록을 저장한다. 쿠폰을 발행한다)
- 4가지 특징
  - 원자성: 티셔츠 주문과 결제가 둘 다 성공하거나, 둘 다 실패해야함. 하나만 성공해선 안돼!
  - 일관성: 티셔츠 주문(트랜잭션) 완료된 이후에도, "결제된 티셔츠 수량 + 티셔츠 재고 수량"은 동일해야함.
  - 고립성: 내가 사려는 티셔츠를 현재 다른 애가 구매중이라면, 나는 재고 데이터에 접근할 수 없음.
  - 지속성: 트랜잭션이 변경한 데이터가 영구적으로 저장되어야 함. 즉 모든 트랜잭션은 로그 남기고 COMMIT 되어야 함.

### NULL 속성

- **값이 없음**을 의미한다.
- SQL에서 NULL 값 처리 방법
  - 가로 연산: NULL이 포함되어 있으면 결과값은 NULL
  - 세로 연산: NULL 값을 제외하고 연산

## 3. SQL 기본

### SELECT문 논리적 수행 순서

```sql
SELECT    # 5
FROM			# 1
WHERE			# 2
GROUP BY  # 3
HAVING    # 4
ORDER BY  # 6
```

### 문자열 관련 함수

- `CHR(아스키코드)` : 아스키코드에 해당하는 문자 반환
- `LOWER/UPPER`
- `LTRIM(문자열, [특정 문자])` : 문자열에서 2번째 인자로 전달 받은 특정 문자가 있는지 왼쪽부터 확인 후 있다면 제거 후 반환. 인자를 하나만 넘기면 해당 문자열의 왼쪽 공백 제거
- `RTRIM` : `LTRIM` 과 동일한 역할 수행하되, 오른쪽부터 특정 문자 있는지 확인 혹은 오른쪽 공백 제거
- `TRIM(LEADING|TRAINING|BOTH 특정문자 FROM 문자열)`
- `SUBSTR(문자열, 시작점, [길이])` : 원하는 부분 잘라서 잘린 부분 반환
- `LENGTH(문자열)`
- `REPLACE(문자열, 제거할 문자, [대체할 문자])` : 문자열 내에 '제거할 문자'를 찾아 '대체할 문자'를 바꿔줌. 만약 대체할 문자 지정 안한다면 제거만 한다.

### 숫자 관련 함수

- `ABS` : 수 절대값 반환
- `SIGN`: 수 부호 반환 (양수면 1. 음수면 -1. 0이면 0)
- `ROUND/TRUNC` : 지정된 자릿수에서 반올림, 버림
- `CEIL/FLOOR` : 걍 버림, 올림
- `MOD(수1, 수2)` : 수1을 수2로 나눈 나머지

### 날짜 관련 함수

- `SYSDATE` : 현재 날짜 데이터 반환
- `EXTRACT(YEAR FROM SYSDATE)` : 날짜 데이터에서 특정 단위 반환
- `ADD_MONTHS(TO_DATE('2022-01-31', 'YYYY-MM-DD'), 1) = 2022-02-28`

### 형변환 관련 함수

내부적으로 알아서 데이터 유형을 변환하는 것은 '암시적 형변환'이라 하고, 변환 함수 사용해서 데이터 유형 변환을 명시적으로 나타내는 걸 '명시적 형변환'이라 한다.

- `TO_NUMBER(문자열)` : 변환이 불가능하면 에러 발생
- `TO_CHAR(수 or 날짜, [포맷])`
- `TO_DATE(문자열, 포맷)`

### NULL 관련 함수

- `NVL(인수1, 인수2)` : 인수1이 NULL이면 인수2를 반환하고, 아니라면 인수1을 반환

- `NULLIF(인수1, 인수2)` : 인수1와 인수2가 같으면 NULL을 반환하고 같지 않으면 인수1을 반환

  - ex. `NULLIF(SCORE, 0)`

- `COALESCE(인수1, 인수2, ..)` : NULL이 아닌 최초의 인수를 반환

- `CASE` 문

  ```SQL
  CASE WHEN G_CODE = "0" THEN "WOMAN"
  		 WHEN G_CODE = "1" THEN "MAN"
  		 ELSE "ANIMAL"
  END
  ```

### GROUP BY, HAVING

```sql
COUNT(*)  					# 전체 row 개수
COUNT(컬럼) 				 # 컬럼값이 NULL이 아닌 row 개수
COUNT(DISTINCT 컬럼) # 컬럼이 NULL이 아닌 row에서 중복 제거한 개수
```

### Join

- left join, right join
- full outer join
- natural join
- cross join

## 4. SQL 활용

### 서브 쿼리

쿼리 안에 존재하는 또다른 쿼리

- SELECT 절에 주로 위치하는 **스칼라 서브쿼리**

  ```sql
  SELECT
  	M.PRODUCT_CODE,
  	(SELECT S.PRODUCT_NAME FROM PRODUCT S WHERE S.PRODUCT_CODE = M.PRODUCT.CODE) AS PRODUCT_NAME
  	M.MEMBER_ID
  FROM PRODUCT_REVIEW M
  ```

- FROM 절 등에 위치하는 **인라인 뷰**

  ```sql
  SELECT
  	M.PRODUCT_CODE,
  	S.PRODUCT_NAME
  FROM PRODUCT_REVIEW M,
  	(SELECT PRODUCT_CODE, PRODUCT_NAME FROM PRODUCT) S
  WHERE M.PRODUCT_CODE = S.PRODUCT_CODE;
  ```

- WHERE, HAVING 절에 사용할 수 있는 **중첩 서브쿼리**

  - 비연관 서브쿼리: 메인 쿼리와 관계 맺지 않음.
  - 연관 서브쿼리: 메인 쿼리와 관계 맺음.
  - 단일 행 서브쿼리, 다중 행 서브쿼리, 다중 컬럼 서브쿼리

### 집합 연산자

- UNION/UNION ALL: 쿼리 결과 합치기

  - UNION은 중복 제외. UNION ALL은 중복 포함

- UNTERSECT
- EXCEPT(MNUS)

### 그룹 함수

GROUP BY하여 나타낼 수 있는 데이터를 구하는 함수

- COUNT, SUM, AVG, MAX, MIN

- ROLLUP: 그룹핑 및 총합계 계산

  ```sql
  SELECT ORDER_DATE, ORDER_ITEM, COUNT(*)
  	FROM COFFEE_ORDER
  GROUP BY ROLLUP(ORDER_DATE, ORDER_ITEM)	# 주문음료별로 그룹핑 + 날짜별로 그룹핑 + 총합계
  ORDER BY ORDER_DATE;
  ```

- CUBE: 조합할 수 있는 모든 그룹에 대한 소계 집계

  ```sql
  CUBE(A,B)	# A,B로 그룹핑 + A로 그룹핑 + B로 그룹핑 + 총합계
  ```

- GROUPING SETS

  ```sql
  GROUPING SETS(A,B)	# A로 그룹핑 + B로 그룹핑
  GROUPING SETS(A,B,())	# A로 그룹핑 + B로 그룹핑 + 총합계
  ```

### 윈도우 함수

[window functions.md](../../../Backend/MySQL/window functions.md)

### Top N 쿼리

- Oracle의 ROWNUM 활용
- ROW_NUMBER, RANK, DENSE_RANK 함수 사용

  ```sql
  SELECT * FROM
  	(SELECT ROW_NUMBER() OVER(ORDER BY 국어 DESC, 영어 DESC, 수학 DESC) AS RNUM FROM EXAM_SCORE) AS RNUM
  WHERE RNUM <= 5;
  ```

- ORDER BY + LIMIT 사용

### 계층형 질의와 셀프 조인

- 계층 쿼리

  ```sql
  SELECT LEVEL,
  	SYS_CONNECT_BY_PATH("[" || CATEGORY_TYPE || "]" || CATEGORY_NAME, "-") AS PATH
  FROM CATEGORY
  START WITH PARENT_CATEGORY IS NULL
  CONNECT BY PRIOR CATEGORY_NAME = PARENT_CATEGORY;
  ```

### PIVOT 절과 UNPIVOT 절

-

### 정규 표현식

-

## 5. 관리 구문

### DML(Data Manipulation Language)

- INSERT, DELETE, UPDATE: 새로운 데이터 추가, 특정 데이터 삭제 및 수정

  ```sql
  INSERT INTO Students(name, age) VALUES('sona', 25);  # 컬럼명 명시하지 않으면, 전체 컬럼 모두 삽입해야함.
  UPDATE Students SET status="화석" WHERE age > 25;
  DELETE FROM Students WHERE status="졸업"; # WHERE 생략 시 모든 row 삭제
  ```

  - 별도의 COMMIT 명령어를 실행시켜 주어야 데이터가 반영되며, ROLLBACK 가능

- MERGE: 테이블에 변경 작업을 한 번에 할 수 있도록 해주는 명령어

  ```sql
  # 백업 테이블에 데이터를 동기화시켜주기
  MERGE
  	INTO Students_backup SB
  	USING Students S
  	ON SB.STUDENT_ID = S.STUDENT_ID
  	WHEN MATCHED THEN
  		UPDATE SET SB.NAME = S.NAME, SB.AGE = S.AGE
  	WHEN NOT MATCHED THEN
  		INSERT (SB.STUDENT_ID, SB.NAME, SB.AGE) VALUES (S.STUDENT_ID, S.NAME, S.AGE)
  ```

### TCL(Transaction Control Language)

- COMMIT, ROLLBACK: DML에 의해 조작된 결과를 **트랜잭션(작업 단위)별**로 제어
- SAVEPOINT: ROLLBACK을 수행할 때 전체 작업을 다 되돌리지 않고 일부만 되돌릴 수 있게 하는 기능.
  - 만약 트랜잭션 중간에 SAVEPOINT 지정 시, 하위 트랜잭션이 생성되고 해당 트랜잭션 단위로 ROLLBACK 된다.

### DDL(Data Definition Language)

- CREATE, ALTER, DROP, RENAME: 데이터 구조를 정의하는데 사용

  ```sql
  CREATE TABLE Students (
  	STUDENT_ID	NUMBER NOT NULL,
    NAME				VARCHAR2(20) NOT NULL,
    AGE					NUMBER
    GENDER			VARCHAR2(20)
    CONSTRAINT STUDENT_PK PRIMARY KEY (STUDENT_ID) # 제약조건 설정
    CONSTRAINT CHK_GENDER CHECK(GENDER IN('MALE','FEMALE'))
  )
  CREATE TABLE Students AS SELECT * FROM Students_Backup; # 테이블 복사 + 단, 제약조건은 초기화
  ```

  - 참조 무결성 관련: CASCADE, SET NULL, SET DEFAULT, RESTRICT, NO ACTION

  ```sql
  ALTER TABLE Students ADD BIRTHDAY VARCHAR2(8);
  ALTER TABLE Students DROP COLUMN AGE;
  ALTER TABLE Students MODIFY (BIRTHDAY VARCHAR2(8) DEFAULT '999999' NOT NULL);
  ALTER TABLE Students RENAME COLUMN STUDENT_ID TO S_ID;
  ALTER TABLE Students ADD CONSTRAINT STUDENT_FK FOREIGN KEY (SUBJECT_ID) REFERENCES SUBJECT(SUBJECT_ID);
  DROP TABLE Students [CASCADE CONSTRAINT];  # 해당 테이블을 누가 참조중이면 삭제불가. 연결 끊을라면 CASCADE CONSTRAINT
  ```

- TRUNCATE: 테이블 데이터를 전부 삭제하고 컬럼값만 남겨둔다.

  - 별도의 로그를 쌓지 않아서 ROLLBACK이 불가
  - 데이터가 삭제되는 수행 속도가 비교적 빠른 편.
  - DROP은 테이블을 아예 삭제하고, DELETE은 데이터 모두 삭제하되 디스크 상 공간은 그대로 냅둬서 저장공간 재사용

### DCL(Data Control Language)

- CREATE USER, ALTER USER, DROP USER

  ```sql
  CREATE USER sona IDENTIFIED BY pw123;
  ALTER USER sona IDENTIFIED BY pw123;
  DROP USER sona;
  ```

- GRANT, REVOKE: 데이터베이스 접근 권한 부여 및 회수

  ```sql
  GRANT ALL ON Student TO sona;
  GRANT CREATE TABLE TO sona;
  REVOKE CREATE USER FROM sona;
  ```

- Role

  ```sql
  CREATE ROLE CREATE_R;
  GRANT CREATE SESSION, CREATE USER, CREATE TABLE TO CREATE_R;
  GRANT CREATE_R TO sona;
  ```

### DQL(Data Query Language)

- SELECT(RETREIVE): 데이터 조회 및 검색
