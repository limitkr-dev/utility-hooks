/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fireEvent, render, screen } from "@testing-library/react";
import React, { FC } from "react";
import { act } from "react-dom/test-utils";

import { InputFunction, InputHandler, useInput } from "../hooks";

describe("useInput testing", () => {
  it("test", async () => {
    let input: InputHandler, inputFn: InputFunction;

    const TestComponent: FC = () => {
      [input, inputFn] = useInput({ initialState: "" });

      return <input data-testid="get-this" {...input} />;
    };

    render(<TestComponent />);

    const inputField = screen.getByTestId("get-this") as HTMLInputElement;

    fireEvent.change(inputField, { target: { value: "testvalue" } });
    expect(inputField.value).toEqual("testvalue");
    expect(input!.value).toEqual("testvalue");

    act(() => inputFn.reset());

    expect(inputField.value).toEqual("");
    expect(input!.value).toEqual("");
  });
});
