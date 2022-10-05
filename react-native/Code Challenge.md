# Code Challenge

---

#### 1. latest selected Part 가 work / travel 인지 저장해놨다가 유저가 다시 켰을 때 그대로 보여주기.

- useEffect를 하나 더 만들었다.
  1. 처음 렌더링할때 loadTodo를 호출하기 위한 useEffect => [] 비어있음.
  2. working 값이 바뀔 때마다 saveWorking 호출하기 위한 useEffect => [working]

// 진작에 이랬으면 금방 끝날 것을... React 생명주기까지 싹 공부하게 되었던... (유익했다 그래 ^^)

- saveWorking 에서 working 을 AsyncStorage에 저장한다.

```js
const saveWorking = async (working) => {
  try {
    const w = JSON.stringify(working);
    await AsyncStorage.setItem(WORKING_KEY, w);
  } catch (e) {
    console.log(e);
  }
};
```

- loadTodo 가 Todos를 가지고 올때, 저장되어있는 working도 슬쩍 같이 가지고 올 수 있도록 한다..
  // 함수 이름을 바꿔야할것 같지만 그냥 스킵한다!

```js
const loadTodos = async () => {
  try {
    //   const s = await AsyncStorage.getItem(STORAGE_KEY);
    const w = await AsyncStorage.getItem(WORKING_KEY);
    //   setToDos((s != null) ? JSON.parse(s) : null);
    setWorking(w != null ? JSON.parse(w) : true); //저장된 working값이 없다면 true로 세팅해주기.
  } catch (e) {
    console.log(e);
  }
};
```

유저가 처음 앱을 실행하는 경우 working 값이 null이므로 이때는 true로 세팅해준다.

#### 궁금..?

> working이 바뀔때마다 AsyncStorage에 값을 보내주는 것은 비효율이라는 생각이 들었다.  
> 그래서 앱이 종료? 재로딩 직전에만 현재 working값을 AsyncStorage에 저장하는 방법을 강구해보려 했다. componentWillUnmount 함수에 넣는 식으로? (물론 hook 방식으로)  
> 근데 아무래도 뭔가 5만 알고 95는 모르고 있는 싸한 느낌이 들어 포기했다. ㅠㅠ 공부더하자^^!

---

#### 2. toDo 완료했다고 체크하면 done 상태가 될 수 있도록 만들기.

1. done 값 새로 추가하기

- toDo[key]에 done이라는 속성을 추가해주었다. (text/working/done이 있는셈)
- 버튼에 onPress={()=>doneTodo(key)} 처리해주었고, done 상태에 따라 체크/노체크 아이콘 바꿔주기

2. state를 mutate 하지 말라!

- toDos[key].done 을 직접 변경하는게 아니라, toDos의 복사본 tempTodos[key].done을 변경해주어야한다.
- 한번 체크되면 다시 돌아갈 수(?) 없는 것보다는 Toggle 느낌으로 만들고 싶었는데.. ~~별거아닌데 바보같이 고생했다 ㅠㅠㅠ~~

```js
const doneTodo = (key) => {
  const tempTodos = { ...toDos }; //toDos 복사하기
  tempTodos[key].done = !tempTodos[key].done; //얘때문에!!!!!!!!! !done 이라해서;;;
  setToDos(tempTodos); //새로운 배열로 바꿔주기
  saveTodos(tempTodos);
};
```

3. 취소선 생성

```js
<Text
  style={{
    ...styles.toDoText,
    textDecorationLine: toDos[key].done ? 'line-through' : 'none',
  }}
>
  {toDos[key].text}
</Text>
```

---

#### 3. toDo 수정 가능하게 만들기.

1. toDo object 속성에 editing 을 추가해도 가능하지만.. ~~뭔가 그러고 싶지 않았다~~
2. nowEditingKey 와 editText 값을 새로 생성
3. edit Target의 key를 nowEditingKey에 넣어주고. toDos의 index(key) 와 nowEditingKey를 비교. 같으면 textInput 로.
