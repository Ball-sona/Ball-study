# Querying Data With Graphql

GraphQL 쿼리를 이용해 컴포넌트에 데이터를 불러와보자.

## Data Layer

Gatsby는 GraphQL **Data Layer** 를 통해 사이트에 필요한 데이터를 유지할 수 있도록 한다.

<img src="https://www.gatsbyjs.com/static/e45422900475b86807bc002fb6863b85/10d53/data-layer.png" />

우리가 사이트에서 사용할 데이터는 하나 이상의 저장소(source)에 저장되어 있을 것이다. 저장소는 우리의 컴퓨터 파일 시스템일 수도 있고, WordPress 같은 CMS이거나 데이터베이스일 수 있다.

그럼 어떻게 저장소에서 Data Layer로 데이터를 가져올 수 있는 것일까? 바로 **Source Plugin** 이라는 플러그인을 사용하면 된다. 각각의 Source Plugin(`gatsby-source-*`)은 특정 저장소와 상호작용하게 되고, 사이트 빌드가 시작되면 각 플러그인들은 저장소에서 데이터를 GrahpQL Data Layer에 붙이게 된다.

그렇다면 이제 Data Layer에서 데이터를 불러올 수 있는 방법을 알아보자.

우리는 컴포넌트 내에서 GraphQL 쿼리를 작성함으로써 원하는 데이터를 불러올 수 있다. 빌드가 시작되면, Gatsby는 컴포넌트에서 쿼리를 모두 찾아, 이들을 실행한 후에, 컴포넌트에 결과 데이터를 붙이게 된다.

이러한 데이터들은 `GraphiQL` 을 통해 확인할 수 있고, 쿼리 테스트도 가능하다. (http://localhost:8000/\_\_\_graphql)

## Queries in building-block components

컴포넌트 내에서 GraphQL 쿼리를 사용하는 방법은 컴포넌트가 page 컴포넌트인지 building-block 컴포넌트인지에 따라 조금씩 다르다.

> - 페이지 컴포넌트는 `src/pages` 폴더 내에 들어가는 컴포넌트로, 전체 페이지를 구성하는 상단 컴포넌트라고 할 수 있다.
> - 빌딩 블록 컴포넌트는 `Navbar` 나 `ProductCard` 등 페이지를 구성하는데 사용되는 작은 컴포넌트들을 의미한다.

먼저 빌딩 블록 컴포넌트(이하 걍 컴포넌트)에서 어떻게 데이터를 불러오는지 알아보자. GraphQL은 컴포넌트에서 데이터를 불러오기 위해 `useStaticQuery` 훅을 제공한다.

컴포넌트 내에서 `useStaticQuery` 는 한번만 호출할 수 있으며, 여러 필드 데이터를 호출해야 한다해도 하나의 쿼리 내에서 해결하자.

```js
import { useStaticQuery, graphql } from 'gatsby';

const Component = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      siteBuildMetadata {
        buildTime
      }
    }
  `);
  return <>{data.site.siteMetadata.title}</>;
};
```

## Queries in page components

다음으로는 페이지 컴포넌트에서 특정 post글을 불러온다고 생각해보자.

로컬 파일 시스템에 저장되어있는 Post 파일들을 Data Layer에 불러오기 위해서 `gatsby-source-filesystem` 이라는 플러그인을 사용할 수 있다.

해당 플러그인을 설치후에 `gatsby-config` 에 다음과 같이 설정해준다.

```
{
  resolve: "gatsby-source-filesystem",
  options: {
    name: `blog`,
    path: `${__dirname}/blog`,
  }
},
```

이는 `blog` 디렉토리에 있는 파일들을 data layer에 어떤식으로 붙일지에 대해 설정하는 부분이다. 이후 `blog` 디렉토리 내에 post파일들을 추가한 후 다음과 같이 query를 작성하면, post 정보들을 불러올 수 있다.

```
query {
	allFile {
		nodes { name }
	}
}
```

이제 이 Post 정보들을 페이지에 렌더링해보자. 페이지 컴포넌트는 빌딩 블록 컴포넌트와 다르게 `useStaticQuery` 훅 필요없이 바로 query문을 작성해도 된다.

```jsx
// src/pages/blog.js
import { graphql } from 'gatsby';

const BlogPage = ({ data }) => {
  return (
    <ul>
      {data.allFile.nodes.map((node) => (
        <li key={node.name}>{node.name}</li>
      ))}
    </ul>
  );
};

export default BlogPage;

export const query = grapqhql`
	query {
    allFile {
      nodes { name }
    }
}
`;
```

>
