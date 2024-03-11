# yarn workspaces

yarn workspaces를 사용하여 모노레포를 구축해보자.

## monorepo 구조

- workspace-root
  - workspace-a
  - workspace-b

## package.json

workspace-root의 package.json

```json
{
  "private": true,
  "script": {
    "workspaceA": "yarn workspace workspace-a",
    "workspaceB": "yarn workspace workspace-b"
  }
  "workspaces": [
    "workspace-a","workspace-b"
  ],
}
```

workspace-a/workspace-b의 package.json

```json
{
  "name": "workspace-a",
  "script": {
    "dev": "vite"
  }
}
```

### name

`name`에는 workspace-root의 `workspaces` 배열에 들어있는 문자열과 동일한 값을 넣어주어야 한다.

### script

root 프로젝트의 `script` 에 `workspaceA`, `workspaceB`를 지정해주었으므로, 매번 프로젝트들을 실행할때마다 해당 프로젝트로 이동하지 않고 이들을 실행할 수 있다. 만약 `workspace-a`의 `dev` 명령어를 실행해야 한다면 `yarn workspaceA dev` 를 실행하면 된다.

## dependencies

루트에서 `yarn` 명령어 실행 시 루트를 비롯한 각 프로젝트들의 `dependencies`에 명시되어 있는 패키지들이 설치된다.

- `workspace-root` 가 16 버전의 `react` 패키지를 의존성으로 두고 있다면, 루트 `node_modules`에 `react` 가 설치된다.
- 만약 `workspace-a`가 동일한 버전의 패키지를 의존성으로 두고 있다면, 마찬가지로 루트 `node_modules` 에만 `react` 가 설치된다.
- 만약 `workspace-a`가 18 버전의 `react` 패키지를 의존성으로 두고 있다면, 루트에는 16버전이, `workspace-a` 내 `node_modules`에는 18 버전의 `react` 가 각각 설치된다.

모든 프로젝트들이 공통으로 사용하는 패키지(ex. typescript, eslint)를 설치할때는 `yarn add <package> -W` 를 사용한다. 이들은 루트 package.json의 `dependencies`에 명시된다.

## tsconfig.json

루트 tsconfig.json에는 공통 설정사항을 넣고, 각 프로젝트의 tsconfig.json에는 개별 설정사항을 넣을 수 있다. 이때 몇가지 설정 사항이 필요하다.

- 루트 tsconfig.json의 `references` 에 개별 tsconfig.json 가 설정되어 있는 레포 경로를 지정해줘야 한다.

  ```json
  {
  	"compilerOptions": {...},
    "references": [
      { "path": "./workspace-a"}, // override
    ]
  }
  ```

- 개별 tsconfig.json에서는 `extends` 속성에 루트 tsconfig.json 파일 경로를 지정해줘야 한다.

  ```json
  {
  	"extends": "../tsconfig.json",
  	"compilerOptions": {...},
  }
  ```
