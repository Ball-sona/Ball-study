# Client

Apollo Client 설치

## Caching

## Reading and Writing data to the cache

 Apollo Client에서 서버로부터 fetch 받은 캐시 데이터를 읽거나 수정할 수 있다. GraphQL 서버와 따로 통신하지 않고도 데이터를 조작할 수 있으나, 해당 데이터는 오직 local에서만 유효하다는 것을 알아두자. (즉 서버에 반영 안됨)

### Using Queries

우리가 서버와 통신할 때 사용하는 `query` 와 유사한 형태의 GraphQL Query를 이용해 캐시 데이터를 읽거나 수정할 수 있다.

- `readQuery`  : 캐시 읽기. 만약 요청한 데이터가 캐시에 없다면 `null` 을 반환한다. (절대 서버에 요청하지 않음!) 

  ```js
  const READ_TODO = gql`
  	query($id:ID!) {
  		todo(id:$id) {
  			id
  			text
  			completed
  		}
  	}
  `
  const {todo} = client.readQuery({
  	query: READ_TODO,
    variables : {id:5}
  })
  ```

- `writeQuery` : 캐시 수정하기. 이때 사용되는 query는 GraphQL 서버의 스키마에 구애받지 않는다. 즉 스키마 필드에 없는 값을 캐시에 넣어도 오류가 발생하지는 않지만, 그런 짓은 (되도록이면) 하지 말자.

  ```js
  const MODIFY_DATA = gql`
  	query ($id:Int!) {
  		todo(id:$id) {
  			id
  			text
  			completed
  		}
  	}
  `
  
  client.writeQuery({
  	query: MODIFY_DATA,
  	data : {
  		todo : {
  			__typename: 'Todo',
  			id:5,
  			text: 'Study GraphQL',
  			completed: true
  		}
  	},
    variables: { id:5 }
  })
  ```

  위 예시는 캐시된 `Todo` 객체에서 id값이 5인 todo의 데이터를 변경할 것이다. 

### Using Fragments

GraphQL Fragment는 정규화된 캐시 객체 데이터를 읽고 쓸 수 있도록 한다.

ReadQuery/WriteQuery 보다 랜덤 액세스를 허용한다?

- `readFragment `: 캐시 읽기

  ```
  const data = client.readFragment({
  	id:'Todo:5' // <__typename>:<id> 형태
  	fragment: gql`
  		fragment MyTodo on Todo {
  			id
  			text
  			completed
  		}
  	`
  })
  ```

- `writeFragment` : 캐시 수정하기. ~~`writeQuery` 와 다르게, 일부 데이터만 수정할 수 있다.~~

  ```
  client.writeFragment({
  	id:'Todo:5' // <__typename>:<id> 형태
  	fragment: gql`
  		fragment MyTodo on Todo {
  			completed
  		}
  	`,
  	data: {
  		completed:true,
  	}
  })
  ```

  

### Directly Modifying Cache Fields