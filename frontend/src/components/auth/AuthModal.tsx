"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/context";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { ResetPasswordForm } from "./ResetPasswordForm";

const TITLES = {
  login: "Log in",
  register: "Create your account",
  "forgot-password": "Reset your password",
  "reset-password": "Choose a new password",
} as const;

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalView,
    setAuthModalView,
    closeAuthModal,
    resetPasswordCredentials,
  } = useAuth();

  useEffect(() => {
    if (!isAuthModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAuthModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={closeAuthModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-card border border-border/60 bg-surface p-6 shadow-[0_20px_60px_rgba(18,24,31,0.25)] sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <h2 id="auth-modal-title" className="font-display text-2xl font-semibold tracking-tight">
            {TITLES[authModalView]}
          </h2>
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Close"
            className="text-foreground/50 transition-colors hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {authModalView === "login" && (
          <LoginForm
            onSuccess={closeAuthModal}
            onSwitchToRegister={() => setAuthModalView("register")}
            onSwitchToForgotPassword={() => setAuthModalView("forgot-password")}
          />
        )}
        {authModalView === "register" && (
          <RegisterForm
            onSuccess={closeAuthModal}
            onSwitchToLogin={() => setAuthModalView("login")}
          />
        )}
        {authModalView === "forgot-password" && (
          <ForgotPasswordForm onBackToLogin={() => setAuthModalView("login")} />
        )}
        {authModalView === "reset-password" && resetPasswordCredentials && (
          <ResetPasswordForm
            token={resetPasswordCredentials.token}
            email={resetPasswordCredentials.email}
            onSuccess={() => setAuthModalView("login")}
          />
        )}
      </div>
    </div>
  );
}
