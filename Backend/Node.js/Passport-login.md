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

// req 객체에 passport 설정을 심는 미들웨어
app.use(passport.initialize()); 

// req.session 객체에 passport 정보를 저장하는 미들웨어
// passport.deserializeUser 호출
app.use(passport.session());    
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
      .then((user) => done(null, user)) // user를 req.user에 저장 
      .catch((err) => done(err));
  });
};
```

- `passport.serializeUser`
  - 사용자 정보 객체를 세션에 아이디로 저장한다. 
  -  `req.session` 객체에 어떤 데이터를 저장할지 선택한다. 
- `passport.deserializeUser` 
  - 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러온다.
  - **매 요청시 실행**이 된다. 
  - `passport.session()` 미들웨어가 이 메서드를 호출하는데, `serializeUser` 에서 저장했던 아이디를 받아서 데이터베이스에서 사용자 정보를 조회한다. 
  - `serializeUser` 내 `done` 의 두번째 인자이 `user.id` 가 `id` 로 들어온다. 
  - 조회한 데이터를 `req.user` 에 저장하므로 앞으로 `req.user` 를 통해 로그인한 사용자의 정보를 가져올 수 있다. 

## Passport 로컬 로그인 과정

1. 로그인 요청이 들어온다.

2. `passport.authenticate()` 메서드를 호출한다. 
3. 로그인 전략(로그인 시의 동작), 즉 `LocalStrategy`을 수행한다.
4. 로그인 성공 시 사용자 정보 객체와 함께 `req.login` 을 호출한다.
5. `req.login` 메서드가 `passport.serializeUser` 를 호출한다.
6. `req.session` 에 사용자 아이디만 저장해서 세션을 생성한다
7. `express-session`에 설정한 대로 브라우저에 `connect.sid` 세션 쿠키를 전송한다. 
8. 로그인이 완료된다. 

#### 로그인 이후

1. 모든 요청에 `passport.session()` 미들웨어가 `passport.deserializeUser` 메서드를 호출한다. 
2. `connect.sid` 세션 쿠키를 읽고 세션 객체를 찾아서 `req.session` 으로 만든다. 
3. `req.session` 에 저장된 아이디로 데이터베이스에서 사용자를 조회한다. 
4. 조회된 사용자 정보를 `req.user` 에 저장한다.
5. 라우터에서 `req.user` 객체를 사용할 수 있게 된다. 

## Local Login

로컬 로그인을 구현하기 위해서는 `passport-local` 모듈이 필요하다. 

위 로그인 과정을 참고해 어떤 순서로 코드가 실행되는지 알아보자.

> Passport는 req 객체에 login와 logout 메서드를 추가해준다. 
>
> - req.login은 user객체와 함께 passport.serializeUser을 호출
> - req.logout은 req.user와 req.session 객체를 제거

1. 클라이언트에서 로그인 호출 시 `login` 실행 

   ```js
   // router/auth
   import { login } from '../controllers/auth';
   
   router.post('/login', isNotLoggedIn, login);  
   ```

2. `login` 라우터 미들웨어에서 `passport.authenticate()` 메서드 호출 

   ```js
   // controller/auth
   export const login = async (req, res, next) => {
   	passport.authenticate('local', (authError, user, info) => {
       // 전략 실패 시
       if (authError) {
         console.error(authError);
         return next(authError);
       }
       // 사용자 정보가 없을 경우
       if (!user) {
         return res.redirect(`/?loginError=${info.message}`);
       }
       // 전략 성공시 req.login 호출 -> passport.serializeUse() 호출
       return req.login(user, (loginError) => {
         if (loginError) {
           console.error(loginError);
           return next(loginError);
         }
         return res.redirect('/');
       });
     })(req, res, next); // 미들웨어 안에 미들웨어가 있으므로, (req,res,next)를 끝에 붙여서 호출해준다.
   }
   ```

​		2-1. 로컬 로그인 전략(`localStrategy`) 실행 

​		2-2. 전략 성공시 사용자 객체(`user`) 와 함께 `req.login` 호출

​		2-3. `req.login` 은 사용자 객체(`user`) 와 함께 `passport.serializeUser` 호출

3. `connect.sid` 세션 쿠키가 브라우저에 전송 

## LocalStrategy

`LocalStrategy` 생성자의 구조를 살펴보자.

```js
new LocalStrategy({
	// 전략에 관한 옵션(IStrategyOptions)
}, async(email, password, done) => {
	// 실제 전략을 수행(verifyFunction)
  // email, password은 첫번째 인수에서 넣어준 email,password
  // done은 passport.authenticate의 콜백 함수
})
```

실제 전략의 내용을 알아보기 위해 `localStrategy.js` 를 살펴보자.

```js
const LocalStrategy = require('passport-local').Strategy;

export default () => {
  passport.use(new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          // User 데이터베이스에서 일치하는 이메일 있는지 찾기
          const exUser = await User.findOne({ where: { email } });
          // 유저 있다면 비밀번호 일치하는지 비교
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            // 일치하다면 (로그인 성공)
            if (result) {
              done(null, exUser);
            } 
            // 일치하지 않다면 (로그인 실패)
            else {           
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } 
          // 일치하는 이메일이 없다면 (로그인 실패)
          else {
            done(null, false, { message: '가입되지 않는 회원입니다.' });
          }
        } catch (error) {
          // 전략 실패시 
          console.error(error);
          done(error);  
        }
      },
    ),
  );
};
```

위 코드에서 `done()` 는 `controller/auth.js` 의 `passport.authenticate` 함수의 콜백 함수로 이어진다.

```js
// controller/auth.js
passport.authenticate('local', (authError, user, info) => { 
  const { email, name, intro, profileImg } = user;
```

만약 `localStrategy` 에서 로그인에 성공하여 `done(null, exUSer)` 를 호출했을 경우, 위 코드에서 `authError` 값으로 `null` 가 전달되고, `user` 값으로 `exUser` 값이 전달되는 것이다. 

## Kakao Login

카카오 로그인을 구현하기 위해서는 `passport-kakao` 모듈이 필요하다. 

카카오 로그인 전략인 `kakaoStrategy.js` 코드를 뜯어보자.

```js
import passport from 'passport';
import User from '../models/user';

const KakaoStrategy = require('passport-kakao').Strategy;

export default () => {
  passport.use(
    new KakaoStrategy({
      clientID: process.env.KAKAO_ID, // 카카오에서 발급 받은 아이디 
      callbackURL: '/auth/kakao/callback', // 카카오로부터 인증 결과를 받을 라우터 주소
    }),
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 카카오를 통해 이미 회원가입을 한 유저 찾는다.
        const exUser = await User.findOne({
          where: { snsId: profile.id, provider: 'kakao' },
        });
       // 유저 있다면 회원 정보 전달 
        if (exUser) {
          done(null, exUser);
        } 
        // 없다면 새로 회원가입 
        else {
          const newUser = await User.create({
            email: profile._json?.kakao_account?.email,
            name: profile.displayName,
            snsId: profile.id,
            provider: 'kakao',
          });
          done(null, newUser);
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    },
  );
};

```

local 로그인과 다른 점은 `passport.authenticate('kakao')` 에 콜백 함수를 제공하지 않는다는 것이다. 카카오 로그인은 로그인 성공 시 내부적으로 `req.login` 을 호출하므로 우리가 직접 호출할 필요가 없다.

### 카카오 애플리케이션 등록

https://developers.kakao.com/ 에 들어가서 새로운 애플리케이션을 만들면 키를 발급해준다.

- 발급받은 REST_API 키를 .env에서 `KAKAO_ID` 에 넣어준다.
- 플랫폼 > Web 플랫폼 등록 > 프론트 도메인을 넣어준다. 
- 제품 설정 > 카카오 로그인 활성화 상태를 ON 으로 설정한다.
- 아래 Redirect URL에 `kakaoStrategy` 의 `callbackURL` 을 넣어준다. 
- 동의 항목에서 회원 정보로 수집할 항목을 설정한다. (이메일 필수)



## 참고 문서

https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-Passport-%EB%AA%A8%EB%93%88-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%B2%98%EB%A6%AC%EA%B3%BC%EC%A0%95-%F0%9F%92%AF-%EC%9D%B4%ED%95%B4%ED%95%98%EC%9E%90
