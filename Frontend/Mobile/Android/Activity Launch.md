# Activity Launch

- 게임 세팅을 담당하는 SettingActivity 생성 및 종료

## Intent

Intent는 수행되어야 하는 작업 정보를 담은 메세지 객체로, 주로 <u>Activity를 launch 하는데 사용</u>된다.

- Intent의 body에는 `ACTION_VIEW`, `ACTION_MAIN` 등 수행되어야 하는 작업을 의미하는 **action**과 작업 대상인 **data**가 담겨 있다.

- Explicit intent: 해당 Intent를 받아 처리할 액티비티가 명확하게 명시되어 있다. 

  ```java
  Intent reqmsg = new Intent(MainActivity.this, SettingActivity.class);
  startActivity(reqmsg);
  ```

- Implicit intent: 받는 컴포넌트가 명시되어 있지 않아, 이를 처리할 수 있는 시스템(단말기) 내 컴포넌트가 호출된다. 

  ```java
  Intent reqmsg = new Intent(Intent.ACTION_SEND);
  reqmsg.putExtra(Intent.EXTRA_EMAIL, address_array);
  startActivity(reqmsg);
  ```

## Intent filter

- 앱 내 모든 액티비티는 `AndroidManifest.xml`에 열거되어야 한다. 
- `AndroidManifest.xml` 에서 각 <u>액티비티들이 어떻게 실행될지를 의미하는 intent filter</u>를 적용할 수 있다. 
- intent filter를 action이 `MAIN` 이고 category가 `LAUNCHER`로 정의하면, 해당 액티비티가 main activity가 된다. 

```xml
<activity
    android:name=".singleuser.MainActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
<activity android:name=".SettingActivity"> </activity>
```

## Activity 시작하기

Activity를 시작하는 방법은 2가지이다.

- startActivity: Activitiy 호출 후 return 값이 필요하지 않는 경우
- registerForActivityResult: 호출한 Activity로부터 return 값이 필요한 경우

### MainActivity -> SettingActivity

```
registerForActivityResult(
new ActivityResultConstracts.StartAcitivtyForResult(),
new ActivityResultCallback<ActivityResult>() {
 public void onActivityResult(ActivityResult result) {
 fsdlkfnsdlknf
 }
})
```



```java
// MainActivity에서 ActivityResultLauncher 객체 생성
ActivityResultLauncher<Intent> startActivityForResult = registerForActivityResult(
    new ActivityResultContracts.StartActivityForResult(),
    new ActivityResultCallback<ActivityResult>() {
        @Override
        public void onActivityResult(ActivityResult result) {
            int resCode = result.getResultCode();
            if(resCode == Activity.RESULT_OK) {
                Intent resmsg = result.getData();
                serverHostName = resmsg.getStringExtra("servHostName");
                serverPortNumber = Integer.parseInt(resmsg.getStringExtra("serverPortNumber"));
            } else if(resCode == Activity.RESULT_CANCELED)
                Log.d("MainActivity", "response = null");
        }
    }
);

// MainActivity에서 SettingActivity 호출하는 함수 (setting 버튼 클릭 시 호출)
private void startSettingActivity(int reqCode) {
    Intent reqmsg = new Intent(MainActivity.this, SettingActivity.class); // explicit 
    reqmsg.putExtra("serverHostName", serverHostName);
    reqmsg.putExtra("serverPortNumber", String.valueOf(serverPortNumber));
    startActivityForResult.launch(reqmsg);
}
```

### SettingActivity -> MainActivity

```java
// onCreate in SettingActivity 
Intent reqmsg = getIntent(); 
servHostName = reqmsg.getStringExtra("serverHostName");
servPortNumber = reqmsg.getStringExtra("serverPortNumber");

// onClick in SettingActivity
if (id == R.id.confirm) {
    Intent resmsg = new Intent(); 
    resmsg.putExtra("serverHostName", viewHostName.getText().toString());
    resmsg.putExtra("serverPortNumber", viewPortNumber.getText().toString());
} else if (id == R.id.cancel) {
    setResult(RESULT_CANCELED); // result code
}
finish(); 
```

SettingActivity는 따로 MainActivitiy를 시작시킬 필요가 없다. MainActivity에서 SettingActivity를 시작시킬 때, ActivityResultLauncher 객체인 `startActivityForResult` 를 생성 후 `ActivityResultCallback` 라는 콜백 객체를 생성하여 SettingActivity가 종료될 때까지 기다리고 있기 때문이다. 

## Activity 종료하기

- lifecylce에 따르도록 두기
- 내가 Finish() 호출
- 다른 액티비티가 finishActivity() -> 권장 x