import { act, renderHook } from "@testing-library/react-hooks";

import { useQueue } from "../hooks";

test("testing use Queue", () => {
  const { result } = renderHook(() => useQueue(["item1"]));
  const [items, { push, pop, front, back, isEmpty, size }] = result.current;

  expect(items).toEqual(["item1"]);

  act(() => {
    push("item2");
  });

  expect(items).toEqual(["item1", "item2"]);
  expect(size()).toBe(2);

  act(() => {
    push("item3");
    push("item4");
  });

  expect(items).toEqual(["item1", "item2", "item3", "item4"]);
  expect(size()).toBe(4);

  act(() => {
    pop();
  });

  expect(items).toEqual(["item2", "item3", "item4"]);
  expect(size()).toBe(3);
  expect(front()).toBe("item2");
  expect(back()).toBe("item4");

  expect(isEmpty()).toBe(false);

  act(() => {
    pop();
    pop();
    pop();
  });

  expect(size()).toBe(0);
  expect(isEmpty()).toBe(true);
  expect(front()).toBe(undefined);
  expect(back()).toBe(undefined);
});
