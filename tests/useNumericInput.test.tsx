import { act, renderHook } from "@testing-library/react-hooks";

import { useNumericInput } from "../hooks";

test("should use Numeric Input", () => {
  const { result } = renderHook(() => useNumericInput(0));

  expect(result.current.value).toBe(0);
  expect(typeof result.current.set).toBe("function");

  act(() => {
    result.current.set("+3");
  });

  expect(result.current.value).toBe(3);

  act(() => {
    result.current.set("+100");
    result.current.set("+100");
  });

  expect(result.current.value).toBe(203);

  act(() => {
    result.current.set("-50");
  });

  expect(result.current.value).toBe(153);
});
