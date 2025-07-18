//slightly modified version of 
//https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

const topIndex = 0;
const parent = (i: number): number => ((i + 1) >>> 1) - 1;
const left = (i: number): number => (i << 1) + 1;
const right = (i: number): number => (i + 1) << 1;

type QueueNode = {
  stepsFromStart: number;
  xPos: number;
  yPos: number;
};

export default class PriorityQueue {
  private _heap: QueueNode[];
  private _comparator: (a: QueueNode, b: QueueNode) => boolean;

  constructor(
    comparator: (a: QueueNode, b: QueueNode) => boolean = (a, b) => {
      if (a.stepsFromStart !== b.stepsFromStart) {
        return a.stepsFromStart < b.stepsFromStart;
      } else {
        const aCentrality = Math.abs(3 - a.xPos) + Math.abs(3 - a.yPos);
        const bCentrality = Math.abs(3 - b.xPos) + Math.abs(3 - b.yPos);
        return aCentrality < bCentrality;
      }
    }
  ) {
    this._heap = [];
    this._comparator = comparator;
  }

  size(): number {
    return this._heap.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  peek(): QueueNode {
    return this._heap[topIndex];
  }

  push(value: QueueNode): void {
    this._heap.push(value);
    this._siftUp();
  }

  pop(): QueueNode {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > topIndex) {
      this._swap(topIndex, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  replace(value: QueueNode): QueueNode {
    const replacedValue = this.peek();
    this._heap[topIndex] = value;
    this._siftDown();
    return replacedValue;
  }

  private _greater(i: number, j: number): boolean {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  private _swap(i: number, j: number): void {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  private _siftUp(): void {
    let node = this.size() - 1;
    while (node > topIndex && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }

  private _siftDown(): void {
    let node = topIndex;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      const maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
