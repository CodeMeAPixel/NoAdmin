import { buildResult, json, MAX_BATCH, preflight } from "@/lib/api";

const INPUT_PARAMS = ["input", "invite", "permissions", "p"];

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const key = INPUT_PARAMS.find((k) => params.has(k));
  const result = buildResult(key ? (params.get(key) ?? "") : "");
  return json(result, result.valid ? 200 : 400);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "The request body must be JSON." }, 400);
  }
  if (!body || typeof body !== "object")
    return json({ error: "The request body must be a JSON object." }, 400);

  const record = body as Record<string, unknown>;
  if ("inputs" in record) {
    const inputs = record.inputs;
    if (!Array.isArray(inputs) || !inputs.every((i) => typeof i === "string"))
      return json({ error: "inputs must be an array of strings." }, 400);
    if (inputs.length === 0 || inputs.length > MAX_BATCH)
      return json(
        { error: `inputs must contain between 1 and ${MAX_BATCH} items.` },
        400,
      );
    return json({ results: inputs.map(buildResult) }, 200, "no-store");
  }

  const key = INPUT_PARAMS.find((k) => typeof record[k] === "string");
  const result = buildResult(key ? (record[key] as string) : "");
  return json(result, result.valid ? 200 : 400, "no-store");
}

export const OPTIONS = preflight;
