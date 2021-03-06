import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { FC } from "react";

import { useClipboard } from "../hooks";

describe("useClipboard testing", () => {
  it("copy and paste test", async () => {
    const TestComponent: FC = () => {
      const { copy, paste, copyRef, pasteRef } = useClipboard({});

      return (
        <div>
          <input data-testid="copy-input-field" ref={copyRef} />
          <button data-testid="copy-btn" onClick={() => copy()}>
            COPY
          </button>
          <input data-testid="paste-input-field" ref={pasteRef} />
          <button data-testid="paste-btn" onClick={() => paste()}>
            PASTE
          </button>
        </div>
      );
    };

    const user = userEvent.setup();

    render(<TestComponent />);

    const copyBtn = screen.getByTestId("copy-btn");
    const copyInputField = screen.getByTestId(
      "copy-input-field"
    ) as HTMLInputElement;
    const pasteBtn = screen.getByTestId("paste-btn");
    const pasteInputField = screen.getByTestId(
      "paste-input-field"
    ) as HTMLInputElement;

    fireEvent.change(copyInputField, { target: { value: "copythistext" } });
    expect(copyInputField.value).toEqual("copythistext");

    await user.pointer({ target: copyBtn, keys: "[MouseLeft]" });
    await user.pointer({ target: pasteBtn, keys: "[MouseLeft]" });

    expect(pasteInputField.value).toEqual("copythistext");
  });
});
