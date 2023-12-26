# HTTP Header

HTTP 헤더에 관한 개념들과 적용 방법들을 알아보자!

## Content-Type

Content-type은 리소스의 **미디어 타입(MIME type)**을 나타내기 위해 사용된다.

> 여기서 **MIME Type**(Multipurpose Internet Mail Extensions Type) 이란 클라이언트에게 전송된 문서의 다양성을 알려주기 위한 매커니즘이다. 즉 브라우저와 서버에서 문서 타입 정보를 공유하기 위해 사용된다. MIME 타입은 `type/subtype` 으로 구성되어 있고, `type` 은 개별(discrete) 혹은 멀티파트(multi-part) 타입이 될 수 있다.
>
> 개별 타입에는 `text/plain` , `text/html` , `image/jpeg` , `video/mp4` 등이 있다. `application/*` 는 이진 문서(데이터)에 대해 사용된다. 
>
> 멀티파트 타입은 각자 다른 MIME 타입을 가진 개별적인 파트들로 이루어져있는 합성된 문서를 나타내는 방법이다. 대표적인 예시로 `multipart/form-data` , `multipart/byteranges` 가 있다.

Content-type의 형식(문법)을 살펴보자.

```
Content-Type : text/html; charset=utf-8
Content-Type : multipart/form-data; boundary=something
```

이때 멀티파트 개체에서 `boundary` 디렉티브는 필수값인데, 캐릭터셋의 1~70개의 문자들로 구성되어 있다. 이는 메세지의 멀티 파트 경계선을 캡슐화하기 위해 사용된다. 

## application/x-www-form-unlencoded와 application/json

HTTP 통신을 할때 자주 사용되는 `application/x-www-form-unlencoded` 와 `application/json` 의 차이에 알아보자.

### application/x-www-form-unlencoded

`application/x-www-form-unlencoded` 는 html form을 사용할 때 기본적으로 사용되는 Content-type이다. 이를 사용하면 데이터들은 서버로 보내지기 전에 URL 인코딩이 되어 보내진다. 인코딩 규칙은 다음과 같다.

- 모든 튜플은 `key=value` 형태로 구성된다.
- `&` 은 각 튜플들을 구분한다.
- `+` 는 white space을 의미한다.

위와 같은 규칙으로 인코딩이 된 데이터는 URL 뒤에 붙어 전송된다. 따라서 크기가 큰 데이터는 해당 타입으로 보내기 적합하지 않는다. 

```
URL/name=Gong+sona&age=25
```

### application/json

`application/json` 은 서버에 JSON 형태의 데이터를 전송할 때 많이 사용되는 Content-type으로, URL 인코딩 과정을 따로 거치지 않고 `{key:value}` 형태로 데이터를 보내게 된다. 

```
{"name": "Gong sona", "age": 25}
```

## multipart/form-data

Form을 이용해 데이터를 전송할 때 `multipart/form-data` 을 Content-type으로 사용할 수 있는데, 해당 타입으로 서버에 데이터를 보내면 서버에서는 멀티파트 메세지를 각 파트별로 분리하여 개별 파일의 정보를 얻을 수 있게 된다. 

아래는 Content-type이 `multipart/form-data` 인 경우 요청 문서 형식으로, 경계(`--`)로 구분되어지는 다른 파트들로 구성된다. 각 파트는 그 자체로 개체이고, Content-Disposition, Content-type 등 자신만의 HTTP 헤더를 가지게 된다. 

```
POST /foo HTTP/1.1
Content-Length: 68137
Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575
Content-Disposition: form-data; name="description"
---------------------------974767299852498929531610575

some text

---------------------------974767299852498929531610575
Content-Disposition: form-data; name="myFile"; filename="foo.txt"
Content-Type: text/plain

(content of the uploaded file foo.txt)

---------------------------974767299852498929531610575--
```

마지막 boundary는 끝에 `--` 가 붙게 되는데, 이는 body의 끝을 알리는 의미이다.

### 왜 multipart를 사용할까?

우리가 어떤 이미지 파일을 입력 받고, 해당 이미지에 대한 제목과 주석을 입력 받는 총 3개의 input을 가진 Form이 있다고 해보자. 이미지에 대한 Content-type은 `image/png` 등이 될 수 있겠고, 이미지 제목과 주석에 대한 Content-type은 `application/x-www-form-urlencoded` 이 될 수 있겠지만, 우리는 하나의 요청에 대해 하나의 HTTP Content-type을 지정해주어야 한다. 따라서 여러 종류의 데이터(타입)을 구분해서 서버에 전송하는 방법이 필요해졌고 `multipart` 개념이 등장하게 되었다. 

```js
const formData = new FormData();
const image_file = files[0];
const image_text = {title: "IMAGE_TITLE", comment: "IMAGE_COMMENT"};
formData.append("image", IMAGE_FILE);
formData.append("image_text", new Blob([JSON.stringify(image_text)], {type: "application/json"}));
axios.post(`${API_URL}/image`, formData, {
	headers : { 'Content-type': 'multipart/form-data'},	
})
```

## Content-Disposition

Content-Disposition은 HTTP Response Body에 오는 컨텐츠의 기질/성향을 알려주는 속성이다. 

기본값은 `inline` 인데, 이는 웹 페이지의 일부 혹은 attachment로서 다운로드되거나 로컬에 저장될 용도로 사용됨을 의미한다.

`multipart/form-data` 본문에서의 Content-Disposition 헤더는 **multipart 본문 내의 필드에 대한 정보**를 제공한다.

```
Content-Disposition : form-data; name="fieldName"; filename="filename.jpg"
```



## 참고 자료

https://jw910911.tistory.com/117

https://velog.io/@shin6403/React-Form-Data-%EC%A0%84%EC%86%A1