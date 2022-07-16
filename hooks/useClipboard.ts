// useClipboard.ts
//
// Author: Yongin Kim <https://github.com/limitkr>
// Created At: 2022-07-11

import { MutableRefObject, useRef } from "react";

import { VoidCallback, voidCallback } from "./types";

type UseClipboardProps = {
  onSuccess?: VoidCallback;
  onError?: VoidCallback;
};

type UseClipboardReturn = {
  readonly copy: () => void;
  readonly paste: () => void;
  readonly copyRef: MutableRefObject<HTMLInputElement | null>;
  readonly pasteRef: MutableRefObject<HTMLInputElement | null>;
};

export function useClipboard({
  onSuccess = voidCallback,
  onError = voidCallback,
}: UseClipboardProps): UseClipboardReturn {
  const copyRef = useRef<HTMLInputElement | null>(null);
  const pasteRef = useRef<HTMLInputElement | null>(null);
  const copy = () => {
    if (copyRef.current) {
      navigator.clipboard.writeText(copyRef.current.value).then(
        function () {
          onSuccess();
        },
        function () {
          onError();
        }
      );
    }
  };

  const paste = () => {
    navigator.clipboard.readText().then((clipText) => {
      if (pasteRef.current) {
        pasteRef.current.value = clipText;
      }
    });
  };

  return { copy, paste, copyRef, pasteRef } as const;
}
