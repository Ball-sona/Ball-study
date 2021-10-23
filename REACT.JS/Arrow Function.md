# Arrow Function

---

#### this는 코드실행시 context를 의미.

```js
const Test = function () {
  cosole.log(this.value);
};
Test.value = 1;
Test();
```

console에 1이 출력이 될 것 같지만 undefined가 출력된다.
Test()의 console.log(this.value)가 실행될때, 현재 Context는 window(전역)이기 때문에 this.value의 this는 window를 가리킨다. 따라서 this.value는 undefined로 나올 수 밖에. (js strict mode)

#### 그럼 1이 출력되려면??

```js
const Test.func = function()}{
    console.log(this.value);
}
Test.value = 1;
Test.func();
```

func()를 호출하면 이때의 this는 Test를 가리키기 때문에 Test.value를 출력할 수 있게 된다.

#### onClick={this.clickHandler} 안된다.

// 지금이야 this를 잘안쓰긴하지만, 그래도 이해해놓고 넘어가야 속이 후련할듯 싶어서...

```js
class TestClass extends React {
  render() {
    return <button onClick={this.clickHandler} />;
  }
}
```

위의 this가 TestClass를 가리키고 있는게 맞다. 하지만 clickHandler가 호출될 때, 그러니까 button을 누를 때 this는 전역객체(Window)를 가리킨다. "클릭을 실행되는 Context"는 window니까! (클릭을 인지하는 애는 window니까.. 라고 생각해도 되겠다)

// 저 아이를 해결하려면 this.clickHandler.bind(this)로 수정해야한다.

#### Arrow Function으로 해결

```js
const clickHandler = () => {
  console.log(this);
};
```

화살표 함수의 this는 부모함수(clickHandler)의 this를 상속받는다. 그러니 전역객체를 가리킬 우려 없음 !

#### 참고

https://blueshw.github.io/2017/07/01/arrow-function/
