"use client";

import { useEffect } from "react";

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
        <main className="bg-cri-parchment flex min-h-screen items-center justify-center p-4">
          <div className="max-w-lg text-center">
            <h1 className="text-cri-error text-4xl">Une erreur est survenue</h1>
            <p className="text-cri-humus mt-4">
              Nous nous excusons pour la gêne occasionnée. L&apos;équipe technique a été notifiée.
            </p>
            {error.digest && (
              <p className="text-cri-ink-muted mt-2 text-xs">
                Référence : <code>{error.digest}</code>
              </p>
            )}
            <button
              onClick={() => reset()}
              className="btn bg-cri-forest hover:bg-cri-canopy mt-8 text-white"
            >
              Réessayer
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
