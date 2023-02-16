# Node.js 

Node.js 란 크롬 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임이다. Node.js는 이벤트 기반, 논블로킹 I/O 모델을 사용해 가볍고 효율적이다. Node.js 의 패키지 생태계인 npm은 세계에서 가장 큰 오픈 소스 라이브러리 생태계이기도 하다. 

## Node.js 특징

#### 노드는 이벤트 기반, 논블로킹 I/O 모델을 사용한다

- 이벤트 기반 
- 논블로킹 I/O 모델 

#### 노드는 싱글 스레드다

- 멀티 스레드 방식보다 컴퓨터 자원을 적게 사용하는 장점이 있지만 CPU 코어를 하나 밖에 사용하지 못한다는 단점도 있다. 

#### 서버로서의 노드

- 서버? 네트워크를 통해 클라이언트에 정보나 서비스를 제공하는 컴퓨터 혹은 프로그램 
- 노드 서버는 I/O가 많은 작업에 적합하고, CPU 부하가 큰 작업에는 적합하지 않다. 
- 웹 서버가 내장되어 있어 Apache, nginx, IIS 처럼 별도의 웹 서버를 설치하지 않아도 된다. (규모가 작은 경우)

#### 서버 외의 노드

- 노드는 자바스크립트 런타임이기 때문에 용도가 서버에만 한정된 것은 아니다. 

- 노드 기반의 웹 프레임워크 : React, Angular, Vue
- 노드 기반의 모바일 개발 프레임워크 : React Native, Ionic Framework



## 관련 프론트엔드 지식 

#### AJAX(Asynchronous Javascript and XML)

페이지 이동 없이 서버에 요청을 보내고 응답을 받는 기술이다. 이를 통해 비동기적 웹 서비스를 구축할 수 있다. 

- `GET` 요청

  ```js
  xhr.open('GET',API);
  xhr.send();
  ```

- `POST` 요청

  ```js
  xhr.open('POST',API);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(JSON.stringify(data));

#### Formdata

HTML Form 태그의 데이터를 동적으로 제어할 수 있는 기능이다.

```js
var formData = new FormData();
formData.append('id',ID);
formData.append('password',PW);
xhr.open('POST',API);
xhr.send(formData);
```

#### encodeURIComponent, decodeURIComponent

API 요청을 보낼 때 URL 주소에 한글이 들어가있을 수 있는데, 서버 종류에 따라 다르지만 서버가 한글 주소를 이해하지 못할 수도 있다. 이를 대비하여 `window` 객체의 메서드인 `encodeURIComponent` 메서드를 사용한다.

```js
xhr.open('GET','http/www.naver.com/blogs/'+ encodeURIComponent('네이버'));
xhr.send();
```

받는 쪽에서는 `decodeURIComponent` 메서드를 사용하면 한글을 원래 상태로 복구할 수 있다.

#### data attribute, dataset

```html
<div data-id="1" data-user-job="programmer">Sona1</div>
<div data-id="2" data-user-job="designer">Sona2</div>
```

```js
console.log(document.querySelector('div').dataset); 
```



## REPL

자바스크립트는 스크립트 언어로 미리 컴파일을 하지 않아도 즉석에서 코드를 실행할 수 있다.

따라서 노드도 브라우저 콘솔과 비슷한 기능을 제공하는데, 입력한 코드를 읽고, 해석하고, 결과물을 반환하고 종류하기까지를 반복한다고 해서 이를 **REPL(Read Eval Print Loop)** 이라고 부른다.



### 동기와 비동기, 블로킹과 논블로킹

- 동기-비동기 : 함수가 바로 return 되는지 여부
- 블로킹-논블로킹 : 백그라운드 작업 완료 여부

노드에서는 동기-블로킹, 비동기-논블로킹 방식이 대부분이다. 

<img src="https://blog.kakaocdn.net/dn/baIYNP/btq8gaAA1Og/R3tZR49TrbjKIXSw5qKih0/img.png" alt="img" style="zoom:40%;" /> 

