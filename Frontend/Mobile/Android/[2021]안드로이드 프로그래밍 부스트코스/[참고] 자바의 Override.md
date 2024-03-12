Method Override

- 상속의 관계에 있는 클래스 간에 하위 클래스가 상위 클래스와 '완전 동일한 메소드'를 덮어쓴다.

1. 기본 동작

- Speaker 클래스를 상속받고 있는 BaseSpeaker 클래스
- BaseSpeaker의 메소드 showState는 Speaker의 showState를 호출

```java
class Speaker {
	private int volume;
    	public void showState() {
    		System.out.println("Volume size : " + volume);
    	}
    	public void setVolume(int vol) {
    		volume = vol;
    	}
}
class BaseSpeaker extends Speaker {
	private int baseRate;
    	public void showState() {
        	super.showState(); // 상위 클래스의 오버라이딩 된 메소드 호출
            	System.out.println("Base size : " + baseRate);
        }
        public void setBase(int base) {
        	baseRate = base;
        }
}
```
