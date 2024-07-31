# 브라우저 보안 관련 용어

## CSRF(Cross Site Request Forgery)

- '쿠키'의 보안 취약점을 이용한 공격
- 방어 방법: Referrer 검증, CAPTHCA 도입, CSRF 토큰 사용 등
  - [CSRF 방지하는 방법](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

## XSS(Cross Site Scripting)

- 웹 페이지에 악성 스크립트 주입하는 공격
- LocalStorage는 XSS 공격에 취약
