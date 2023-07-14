# Social Login Process

소셜 로그인 구현하자. (ex. Kakao)

1. 클라이언트에서 카카로 로그인 페이지로 redirect 한다. 로그인 페이지 URL은 다음과 같다. `CLIENT_ID` 와 `REDIRECT_URI` 는 <a href="https://developers.kakao.com/">카카오 개발자 페이지</a>에서 확인 및 설정할 수 있다. 

   ```string
   https://kauth.kakao.com/oauth/authorize&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code
   ```

2. 사용자가 카카오 로그인 페이지에서 로그인을 성공하면 카카오는 클라이언트에게 **인가 코드(authorization code)**를 URL를 통해 전달한다. 

   > **인가**(authorization)이란, 사용자에게 특정 리소스나 기능에 액세스할 수 있을지 검증하는 것, 즉 접근 권한을 얻는 일이다. 반면 **인증**(authentication)이란 어떤 개체(사용자 혹은 장치)의 신원을 증명하고 확인하는 과정이다. 
   >
   > 예를 들어 출입구에서 (새로 건물이 들어온) 사람이 직원인지 아닌지 확인하는 과정은 '인증' 과정이다. 직원이 아니라면 인증이 실패함으로써 401 오류가 뜰 것이고, 만약 직원이라면 출입증을 받을 텐데, 이 출입증(혹은 사원증)을 받는 과정이 '인가' 과정이다. 즉 직원으로서 해당 공간에 출입할 수 있는 권한을 인가 받은 것. 
   > 이후 출입증을 가진 이 사람이 다시 출입구에 서면 직원인지 아닌지 확인받을 것이고 인증이 성공되면 200 뜰 것. 즉 여기서는 공간에 출입할 수 있는 자격이 부여되어 있다는 사실을 확인했다고 인증한 것임 (feat 광서)

3. 클라이언트는 URL을 파싱하여 인가코드를 얻은 후, 이를 서버에 전달한다. 

4. 서버는 클라이언트로부터 받은 인가코드와 클라이언트의 `REDIRECT_URI` , `CLIENT_ID` , 그리고 카카오에서 발급 받은 `CLIENT_SECRET` 을 이용하여 카카오에 엑세스 토큰 요청을 보낸다.

   ```js
   const queryData = {
     code: authorization_code, // 클라이언트에서 전달해줌
     grant_type: 'authorization_code', 
     client_id: process.env.KAKAO_CLIENT_ID, // 카카오에서 발급받음
     client_secret: process.env.KAKAO_SECRET, // 카카오에서 발급받음
     redirect_uri: KAKAO_REDIRECT_URI, // 클라이언트와 일치해야함
   };
   const response = await fetch(
     `https://kauth.kakao.com/oauth/token?${qs.stringify(queryData)}`,
     {
       method: 'POST',
       headers: {
         'content-type': 'application/x-www-form-urlencoded',
       },
     },
   );
   ```

5. 카카오는 서버의 요청을 검증(redirect_url에 해당하는 인가코드가 맞는지 확인)하고, 유효하다면 **액세스 토큰과 리프레시 토큰**을 응답한다.

6. 서버는 받은 **액세스 토큰**을 사용해 카카오 API를 호출하여 사용자 정보 등을 확인한다. 

   ```js
   const response = await fetch('https://kapi.kakao.com/v2/user/me', {
     method: 'GET',
     headers: {
       Authorization: `Bearer ${accessToken}`, // kakao access token
     },
   });
   const userInfo = await response.json();
   ```

7. 카카오에서 받은 **유저 정보**를 서비스 DB에 존재하는지 확인하고, 만약 없다면 새로 DB에 등록한다.

   ```Js
   // DB에서 user 정보 찾기
   const exUSer = await User.findOne({
     where: { snsId: userInfo.id, provider: 'kakao' },
   });
   // user 정보가 없다면(=새로 로그인하는 유저라면) DB에 추가
   if(!exUser) {
     const newUser = await User.create({
       email: userInfo.kakao_account.email,
       name: userInfo.kakao_account.profile.nickname,
       snsId: userInfo.id,
       provider: 'kakao',
     });
   }
   ```

8. 서버는 카카오로부터 받은(혹은 새로 생성한) 유저 정보를 이용해 JWT 토큰(서비스 전용 토큰)과 이에 해당하는 refresh 토큰을 생성하고, 이를 클라이언트에게 전달한다.  

   ```js
   const jwt_token = jwt.sign(userInfo,process.env.JWT_SECRET);
   const refresh_token = jswt.sign(userInfo,process.env.JWT_SECRET);
   ```

9. 클라이언트는 이 2개의 토큰을 localStorage 등에 보관해 두었다가, 토큰이 요구되는 요청의 HTTP Header에 엑세스 토큰을 포함하여 서버에 요청한다.

   ```js
   headers: {
     Content-Type: 'application/json',
     Authorization: `Bearer ${access_token}`,
   },
   ```

10. 만약 액세스 토큰이 만료되었을 경우, 클라이언트는 저장해두었던 Refresh Token을 이용하여 토큰 갱신 요청을 보낸다.

11. Refresh Token이 유효하다면, 서버는 새로운 액세스 토큰을 클라이언트에 전달하고, 클라이언트는 이를 이용해 서버에 API 요청을 한다.

12. 서버는 토큰이 담긴 요청이 오면 엑세스 토큰을 검증하여 인증과 권한 부여를 수행한다.

    ```js
    jwt.verify({
    	...
    })
    ```

13. 만약 이 **엑세스 토큰이 만료**되었을 경우, 클라이언트는 리프레시 토큰을 서버에 전달하여 엑세스 토큰을 갱신해달라고 요청한다. (갱신 API)

14. 서버는 이 **리프레시 토큰을 사용**해 새로운 액세스 토큰을 생성하여 클라이언트에게 전달한다. 

15. 서버는 이 새로운 액세스 토큰을 클라이언트에게 전달하고, 클라이언트는 이를 이용해 서버 API 요청을 다시 진행할 수 있다. 

16. 만약 **리프레시 토큰까지 만료**되었다면?
