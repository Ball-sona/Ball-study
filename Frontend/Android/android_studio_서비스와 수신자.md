# [안드로이드] 서비스와 수신자

12. 서비스

- 백그라운드에서 실행되는 앱의 구성 요소
- startService() 호출

13. 브로드캐스트 수신자

- 브로드캐스팅 : 메시지를 여러 객체에 전달하는 것.
- onReceive()

> <b>안드로이드 로그</b>
> static int Log.d (String tag, String msg [, Throwable tr]) d 는 debug 의 약자로 debug 용 로그입니다. DDMS Logcat 상에는 검정색 파란색으로 출력됩니다.
> static int Log.e (String tag, String msg [, Throwable tr]) e 는 error 의 약자로 error 용 로그입니다. 보통 exception 이 발생하거나 Error 가 발생할 경우 system이 이녀석을 활용합니다. 색깔은 빨간색입니다.
> static int Log.w (String tag, String msg [, Throwable tr]) w 는 warning 의 약자로 경고를 표시합니다. 보통 exception 이 발생했을 때 자주 쓰입니다. ( error 와 구분. ) 색깔은 주황색입니다.
> static int Log.i (String tag, String msg [, Throwable tr]) i 는 information 의 약자로 일반 정보를 표시할 때 사용됩니다. 색깔은 초록색입니다.
> static int Log.v (String tag, String msg [, Throwable tr]) v 는 verbose 의 약자로, 색깔은 검은색. 개발중에만 나타내는 용도의 로그입니다.

14.위험권한
