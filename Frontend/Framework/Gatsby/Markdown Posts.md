# Markdown Posts

마크다운 파일을 게시글로 보여주자.

## Transform Data

마크다운 파일을 페이지에 렌더링하기 위해  `gatsby-tranformer-remark` 을 설치한다. (remark는 마크다운을 파싱해주는 프로세서임)

Data Layer에는 **node** 라는 객체에 정보들이 저장되어 있다. 노드는 Data Layer에서 가장 작은 단위의 데이터로, 각 저장소 플러그인들은 각각의 노드들을 생성하고, 이들은 각자 고유의 속성들을 가지게 된다. 예를 들면 `gatsby-source-filesystem` 은 파일 노드들을 만들게 되는 것이다. 

Transformer Plugin은 이러한 노드들을 다른 타입의 노드들로 변환해주는 역할을 담당한다. 예를 들어 `gatsby-tranformer-mdx` 플러그인은 `.mdx` 익스텐션을 가지고 있는 파일 노드들을 다른 필드들로 구성되어 있는 MDX 노드들로 변환시킨다. 

> 본래의 노드를 완전 변환시키는 것이 아니라, 이들을 변환한 새로운 노드를 생성하는 것이다. 

## Frontmatter

아래 마크다운 파일에서 대쉬들 사이에 있는 데이터를 frontmatter라고 부른다. 

```
---
title: "Sweet Pandas Eating Sweets"
date: "2017-08-10"
---
```

## Dynamic Routing 

`src/pages/blog` 폴더 안에 `{markdownRemark.frontmatter__slug}.tsx` 파일을 생성하자. 그럼 Gatsby는 이를 기반으로 동적 라우팅을 하게 되는데, 예를 들어 `/first-post/` 라는 url로 이동하게 되면 Gatsby는 slug가 `first-post` 인 마크다운 노드를 가져오게 되는 것이다.

실제로 해당 페이지 컴포넌트에서 props를 콘솔에 찍어보면 다음과 같은 정보가 나온다.

```
data  # 우리가 요청한 쿼리에 해당하는 데이터
location
	...
pageContext
	frontmatter_slug  #first-post
	id  # Node ID
path  # blog/first-post/
url   # blog/first-post
```

이를 기반으로 마크다운 데이터를 불러오자. `frontmatter_slug` 보다는 `id`로 노드 검색하는 것이 빠르니 이를 사용한다.

```js
export const query = graphql`
  query ($id:String) {
    markdownRemark(id: {eq:$id}) {
      html
      frontmatter {
        date(formatString: "MMMM DD,YYYY")
        slug
        title
      }
    }
  }
`
```

