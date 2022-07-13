// useMouseEvent.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-07-08

import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { SwitchCallbacks } from "./types";

export type UseMouseEventReturn = {
  readonly isActive: boolean;
  readonly callbacks: SwitchCallbacks;
};

export function useMouseEvent<T extends HTMLElement | null>(
  callbackFn: (event: MouseEvent) => void,
  ref: MutableRefObject<T>,
  initialState = true
): UseMouseEventReturn {
  const [isActive, setIsActive] = useState(initialState);
  const [currentRef, setCurrentRef] = useState<HTMLElement | null>(null);

  const callbacks = useMemo(
    () => ({
      on: () => setIsActive(true),
      off: () => setIsActive(false),
      toggle: () => setIsActive((prevState) => !prevState),
    }),
    []
  );

  const handler = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      callbackFn(event);
    },
    [callbackFn]
  );

  useEffect(() => {
    if (ref.current) setCurrentRef(ref.current);
  }, [ref]);

  useEffect(() => {
    if (currentRef && isActive) {
      currentRef.addEventListener("click", handler);
    }
    return () => {
      currentRef?.removeEventListener("click", handler);
    };
  }, [currentRef, handler, isActive]);

  return { isActive, callbacks } as const;
}
