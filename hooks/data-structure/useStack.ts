// useStack.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-08-01

import { useConstValue } from "../useConstValue";

export interface UseStackHandlers<T> {
  push: (item: T) => void;
  pop: () => void;
  isEmpty: () => boolean;
  peek: () => T;
  size: () => number;
}

export type UseStack<T> = readonly [T[], UseStackHandlers<T>];

class Stack<T> {
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
    this._items.pop();
    this._size -= 1;
  }

  public isEmpty(): boolean {
    return this._size === 0;
  }

  public peek(): T {
    return this._items[this._size - 1];
  }

  get items() {
    return this._items;
  }

  get size() {
    return this._size;
  }
}

export function useStack<T>(initialData?: T | T[]): UseStack<T> {
  const stack = useConstValue(new Stack(initialData));

  const push = (item: T) => stack.push(item);
  const pop = () => stack.pop();
  const isEmpty = () => stack.isEmpty();
  const peek = () => stack.peek();
  const size = () => stack.size;

  return [stack.items, { push, pop, isEmpty, peek, size }] as const;
}
