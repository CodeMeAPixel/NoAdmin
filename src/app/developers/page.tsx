import type { Metadata } from "next";
import Link from "next/link";
import {
  ButtonLink,
  Callout,
  Card,
  CodeBlock,
  Container,
  PageHeader,
  SectionTitle,
} from "@/components/ui/primitives";
import { buildResult, MAX_BATCH } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "NoAdmin API",
  description:
    "A free JSON API for Discord bot lists, dashboards and CI. Check whether an invite link requests Administrator and get a full permission report.",
  path: "/developers",
});

const EXAMPLE_INVITE =
  "https://discord.com/oauth2/authorize?client_id=1234567890123456789&permissions=8&scope=bot";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/analyze?input=",
    text: "Analyze one invite link or permission value.",
  },
  {
    method: "POST",
    path: "/api/v1/analyze",
    text: `Send {"input": "..."} for one, or {"inputs": [...]} for up to ${MAX_BATCH}.`,
  },
  {
    method: "GET",
    path: "/api/v1/permissions",
    text: "Every Discord permission with its bit, value and risk level.",
  },
  {
    method: "GET",
    path: "/api/v1/openapi.json",
    text: "OpenAPI 3.1 spec for generating a client.",
  },
  {
    method: "GET",
    path: "/api/badge?invite=",
    text: "An SVG badge for a README or listing page.",
  },
];

const FIELDS = [
  {
    name: "valid",
    text: "False when the input is not a permission number or a discord.com invite link. The error field says why.",
  },
  {
    name: "administrator",
    text: "True when the invite requests Administrator. Check this field to block admin invites.",
  },
  {
    name: "verdict",
    text: "none, minimal, reasonable, broad, excessive or administrator. Use it for softer warnings.",
  },
  {
    name: "permissions",
    text: "The permission integer as a string. It can be larger than a JavaScript number can hold exactly.",
  },
  {
    name: "granted",
    text: "Each requested permission with its risk and a link to its reference page.",
  },
  {
    name: "report_url",
    text: "A page that explains the result. Link to it from your rejection message.",
  },
];

const CURL = `curl "${SITE_URL}/api/v1/analyze?input=${encodeURIComponent(EXAMPLE_INVITE)}"`;

const TS = `const res = await fetch("${SITE_URL}/api/v1/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input: bot.invite }),
});
const report = await res.json();

if (report.valid && report.administrator) {
  throw new Error(
    \`This invite requests Administrator. See \${report.report_url}\`,
  );
}`;

const GO = `var report struct {
	Valid         bool   \`json:"valid"\`
	Administrator bool   \`json:"administrator"\`
	ReportURL     string \`json:"report_url"\`
}

q := url.Values{"input": {invite}}
resp, err := http.Get("${SITE_URL}/api/v1/analyze?" + q.Encode())
if err != nil {
	return err
}
defer resp.Body.Close()
if err := json.NewDecoder(resp.Body).Decode(&report); err != nil {
	return err
}
if report.Valid && report.Administrator {
	return fmt.Errorf("invite requests Administrator, see %s", report.ReportURL)
}`;

const LOCAL = `const ADMINISTRATOR = BigInt(8);

function requestsAdmin(invite: string): boolean {
  const url = new URL(invite);
  const perms = url.searchParams.get("permissions");
  return perms !== null && /^\\d+$/.test(perms)
    && (BigInt(perms) & ADMINISTRATOR) === ADMINISTRATOR;
}`;

export default function DevelopersPage() {
  const example = JSON.stringify(buildResult(EXAMPLE_INVITE), null, 2);

  return (
    <Container width="md" className="pb-20">
      <PageHeader
        eyebrow="API"
        title="Check invite links from your own site"
        description="Bot lists, dashboards and CI jobs can use the NoAdmin API to find out what an invite link asks for. It is free, needs no key, and stores nothing."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/api/v1/openapi.json" icon="code" external>
            OpenAPI spec
          </ButtonLink>
          <ButtonLink href="/analyze" variant="secondary">
            Try the analyzer
          </ButtonLink>
        </div>
      </PageHeader>

      <section>
        <SectionTitle>Endpoints</SectionTitle>
        <Card className="divide-y divide-white/[0.05] overflow-hidden">
          {ENDPOINTS.map((e) => (
            <div
              key={`${e.method} ${e.path}`}
              className="flex flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 sm:px-5"
            >
              <code className="shrink-0 font-mono text-[13px] text-white">
                <span className="mr-2 text-zinc-500">{e.method}</span>
                {e.path}
              </code>
              <span className="min-w-0 text-sm text-zinc-400">{e.text}</span>
            </div>
          ))}
        </Card>
        <p className="mt-3 text-sm text-zinc-400">
          Every endpoint allows cross-origin requests, so you can call it from a
          browser. GET responses are cached for an hour.
        </p>
      </section>

      <section className="mt-10">
        <SectionTitle>Blocking Administrator on a bot list</SectionTitle>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-300">
            Run the check when a bot is submitted and when its invite link
            changes. If{" "}
            <code className="font-mono text-white">administrator</code> is true,
            reject the submission and link the developer to{" "}
            <code className="font-mono text-white">report_url</code>, which
            shows what the bot asked for and what to request instead.
          </p>
          <CodeBlock label="TypeScript" code={TS} />
          <CodeBlock label="Go" code={GO} />
          <CodeBlock label="curl" code={CURL} />
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle>Response fields</SectionTitle>
        <Card className="divide-y divide-white/[0.05] overflow-hidden">
          {FIELDS.map((f) => (
            <div
              key={f.name}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-4 sm:px-5"
            >
              <code className="w-32 shrink-0 font-mono text-[13px] text-white">
                {f.name}
              </code>
              <span className="min-w-0 text-sm text-zinc-400">{f.text}</span>
            </div>
          ))}
        </Card>
        <div className="mt-4">
          <CodeBlock label="Example response" code={example} />
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <SectionTitle>Checking without the API</SectionTitle>
        <p className="text-sm leading-relaxed text-zinc-300">
          If you only need the Administrator check, you can do it yourself with
          no network call. Administrator is bit 3, value 8. Use BigInt or a
          64-bit integer, because permission values do not fit in a JavaScript
          number. The{" "}
          <Link
            href="/guides/permission-bitfields"
            className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
          >
            bitfield guide
          </Link>{" "}
          explains why.
        </p>
        <CodeBlock label="TypeScript" code={LOCAL} />
        <Callout tone="info" title="Custom invite links">
          Some bots use their own domain for invites, which redirects to
          Discord. The API can only read discord.com links, and returns{" "}
          <code className="font-mono">valid: false</code> for anything else.
          Decide whether your list accepts those links, or asks for the
          discord.com link directly.
        </Callout>
      </section>
    </Container>
  );
}
