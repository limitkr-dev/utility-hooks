// useQueue.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-08-01

import { useConstValue } from "../useConstValue";

export interface UseQueueHandlers<T> {
  /**
   * Add elements to the end of the queue
   */
  push: (item: T) => void;
  /**
   * Remove an element from the front of a queue
   */
  pop: () => void;
  /**
   * Returns the element from the front of the queue
   */
  front: () => T;
  /**
   * Returns the element from the back of the queue
   */
  back: () => T;
  /**
   * Find the number of elements in the queue
   */
  size: () => number;
  /**
   * Check if the queue is empty
   */
  isEmpty: () => boolean;
}

export type UseQueue<T> = readonly [T[], UseQueueHandlers<T>];

class Queue<T> {
  private _items: T[];
  private _size: number;
  constructor(initialData: T | T[] = []) {
    Array.isArray(initialData)
      ? (this._items = initialData)
      : (this._items = [initialData]);
    this._size = this._items.length;
  }

  public push(item: T): void {
    this._items.push(item);
    this._size += 1;
  }

  public pop(): void {
    if (this.isEmpty()) {
      return;
    }
    this._items.shift();
    this._size -= 1;
  }

  public front(): T {
    return this._items[0];
  }

  public back(): T {
    return this._items[this._size - 1];
  }

  public isEmpty(): boolean {
    return this._size === 0;
  }

  get items() {
    return this._items;
  }

  get size() {
    return this._size;
  }
}

export function useQueue<T>(initialData?: T | T[]): UseQueue<T> {
  const queue = useConstValue(new Queue(initialData));

  const push = (item: T) => queue.push(item);
  const pop = () => queue.pop();
  const isEmpty = () => queue.isEmpty();
  const front = () => queue.front();
  const back = () => queue.back();
  const size = () => queue.size;

  return [queue.items, { push, pop, isEmpty, front, back, size }] as const;
}
