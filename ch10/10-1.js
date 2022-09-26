// original
function calculateCharge(date, quantity, plan) {
  let charge = 0;
  if (!date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd))
    charge = quantity * plan.summerRate;
  else charge = quantity * plan.regularRate + plan.regularServiceCharge;
  return charge;
}

// refactoring 1
function calculateCharge(date, quantity, plan) {
  // Q. 전체적으로, 2처럼 꼭 함수여야 하나? 질의함수라는 의미 때문인가?
  // A. 이건 변수 추출에 가깝다. CQS와는 관계가 없음. 일단 함수가 아님. 그리고 실행 시점에 값이 결정되어야 한다.
  const isSummer =
    !date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd);

  // early return으로 하면 값이 최신화 되는 건 마찬가지 아닌가?
  if (isSummer) {
    const summerCharge = quantity * plan.summerRate;
    return summerCharge;
  }

  const regularCharge = quantity * plan.regularRate + plan.regularServiceCharge;
  return regularCharge;
}

// refactoring 2
function calculateCharge(date, quantity, plan) {
  return isSummer() ? summerCharge() : regularCharge();

  function isSummer() {
    return !date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd);
  }

  function summerCharge() {
    return quantity * plan.summerRate;
  }

  function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
  }
}
