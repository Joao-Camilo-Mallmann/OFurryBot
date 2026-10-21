import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  guildId: string;
  server: {
    name: string;
    icon?: string;
    animatedIcon?: string;
  };
  categories: Array<{
    id: string;
    slot: string;
    name: string;
    position: number;
  }>;
  channels: Array<{
    id: string;
    slot: string;
    type: "TEXT" | "VOICE";
    categoryId: string;
    name: string;
    topic?: string;
  }>;
  roles: {
    hierarchy: Array<{
      id: string;
      slot: string;
      name: string;
      color: string;
      hoist: boolean;
    }>;
    separators: Array<{
      id: string;
      position: number;
      name: string;
    }>;
  };
}

const DISCORD_API = "https://discord.com/api/v10";
const THEMES_DIR = join(process.cwd(), "themes");

function hexToInt(hex: string | null | undefined): number {
  if (!hex || hex === "None") return 0;
  return parseInt(hex.replace("#", ""), 16);
}

function loadIconAsDataUri(themeDir: string, iconRelPath?: string): string | null {
  if (!iconRelPath || iconRelPath.startsWith("http")) return null;
  const fullPath = join(themeDir, iconRelPath);
  if (!existsSync(fullPath)) return null;
  const ext = extname(fullPath).toLowerCase();
  const mime = ext === ".gif" ? "image/gif" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
  const base64 = readFileSync(fullPath).toString("base64");
  return `data:${mime};base64,${base64}`;
}

async function discordRequest(endpoint: string, method: string, token: string, body?: unknown) {
  const res = await fetch(`${DISCORD_API}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "DiscordBot (https://github.com/Joao-Camilo-Mallmann/OFurryBot, 1.0)",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Discord API error (${res.status}) on ${endpoint}: ${errText}`);
  }
  return res.json();
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const isList = args.includes("--list");
  const themeArg = args.find((a) => !a.startsWith("--"));

  if (isList || !themeArg) {
    const available = readdirSync(THEMES_DIR).filter((d) =>
      existsSync(join(THEMES_DIR, d, "theme.json"))
    );
    console.log("🎨 Temas disponíveis no OFurryBot:");
    for (const t of available) {
      const data: ThemeConfig = JSON.parse(readFileSync(join(THEMES_DIR, t, "theme.json"), "utf8"));
      console.log(`  • ${t.padEnd(12)} → ${data.name} (${data.server.name})`);
    }
    console.log("\nUso:");
    console.log("  bun run theme:dry <tema>   # Simula as alterações sem tocar no Discord");
    console.log("  bun run theme <tema>       # Aplica o tema no servidor Discord");
    return;
  }

  const themeDir = join(THEMES_DIR, themeArg);
  const themePath = join(themeDir, "theme.json");
  if (!existsSync(themePath)) {
    console.error(`❌ Tema "${themeArg}" não encontrado em themes/${themeArg}/theme.json`);
    process.exit(1);
  }

  const theme: ThemeConfig = JSON.parse(readFileSync(themePath, "utf8"));
  const guildId = process.env.DISCORD_GUILD_ID || theme.guildId;
  const token = process.env.DISCORD_TOKEN;
  const iconDataUri = loadIconAsDataUri(themeDir, theme.server.icon);

  console.log(`\n=============================================================`);
  console.log(`🎨 Aplicando Tema: ${theme.name} (${theme.id})`);
  console.log(`🏛️  Servidor Alvo : ${theme.server.name} (ID: ${guildId})`);
  console.log(`🖼️  Ícone Local   : ${iconDataUri ? `${theme.server.icon} (Carregado ✅)` : "Não encontrado / Remoto"}`);
  console.log(`🧪 Modo          : ${isDryRun ? "SIMULAÇÃO (--dry-run)" : "PRODUÇÃO (Alterando no Discord)"}`);
  console.log(`=============================================================\n`);

  if (!isDryRun && !token) {
    console.error("❌ Variável DISCORD_TOKEN não definida no arquivo .env!");
    process.exit(1);
  }

  // 1. Nome e Ícone do Servidor
  console.log(`[Servidor] Nome -> "${theme.server.name}"${iconDataUri ? ` + Ícone (${theme.server.icon})` : ""}`);
  if (!isDryRun && token) {
    await discordRequest(`/guilds/${guildId}`, "PATCH", token, {
      name: theme.server.name,
      ...(iconDataUri ? { icon: iconDataUri } : {}),
    });
  }

  // 2. Categorias
  console.log(`\n[Categorias (${theme.categories.length})]`);
  for (const cat of theme.categories) {
    console.log(`  📁 (${cat.id}) -> "${cat.name}"`);
    if (!isDryRun && token) {
      await discordRequest(`/channels/${cat.id}`, "PATCH", token, {
        name: cat.name,
      });
    }
  }

  // 3. Canais
  console.log(`\n[Canais (${theme.channels.length})]`);
  for (const ch of theme.channels) {
    const icon = ch.type === "TEXT" ? "#" : "🔊";
    console.log(`  ${icon} (${ch.id}) -> "${ch.name}"`);
    if (!isDryRun && token) {
      await discordRequest(`/channels/${ch.id}`, "PATCH", token, {
        name: ch.name,
        ...(ch.type === "TEXT" && ch.topic !== undefined ? { topic: ch.topic } : {}),
      });
    }
  }

  // 4. Cargos da Hierarquia Principal
  console.log(`\n[Hierarquia Principal (${theme.roles.hierarchy.length})]`);
  for (const role of theme.roles.hierarchy) {
    console.log(`  🛡️  (${role.id}) -> "${role.name}" [Cor: ${role.color}]`);
    if (!isDryRun && token) {
      await discordRequest(`/guilds/${guildId}/roles/${role.id}`, "PATCH", token, {
        name: role.name,
        color: hexToInt(role.color),
        hoist: role.hoist,
      });
    }
  }

  // 5. Separadores Visuais de Cargos
  console.log(`\n[Separadores de Cargos (${theme.roles.separators.length})]`);
  for (const sep of theme.roles.separators) {
    console.log(`  ➖ (${sep.id}) -> "${sep.name}"`);
    if (!isDryRun && token) {
      await discordRequest(`/guilds/${guildId}/roles/${sep.id}`, "PATCH", token, {
        name: sep.name,
      });
    }
  }

  console.log(`\n✅ Tema "${theme.name}" ${isDryRun ? "simulado" : "aplicado"} com sucesso!`);
}

main().catch((err) => {
  console.error("❌ Erro ao executar o tema:", err);
  process.exit(1);
});
