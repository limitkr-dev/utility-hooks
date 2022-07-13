/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { FC, useRef, useState } from "react";
import { act } from "react-dom/test-utils";

import { useMouseEvent } from "../hooks";
import { SwitchCallbacks } from "../hooks/types";

describe("useMouseEvent testing", () => {
  it("fire mouse events", async () => {
    const TestComponent: FC = () => {
      const ref = useRef<HTMLDivElement | null>(null);
      const [value, setValue] = useState(0);

      useMouseEvent(() => setValue((v) => v + 1), ref);

      return (
        <>
          <div ref={ref} data-testid="click-this" />
          <p data-testid="get-this">{value}</p>
        </>
      );
    };

    const user = userEvent.setup();

    render(<TestComponent />);

    const element = screen.getByTestId("click-this");
    const pElement = screen.getByTestId("get-this");

    expect(pElement.innerHTML).toBe("0");

    await user.pointer({ target: element, keys: "[MouseLeft]" });

    expect(pElement.innerHTML).toBe("1");

    await user.pointer({ target: element, keys: "[MouseLeft]" });
    await user.pointer({ target: element, keys: "[MouseLeft]" });

    expect(pElement.innerHTML).toBe("3");
  });

  it("with callbacks", async () => {
    let callbacks: SwitchCallbacks;
    let isActive: boolean;

    const TestComponent: FC = () => {
      const ref = useRef<HTMLDivElement | null>(null);
      const [value, setValue] = useState(0);
      const events = useMouseEvent(() => setValue((v) => v + 1), ref);

      callbacks = events.callbacks;
      isActive = events.isActive;

      return (
        <>
          <div ref={ref} data-testid="click-this" />
          <p data-testid="get-this">{value}</p>
        </>
      );
    };

    const user = userEvent.setup();

    render(<TestComponent />);

    const element = screen.getByTestId("click-this");
    const pElement = screen.getByTestId("get-this");

    expect(pElement.innerHTML).toBe("0");

    await user.pointer({ target: element, keys: "[MouseLeft]" });

    expect(pElement.innerHTML).toBe("1");

    act(() => callbacks.off());

    await user.pointer({ target: element, keys: "[MouseLeft]" });
    expect(pElement.innerHTML).toBe("1");
    expect(isActive!).toEqual(false);

    act(() => callbacks.on());

    await user.pointer({ target: element, keys: "[MouseLeft]" });
    await user.pointer({ target: element, keys: "[MouseLeft]" });
    expect(pElement.innerHTML).toBe("3");
    expect(isActive!).toEqual(true);
  });
});
