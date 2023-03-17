# 로그인 구현하기

회원가입과 로그인은 직접 구현할 수도 있지만, 세션과 쿠키 처리 등 복잡한 작업이 많으므로 검증된 모듈을 사용하는 것이 좋다.

## Passport

관련 패키지들을 설치한다. 카카오 로그인을 함께 사용할 것이므로 이와 관련된 패키지 역시 설치해준다. 

```bash
npm i passport passport-local passport-kakao bcrypt
```

Passport 모듈을 `app.js` 에 연결해준다.

```js
//app.js
import passport from 'passport';
import passportConfig from './passport';

passportConfig(passport);

app.use(passport.initialize()); // req 객체에 passport 설정을 심는 미들웨어
app.use(passport.session());    // req.session 객체에 passport 정보를 저장하는 미들웨어
```

이제 Passport 모듈을 구현해보자.

```js
import local from './localStrategy';
import kakao from './kakaoStrategy';
import User from '../models/user';

export default (passport) => {
  passport.serializUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializUser((id, done) => {
    User.find({ where: { id } }) // 여기서 id는 serializeUser 내 done의 두번째 인자 user.id
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};
```

- `passport.serializeUser`
  - 사용자 정보 객체를 세션에 아이디로 저장한다. 
  -  `req.session` 객체에 어떤 데이터를 저장할지 선택한다. 
- `passport.deserializeUser` 
  - 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러온다.
  - 매 요청시 실행이 된다. `passport.session()` 미들웨어가 이 메서드를 호출하는데, `serializeUser` 에서 저장했던 아이디를 받아서 데이터베이스에서 사용자 정보를 조회한다. 
  - `serializeUser` 내 `done` 의 두번째 인자이 `user.id` 가 `id` 로 들어온다. 
  - 조회한 데이터를 `req.user` 에 저장하므로 앞으로 `req.user` 를 통해 로그인한 사용자의 정보를 가져올 수 있다. 

## Passport 로그인 과정 

1. 로그인 요청이 들어온다.
2. `passport.authenticate()` 메서드를 호출한다. 
3. 로그인 전략(로그인 시의 동작)을 수행한다.
4. 로그인 성공 시 사용자 정보 객체와 함께 `req.login` 을 호출한다.
5. `req.login` 메서드가 `passport.serializeUser` 를 호출한다.
6. `req.session` 에 사용자 아이디만 저장한다.
7. 로그인이 완료된다. 

#### 로그인 이후

1. 모든 요청에 `passport.session()` 미들웨어가 `passport.deserializeUser` 메서드를 호출한다. 
2. `req.session` 에 저장된 아이디로 데이터베이스에서 사용자를 조회한다. 
3. 조회된 사용자 정보를 `req.user` 에 저장한다.
4. 라우터에서 `req.user` 객체를 사용할 수 있게 된다. 



## Local Login

로컬 로그인을 구현하기 위해서는 `passport-local` 모듈이 필요하다. 

