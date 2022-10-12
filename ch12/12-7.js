// 단순히 하나 정도만 다른 거라면, 굳이 클래스를 나눌 필요 없다. -> 캡슐화 강조 -> 외부에서 사용하기 쉽게
class Person {
  #name;
  #gender;
  constructor(name, gender) {
    this.#name = name;
    this.#gender = gender;
  }

  get name() {
    return this.#name;
  }

  get genderCode() {
    return this.#genderCode;
  }

  get isMale() {
    return this.#genderCode === 'M';
  }

  static create(record) {
    switch (record.gender) {
      case 'M':
        return new Male(record.name);
      case 'F':
        return new Female(record.name);
      default:
        return new Person(record.name);
    }
  }
}

function loadFromInput(data) {
  const result = [];
  data.forEach((record) => {
    result.push(Person.create(record));
  });
  return result;
}

const people = loadFromInput([
  { name: '엘리', gender: 'F' },
  { name: '철수', gender: 'M' },
  { name: '밥', gender: 'M' },
]);

const numberOfMales = people.filter((p) => p.isMale).length;

console.log(numberOfMales);
