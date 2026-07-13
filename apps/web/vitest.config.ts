/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "dist", "tests/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "node_modules/",
        ".next/",
        "tests/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@/components": path.resolve(__dirname, "components"),
      "@/features": path.resolve(__dirname, "features"),
      "@/lib": path.resolve(__dirname, "lib"),
      "@/firebase": path.resolve(__dirname, "firebase"),
      "@/i18n": path.resolve(__dirname, "i18n"),
      "@/types": path.resolve(__dirname, "types"),
      "@/hooks": path.resolve(__dirname, "hooks"),
    },
  },
});
