# Elastic search

### Elastic Stack 

- Elasticsearch + Logstash + Kibana

- Elasticsearch 

  - 더그 커팅이 개발한 루씬 기반 
  - 모든 데이터를 색인하여 저장하고 검색하고 검색 및 집계 등을 수행하며 결과를 클라이언트 또는 다른 프로그램으로 전달하여 동작한다. 
  - 뛰어난 검색 능력과 대규모 분산 시스템 구축 
  - 전문 검색(Full Text Search) 기능 -> 모든 데이터를 역파일 색인(Inverted file index) 구조로 저장하여 가공된 텍스트를 검색. JSON 문서 기반으로 사용자 직관적 이해 가능

  - 실시간 분석 시스템 -> 하둡과 달리 클러스터가 실행되고 있는 동안에 데이터가 색인(indexing) 되고 이와 동시에 실시간에 가까운 속도로 색인된 데이터의 검색 및 집계가 가능하다 
  - RESTful API -> http 프로토콜을 통해 모든 데이터 조회, 입력, 삭제 가능 
  - 멀티테넌시(multitenancy) -> 데이터들은 인덱스라는 논리적인 집합 단위로 구성되며 서로 다른 저장소에 분산되어 저장된다. 서로 다른 인덱스들을 별도의 커넥션 없이 하나의 질의로 묶어서 검색하고, 검색 결과들을 하나의 출력으로 도출 가능

- Logstash

  - 루비 코드로 개발 
  - 데이터 수집을 위한 도구
  - 입력 -> 필터 -> 출력 

- Kibana
  - 엘라스틱 서치가 도출한 문서 및 집계 결과를 가장 쉽게 시각화할 수 있는 도구
  - Discover, Visualize, Dashboard 기본 메뉴..
- Beats
  - Go 코드로 개발 
  - 부피가 큰 Logstash 를 대체하는 데이터 수집기 



### 데이터 색인 

- indexing : 데이터가 검색될 수 있는 구조로 변경하기 위해 원본 문서를 토큰들로 변환하여 저장하는 일련의 과정 
- Index : 색인 과정을 거친 결과물 혹은 이를 저장하는 저장소
- search : 인덱스에 들어가있는 검색어 토큰들이 담긴 문서를 찾아가는 과정 
- query : 사용자가 검색시 입력하는 검색어 혹은 검색 조건 

### Elasticsearch 시스템 구조 

- 엘라스틱 서치는 대용량 데이터의 증가에 따른 스케일 아웃과 데이터 무결성을 유지하기 위해 항상 클러스터를 기본으로 동작한다.

- 클러스터와 노드

  - 클러스터는 하나 이상의 노드로 이루어진다. 

  - 노드들은 클라이언트와의 통신을 위한 http 포트(9200~9299), 노드 간의 데이터 교환을 위한 tcp 포트 (9300~9399) 총 2개의 네트워크 통신을 열어두고 있다

  - cluster.name을 통일하면 여러 노드를 하나의 클러스터로 묶을 수 있음

  - 하나의 물리서버에서 총 2개의 클러스터를 실행하는 경우 예시

    <img width="475" alt="스크린샷 2022-12-07 01 44 37" src="https://user-images.githubusercontent.com/67703882/205971551-0a8f7ddc-6120-4831-b311-476a83fabf37.png">

- 인덱스와 샤드

  - 인덱스는 샤드(shard) 라는 단위로 분리되고 각 노드에 분산이 되어 저장된다. 
  - 샤드는 루씬의 단일 인스턴스

  <img width="478" alt="스크린샷 2022-12-07 01 40 31" src="https://user-images.githubusercontent.com/67703882/205970666-73d59048-7164-487a-8152-9a7d7e0f51e4.png">

- 마스터 노드와 데이터 노드

  <img width="485" alt="스크린샷 2022-12-07 01 43 29" src="https://user-images.githubusercontent.com/67703882/205971329-d72bb740-183a-4d54-9170-6e2ddda6f197.png">

  - 마스터 노드 : 인덱스의 메타 데이터, 샤드 위치 같은 클러스터 상태 정보 관리

  - 데이터 노드 : 실제 색인된 데이터 저장

    

### Elasticsearch 데이터 처리 

- 도큐먼트 접근하려면 _doc 사용 

- 입력 

  ```c
  PUT my_index/_doc/1
  '{ "message": "안녕하세요 Elasticsearch"}'
  ```

  - 기존 도큐먼트가 덮어씌워지는 걸 방지하려면 _doc 말고 _create 사용 
  - _update 하면 원하는 필드 내용만 업데이트 

- 조회 

  ```c
  GET my_index/_doc/1
  ```

- 삭제 

- 검색 자ㅋ



- bulk API



참고

https://esbook.kimjmin.net/

https://dorothy-koo.gitbooks.io/elasticsearch/content/