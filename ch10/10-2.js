function disabilityAmount(employee) {
  // 💩 같은 결과인데 조건이 나뉘어져 있음. 통합하자
  if (employee.seniority < 2) return 0;
  if (employee.monthsDisabled > 12) return 0;
  if (employee.isPartTime) return 0;
  return 1;
}

function disabilityAmount(employee) {
  // Q. isNotEligibleForDisability 를 조회하는 역할도 맡고 있는 것이 문제가 되어 이 부분만 질의 함수로 추출하는 건가?
  const isNotEligibleForDisability =
    employee.seniority < 2 ||
    employee.monthsDisabled > 12 ||
    employee.isPartTime;

  if (isNotEligibleForDisability) return 0;

  return 1;
}
