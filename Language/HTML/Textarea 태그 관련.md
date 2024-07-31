# Textarea 태그 관련

## Textarea 사이즈 고정시키기

```css
textarea {
  resize: none;
}
```

## Textarea, Input 포커스 outline 제거

```css
textarea:focus, input:focus{
	outline:none; // 포커스되도 파란색 테두리가 생기지 않는다.
}
```

## 줄바꿈 그대로 DB에 저장하기

textarea는 input과 달리 여러줄 작성이 가능하지만, 사용자가 줄바꿈을 해도 DB에는 한 줄로 저장이 되버린다.

이때 textarea의 줄바꿈을 그대로 나타내고 싶다면 textarea의 속성 중 wrap 값을 `hard`로 준다.

> **wrap** : 폼 데이터가 서버로 제출될때 입력된 텍스트의 줄바꿈 방식을 명시한다.
>
> - `soft` : 줄바꿈 X. 기본값
> - `hard` : 줄바꿈 O. 개행문자(`\n`)가 DB에 저장된다. 단 cols 속성이 명시되어 있어야 한다.

div에서 개행문자를 줄바꿈으로 표시를 못하는 경우, div에 css 처리를 추가적으로 해줘야한다.

```css
div {
  white-space: pre-wrap;
}
```

## Textarea의 cols,rows 속성

- rows : 텍스트 입력 영역 중 보이는 영역의 라인수
  - 기본값 2
  - height로도 설정 가능
- cols: 텍스트 입력 영역 중 보이는 영역의 너비

  - 기본값 20
  - width로도 설정 가능

- 참고로 둘 값의 타입은 string이 아니라 number이다.
