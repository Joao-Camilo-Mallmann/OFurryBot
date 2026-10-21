import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

interface ThemeSchedule {
  eventDate: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  phases: {
    preEventWeek: string;
    eventWeek: string;
    postEventWeek: string;
  };
  fallbackTheme: string;
}

interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  guildId: string;
  schedule?: ThemeSchedule;
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

function formatMmDd(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${m}-${d}`;
}

function isMmDdInWindow(mmdd: string, startMmDd: string, endMmDd: string): boolean {
  if (startMmDd <= endMmDd) {
    return mmdd >= startMmDd && mmdd <= endMmDd;
  }
  // Janela que atravessa a virada do ano (ex: 12-29 até 01-18)
  return mmdd >= startMmDd || mmdd <= endMmDd;
}

function loadAllThemes(): ThemeConfig[] {
  const dirs = readdirSync(THEMES_DIR).filter((d) =>
    existsSync(join(THEMES_DIR, d, "theme.json"))
  );
  return dirs.map((d) =>
    JSON.parse(readFileSync(join(THEMES_DIR, d, "theme.json"), "utf8"))
  );
}

function resolveThemeForDate(mmdd: string): { active: ThemeConfig; isFallback: boolean } {
  const all = loadAllThemes();
  for (const theme of all) {
    if (theme.schedule && isMmDdInWindow(mmdd, theme.schedule.startDate, theme.schedule.endDate)) {
      return { active: theme, isFallback: false };
    }
  }
  const base = all.find((t) => t.id === "base-onu")!;
  return { active: base, isFallback: true };
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

interface CurrentState {
  guild: { name: string };
  channels: Map<string, { name: string; topic?: string | null }>;
  roles: Map<string, { name: string; color: number; hoist: boolean }>;
}

// Lê o estado atual do servidor para só enviar PATCH do que realmente mudou
// (o Discord limita renomear canais a 2x a cada 10 minutos por canal).
async function fetchCurrentState(guildId: string, token: string): Promise<CurrentState> {
  const [guild, channels, roles] = await Promise.all([
    discordRequest(`/guilds/${guildId}`, "GET", token),
    discordRequest(`/guilds/${guildId}/channels`, "GET", token),
    discordRequest(`/guilds/${guildId}/roles`, "GET", token),
  ]);
  return {
    guild,
    channels: new Map(channels.map((c: any) => [c.id, c])),
    roles: new Map(roles.map((r: any) => [r.id, r])),
  };
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const isList = args.includes("--list");
  const isSchedule = args.includes("--schedule");
  const isAuto = args.includes("--auto");
  const isForce = args.includes("--force");
  const dateArg = args.find((a) => a.startsWith("--date="))?.split("=")[1];
  const todayMmDd = dateArg || formatMmDd(new Date());

  if (isSchedule) {
    const all = loadAllThemes().filter((t) => t.schedule);
    all.sort((a, b) => a.schedule!.eventDate.localeCompare(b.schedule!.eventDate));
    console.log("📅 Calendário Anual de Eventos Sazonais (Ciclo de 3 Semanas = 1 antes + 1 evento + 1 depois):\n");
    for (const t of all) {
      const s = t.schedule!;
      console.log(`🎯 ${t.name} (${t.id})`);
      console.log(`   • Data Central  : ${s.eventDate} | Janela Total (${s.durationWeeks} semanas): ${s.startDate} até ${s.endDate}`);
      console.log(`   • Semana 1 (Pré): ${s.phases.preEventWeek}`);
      console.log(`   • Semana 2 (Evt): ${s.phases.eventWeek}`);
      console.log(`   • Semana 3 (Pós): ${s.phases.postEventWeek}`);
      console.log(`   • Pós-Ciclo     : Retorna automaticamente para "${s.fallbackTheme}"\n`);
    }
    const resolved = resolveThemeForDate(todayMmDd);
    console.log(
      `📌 Status em [${todayMmDd}]: Tema Ativo = "${resolved.active.id}" (${resolved.active.server.name})${
        resolved.isFallback ? " [Padrão fora de janela de evento]" : " [Evento de 3 semanas em andamento]"
      }`
    );
    return;
  }

  let themeArg = args.find((a) => !a.startsWith("--"));

  if (isAuto) {
    const resolved = resolveThemeForDate(todayMmDd);
    themeArg = resolved.active.id;
    console.log(
      `🤖 [Modo Automático - Data ${todayMmDd}] -> Selecionado: "${themeArg}" (${
        resolved.isFallback ? "Fora de janela de 3 semanas -> Base ONU" : `Janela ativa: ${resolved.active.schedule?.startDate} a ${resolved.active.schedule?.endDate}`
      })`
    );
  }

  if (isList || !themeArg) {
    const all = loadAllThemes();
    const resolved = resolveThemeForDate(todayMmDd);
    console.log("🎨 Temas disponíveis no OFurryBot:");
    for (const data of all) {
      const schedInfo = data.schedule
        ? `[Ciclo 3 sem: ${data.schedule.startDate} a ${data.schedule.endDate}]`
        : `[Tema Permanente / Fallback]`;
      const activeMarker = resolved.active.id === data.id ? " 👈 ATIVO HOJE" : "";
      console.log(`  • ${data.id.padEnd(14)} → ${data.name.padEnd(36)} ${schedInfo}${activeMarker}`);
    }
    console.log("\nUso:");
    console.log("  bun run theme:list          # Lista os temas e mostra qual está ativo hoje");
    console.log("  bun run theme:schedule      # Exibe o calendário completo das 3 semanas de cada evento");
    console.log("  bun run theme:dry <tema>    # Simula as alterações sem tocar no Discord");
    console.log("  bun run theme <tema>        # Aplica o tema manualmente no servidor Discord");
    console.log("  bun run theme:auto          # Aplica automaticamente o tema da semana ou restaura a base-onu");
    console.log("  bun run theme <tema> --force # Reenvia tudo (inclusive o ícone), mesmo sem diferença");
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
  if (theme.schedule) {
    console.log(
      `📅 Ciclo 3 Sem.  : ${theme.schedule.startDate} até ${theme.schedule.endDate} (Evento: ${theme.schedule.eventDate}) -> Volta p/ ${theme.schedule.fallbackTheme}`
    );
  } else {
    console.log(`📅 Ciclo         : Permanente (Base Oficial - fora de temporada de eventos)`);
  }
  console.log(`🖼️  Ícone Local   : ${iconDataUri ? `${theme.server.icon} (Carregado ✅)` : "Não encontrado / Remoto"}`);
  console.log(`🧪 Modo          : ${isDryRun ? "SIMULAÇÃO (--dry-run)" : "PRODUÇÃO (Alterando no Discord)"}${isForce ? " [--force]" : ""}`);
  console.log(`=============================================================\n`);

  if (!isDryRun && !token) {
    console.error("❌ Variável DISCORD_TOKEN não definida no arquivo .env!");
    process.exit(1);
  }

  // Com token (inclusive em --dry-run) compara com o estado atual; sem token, mostra tudo.
  const current = token && !isForce ? await fetchCurrentState(guildId, token) : null;
  const UNCHANGED = " (sem alteração)";
  let changes = 0;

  // 1. Nome e Ícone do Servidor
  // O ícone não dá para comparar (a API só devolve um hash), então só é enviado
  // quando o nome do servidor muda (troca de tema) ou com --force.
  const serverChanged = !current || current.guild.name !== theme.server.name;
  const sendIcon = serverChanged && !!iconDataUri;
  console.log(
    `[Servidor] Nome -> "${theme.server.name}"${sendIcon ? ` + Ícone (${theme.server.icon})` : ""}${serverChanged ? "" : UNCHANGED}`
  );
  if (serverChanged) {
    changes++;
    if (!isDryRun && token) {
      await discordRequest(`/guilds/${guildId}`, "PATCH", token, {
        name: theme.server.name,
        ...(sendIcon ? { icon: iconDataUri } : {}),
      });
    }
  }

  // 2. Categorias
  console.log(`\n[Categorias (${theme.categories.length})]`);
  for (const cat of theme.categories) {
    const changed = !current || current.channels.get(cat.id)?.name !== cat.name;
    console.log(`  📁 (${cat.id}) -> "${cat.name}"${changed ? "" : UNCHANGED}`);
    if (!changed) continue;
    changes++;
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
    const cur = current?.channels.get(ch.id);
    const topicChanged = ch.type === "TEXT" && ch.topic !== undefined && (cur?.topic ?? "") !== ch.topic;
    const changed = !cur || cur.name !== ch.name || topicChanged;
    console.log(`  ${icon} (${ch.id}) -> "${ch.name}"${changed ? "" : UNCHANGED}`);
    if (!changed) continue;
    changes++;
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
    const cur = current?.roles.get(role.id);
    const changed = !cur || cur.name !== role.name || cur.color !== hexToInt(role.color) || cur.hoist !== role.hoist;
    console.log(`  🛡️  (${role.id}) -> "${role.name}" [Cor: ${role.color}]${changed ? "" : UNCHANGED}`);
    if (!changed) continue;
    changes++;
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
    const changed = !current || current.roles.get(sep.id)?.name !== sep.name;
    console.log(`  ➖ (${sep.id}) -> "${sep.name}"${changed ? "" : UNCHANGED}`);
    if (!changed) continue;
    changes++;
    if (!isDryRun && token) {
      await discordRequest(`/guilds/${guildId}/roles/${sep.id}`, "PATCH", token, {
        name: sep.name,
      });
    }
  }

  if (current && changes === 0) {
    console.log(`\n✅ Tema "${theme.name}" já está ativo, nada a alterar.`);
    return;
  }
  console.log(`\n✅ Tema "${theme.name}" ${isDryRun ? "simulado" : "aplicado"} com sucesso! (${changes} alteração(ões))`);
}

main().catch((err) => {
  console.error("❌ Erro ao executar o tema:", err);
  process.exit(1);
});
