// useDynamicHTMLElement.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-07-24

import { CSSProperties, MutableRefObject } from "react";

// eslint-disable-next-line camelcase
export function useDynamicHTMLStyle_UNSTABLE<
  T extends MutableRefObject<HTMLElement | null>
>(
  ref: T
): {
  readonly setStyle: (newStyle: CSSProperties) => void;
} {
  const setStyle = (newStyle: CSSProperties) => {
    if (ref.current) {
      for (const [cssPropertyKey, cssValue] of Object.entries(newStyle)) {
        ref.current.style[cssPropertyKey] = cssValue;
      }
    }
  };

  return { setStyle } as const;
}
