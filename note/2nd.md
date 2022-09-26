# 2주차

## 7. 캡슐화 (챕터7)

- 외부 라이브러리를 랩핑하는 과정에서 활용해볼 수 있을까?
  - 어떤 메서드를 사용할 줄 알고 미리 클래스로 만들지? 클래스에 없는 메서드 사용하고 싶으면 귀찮아질듯
  - 활용해보는 건 어렵지 않은데, 활용해서 어떤 구체적인 이득을 얻을 수 있을지가 중요하다.
    - 특별히 숨기고 싶은 메서드가 있거나 커스터마이징이 필요한 메서드가 있는 것이 아니라면 필요없을까?
- 백엔드 api로부터 받은 데이터를 캡슐화하는 것은 랠릿에서 활용해본 적 있는데 mutation 하지 않는 상황에서 유용했다.
- 7-6
  - 질의 함수란?
    - CQS에서 Query. 연산을 통해 값을 반환하는 함수. 데이터 변경X. 사이드이펙트X. (멱등성 보장O) 명령함수는 Command, 데이터를 변경하는 함수. 사이드이펙트 발생 (멱등성 보장 X). CQS에 예외 케이스는 항상 있기 때문에 항상 지킬 수는 없긴 하다.
      - CQS는 프론트엔드에서 많이 안 쓰이는 개념인가?
        - topic이 아님
    - 클래스를 안 쓰고 그냥 의미있는 이름으로 지은 변수에 할당해서 쓰는 것과 다른 건가?
      - 일단 그건 함수가 아니기도 하고, 변수 추출에 가깝다. CQS와는 관계가 없음
- 7-7
  - 클래스를 추출하다보면 항상 응집도와 결합도 사이에서 고민하게 된다
    - 조영호님 강연에서 둘을 동시에 잡을 수는 없고 그럴 땐 결합도를 택하라고 하셨다.
- 7-9 위임 숨기기
  - 백화점에서 매니저를 찾을 때, "이 백화점의 이 매니저 누구야?" 라고 하지 않고 "매니저 누구야?" 라고 하는 것과 같다.

## 8. 기능 이동 (챕터8)

- 응집도
  - 일단 내가 짜는 코드부터 먼저...
- 쓰고 있는 툴의 숙련도를 높이기
  - 라이브러리에 대해 자세히 알고 적절한 api를 적재적소에 쓰기
  - IDE의 기능에 대해 자세히 알고 최대한 활용하기
  - 등등
- 성능 개선을 이야기하려면 **우선 현재 성능을 측정할 줄 알아야 한다.**