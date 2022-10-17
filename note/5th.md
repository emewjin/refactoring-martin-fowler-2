# 5주차

강의에선 책에서 소개하는 리팩토링 방법으로 진행한 결과에, 모던 객체지향을 더해서 더 발전시킨 버전을 소개함.  
[statement.js](../challenge/statement.js)를 리팩토링해보기.

## 로우레벨 리팩토링

목표: 관심있는 부분을 빠르게 파악하기

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
