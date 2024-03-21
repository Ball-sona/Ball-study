# Get Started

## Install

## Project Structure

Gatsby 프로젝트를 설치하면 기본적인 파일들이 생성이 되는데, 기존 리액트 프로젝트와는 조금 구조가 달라서 몇개의 폴더나 파일에 대해서 정리해보려 한다. 

### Folders

- `/.cache` : 개츠비에서 자동으로 생성해내는 내부 캐시 파일
- `/pulbic` : 빌드 결과물이 자동으로 생성되는 폴더
- `/plugins` : npm에는 배포되어 있지 않은 local 패키지를 host 하는 폴더
- `/static` : 해당 폴더 내에 있는 파일은 webpack에 의해 처리되지 않고, 바로 `public` 폴더에 복사된다.
- `src/html.js` : `.cache/default.html.js` 를 커스터마이징하는 파일 

### Files

모두 프로젝트 폴더 `root` 에 생성되는 파일들로, ts로도 작성 가능하다.

- `gatsby-browser.js` : 브라우저에 영향을 주는 Gatsby 기본 세팅을 커스터마이징 및 확장한다. `Gatsby broswer API` 가 사용될 것.
- `gatsby-config.js` : Gatsby 사이트의 메인 설정을 담는다. 사이트 제목 및 설명을 비롯한 Metadata부터 사용되는 플러그인 관련 설정까지 다양한 설정들이 들어가있다.
- `gatsby-node.js` : 사이트 빌드 프로세스에 영향을 주는 Gatsby 기본 세팅을 커스터마이징 및 확장한다. `Gatsby Node API` 가 사용될 것
- `gatsby-ssr.js` : 서버 사이드 렌더링에 관련된 Gatsby 기본 세팅을 커스터마이징한다. `Gatsby Server side Rendering API` 가 사용될 것.



## Gatsby Browser API

## Gatsby Node API

Gatsby는 사이트를 빌드하는 과정에서 딱 한번 `gatsby-node.js` 파일 내 코드를 실행하게 된다. 우리는 해당 파일 내에서 페이지를 동적으로 생성할 수 있고, GraphQL에 데이터를 추가할 수 있으며, 빌드 라이프사이클 동안 특정 이벤트들에 응답할 수 있다. 

모든 Gatsby Node API들은 `helper` 를 전달받는다. 이는 reporting 같은 특정 메서드에 접근하거나, 새로운 페이지 생성 같은 액션을 수행할 수 있도록 도와준다. 

### Aysnc Work

Disk I/O, 데이터베이스 접근, Remote API 호출 등 비동기 연산을 수행하고 싶을 때, 우리는 반드시 `Promise`를 반환하거나 3번째 인자에 콜백을 전달해야 한다. Gatsby needs to know when plugins are finished as some APIs, to work correctly, require previous APIs to be complete first.

### `createPages`

페이지를 동적으로 생성하는 함수. 중요한 점은 노드의 초기 sourcing 및 변환과 GraphQL 생성이 모두 완료된 이후에 `createPages` 가 호출된다는 것이다. 페이지 생성을 위해 데이터를 query할 수 있기 위함이다.

페이지 생성을 위해 외부 데이터 혹은 로컬 요소들을 fetch할 수도 있다. 

```js
exports.createPages = ({graphql, actions}) => {
	const { createPage } = actions;
	const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
	
	return graphql(`
		# Query for markdown nodes
		query loadPagesQuery($limit:Int!) {
			allMarkdownRemark(limit:$limit){
				edges {
					node {
						frontmatter
						slug
					}
				}
			}
		}
	`, {limit:1000}).then(result => {
    // Create Blog Post Pages
		result.data.allMarkdownRemark.edges.forEach(edge => {
			createPage({
				path: `${edge.node.frontmatter.slug}`,
				component : blogPostTemplate, 
			})
		})
	})
}
```

## GraphQL Typegen

