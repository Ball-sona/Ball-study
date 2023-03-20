# [안드로이드] 이벤트 처리

3. 이벤트 처리하기

- 터치 이벤트, 키 이벤트, 클릭 이벤트, 제스처 이벤트..
- 클릭 이벤트는 주로 버튼에 사용되는 반면, 터치는 일반 뷰에서도 사용

//SampleEvent 프로젝트의 MainActivity
//activity_main 에는 2개의 view와 ScrollView 내에 textview가 있음.

```java

public class MainActivity extends AppCompatActivity {
    TextView textView;
    GestureDetector detector; //제스처 디텍터 객체 선언

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView = findViewById(R.id.textView);

        View view = findViewById(R.id.view);

        //터치이벤트 구현
        view.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent){
                int action = motionEvent.getAction();

                float curX = motionEvent.getX();
                float curY = motionEvent.getY();

                if(action == MotionEvent.ACTION_DOWN){
                    println("손가락 눌림 : " + curX + ", " + curY);
                }
                else if (action == MotionEvent.ACTION_MOVE){
                    println("손가락 움직임 : "+ curX + ", "+ curY);
                }
                else if (action == MotionEvent.ACTION_UP){
                    println("손가락 뗌 : "+ curX + ", "+ curY);
                }
                return true;

            }
        });
```

- motionEvent.getAction() 메서드는 액션 정보를 정수 자료형 값으로 반환한다.
- motionEvent.ACTION_DOWN은 손가락이 눌렸을 때, ACTION_MOVE는 눌린 상태로 움직일 때,
  ACTION_UP은 손가락이 떼졌을 때의 상태.
  <br>

```java
            //제스처 이벤트 구현
            detector = new GestureDetector(this, new GestureDetector.OnGestureListener(){

            @Override
            public boolean onDown(MotionEvent motionEvent){
                println("onDown() 호출");
                return true;
            }

            @Override
            public void onShowPress(MotionEvent e) {
                println("onShowPress() 호출");
            }

            @Override
            public boolean onSingleTapUp(MotionEvent e) {
                println("onSingleTapUp() 호출");
                return true;
            }

            @Override
            public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
                println("onScroll() 호출 : "+ distanceX +" , " + distanceY);
                return true;
            }

            @Override
            public void onLongPress(MotionEvent e) {
                println("onLongPress() 호출");
            }

            @Override
            public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
                println("onFling() 호출 : "+ velocityX +" , " + velocityY);
                return true;
            }
        });

        View view2 = findViewById(R.id.view3);
        view2.setOnTouchListener(new View.OnTouchListener(){

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                detector.onTouchEvent(event);
                return true;
            }
        });
    }
```

- onDown() 화면 눌린 경우. onShowPress() 화면이 눌렸다 떼지는 경우.
- onSingleTapUP() 화면이 한 손가락으로 눌렸다 떼지는 경우.
- onScroll() 화면이 눌린 채 일정한 속도와 방향으로 움직였다 떼는 경우(손가락 드래그, 거리가 중요)
- onFling() 화면이 눌린 채 가속도를 붙여 손가락을 움직였다 떼는 경우(빠른 스크롤, 속도가 중요)
- onLongPress() 화면을 손가락으로 오래 누르는 경우
  <br>

```java
    //키 이벤트 구현
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if(keyCode == event.KEYCODE_BACK){
            Toast.makeText(this, "시스템 BACK 버튼이 눌렸습니다.", Toast.LENGTH_LONG).show();
            return true;
        }
        return false;
    }

    public void println(String data){
        textView.append(data + "\n");
    }
}
```

- KEYCODE_BACK은 [뒤로 가기] 버튼
  <br>

4. 단말기 방향 바꾸기

//SampleOrientation 프로젝트의 MainActivity
// res/layout/acitivity_main은 세로 방향, res/layout-land/activity_main은 가로 방향
// 두 activity_main에는 button 1개, EditText 1개, textview 1개 존재 (id 동일)

```java
public class MainActivity extends AppCompatActivity {
    String name;
    EditText editText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        showToast("onCreate 호출");

        editText = findViewById(R.id.editTextTextPersonName);

        Button button = findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View v) {
                name = editText.getText().toString();
                showToast("입력된 값을 변수에 저장합니다. : " + name);
            }
        });

        // savedInstanceState가 null이 아닐 때, 즉 변수가 저장되어있으면
        // 화면이 초기화될때 name 변수의 값 복원
        if(savedInstanceState != null){
            name = savedInstanceState.getString("name");
            showToast("값을 복원했습니다 : " + name);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putString("name",name);
    }

    @Override
    protected void onStart() {
        super.onStart();
        showToast("onStart 호출");
    }

    @Override
    protected void onStop() {
        super.onStop();
        showToast("onStop 호출");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        showToast("onDestroy 호출");
    }

    public void showToast(String data){
        Toast.makeText(this, data, Toast.LENGTH_SHORT).show();

    }
}
```

- 단말 방향이 바뀔 때마다 액티비티를 메모리에서 없앴다가 다시 만든다.

  - onCreate, onStart, onStop, onDestroy() 를 통해 알 수 있음. (생명 주기 메서드)
  - 단말 방향이 바뀌면 onCreate, onStop이 호출

- 액티비티가 새로 만들어지면, 액티비티 안에 선언해 두었던 변수는 어떡해?
  - 변수 값을 저장해놨다가 복원하는 방법.
  - onSaveInstanceState() 메서드

<br>

4. 토스트, 스낵바, 대화상자

토스트

- Toast.makeText(Context context, String text, int duration).show()

  - getApplicationContext()
  - duration : Toast.LENGTH_LONG은 4초, Toast.LENGTH_SHORT은 2초 동안 메세지를 보여준다.

- setGravity(int gravity, int xOffset, int yOffset)

  - 토스트 위치 지정
  - gravity는 정렬 위치.

- setMargin(float horizontalMargin, float verticalMargin)
  - 외부 여백 지정

스낵바

- ProgressDialog
