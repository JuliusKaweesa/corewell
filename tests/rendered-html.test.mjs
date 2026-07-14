import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const serverUrl = new URL(
    "../.netlify/functions-internal/server/main.mjs",
    import.meta.url,
  );
  serverUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: handler } = await import(serverUrl.href);

  return handler(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
  );
}

test("server-renders the CoreWell home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>CoreWell Uganda[^<]*<\/title>/i);
  assert.match(html, /Expert Physiotherapy/);
  assert.match(html, /Stronger You/);
  assert.match(html, /Book an Appointment/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("server-renders article routes through the Netlify adapter", async () => {
  const response = await render("/articles/manage-back-pain-at-work");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /How to Manage Back Pain at Work/);
  assert.match(html, /Back to Articles/);
  assert.match(html, /Need a personal assessment/);
});
