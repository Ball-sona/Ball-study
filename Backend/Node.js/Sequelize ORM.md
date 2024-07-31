# Sequelize ORM

시퀄라이즈는 노드에서 MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리이다. (다른 RDB도 가능) 즉 자바스크립트로 구문을 알아서 SQL로 바꿔주는 도구이다. 이는 ORM(Object-relational Mapping) 중 하나이다.

> ORM은 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구이다.

## Sequelize 시작하기

시퀄라이즈를 설치하고 초기 세팅을 해준다.

```bash
npm i sequelize mysql2
npm i -g sequelize-cli
sequelize-init
```

sequelize-cli 가 자동으로 생성해주는 코드는 필요없는 부분이 많고 에러가 발생할 수 있으므로 다음과 같이 수정해준다.

```js
// models/index.js
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

### MySQL와 연결

```js
const sequelize = require('./models').sequelize;

sequelize.sync(); // 서버 실행시 알아서 mySQL과 연동된다.
```

## 모델 정의하기

MySQL 테이블과 컬럼 내용이 일치해야 정확하게 대응이 된다.

```js
// models/[table].js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('테이블명', '{ 컬럼 스펙 }', '{테이블 옵션}');
};
```

### 시퀄라이즈 자료형 및 옵션

- `STRING` = VARCHAR, `INTEGER` = INT
- `BOOLEAN` = TINYINT
- `DATE` = DATETIME
- `INTEGER.UNSIGNED` = unsigned 옵션이 적용된 정수
- `INTEGER.UNSIGNED.ZEROFILL ` = zerofill 옵션 적용
- `allowNull` = NOT NULL
- `unique` = UNIQUE
- `DataTypes.NOW` = now()

### 테이블 옵션

- `timestamps` 옵션은 createdAt 와 updatedAt 컬럼을 추가하여 로우가 생성될 때와 수정될 때 시간을 자동으로 입력한다.
- `paranoid` 옵션은 deletedAt 컬럼을 자동으로 추가하여 로우를 삭제하는 명령을 내렸을 때 로우를 제거하는게 아닌 deleteAt에 제거된 날짜를 입력한다. 로우를 조회하는 명령을 내릴때는 deletedAt 값이 null인 로우를 조회한다. `timestamps` 옵션을 사용하고 있어야 사용 가능하다. (데이터 복구를 위한 옵션)
- `underscored` 옵션은 createdAt, updatedAt, deletedAt 컬럼이나 시퀄라이즈가 자동으로 생성해주는 관계 컬럼의 이름을 스네이크케이스 형식으로 바꿔준다. (ex. created_at)
- `tableName` 속성은 테이블 이름을 다른 것을 설정하고 싶을 때 사용한다. 시퀄라이즈는 `define` 메서드의 첫번째 인자로 넣어준 '테이블명'을 자동으로 복수형으로 만들어 테이블 이름으로 사용한다. 이러한 자동 변환을 막기 위해 해당 옵션을 사용한다.

모델을 모두 생성했다면 `models/index.js` 와 연결한다. 이렇게 User와 Comment 모델을 db 객체에 담으면, db 객체를 require 하여 모델들에 접근할 수 있다.

```js
// models/index.js
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
```

마지막으로 `config.json` 을 수정하여 MySQL와 연결한다.

```json
"development": {
  "username": "root",
  "password": "[root 비밀번호]",
  "database": "node-study",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false // 보안에 취약한 연산자를 사용할지 여부를 설정하는 옵션
},
```

## 관계 정의하기

테이블 관계에는 3가지 종류가 있다.

- 1:N (ex. 사용자 테이블과 댓글 테이블)
- 1:1 (ex. 사용자 테이블와 사용자에 대한 정보 테이블)
- N:M (ex. 게시글 테이블과 해시태그 테이블 )

MySQL 에서는 JOIN 이라는 기능으로 여러 테이블 간의 관계를 파악해 결과를 도출한다. 시퀄라이즈에게 테이블 간의 관계를 알려주면 알아서 JOIN 기능을 구현해준다.

### 1:N

시퀄라이즈에서는 1:N 관계를 `hasMany` 메서드로 표현한다. 이 메서드를 통해 `users`(1) 테이블의 로우를 불러올 때 연결된 `comments`(n) 테이블의 로우도 같이 불러 올 수 있다. 반대로 `belongTo` 메서드를 통해 comments 테이블의 로우를 불러올 때 `users` 의 로우를 불러올 수 있다.

```js
db.User.hasMany(db.Comment, {
  foreignKey: 'commenter',
  sourceKey: 'id',
});
db.Comment.belongsTo(db.User, {
  foreignKey: 'commenter',
  targetKey: 'id',
});
```

### 1:1

1:1 관계에서는 `hasOne` 메서드를 사용한다. 1:1 관계에서는 `hasOne` 와 `belongTo` 가 같은 역할을 한다.

```js
db.User.hasOne(db.Info, {
  foreignKey: 'commenter',
  sourceKey: 'id',
});
db.Info.belongsTo(db.User, {
  foreignKey: 'commenter',
  targetKey: 'id',
});
```

### N:M

N:M 관계를 표현하기 위해서는 `belongsToMany` 메서드를 사용한다.

```js
db.Post.belongsToMany(db.HashTag, { through: 'PostHashTag' }); // through는 생성될 모델 이름
db.HashTag.belongsToMany(db.Post, { through: 'PostHashTag' });
```

<img src="https://user-images.githubusercontent.com/67703882/221236920-fa6dc749-da1a-4d5b-972f-d4bf60b5690f.png" alt="image" style="zoom:50%;" />

같은 테이블 간 N:M 관계도 있을 수 있다. 팔로잉 기능이 대표적인 N:M 관계이다. 이는 아래와 같이 관계를 정의할 수 있다.

```
db.User.belongsToMany(db.User,{
	foreignKey: 'followingId',
	as: 'Followers',
	through: 'Follow'
})
db.User.belongsToMany(db.User,{
	foreignKey: 'followerId',
	as: 'Followings',
	through: 'Follow'
})
```

같은 테이블 간 N:M 관계에서는 `as` 옵션을 반드시 넣어야 한다. 둘 모두 User 모델이므로 이를 구분하기 위함이다.

이때 주의할 점은 `as` 는 `foreignKey` 와 반대되는 모델을 가리켜야 한다.

### N:M 관계에서 데이터 조회하기

게시물 테이블과 해시태그 테이블이 N:M 관계를 맺고 있을 때, '#노드' 라는 해시태그를 가진 게시물을 조회하는 과정을 생각해보자.

1. '#노드' 해시태그를 `HashTag` 모델에서 조회한다.
2. 가져온 태그의 id를 바탕으로 `PostHashTag` 모델에서 hashtagId가 해당 id인 postId를 찾는다.
3. 찾은 postId를 바탕으로 `Post` 모델에서 정보를 가져온다.

```js
async (req, res, next) => {
  const tag = await Hashtag.find({ where: { title: '노드' } });
  const posts = await tag.getPosts(); // get + [모델 이름의 복수형]
};
```

```js
async (req, res, next) => {
  const tag = await Hashtag.find({ where: { title: '노드' } });
  await tag.addPosts(); // ?
};
```

## Sequelize Query

### Create

```js 
const { User } = require('../models');

User.create({
	name:'sona',
	age:24,
})
```

주의할 점은 데이터를 넣을 때 MySQL의 자료형이 아니라 시퀄라이즈 모델에 정의한 자료형대로 넣어야 한다.

### Read

```js
const { User, Sequelize: { Op } } = require('../models');

User.findAll({});  // SELECT * FROM users;
User.find({});     // SELECT * FROM users LIMIT 1;

User.findAll({     // SELECT name, married FROM users;
  attributes: ['name', 'married']
});
User.findAll({     // SELECT name, age FROM users WHERE married = 0 OR age > 30;
  attributes: ['name','age'],
  where: {
    [Op.or]: [{married:0}, {age: [Op.gt]:30 }],
  }
});
User.findAll({     // SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;
  attributes: ['id', 'name'],
  order: [['age', 'DESC']],
  limit:1,
  offset:1,
});
```

> **Op 연산자**
>
> - `Op.gt` 는 초과, `Op.gte` 는 이상, `Op.lt` 는 미만, `Op.lte` 는 이하
> - `Op.ne` 는 같지 않음
> - `Op.or` 은 또는, `Op.in` 는 배열 요소 중 하나, `Op.notIn` 은 배열 요소와 모두 다름

### Update

```js
User.update(
  {
    // UPDATE users SET comment = '바꿀 내용' WHERE id = 2;
    comment: '바꿀 내용',
  },
  {
    where: { id: 2 },
  }
);
```

### Delete

```js
User.destroy({
  // DELETE FROM users WHERE id = 2;
  where: { id: 2 },
});
```
