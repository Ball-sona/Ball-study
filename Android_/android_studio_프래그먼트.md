# 안드로이드 정리

---

9. 프래그먼트

- 액티비티의 부분화면
- 액티비티 위에 프래그먼트. 프래그먼트끼리 메소드를 호출해서 정보 교환.
- 액티비티 내 화면 전환하기

<br>

> <b>Java에서 상속</b>
> 상속은 형태에 따라 extends, implements, abstract로 나뉘게 된다.
>
> 1.  extends (찐 상속..?)
>     부모에서 선언/정의를 모두하고, 자식은 부모의 메소드/변수를 오버라이딩 할 필요없이 그대로 사용할 수 있다.
>     하지만 자바에서는 다중상속(2개의 부모클래스가 존재)를 할 수 없다.
> 2.  implements (인터페이스)
>     부모의 메소드를 반드시. 오버라이딩해서 사용해야한다.
>     implements를 통해 다중 상속이 가능해진다.

<br>
10. 액션바

(1) 옵션 매뉴 : [메뉴] 버튼 눌렀을 때 나타나는 메뉴

- onCreateOptionsMenu() : 액티비티가 만들어질 때 미리 자동 호출되어 화면에 메뉴 기능을 추가함.
- onPrepareOptionsMenu() : 화면이 띄워진 이후에 메뉴를 바꾸고 싶다면 이 메서드를 재정의해서 사용하면 됨. 메뉴가 새로 보일때마다 호출되므로 메뉴 아이템들을 변경가능함.
- onOptionsItemSelected() : 메뉴 선택시에 기능 추가.(item.getItemId())

- showAsAction 속성값
  - always: 항상 액션바에 아이템 추가
  - never : 디폴트값. 액션바에 아이템 추가하여 표시하지 않음.
  - ifRoom : 여유공간 있을때만 아이템 표시
  - withText : title을 같이 표시
  - collapseActionView : 아이템에 설정한 뷰의 아이콘만 표시?

(2) 컨텍스트 메뉴 : 화면을 길게 누르면 나타나는 메뉴.

- registerForContextMenu(View) : 컨텍스트 메뉴를 특정 뷰에 등록
- onContextItemSelected() : 메뉴 선택시 호출.

(3) 액션바

- bar.show() 보이기. bar.hide() 숨기기.
- setDisplayOptions()

  - DISPLAY_USE_LOGO : 로고 아이콘
  - DISPLAY_SHOW_HOME
  - DISLAY_HOME_AS_UP : 홈 아이콘 + 뒤로 가기 아이콘
  - DISPLAY_SHOW_TITLE : 타이틀 표시

- 액션바에 layout을 넣을 수 있음.
  - 검색어를 입력받기 위해. EditText 있는 search_layout
  - res/menu/menu_main에 search_layout을 item으로 추가함

```xml
 <item
    android:id="@+id/menu_search"
    android:title="검색"
    app:showAsAction="always|withText"
    app:actionLayout ="@layout/search_layout"
 />
```

<br>
11. 상단바, 하단바, 뷰페이저, 바로가기 