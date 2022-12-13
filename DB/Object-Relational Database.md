# Object-Relational Database

### 8.1 동기

- Object-Relational Database(ORDB)
  - object-oriented data model + relational data model
  - complex type 지원. nested-relation(array, set 등)같은 non-atomic 값 지원
  - 데이터에 대한 declarative access 유지
- OO vs ER
  - ER 모델링 단위
    - Entity. Relationship
    - Property - attribute
  - OO 모델링 단위
    - Object(class)
    - Property - attribute. relationship. method
- Complex Data Type
  - non-atomic domain 지원 → more intuitive modeling. 자연스럽게 표현
  - first normal form 에서 벗어난다

complex types 내 어떤 기능이 있는지 알아보자. SQL3 기반으로함.

### 8.2 Structured Type(구조 타입)

- composite attributes : 하나의 타입이 여러 개의 속성으로 구성

  - `final` : 해당 타입을 가지고 다른 타입 만들어도 돼 ↔ `not final`

  ```sql
  Create type Name as (firstname varchar(20),
  										 lastname  varchar(20)) final;
  Create table customer(name  Name);
  ```

- User-defined row type : 터플의 타입을 만든다

  - named row type

  ```sql
  Create type CustomerType as (name  Name) not final;
  Create table customer of CustomerType;
  ```

  - named row type : `row` 사용

  ```sql
  Create table customerUnnamed(
  		name    row( firstname    varchar(20),
  								 lastname     varchar(20)),
  );
  ```

- Methods : type에 연관시켜서 선언

  ```sql
  Create method ageOnDate(onDate date)
  	returns interval year
  	for CustomerType 
  begin
  	return onDate - self.dateOfBirth;
  
  Select name.lastname, ageOnDate(current_date) from customer;
  
  Create method giveRaise(percent integer) for Employee
  begin
  	set self.salary = self.salary * percent/100
  end 
  ```

- Intermediate type 없이 테이블 생성

  ```sql
  Create table books(authorArray varchar(20) array[10],
  									 keywordList setof(varchar(20)));
  ```

- Constructor Function

  - structured type 에 대한 값을 생성

  ```sql
  Create function Publisher(n varchar(20), b varchar(20))
  	returns Publisher
  	begin 
  		set pubName = n; 
  		set pubBranch = b;
  	end
  
  new Publisher('SSU','Seoul');
  ```

### 8.3 Inheritance(상속)

- Type Inheritance

  - **Reusability** → 기존 타입을 잘 활용하기 위함
  - 타입 재정의시 overriding → sub type으로 지정

  ```sql
  Create type Student under Person (...); // Person 타입 상속
  ```

  - Multiple Inheritance
    - 여러개의 타입을 상속 가능하게 하는 것.
    - name conflict 등 문제 때문에 표준은 지원하지 않음

- Table Inheritance

  - 하나의 object가 multiple type을 가지게 할 수 있다

  ```sql
  Create table people of Person;
  Create table students of Student under people; 
  Create table teachers of Teacher under people; 
  // subtable에 있는 튜플은 supertable에 있는 튜플이라고 여겨?
  ```

  - 서브 테이블 제약 조건
    1. 수퍼 테이블에 속하는 터플은 서브 테이블의 최대 하나의 터플에 대응된다. 즉 people 테이블의 한 터플은 students 테이블의 2개의 터플에 대응될 수 없다. Student에 하나 People에 하나
    2. 서로 대응이 되는 터플은 하나의 터플에서 유도되어야한다. 즉 각 객체는 가장 상세한 타입을 가져야한다. people에 속하는 터플은 students 와 teachers 테이블에 동시에 속할 수가 없다..

### 8.4 Collection Types

- Array, Multiset

  ```sql
  authorArray varchar(20) array[10] // array['Lee','Park']
  keywordSet  varchar(20) multiset  // multiset['DB','SQL']
  ```

- Quering

  ```sql
  // 키워드 중 DB 라는 단어를 찾는 경우
  Select title
  from books
  where 'DB' in (unnest(keywordSet));
  
  // array의 각 요소에 접근하는 경우
  Select authorArray[1], authorArray[2]
  from books
  where title = 'Database 1';
  
  // title, author-name 을 쌍으로? 찾는 경우
  Select B.title, A.author
  from books as B, unnest(B.authorArray) as A(author);
  
  // ordering with ordinality
  Select B.title, A.author, A.position
  from books as B, unnest(B.authorArray) with ordinality as A(author, position);
  ```

- Unnesting

  - nest relation → fewer related-valued attributes

- Nesting

  - 지원 X

  - `collect(keyword) as KeywordSet`

  - 또다른 접근..

    ![스크린샷 2022-12-12 04.24.14.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/504c4d2a-2670-4126-8852-1a6fc3671917/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-12_04.24.14.png)

### 8.5 Reference Types

- reference : 어느 테이블을 참조할지 → scope

  ```sql
  Create type Department(
  	name varchar(20),
  	head ref(Person) scope people // Person:type people:table
  );
  
  Create table departments of Department;
  Create table departments of Department(head with options scope people);
  ```

- self-referential attribute : OID 저장? 시스템이나 사용자에 의해 생성 가능

  ```sql
  // 시스템이 생성
  Create table people of Person
  ref is personID system generated; 
  // 사용자가 생성 (키값 사용 가능) 
  Create table person of Person 
  ref is personID user generated;
  
  people(personID, name, address); // personID = ref(p)
  ```

- Path Expressions

  - 데이터 찾을때 path를 알려줘 → 조인 연산이 필요없어짐

  ```sql
  Select head -> name, head -> address
  from departments;
  ```

### 8.6 RDB. ORDB. OODB

- Object-Oriented Paradigm
  - Object-relational system
  - Persistent programming languages : c++ 기반. declarative query 언어나 data independence를 지원하지 않는다.

### 8.7 Oracle ORDB Features

- Object Type

  - User-defined type : built-in type 이나 기존 타입들을 사용해서 생성
  - method 는 PL/SQL로 쓰여져
  - standard relational database 기능을 지원하는 것이 중요

  ![스크린샷 2022-12-12 04.40.56.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5a2c61f-2370-4e46-ad0f-5cf513571dfe/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-12_04.40.56.png)

  ```sql
  Create Table contacts(
  	contact person_typ,
  	contact_date DATE
  );
  Insert into contacts values(person_typ(65,'Lee','naver.com','010'),'24 jun 2022');
  
  Create Table person_obj_table of person_typ;
  Insert into person_obj_table values(person_typ(...));
  ```

- Collection type : `varray` , `nested table`

  - varray : ordered collection
  - nested table : unordered set

- Reference