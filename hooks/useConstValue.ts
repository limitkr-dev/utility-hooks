// useConstValue.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-08-01

import { useRef } from "react";

export function useConstValue<T>(initialValue: T): T {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = initialValue;
  }

  return ref.current as T;
}
