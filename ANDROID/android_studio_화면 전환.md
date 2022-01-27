# 안드로이드 정리

---

5. 레이아웃 인플레이션

- 인플레이션 : XML 레이아웃의 내용이 메모리에 객체화되는 과정
- setContentView() 메서드 : 액티비티의 화면 전체 설정
- 부분 화면(레이아웃)을 메모리에 객체화하려면 ? -> 인플레이터 사용 LayoutInflater

```java
Button button = findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LayoutInflater inflater = (LayoutInflater)
                        getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                inflater.inflate(R.layout.sub1,container,true);
                CheckBox checkBox = container.findViewById(R.id.checkBox);
                checkBox.setText("로딩되었어여");
            }
        });
```

- inflate(int resource, ViewGroup root)
  - resourece는 XML 레이아웃, root는 부모 컨테이너(레아아웃 담을 곳)
    <br>
- 안드로이드 앱의 기본 구성 요소 (AndroidManifest.xml)

  - 액티비티
  - 서비스
  - 브로드캐스트 수신자
  - 내용 제공자

- startActivity()
- startActivityForResult() : 새 액티비티에서 원래의 액티비티로 돌아오면서 새 액티비티의 응답을 받아 처리해야하는 경우

<br>

6. 인텐트(intent)

- 앱 구성 요소가 해야 할 일을 지정 -> 앱 구성 요소 간에 작업 수행을 위한 정보를 전달하는 역할
- startActivity(), startActivityForResult()
- 액션 + 데이터 : 액션은 수행할 기능, 데이터는 수행될 대상
- 명시적 인덴트 : 호출 대상 확실해
- 암시적 인덴트 : 호출할 대상이 달라져.

  - MIME 타입에 따라 적절한 액티비티 찾아서 띄워.
  - 범주 : 액션이 실행되는 데 필요한 추가적인 정보
  - 타입 : MIME 타입을 명시적으로 지정
  - 컴포넌트 : 컴포넌트 클래스 이름을 명시적으로 지정 ???
  - 부가 데이터 : Bundle객체에 추가적인 정보 넣어서 다른 구성요소에 전달

- intent 객체 생성

```java
Intent intent = new Intent(getApplicationContext(), SecondActivity.class);
// 첫번째 인자가 메세지를 보내는 액티비티, 두번째 인자가 곧 호출될 액티비티
startActivity(intent);
//SecondActivity를 호출하고 끝.
```

- Intent객체 송신 액티비티

```java
int num =1;
int[] array = new int[]{1,2,3,4,5};

Intent intent = new Intent (getApplicationContext(),SecondAcitivity.class);
intent.putExtra("data1",num);
intent.putExtra("data2",array); //부가 데이터를 Intent객체에 담아.
```

```java
//SecondActivity.java
Intent intent = getIntent();
int num2 = intent.getExtra("data1"); //num2=1;
int[] array2 = intent.getExtra("data2"); //array2={1,2,3,4,5};
//전달받은 intent가 null일 떄의 예외처리를 해주면 좋다.
```

<br>
7. 플래그와 부가 데이터

- 플래그

- Parcelable 인터페이스

- 테스크 관리
  - 프로세스 < VM 가상머신< 액티비티(앱)
  - 각 앱은 서로 별도의 프로세스로 동작 -> 되게 독립적 -> 서로 정보 공유 어려워
  - Task(태스크)를 이용하면 앱의 동작 흐름을 관리할 수 있어.

<br>
8. 액티비티의 생명주기

- 실행 -> 일시정지 -> 중지
  // 일시정지 : 사용자한테 보이지만, 다른 액티비티가 위에 있어서 포커스 안받는 상태
  <img src="(img)/액티비티 생명주기.jpg">
- 콜백 메서드 : 시스템에서 자동으로 호출하는 메서드
- onCreate- -> onStart -> onResume -> onPause -> onStop -> onDestroy
- 화면이 갑자기 중지되거나 다시 화면에 나타날 때? <b>데이터 저장과 복원이 중요</b>
  - onPause()에서 데이터 저장, onResume()에서 복원
  - SharedPreferences의 저장, 복원 메서드 호출
