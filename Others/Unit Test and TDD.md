# 유닛 테스트와 TDD

## 1. Testing 란?

- Software Test = Software 제품이 예상하는 대로 동작 하는지 확인하는 과정
- 목표, 플랫폼, 환경에 따른 다양한 테스트

- 과거에는 QA 단계에서 수동적으로 테스트 -> 개발 과정 내에서 QA 자동화

#### Test Pyramid (어떤 환경이든 필수적으로 필요한 테스트들) 

<img src="https://user-images.githubusercontent.com/67703882/213847903-eeee5db1-c43a-4bfc-867c-97a61b340ca5.png" alt="image" style="zoom: 50%;" />

- **E2E Test (End-to-end)** : UI 혹은 사용자 테스트 

- **Integration Test** : 여러 개의 단위들이 잘 상호작용하는지 테스트

- **Unit Test (단위 테스트)** : 함수, 모듈, 클래스 등 독립적인 단위가 잘 동작하는지 테스트 

- Unit -> Integration -> E2E 로 갈수록 테스트 비용이 높아지고, 수행 속도는 느려지고, 개발적인 효율성이 떨어진다. 그렇기 때문에 Unit Test를 많이 작성하는게 좋다. 
- Unit, Integration test는 개발자가 담당하고, E2E Test는 QA가 작성하는 경우도 있다. 

### TDD(Test-driven Development)

- TDD 프로세스
  1. 테스트 코드 작성
  2. 테스트 실행 시 `fail`
  3. 테스트 통과할 수 있는 만큼의 코드를 작성
  4. 테스트 성공할 때까지 코드 수정 및 테스트 반복
  5. 전체 테스트 성공시 리팩토링

- TDD는 개발을 하는 방법 중 하나,
-  언제 사용? 
  - 요구 사항이 명확할 때. 비즈니스 로직. 협업시 명세서 역할. 설계에 대한 고민.

## 2. Unit Test

- Unit Test

  - Test Runner : 테스트를 실행 후 결과 생성 (ex. Mocha)
  - Assertion : 테스트 조건, 비교를 통한 테스트 로직 (ex.Chai, expect.js, better-assert)

  - Jest

### Jest

- Javascript Testing Framework with a focus on simplicity
- 특징 
  - zero config (복잡하지 않은 설정)
  - snapshots 지원 
  - 다양하고 좋은 api 제공 (it, expect 등)
  - 쉬운 mocking
  - great exception 

- 작성법 

  - `add.js`

    ```js
    const add = (a,b) => a+b;
    ```

  - `add.test.js`

    ```js
    const addFn = require('./add');
    
    test('',()=>{
      expect(addFn(1,2)).toBe(3);
    })
    ```

- 테스트 코드 자동화

  - 새로고침 할때마다 테스트 코드들을 수행하고 싶다면 `jest --watchAll`
  - git 저장소에 커밋된 부분을 제외한 현재 수정중인 부분에 대해서만 테스트 코드들을 수행하고 싶다면 `jest --watch`

  

- `beforeEach` , `afterEach`
- `beforeAll`, `afterAll`