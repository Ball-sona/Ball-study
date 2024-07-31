# Github Action

## Github Action 이란?

- 소프트웨어 workflow 자동화할 수 있도록 도와주는 도구
- 한도
  - workflow는 레포 하나당 최대 20개까지 등록 가능
  - workflow 내 존재하는 job은 6시간동안 실행될 수 있고, 초과시 자동으로 중지된다.

## Github Action 핵심 개념

- Workflow
  - 여러 job으로 구성되고 event에 의해 트리거되는 자동화된 프로세스
  - `.yml` 파일로 작성
  - `.github/workflows` 폴더 내에 저장된다
- Event
  - Workflow를 트리거하는 특정 활동이나 규칙
  - ex. 특정 브랜치로 Push/Pull Request or 특정 시간대에 반복(Cron) 등
- Job
  - 여러 step으로 구성되고 가상 환경의 인스턴스에서 실행된다
  - 다른 job과 의존 관계 가질 수 있고, 독립적으로 병렬 실행도 가능
- Step
  - task 들의 집합. command 날리거나 action 실행 가능
- Action
  - workflow의 가장 작은 블럭
  - job을 만들기 위해 step 연결 가능
  - 재사용 가능한 컴포넌트
  - 개인적으로 만들어 사용할 수 있고, marketplace에 있는 공용 action도 사용 가능하다
- Runner
  - Github Action Runner 애플리케이션이 설치된 머신으로 workflow가 실행될 인스턴스
  - github-hosted runner or self-hosted runner

## yml 파일 예시

- main 브랜치에 push 혹은 pull request 할 경우 실행되는 CI 라는 workflow

  ```yaml
  name: CI

  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]

  jobs:
    build:
      runs-on: ubuntu-latest

      steps:
        - uses: actions/checkout@v2

        - name: Run a one-line script
          run: echo Hello, world!

        - name: Run a multi-line script
          run: |
            echo Add other actions to build,
            echo test, and deploy your project.
  ```

  - `on` : event에 대해 작성. 어떤 조건에 workflow를 실행할지.
    - push. pull_request. schedule
  - `jobs` : build 라는 job을 생성하고 그 아래에 2개의 step이 존재하는 구조임
  - `runs-on` : 어떤 OS에서 실행될지 지정
  - `uses` : 어떤 액션을 사용할지 지정. 이미 만들어진 액션을 사용할 경우

## 참고

https://zzsza.github.io/development/2020/06/06/github-action/

https://fe-developers.kakaoent.com/2022/220106-github-actions/
