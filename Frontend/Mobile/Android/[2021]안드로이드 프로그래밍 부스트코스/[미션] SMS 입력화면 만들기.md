// p 169 미션04
// SMS 입력 화면 만들고 글자 수 표시하기

- EditText : 텍스트 입력상자

  - android:hint -> 아무 글자도 입력되지 않았을때 보이는 글자. (ex 메세지 입력하세요)
  - android:gravity="top|left" -> 문자가 왼쪽 위부터 입력받을 수 있도록 함. (왼쪽 위..?)

- 입력 가능한 글자 수를 80개로 제한하고, 현재 글자 수 화면에 출력하기.
  - TextView 사용
    - default는 " 0 / 80 바이트 "
  - editText.addTextChangedListener 는 editText의 텍스트가 변경될때마다 확인하는 메소드
  - TextWatcher()은 텍스트가 변경될때마다 발생하는 이벤트를 처리하는 인터페이스
    - 여기서 텍스트가 변경될때마다 글자수 값만 가져올거니까 onTextChanged만 변경한다.
  - InputFilter는 입력 문자에 제한?을 거는 역할.
    - new InputFilter.LenghtFilter(80) 은 문자 개수를 80개로 제한한다.
    - 자세한 사용법을 모르겠다. 나중에 이부분 관련 파트 나오면 깊게 공부하기.
  - int currentBytes = s.toString().getBytes.length;
    - CharSequence s의 byte 값을 가져와서 입력 글자 수를 업데이트한다.
    - 바뀐 문자수 + " / 80 바이트" 로 계속 업데이트.

```java
//Acitivity.java
editText = (EditText) findViewById(R.id.editText);
textView = (TextView) findViewById(R.id.textView5);

editText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                InputFilter[] filter = new InputFilter[1];
                filter[0] = new InputFilter.LengthFilter(80); // 문자 개수 80개로 제한
                editText.setFilters(filter);

                int currentBytes = s.toString().getBytes().length;
                String text = String.valueOf(currentBytes) + " /80 바이트";
                textView.setText(text);
            }

            @Override
            public void afterTextChanged(Editable s) {
            }
        });

```

- 전송 버튼 누르면 Toast 이용해서 입력한 문자 창에 띄우기?, 닫기 버튼 누르면 종료.
  - Toast.makeText(context, text, duration).show()
    - editText.getText()는 반환형이 editable이므로 CharSequence로 변환한다.
    - duration : Toast.LENGTH_LONG은 4초, Toast.LENGTH_SHORT은 2초 동안 메세지를 보여준다.
  - finish() : 프로그램 종료

```java
 public void onButton3Clicked(View v){ //전송버튼
        Toast.makeText(getApplicationContext(),(CharSequence) editText.getText(), Toast.LENGTH_LONG). show();
    }
public void onButton4Clicked(View v){ //닫기버튼
        finish();
}
```

- editable은 변경 가능한 문자열 인터페이스????? ....???

- getApplicationContext()가 뭔지 알아보다 정리한다.
  - 안드로이드의 Context는 Application Context와 Activity Context로 나눌 수 있다.
  - Application Context는 앱과 연결이 되어 있으므로 앱 수명 내내, 즉 종료되기 전까지는 변경되지 않는다.
  - Activity Context는 액티비티와 연결이 되있으므로 특정 액티비티가 종료되면 소멸된다.
  - getApplicationContext()는 Application Context를 가져오는 거고, ~~Activity.this는 그 액티비티의 Context를 호출하는 것 같다.
  - 한 액티비티에서만 다뤄야하는 작업일 경우 Activity Context를 쓰는게 낫다.
  - 여러 문제로 인해 웬만하면 getApplicationContext()는 쓰지말라는데, 난 지금 매우 매우 간단한 프로그램을 구현중이므로 일단 패스하자.

<br>
InputFilter 다시!!!!!
