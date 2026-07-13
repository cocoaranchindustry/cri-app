import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Portail Public
 */

test.describe("Portail public", () => {
  test("la page d'accueil s'affiche correctement", async ({ page }) => {
    await page.goto("/");

    // Vérifier le titre
    await expect(page).toHaveTitle(/Cocoa Ranch/);

    // Vérifier le H1
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();

    // Vérifier les KPIs
    await expect(page.getByText(/Producteurs accompagnés/)).toBeVisible();
    await expect(page.getByText(/Hectares/)).toBeVisible();

    // Vérifier la navigation
    await expect(page.getByRole("navigation")).toBeVisible();

    // Vérifier le footer
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("les liens de navigation fonctionnent", async ({ page }) => {
    await page.goto("/");

    // Cliquer sur un lien du menu
    const projectLink = page.getByRole("link", { name: /projet/i }).first();
    if (await projectLink.isVisible()) {
      await projectLink.click();
      await expect(page).toHaveURL(/projet/);
    }
  });
});

test.describe("Accessibilité", () => {
  test("la page d'accueil passe les vérifications de base", async ({ page }) => {
    await page.goto("/");

    // Vérifier qu'il n'y a pas d'erreur de console critique
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.waitForLoadState("networkidle");

    // Vérifier le contraste minimal (skip : nécessite une lib)
    // Vérifier la navigation au clavier
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeTruthy();

    // Pas d'erreur JS critique
    expect(errors).toHaveLength(0);
  });
});
