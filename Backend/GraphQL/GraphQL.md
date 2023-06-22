# GraphQL

페이스북에서 만든 데이터 질의(Query) 언어이다. 

## GraphQL 이란?

SQL(Structed Query Langauge)와 같은 쿼리 언어이지만, 언어적 구조나 목적도 다르다. SQL은 데이터베이스에 저장되어 있는 데이터를 효율적으로 가져오는 것이 목적이고, GQL(Graph QL)은 클라이언트가 데이터를 서버로부터 효율적으로 가져오는 것이 목적이다. 

## REST API vs GraphQL

### EndPoint

REST API는 HTTP 메서드(GET, POST 등) 와 url을 조합하기 때문에 다양한 EndPoint가 존재하지만, GraphQL은 오직 **하나의 EndPoint** 가 존재한다. 

### Over fetching

REST API를 쓰다보면 내가 필요한 데이터보다 더 많은 데이터를 받아오게 되는 경우가 있다. 즉 클라이언트의 데이터 사용 여부와 관계없이 서버에서 주는 대로 데이터를 받아오게 되는 것이다. 

이를 해결하기 위해 GraphQL에서는 URL로 데이터를 요청하는 것이 아니라, 클라이언트 측에서 **필요한 데이터를 명시하여 요청**하도록 설계되어 있다. 

```
{
	hero {
		name
		height
	}
}
```

### Under fetching

반대로 Under-Fetching은 내가 필요한 것보다 데이터를 덜 받게 되는 것을 의미한다. 예를 들어 특정 영화 데이터를 받아서 영화의 장르를 바로 보여주고 싶은데 API에서 장르값을 텍스트가 아닌 id값으로 주고 있는 상태라면, 우리는 장르 API에 해당 id값을 넘겨 텍스트 값을 받아오는 요청을 한번 더 보내야 한다. 즉, 우리가 원하는 데이터 값을 한번에 다 얻지 못하여(under fetching) 여러번 API 요청을 보내게 되는 것이다.

GraphQL은 단 **한번의 API 요청**으로 필요한 데이터를 받아올 수 있기 때문에 이러한 문제점을 해결할 수 있다. 여러 API에 여러 개의 요청을 보낼 필요가 없기 때문에, 느린 모바일 네트워크 환경에서도 GraphQL은 빠르게 동작 가능하다는 장점이 있다. 

```
{
  allFilms{
    films {
      title
    }
  }
  allPeople {
    people {
      name
    }
  }
}
```

### Caching

REST API는 `GET` 을 사용하면 캐싱이 가능하지만, GraphQL에서 캐싱을 하기 위해서는 서버 혹은 클라이언트 개발자가 따로 캐싱 처리를 해주어야 한다. 



## GraphiQL

https://graphql.github.io/swapi-graphql 요기서 GraphQL 쿼리를 테스트 해볼 수 있다. 