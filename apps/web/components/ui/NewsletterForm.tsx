"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, CheckCircle2, AlertCircle, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * NewsletterForm — Formulaire d'inscription newsletter (double opt-in RGPD)
 *
 * Affiche un formulaire email + case de consentement explicite.
 * À la soumission : affiche un message de confirmation (double opt-in
 * via Brevo / Sendinblue côté serveur).
 *
 * Accessibilité :
 * - Labels associés (htmlFor)
 * - aria-describedby pour helper et error
 * - role="alert" pour le message d'erreur
 * - role="status" pour la confirmation
 */
export interface NewsletterFormProps {
  className?: string;
  variant?: "default" | "dark";
  title?: string;
  description?: string;
  ctaLabel?: string;
  placeholder?: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  className,
  variant = "default",
  title = "Recevez nos actualités",
  description = "Une lettre trimestrielle sur l'avancement du projet, nos certifications et nos opportunités d'investissement.",
  ctaLabel = "S'inscrire",
  placeholder = "votre@email.com",
}) => {
  const [email, setEmail] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [state, setState] = React.useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const emailId = React.useId();
  const consentId = React.useId();
  const errorId = React.useId();
  const statusId = React.useId();
  const prefersReducedMotion = useReducedMotion();

  const variantClasses =
    variant === "dark"
      ? "bg-cri-forest/40 backdrop-blur-md border border-cri-gold/20 text-cri-text-on-dark"
      : "bg-cri-parchment border border-cri-moss/30 shadow-soft";

  const inputClasses =
    variant === "dark"
      ? "bg-cri-forest/60 border-cri-gold/30 text-cri-text-on-dark placeholder:text-cri-text-on-dark/50"
      : "bg-white border-cri-moss/30 text-cri-forest placeholder:text-cri-ink-muted/60";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Veuillez saisir une adresse email valide.");
      setState("error");
      return;
    }
    if (!consent) {
      setErrorMessage("Vous devez accepter le traitement de vos données pour vous inscrire.");
      setState("error");
      return;
    }

    setState("submitting");
    // Simulated API call — en prod, POST /api/newsletter/subscribe
    await new Promise((r) => setTimeout(r, 1000));
    setState("success");
    setEmail("");
    setConsent(false);
  };

  return (
    <div className={cn("rounded-2xl p-7", variantClasses, className)}>
      <div className="mb-3 flex items-center gap-2">
        <Mail
          className={cn("h-5 w-5", variant === "dark" ? "text-cri-gold" : "text-cri-cacao")}
          aria-hidden="true"
        />
        <h3
          className={cn(
            "font-serif text-xl font-bold",
            variant === "dark" ? "text-cri-text-on-dark" : "text-cri-forest"
          )}
        >
          {title}
        </h3>
      </div>
      <p
        className={cn(
          "mb-5 text-sm leading-relaxed",
          variant === "dark" ? "text-cri-text-on-dark/80" : "text-cri-ink-muted"
        )}
      >
        {description}
      </p>

      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            role="status"
            id={statusId}
            className="bg-cri-canopy/10 border-cri-canopy/30 flex items-start gap-3 rounded-xl border p-4"
          >
            <CheckCircle2
              className="text-cri-canopy mt-0.5 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-cri-forest font-semibold">Merci pour votre inscription !</p>
              <p className="text-cri-ink-muted mt-1 text-sm">
                Un email de confirmation vient de vous être envoyé. Veuillez cliquer sur le lien
                pour valider votre inscription (double opt-in RGPD).
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
            aria-describedby={state === "error" ? errorId : undefined}
          >
            <div>
              <label htmlFor={emailId} className="sr-only">
                Adresse email
              </label>
              <input
                id={emailId}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder={placeholder}
                required
                aria-invalid={state === "error"}
                aria-describedby={state === "error" ? errorId : undefined}
                className={cn(
                  "h-12 w-full rounded-xl border-2 px-4 text-sm transition-colors",
                  "focus:ring-cri-gold/40 focus:border-cri-gold focus:outline-none focus:ring-2",
                  inputClasses
                )}
                disabled={state === "submitting"}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id={consentId}
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (state === "error") setState("idle");
                }}
                className="border-cri-moss/40 text-cri-cacao focus:ring-cri-gold mt-1 h-4 w-4 rounded focus:ring-2"
                required
                disabled={state === "submitting"}
              />
              <label
                htmlFor={consentId}
                className={cn(
                  "cursor-pointer text-xs leading-relaxed",
                  variant === "dark" ? "text-cri-text-on-dark/80" : "text-cri-ink-muted"
                )}
              >
                J&apos;accepte de recevoir des emails de Cocoa Ranch &amp; Industry. Mes données
                sont traitées conformément à notre{" "}
                <a
                  href="/privacy"
                  className="hover:text-cri-cacao underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  politique de confidentialité
                </a>
                . Désabonnement en un clic.
              </label>
            </div>

            {state === "error" && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                id={errorId}
                className="bg-cri-cacao/10 border-cri-cacao/30 flex items-start gap-2 rounded-lg border p-3"
              >
                <AlertCircle
                  className="text-cri-cacao mt-0.5 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-cri-cacao text-sm">{errorMessage}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className={cn(
                "h-12 w-full rounded-xl text-sm font-semibold",
                "bg-cri-cacao text-cri-text-on-dark",
                "hover:bg-cri-forest transition-colors",
                "focus:ring-cri-gold focus:outline-none focus:ring-2 focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-60",
                "inline-flex items-center justify-center gap-2"
              )}
            >
              {state === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  {ctaLabel}
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsletterForm;
