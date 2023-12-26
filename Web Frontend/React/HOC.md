# HOC (고차 컴포넌트)

---

1. 커링이란?

- 함수를 반환하는 함수.
- 함수의 재활용 => 함수들을 쉽게 유지 보수 가능

```
function multiplyX(x){
    return function(a){ return multiply(a,x);
    }
}
// const multiplyX = x => a => multiply(a,x); 와 동일

const multiplyThree = multiplyX(3);
const result = multiplyThree(5); //result=15;
// const result = multiplyX(3)(5);

```

2. 함수 조합 기법

- 함수 코드 가독성 높이기
- compose() => test6.js 참조

3.
