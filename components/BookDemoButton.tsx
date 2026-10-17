"use client";

import type { ComponentPropsWithoutRef } from "react";

import { CALENDLY_CONFIGURE_HINT, getCalendlyUrl } from "@/lib/calendly";
import { Button, type ButtonVariant } from "./ui/Button";

type BookDemoButtonProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children"
> & {
  variant: ButtonVariant;
  size?: "md" | "sm";
  label?: string;
  arrow?: boolean;
};

export function BookDemoButton({
  label = "Book a strategy call",
  ...rest
}: BookDemoButtonProps) {
  const url = getCalendlyUrl();

  if (!url) {
    return <Button {...rest} label={label} disabled title={CALENDLY_CONFIGURE_HINT} />;
  }

  return <Button {...rest} label={label} href={url} />;
}
