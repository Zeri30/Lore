"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/context";
import { ApiError } from "@/lib/api";
import { AuthField } from "./AuthField";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

function composeFullName(firstName: string, middleInitial: string, lastName: string) {
  const first = firstName.trim();
  const last = lastName.trim();
  const mi = middleInitial.trim().replace(/\.+$/, "");
  return mi ? `${first} ${mi}. ${last}` : `${first} ${last}`;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
      const fullName = composeFullName(firstName, middleInitial, lastName);
      await register(fullName, email, password, passwordConfirmation);
      onSuccess?.();
    } catch (error) {
      if (error instanceof ApiError && error.isValidationError && error.errors) {
        setErrors(error.errors);
        if (error.errors.name?.[0]) setFormError(error.errors.name[0]);
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
        id="register-first-name"
        label="First name"
        type="text"
        autoComplete="given-name"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <div className="grid grid-cols-[1fr_4.5rem] gap-4">
        <AuthField
          id="register-last-name"
          label="Last name"
          type="text"
          autoComplete="family-name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <AuthField
          id="register-middle-initial"
          label="M.I."
          type="text"
          autoComplete="additional-name"
          maxLength={2}
          value={middleInitial}
          onChange={(e) => setMiddleInitial(e.target.value)}
        />
      </div>
      <AuthField
        id="register-email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email?.[0]}
      />
      <AuthField
        id="register-password"
        label="Password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password?.[0]}
      />
      <AuthField
        id="register-password-confirmation"
        label="Confirm password"
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
        {isSubmitting ? "Creating account…" : "Create account"}
      </button>

      {onSwitchToLogin && (
        <p className="text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-brand hover:text-brand-strong"
          >
            Log in
          </button>
        </p>
      )}
    </form>
  );
}
