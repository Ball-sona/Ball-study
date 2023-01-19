# [안드로이드] 스레드와 핸들러

1. 스레드

- 하나의 프로세스 안에서 여러 개의 작업이 동시에 수행되는 멀티 스레드
- 멀티 스레드 방식은 같은 프로세스 안에서 메모리 리소스를 공유하므로 효율적이지만, 동시에 메모리에 접근할 때 데드락이 발생할 수 있음.
  => 핸들러를 통해 해결
- 메인 스레드에서 관리하는 UI 객체는 내가 Thread를 상속하여 만든 스레드 객체에 접근할 수 없다.

2. 핸들러

- 특정 기능을 스레드에서 순차적으로 실행시킬때.

- 스레드에서 핸들러로 메세지를 보내기위해 Message객체를 사용.
- 1. obtainMessage() : Message 객체 참조
- 2. sendMessage() : 핸들러에 보내.
- 3. handleMessage() : 자동으로 호출되어 message 객체 처리. (in 메인 스레드)

- 더 간단) post 메소드 호출해서 Runnable 객체를 전달

```java
hanlder.post(new Runnable{
    public void run(){
        //UI에 접근하는 코드
    }
})
```

3. AsyncTask

- Message 객체와 post 메소드를 사용하면 코드 길고 해석 어려워.
- AsyncTask는 하나의 클래스 안에 스레드로 동작하는 부분과 UI객체에 접근하는 부분 함께 넣어둘 수 있다.

- 1. doInBackground() : 자동으로 실행되는 코드 부분 (thread)
  - publishProgress() 호출하면 onProgressUpdate()
  - return value 하면 onPostExecute로
- 2. onProgressUpdate() : 중간중간 상태 업데이트 하는 부분 (UI)

- 3. onPostExecute() : AsyncTask 종료시 실행되는 부분 (doInBacckground 실행끝)

> ellipsis (...)
> 메소스 등에서 동일한 객체의 파라메터들을 처리할때, 메소드마다 파라미터의 갯수를 늘려가며 설정하는 대신, public void method(int... args){} 로 설정해두면, int 형의 파라미터 몇개를 받아도 처리가 가능하다.

```java
example1(3,4,5,6);
example2("Korea","Japan","China");
...
private Integer example1(int... numberArray){
    int result = 0;
    for(int i=0; i<numberArray.length;i++){
        result += numberArray[i];
    }
}
private String example2(String... national){
    String sona = null;
    for(int i=0; i<national.length;i++){
        if("Korea".equals(national[i])){
            sona = national[i]+"is My Country";
        }
    }
}
```
