// before
// class List {}

// class Stack extends List {}

// after
class List {}

class Stack {
  constructor() {
    this.storage = new List();
  }

  pop() {}

  push() {}
}
