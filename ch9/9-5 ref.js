const customerRepository = new CustomerRepository();

const oder = new Order(
  data.number,
  // Order가 customer repository를 의존성으로 가지고 있지 않고 order에만 집중할 수 있도록 order를 생성하는 쪽에서 repository를 사용한다.
  customerRepository.registerCustomer(data.customerId)
);

class Order {
  // data라는 객체로 받는 것이 아니라 필요한 number, customer만 받아 customer repository 의존성을 제거한다.
  constructor(number, customer) {
    this._number = number;
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }
}

// repository pattern: 고유한 아이디별로 하나의 인스턴스를 만드는 것을 보장하고 싶을 때 사용하면 좋음
class CustomerRepository {
  #customers;

  constructor() {
    this.#customers = new Map();
  }

  registerCustomer(id) {
    if (!this.#customers.has(id)) {
      this.#customers.set(id, new Customer(id));
    }
    return findCustomer(id);
  }

  findCustomer(id) {
    return this.#customers.get(id);
  }
}
