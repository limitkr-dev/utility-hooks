// useValidation.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-07-15

import { useMemo } from "react";

import { StringOrNumber } from "./types";
import { InputFunction, InputHandler, useInput } from "./useInput";

type ValidationChecker =
  | "oneUpperCase"
  | "oneLowerCase"
  | "oneDigit"
  | "oneSpace";

export type UseValidationProps = {
  initialState?: StringOrNumber;
  minLength?: number;
  maxLength?: number;
  containAtLeast?: ValidationChecker[];
};

export type UseVaildationReturn = {
  readonly input: InputHandler;
  readonly inputFn: InputFunction;
  readonly isValid: boolean;
};

function isContainOneLowerCase(value: string) {
  return value.match(/.*[a-z].*/);
}

function isContainOneUpperCase(value: string) {
  return value.match(/.*[A-Z].*/);
}

function isContainOneDigit(value: string) {
  return value.match(/.*\d.*/);
}

function isContainOneSpace(value: string) {
  return !value.match(/^[^ ]+$/);
}

export function useValidation({
  initialState = "",
  minLength = 0,
  maxLength = Infinity,
  containAtLeast = [],
}: UseValidationProps): UseVaildationReturn {
  const [input, inputFn] = useInput({ initialState });
  const isValid = useMemo(() => {
    const value = String(input.value);

    if (value.length < minLength) return false;
    if (value.length > maxLength) return false;
    if (
      containAtLeast.includes("oneLowerCase") &&
      !isContainOneLowerCase(value)
    ) {
      return false;
    }
    if (
      containAtLeast.includes("oneUpperCase") &&
      !isContainOneUpperCase(value)
    ) {
      return false;
    }
    if (containAtLeast.includes("oneDigit") && !isContainOneDigit(value)) {
      return false;
    }
    if (containAtLeast.includes("oneSpace") && !isContainOneSpace(value)) {
      return false;
    }

    return true;
  }, [input, containAtLeast]);

  return { input, inputFn, isValid } as const;
}
