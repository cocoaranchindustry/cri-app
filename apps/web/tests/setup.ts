import "@testing-library/jest-dom/vitest";

// Mock Firebase pour les tests
import { vi } from "vitest";

vi.mock("@/firebase/client", () => ({
  auth: { currentUser: null },
  db: {},
  storage: {},
  analytics: null,
}));

vi.mock("@/firebase/admin", () => ({
  adminAuth: { verifySessionCookie: vi.fn() },
  adminDb: {},
  adminStorage: {},
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));
