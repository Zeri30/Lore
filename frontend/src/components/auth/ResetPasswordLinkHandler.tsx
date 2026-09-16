"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

/** Opens the auth modal's reset-password view when a token/email pair is present in the URL. */
export function ResetPasswordLinkHandler() {
  const searchParams = useSearchParams();
  const { openAuthModal } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    if (token && email) {
      openAuthModal("reset-password", { token, email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
