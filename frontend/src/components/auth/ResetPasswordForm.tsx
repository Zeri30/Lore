"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/context";
import { ApiError } from "@/lib/api";
import { AuthField } from "./AuthField";

interface ResetPasswordFormProps {
  token: string;
  email: string;
  onSuccess?: () => void;
}

export function ResetPasswordForm({ token, email, onSuccess }: ResetPasswordFormProps) {
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setErrors({});
    setIsSubmitting(true);

    try {
      await resetPassword({ token, email, password, passwordConfirmation });
      onSuccess?.();
    } catch (error) {
      if (error instanceof ApiError && error.isValidationError && error.errors) {
        setErrors(error.errors);
        if (error.errors.email?.[0]) setFormError(error.errors.email[0]);
      } else {
        setFormError(error instanceof Error ? error.message : "Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <p className="text-sm text-foreground/60">
        Choose a new password for <span className="font-medium text-foreground">{email}</span>.
      </p>
      <AuthField
        id="reset-password-password"
        label="New password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password?.[0]}
      />
      <AuthField
        id="reset-password-password-confirmation"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        required
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />

      {formError && <p className="text-sm text-danger">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex w-full items-center justify-center rounded-pill bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Resetting…" : "Reset password"}
      </button>
    </form>
  );
}
