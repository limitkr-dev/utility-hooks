// useInput.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-07-11

import {
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { StringOrNumber } from "./types";

export type InputHandler = {
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly value: StringOrNumber;
  readonly ref: RefObject<HTMLInputElement>;
};

export type InputFunction = {
  reset: () => void;
};

export type UseInputProps = {
  initialState?: StringOrNumber;
};

export function useInput({
  initialState = undefined,
}: UseInputProps): readonly [InputHandler, InputFunction] {
  const ref = useRef<HTMLInputElement>(null);
  const [inputRef, setInputRef] = useState<HTMLInputElement>();
  const [value, setValue] = useState(initialState);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  }, []);

  const reset = () => {
    setValue("");
    if (inputRef) inputRef.value = "";
  };

  useEffect(() => {
    if (ref.current) setInputRef(ref.current);
  }, [ref]);

  const inputHandler = {
    onChange,
    value,
    ref,
  } as InputHandler;

  const inputFunction: InputFunction = {
    reset,
  };

  return [inputHandler, inputFunction] as const;
}
