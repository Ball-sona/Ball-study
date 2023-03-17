# React Native 기초

### 리액트 네이티브의 동작

- RN <--> 운영체제(aos,ios) 대화
- 웹의 div -> View
- 모든 text는 <text></text> 안에.

---

### React Native Packages

- Component and API
  - Component: return되는 대상/화면에 렌더링 되는 대상
  - API : RN와 운영체제 사이 소통?
- RN이 지원하는 API를 대폭 줄이면서 -> 커뮤니티가 만들기 시작 -> 오픈소스
- Expo API
  - RN 의 Component 와 API를 이용하여 새로운 API 만듦
  - RN이 지원하지 않는 기능 구현 가능

---

### RN Layout

- Flexbox
- Default Flex Direction : Column (웹과의 차이점)
- Responsible Design
  - Width, Height 쓰지 않을 것.
- flex 로 비율 설정
  - 부모 View에도 style={{flex:1}} 설정 필수
- StyleSheet
- ScrollView
  - (p)horizontal : 가로방향
  - (p)pagingEnabled : allow paging throw views using swiping gestures
  - (p)showsHorizontalScrollIndicator={false}
  - (p)contentContainerStyle
  - ScrollView 안의 뷰들은 모두 렌더링되기 때문에, 작은 양의 뷰를 다룰 때 추천. (아이템 많다면 FlatList)
- Dimensions
  - const { width: SCREEN_WIDTH } = Dimensions.get("window");

---

### RN Container

- ActivityIndicator : 로딩중;;;

### Location

- expo Location API
  https://docs.expo.dev/versions/v42.0.0/sdk/location/
- 위치 추적 허용
  await Location.requestForegroundPermissionsAsync();
- 현재 위치 정보 불러오기. 경도/위도
  await Location.getCurrentPositionAsync({});
- 경도/위도 => 주소
  await Location.getCurrentPositionAsync({});

---

### Weather

- Open Weather API
  https://openweathermap.org/

```
const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`);
const json = await response.json();
```

- url에 추가 : units=matric

---

### Icon

- import { Ionicons } from '@expo/vector-icons';
- https://icons.expo.fyi/
- 아이콘 짱많음.

---

### Button

- TouchableOpacity : onPress
- TouchableHighlight : 눌렀을때 색변화가능. onPress/underlayColor/
- TouchableWithoutFeedback : UI변화 X. onClickEvent 가능
- Pressable : 제일 최신. 섬세한 설정

---

### TextInput

- onChangeText
- onSubmitEditing
- keyboardType
- returnKeyType

---

### TodoList

- toDos 를 Object로..
- <형태> toDos[Date.now()] = {text:"blabla", working:true/false}
- 새로 만들고 싶을땐? =>
  1. const newTodos = Object.assign({}}, toDos, {[Date.now()]:{text, working}})
  2. [ES6] const newTodos = {...toDos, [Date.now()]:{text,working}}
     <br />
- toDos 리스트 나열하는 법
  - Object.keys(toDos)는 Date.now() 배열을 반환한다.(key 리스트)

```js
<ScrollView>
  {Object.keys(toDos).map((key) => (
    <View style={styles.toDo}>
      <Text key={key} style={styles.toDoText}>
        {toDos[key].text}
      </Text>
    </View>
  ))}
</ScrollView>
```

- Delete
  - Alert API
    1. alert()
    2. prompt() // IOS만 가능 ㅠㅠ
  - 기존 배열 복사 => delete 복사본[key] => setTodos(복사본)
  - 삭제 버튼 클릭시 onPress={()=>deleteTodo(key)} 임을 잊지말자. 함수 실행문 말고 선언문을 바인딩해야함!!!

### Storage

- AsyncStorage.setItem/getItem

* Loading 구현 해보기

---

#### 기타

- 실수를 소수점 1의자리로 반올림하고 싶을때

  - parseFloat(NUMBER).toFixed(1)

- Object => String
  - JSON.stringfy([Object])
- String => Object
  - JSON.parse([String])
