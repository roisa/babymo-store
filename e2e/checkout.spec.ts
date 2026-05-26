import { expect, test } from "@playwright/test";

/**
 * End-to-end smoke test of the golden checkout path.
 * Walks: home → product → add to cart → cart drawer → checkout →
 * fill delivery details → land on payment page.
 *
 * Doesn't assert WhatsApp opens (that depends on a click handler that
 * window.opens a wa.me link — we let it happen and only check we
 * arrived on /payment/<orderId>).
 */
test("happy path: browse, add to cart, checkout, see QRIS page", async ({
  page,
  context,
}) => {
  // Hide noisy popups that the wa.me window.open() would trigger
  context.on("page", (popup) => popup.close().catch(() => {}));

  // 1. Homepage loads
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // 2. Navigate to /products via the shop link (desktop nav)
  await page.goto("/products");
  await expect(
    page.getByRole("heading", { name: /rak lengkap|our full shelf/i }),
  ).toBeVisible();

  // 3. Open a product detail page
  await page.goto("/products/tiny-brave-steps");
  await expect(
    page.getByRole("heading", { name: "Tiny Brave Steps" }),
  ).toBeVisible();

  // 4. Add to bag (use the visible CTA; works on desktop or mobile)
  const addButton = page
    .getByRole("button", { name: /masukkan keranjang|add to bag/i })
    .first();
  await addButton.click();

  // 5. Head to checkout
  await page.goto("/checkout");
  await expect(
    page.getByRole("heading", { name: /tinggal beberapa|just a few/i }),
  ).toBeVisible();

  // 6. Fill the form
  await page.getByPlaceholder(/maria putri/i).fill("Test Customer");
  await page.getByPlaceholder(/08123456789/i).fill("081234567890");
  await page
    .getByPlaceholder(/jl\. melati/i)
    .fill("Jl. Smoke Test No. 1, RT 01/RW 02");
  await page.getByPlaceholder(/bandung/i).fill("Jakarta");
  await page.getByPlaceholder(/40115/i).fill("12345");

  // 7. Click "Checkout via WhatsApp" — pops WhatsApp + routes to /payment/<id>
  await page.getByRole("button", { name: /checkout via whatsapp/i }).click();

  // 8. We should arrive on the payment page (URL pattern)
  await page.waitForURL(/\/payment\/BM\d+/, { timeout: 8000 });
  await expect(
    page.getByRole("heading", { name: /hampir selesai|almost there/i }),
  ).toBeVisible();
});

test("SEO surfaces respond with expected status", async ({ request }) => {
  for (const path of [
    "/sitemap.xml",
    "/robots.txt",
    "/products/tiny-brave-steps/opengraph-image",
    "/opengraph-image",
  ]) {
    const res = await request.get(path);
    expect(res.ok(), `${path} → ${res.status()}`).toBeTruthy();
  }
});

test("rate-limit kicks in after rapid POSTs to /api/orders", async ({
  request,
}) => {
  const body = (i: number) => ({
    order_id: `BM-TEST-${Date.now()}-${i}`,
    customer_name: "Bot",
    whatsapp: "62000000",
    address: "x",
    city: "x",
    postal_code: "00000",
    items: [],
    subtotal: 0,
    unique_code: 0,
    total_payment: 0,
    payment_status: "pending",
    order_status: "pending_payment",
    created_at: new Date().toISOString(),
  });

  // Fire 7 POSTs quickly: with the 5/min limit the 6th and 7th should 429
  const codes: number[] = [];
  for (let i = 0; i < 7; i++) {
    const res = await request.post("/api/orders", { data: body(i) });
    codes.push(res.status());
  }
  expect(codes.filter((c) => c === 429).length).toBeGreaterThanOrEqual(2);
});
