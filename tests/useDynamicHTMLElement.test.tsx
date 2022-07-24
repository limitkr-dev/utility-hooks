import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { FC, useRef } from "react";

import { useDynamicHTMLStyle_UNSTABLE as useDynamicHTMLStyle } from "../hooks";

describe("useDynamicHTMLStyle testing", () => {
  it("test", async () => {
    const TestComponent: FC = () => {
      const divRef = useRef<HTMLDivElement | null>(null);
      const { setStyle } = useDynamicHTMLStyle(divRef);

      return (
        <>
          <div ref={divRef} data-testid="get-this" style={{ color: "blue" }} />
          <button
            data-testid="click-this"
            onClick={() =>
              setStyle({ color: "red", background: "blue", width: "96px" })
            }
          />
        </>
      );
    };

    render(<TestComponent />);

    const user = userEvent.setup();

    const divElement = screen.getByTestId("get-this") as HTMLDivElement;
    const buttonElement = screen.getByTestId("click-this") as HTMLButtonElement;

    expect(divElement).toHaveStyle("color: blue");

    await user.pointer({ target: buttonElement, keys: "[MouseLeft]" });

    expect(divElement).toHaveStyle(
      "color: red; background: blue; width: 96px;"
    );
  });
});
