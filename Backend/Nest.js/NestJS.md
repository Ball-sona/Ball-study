# NestJS

Node.js에서 실행하는 서버 사이드 프레임워크

## 특징

- 타입스크립트 완벽 지원
- 자바스크립트 최신 스펙 사용 -> 바닐라 자바스크립트 사용시 babel 필요
- HTTP 요청은 추상화된 코드를 제공해 Express or Fastify 사용 가능
  - Express는 생태계가 더 크고, Fastify는 성능이 더 빠름.

## vs Express

- 익스프레스는 '미니멀'을 추구하는 프레임워크라면, 네스트는 자바스크립트 최신 기능을 사용해 효율성을 추구하고 상업용 애플리케이션 구축을 목표로 하는 프레임워크
- 익스프레스는 라우터 함수나 미들웨어 생성해서 라우팅, 네스트는 `@Controller()` 데코레이터 사용
- 익스프레스는 직접 에러 처리를 해야하지만, 네스트는 `@Catch()` 데코레이터 사용
- 익스프레스는 직접 테스트 도구 설치 및 실행해야 하지만, 네스트는 `jest` 기반 내장 테스트 모듈 사용
- <u>익스프레스는 아키텍처에 대한 자유도가 높지만, 네스트는 Controller - Provider - Module 사용한 아키텍처 제공</u>
- 네스트는 '의존성 주입 기능' 제공하여 의존 관계 관리가 쉬움

## 아키텍처

- Controller -> Service -> Repository 

## 설치 및 세팅

```
yarn add @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata
```

```bash
yarn add -g @nestjs/cli
nest new [project-name]

nest g module weather # weather.module.ts 생성
nest g controller weather --no-spec # weather.controller.ts 생성
```

## Typescript 세팅

```json
{
	"compileOptions:":{
    "module": "commonjs", 
    "emitDecoratorMetadata": true, // 데코레이터의 메타데이터를 같이 내보낼지 여부
    "experimentalDecorators": true, // 데코레이터를 사용할지 여부
	}
}
```

- 데코레이터의 메타데이터란, 데코레이터가 달린 곳이 함수인지 클래스인지 변수인지에 대한 여부와 매개변수가 있다면 해당 타입과 결괏값을 포함한다.
- 메타 데이터를 넣을 때 `reflect-metadata` 가 사용되고, 이때 `emitDecoratorMetadata` 가 반드시 설정되어 있어야 한다.
