# GraphQL 사용법

GraphQL 기반으로 API를 만들어보자.

## Type

- Scarlar Type
  - 내장되어 있는 Type
  - String, Int, Boolean, **ID** 


## Query and Mutation

- Query

  ```
  query {
  
  }
  ```

- Mutation

  ```
  mutation {
  
  }
  ```

## Non nullable Field

```
type Query {
	tweet(id:ID) : Tweet
}
```

위처럼 작성하면 자동으로 nullable이 된다. 

그래서 `ID!` 로 작성하면 id값을 반드시 null이 아닌 값으로 전달해야 한다.

> typescript에서 require하지 않은 값에 ?를 붙여주는 개념과 딱 반대인 것 같다. 근데 이렇게 되면 느낌표 남발일 것 같은데 .. 굳이 ? 