# Form

## focus, blur

- 요소가 포커스 받을 때 `focus` 이벤트 트리거
- 요소가 포커스 잃을 때 `blur` 이벤트 트리거
- `focus` 와 `blur` 이벤트는 절대로 '버블링'되지 않는다.
  - 이벤트 위임 효과 주고 싶다면 '캡처링' 사용하거나 focusin`,`focusout` 을 대신 사용할 것

## change, input

- 요소 변경이 끝나면 `change` 이벤트 트리거
  - 텍스트 입력 요소인 경우 '포커스 잃을 때'
  - `select` 나 radio 버튼 등은 값 선택 직후에
- 값이 변경될 때마다 `input` 이벤트 트리거
  - <- , -> 같은 키보드 입력은 제외

## cut, copy, paste

- `cut`, `copy`, `paste` 이벤트는 각각 값을 잘라내기·복사하기·붙여넣기 할 때 발생
- `ClipboardEvent` 하위 클래스 -> 복사 혹은 붙여넣기한 값에도 접근 가능 `e.clipboardData`

## submit

`submit()`메서드는 동적으로 폼을 생성하고 서버에 보내고자 할 때 사용된다.
