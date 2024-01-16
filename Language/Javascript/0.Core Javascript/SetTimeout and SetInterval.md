# setTimeout and setInterval

함수를 예약 실행할 수 있게 하는 것을 '호출 스케줄링' 이라고 한다.

## setTimeout

`setTimeout` 은 일정 시간이 지난 후에 함수를 실행한다.

```js
const timerId = setTimeout(func, [delay], [...args]);
```

- delay는 실행을 연기할 시간으로, 밀리초 단위이며 기본값은 0이다.
- args는 함수에 전달할 인수들이다.
- node.js 환경에서 `setTimerout` 을 실행하면 타이머 식별자로 객체가 반환된다.

## setInterval

`setInterval`은 함수를 주기적으로 실행한다.

- 문법은 `setTimeout` 과 동일하다.
- 주의할 점은, 함수 호출 사이의 <u>지연 시간에 함수를 실행하는 시간도 포함</u>한다.
- 만약 명시한 `delay` 시간보다 함수 실행 시간이 더 길어진다면, 함수의 실행이 종료되자마자 다음 호출을 바로 시작한다.

## clearTimeout / clearInterval

- `clearTimeout(timerId)` 와 `clearInterval(timerId)` 를 통해 스케줄링을 취소할 수 있다.
- `setTimeout` 이나 `setInterval` 에 함수를 넘기면 함수에 대한 내부 참조가 새로 만들어져 스케줄러에 저장되므로, 외부에서 해당 함수를 참조하지 않아도 여전히 해당 함수는 가비지 컬렉션의 대상이 되지 않는다. (그 함수 내부에서 사용하는 외부 변수 역시 메모리에 남아있을 것.)
- 따라서 되도록이면 `clearTimeout` or `clearInterval` 을 통해 스케줄링을 할 필요가 없어진 함수는 메모리에서 제거하자.

## 중첩 setTimeout

`setInterval` 을 통해 함수를 일정 간격을 두고 실행할 수 있지만, 앞서 말했듯 `setInterval` 은 호출 사이 지연 시간에 함수를 실행하는데 걸리는 시간도 포함하기 때문에 지연 간격을 보장할 수가 없다.

따라서 정확한 지연 간격을 보장하며 함수를 호출하고 싶다면 중첩 `setTimeout` 방법을 사용할 수 있다.

```js
let delay = 5000;

const timerId = setTimeout(function req() {
	// send data API
	if(서버 과부하로 인한 요청 실패) {
		delay *= 2;
	}
	timerId = setTimeout(req,delay);
}, delay);
```

위 코드는 서버에 API 요청을 보냈으나 서버 부하로 요청에 실패할 경우, 지연 시간을 정확히 두배로 하여 서버에 재요청을 보내는 코드다. 이렇게 호출이 종료된 이후에 다음 함수 호출에 대한 계획이 세워지기 때문에 지연 간격을 정확히 5초, 10초, 20초, ...로 보장할 수 있다.

## setTimeout(func, 0)

> 비동기 동작 정리 이후 추가 예정
