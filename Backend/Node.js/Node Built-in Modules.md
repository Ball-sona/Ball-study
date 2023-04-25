# Node 내장 기능

노드가 기본적으로 제공하는 객체와 모듈 사용법을 알아보자. 

## REPL

자바스크립트는 스크립트 언어로 미리 컴파일을 하지 않아도 즉석에서 코드를 실행할 수 있다. 따라서 노드도 브라우저 콘솔과 비슷한 기능을 제공하는데, 입력한 코드를 읽고, 해석하고, 결과물을 반환하고 종류하기까지의 과정을 반복한다고 해서 이를 **REPL(Read Eval Print Loop)** 이라고 부른다.

## Node 내장 객체

### global

- 전역 객체이므로 모든 파일에서 접근 가능 
- 생략 가능 (ex. `global.console.log` )

### console

- global 객체 내에 들어있다.
- 보통 디버깅을 위해 사용한다.
- console.time, log, error, dir, trace 등 

### Timer

- `setTimerout(callbackFn, milsec)` : 밀리초 이후에 콜백 함수 실행
- `setInterval(callbackFn, milsec)` : 밀리초마다 콜백 함수 반복 실행
- `setImmediate(callbackFn)` : 콜백 함수가 이벤트 루프를 거친 뒤 즉시 실행 

### _ _dirname, _ _filename

현재 파일의 경로나 파일명을 제공한다.

### module, exports, require

자바스크립트에서 모듈을 만들때 사용한다. 

- `exports` 는 `module.exports` 를 참조한다.
- `require` 은 모듈을 불러오는 함수이다. 
- 한번 require한 파일은 `require.cache` 에 저장되고, `require.main` 은 노드 실행시 첫 모듈을 가리킨다. 

### process

현재 실행되고 있는 노드 프로세스에 대한 정보 

- `process.env` : 서비스의 중요한 키를 저장하는 공간
- `process.exit(코드)` : 실행 중인 노드 프로세스를 종료. 서버에서 사용하면 서버가 멈춘다. 
- `process.nextTick(callbackFn)` : 이벤트 루프가 다른 콜백함수보다 nextTick의 콜백 함수를 우선적으로 처리하도록 한다.

> **이벤트 루프 우선 순위** 는 다음과 같다. 
>
> nextTick > Promise > setTimeout(fn,0) || setImmediate 
>
> 이렇게 다른 콜백보다 우선시 되는 process.nextTick 와 Promise를 마이크로테스크(microtask) 라고 부른다. 

## Node 내장 모듈 

### os

- 운영체제의 정보를 제공해주는 모듈

### path

- 폴더와 파일의 경로를 쉽게 조작할 수 있도록 도와주는 모듈

### url

- 인터넷 주소를 쉽게 조작할 수 있도록 도와주는 모듈

- url 처리는 기존에 노드가 사용해왔던 방식과 WHATWG 방식으로 나눌 수 있다. 

  <img src="https://user-images.githubusercontent.com/67703882/219432943-3d94babf-46cc-4dc4-8a92-0ff67f8adf20.png" alt="image" style="zoom:70%;" />

- WHATWG 방식

  ```js
  const url = require('url');
  const myURL = new URL('http://www.api.~~');
  ```

​		URL 생성자에 주소를 넣어 객체를 만들면 주소가 부분별로 정리가 된다. 이 방식을 통해 WHATWG에만 있는 username, password 등 속성에 접근할 수 있다.

- 기존 노드 방식

  ```js
  const myURL = url.parse('http://www.api.~');
  url.format(myURL);
  ```

  `url.parse()` 를 통해 주소를 분해하면 WHATWG의 username, password 속성 대신 auth가 있고, serarchParams 대신 query가 있다.

  `url.format` 함수를 사용하면 분해되어 있는 url 객체를 다시 원래 상태로 조립할 수 있다. 

- searchParams 

  **WHATWG 방식**은 url의 search 부분을 `searchParams` 라는 특수한 객체로 반환한다. 만약 search 부분이 `page=3&category=node` 라고 한다면 이는 다음과 같은 객체로 반환된다. 

  ```js
  URLSearchParams {
    'page' => '3',
    'category' => 'node'
  }
  ```

  searchParams 객체는 search 부분을 조작하는 다양한 메서드를 지원한다. getAll(key), get(key), has(key), keys(), values() 등이 있다.

### querystring

**기존 노드의 url 방식을 사용**할 때 search 부분을 사용하기 쉽게 객체로 만드는 모듈

```js
const url = require('url');
const querystring = require('querystring');
const parsedUrl = url.parse('http://~~~'); // 기존 노드 방식으로 url 분해
const query = querystring.parse(parsedUrl.query); // url의 query 부분을 객체로 분해
const strQuery = querystring.stringify(query);  // 분해된 query 객체를 문자열로 다시 조립
```

### crypto

다양한 방식의 암호화를 도와주는 모듈

- 해시 기법을 이용한 단방향 암호화 알고리즘 (복호화 불가)

  ```js
  crypto.createHash('sha512').update('password').digest('base64');
  ```

- 양방향 암호화 알고리즘 (복호화 가능)

  ```js
  const cipher = crypto.createCipher('aes-256-cbc','password');
  let result = cipher.update(PASSWORD, 'utf8', 'base64');
  result += cipher.final('base64');
  
  const decipher = crypto.createDecipher('aes-256-cbc','password');
  let result2 = decipher.update(result, 'base64', 'utf8');
  result2 += decipher.final('utf8');
  ```

### util

각종 편의 기능을 모아둔 모듈이다. 

- util.deprecate : 함수가 deprecated 되었음을 알린다.	

  ```js
  const dontUseMe = util.deprecate((x,y)=> {
  	console.log(x+y);
  }, 'dontUseMe 함수는 deprecated 되었으니 더이상 사용하지 마세요.');
  ```
- util.promisify : 콜백 패턴을 프로미스 패턴으로 바꾼다.

  ```js
  const randomBytesPromise = util.promisify(crypto.randomBytes);
  
  randomBytesPromise(64)
  .then(~)
  .catch(~)
  ```

### worker_threads

노드에서 멀티 스레드 방식으로 작업할 수 있도록 도와주는 모듈이다.

```js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if(isMainThread){ // 메인 스레드(부모 스레드)일 때
  const worker = new Worker(__filename);
  worker.on('message', mes => console.log('from worker', mes));
  worker.on('exit', () => console.log('worker exit'));
  worker.postMessage('ping'); // 워커 스레드에게 데이터 전달
} else {  // 우리가 생성한 워커 스레드(자식 스레드)일 떄
  parentPort.on('message', (value) => {
    console.log('from parent', value); // 부모 스레드로부터 받은 데이터
    parentPort.postMessage('pong');
    parentPort.close();
  })
}
```

### child_process

노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈이다. 

현재 노드 프로세스 외에 새로운 프로세스(child process)를 띄워서 다른 언어의 코드를 실행하고 결괏값을 받을 수 있다. 

```js
const spawn = require('child_process').spawn;
const process = spawn('python', ['test.py']);

process.stdout.on('data', (data) => {
console.log(data.toString());
});
process.stderr.on('data', (data) => {
console.error(data.toString());
});
```

### 기타 모듈들 

assert. dns. net. string_decoder. tls. tty. dgram. v8. vm 등

## 파일 시스템 접근하기

### fs

파일 시스템에 접근하는 모듈이다. 파일 및 폴더를 생성하고 삭제하고, 읽거나 쓸 수 있다. 

- fs.readFile
- fs.writeFile
- fs.readFileSync, fs.writeFileSync

## 버퍼와 스트림

파일을 읽거나 쓰는 방식에는 '버퍼'를 이용하는 방식과 '스트림'을 이용하는 방식으로 크게 2가지가 있다. 

### 버퍼

노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두고, 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 해준다. 이때 메모리에 저장된 데이터가 바로 **버퍼**이다. 

`fs.readFile` 메서드를 사용하면 파일을 버퍼 형식으로 출력하게 된다. 

```js
const buffer = Buffer.from('날 버퍼로 바꿔봐.'); 
buffer.toString(); // 날 버퍼로 바꿔봐.
const arr = [Buffer.from('a'),Buffer.from('b'),Buffer.from('c')];
const buffer2 = arr.concat(arr);
const buffer3 = Buffer.alloc(5); 
```

<img width="654" alt="스크린샷 2023-02-23 15 51 59" src="https://user-images.githubusercontent.com/67703882/220838039-47c0a167-38f6-4065-ab9e-825474466023.png">

- `from(str)` : 문자열을 버퍼로 바꿀 수 있다. `length` 를 이용하면 버퍼의 크기를 알 수 있다.  

- `toString()` : 버퍼를 다시 문자열로 바꿀 수 있다. 인자로 `base64` 나 `hex` 를 넣으면 해당 인코딩으로 변환도 가능하다.
- `concat(arr)` : 배열 안에 든 버퍼들을 하나로 합친다. 
- `alloc(byte)` : 빈 버퍼를 생성한다. 바이트를 인자로 지정해주면 해당 크기의 버퍼가 생성된다. 

버퍼 형식으로 파일을 출력하면(`readFile`) 편리하기는 하지만 문제점이 있다. 만약 용량이 100MB인 파일이 있으면 메모리에 100MB 크기의 버퍼를 만들어야하는 것이다. 여러명이 서버를 동시에 사용하게 되면 메모리 문제가 발생할 수 있다. 

또 모든 내용을 버퍼에 다 쓴 이후 다음 동작으로 넘어가기 때문에, 파일 읽기.압축.파일 쓰기 등의 조작을 연달아 할 경우 매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있다. 

### 스트림

위 문제들을 해결하기 위해 버퍼의 크기를 작게 만들어서 여러 번에 나눠서 보내는 **스트림** 방식이 등장했다. 예를 들면 1MB 크기의 버퍼를 만든 후 100MB 파일을 백번에 걸쳐 보내는 것이다. 이러한 방식을 사용하면 메모리 1MB로 100MB 크기의 파일을 전송할 수 있다. 

<img src="https://user-images.githubusercontent.com/67703882/220836911-aeea2581-e7f5-4f35-a4aa-44d666ef9e90.png" alt="image" style="zoom:50%;" />

`fs.createReadStream` 메서드를 사용하면 파일을 스트림 방식으로 읽을 수 있다. 

```js
const readStream = fs.createReadStream('./read.txt', {highWaterMark: 16});
const data = [];

readStream.on('data',(chunk) => data.push(chunk);)
readStream.on('end',() => Buffer.concat(data).toSTring()); // chunk들을 합쳐서 다시 문자열로.
```

- `highWateMark` 옵션 : 버퍼의 크기를 정할 수 있다. 기본값은 64KB
- 스트림 메서드는 이벤트 리스너를 붙여서 사용한다. -> `on('event',callbackFn)`
  - data : 파일 읽기가 시작되면 이벤트 발생
  - error : 파일을 읽는 도중 에러가 발생하면 이벤트 호출
  - end : 파일을 모두 읽으면 이벤트 발생 

`fs.createWriteStream` 메서드를 사용하면 스트림 방식으로 파일을 쓸 수 있다. 

```js
const writeStream = fs.createWriteStream('./write.txt');

writeStream.on('finish',() => {
	console.log('파일 쓰기 완료!')
})
writeStream.write('파일 쓰는 중!');
writeStream.end();
```

- `finish` 이벤트는 `writeStream.end()` 함수가 호출되면 발생한다. 

읽기 스트림으로 파일을 읽고 그 스트림을 전달받아 쓰기 스트림으로 파일을 쓸 수도 있다. 이렇게 스트림끼리 연결하는 것을 '파이핑'한다고 한다. 파이핑을 이용하면 `on('data')` 나 `write()` 를 하지 않아도 알아서 데이터가 전달되어 편리하다. 

```js
readStream.pipe(writeStream)
```

## 이벤트

## 예외 처리하기 