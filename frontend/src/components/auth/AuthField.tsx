"use client";

import type { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthField({ label, error, id, ...inputProps }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-foreground/60">
        {label}
      </label>
      <input
        id={id}
        className="rounded-field border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-brand"
        aria-invalid={error ? "true" : undefined}
        {...inputProps}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
