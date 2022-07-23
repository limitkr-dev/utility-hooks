// useNumericInput.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-07-23

import { useState } from "react";

export type NumericValueSetter = `+${number}` | `-${number}`;
export type UseNumericInputReturn = readonly [number, () => void];

const Checker = /([+|-]\d+)/g;

function checkSetter(setter: NumericValueSetter) {
  const result = setter.match(Checker);

  if (result !== null) {
    if (setter.length !== result[0].length) {
      throw SyntaxError(
        "Not a valid setter parameter. Maybe the parameter you entered contains whitespace or dupliace characters\n" +
          `received: '${setter}'`
      );
    }
  } else {
    throw SyntaxError(
      "Not a valid setter parameter. Did you use the same format as `+${number}` or `-${number}` correctly?\n" +
        `received: '${setter}'`
    );
  }

  return true;
}

function getOperatorAndSize(target: string): {
  readonly operator: "+" | "-";
  readonly size: number;
} {
  if (target.includes("+")) {
    return {
      operator: "+",
      size: Number(target.slice(target.indexOf("+") + 1)),
    };
  }
  return { operator: "-", size: Number(target.slice(target.indexOf("-") + 1)) };
}

export function useNumericInput(initialState: number): {
  readonly set: (setter: NumericValueSetter) => void;
  readonly value: number;
} {
  const [value, setValue] = useState(initialState);

  const set = (setter: NumericValueSetter) => {
    checkSetter(setter);
    const { operator, size } = getOperatorAndSize(setter);

    if (operator === "+") {
      setValue((v) => v + size);
    } else {
      setValue((v) => v - size);
    }
  };

  return { set, value } as const;
}
