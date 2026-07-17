"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  Shield,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * InvestorLoginForm — Authentification investisseurs (KYC data room)
 *
 * Flow simplifié :
 * 1. Email + mot de passe (Firebase Auth)
 * 2. Lien magique optionnel (Magic Link par email)
 * 3. Redirection vers l'espace data room (/investisseurs/data-room)
 *
 * Sécurité :
 * - Rate limiting côté serveur (Cloud Function)
 * - 2FA TOTP activé en post-login
 * - Session cookie httpOnly secure
 * - Logs d'audit
 */
export interface InvestorLoginFormProps {
  className?: string;
  onMagicLink?: (email: string) => Promise<void>;
  onPasswordLogin?: (email: string, password: string) => Promise<void>;
}

type SubmitState = "idle" | "submitting" | "success" | "error";
type AuthMode = "password" | "magic-link";

export const InvestorLoginForm: React.FC<InvestorLoginFormProps> = ({
  className,
  onMagicLink,
  onPasswordLogin,
}) => {
  const [mode, setMode] = React.useState<AuthMode>("password");
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [state, setState] = React.useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const prefersReducedMotion = useReducedMotion();

  const ids = {
    email: React.useId(),
    password: React.useId(),
    error: React.useId(),
    status: React.useId(),
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Veuillez saisir une adresse email valide.");
      setState("error");
      return;
    }
    if (mode === "password" && password.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      setState("error");
      return;
    }

    setState("submitting");
    try {
      if (mode === "password") {
        if (onPasswordLogin) {
          await onPasswordLogin(email, password);
        } else {
          // Simulation — en prod : signInWithEmailAndPassword
          await new Promise((r) => setTimeout(r, 1200));
        }
        setState("success");
      } else {
        if (onMagicLink) {
          await onMagicLink(email);
        } else {
          await new Promise((r) => setTimeout(r, 1200));
        }
        setState("success");
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
      setState("error");
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl p-8",
        "bg-cri-parchment border-2 border-cri-moss/30 shadow-soft",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            role="status"
            id={ids.status}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cri-gold/15 mb-4">
              <Mail
                className="h-8 w-8 text-cri-cacao"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cri-forest mb-2">
              {mode === "magic-link"
                ? "Lien magique envoyé"
                : "Connexion réussie"}
            </h3>
            <p className="text-cri-ink-muted text-sm">
              {mode === "magic-link" ? (
                <>
                  Un lien sécurisé a été envoyé à{" "}
                  <strong className="text-cri-forest">{email}</strong>.
                  Cliquez dessus pour accéder à votre data room. Le lien expire
                  dans 15 minutes.
                </>
              ) : (
                "Redirection vers votre espace data room…"
              )}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <Shield
                className="h-5 w-5 text-cri-cacao"
                aria-hidden="true"
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-cri-cacao">
                Espace sécurisé
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-cri-forest mb-1">
              Connexion investisseur
            </h2>
            <p className="text-sm text-cri-ink-muted mb-6">
              Accédez à votre data room personnelle (KYC, documents financiers,
              rapports d&apos;avancement).
            </p>

            {/* Mode toggle */}
            <div
              role="tablist"
              aria-label="Mode d'authentification"
              className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-cri-cream border border-cri-moss/20 mb-6"
            >
              {(
                [
                  { value: "password", label: "Mot de passe" },
                  { value: "magic-link", label: "Lien magique" },
                ] as { value: AuthMode; label: string }[]
              ).map((m) => (
                <button
                  key={m.value}
                  type="button"
                  role="tab"
                  aria-selected={mode === m.value}
                  onClick={() => {
                    setMode(m.value);
                    setState("idle");
                    setErrorMessage("");
                  }}
                  className={cn(
                    "h-9 rounded-lg text-xs font-semibold transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-cri-gold",
                    mode === m.value
                      ? "bg-cri-parchment text-cri-forest shadow-soft"
                      : "text-cri-ink-muted hover:text-cri-forest"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
              aria-describedby={state === "error" ? ids.error : undefined}
            >
              {/* Email */}
              <div>
                <label
                  htmlFor={ids.email}
                  className="block text-sm font-semibold text-cri-forest mb-1.5"
                >
                  Email investisseur
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cri-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    id={ids.email}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    className="w-full h-12 px-4 pl-11 rounded-xl border-2 text-sm bg-white border-cri-moss/30 text-cri-forest placeholder:text-cri-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-cri-gold/40 focus:border-cri-gold transition-colors"
                    placeholder="vous@exemple.com"
                    required
                    disabled={state === "submitting"}
                  />
                </div>
              </div>

              {/* Password (mode password uniquement) */}
              {mode === "password" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={ids.password}
                      className="block text-sm font-semibold text-cri-forest"
                    >
                      Mot de passe
                    </label>
                    <a
                      href="/investisseurs/reset"
                      className="text-xs text-cri-cacao hover:text-cri-forest underline"
                    >
                      Oublié ?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cri-ink-muted"
                      aria-hidden="true"
                    />
                    <input
                      id={ids.password}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      className="w-full h-12 px-12 rounded-xl border-2 text-sm bg-white border-cri-moss/30 text-cri-forest placeholder:text-cri-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-cri-gold/40 focus:border-cri-gold transition-colors"
                      placeholder="••••••••"
                      required
                      minLength={8}
                      disabled={state === "submitting"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cri-ink-muted hover:text-cri-forest"
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Erreur */}
              {state === "error" && (
                <motion.div
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: -4 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  id={ids.error}
                  className="flex items-start gap-2 p-3 rounded-lg bg-cri-cacao/10 border border-cri-cacao/30"
                >
                  <AlertCircle
                    className="h-4 w-4 text-cri-cacao flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-cri-cacao">{errorMessage}</p>
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={state === "submitting"}
                className={cn(
                  "w-full h-12 rounded-xl font-semibold text-sm",
                  "bg-cri-cacao text-cri-text-on-dark",
                  "hover:bg-cri-forest transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                  "inline-flex items-center justify-center gap-2"
                )}
              >
                {state === "submitting" ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    {mode === "magic-link" ? "Envoi du lien…" : "Connexion…"}
                  </>
                ) : mode === "magic-link" ? (
                  <>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Recevoir le lien magique
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Se connecter
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="mt-6 text-xs text-cri-ink-muted/70 text-center">
              Pas encore investisseur ?{" "}
              <a
                href="/investisseurs/kyc"
                className="text-cri-cacao hover:text-cri-forest font-semibold inline-flex items-center gap-1"
              >
                Ouvrir un compte KYC
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvestorLoginForm;
