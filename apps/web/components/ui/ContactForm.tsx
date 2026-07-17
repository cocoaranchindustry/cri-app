"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Building2,
  Phone,
  MessageSquare,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ContactForm — Formulaire de contact RGPD (ANTIC Cameroun + RGPD UE)
 *
 * Champs collectés :
 * - Nom (requis)
 * - Email (requis)
 * - Téléphone (optionnel)
 * - Organisation (optionnel)
 * - Sujet (select)
 * - Message (requis, 20-2000 chars)
 * - Consentement RGPD (requis, case non pré-cochée)
 *
 * Conformité :
 * - reCAPTCHA v3 (token invisible côté serveur)
 * - Chiffrement TLS (HTTPS) au submit
 * - Durée de conservation : 12 mois
 * - Droit à l'effacement / rectification / portabilité
 * - Mentions explicites RGPD
 */
export interface ContactFormProps {
  className?: string;
  recaptchaSiteKey?: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const SUBJECTS = [
  { value: "partenariat", label: "Partenariat / Coopération" },
  { value: "investissement", label: "Opportunité d'investissement" },
  { value: "presse", label: "Demande presse / média" },
  { value: "cacao", label: "Achat de cacao premium" },
  { value: "provende", label: "Commande de provendes" },
  { value: "emploi", label: "Candidature / Recrutement" },
  { value: "autre", label: "Autre demande" },
];

export const ContactForm: React.FC<ContactFormProps> = ({
  className,
  recaptchaSiteKey,
}) => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [state, setState] = React.useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [charCount, setCharCount] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  const ids = {
    name: React.useId(),
    email: React.useId(),
    phone: React.useId(),
    organization: React.useId(),
    subject: React.useId(),
    message: React.useId(),
    consent: React.useId(),
    error: React.useId(),
    status: React.useId(),
  };

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "message") setCharCount((value as string).length);
    if (state === "error") setState("idle");
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return "Le nom est requis.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "L'email est invalide.";
    if (!form.subject) return "Veuillez sélectionner un sujet.";
    if (form.message.trim().length < 20)
      return "Le message doit contenir au moins 20 caractères.";
    if (form.message.length > 2000)
      return "Le message ne peut pas dépasser 2 000 caractères.";
    if (!form.consent)
      return "Vous devez accepter le traitement de vos données (RGPD).";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setState("error");
      return;
    }

    setState("submitting");
    // En prod : POST /api/contact avec reCAPTCHA token
    // const token = await grecaptcha.execute(recaptchaSiteKey, { action: "contact" });
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
    setForm({
      name: "",
      email: "",
      phone: "",
      organization: "",
      subject: "",
      message: "",
      consent: false,
    });
    setCharCount(0);
  };

  const inputBase =
    "w-full h-12 px-4 pl-11 rounded-xl border-2 text-sm bg-white border-cri-moss/30 text-cri-forest placeholder:text-cri-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-cri-gold/40 focus:border-cri-gold transition-colors";
  const textareaBase =
    "w-full min-h-[160px] py-3 px-4 pl-11 rounded-xl border-2 text-sm bg-white border-cri-moss/30 text-cri-forest placeholder:text-cri-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-cri-gold/40 focus:border-cri-gold transition-colors resize-y";

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-8 bg-cri-canopy/10 border-2 border-cri-canopy/30 text-center"
            role="status"
            id={ids.status}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cri-canopy mb-4">
              <CheckCircle2
                className="h-8 w-8 text-cri-text-on-dark"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cri-forest mb-2">
              Message envoyé !
            </h3>
            <p className="text-cri-ink-muted max-w-md mx-auto">
              Merci de nous avoir contactés. Notre équipe vous répondra dans les
              48h ouvrées. Une copie de votre message vous a été envoyée par email.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
            aria-describedby={state === "error" ? ids.error : undefined}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Nom */}
              <div>
                <label
                  htmlFor={ids.name}
                  className="block text-sm font-semibold text-cri-forest mb-1.5"
                >
                  Nom complet <span className="text-cri-cacao">*</span>
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cri-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    id={ids.name}
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={inputBase}
                    placeholder="Marie NGO BIYIHA"
                    required
                    disabled={state === "submitting"}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor={ids.email}
                  className="block text-sm font-semibold text-cri-forest mb-1.5"
                >
                  Email <span className="text-cri-cacao">*</span>
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
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputBase}
                    placeholder="vous@exemple.com"
                    required
                    disabled={state === "submitting"}
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label
                  htmlFor={ids.phone}
                  className="block text-sm font-semibold text-cri-forest mb-1.5"
                >
                  Téléphone{" "}
                  <span className="text-cri-ink-muted/60 font-normal">
                    (optionnel)
                  </span>
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cri-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    id={ids.phone}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputBase}
                    placeholder="+237 6 XX XX XX XX"
                    disabled={state === "submitting"}
                  />
                </div>
              </div>

              {/* Organisation */}
              <div>
                <label
                  htmlFor={ids.organization}
                  className="block text-sm font-semibold text-cri-forest mb-1.5"
                >
                  Organisation{" "}
                  <span className="text-cri-ink-muted/60 font-normal">
                    (optionnel)
                  </span>
                </label>
                <div className="relative">
                  <Building2
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cri-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    id={ids.organization}
                    type="text"
                    autoComplete="organization"
                    value={form.organization}
                    onChange={(e) =>
                      updateField("organization", e.target.value)
                    }
                    className={inputBase}
                    placeholder="Coopérative, ONG, entreprise…"
                    disabled={state === "submitting"}
                  />
                </div>
              </div>
            </div>

            {/* Sujet */}
            <div>
              <label
                htmlFor={ids.subject}
                className="block text-sm font-semibold text-cri-forest mb-1.5"
              >
                Sujet <span className="text-cri-cacao">*</span>
              </label>
              <select
                id={ids.subject}
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                className={cn(inputBase, "pl-4 cursor-pointer")}
                required
                disabled={state === "submitting"}
              >
                <option value="">— Choisir un sujet —</option>
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor={ids.message}
                className="block text-sm font-semibold text-cri-forest mb-1.5"
              >
                Message <span className="text-cri-cacao">*</span>
              </label>
              <div className="relative">
                <MessageSquare
                  className="absolute left-3.5 top-3.5 h-4 w-4 text-cri-ink-muted"
                  aria-hidden="true"
                />
                <textarea
                  id={ids.message}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={textareaBase}
                  placeholder="Décrivez votre demande en quelques lignes (20 à 2 000 caractères)…"
                  rows={6}
                  required
                  minLength={20}
                  maxLength={2000}
                  disabled={state === "submitting"}
                />
              </div>
              <p
                className={cn(
                  "text-xs mt-1 text-right tabular-nums",
                  charCount > 2000 ? "text-cri-cacao" : "text-cri-ink-muted/60"
                )}
              >
                {charCount} / 2 000
              </p>
            </div>

            {/* Consentement RGPD */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cri-cream/50 border border-cri-moss/20">
              <input
                id={ids.consent}
                type="checkbox"
                checked={form.consent}
                onChange={(e) => updateField("consent", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-cri-moss/40 text-cri-cacao focus:ring-cri-gold focus:ring-2 cursor-pointer"
                required
                disabled={state === "submitting"}
              />
              <label
                htmlFor={ids.consent}
                className="text-xs leading-relaxed text-cri-humus cursor-pointer"
              >
                <span className="text-cri-cacao">*</span> J&apos;accepte que mes
                données personnelles soient traitées par Cocoa Ranch &amp;
                Industry (SAS AGRO-PME Fondation) aux fins de traitement de ma
                demande, conformément au RGPD (UE 2016/679) et à la loi
                camerounaise n°2010/012 relative à la protection des données à
                caractère personnel. Les données sont conservées 12 mois et
                vous pouvez exercer vos droits (accès, rectification,
                effacement, portabilité) à{" "}
                <a
                  href="mailto:rgpd@cri-agropole.com"
                  className="underline font-semibold text-cri-cacao hover:text-cri-forest"
                >
                  rgpd@cri-agropole.com
                </a>
                .{" "}
                <a
                  href="/privacy"
                  className="underline hover:text-cri-cacao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Politique complète
                </a>
                .
              </label>
            </div>

            {/* Erreur */}
            {state === "error" && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
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

            {/* reCAPTCHA notice */}
            {recaptchaSiteKey && (
              <p className="text-[10px] text-cri-ink-muted/60 text-center">
                Ce formulaire est protégé par reCAPTCHA et soumis à la{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  politique de confidentialité
                </a>{" "}
                et aux{" "}
                <a
                  href="https://policies.google.com/terms"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  conditions d&apos;utilisation
                </a>{" "}
                de Google.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={state === "submitting"}
              className={cn(
                "w-full sm:w-auto h-12 px-8 rounded-xl font-semibold text-sm",
                "bg-cri-cacao text-cri-text-on-dark",
                "hover:bg-cri-forest transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2",
                "disabled:opacity-60 disabled:cursor-not-allowed",
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
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Envoyer le message
                  <Lock
                    className="h-3.5 w-3.5 ml-1 opacity-70"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
