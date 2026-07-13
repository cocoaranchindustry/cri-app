"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  type User,
  type IdTokenResult,
} from "firebase/auth";
import { auth } from "@/firebase/client";

export type UserRole =
  | "public"
  | "admin"
  | "manager"
  | "enqueteur"
  | "supervisor"
  | "investor";

export interface AuthState {
  user: User | null;
  role: UserRole;
  loading: boolean;
  token: IdTokenResult | null;
}

/**
 * Hook useAuth — état d'authentification Firebase + rôle
 *
 * Le rôle est lu depuis les custom claims (RBAC).
 * Source de vérité côté serveur : Firestore Security Rules.
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<IdTokenResult | null>(null);
  const [role, setRole] = useState<UserRole>("public");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const t = await u.getIdTokenResult(true);
          setToken(t);
          setRole((t.claims.role as UserRole) ?? "public");
        } catch (err) {
          console.error("useAuth: getIdTokenResult failed", err);
          setRole("public");
        }
      } else {
        setToken(null);
        setRole("public");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, role, loading, token };
}
