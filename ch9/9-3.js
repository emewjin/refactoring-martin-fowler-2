// 예제 1
class Order {
  // 다른 코드 있다고 가정
  get discountedTotal() {
    // 💩 계산된 값
    return this._discountedTotal;
  }
  set discount(value) {
    const old = this._discount;
    this._discount = value;
    // 💩 discount 뿐만 아니라 discountedTotal의 값도 변경하고 있음
    this._discountedTotal += old - value;
  }
}

// 예제 2
class ProductionPlan {
  // 다른 코드 있다고 가정
  get production() {
    return this._production;
  }
  applyAdjustment(adjustment) {
    this._adjustments.push(adjustment);
    this._production += adjustment.amount;
  }
}
