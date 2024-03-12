# Activity Lifecycle

액티비티의 생명주기

## Activity State

하나의 액티비티는 다음과 같은 3가지 상태를 가진다. 

- Resumed: 해당 액티비티가 스크린 관점에서 foreground 상태이며 focus 를 받고 있음
- Paused: 다른 액티비티가 focus 를 받고 있으나, 해당 액티비티도 여전히 visible 한 상태. 
  - 다른 액티비티가 나 자신을 완전히 덮지 못하거나 부분적으로 투명함. 
  - 메모리에 모든 상태를 유지하며 window manager 에 연결된 상태를 유지
- Stopped: 해당 액티비티가 다른 액티비티에 의해서 완전히 가려짐. 즉, 스크린 관점에서 background 상태임
  - 메모리에 모든 상태를 유지하며 window manager 와 연결이 끊어짐

`finish()`메서드를 호출하거나 해당 프로세스를 kill해야 paused or stopped 상태인 액티비티를 실질적으로 종료시킬 수 있다. 종료된 액티비티가 다시 호출되면, 그 액티비티는 처음부터 다시 생성된다. 

## Activity Lifetime 

액티비티의 상태가 변경되면(상태 전이), 이는 액티비티 콜백 메서드(ex. `onCreate`)에 통보된다. 만약 콜백 메서드들을 재정의하고 싶다면, 반드시 superclass 구현을 호출해야 한다. 

```Java
public void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState); // The activity is being created. 
}
```

![](https://i.imgur.com/iYAjLkw.png)





