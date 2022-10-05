# 안드로이드 정리

---

0. 시작

- intent

  - 안드로이드 플랫폼에게 원하는 것을 말할때 전달하는 우편물 같은 거
  - 어떤 기능 실행할 것인지 지정할때

- Toast
  - 화면에 잠깐 보였다 없어지는 메세지 간단하게 보여줄때

1. 레이아웃

- layout_width, height가 ..
  - wrap_content면 크기 자동으로 맞춰준다.
  - match_parent면 뷰그룹의 여유 공간을 꽉 채운다.
  - 숫자로 지정 가능(dp,px)
- 가이드라인 : 세로, 가로, 화면 표시는 되지 않음.

- <b>제약 레이아웃</b>
  - default
- <b>리니어 레이아웃</b>
  - 필수 속성 : orientation(방향) 세로할지 가로할지
  - 정렬하기
  1. layout_gravity : 뷰가 어디 위치할지?
     - wrap_content여야한다.
  2. gravity : 뷰의 내용물의 위치?
  - 뷰의 마진과 패딩 : layout_margin, padding
  - layout_weight: 공간 비중을 지정해줌으로서 공간 분할
    - layout_width가 match_parent로 설정하면 안되는 점 주의.(리니어 레이아웃 방향이 수평일때. 즉 layout_weight 통해 뷰 가로길이 정할때)
- <b>상대 레이아웃</b>
  - 제약 레이아웃 만들어지기 이전에 사용됨. 옛날에 만들어진 레이아웃 이해 용도.
- <b>테이블 레이아웃</b>
- <b>프레임 레이아웃</b>
  - 하나의 뷰만 화면에 표시
  - <b>중첩 기능(Overlay)</b>
    - 가시성 속성(Visibility) : visible, invisible, gone
    - ImageIndex 를 이용해서 버튼 클릭하면 사진 여러개 전환하는? 기능..

2. 기본 위젯과 드로어블

- 스크롤뷰(ScrollView)
- 텍스트뷰(TextView)

  - text 속성 값에 문자열 넣는 방법
  - /app/res/values에 strings.xml파일에 작성한 문자열 지정 방법
    - strings.xml에 문자열 작성하고, text 속성에는 @string/.. 이런식으로 참조
      (다국어 지원 방법: /res/values-en/ 와 /res/values-ko/ 이런식으로 나누면 되여)
  - textColor : #AARRGGBB 앞에 AA는 투명도 나타낸다.(FF는 불투명. 00는 투명. 88은 반투명)
  - textSize : 폰트 크기 단위는 sp를 권장한다. -> 해상도에 따라 알아서 폰트 크기 반영해줌.
  - textStyle : normal, bold, italic ( bold|italic 으로 중복 가능)
  - tyopeFace : 폰트 설정, noraml, sans, serif, monospace
  - maxLines : 문자열 최대 줄 수
  - 커서 관련 속성
    - selectAllOnFocus = True //포커스 받으면 문자열 전체 선택.
    - cursorVisible = False //커서 안보이게.
    - getSelectionStart(), getSelectionEnd(), setSelection(), extendSelection(), selectAll()
  - 자동 링크 속성
    - autoLink = true
  - 줄 간격 조정 속성
    - lineSpacingMultiplier : 기본 줄 간격의 배수
    - lineSpacingExtra : 여유 값 ??
  - 대소문자 속성
    - capitalize : characters, words, sentences (대문자 단위 설정)
  - 줄임 표시 속성
    - ellipsize : none, start, middle, end (어디를 자를지?)

- 버튼(Button)
  - onClickListener로 버튼 눌렀을때 발생하는 이벤트 설정
  - 체크박스, 라디오 버튼
    - isChecked, setChecked, toggle, onCheckedChanged 등 메서드 사용 가능
    - 두개의 라디오 버튼. 둘 중 하나만 선택 가능하게 하고 싶다?
    - RadioGroup으로 두개의 RadioButton 묶으면 가능.
- 에디트텍스트(EditText)
  - inputType 설정 가능 (text, number, date, ...)
  - hint : 내용 안내문 (textColorHint로 색상 변경 가능)
  - editable : false 는 문자열 편집 못하게 설정.
  - 문자열 변경 처리 관련 속성
    - getText()는 입력된 문자 확인. editable객체를 리턴하므로 toString()을 통해 string 타입 변환
    - addTextChangedListener(TextWatcher watcher) 통해 텍스트 변경 이벤트 처리
      (sms입력화면만들기.md 에 설명 기재)
- 이미지뷰(imageView)
  - imageButton으로 설정하면 이미지를 버튼으로 사용 가능.
  - /app/res/drawable에 이미지 파일 넣고. @drawable/파일명을 src에 지정.
  - maxWidth, maxHeight : 설정 안하면 원본 이미지 그대로 나타남.
  - tint : 이미지 색상 설정 가능
  - scaleType : 이미지뷰 크기에 맞게 원본 이미지의 크기를 자동으로 늘리거나 줄여서 보여줄 때
- 드로어블(drawble)

  - 뷰에 설정할 수 있는 객체. 그 위에 그래픽 그릴 수 있음.
  - 비트맵, 상태, 전환, 셰이프, 인셋, 클립, 스케일 드로어블
  - 셰이프 드로어블

    - shpae 태그 사용하여 도형 그린다.
    - size, stroke(테두리선), solid(안쪽), padding, gradient 태그

  - 상태 드로어블
    - 버튼 눌린경우/뗀 경우 이미지 다르게 변경 가능 (state_pressed)
    - button의 background에 @drawble/example 넣어주기

```xml
// app/res/drawble/example.xml 내용임.
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/image1"
        android:state_pressed="true"/>
    <item android:drawable="@drawable/image2"/>
</selector>
```
