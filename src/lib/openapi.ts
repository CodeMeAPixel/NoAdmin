import { MAX_BATCH } from "./api";
import { SITE_URL } from "./site";

const risk = { type: "string", enum: ["low", "medium", "high", "critical"] };

const inputDescription =
  "A Discord bot invite link (discord.com/oauth2/authorize) or a permission integer, decimal or 0x hex.";

export const OPENAPI = {
  openapi: "3.1.0",
  info: {
    title: "NoAdmin API",
    version: "1.0.0",
    summary: "Check what a Discord bot invite link asks for.",
    description:
      "Free, unauthenticated API for bot lists, dashboards and CI. Every response is computed from the invite link or permission value you send, and nothing is stored. Permission values are returned as strings because they do not fit in a 53-bit number.",
    license: {
      name: "AGPL-3.0-or-later",
      identifier: "AGPL-3.0-or-later",
    },
  },
  servers: [{ url: SITE_URL }],
  paths: {
    "/api/v1/analyze": {
      get: {
        operationId: "analyzeGet",
        summary: "Analyze an invite link or permission value",
        parameters: [
          {
            name: "input",
            in: "query",
            description: `${inputDescription} The aliases invite, permissions and p are also accepted.`,
            schema: { type: "string", maxLength: 4096 },
            example:
              "https://discord.com/oauth2/authorize?client_id=1234567890123456789&permissions=8&scope=bot",
          },
        ],
        responses: {
          "200": {
            description: "The analysis.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Report" },
              },
            },
          },
          "400": {
            description: "The input could not be read.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Invalid" },
              },
            },
          },
        },
      },
      post: {
        operationId: "analyzePost",
        summary: "Analyze one input, or up to 50 in a batch",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  {
                    type: "object",
                    required: ["input"],
                    properties: {
                      input: { type: "string", description: inputDescription },
                    },
                  },
                  {
                    type: "object",
                    required: ["inputs"],
                    properties: {
                      inputs: {
                        type: "array",
                        minItems: 1,
                        maxItems: MAX_BATCH,
                        items: { type: "string" },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        responses: {
          "200": {
            description:
              "A single analysis, or for a batch, one result per input in the same order. Batch results that could not be read have valid set to false.",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/Report" },
                    {
                      type: "object",
                      required: ["results"],
                      properties: {
                        results: {
                          type: "array",
                          items: {
                            oneOf: [
                              { $ref: "#/components/schemas/Report" },
                              { $ref: "#/components/schemas/Invalid" },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          "400": {
            description: "The body or input could not be read.",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/Invalid" },
                    { $ref: "#/components/schemas/Error" },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/permissions": {
      get: {
        operationId: "listPermissions",
        summary: "Every Discord permission with its risk level",
        responses: {
          "200": {
            description: "The permission catalog.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["permissions"],
                  properties: {
                    permissions: {
                      type: "array",
                      items: {
                        allOf: [
                          { $ref: "#/components/schemas/Permission" },
                          {
                            type: "object",
                            properties: {
                              summary: { type: "string" },
                              category: { type: "string" },
                              channels: {
                                type: "array",
                                items: {
                                  type: "string",
                                  enum: ["text", "voice", "stage"],
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/badge": {
      get: {
        operationId: "badge",
        summary: "SVG badge for a README or listing",
        parameters: [
          {
            name: "invite",
            in: "query",
            description: `${inputDescription} The aliases permissions and p are also accepted.`,
            schema: { type: "string" },
          },
          {
            name: "label",
            in: "query",
            schema: { type: "string", maxLength: 32, default: "noadmin" },
          },
          {
            name: "detail",
            in: "query",
            description: "Set to 1 to include the permission count.",
            schema: { type: "string", enum: ["1"] },
          },
        ],
        responses: {
          "200": {
            description: "The badge.",
            content: { "image/svg+xml": { schema: { type: "string" } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Permission: {
        type: "object",
        required: [
          "key",
          "name",
          "bit",
          "value",
          "risk",
          "requires_2fa",
          "url",
        ],
        properties: {
          key: { type: "string", example: "KICK_MEMBERS" },
          name: { type: "string", example: "Kick Members" },
          bit: { type: "integer", example: 1 },
          value: { type: "string", example: "2" },
          risk,
          requires_2fa: { type: "boolean" },
          url: { type: "string", format: "uri" },
        },
      },
      Report: {
        type: "object",
        required: [
          "input",
          "valid",
          "source",
          "permissions",
          "administrator",
          "verdict",
          "granted",
          "report_url",
        ],
        properties: {
          input: { type: "string" },
          valid: { const: true },
          source: { type: "string", enum: ["url", "integer"] },
          client_id: { type: ["string", "null"] },
          scopes: { type: "array", items: { type: "string" } },
          permissions: {
            type: "string",
            description: "The permission integer as a decimal string.",
            example: "8",
          },
          permissions_hex: { type: "string", example: "0x8" },
          administrator: {
            type: "boolean",
            description:
              "True when the value includes Administrator. This is the field to check if you want to block admin invites.",
          },
          verdict: {
            type: "string",
            enum: [
              "none",
              "minimal",
              "reasonable",
              "broad",
              "excessive",
              "administrator",
            ],
          },
          verdict_label: { type: "string" },
          summary: { type: "string" },
          score: {
            type: "integer",
            description:
              "Three per high-risk permission plus one per medium-risk permission.",
          },
          counts: {
            type: "object",
            properties: {
              low: { type: "integer" },
              medium: { type: "integer" },
              high: { type: "integer" },
              critical: { type: "integer" },
            },
          },
          granted: {
            type: "array",
            items: { $ref: "#/components/schemas/Permission" },
          },
          unknown_bits: { type: "array", items: { type: "integer" } },
          findings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                level: {
                  type: "string",
                  enum: ["critical", "warning", "info", "good"],
                },
                title: { type: "string" },
                body: { type: "string" },
              },
            },
          },
          closest_example: {
            type: ["object", "null"],
            properties: {
              slug: { type: "string" },
              name: { type: "string" },
              url: { type: "string", format: "uri" },
              extra: {
                type: "array",
                items: { type: "string" },
                description:
                  "Medium and high risk permissions requested beyond that example.",
              },
            },
          },
          report_url: {
            type: "string",
            format: "uri",
            description: "A human-readable report to link users to.",
          },
          badge_url: { type: "string", format: "uri" },
        },
      },
      Invalid: {
        type: "object",
        required: ["input", "valid", "error"],
        properties: {
          input: { type: "string" },
          valid: { const: false },
          error: { type: "string" },
        },
      },
      Error: {
        type: "object",
        required: ["error"],
        properties: { error: { type: "string" } },
      },
    },
  },
} as const;
