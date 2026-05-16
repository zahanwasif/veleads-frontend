"use client";

import type { ComponentPropsWithoutRef } from "react";

import { CALENDLY_CONFIGURE_HINT, getCalendlyUrl } from "@/lib/calendly";

type BookDemoButtonProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children"
> & {
  variant: "dark" | "light";
};

const base =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F0F0F]";

const variants = {
  dark: "bg-[#0F0F0F] text-white hover:bg-[#333333]",
  light: "bg-white text-[#0F0F0F] hover:bg-[#F0F0F0]",
} as const;

export function BookDemoButton({
  variant,
  className = "",
  ...rest
}: BookDemoButtonProps) {
  const url = getCalendlyUrl();
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (!url) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title={CALENDLY_CONFIGURE_HINT}
        className={`${cls} cursor-not-allowed opacity-50`.trim()}
      >
        Book Free Demo
      </span>
    );
  }

  return (
    <a
      href={url}
      {...rest}
      className={cls}
    >
      Book Free Demo
    </a>
  );
}
