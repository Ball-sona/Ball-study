# Spring MVC

Spring MVC 란, **Model, View, Controller** 3가지 구성 요소를 사용하여 다양한 HTTP 요청을 처리하고 다양한 형식의 응답(REST, HTML 등)을 할 수 있도록 하는 프레임워크이다.

## MVC 구조

![스크린샷 2023-12-07 18.06.57](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-12-07 18.06.57.png)

### DispatcherServlet

클라이언트로부터 HTTP 요청이 들어오면 가장 앞단에서 이를 처리하는 컨트롤러다. 즉 들어온 HTTP 요청을 보고 이를 적절한 컨트롤러에게 라우팅한다. 이 작업을 위해 DispatcherServlet은 spring의 bean 설정과 함께 작동하며, 여러 개의 `HandlerMapping` 와 `ViewResolver`를 사용한다.

### HandlerMapping

DispatcherServlet에서 클라이언트 요청을 처리하기 위한 적절한 컨트롤러를 찾는 역할을 한다. spring mvc는 여러 전략을 사용하고 있고, 그 중 하나가 `RequestMappingHandlerMapping` 이다.

- RequestMappingHandlerMapping: `@RequestMapping` 어노테이션을 사용하여 요청을 처리할 메서드를 찾는 방식

### Controller

DispatcherServlet에 의해 배정된 Controller(Handler)는 HTTP 요청을 처리하고 응답을 반환한다.

> 필요한 데이터를 뽑아 Model에 저장한다. 또 HTTP 요청에 따라 HTTP가 보여줄 View Name을 지정하거나 직접 View를 반환한다.

- `@Controller` 어노테이션으로 표시
- 컨트롤러의 메서드들은 `@RequestMapping`, `@GetMapping`, `@PostMapping` 등 어노테이션으로 표시하여 요청을 처리
- 메서드들은 `HttpServletRequest`, `HttpServletResponse`, `Model` 등을 인수로 받고, `view name`, `ModelAndView` 객체, `ResponseEntity` 객체 등을 반환한다.

### ModelAndView

컨트롤러가 일반적으로 반환하는 model와 view가 매핑된 객체이다. DispatcherServlet는 이 객체를 사용해서 HTTP 응답을 생성한다.

- model: HTTP 요청의 데이터를 파싱하여 `Map<key,value>` 형태로 저장한다. 이 model은 이후 view를 그리기 위해 사용
- view: ViewResolver에서 뷰로 그릴 view 혹은 view name 이다. 아직 데이터가 세팅되지 않은 view

### ViewResolver

최종적으로 클라이언트에게 반환될 view 응답을 렌더링한다.

- `ModelAndView` 객체 등을 처리해서 View 렌더링
- `JSP`, `Thymeleaf`, `FreeMarker` 등 템플릿 엔진을 사용하여 HTML을 생성하거나 `JSON`, `XML` 등의 형식으로 데이터를 반환한다.
