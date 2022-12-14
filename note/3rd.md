# 3주차

## 9. 데이터 조직화

- 이점: 높은 가독성, 유지 보수성
- 불변성을 고려하여 조직화
  - 함수 arg를 곧바로 수정하지 않는다. 불변성을 유지하며 수정한다.

### 9.3. 질의함수

[예제코드](../ch9/9-3.js)  
[예제코드 리팩토링](../ch9/9-3%20ref.js)

- a에 의해서 b에 변동이 생길 수 있다면, 항상 최신화 될 수 있도록 질의함수로 작성하자
- 계산되는 것이라면 실시간으로, 필요에 따라서 계산이 되도록 하자

### 9.4. 참조를 값으로 바꾸기

Q. 불변성을 유지하기 위해 매번 인스턴스를 새로 만들어서 재할당 하면 메모리 낭비 아닌가요?
A. (앨리) 지금은 신경 쓸 필요 없다. 정말 그게 문제가 된다면, 그때 측정하고 개선하면 될 일이다. 그보다는 안정성이 더 중요하다

> 성급한 최적화는 모든 악의 근원입니다.
>
> - 도널드 커누스

### 9.5. 값을 참조로 바꾸기

동일한 데이터인데도 여러 버전이 존재한다면?  
데이터는 계속 변하는데 인스턴스가 계속 만들어지면 참조하는 곳에서 버그가 발생할 수 있다.  
참조하는 곳에서는 새 인스턴스가 아니라 기존 인스턴스를 보고 있어, 업데이트가 반영되지 않을 수 있기 때문.

특히 유니크한 아이디를 가진 객체의 경우 인스턴스를 계속 새로 만드는 것은 유니크한 아이디를 사용하는 의미를 퇴색시킬 수 있다. 유니크한 아이디를 가지고 있다는 것 자체가 전체 라이프 사이클에서 유일한 값임을 의미하기 때문

따라서 어떤 데이터가 업데이트 될 때 그를 참조하고 있는 모든 곳에 업데이트가 반영이 되어야 한다면, 값보다는 참조가 유용하다

DDD

- 복원 : 물리 저장 장치 (DB)에 저장된 값을 메모리로 복원함을 의미
- 변경 : 변경된 새로운 값을 메모리에 할당함을 의미

---

> 강의가 전체적으로 코드를 읽는 사람을 많이 배려하는 리팩토링이 많다.
> 코드 작성시 읽는 사람 입장에서 생각하고 배려하자!

---

[⭐️ 리팩토링 예제코드](../ch9/9-5%20ref.js)

## 10. 조건부 로직 간소화

관련해서 참고할 아티클

- https://medium.com/gitconnected/code-smell-149-optional-chaining-b8830d7206ae
- https://blog.devgenius.io/how-to-get-rid-of-annoying-ifs-forever-317033474484
- https://codeburst.io/the-one-and-only-software-design-principle-5328420712af

이게 뭘 하는지를 확인하면서 코드를 읽어나가게 하는 코드는 💩  
그래서 코드의 의도,목적,왜를 나타내어야 한다.

> 예를 들면 주석 대신 타입스크립트의 타입으로 의도를 표현

### 10.1

질의함수에 대해 계속 의문이 생김... 질의함수에 대해 좀 공부해봐야 할 듯
Q. 질의함수를 변수로 쓰는 것이 파생변수인건가?
Q. 근데 그래서 early return을 해도 조건 파악하기가 헷갈림..

- 드모르간 법칙

순서에 관계없는 if문을 작성하는 게 제일 안 헷갈리는 거 같다...

### 10.4 조건부 로직을 다형성으로 바꾸기

- 조건이 수정되면 조건이 있는 모든 곳을 수정해야 해서 유지보수가 어려워짐
- 다형성을 활용하면 내부 구현이 어떻게 되든 사용하는 쪽에서는 동일한 인터페이스만 알면 사용할 수 있다.
  - 특정 인터페이스를 충족하는 인스턴스만 들어올 수 있기 때문
  - 상속 vs 조합
    - 부모 자식 관계가 확고하지 않다면 **조합** 추천
    - 상속의 단점 : 캡슐화가 깨짐. 부모-자식이 강하게 결합되어 있기 때문에 한 쪽이 변경되면 그 여파가 다른 쪽에도 전해진다.
    - 조합이라는 건 DI를 활용하라는 것...??
      - 런타임에서 조건에 따라 인스턴스를 만들어서 사용

### 10.5

특이 케이스는 클래스로 (VO) 만들어두고 대응한다.  
조건문을 제거할 수 있다.

> 처음 보는 패턴이라 특이했음...

### 10.6

개발자에게 개발 단계에서의 실수를 방지하기 위해 미리 알려주는 것.  
개발 과정의 에러와 비즈니스의 에러를 구분할 수 있어야 한다.
