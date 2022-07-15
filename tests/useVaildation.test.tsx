/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import React, { FC } from "react";
import { act } from "react-dom/test-utils";

import { InputFunction, InputHandler, useValidation } from "../hooks";

describe("useVaildation testing", () => {
  it("test", async () => {
    let input: InputHandler, inputFn: InputFunction, isValid: boolean;

    const TestComponent: FC = () => {
      const event = useValidation({ minLength: 0, maxLength: 8 });

      input = event.input;
      inputFn = event.inputFn;
      isValid = event.isValid;

      return <input data-testid="get-this" {...input} />;
    };

    render(<TestComponent />);

    const inputField = screen.getByTestId("get-this") as HTMLInputElement;

    fireEvent.change(inputField, { target: { value: "123456789" } });
    expect(isValid!).toEqual(false);
    expect(input!.value).toEqual("123456789");

    fireEvent.change(inputField, { target: { value: "1234" } });
    expect(isValid!).toEqual(true);
    expect(input!.value).toEqual("1234");

    act(() => inputFn.reset());

    expect(inputField.value).toEqual("");
    expect(input!.value).toEqual("");
  });

  it("testing vaildation", () => {
    /*
    let input: InputHandler, inputFn: InputFunction, isValid: boolean;
    const TestComponent: FC = () => {
      const event = useValidation({ containAtLeast: ["oneDigit"] });

      input = event.input;
      inputFn = event.inputFn;
      isValid = event.isValid;

      return <input data-testid="get-this" {...input} />;
    };

    render(<TestComponent />);

    const inputField = screen.getByTestId("get-this") as HTMLInputElement;

    fireEvent.change(inputField, { target: { value: "applemango12" } });
    expect(isVaild!).toEqual(true);
    */

    const { result: result1 } = renderHook(() =>
      useValidation({
        initialState: "applemango12",
        containAtLeast: ["oneDigit"],
      })
    );

    expect(result1.current.isValid).toEqual(true);

    const { result: result2 } = renderHook(() =>
      useValidation({
        initialState: "applemango",
        containAtLeast: ["oneDigit"],
      })
    );

    expect(result2.current.isValid).toEqual(false);

    const { result: result3 } = renderHook(() =>
      useValidation({ initialState: "APPLE", containAtLeast: ["oneLowerCase"] })
    );

    expect(result3.current.isValid).toEqual(false);

    const { result: result4 } = renderHook(() =>
      useValidation({
        initialState: "APPLEm",
        containAtLeast: ["oneLowerCase"],
      })
    );

    expect(result4.current.isValid).toEqual(true);

    const { result: result5 } = renderHook(() =>
      useValidation({ initialState: "apple", containAtLeast: ["oneUpperCase"] })
    );

    expect(result5.current.isValid).toEqual(false);

    const { result: result6 } = renderHook(() =>
      useValidation({
        initialState: "appleM",
        containAtLeast: ["oneUpperCase"],
      })
    );

    expect(result6.current.isValid).toEqual(true);

    const { result: result7 } = renderHook(() =>
      useValidation({
        initialState: "applemango",
        containAtLeast: ["oneSpace"],
      })
    );

    expect(result7.current.isValid).toEqual(false);

    const { result: result8 } = renderHook(() =>
      useValidation({
        initialState: "apple mango",
        containAtLeast: ["oneSpace"],
      })
    );

    expect(result8.current.isValid).toEqual(true);

    const { result: result9 } = renderHook(() =>
      useValidation({
        initialState: "Apple mango12",
        containAtLeast: [
          "oneSpace",
          "oneDigit",
          "oneLowerCase",
          "oneUpperCase",
        ],
      })
    );

    expect(result9.current.isValid).toEqual(true);

    const { result: result10 } = renderHook(() =>
      useValidation({
        initialState: "applemango12",
        containAtLeast: [
          "oneSpace",
          "oneDigit",
          "oneLowerCase",
          "oneUpperCase",
        ],
      })
    );

    expect(result10.current.isValid).toEqual(false);
  });
});
