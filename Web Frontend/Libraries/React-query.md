# React-query

Fetch, cache and update data in your React and React Native applications all without touching any 'global state'

## 왜 사용할까?

Redux 같은 기존 상태관리 라이브러리들은 클라이언트 상태 관리에는 적합하지만, 비동기나 서버 상태 작업에는 적합하지 않았다. 따라서 기존 상태관리 라이브러리를 사용해서 서버 데이터를 관리하게 되면, store에 클라이언트 데이터와 서버 데이터가 공존하게 되어 관리가 어려워진다는 문제가 있었다. 

react-query를 사용하면 서버와 클라이언트의 데이터를 분리할 수 있고, 캐싱, 값 업데이트, 에러 핸들링 등 비동기 과정을 더욱 편하게 다룰 수 있다. 

### react-query 장점

- 캐싱을 효율적으로 관리
- get을 한 데이터에 대해 update시 자동으로 get을 다시 수행시킬 수 있다. (예를 들어 게시판의 글을 가져온 후 게시판의 글을 새로 생성하면 get하는 api를 자동으로 실행한다.)
- 데이터가 오래되었다고 판단되면 다시 get 요청
- 동일 데이터를 여러번 요청하면 한번만 요청(중복 호출 허용도 조절 가능)
- 무한 스크롤 구현
- 비동기 과정을 선언적으로 관리 가능
- react hook 과 사용하는 구조가 비슷하다.

## install 

```bash
yarn add react-query
```

## how to use

```tsx
import {
	useQuery,
}

// Create a Client 
const queryClient = new QueryClient();

function App(){
	return (
		<QueryClientProvider client={queryClient}>
			<Todos />
		</QueryClientProvider>
  )
}

function Todos(){
  // Access the client 
  const queryClient = useQueryClient();
  // Query
  const query = useQuery('todos',getTodos);
  // Mutation
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      // invalidate and refetch
      queryClient.invalidateQueries('todos'); 
    }
  })
  return (
  	<ul>{ /** todo list **/ }</ul>
    <button onClick={()=>{
        mutation.mutate({id:Date.now(), title:'Study'})
      }}
    >Add Todo</button>
  )
}
```

### useQuery 

```js
useQuery(queryKey, queryFn?, options?);
```

- 데이터를 get 하기 위한 API (<-> post, update는 `useMutation` 사용)
- 첫번째 파라미터로 unique key가 들어간다. unique key는 문자열이나 배열을 받는데, 만약 값이 배열이라면 첫번째 값은 다른 컴포넌트에서 부를 문자열 값이 들어가고, 두번째 값은 query 함수 내부에 파라미터로 전달될 값이 된다. 
- 두번째 파라미터로 비동기 함수(API 호출 함수)가 들어간다. 반환 값은 API의 성공 및 실패 여부, API return 값을 포함한 객체가 된다. 

- `useQuery` 는 비동기적으로 동작한다. 즉 하나의 컴포넌트 내에 여러개의 `useQuery` 가 있다면 동시에 실행이 된다. 옵션에 `enabled` 를 사용하면 `useQuery` 를 동기적으로 실행 가능하다. (여러개의 비동기 query가 있다면 `useQueries` 를 사용하자)

```ts
const {isLoading, isError, data, error} = useQuery('todo', getTodos, {
  enabled: [value], // value값이 true가 되면 useQuery를 실행 -> 동기적
	refetchOnWindowFocus: false, // 사용자가 윈도우를 다른 곳으로 갔다가 다시 화면으로 돌아오면 해당 함수를 재실행할 지에 대한 여부.
  retry: 0, // 실패시 재호출 몇번 할지
  onSuccess : (data) => { console.log(data) }, // 성공시 호출
	onError : (error) => { console.log(error) }, // api 호출 실패시 
})
```

isLoading, isSuccess, isError 가 아닌 `status` 를 사용하면 한번에 처리가 가능하다. 

### useQueries

```js
const result = useQueries([
  {
    queryKey: ['getUsers', token],
    queryFn: () => api.getUsers(token),
  },
  {
    queryKey: ['getTodos', token],
    queryFn: () => api.getTodos(token),
  }
])
```

Promise.all 처럼 useQuery를 묶을 수 있다. 

### QueryCache

```js
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {...},
    onSuccess: (data) => {...},
  })
})
```

쿼리의 성공 및 실패에 대한 전처리를 할 수 있다.

### useMutation

값을 바꿀 때 사용하는 API

```js
const loginMutation = useMutation(loginAsync, {
  // loginAsync 함수 실행 전에 실행되고, variable은 loginAsync의 인자와 동일
	onMutate: (variable) => {...},
  // mutation 실패시 호출
	onError: (error, variable, context) => {...},
  // mutation 성공시 호출
	onSuccess: (data,variables, context) => {
     // update 후에 get 함수를 간단히 재실행 가능하다.
    // loginAsync가 성공하면 todos로 맵핑된 useQuery api 함수를 실행
    queryClient.invalidateQueries('todos'); 
    // data가 todo로 맵핑된 get 함수에 전달
    queryClient.setQueryData(["todo",{id:5}],data);
  }
  // 
	onSettled: () => {...},
})
```



## 참고 자료

https://react-query-v3.tanstack.com/

https://kyounghwan01.github.io/blog/React/react-query/basic/#react-suspense%E1%84%8B%E1%85%AA-react-query-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5