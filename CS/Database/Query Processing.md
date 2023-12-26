# Query Processing

### 6.1 Overview

- 질의 처리 단계

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/652240fa-0442-4aaa-8b0a-a787482bf54f/Untitled.png)

  - 파싱 및 번역 단계 (Parsing and Translation)
    - 구문 검사, 속성 및 관계명 확인, 데이터 타입 검사, 권한 검사 등
    - SQL 문장을 내부적으로 처리하기 용이한 형태로 변환
    - 뷰를 해당 정의 표현으로 대치
  - 최적화 단계 (Optimization)
    - relational-algebra-like(관계대수) 표현을 실행하는 plan 중 **최적의 plan** 을 구한다 → execution plan
    - 메타 데이터인 catalog 참조
  - 평가 단계 (Evaluation)
    - execution plan 을 실행해서 주어진 질의문에 대한 결과를 구한다
    - Database 접근

- **질의 최적화(Query Optimization)**

  - 질의문을 처리하는 다수개의 수행 방식이 존재한다. → 각 수행 비용 예측
  - 예측에 통계 자료(카탈로그에 저장) 활용. 중간 결과치 예측 등
  - 최종 execution plan 에는 **연산 처리 방법에 대한 주석**이 병기되어있음

- 질의 비용(Query Cost)

  - 질의 결과를 구하는 데 필요한 시간 = total elapsed time

  - 디스크 접근

    이 가장 오래걸려서 중요한 요소 (seek, read, write 등..)

    - tT = 하나의 블록을 전달하는데 걸리는 시간
    - tS = 탐색 시간 → 훨씬 더 오래걸림

  - buffer space 를 사용하여 disk I/O 성능을 더 높일수 있지만. 이는 우리가 예측할 수 있는 영역이 아니기 때문에 일단 worst case 대상으로 분석하자

### 6.2 Selection Operation(선택 연산 수행 방법)

- Linear Search(선형 탐색)
  - 전체 관계를 처음부터 끝까지 모두 스캔
  - 한번의 탐색 이후 block 개수만큼 transfer
  - cost = 탐색 시간 + 전체 데이터 블록 전송 시간 = br * tT + tS
  - 환경에 영향 받지 않지만. 시간이 많이 소요된다
- Primary Index + Equality on Key (Exact match)
  - **B+ 트리** 탐색 이후 리프 노드에서 데이터 노드 탐색
  - cost = 트리 Root 노드에서 데이터 노드까지 탐색 시간 x 데이터 탐색 및 전송 시간 = (height + 1) * (tT + tS)
- Primary Index + Equality on nonkey (비교 연산)
  - consecutive blocks
    - 조건을 만족하는 레코드에 대한 포인터를 리프 노드에서 탐색하여 데이터 페이지 검색
  - primary index 는 탐색키 순서로 데이터 정렬되어있으므로 탐색 시간 1번
  - `cost = [tree 높이] * (tT + tS) + tS + tT * b`
  - b는 조건에 맞는 레코드에 포함되어있는 블록 수..
- Secondary Index + Equality on nonkey
  - 탐색키에 대응되는 레코드가 하나면 리프 노드에서 데이터 노드를 탐색하여 조건을 만족하는 터플을 가져온다
  - 탐색하는 레코드가 여러개면 안쓰는게 낫다?
- Primary index + Comparison
- Secondary index + Comparison
- Conjunction
- Disjunction

### 6.3 Sorting

- External Sort-merge

  ![스크린샷 2022-12-11 20.06.12.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a903515e-a225-4e0c-9102-567db3a5c5e7/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-11_20.06.12.png)

  - 메모리 크기 만큼 데이터를 메모리에 적재하여 부분적으로 정렬 → 이를 병합하여 최종 병렬하는 방식

  - sorted run 생성 → 메모리에 M block 씩 데이터 불러오기(읽기) → in-memory sort → 정렬된 데이터를 디스크에 넣기 → merge runs

  - M = memory size. N = run 개수 일때 merge

    - M > N : 메모리에 run 일부분이 동시에 적재 가능하다. 각 run에서 블록 단위로 메모리에 적재하고, 메모리에 적재된 블록을 대상으로 병합하는 연산을 수행. 최종 정렬 데이터를 하나의 output 블록에 할당.   그니까 하나의 run에 들어가는 데이터가 많아진다는 뜻인가?
    - M ≤ N : 각 pass 마다 **(M-1)개씩** run으로 묶고 정렬 후 merge.

  - Cost

    - Block transfer

      - 초기 run 생성할때 모든 블럭을 읽고 쓰니까 2*b(r)

      - 병합을 위한 pass 횟수 = [log(M-1)(b(r)/M)]

      - total = 2

        b(r)

        ( [log(M-1)(b(r)/M)]+1 ) - b(r) = 

        b(r)*( [log(M-1)(b(r)/M)]+1 )

        - 마지막 pass의 write는 측정하지 않는다.

    - Seek

      - 초기 run 생성할때 메모리 크기만큼 데이터 읽고 쓰니까 2*[b(r)/M]
      - 병합 단계에서 buffer 단위로 탐색. 각 패스마다 2*[b(r)/b(b)] 탐색
      - total = **2\*[b(r)/M] + [b(r)/b(b)]\*( 2\*[log(M-1)(b(r)/M)] -1 )**

    - 예시….

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/856e570c-7b13-4e07-8db0-76ab08970632/Untitled.png)

### 6.4 Join

- Nested-Loop Join

  - 각 튜플의 모든 조합에 대해 조건을 비교하는 방법
  - worst case = n(r) * b(s) + b(r) transfer + n(r) + b(r) seek
  - best case = br + bs transfer + 2 seek
    - 메인 메모리에 모두 올라갈 수 있는 경우

- Block Nested-Loop Join

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0d151fd2-334d-4348-85fe-4c3fa568bcda/Untitled.png)

  - 블록 단위로 조인 연산. 각 블록 내의 각 터플에 대하여 비교하는 방식
  - worst case = b(r) * b(s) + b(r) transfer + 2*b(r) seek
  - best case = b(r) + b(s) transfer + 2 seek
  - 향상 시키기
    - outer table에 메모리를 더 할당시키면 좋다. (M-2) 블록을 외부 테이블 블록에 적재
    - 내부 테이블 접근을 양 방향으로 하여 버퍼에 남아있는 내부 테이블 블록 재활용

- Indexed Nested-Loop Join

  - Equi Join or Natural Join 에 가능. Inner table에 색인이 존재하는 경우에 가능하다

  - worst case

    = 외부 테이블 블럭 개수만큼 디스크 연산 + 내부 테이블 개수만큼 색인 검색

    = b(r) * (t(T) + t(S)) + n(r) * c

  - 적은 테이블을 outer table 로 두는 것이 유리하다. (잘못하면 block-nested 보다 느릴수도)

    - Seek 비용 >> Transfer 비용

- Merge Join

  - Equi Join. Natural Join 가능. 비교 연산 있으면 안돼..
  - 테이블 **모두 정렬 되어있어야** 사용 가능 → external join-merge 사용하여 미리 정렬
  - 조인 테이블을 한번만 읽어도 된다. good
  - cost = b(r) + b(s) transfer + [b(r)/b(b)] + [b(s)/b(b)] seek (테이블 순차적으로 존재하는 경우) + sort cost
  - Hybrid Merge Join = 정렬 테이블 + 비정렬 테이블인데 B+ tree
    - 정렬 테이블과 비정렬 테이블의 리프 노드에 존재하는 엔트리와 merge → 결과 테이블을 RID 기준으로 정렬 → 결과 테이블 순차적으로 읽으면서 리프노드 포인터 값과 실제 레코드값 변경..

- Hash Join

  - Equi Join. Natural Join 가능
  - 조인 테이블을 해쉬 함수를 사용하여 다수개의 분할(partition)으로 분해하고 동등한 해쉬 값을 가지는 partition 간에 조인 연산 수행
  - 각 분할 간의 조인은 해쉬 함수 사용하는 indexed nested-loop join 사용
  - 2개의 relation 분리
    - **build input의 모든 partition**을  메모리에 적재하고 메모리 내에서 해쉬 색인을 구성.
    - probe input 의 partition에서 튜플을 읽어 메모리에서 해쉬 색인 사용하여 조인 조건 검사 후 결과 터플 형성
  - b(r) + b(s) transfer
  - build input relation 의 partition 개수인 n은 [b(s)/M] 와 동일하면 이론적으로 가능하지만 데이터 분포의 불확실성 고려하여 값 설정
  - partition이 skew 되어 빌드 입력 테이블의 모든 분할이 메모리에 적재 되지 못하면 → overflow
    - 다른 해쉬 함수 사용해서 partition 또 해서 해결하거나
    - partition 아주 잘게잘게 해서.. 나중에 combine 해서 해결하거나
  - Reculsive partitioning
    - 분할의 개수(n)가 너무 커서 메모리 블록 수보다 크면 재귀적 분할..
  - Cost

- Complex Joins

  - conjunctive condition → block nested loop
  - disjunctive condition → block nested loop

### 6.5 Other Operations

- Duplicate Elimination(중복 제거) : hashing/sort 사용. 전체 scan 해야해서 시간 오래걸림
- Projection
- Aggregation : hasing/sort 사용
- Set : sort → merge 하거나 hash join
- Outer Join : null-padded or join algorithms 수정

### 6.6 Evaluation of Expressions(수식 평가)

- materialization(수식화)
  - 표현식의 각 연산을 낮은 단계부터 하나씩 평가하는 방식. 중간 결과 관계를 임시 관계로 저장하고 다음 단계에서 이를 사용
  - cost = sum(각 연산의 비용) + 중간 결과치를 디스크에 쓰는 비용
  - Double buffering : 2개의 버퍼 사용. 한 버퍼 값을 디스크에 쓰는 동안 다른 버퍼가 중간 데이터 저장 → 디스크 쓰기와 연산 작업을 병행 가능
- pipelining(파이프라이닝)
  - 연산 수행 중에 한 연산의 결과를 다른 연산의 입력으로 전달하면서 동시에 다수의 연산을 수행하는 방식
  - 중간 결과를 디스크에 읽고 쓰지 않으므로 절약.
  - 하지만 모든 연산에는 사용 불가능(sort, hash, merge 등 불가능)
  - Demand-driven pipeline
    - pull model. lazy pipelining
    - 상위 연산자가 하위 연산자에게 데이터 요구. state 유지해야함
    - open()/next()/close()
  - Producer-driven pipeline
    - push model. eager pipeling
    - 하위 연산자가 상위 연산자에게 푸쉬. 중간에 buffer