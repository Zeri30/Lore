"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/context";
import { ApiError } from "@/lib/api";
import { AuthField } from "./AuthField";

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setErrors({});
    setIsSubmitting(true);

    try {
      const message = await forgotPassword(email);
      setSuccessMessage(message);
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

  if (successMessage) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-foreground/70">{successMessage}</p>
        {onBackToLogin && (
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-center text-sm font-medium text-brand hover:text-brand-strong"
          >
            Back to log in
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <p className="text-sm text-foreground/60">
        Enter the email on your account and we&apos;ll send you a link to reset your password.
      </p>
      <AuthField
        id="forgot-password-email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email?.[0]}
      />

      {formError && <p className="text-sm text-danger">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex w-full items-center justify-center rounded-pill bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send reset link"}
      </button>

      {onBackToLogin && (
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-center text-sm font-medium text-brand hover:text-brand-strong"
        >
          Back to log in
        </button>
      )}
    </form>
  );
}
