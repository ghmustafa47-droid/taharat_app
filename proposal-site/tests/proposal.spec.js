const { test, expect } = require('@playwright/test');

test('a shared Urdu section opens below the header and keeps its place when language changes', async ({ page }) => {
  await page.goto('./?view=proposal&lang=ur#offline');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  const sectionTop = () => page.locator('#offline').evaluate(element => element.getBoundingClientRect().top);
  await expect.poll(sectionTop).toBeLessThan(150);
  expect(await sectionTop()).toBeGreaterThan(65);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page).toHaveURL(/lang=en#offline$/);
  await expect.poll(sectionTop).toBeLessThan(150);
});

test('overview, gallery and sample question work in the exported site', async ({ page }) => {
  await page.goto('./');
  await expect.poll(() => page.locator('.hero-art img').evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
  await page.getByRole('link', { name: 'Read the full proposal', exact: true }).click();
  await page.getByRole('link', { name: 'Wudu example', exact: true }).click();
  const lesson = page.locator('#worked-lesson');
  await lesson.getByRole('button', { name: 'The wrist', exact: true }).click();
  await expect(lesson.getByRole('status')).toContainText('Try again');
  await lesson.getByRole('button', { name: 'The elbow', exact: true }).click();
  await expect(lesson.getByRole('status')).toContainText('Correct');
  await page.getByRole('link', { name: 'Mockups and videos', exact: true }).click();
  await page.getByRole('button', { name: 'Child path', exact: true }).click();
  const gallery = page.getByRole('dialog', { name: 'Mobile app mockups' });
  await expect(gallery).toBeVisible();
  await expect.poll(() => gallery.locator('img').evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
  await gallery.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(gallery.locator('figcaption')).toContainText('Parent path');
  await gallery.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(gallery).toBeHidden();
});

test('local fonts, walkthroughs and both caption sets are served without scans', async ({ page, request, baseURL }) => {
  await page.goto('./?view=proposal&lang=ur');
  const local = path => new URL(path, baseURL).href;
  const stylesheet = await request.get(local('fonts/urdu.css'));
  expect(stylesheet.ok()).toBe(true);
  expect(await stylesheet.text()).toContain('Noto Nastaliq Urdu');
  for (const font of ['NotoNastaliqUrdu', 'NotoNaskhArabic']) {
    expect((await request.head(local('fonts/' + font + '.ttf'))).ok()).toBe(true);
  }
  for (const video of ['mobile', 'cms', 'client-walkthrough', 'promo']) {
    expect((await request.head(local('media/' + video + '.mp4'))).ok()).toBe(true);
    for (const suffix of ['', '-en']) {
      const captions = await request.get(local('media/' + video + suffix + '.vtt'));
      expect(captions.ok()).toBe(true);
      expect(await captions.text()).toMatch(/^WEBVTT[\s\S]+ --> /);
    }
  }
  await expect(page.locator('.proposal-originals')).toContainText('نجی جائزے');
  expect((await request.get(local('manuscript/SRC-001.jpg'))).status()).toBe(404);
});
