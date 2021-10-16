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
- Default Flexbox
- Default Flex Direction : Column (웹과의 차이점)
- Responsible Design 
    - Width, Height 쓰지 않을 것.
- flex 로 비율 설정
    - 부모 View에도 style={{flex:1}} 설정 필수
- StyleSheet
---

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
