// useKeyboardEvent.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-04-14

import { useCallback, useEffect, useMemo, useState } from "react";

import { SwitchCallbacks } from "./types";

export type UseKeyboardEventReturn = {
  readonly isActive: boolean;
  readonly callbacks: SwitchCallbacks;
};

type KeyboardEventType = keyof Pick<
  DocumentEventMap,
  "keyup" | "keypress" | "keydown"
>;

export function useKeyboardEvent(
  callbackFn: (event: KeyboardEvent) => void,
  keyCodes: string[],
  initialState = true,
  eventType: KeyboardEventType = "keyup"
): UseKeyboardEventReturn {
  const [isActive, setIsActive] = useState(initialState);

  const callbacks = useMemo(
    () => ({
      on: () => setIsActive(true),
      off: () => setIsActive(false),
      toggle: () => setIsActive((prevState) => !prevState),
    }),
    []
  );

  const handler = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      const match = keyCodes.includes(event.key);

      if (match) {
        callbackFn(event);
      }
    },
    [callbackFn, keyCodes]
  );

  useEffect(() => {
    if (isActive) document.addEventListener(eventType, handler);
    return () => {
      document.removeEventListener(eventType, handler);
    };
  }, [isActive, handler, eventType]);

  return { isActive, callbacks } as const;
}
