/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { FC, useState } from "react";
import { act } from "react-dom/test-utils";

import { useKeyboardEvent } from "../hooks";
import { SwitchCallbacks } from "../hooks/types";

describe("useKeyboardEvent testing", () => {
  it("fire keyboard events", async () => {
    const TestComponent: FC = () => {
      const [value, setValue] = useState(0);

      useKeyboardEvent(() => setValue((v) => v + 1), ["a"]);

      return <p data-testid="get-this">{value}</p>;
    };
    const user = userEvent.setup();

    render(<TestComponent />);
    const element = screen.getByTestId("get-this");

    expect(element.innerHTML).toBe("0");

    await user.keyboard("{a}");

    expect(element.innerHTML).toBe("1");
    await user.keyboard("{a}");
    await user.keyboard("{a}");

    expect(element.innerHTML).toBe("3");
  });

  it("with callbacks", async () => {
    let callbacks: SwitchCallbacks;
    let isActive: boolean;

    const TestComponent: FC = () => {
      const [value, setValue] = useState(0);
      const events = useKeyboardEvent(() => setValue((v) => v + 1), ["a"]);

      callbacks = events.callbacks;
      isActive = events.isActive;

      return <p data-testid="get-this">{value}</p>;
    };
    const user = userEvent.setup();

    render(<TestComponent />);
    const element = screen.getByTestId("get-this");

    await user.keyboard("{a}");

    expect(element.innerHTML).toBe("1");

    act(() => callbacks.off());

    await user.keyboard("{a}");
    expect(element.innerHTML).toBe("1");
    expect(isActive!).toEqual(false);

    act(() => callbacks.on());

    await user.keyboard("{a}");
    expect(element.innerHTML).toBe("2");
    expect(isActive!).toEqual(true);
  });
});
