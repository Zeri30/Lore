import { Suspense } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LandingContent } from "@/components/marketing/LandingContent";
import { ResetPasswordLinkHandler } from "@/components/auth";

export default function ResetPasswordPage() {
  return (
    <SiteShell>
      <Suspense fallback={null}>
        <ResetPasswordLinkHandler />
      </Suspense>
      <LandingContent />
    </SiteShell>
  );
}
