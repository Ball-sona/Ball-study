# Plugins

Gatsby의 플러그인 생태계는 수천개의 패키지들을 제공하고 있고, 우리는 이를 이용해 새로운 기능들을 빠르게 추가할 수 있다. 

Gatsby 플러그인들은 [Gatsby Plugin Library](https://www.gatsbyjs.com/plugins) 에서 탐색할 수 있다. 

## Plugin 사용법

1. 설치 

   ```
   yarn add gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem
   ```

   > `gatsby-plugin-sharp` 와 `gatsby-source-filesystem` 는`gatsby-plugin-image` 가 의존하는 플러그인(peer dependency)으로, 함께 설치해주어야 한다. `sharp` 는 실제 이미지 처리를 담당하고, `source-filesystem` 은 컴퓨터의 파일 시스템에서 데이터를 불러오는 작업을 담당한다.  

2. `gatsby-config.js` 에 플러그인 등록하기

   ```js
   module.exports = {
     plugins: [
       "gatsby-plugin-image",
       "gatsby-plugin-sharp",
     ],
   };
   ```

3. 필요한 곳에서 플러그인 사용하기

   ```
   import {StaticImage} from 'gatsby-plugin-image'
   
   const Page = () => {
   	return (
   		<StaticImage alt="img" src="../images/sample.jpg" />
   	)
   }
   ```
   



## 다양한 플러그인들 

### gatsby-plugin-image

이미지 사용하기 위한 플러그인

### gatsby-source-filesystem

로컬 파일 시스템에 접근하여 파일 정보들을 불러오기 위한 플러그인 

### gatsby-omni-font-loader

구글 폰트를 비롯한 웹 폰트를 사용하기 위한 플러그인 

```
// gatsby-config.js
{
  resolve: `gatsby-omni-font-loader`,
  options: {
    enableListener: true,
    preconnect: [
      `https://fonts.googleapis.com`,
      `https://fonts.gstatic.com`,
    ],
    web: [
      {
        name: `Fira Mono`,
        file: `https://fonts.googleapis.com/css2?family=Fira+Mono:wght@500;700&display=swap`,
      },
    ],
  },
},
```

### gatsby-transformer-remark

마크다운 프로세서인 remark를 이용해 마크다운 파일을 파싱하기 위한 플러그인

