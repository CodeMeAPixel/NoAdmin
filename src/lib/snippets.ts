import { decode } from "./permissions";

export interface Snippet {
  id: string;
  label: string;
  language: string;
  code: (value: bigint, clientId: string) => string;
}

function names(value: bigint, comment: string) {
  const perms = decode(value).permissions;
  if (!perms.length) return `${comment} No permissions`;
  return perms.map((perm) => `${comment} ${perm.key}`).join("\n");
}

export const SNIPPETS: Snippet[] = [
  {
    id: "discordjs",
    label: "discord.js",
    language: "js",
    code: (
      value,
      clientId,
    ) => `import { OAuth2Scopes, PermissionsBitField } from "discord.js";

${names(value, "//")}
const permissions = new PermissionsBitField(${value}n);

const invite = client.generateInvite({
  scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
  permissions,
});
// or: https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=${value}&scope=bot+applications.commands`,
  },
  {
    id: "discordpy",
    label: "discord.py",
    language: "python",
    code: (value, clientId) => `import discord

${names(value, "#")}
permissions = discord.Permissions(${value})

invite = discord.utils.oauth_url(
    ${clientId === "YOUR_CLIENT_ID" ? "client.user.id" : clientId},
    permissions=permissions,
    scopes=("bot", "applications.commands"),
)`,
  },
  {
    id: "serenity",
    label: "Serenity",
    language: "rust",
    code: (value) => `use serenity::model::permissions::Permissions;

${names(value, "//")}
let permissions = Permissions::from_bits_truncate(${value});`,
  },
  {
    id: "jda",
    label: "JDA",
    language: "java",
    code: (value) => `import net.dv8tion.jda.api.Permission;

${names(value, "//")}
EnumSet<Permission> permissions = Permission.getPermissions(${value}L);
String invite = jda.getInviteUrl(permissions);`,
  },
  {
    id: "discordgo",
    label: "DiscordGo",
    language: "go",
    code: (value) => `${names(value, "//")}
var permissions int64 = ${value}`,
  },
  {
    id: "slash",
    label: "Command default permissions",
    language: "json",
    code: (value) => `{
  "name": "purge",
  "description": "Delete recent messages",
  "default_member_permissions": "${value}"
}

// default_member_permissions controls which MEMBERS can see the command.
// It is separate from the permissions your bot is invited with.`,
  },
];
