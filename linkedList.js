class Node {
  constructor(data = null, nextNode = null) {
    this.data = data;
    this.nextNode = nextNode;
  }
}

export default class LinkedList {
  constructor() {
    this.head = new Node();
  }

  append(value) {
    if (this.head.value === null) {
      this.head.value = value;
    } else {
      let lastNode = this.head;
      while (lastNode.nextNode !== null) {
        lastNode = lastNode.nextNode;
      }
      lastNode.nextNode = new Node(value);
    }
  }
  prepend(value) {
    if (this.head.value === null) {
      this.head = new Node(value);
    } else {
      this.head = new Node(value, this.head);
    }
  }
  size() {
    if (this.head.value === null) {
      return 0;
    } else {
      let lastNode = this.head;
      let count = 1;
      while (lastNode.nextNode !== null) {
        lastNode = lastNode.nextNode;
        count += 1;
      }
      return count;
    }
  }
  headNode() {
    return this.head;
  }
  headNodeEmpty() {
    if (this.head.data === null) {
      return true;
    }
    return false;
  }
  tail() {
    let lastNode = this.head;
    while (lastNode.nextNode !== null) {
      lastNode = lastNode.nextNode;
    }
    return lastNode;
  }
  at(index) {
    let actualNode = this.head;
    let i = 0;
    while (i < index) {
      actualNode = actualNode.nextNode;
      i += 1;
    }
    return actualNode;
  }
  pop() {
    let lastNode = this.head;
    let secondToLastNode;
    while (lastNode.nextNode !== null) {
      secondToLastNode = lastNode;
      lastNode = lastNode.nextNode;
    }
    if (secondToLastNode) {
      secondToLastNode.nextNode = null;
    } else {
      this.head = new Node();
    }
  }
  contains(value) {
    let lastNode = this.head;
    while (lastNode !== null) {
      if (lastNode.value === value) {
        return true;
      }
      lastNode = lastNode.nextNode;
    }
    return false;
  }
  findIndex(value) {
    let lastNode = this.head;
    let i = 0;
    while (lastNode !== null) {
      if (lastNode.value === value) {
        return i;
      }
      lastNode = lastNode.nextNode;
      i++;
    }
    return null;
  }
  findNode(value) {
    let lastNode = this.head;
    while (lastNode !== null) {
      if (lastNode.data[0] === value) {
        return lastNode.data[1];
      }
      lastNode = lastNode.nextNode;
    }
    return lastNode;
  }
  updateAddNode(key, value) {
    let lastNode = this.head;
    while (lastNode !== null) {
      if (lastNode.data === null || lastNode.data[0] === key) {
        lastNode.data = [key, value];
        return;
      }
      if (lastNode.nextNode === null) {
        lastNode.nextNode = new Node([key, value]);
        return;
      }
      lastNode = lastNode.nextNode;
    }
  }
  toString() {
    let lastNode = this.head;
    let stringValue = "";
    while (lastNode !== null) {
      stringValue += "( " + lastNode.value + " ) -> ";
      lastNode = lastNode.nextNode;
    }
    stringValue += "null";
    return stringValue;
  }
  toArray() {
    let lastNode = this.head;
    let arrayOfValues = [];
    while (lastNode !== null) {
      if (lastNode.data) {
        arrayOfValues.push(lastNode.data);
      }

      lastNode = lastNode.nextNode;
    }
    return arrayOfValues;
  }
  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
    } else {
      let actualNode = this.head;
      let previousNode;
      let i = 0;
      while (i < index) {
        previousNode = actualNode;
        actualNode = actualNode.nextNode;
        i += 1;
        if (actualNode === null) {
          this.append(value);
          break;
        }
      }
      previousNode.nextNode = new Node(value, actualNode);
    }
  }
  removeAt(index) {
    let actualNode = this.head;
    let previousNode;
    let i = 0;
    while (i < index) {
      previousNode = actualNode;
      actualNode = actualNode.nextNode;
      i += 1;
      if (actualNode === null) {
        break;
      }
    }
    previousNode.nextNode = actualNode.nextNode;
  }
  remove(value) {
    let actualNode = this.head;
    let previousNode;
    while (actualNode !== null) {
      if (actualNode.data[0] === value) {
        if (previousNode) {
          previousNode.nextNode = actualNode.nextNode;
        } else {
          actualNode.data = null;
        }
        return;
      }
      previousNode = actualNode;
      actualNode = actualNode.nextNode;
    }
  }
}
