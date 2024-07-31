# Form 태그 관련

### enctype 속성

- form data가 서버로 전송될 때 해당 데이터가 인코딩되는 방법을 명시
- form 요소 중 method 속성 값이 "Post"인 경우에만 해당
- 속성값
  - `application/x-www-form-urlencoded` : 기본값. 모든 문자들을 인코딩
  - `multipart/form-data` : 모든 문자 인코딩하지않음. Form이 파일이나 이미지를 서버에 전송할때 주로 사용
  - `text/plain` : 공백 문자는 '+' 기호로 변환. 나머지는 인코딩 X
  - 중요한건.. 파일 업로드를 포함하는 폼에는 `multipart/form-data` 를 사용한다는 것! -> multipart는 폼데이터가 여러 부분으로 나뉘어서 서버로 전송되는 것을 의미.

### method 속성

- GET

  - URL에 폼데이터를 추가하여 서버에 전달. 입력 내용에 길이 제한 (256byte ~ 4096byte)

  - 브라우저에 의해 캐시되어 저장

  - 보안상 취약점 존재. 중요한 데이터는 GET 쓰지 말 것.

    ex. `server.com?name=value&age=value`

- POST
  - URL에 폼데이터가 노출되지 않음. 입력 내용에 길이 제한 없음.
  - 브라우저에 의해 캐시되지 않으므로 브라우저 히스토리에도 남지 않음.
  - GET에 비해 보안성 높음.

### action 속성과 onsubmit

onsubmit에 지정한 함수가 먼저 실행되고 그 후 action 속성에 지정해준 URL로 이동한다.
