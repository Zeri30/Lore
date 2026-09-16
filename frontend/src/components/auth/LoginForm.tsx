"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/context";
import { ApiError } from "@/lib/api";
import { AuthField } from "./AuthField";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setErrors({});
    setIsSubmitting(true);

    try {
      await login(email, password);
      onSuccess?.();
    } catch (error) {
      if (error instanceof ApiError && error.isValidationError && error.errors) {
        setErrors(error.errors);
      } else {
        setFormError(error instanceof Error ? error.message : "Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <AuthField
        id="login-email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email?.[0]}
      />
      <AuthField
        id="login-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password?.[0]}
      />

      {formError && <p className="text-sm text-danger">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex w-full items-center justify-center rounded-pill bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Logging in…" : "Log in"}
      </button>

      {onSwitchToRegister && (
        <p className="text-center text-sm text-foreground/60">
          New to LORE?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-brand hover:text-brand-strong"
          >
            Create an account
          </button>
        </p>
      )}
    </form>
  );
}
