/**
 * 다형성으르 빡세게 하면 if문이 사라진다는 이야기가 있다. 근데 항상 핫 토픽임
 * 그렇게 자잘하게 class로 나눌바엔 조금의 if문은 참고 살겠다 vs if문을 모조리 박멸시키는 게 좋다
 * 강의에서 (voyage.zone, hasChina) 조건에 대해서만 별도로 분리한 것은 전자의 뉘앙스 아니었을까?
 *
 * 템플릿 메서드 패턴이랑 이 리팩토링 (상속) 둘 다 다형성이긴 하지만 다른 점은
 * 여기서의 Rating 클래스는 추상화되어 있지 않고, ExperiencedChinaRating 클래스는 단순히 Rating 클래스를 확장하고 있다는 것이다.
 */

export function rating(voyage, history) {
  if (voyage.zone === 'china' && history.some((v) => 'china' === v.zone)) {
    return new ExperiencedChinaRating(voyage, history).value;
  }
  return new Rating(voyage, history).value;
}

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    // 투자 등급
    const profit = this.voyageProfitFactor;
    const risk = this.voyageRisk;
    const historyRisk = this.captainHistoryRisk;
    return profit * 3 > risk + historyRisk * 2 ? 'A' : 'B';
  }

  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (['china', 'east-indies'].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;

    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === 'china') result += 1;
    if (this.voyage.zone === 'east-indies') result += 1;
    result += this.voyageHistoryAndLengthFactor;
    return result;
  }

  get voyageHistoryAndLengthFactor() {
    let result = 0;
    if (this.history.length > 8) result += 1;
    if (this.voyage.length > 14) result -= 1;
    return result;
  }
}

class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  get voyageHistoryAndLengthFactor() {
    let result = 3;
    if (this.history.length > 10) result += 1;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }
}

const voyage = { zone: 'west-indies', length: 10 };
const history = [
  { zone: 'east-indies', profit: 5 },
  { zone: 'west-indies', profit: 15 },
  { zone: 'china', profit: -2 },
  { zone: 'west-africa', profit: 7 },
];

const rate = rating(voyage, history);
console.log(rate);
