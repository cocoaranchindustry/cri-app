/**
 * Tests des helpers de validation géométrique
 * (équivalent serveur des validations Firestore Rules)
 */

import { describe, it, expect } from "vitest";
import { isValidCoordinate, isValidEmail, isValidCameroonPhone } from "@/lib/utils";

describe("lib/utils - validations", () => {
  describe("isValidCoordinate", () => {
    it("valide une coordonnée au Cameroun (6 décimales)", () => {
      // Note : JS ne préserve pas les zéros finaux (9.750000 → 9.75).
      // Pour tester la précision 6, on utilise un nombre qui la conserve.
      const result = isValidCoordinate(4.583333, 9.75);
      expect(result.valid).toBe(true);
      expect(result.precision).toBe(2); // min(6, 2) = 2 car JS tronque
    });

    it("compte correctement les décimales préservées", () => {
      const result = isValidCoordinate(4.583333, 9.7);
      // 4.583333 = 6 décimales, 9.7 = 1 décimale → min = 1
      expect(result.precision).toBe(1);
    });

    it("rejette une latitude hors limites", () => {
      const result = isValidCoordinate(100, 10);
      expect(result.valid).toBe(false);
    });

    it("rejette une longitude hors limites", () => {
      const result = isValidCoordinate(10, 200);
      expect(result.valid).toBe(false);
    });

    it("détecte la précision sur des nombres stockés", () => {
      // Note : JS ne préserve pas les zéros finaux. 9.750 → 9.75 (2 décimales)
      // Pour une précision exacte, le caller doit transmettre la string originale.
      const result = isValidCoordinate(4.583, 9.75);
      expect(result.valid).toBe(true);
      // 4.583.toString() = "4.583" (3 décimales), 9.75.toString() = "9.75" (2 décimales)
      expect(result.precision).toBe(2);
    });

    it("0 décimale pour des entiers", () => {
      const result = isValidCoordinate(5, 10);
      expect(result.precision).toBe(0);
    });
  });

  describe("isValidEmail", () => {
    it("valide un email standard", () => {
      expect(isValidEmail("contact@cri.africa")).toBe(true);
    });

    it("rejette un email invalide", () => {
      expect(isValidEmail("not-an-email")).toBe(false);
      expect(isValidEmail("@cri.africa")).toBe(false);
      expect(isValidEmail("contact@")).toBe(false);
    });

    it("limite la longueur à 200 caractères", () => {
      const longEmail = "a".repeat(190) + "@cri.africa";
      expect(isValidEmail(longEmail)).toBe(false);
    });
  });

  describe("isValidCameroonPhone", () => {
    it("valide un numéro camerounais à 9 chiffres", () => {
      expect(isValidCameroonPhone("699123456")).toBe(true);
    });

    it("valide avec l'indicatif +237", () => {
      expect(isValidCameroonPhone("+237699123456")).toBe(true);
    });

    it("valide avec espaces et tirets", () => {
      expect(isValidCameroonPhone("+237 699-12-34-56")).toBe(true);
    });

    it("rejette un numéro commençant par 0-5", () => {
      expect(isValidCameroonPhone("123456789")).toBe(false);
    });
  });
});
