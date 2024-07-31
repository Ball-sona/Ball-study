# GraphQL 사용법

GraphQL 기반으로 API를 만들어보자.

## Type

### Scalar Type

- GraphQL 내장되어 있는 type으로, 기본 자료형
- `String` , `Int` , `Float` . `Boolean` , `ID`
- `ID` 는 id값임을 명시적으로 표현하기 위해 사용되는 type으로 내부적으로는 `String` 과 동일하다.

### Object Type

- 여러가지 scalar type을 갖는 필드들을 하나의 객체 형태로 묶은 타입
- typescript의 인터페이스와 문법이 유사 `{key:Type}`

```
type Query {
	allTweets: [Tweet] # Tweet으로 구성된 배열
}

type Tweet {
	id: ID
	text: String
}
```

## Query and Mutation

- Query

  ```
  query {

  }
  ```

  - `query` 는 생략 가능

- Mutation

  ```
  mutation {

  }
  ```

  - `mutation` 은 반드시 붙여줘야 한다.

## Non nullable Field

기본적으로 GraphQL은 필드값으로 `null` 값을 허용한다.

따라서 만약 특정 필드값에 `null`을 허용해주고 싶지 않다면 스칼라 타입 뒤에 `!` 을 붙이면 된다.

```
type Example {
  case1: String!
  case2: [String!]
  case3: [String]!
  case4: [String!]!
}
```

- case1은 반드시 `String` 값을 가져야함.
- case2는 `String` 값으로 구성된 배열이거나 `null` 일 수 있음.
- case3은 `String` 혹은 `null` 값으로 구성된 배열이어야함.
- case4는 반드시 `String` 으로 구성된 배열이어야함.

## Cache
