# yarn workspaces

패키지 매니저의 yarn이 지원하는 workspaces를 사용하여 모노레포를 구축할 수 있다. 

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
  	"dev": "vite",
  }
}
```

### name

`name`에는 workspace-root의 `workspaces` 배열에 들어있는 문자열과 동일한 값을 넣어주어야 한다.

### script

root 프로젝트의 `script` 에 `workspaceA`, `workspaceB`를 지정해주었으므로, 매번 프로젝트들을 실행할때마다 해당 프로젝트로 이동하지 않고 이들을 실행할 수 있다. 만약 `workspace-a`의 `dev` 명령어를 실행해야 한다면 `yarn workspaceA dev` 를 실행하면 된다.

## dependencies

- 각 프로젝트들이 사용할 패키지들이 `dependecies`에 명시되어 있으면, `yarn` 실행 시 해당 패키지들이 한번에 설치된다.
- 이때 패키지들은 모두 상위 `node_modules`에 중복 제거되어 설치된다.
- 만약 각 프로젝트들이 공통으로 사용하는 패키지(ex. typescript)가 있다면 이들은 루트 package.json `dependencies` 에 명시하는 것이 좋다.

## tsconfig.json

루트 tsconfig.json에는 공통 설정사항을 넣고, 각 프로젝트의 tsconfig.json에는 개별 설정사항을 넣을 수 있다. 이때 몇가지 설정 사항이 필요하다.

- 루트 tsconfig.json의 `references` 에 개별 tsconfig.json 가 설정되어 있는 레포 경로를 지정해줘야 한다.

  ```
  {
  	"compilerOptions": {...},
    "references": [
      { "path": "./workspace-a"},
    ]
  }
  ```

- 개별 tsconfig.json에서는 `extends` 속성에 루트 tsconfig.json 파일 경로를 지정해줘야 한다.

  ```
  {
  	"extends": "../tsconfig.json",
  	"compilerOptions": {...},
  }  
  ```

  

