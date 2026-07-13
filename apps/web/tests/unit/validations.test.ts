/**
 * Tests des helpers de validation géométrique
 * (équivalent serveur des validations Firestore Rules)
 */

import { describe, it, expect } from "vitest";
import { isValidCoordinate, isValidEmail, isValidCameroonPhone } from "@/lib/utils";

describe("lib/utils - validations", () => {
  describe("isValidCoordinate", () => {
    it("valide une coordonnée au Cameroun (6 décimales)", () => {
      const result = isValidCoordinate(4.583333, 9.750000);
      expect(result.valid).toBe(true);
      expect(result.precision).toBe(6);
    });

    it("rejette une latitude hors limites", () => {
      const result = isValidCoordinate(100, 10);
      expect(result.valid).toBe(false);
    });

    it("rejette une longitude hors limites", () => {
      const result = isValidCoordinate(10, 200);
      expect(result.valid).toBe(false);
    });

    it("détecte la précision (3 décimales)", () => {
      const result = isValidCoordinate(4.583, 9.750);
      expect(result.precision).toBe(3);
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
