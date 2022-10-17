# 5주차

강의에선 책에서 소개하는 리팩토링 방법으로 진행한 결과에, 모던 객체지향을 더해서 더 발전시킨 버전을 소개함.  
[statement.js](../challenge/statement.js)를 리팩토링해보기.

## 1. 로우레벨 리팩토링

목표: 관심있는 부분을 빠르게 파악하기 [코드](../challenge/statement-1.js)

- format 밖으로 추출
  - 무엇을 포맷팅하는지 알 수 있도록 이름 수정
- switch문 밖으로 추출
- 추출한 함수 내에서 변수명 수정
- play를 질의함수로 추출
- 계산식별로 질의함수 분리 (volumeCredits, amount)
- for문 쪼개기
  - volumeCredits
  - result
- for문을 reduce로 수정하기

## 2. 데이터와 로직 분리하기

[코드](../challenge/statement-2.js)

- 현재는 데이터를 계산하는 책임과 어떻게 출력하는지에 대한 책임을 둘 다 가지고 있다. 출력하는 것만 담당하도록 하자
- statement 함수를 만들어서 출력에 필요한 데이터를 가공하는 역할을 담당한 뒤 결과가 담긴 객체(statement)만을 반환한다.
- renderText에서는 계산을 담당하지 않고 결과인 statement를 전달받아 출력만을 담당한다.

## 3. 새로운 기능 추가하기

## 4. 변환함수를 클래스로 바꾸기

앨리: 변환함수가 아니라 클래스를 이용하자  
이유 1. 로직이 한 눈에 이해가 잘 안됨  
이유 2. 객체가 아니라서 옛날 방식 같다.

## 5. 다형성

## 6. 객체지향

createStatement은 절차지향적으로 느껴진다. createStatement도 객체지향으로 리팩토링해보자.
[코드](../challenge/result/)
