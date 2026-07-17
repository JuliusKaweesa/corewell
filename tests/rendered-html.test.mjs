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
  assert.match(html, /MSK Uganda/);
  assert.match(html, /A Uganda that/);
  assert.match(html, /moves without pain/);
  assert.match(html, /Book a free Workforce Assessment/);
  assert.match(html, /href="\/contact#corporate-enquiries"[^>]*>Book a free Workforce Assessment/);
  assert.match(html, /office &amp; manual workers/);
  assert.match(html, /MSK is the leading cause of workplace absence globally/);
  assert.match(html, /href="\/services#corewell-corporate"[^>]*>Learn more/);
  assert.match(html, /href="\/services#spine-specialist-clinic"[^>]*>Learn more/);
  assert.match(html, /href="\/services#corewell-performance"[^>]*>Learn more/);
  assert.match(html, /Any company can offer wellness programmes/);
  assert.match(html, /Pioneer Positioning/);
  assert.match(html, /Integrated Model/);
  assert.match(html, /Built From Clinical Observation/);
  assert.match(html, /A fitness or wellness programme/);
  assert.match(html, /A CoreWell clinical programme/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("server-renders article routes through the Netlify adapter", async () => {
  const response = await render("/articles/why-your-lower-back-hurts-at-your-desk");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Why Your Lower Back Hurts After a Long Day at Your Desk/);
  assert.match(html, /Back to Articles/);
  assert.match(html, /Need a personal assessment/);
});

test("server-renders the specialist services page", async () => {
  const response = await render("/services");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Our specialist divisions/);
  assert.match(html, /CoreWell Corporate/);
  assert.match(html, /CoreWell Spine Specialist Clinic/);
  assert.match(html, /CoreWell Performance/);
  assert.match(html, /Request Free Workplace Assessment/);
  assert.match(html, /Book A Consultation/);
  assert.match(html, /Book a Golf Physio Session/);
  assert.match(html, /id="corewell-corporate"/);
  assert.match(html, /id="spine-specialist-clinic"/);
  assert.match(html, /id="corewell-performance"/);
});

test("server-renders the Team advisory panel", async () => {
  const response = await render("/team");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Clinical Advisory and Implementation Panel/);
  assert.match(html, /physiotherapy, medicine, and orthopaedics/);
  assert.match(html, /Julius Kaweesa/);
  assert.match(html, /Clinical lead and Co-founder CoreWell Uganda/);
  assert.match(html, /Emmanuel Kajwiga/);
  assert.match(html, /Clinician and Cofounder, CoreWell Uganda/);
  assert.match(html, /Meet Our Team/);
  assert.doesNotMatch(html, /Clinicians first\. Business builders second\./);
});
