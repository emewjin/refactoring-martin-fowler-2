// 이렇게 쓸  일이 언제 있을까??
class Employee {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get type() {
    return 'employee';
  }

  toString() {
    return `${this.#name} (${this.type})`;
  }

  static createEmployee(name, type) {
    switch (type) {
      case 'engineer':
        return new Engineer(name);
      case 'manager':
        return new Manager(name);
      default:
        throw new Error(`${type}라는 직원 유형은 없습니다.`);
    }
  }
}

class Engineer extends Employee {
  get type() {
    // 여기가 더 복잡한 경우일까?
    // 서브클래스는 동일한 함수지만 다른 (고유한) 행동을 한다. -> 다형성 성취
    return 'engineer';
  }
}

class Manager extends Employee {
  get type() {
    return 'manager';
  }
}

const ellie = new Engineer('엘리');
const bob = new Manager('밥');
