# Express

Express는 좀 더 편리하게 서버를 제작할 수 있도록 편의 기능을 제공하는 웹 서버 프레임워크이다.

## Express-generator

Express-generator 패키지는 프레임워크에 필요한 package.json을 만들어주고 기본 폴더 구조까지 잡아주는 패키지(boiler template)이다.

해당 패키지를 전역 설치 후, 새로운 익스프레스 프로젝트를 생성해보자.

```bash
express [project-name] --view=pug
```

자동으로 생성된 프로젝트의 폴더 구조를 간단하게 살펴보면 다음과 같다.

- `bin/www` : 서버를 실행한는 스크립트
- `public` : 외부(클라이언트)에서 접근 가능한 파일들 (ex. images, javascript, css files)
- `routes` : 주소별 라우터들을 모아둔 곳
- `views` : 템플릿 파일들을 모아둔 곳

## Express 구조

<img src="https://user-images.githubusercontent.com/67703882/220949717-ff061d09-9f57-4bb3-af1c-7f8163318018.png" alt="image" style="zoom:70%;" />

Express의 핵심은 '미들웨어'이다. 요청과 응답의 중간에 위치하여 기능을 추가하고 나쁜 요청을 걸러내기도 한다. `app.use()` 를 통해 미들웨어를 연결할 수 있다.

## 커스텀 미들웨어

```js
app.use(function (req, res, next) {
  console.log(req.url, '저도 미들웨어에요.');
  next();
});
```

미들웨어를 커스텀할 경우 주의할 점은 반드시 미들웨어 안에서 `next()` 를 호출해야 다음 미들웨어로 넘어간다는 것이다. `logger`, `express.json`, `express.urlencoded`, `cookieParser`, `express.static` 는 모두 내부적으로 `next()` 를 호출하므로 다음 미들웨어로 넘어갈 수가 있다.

next 함수는 인자에 따라 각기 다른 기능을 수행한다. 만약 전달 받은 인자가 없다면 다음 미들웨어를 호출하고, 'route'를 받았다면 라우터로 이동한다. 그 외의 값들을 전달 받을 경우, 이를 에러에 대한 내용으로 간주하고 에러 핸들러로 이동한다.

```js
// 에러 핸들러. next에 넣어준 인자가 err로 연결된다.
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
```

## 주요 미들웨어

### morgan

요청에 대한 정보를 콘솔에 기록해주는 미들웨어

```js
const logger = require('morgan');
app.use(logger('dev'));
```

함수의 인자로 `dev` , `short`, `common`, `combined` 등을 넣을 수 있다. `dev` 를 넣어주면 각 로그는 'HTTP 요청 종류(메서드) + 주소 + HTTP 상태코드 + 응답속도 + 응답 바이트' 로 구성이 된다. 보통 개발시에는 `dev`나 `short` 를 많이 쓰고, 배포 시에는 `common` 이나 `combined` 를 사용한다.

### body-parser

요청의 본문을 해석해주는 미들웨어로, 폼 데이터나 AJAX 요청 데이터를 처리한다.(`multipart/form-data` 같은 폼 데이터는 다른 모듈을 사용해서 해석해야한다.)

```js
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // extended가 false면 querystring 모듈, true면 qs모듈을 사용해서 쿼리스트링을 해석한다.
```

express@4.16.0 부터는 body-parser의 일부 기능이 익스프레스에 내장되어 있기 때문에 body-parser를 따로 설치하지 않고도 `express.json()` 처럼 사용할 수 있다.

단, JSON와 URL-encoded 이외의 Raw, Text 형식의 본문을 해석할 때에는 body-parser가 필요하다.

```js
app.use(bodyParser.raw());
app.use(bodyParser.text());
```

### cookie-parser

요청에 동봉된 쿠키를 해석해주는 미들웨어

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

cookie-parser 을 통해 해석된 쿠키들은 `req.cookies` 객체에 들어간다. 예를 들어 'name=sona' 라는 쿠키를 보냈다면 `req.cookies` 에는 {name:'sona'} 가 되는 것이다.

`cookieParser('key')` 처럼 인자에 문자열을 넣어주게 되면, 이 쿠키들은 해당 문자열로 서명된 쿠키가 된다. 서명된 쿠키는 클라이언트가 수정했을 때 에러가 발생하므로 클라이언트에서 쿠키로 위험한 행동을 하는 것을 방지할 수 있다.

### static

정적인 파일들을 제공하는 미들웨어로, express에 내장되어 있다.

```js
app.use(express.static(path.join(__dirname, 'public')));
```

위 예시대로 미들웨어를 사용하면 `public/stylesheets/style.css` 를 `http://localhost:3000/stylesheets/styles.css` 로 접근할 수 있다. 즉 서버의 폴더 경로와 요청 경로가 달라 외부인이 서버의 구조를 쉽게 파악할 수 없으므로, 보안에 도움이 될 수 있다.

```js
app.use('/img', express.static(path.join(__dirname, 'public')));
```

정적 파일을 제공할 주소도 제공할 수 있다. 만약 `public/image.img` 가 있다면 `http://localhost:3000/img/image.img` 로 접근할 수 있게 된다.

static은 자체적으로 정적 파일 라우터 기능을 수행하므로 최대한 위쪽에 배치하는 것이 좋다. (보통 `morgan` 다음에 배치)

### express-session

세션 관리용 미들웨어

```js
const session = require('express-session');
app.use(
  session({
    resave: false, // 요청왔을때 세션에 수정사항이 없어도 세션 다시 저장할지.
    saveUninitialized: false, // 세션에 저장할 내역 없어도 세션 다시 저장할지.
    secret: 'secret-code', // 쿠키 서명. cookie-parser의 secret와 같아야함.
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하게 할지.
      secure: false, // https 아닌 환경에서도 사용 가능하게 할지.
    },
  })
);
```

express-session@1.5 까지는 내부적으로 cookie-parser를 사용하고 있어 cookie-parser 미들웨어보다 뒤에 위치해야했지만, 그 이후 버전부터는 사용하지 않게 되어 순서가 상관이 없어졌다.

express-session은 인자로 세션에 대한 설정을 받는다. 위 예시에 나와있는 설정 외에도 `store` 옵션을 이용해 데이터베이스와 연결해 세션을 유지할 수 있다. express-session은 이러한 설정을 바탕으로 req 객체 안에 `req.session` 객체를 만든다.

`req.sessionID` 를 통해 현재 세션의 아이디를 확인할 수 있고, `req.session.destroy()` 메서드를 호출해서 세션을 한번에 삭제할 수도 있다.

### connect-flash

일회성 메세지들을 웹 브라우저에 나타낼 때 쓰이는 미들웨어

```js
const flash = require('connect-flash');
app.use(flash());
```

connect-flash는 cookie-parser와 express-session을 사용하므로 이들보다 뒤에 위치해야한다.

flash는 `req.flash` 메서드를 추가한다. `req.flash(키,값)` 으로 해당 키에 값을 설정하고, `req.flash(키)` 로 해당 키에 대한 값을 불러온다.

로그인 에러나 회원가입 에러 같은 일회성 경고 메세지는 flash 미들웨어로 보내면 좋다.

## Routing

express를 사용하면 라우팅을 깔끔하게 관리할 수 있다.

```js
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);
```

특정 주소(`/users`) 에 해당하는 요청이 들어왔을 때만 특정 미들웨어(`usersRouter`)가 동작하게 할 수 있다.

```js
app.get('/users', function (req, res, next) {
  // '/users' 주소로 GET 요청 들어왔을 때만 호출
});
app.post('/data', function (req, res, next) {
  // '/data' 주소로 POST 요청이 들어왔을 때만 호출
});
```

`app.use` 메서드는 HTTP 메서드에 대해 요청 주소만 일치하면 실행되지만, `app.get`, `app.post` 등 같은 메서드는 주소 + HTTP 메서드가 모두 일치해야 실행이 된다.

### router

다음으로는 라우터 파일을 살펴보자.

```js
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index'); // 템플릿 엔진을 사용하기 위한 메서드
});
router.get('/', mw1, mw2, mw3);
```

`app.use` 처럼 router 하나에 여러 개의 미들웨어를 장착할 수도 있다. 따라서 실제 라우터 로직이 실행되는 미들웨어 전에 로그인 여부를 체크하는 미들웨어를 중간에 넣어둘 수도 있다.

> `app.get('/', mw)` 나 `router.get('/', mw)` 는 기능을 동일하지만, 코드 관리를 위해 라우터를 별도로 분리하는 것이다.

라우터에서는 반드시 요청에 대한 응답을 보내거나 에러 핸들러로 요청을 넘겨야 한다. 응답을 보내지 않으면 브라우저가 계속 응답을 기다린다. `res` 객체에 있는 메서드들로 응답을 보낸다.

`next('route')` 는 라우터에서만 동작하는 특수 기능인데, 라우터에 연결된 나머지 미들웨어를 건너뛰고 싶을 때 사용한다. 예를 들면, 위 예시에서 mw2 미들웨어 내에서 `next('route')` 를 호출했다면 mw3는 실행되지 않는다.

### router pattern

```js
router.get('/users/:id', function (req, res) {
  console.log(req.params, req.query);
});
```

위처럼 라우터 주소의 패턴을 이용하면, `/users/1` 이나 `/users/123` 등의 요청도 이 라우터에 걸린다. 1, 123 같은 값은 `req.params` 조회할 수 있는데, 위 예시에서는 `:id` 이므로 `req.params.id` 로 값을 조회할 수 있다.

만약 주소에 쿼리 스트링을 쓰는 경우에는 `req.query` 에서 키-값 정보를 조회할 수 있다. 만약 주소가 `/users/12?limit=5&skip=10` 이라면 `req.query` 객체는 `{limit:'5', skip:'10'}` 가 된다.

주의할 점은, 이러한 주소 패턴을 이용할 경우해당 라우터는 **일반 라우터보다 뒤에 위치**해야 한다.

### 응답 메서드

에러가 발생하지 않았다면, 라우터는 요청을 보낸 클라이언트에게 응답을 보내주어야 한다. 여기서 **하나의 요청에 대한 응답은 한번만 보내야 한다**. (두번 이상 보내면 에러가 발생한다.)

```js
res.send([buffer or string or html or json]); // 전송 메서드
res.sendFile(파일 경로);
res.json(JSON 데이터);
res.redirect(주소); // 응답을 다른 라우터로 보낸다.
res.render('템플릿 파일 경로', {변수});
res.status(404).send('Not Found');
```

#### res.send()

- 기본적으로 response를 보내는 역할을 한다.
- 서버에서 어떤 데이터를 보내는지 파악해서 이에 알맞게 'Content-type'을 지정해준다. 예를 들어 Buffer 데이터를 보낸다면 Content-type을 자동으로 `application/octet-stream` 으로 지정해준다.

#### res.json()

- 인자로 들어온 데이터를 자동으로 json 형식으로 바꿔준다.
- Content-type은 `application/json` 으로 지정해준다.

- `res.send` 로도 json 파일을 전송할 수 있지만, 객체를 인자로 넣어 `res.send` 를 호출하면 `res.json` 을 호출했을 때보다 [불필요한 호출이 한번 더 발생](https://haeguri.github.io/2018/12/30/compare-response-json-send-func/)한다. 또 json 응답이라는 것을 좀 더 직관적으로 파악할 수 있으므로, json 데이터를 보낼 시에는 `res.json` 을 사용하자.

### 에러 처리

요청을 처리할 수 없는 라우터가 없다면 다음 미들웨어로 넘어간다.

```js
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

## 템플릿 엔진

### Pug

HTML 와 문법이 많이 다르지만 문법이 매우 쉬워서 빠르게 배울 수 있고 코드 양도 줄일 수 있다.

```js
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

`res.render('index', {title:'Express'})` 처럼 변수 객체를 템플릿에 전달할 수도 있고, `res.locals` 객체를 이용해 변수를 넣을 수도 있다.

```js
router.get('/', function (req, res, next) {
  res.locals.title = 'Express';
  res.render('index');
});
```

```pug
h1 = title
p Welcome to #{title}
button(class=title, type='submit')전송
```

### EJS

HTML이나 자바의 JSP와 문법이 비슷하다.

### 넌적스

??
