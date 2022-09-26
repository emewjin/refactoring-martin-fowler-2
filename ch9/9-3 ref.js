// 예제 1
class Order {
  // 다른 코드 있다고 가정
  get discountedTotal() {
    return this.#basePrice - this.#discount;
  }
  set discount(value) {
    this.#discount = value;
  }
}

// 예제 2
class ProductionPlan {
  // 다른 코드 있다고 가정
  get production() {
    return this.#adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
  applyAdjustment(adjustment) {
    this.#adjustments.push(adjustment);
  }
}
