# Redux

전역 상태 관리를 용이하게 해주는 라이브러리

## 용어

- Action: 어떤 작업을 할지 설명해주는 '자바스크립트 순수 객체'
- Action Creator: 액션 객체 생성자
- Store: 전역 상태 포함하는 단일 스토어
- Dispatcher: 앱에 어떤 이벤트가 발생할 때 '스토어'에 '액션' 객체를 디스패치
- Reducer: 액션을 살펴보고 불변성을 유지한 채 업데이트된 상태를 반환하는 순수 리듀서 함수
  - 상태와 액션을 인자로 하고, 애플리케이션의 다음 단계를 리턴 

- Selector

## 패키지

- Redux: 리덕스 코어
- React-Redux: 리덕스 스토어와 리덕스 컴포넌트를 연결
- Redux Toolkit: 리덕스 스토어와 로직 생성

## Example

```js
const ADD_TODO = 'ADD_TODO'
const TODO_TOGGLED = 'TODO_TOGGLED'

export const addTodo = text => ({
  type: ADD_TODO,
  payload: { text, id: nanoid() }
})

export const todoToggled = id => ({
  type: TODO_TOGGLED,
  payload: id
})

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    case TODO_TOGGLED:
      return state.map(todo => {
        if (todo.id !== action.payload.id) return todo

        return {
          ...todo,
          completed: !todo.completed
        }
      })
    default:
      return state
  }
}
```

