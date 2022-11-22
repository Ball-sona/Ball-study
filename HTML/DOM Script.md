### DOM SCRIPT(Document Object Model)

`document.querySelector(className)`

- 클래스가 여러개면, 맨 앞에 있는 애를 택

`X.setAttribute('data-id',123) `

- X에 id 값 부여 (data-index,id,role 등)

`X.getAttribute('data-id)`

- X의 id 값 불러오기

```javascript
const pEle = document.createElement('p')
pEle.innerHtml = '<a href="#">안녕</a>???'
const container = document.querySelector('.container')
container.appendChild(pEle)
container.removeChild(document.querySelector('.b))
```
- element를 js로 추가하기

​	 `X.classList.add('클래스이름')`
 - 클래스 추가 

​	`X.className = '클래스이름'	`

 - 클래스 교체

​	`X.classList.remove('클래스이름')`

 - 클래스 제거

​	`X.classList.toggle('클래스이름')	`

 - 클래스 제거했다가, toggle을 다시 실행하면 추가 

