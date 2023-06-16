# GraphQL

페이스북에서 만든 쿼리 언어

## GraphQL 이란?

SQL(Structed Query Langauge)와 같은 쿼리 언어이지만, 언어적 구조나 목적도 다르다. SQL은 데이터베이스에 저장되어 있는 데이터를 효율적으로 가져오는 것이 목적이고, GQL(Graph QL)은 클라이언트가 데이터를 서버로부터 효율적으로 가져오는 것이 목적이다. 

- graphQL 인터페이스 간 송수신은 네트워크 레이어의 HTTP POST 메서드와 웹소켓 프로토콜을 활용

## REST API와의 차이

REST API는 메서드(GET, POST 등) 와 url을 조합하기 때문에 다양한 EndPoint가 존재하지만, GraphQL은 오직 **하나의 EndPoint** 가 존재한다. 

또 GraphQL API에서 불러오는 데이터의 종류를 **쿼리 조합**을 통해 결정한다. 

이러한 구조를 통해 GraphQL API를 사용하면 한번의 네트워크 호출로 다양한 데이터 처리를 진행할 수 있다. 