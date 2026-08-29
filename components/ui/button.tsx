import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "white"
  | "outline"
  | "ghost"
  | "dark";

export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-glow hover:bg-brand-700 hover:shadow-glow-lg hover:-translate-y-0.5",
  accent:
    "bg-accent-500 text-white shadow-glow-accent hover:bg-accent-600 hover:shadow-glow-lg hover:-translate-y-0.5",
  white:
    "bg-white text-brand-700 shadow-lg shadow-black/10 hover:bg-brand-50 hover:-translate-y-0.5",
  outline:
    "border-2 border-zinc-200 text-zinc-700 hover:border-brand-500 hover:text-brand-700 hover:bg-brand-50",
  ghost: "text-zinc-700 hover:bg-zinc-100",
  dark: "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:-translate-y-0.5",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:translate-y-0";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);

  if (props.href) {
    const { href, ...anchorProps } = props as ButtonAsLink;
    return <Link href={href} className={classes} {...anchorProps} />;
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return <button type={type} className={classes} {...buttonProps} />;
}
