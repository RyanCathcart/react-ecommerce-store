import type { InputBaseComponentProps } from "@mui/material";
import { forwardRef, type Ref, useImperativeHandle, useRef } from "react";

export const StripeInput = forwardRef(function StripeInput(
  { component: Component, ...props }: InputBaseComponentProps,
  ref: Ref<unknown>
) {
  const elementRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current.focus,
  }));

  return (
    <Component
      onReady={(element: any) => (elementRef.current = element)}
      {...props}
    />
  );
});
