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
    it("tronque si > max", () => {
      expect(truncate("Bonjour le monde", 10)).toBe("Bonjour ...");
    });

    it("conserve si <= max", () => {
      expect(truncate("Court", 10)).toBe("Court");
    });
  });
});
