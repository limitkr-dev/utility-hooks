// useClipboard.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-07-11

import { VoidCallback, voidCallback } from "./types";

type UseClipboardProps = {
  onSuccess?: VoidCallback;
  onError?: VoidCallback;
};

type UseClipboardReturn = {
  readonly copy: (targetId: string) => void;
  readonly paste: (targetId: string) => void;
};

export function useClipboard({
  onSuccess = voidCallback,
  onError = voidCallback,
}: UseClipboardProps): UseClipboardReturn {
  const copy = (targetId: string) => {
    const element = document.getElementById(
      targetId
    ) as HTMLInputElement | null;

    if (!element) {
      throw Error(`Element ID ${targetId} not found. try another element.`);
    }
    navigator.clipboard.writeText(element.value).then(
      function () {
        onSuccess();
      },
      function () {
        onError();
      }
    );
  };

  const paste = (targetId: string) => {
    navigator.clipboard.readText().then((clipText) => {
      const element = document.getElementById(
        targetId
      ) as HTMLInputElement | null;

      if (!element) {
        throw Error(`Element ID ${targetId} not found. try another element.`);
      }
      element.value = clipText;
    });
  };

  return { copy, paste } as const;
}
