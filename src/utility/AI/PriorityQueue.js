//slightly modified version of 
//https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

const topIndex = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

export default class PriorityQueue {
  constructor(comparator = (a, b) => {
    if (a.stepsFromStart !== b.stepsFromStart) {
      return a.stepsFromStart < b.stepsFromStart;
    } else {
      var aCentrality = Math.abs(3 - a.xPos) + Math.abs(3 - a.yPos);
      var bCentrality = Math.abs(3 - b.xPos) + Math.abs(3 - b.yPos);
      return aCentrality < bCentrality;
    }
  }) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[topIndex];
  }
  push(value) { 
    this._heap.push(value);
    this._siftUp();
  }
  
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > topIndex) {
      this._swap(topIndex, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[topIndex] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > topIndex && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = topIndex;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}