/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { DefaultTheme, NextUIProvider } from "@/components/providers";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logger l'erreur côté client (Sentry, etc.)
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <NextUIProvider>
          <main className="min-h-screen flex items-center justify-center bg-cri-parchment p-4">
            <div className="text-center max-w-lg">
              <h1 className="text-4xl text-cri-error">Une erreur est survenue</h1>
              <p className="mt-4 text-cri-humus">
                Nous nous excusons pour la gêne occasionnée. L&apos;équipe technique a été notifiée.
              </p>
              {error.digest && (
                <p className="mt-2 text-xs text-cri-ink-muted">
                  Référence : <code>{error.digest}</code>
                </p>
              )}
              <button
                onClick={() => reset()}
                className="mt-8 btn bg-cri-forest text-white hover:bg-cri-canopy"
              >
                Réessayer
              </button>
            </div>
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
