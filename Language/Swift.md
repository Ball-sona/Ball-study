# Swift 문법

Swift은 type-safe 언어 중 하나로, 타입에 엄격하다

## 변수와 상수

- 변수 : `var`
- 상수 : `let`  -> JS에서는 `let`이 변수인데 swift에서는 상수를 의미한다..

## Type Annotations

타입에 대해 정의해주자. 

```swift
var myAge: Int = 23
var myWeight: Double = 45
var myHeight: Float = 160.5
```

## Boolean

```swift
var isOpen = false

if isOpen === true { 
	// if문에 중괄호가 없다니 신기하다
}
```

## Tuples

(n짝, n쌍)

```swift
var topTitle = ("메인화면","mainIcon.svg");

topTitle.0 // 메인화면
topTitle.1 // mainIcon.svg

// object 형태처럼 설정도 가능하다. 
var httpError = (statusCode:404, description: "NOT FOUND")

httpError.statusCode // 404
```

## Optionals

값이 있을 수도 있고 없을 수도 있다.

```swift
var myAge: Int? = 0

if myAge == nil {
	// myAge 값을 입력 받지 않았나보다
}
```

> **UnWrapping** 이란, 옵셔널한 타입을 옵셔널하지 않은 타입으로 만드는 것으로 `Int?` -> `Int` 라고 생각하면 된다. 

 ```swift
 var a: Int? = 10
 var b: Int? = 20
 var c: a + b // error
 
 // coalesce
 var c = (a ?? 0) + (b ?? 0)
 
 // force unwrap 
 var d = a! + b!
 ```

### if let or if var

```
if let hasNumber = a {
	print(hasNumber)
}
```

### guard let or guard var 

```
guard var hasNumber = a else {
	return
}
print("") // 실행 안됨
```

## Unicode

```swift
let inputValue = "7"

if inputValue >= "\u{30}" && inputBalue <= "\u{39}" {
	print("숫자임")
} else {
	print("숫자 아님")
}
```

## String 

```swift
let longStr = 
"""
hi
this is
swift
"""

var myNumber = 123
"my number is \(myNumber)"
```

### String 으로 변환하기

```swift
// 1
let myNumber = 123 
myNumber.description

// 2
String(number)
```

### String 관련 메서드

```swift
str.last() // 마지막 문자 반환
str.dropLast() // 마지막 문자 제거
str.dropFirst() // 첫번째 문자 제거
str.split(seperator: ":") // :을 기준으로 나누기
```

## Array

Collection Type에는 Array, Set, Dictionary가 있다.

![스크린샷 2023-07-25 03.24.18](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-07-25 03.24.18.png)

```swift
var names = Array<string>()
var ages = [Int]()

names.append("sona") // 배열에 값 추가 
names.insert("sonaa", at: n) // 배열 n번째에 값 삽입
names = names + ["hi"] // 배열 연결
names.remove(n) // n번째 값 제거
names.removeAll()
nmaes.isEmpty() // 배열에 값이 없는지 여부

for name in names {
  print(name)
}

for (index, name) in names.enumerated() {
  print(index, name)
}
```

## Set

순서를 보장하지 않고, 중복을 허용하지 않는 Set

```swift
var names = Set<String>()
var names2: Set = ["sona","sona","sona"] // ["sona"]

names.insert("sona") // Set에 값 추가 

names.intersection(names2) // 교집합
names.union(names2) // 합집합
names.symetricDifference(names2) // 대칭차집합?
names.substractring(names2) // 여집합
```

## Dictionary

Key-value로 구성

```swift
var names = [String:String]()

names["302ro"] = "1st"
names["303ro"] = "2nd"

names.keys // key 확인하기

for name in names {
  print(dic)
}
```

## Control Flow 

if문, for문, switch문을 control flow(흐름 제어) 라고 한다.

### for

```swift
let name = "sona"
for char in name {
	print(char)
}

for idx in 0..<5 {
	print(idx) // 0,1,2,3,4
}
```

### While

```swift
while condition {
	print("")
}
```

### Switch

```swift
switch b {
	case "b": print("B")
	case "c","d": print("C or D")
	default: print("other")
}
```

## Function

```swift
func plus(num1:Int, num2:Int) -> Int {
	return num1 + num2
}
let result = plus(num1: 50, num2: 10)

// 인자에 `_`를 붙이면 함수 호출할때 인자이름 생략 가능 
func plus(_num1:Int, _num2:Int) { ... } 
```

## Closure

