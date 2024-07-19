# Lint

코드 품질을 위한 코드 분석 도구

## Eslint vs Prettier

### 역할

- Eslint: 코드 퀄리티 툴 → 문법적 오류나 안티 패턴을 찾아내는 데 특화
- Prettier: 코드 포멧팅 툴 → 코드 스타일 교정에 특화

### 두 도구를 같이 사용하려면?

- `eslint-config-react-app` 사용 시 별다른 설정 없이 그냥 같이 사용 가능 (CRA)
- `prettier-eslint` 은 prettier 실행 후 eslint 실행
  - 메인테이너가 사용을 추천하지 않음..
- `eslint-plugin-prettier` 은 prettier를 린터 룰인 것처럼 사용하는 방식
  - 포멧팅 문제도 오류로 간주해서 오류 메세지 지나치게 많아지고 속도 느림
- `eslint-config-prettier` 은 충돌하는 eslint 규칙을 전부 끄는 방법

> eslint-config-prettier를 많이 사용한다.

## Sonarlint

- 일반적으로 ESLint보다 더 강력한 린트 룰을 제공한다.
- [vscode에서 사용하는 방법](https://www.prplbx.com/resources/blog/how-to-configure-sonarlint-in-visual-studio-code/)

## 참고 문서

- [prettier와 eslint를 구분해서 사용하자](https://yrnana.dev/post/2021-03-21-prettier-eslint/)
