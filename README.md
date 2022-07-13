# utility-hooks

A react hooks library that helps for write in less code

## :warning: Experimental Library

## Usage

### useKeyboardEvent

```tsx
import React from "react";
import { useKeyboardEvent } from "utility-hooks";

export default function App() {
  const { isActive, callbacks } = useKeyboardEvent(
    (e) => alert(`${e.key} key pressed!`),
    ["a", "b"]
  );
  return (
    <div>
      <input
        type="checkbox"
        onChange={(e) => (e.target.checked ? callbacks.on() : callbacks.off())}
        checked={isActive}
      />
      <p>Keyboard event {isActive ? "enabled" : "disabled"}</p>
    </div>
  );
}
```

### useMouseEvent

```tsx
import React from "react";
import { useMouseEvent } from "utility-hooks";

export default function App() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isActive, callbacks } = useMouseEvent(
    () => alert("Mouse clicked!"),
    ref
  );

  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => (e.target.checked ? callbacks.on() : callbacks.off())}
        checked={isActive}
      />
      <div ref={ref}>
        {isActive ? "Click this area" : "You can't click this area"}
      </div>
    </>
  );
}
```
