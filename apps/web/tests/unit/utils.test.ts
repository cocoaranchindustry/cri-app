import { describe, it, expect } from "vitest";
import { cn, formatXAF, truncate } from "@/lib/utils";

describe("lib/utils", () => {
  describe("cn", () => {
    it("merge les classes Tailwind", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("ignore les valeurs falsy", () => {
      expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
    });
  });

  describe("formatXAF", () => {
    it("formate un nombre en FCFA", () => {
      const result = formatXAF(1500000);
      expect(result).toContain("1");
      expect(result).toMatch(/FCFA|XAF/);
    });

    it("gère 0", () => {
      expect(formatXAF(0)).toMatch(/0/);
    });
  });

  describe("truncate", () => {
    it("tronque si > max (max=10 → 'Bonjour...')", () => {
      // "Bonjour le monde" = 16 chars ; max=10 → slice(0, 7) + "..." = "Bonjour..." (10 chars)
      expect(truncate("Bonjour le monde", 10)).toBe("Bonjour...");
    });

    it("conserve si <= max", () => {
      expect(truncate("Court", 10)).toBe("Court");
    });

    it("tronque en gardant l'ellipse (max=11 → 'Bonjour ...')", () => {
      // max=11 → slice(0, 8) = "Bonjour " (8 chars avec espace) + "..." = "Bonjour ..." (11 chars)
      expect(truncate("Bonjour le monde", 11)).toBe("Bonjour ...");
    });

    it("ne tronque pas si la longueur est exactement à la limite", () => {
      expect(truncate("1234567890", 10)).toBe("1234567890");
    });

    it("tronque un texte long", () => {
      // "Hello world" (11) > max=8 → slice(0, 5) + "..." = "Hello..."
      expect(truncate("Hello world", 8)).toBe("Hello...");
    });
  });
});
