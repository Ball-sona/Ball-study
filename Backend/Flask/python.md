# python 

## .venv

- npm, maven은 프로젝트 별로 패키지 버전을 관리하지만, pip는 전역으로 관리 -> 버전 충돌 가능
- `venv` 내장 모듈을 통해 가상 환경 생성 

https://www.daleseo.com/python-venv/

## 내장 변수

- `__name__`: 현재 모듈의 이름을 담고 있는 내장 변수
  - 만약 모듈이 직접 실행되면, `__name__` 변수는 문자열`"__main__"`이 할당됩니다. 반대로, 모듈이 import 되어 사용될 때는,`__name__`변수는 해당 모듈의 이름(파일명)이 할당됩니다.

## SQLite



## package

- pyproject.toml
- pip install -e .