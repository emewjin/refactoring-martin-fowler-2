export function statement(invoice, plays) {
  return renderPlainText(createStatement(invoice, plays));
  // 출력에 필요한 데이터 가공
}

export function htmlStatement(invoice, plays) {
  return renderHTML(createStatement(invoice, plays));
  // 출력에 필요한 데이터 가공
}

class Performance {
  #audience;
  #play;
  constructor(performance, play) {
    this.#audience = performance.audience;
    this.#play = play;
  }

  get play() {
    return this.#play;
  }

  get audience() {
    return this.#audience;
  }

  get amount() {
    let result = 0;

    switch (this.#play.type) {
      case 'tragedy': // 비극
        result = 40000;
        if (this.#audience > 30) {
          result += 1000 * (this.#audience - 30);
        }
        break;
      case 'comedy': // 희극
        result = 30000;
        if (this.#audience > 20) {
          result += 10000 + 500 * (this.#audience - 20);
        }
        result += 300 * this.#audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.#play.type}`);
    }

    return result;
  }

  get credits() {
    let result = 0;
    result += Math.max(this.#audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === this.#play.type) {
      result += Math.floor(this.#audience / 5);
    }
    return result;
  }

  // 직접 인스턴스를 생성하기 복잡하니까 팩토리 함수를 만든다.
  static create(audience, play) {
    switch (play.type) {
      case 'tragedy':
        return new Tragedy(audience, play);
      case 'comedy':
        return new Comedy(audience, play);
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
  }
}

class Tragedy extends Performance {
  get amount() {
    const base = 40000;
    return this.audience > 30 ? base + 1000 * (this.audience - 30) : base;
  }

  get credits() {
    return Math.max(this.audience - 30, 0);
  }
}

class Comedy extends Performance {
  get amount() {
    const base = 30000;
    return this.audience > 20
      ? base + 10000 + 500 * (this.audience - 20)
      : base + 300 * this.audience;
  }

  get credits() {
    const result =
      Math.max(this.audience - 30, 0) + Math.floor(this.audience / 5);
    return result;
  }
}

function createStatement(invoice, plays) {
  const statement = {};
  statement.customer = invoice.customer;
  statement.performances = invoice.performances.map(
    ({ audience, playID }) => new Performance(audience, plays[playID])
  );
  statement.totalAmount = totalAmount(statement.performances);
  statement.totalCredit = totalCredit(statement.performances);

  return statement;

  function totalAmount(performances) {
    return performances.reduce(
      (sum, performance) => (sum += performance.amount),
      0
    );
  }

  function totalCredit(performances) {
    return performances.reduce(
      (sum, performance) => (sum += performance.credits),
      0
    );
  }
}

function renderHTML(statement) {
  // 대충 Html 태그가 들어간 코드라고 상상하자..
  let result = `청구 내역 (고객명: ${statement.customer})\n`;

  for (let perf of statement.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(statement.totalAmount / 100)}\n`;
  result += `적립 포인트: ${statement.totalCredit}점\n`;
  return result;
}

// 현재는 데이터를 계산하는 책임과 어떻게 출력하는지에 대한 책임을 둘 다 가지고 있다. 출력하는 것만 담당하도록 하자
function renderPlainText(statement) {
  let result = `청구 내역 (고객명: ${statement.customer})\n`;

  for (let perf of statement.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(statement.totalAmount / 100)}\n`;
  result += `적립 포인트: ${statement.totalCredit}점\n`;
  return result;
}

function usd(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number);
}

// 사용예:
const playsJSON = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoicesJSON = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
];

const result = statement(invoicesJSON[0], playsJSON);
const expected =
  '청구 내역 (고객명: BigCo)\n' +
  '  Hamlet: $650.00 (55석)\n' +
  '  As You Like It: $580.00 (35석)\n' +
  '  Othello: $500.00 (40석)\n' +
  '총액: $1,730.00\n' +
  '적립 포인트: 47점\n';
console.log(result);
console.log(result === expected);
