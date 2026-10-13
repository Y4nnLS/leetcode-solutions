import { expect, test } from '@playwright/test';

test('search and visualizer are available', async ({ page }) => {
  await page.goto('/leetcode-solutions/');
  await page.getByLabel('Buscar no catálogo').fill('unshift');
  await page.getByRole('link', { name: /Estudar/ }).first().click();
  await expect(page.getByRole('heading', { name: 'unshift' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Visualizador passo a passo' })).toBeVisible();
});
