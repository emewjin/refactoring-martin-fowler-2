function disabilityAmount(employee) {
  // ๐ฉ ๊ฐ์ ๊ฒฐ๊ณผ์ธ๋ฐ ์กฐ๊ฑด์ด ๋๋์ด์ ธ ์์. ํตํฉํ์
  if (employee.seniority < 2) return 0;
  if (employee.monthsDisabled > 12) return 0;
  if (employee.isPartTime) return 0;
  return 1;
}

function disabilityAmount(employee) {
  // Q. isNotEligibleForDisability ๋ฅผ ์กฐํํ๋ ์ญํ ๋ ๋งก๊ณ  ์๋ ๊ฒ์ด ๋ฌธ์ ๊ฐ ๋์ด ์ด ๋ถ๋ถ๋ง ์ง์ ํจ์๋ก ์ถ์ถํ๋ ๊ฑด๊ฐ?
  const isNotEligibleForDisability =
    employee.seniority < 2 ||
    employee.monthsDisabled > 12 ||
    employee.isPartTime;

  if (isNotEligibleForDisability) return 0;

  return 1;
}
