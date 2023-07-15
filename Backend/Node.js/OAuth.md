# OAuth

OAuth는 인터넷 사용자들이 <u>비밀번호를 제공하지 않고</u> 다른 웹사이트 상의 자신들의 정보에 대해 웹사이트나 애플리케이션의 접근 권한을 부여할 수 있는 공통적인 수단으로서 사용되는, 접근 위임을 위한 개방형 표준이다.

- OAuth의 목적은 Access Token을 발급하는 것이라 할 수 있음.

## OAuth 참여자 

- Resource Server : 클라이언트가 제어하고자 하는 자원을 보유. Kakao, Facebook, Google 등
  - Authorization Server : 인증을 전담하는 서버

- Resource Owner : 클라이언트가 제공하는 서비스를 통해 로그인하는 실제 유저
- Client : Resource Server에 접속해서 정보를 가져오고자 하는 클라이언트(웹 어플리케이션)

## OAuth 등록

Client는 Resource Server를 이용하기 위해서는 사전에 등록하는 과정이 필요하다. 이는 서비스마다 과정이 조금씩 다른데, 공통적으로 등록(설정)해야할 값은 다음과 같다.

- Client ID
- Client Secret
- Authorized Redirect URL : 리소스 서버가 권한을 부여하는 과정에서 code를 전달할 URL

## Authentication 과정

1. Resource Owner(유저)가 로그인 버튼 클릭하면 `https://resource.server?client_id=1&scope=2&redirect_url=https://client/callback` 라는 url 생성
2. 해당 주소로 접속하면 Resource Server는 Resource Owner가 현재 로그인되어 있는지 확인 후, 만약 되어있지 않다면 로그인 화면을 보여준다.
3. 로그인에 성공했다면, Resource Server는 현재 접속해있는 주소의 client ID와 redirect URL이 자신이 갖고 있는 값과 일치하는 지 확인한다.
4. 만약 일치한다면, Resource Server는 Resource Owner에게 scope에 해당하는 데이터를 허용해도 될지 동의를 구하는 화면을 보여준다.
5.  Resource Owner가 동의했다면, Resource Server는 해당 user id와 허용한 scope에 대한 정보를 자신의 DB에 저장한다.

6. 이후 Resource Server는 redirect_url에 authorization code를 Resource Owner에게 전달한다. (`https://client/callback?code=3`)

7. Resource Owner의 브라우저는 redirect_url에 이동하게 되고, Client는 authorization code를  알게 된다.
8. Client는 client_id, client_secret, redirect_url 그리고 authorization code를 담아서 Resource Server에 전송한다. 
9. Resource Server는 이를 확인하고 자신이 갖고 있는 값과 모두 일치한다면, 이때 **Access Token**을 발급해준다. (이때 authorization code는 지움)
10. Client는 발급 받은 Access Token을 자신의 DB에 저장한다.

## Access Token이 만료되었을 경우

Access Token이 만료되었을 경우 Refresh Token을 다시 발급받아야 한다. (REST API 경우 만료 시간이 6시간이다.)

1. Client가 Resource Server로부터 Access Token을 발급 받을 때, 일반적으로 Refresh Token도 같이 받게 된다.
2. Client는 두 토큰을 모두 저장하게 되고, Access Token을 통해 인증을 받게 되는데 만약 Access Token이 수명을 다했을 경우 `Invalid Token Error` 가 발생하게 된다.
3. 이때 Client는 Refresh Token을 Resource Server에 전달하고, Resource Server는 이를 토대로 Client에게 새로운 Access Token을 발급해준다.
4. Refresh를 하는 방법은 서비스마다 조금씩 다르므로 이를 유의해야한다.

## Kakao Login Flow

카카오 로그인은 OAuth 2.0 기반 소셜 로그인 서비스 중 하나이다. 카카오에서 제공하는 로그인 플로우를 살펴보자.

![image](https://user-images.githubusercontent.com/67703882/233766484-4bfcf7f9-4484-4c08-8f98-579af46a1821.png)

## React-Node 카카오 로그인 구현

<img width="826" alt="스크린샷 2023-04-22 18 25 17" src="https://user-images.githubusercontent.com/67703882/233775579-1cbc250e-3194-4962-9b50-322173bc55fc.png">

0. 카카오 개발자 페이지에서 설정해준 redirect_url
1. 클라이언트에서 플랫폼 로그인 url 

![스크린샷 2023-05-26 17.00.29](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-05-26 17.00.29.png)

1. 클라이언트에서 카카오 redirect URL로 연결한다.
2. 카카오 로그인 페이지로 연결되고 유저가 로그인에 성공하면 카카오가 '인가코드'를 준다.
3. 클라이언트는 받은 인가코드를 서버에 전달한다.
4. 서버는 이 인가코드와 프론트 redirect URL을 카카오에 보낸다.
5. 카카오는 이 둘이 유효한 값인지 확인하고 검증이 완료되면 서버에 토큰을 전달한다.
6. 서버는 이 토큰을 유저 정보로 활용해 우리 서비스 만의 전용 토큰(JWT)로 발행한다.
7. 서버는 발행한 토큰을 클라이언트에 전달한다.
8. 클라이언트는 이 토큰을 확인하고 로그인을 완료한다.

![img](https://blog.kakaocdn.net/dn/0Ep68/btrKwcXfeQj/P0wKZdlINOO7m00vost99K/img.png)

## 참고 문서

https://opentutorials.org/course/3405/22004

[express로 카카오 소셜 로그인 기능을 적용하기!](https://velog.io/@gbwlxhd97/express%EB%A1%9C-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5%EC%9D%84-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

https://2dowon.github.io/docs/react/social_login/





2. 

#### 참고

<img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-05-27 13.06.51.png" alt="스크린샷 2023-05-27 13.06.51" style="zoom: 50%;" /> 

