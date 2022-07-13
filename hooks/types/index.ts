export type SwitchCallbacks = {
  on: () => void;
  off: () => void;
  toggle: () => void;
};

export type StringOrNumber = string | number;

export type VoidCallback = () => void;

export const voidCallback: VoidCallback = () => null;
