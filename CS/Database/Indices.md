# Indices

### 5.1 기본 개념

- 색인(indices) : 데이터에 신속하게 접근하도록 도와주는 도구
  - 정렬 색인 : 색인 레코드가 탐색키 기준으로 정렬
  - 해쉬 색인 : 탐색키를 정렬하지 않는 자료 구조
- 색인 평가 요소
  - Query Type - Exact match query(특정 값 일치하는지?) or Range query(일정 범위에 속하는지?)
  - Access time. Insertion time. Deletion time. Space overhead
- Ordered Index(정렬 색인)
  - **색인 레코드가 정렬되어 저장**되는 색인 구조
  - Primary index or Secondary index
  - Dense index or Sparse Index
- Primary index(주 색인)
  - clustering index
  - 색인이 정렬되어 있는 순서와 동일하게 데이터 레코드를 정렬하여 데이터 파일을 저장하는 구조.
  - 색인은 데이터 파일 당 최대 한 개가 존재한다.
- Secondary index(이차 색인)
  - non-clustering index
  - 색인은 정렬되어 있지만 데이터 레코드는 정렬되지 않는 구조
  - 색인은 동일 데이터 파일에 대해 다수가 존재할 수 있다.
  - 색인 레코드 순서와 데이터 레코드 순서가 다르기 때문에 반드시 Dense index 형태가 되어야한다.
  - Sequential scan, 즉 데이터 파일를 전체 탐색하는 연산은 이차 색인에서 굉장히 비효율적임
- Dense Index(밀집 색인)
  - **모든 탐색키 값**에 대하여 색인 레코드 혹은 엔트리가 색인에 존재하는 경우
- Sparse Index(희소 색인)
  - **일부분의** **탐색키 값**에 대해서만 색인 엔트리가 색인에 존재하는 경우
  - 데이터가 탐색키 기준으로 무조건 정렬이 되어있어야한다.
  - 밀집 색인에 비해 공간은 적게 차지하나. 레코드 검색 시간이 더걸린다.
  - 파일 레코드가 검색키 기준으로 정렬되어있는 경우, 희소 색인을 블록에 속하는 레코드의 가장 적은 값으로 구성하게 되면 희소 색인의 약점(검색 시간이 느림) 을 보완할 수 있다…??
- Multilevel index(다단계 색인)
  - 색인 파일을 대상으로 한단계 상위 색인을 또 구성하는 경우
  - inner 색인와 outer 색인
  - inner 색인을 primary 로 구성하면 데이터 레코드도 정렬되므로 inner 색인은 희소 색인으로 구성한다?
  - outer 색인은 희소 색인으로 구성
  - 데이터 모두 블록 처리
- 색인 갱신
  - 삭제
  - 색인

### 5.2 B+ tree index

- B+ 트리 색인

  - B-tree 색인군(B, B+, B*) 중에 가장 많이 쓰인다.
  - 루트에서 모든 리프 노드까지의 길이가 동일하다.

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dfd4182c-59df-47ef-a5c2-37fb08efe240/Untitled.png)

  - n 은 색인 노드가 가질 수 있는 최대 포인터 개수
  - 루트 노드 + 내부 노드(internal) + 리프 노드(leaf)
  - 루트와 내부 노드는 Sparse Index, 리프 노드는 Dense Index
  - 내부 노드는 포인터에 대한 개수 제약
  - 리프 노드는 탐색 값에 대한 개수 제약
  - 색인 노드는 탐색키 기준으로 정렬이 되어있으나. 데이터 파일은 탐색키 기준으로 정렬되어있지 않음

- B+ tree 를 왜 쓸까?

  - B+ tree 노드의 크기는 데이터 블록 크기와 동일하다 → 4K. 8K. 16K
  - 블록 크기 = 4K & 탐색키 크기 = 40bytes 일 경우 → n = 100
  - n= 100 & 탐색키 개수 = 100만개 → level(height) = [log50(1,000,000) = 4
  - 즉 4번만에 디스크 접근이 가능해진다. 검색 속도 겁나 빨라
  - n = 4 & level = 4 → 최대 허용가능한 탐색키 개수 = 6,250,000개
  - 즉 6,250,000개 이하의 탐색키 값은 디스크 접근 4번만에 레코드 검색 가능

- B+ tree 검색

- B+ tree 삽입

- B+ tree 제거

  - underflow 처리 → merge 하거나 재분배

- Non-Unique Search key

  - 동일키 값을 가지는 터플이 여러개 존재하는 경우 → 주키가 아닌 속성에 대해 B+tree 를 구성하는 경우
  - 삭제에 대한 비효율성과 중복 검색 키로 인해 여러 문제점 발생한다.
  - Unique 값(RID)를 키 값에 병기하여 unique key를 만드는 기법 사용

### 5.3 B+ tree Variations

- B+ tree 파일 구성

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15982421-78ca-486b-97d2-9338b07c59cd/Untitled.png)

  - 리프 노트에 탐색키-포인터 쌍을 저장하는게 아니라. 데이터 레코드 자체를 저장하는 방식이다.
  - Leaf nodes are still required to be half full : 리프 노드는 반정도 공간을 적어도 사용해야한다는 비쁠 트리 노드 원칙을 준수할 수 있다
  - 리프 노드의 **공간 활용도(Space Utilization)** 중요
  - 노드가 분해될때 한 노드가 단순히 2개로 분해되는게 아니라. 한 노드가 분해된 두 노드와 sibling 노드 하나, 즉 3개의 노드 간에 엔트리 재분배가 수행된다. → 각 노드에 [2*n/3] 엔트리가 존재하게 된다.
  - 레코드 위치가 변경되면 이를 참조하는 모든 색인 엔트리를 변경해야한다 → Primary index search key 값을 저장…

- Search key가 string 타입이라면?

  - 스트링의 앞부분(prefix) 만 저장해서 내부 노드의 fanout 해결

- Bulk loading

  - 데이터 입력할때마다 색인에 새롭게 입력된 데이터를 반영하면 색인에 대한 디스크 접근 횟수 많아서 비효율적
  - 해결
    - 데이터 입력 및 sort → 색인 구성
    - sort → leaf level 부터 B+tree를 만들어간다(bottom-up)

- B tree index

  - leaf, non-leaf 노드 모두 데이터에 대한 포인터를 가진다.
  - **탐색 키가 트리에 오직 한번만 존재해야한다.**
  - 구현하기 어렵고. 트리 level 이 더 깊어질 가능성 있음. 거의 안쓴다

- Indices on Multiple Attributes(다중 색인)

  - 여러개의 속성에 대한 색인
  - (a1,a2) < (b1,b2)
    - a1, 즉 첫번째 값에만 exact match 형태여야 효과적임

- Covering Indices

  - 색인 엔트리에 탐색 키 외의 다른 속성 값을 함께 저장하는 방식

### 5.4 Static Hash(정적 해쉬)

- 해쉬 파일 구조
  - bucket : 하나 또는 여러개의 레코드를 갖는 storage 단위. disk block
  - 탐색키가 달라도 해쉬 값이 같으면 같은 버킷에 들어갈 수 있다
  - Hash function : search-key 를 bucket address 로 변환하는 함수
    - uniform → 각 버킷은 같은 개수의 탐색키 값을 갖고 있는게 이상적
    - random → 각 버킷은 같은 개수의 레코드를 갖고 있는게 이상적
- Bucket Overflow
  - 원인
    - 버킷 개수가 부족하거나
    - 레코드 분배에 skew가 발생했을때
  - 해결
    - Overflow chaining(Closed hashing) : overflow 버킷을 생성 후 linked list로 연결. 검색 시간 및 차지하는 공간 증가
    - Opened hasing : 버킷 개수를 일정 수 유지. overflow 발생시 다음 순번 버킷에 저장 하거나(linear probing), 2차 해쉬 함수로 재해쉬하여 새로운 버킷 주소 찾기(rehash). 시간 오래걸리나 공간 증가 X
  - Hash Indices(해쉬 색인)
    - 해쉬를 사용하여 색인을 구성
    - Secondary Index 사용. → 레코드 순서 ≠ 해쉬 버킷 내 탐색키 순서
- Static Hashing 단점
  - 해쉬 함수의 range가 항상 일정. 즉 해쉬값 정해지면 변하지 않음
  - 데이터베이스 크기가 계속 증가/감소 하는 구조면 overflow, underflow 가 빈번하게 발생하기 때문에 적절한 방법이 아니다.
  - 상황에 따라 해쉬 함수가 동적으로 변화하는 기능이 요구됩니당

### 5.5 Dynamic Hash(동적 해쉬)

- 데이터 삽입, 삭제, 수정 으로 인해 데이터베이스의 크기는 항상 변화한다

- 이에 적합한 색인 구조가 해쉬 함수가 동적으로 변화하는 동적 해쉬.

- Extendable Hash(확장 해쉬)

  - 버킷 주소 테이블과 다수개의 버킷을 운영
  - 버킷에 실제 레코드가 위치하는 파일 구조
  - 레코드가 위치하는 버킷이 2개의 버킷으로 분해되거나 2개가 하나로 병합되기도 한다.
  - 해쉬 값 중 i개의 bit(prefix) 를 사용하여 버킷 주소를 결정하고. 버킷 주소 테이블은 i 값을 유지해야한다.

- 확장 해쉬 구조

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/62bf0609-477c-444d-980b-5cd790bb513c/Untitled.png)

  - prefix = 해쉬 함수 값 중 앞에서부터 몇개의 비트를 사용할지

- 삽입 연산

  - 버킷 공간 있으면 레코드 삽입

  - 버킷 공간 없으면 bucket split

    - [버킷 주소 테이블 prefix] > [버킷 prefix] → split 해도 버킷 주소 테이블의 크기는 변화하지 않는다

      ![스크린샷 2022-12-11 18.06.08.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9f267553-4d5c-48fe-9c37-b98e13467197/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-11_18.06.08.png)

    - [버킷 주소 테이블 prefix] = [버킷 prefix] → split 하고 버킷 주소 테이블 prefix, 즉 i 값도 증가 시켜줘야한다.

    - split 해도 해결되지 않는다면 overflow chaining을 사용

- 삭제 연산

  - 버디 버킷과 병합
  - 버디 버킷 : have same value of ij and same ij-1 prefix….???

- 확장 해쉬 장단점

  - 장점
    - 파일 크기 증가에 의한 성능 저하가 없음
    - space overehead 적음. 공간 활용도 좋음
  - 단점
    - 레코드 찾기 위해 indirection 하는 경우 발생
    - 버킷 주소 테이블 자체가 방대해질 수 있ㅇ,ㅁ
    - 이를 기반으로 Linear hashing 도 탄생
  - Exact match 에는 좋으나 Range query 에는 쓰지 않음

### 5.6 Bitmap indices(비트맵 색인)

- 비트맵 색인

  - multiple keys, 탐색키 값이 많지 않은 경우(ex. 성별, 지역 등) 효과적
  - 값이 많을 경우 → range 생성

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/58295521-70d9-4ec8-82b4-fb10ae0f5dd1/Untitled.png)

- 비트맵 색인 특징

  - 다중 속성에 대한 질의를 효율적으로 처리 가능
  - 색인 크기가 데이터 크기에 비해 현저하게 적다. 공간 오버헤드가 적음
  - 결론은 비트맵 연산 겁나 빠름
  - 하지만 터플 삭제시.. 비트맵 재생성해야해서 비효율적임.
  - 이를 해결하기 위해 Existence bitmap 을 사용