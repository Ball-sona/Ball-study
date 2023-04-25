# Express로 SNS 만들기

SNS를 만들어보자.

기능 

- 로그인 및 회원가입
- 이미지 업로드
- 게시글 작성
- 해시태그 검색
- 팔로잉 

## Node.js 책과 다르게 가져간 부분

1. server와 front 폴더를 각각 생성 후, 간단한 프론트 프로젝트를 생성해서 API를 잘 만들고 있는지 확인했다. 템플릿을 사용하지 않기 위함.
2. 패키지 매니저로 npm 대신 pnpm를 사용했다.
3. ES6 문법을 사용했다. 

## Babel Settings

Node.js에서 ES6 문법을 사용해 코드를 작성하면 에러가 발생할 수 있으므로 Babel을 사용해주자. 

> Babel은 ECMAScript 최신 문법로 작성된 코드들을 현재 및 과거의 브라우저와 같은 환경에서 실행할 수 있도록 변화해주는 트랜스파일러이다.

먼저 Babel 관련 패키지들을 설치해준다.

```shell
pnpm i @babel/core @babel/cli @babel/preset-env @babel/node --save-dev
```

- @babel/core : Babel
- @babel/cli : Babel 커맨드 라인 도구. `babel` 명령어를 통해 코드를 transpile함.
- @babel/preset-env : 코드를 어떻게 변환할지 Babel 설정. `env` 는 가장 범용적인 Preset으로 ES6이상 문법 해석 가능
- @babel/node : `babel-node` 명령어를 통해 transpile과 실행을 한번에 할 수 있도록 함. 

 `npx babel-node --presets @babel/env index.js` 처럼 커맨드를 통해 코드 변환과 실행을 동시에 할 수 있다. 그러나 매번 커맨드에 바벨 관련 옵션을 붙이기 번거로우므로, 디렉토리 최상단에 `.babelrc` 파일을 생성해 이와 관련된 설정을 해주자. 

```
// .babelrc
{
  "presets": ["@preset/env"]
}
```

마지막으로 변환이 자동으로 될 수 있도록 `package.json` 의 스크립트를 수정해준다.

```
"scripts": {
  "dev": "nodemon --exec babel-node app",
  "build": "babel src -d build"
},
```

- `nodemon` 을 사용중이므로 `--exec` 옵션을 통해 `babel-node` 를 사용해줄 수 있다.
- build 명령어를 실행하면 `src` 에 있는 파일들을 transpile하여 그 결과물을 `build` 폴더에 생성한다. 

#### 참고

- [NodeJS 기본 설정하기 (nodemon, babel)](https://velog.io/@wiostz98kr/NodeJS-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-nodemon-babel)
- [Node.js로 ES6 코드 실행하기 (Babel)](https://www.daleseo.com/js-babel-node/)

## Server Settings

Express-generator를 사용하지 않고 프로젝트를 세팅해보자. 

```bash
pnpm i sequelize mysql2 
sequelize init
```

사용자와 게시물 간, 그리고 게시물과 해시태그 간의 관계가 중요하므로 관계형 데이터베이스인 MySQL를 사용한다.

```shell
pnpm i express cookie-parser express-session morgan connect-flash pug
pnpm i -D nodemon
```

필요한 패키지들을 설치하고 사용할 폴더들을 추가해주면 서버의 폴더 구조는 다음과 같다.

### 폴더 구조

필요한 npm 패키지들과 사용할 폴더들을 생성하면 서버의 폴더 구조는 다음과 같다. 

```
server
├── node_modules/
├── config
├── migrations
├── models
├── passport
├── public
├── routes
├── seeders
├── app.js
├── package.json
└── pnpm-lock.yml
```

~~이 프로젝트는 콘솔에서 실행 가능한 명령어로 만들 필요가 없으므로 bin/www는 필요하지 않습니다. ???~~

### 비밀키 관리 

비밀키를 하드코딩하면 소스 코드가 유출되었을 때 키도 함께 유출되므로 별도로 관리해주자.

```
pnpm i dotenv
```

`.env` 파일을 생성해서 키=값 형식으로 비밀키를 추가해준다.

```
COOKIE_SECRET=express-sns-sona
```

이는 `process.env.COOKIE_SECRET` 형식으로 사용할 수 있다. 

## Front Settings

Vite + React-ts 로 빠르게 세팅하고, 템플릿을 간단하게 만들어주자. <img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-03-01 02.58.28.png" alt="스크린샷 2023-03-01 02.58.28" style="zoom:50%;" />



## Database Settings

MySQL + Sequelize 

### Models

User, Post, Hashtag 에 대한 모델들을 만들어준다. 이때 소셜 로그인을 사용할 것이므로, User 모델에 `provider` 와 `snsId` 를 추가한다. `provider` 가 `local` 이면 일반 로그인이고, `kakao` 이면 카카오로 로그인했음을 의미한다. 

### Relationships

각 모델들의 관계를 생각해보자.

- 사용자와 게시물이 1:1 관계
- 게시물과 해시태그가 N:M 관계
- 사용자와 사용자가 N:M 관계 

3번째 관계는 팔로우 기능을 구현하기 위함이다. 사용자 한 명이 팔로워를 여러 명 가질 수도 있고, 여러 명을 팔로잉할 수도 있다. 따라서 User 모델 간의 N:M 관계를 통해 Follow 모델을 생성해준다. 

<img src="https://user-images.githubusercontent.com/67703882/222108679-f0305842-20a8-4ba6-97d2-7150426e956d.png" alt="image" style="zoom:80%;" />

```js
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId', // 팔로우 id, 팔로워 id 컬럼을 구별하기 위해 설정한다. 
  as: 'Followers', // JOIN 작업 시 사용하는 이름. 이를 바탕으로 메서드를 추가한다. 
  through: 'Follow', // 생성될 모델 이름
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});
```

### Database

`config.json`에 데이터베이스 이름과 비밀번호를 넣어준다.

이후 데이터베이스를 생성해주자.

```shell
sequelize db:create
```

모델을 서버와 연결한다.

```js
//app.js
import DB from './models';

DB.sequelize.sync();
```

서버를 실행하면 시퀄라이즈가 알아서 데이터베이스에 테이블들을 생성해준다. 

