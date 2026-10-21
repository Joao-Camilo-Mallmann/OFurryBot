# OFurryBot 🐾 — Sistema de Temas & Base Oficial da ONU

**OFurryBot** é o bot e gerenciador de temas sazonais da **Organização das Nações Unidas (ONU)** no Discord (`561721456405381123`).

O sistema foi desenhado de forma **híbrida** (`Markdown + JSON`): cada época do ano possui sua própria pasta em [`themes/`](./themes) com documentação visual (`README.md`) e configuração automatizada (`theme.json`), permitindo trocar o nome do servidor, molduras das categorias, separadores, emojis, nomes de canais e a hierarquia principal de cargos tanto **via IA (Discord MCP)** quanto **via CLI (`bun run theme <nome>`)**.

![Base da Organização das Nações Unidas](./img/onu-base.png)

---

## 🗂️ 1. Catálogo de Temas (`themes/`)

| Tema | Pasta / Docs | Config JSON | Nome do Servidor | Moldura de Categoria | Sep. Canal | Sep. Cargo |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| 🌐 **Base Oficial (ONU)** | [`themes/base-onu/README.md`](./themes/base-onu/README.md) | [`theme.json`](./themes/base-onu/theme.json) | `Organização das Nações Unidas` | `▬▬▬▬▬▬  Nome  ▬▬▬▬▬▬` | `│` | `-----------------` |
| 🎃 **Halloween** | [`themes/halloween/README.md`](./themes/halloween/README.md) | [`theme.json`](./themes/halloween/theme.json) | `Organização das Nações Assombradas 🎃` | `╭─── 🎃 Nome 🎃 ───╮` | `┃` | `─── 🦇 ───` |
| 🎄 **Natal** | [`themes/natal/README.md`](./themes/natal/README.md) | [`theme.json`](./themes/natal/theme.json) | `Organização das Nações Natalinas 🎄` | `❄️ ═══ Nome ═══ ❄️` | `┇` | `═══ ❄️ ═══` |
| 🎆 **Ano Novo** | [`themes/ano-novo/README.md`](./themes/ano-novo/README.md) | [`theme.json`](./themes/ano-novo/theme.json) | `Organização das Nações Renovadas 🎆` | `✨ ━━━ Nome ━━━ ✨` | `╏` | `━━━ ✨ ━━━` |
| 🐰 **Páscoa** | [`themes/pascoa/README.md`](./themes/pascoa/README.md) | [`theme.json`](./themes/pascoa/theme.json) | `Organização das Nações Achocolatadas 🐰` | `🌸 ─── Nome ─── 🌸` | `┆` | `─── 🥚 ───` |

> [!TIP]
> O mapeamento bruto completo de segurança (com todos os **48 cargos**, **permissões bitmask**, **54 emojis** e dados do servidor secundário) está salvo em:
> 📄 **[`docs/full-server-mapping.md`](./docs/full-server-mapping.md)**

---

## 🔄 2. Matriz Comparativa de Canais por Tema (IDs Fixos)

Todos os temas mapeiam exatamente os **mesmos 14 canais/categorias** através de seus IDs fixos no Discord:

| Tipo | ID Fixo | 🌐 Base ONU | 🎃 Halloween | 🎄 Natal | 🎆 Ano Novo | 🐰 Páscoa |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 📁 | `794044198881198090` | `▬▬▬▬▬▬  Geral  ▬▬▬▬▬▬` | `╭─── 🎃 Cripta Geral 🎃 ───╮` | `❄️ ═══ Vila do Noel ═══ ❄️` | `✨ ━━━ Réveillon Geral ━━━ ✨` | `🌸 ─── Toca Geral ─── 🌸` |
| `#` | `794044202803658752` | `🌍│geral-do-geral` | `🕸️┃geral-do-além` | `🎄┇ceia-geral` | `🥂╏brinde-geral` | `🥚┆caça-aos-ovos` |
| `#` | `794044204488720415` | `🎵│musiquinha` | `🎻┃sinfonia-macabra` | `🔔┇jingle-bells` | `🎶╏playlist-da-virada` | `🎵┆cantiga-do-coelho` |
| `#` | `794044207596568628` | `👋│salve-salve` | `🪦┃novas-almas` | `🎁┇cartinhas-pro-noel` | `🎇╏novos-ciclos` | `🐣┆novos-coelhinhos` |
| 📁 | `794044199514406923` | `▬▬▬▬▬ Assembleia  ▬▬▬▬▬` | `╭── 💀 Seita Suprema 💀 ──╮` | `🎄 ═══ Polo Norte ═══ 🎄` | `🎆 ━━━ Cúpula da Virada ━━━ 🎆` | `🍫 ─── Fábrica de Cacau ─── 🍫` |
| `🔊` | `794044207231926302` | `🛰️│Central de Voz` | `🕯️┃Câmara das Sombras` | `🛷┇Trenó Central` | `🎆╏Praia de Copacabana` | `🐰┆Toca Central` |
| `🔊` | `794044205231112232` | `🏛️│Supremo Tribunal` | `⚰️┃Tribunal da Inquisição` | `📜┇Lista dos Bons e Maus` | `⚖️╏Retrospectiva do Ano` | `🍫┆Conselho do Cacau` |
| `🔊` | `794044203771363328` | `🎙️│Palanque Central` | `🔮┃Altar do Ritual` | `⭐┇Chaminé Central` | `⏳╏Contagem Regressiva` | `🥕┆Jardim Central` |
| `🔊🔒` | `812400426108452865` | `🎉│Salão da Festa` | `🎃┃Baile dos Vampiros` | `🍗┇Ceia de Natal` | `🍾╏After da Virada` | `🍬┆Banquete de Chocolate` |
| `🔊🔒` | `794044208855777322` | `💤│AFK` | `🧟┃Cemitério AFK` | `⛄┇Boneco Congelado AFK` | `🥴╏Ressaca AFK` | `🧺┆Coma Glicêmico AFK` |
| 📁🔒 | `794044200756051989` | `▬▬▬▬▬ ADM ▬▬▬▬▬` | `╭─── 🩸 Submundo ADM 🩸 ───╮` | `🦌 ═══ Oficina ADM ═══ 🦌` | `🥂 ━━━ Camarote ADM ━━━ 🥂` | `🥚 ─── Cofre de Ouro ADM ─── 🥚` |
| `#🔒` | `794044213368848396` | `🤙adm-chat` | `🩸┃pacto-adm` | `🎅┇conselho-do-noel` | `🍾╏vip-adm` | `🍫┆willy-wonka-adm` |
| `#🔒` | `794044205848723468` | `📉│chat-falido-de-memes` | `👻┃memes-amaldiçoados` | `🧦┇meia-de-memes` | `📉╏retrospectiva-de-memes` | `🐰┆memes-recheados` |
| `🔊🔒` | `794044216933089320` | `Call Dos Ademar` | `🦇┃Covil dos Ademar` | `🦌┇Estábulo dos Ademar` | `🥂╏Camarote dos Ademar` | `🥚┆Toca dos Ademar` |

---

## 🛡️ 3. Matriz Comparativa da Hierarquia Principal de Cargos

Apenas os **4 cargos da Hierarquia Principal** e os **4 separadores visuais** mudam a cada evento (todos os outros ~30 cargos customizados/zoeira permanecem intocados):

| Escalão | Role ID | 🌐 Base ONU | 🎃 Halloween | 🎄 Natal | 🎆 Ano Novo | 🐰 Páscoa |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (Pos 38)** | `794044179029819392` | `Secretariado` (`#5B92E5`) | `🎃 Lordes das Sombras` (`#FF6B00`) | `🎅 Conselho do Bom Velhinho` (`#D62828`) | `🎆 Soberanos do Novo Ciclo` (`#FFD700`) | `🍫 Mestres Chocolatiers` (`#A0522D`) |
| **Tier 2 (Pos 29)** | `845826535810269225` | `Corte Jurídica` (`#F1C40F`) | `💀 Inquisidores Supremos` (`#9B59B6`) | `⭐ Guardiões da Estrela Guia` (`#F7B801`) | `🥂 Guardiões do Tempo` (`#F4A261`) | `🥚 Guardiões do Ovo Dourado` (`#FFD166`) |
| **Tier 3 (Pos 5)** | `794044189042147340` | `Corpo Diplomático` (`#95A5A6`) | `🧛 Emissários Noturnos` (`#C0392B`) | `🦌 Embaixadores do Polo Norte` (`#2A9D8F`) | `✨ Embaixadores da Virada` (`#90E0EF`) | `🐰 Embaixadores da Toca` (`#FF85A1`) |
| **Tier 4 (Pos 4)** | `794044191951945778` | `Assembleia Geral` (`#1ABC9C`) | `👻 Almas da Assembleia` (`#2ECC71`) | `🧝 Duendes da Assembleia` (`#52B788`) | `🎇 Cidadãos do Novo Ano` (`#E0FBFC`) | `🐣 Coelhinhos da Assembleia` (`#80ED99`) |
| **Separadores (x4)** | `900181759507968031` etc. | `-----------------` | `─── 🦇 ───` | `═══ ❄️ ═══` | `━━━ ✨ ━━━` | `─── 🥚 ───` |

---

## 🚀 4. Como Aplicar um Tema (Modo Híbrido)

### Opção A: Pedindo direto para a IA (Via Discord MCP)
Basta pedir no chat do Antigravity:
> *"Aplica o tema `halloween` no servidor da ONU usando o MCP"*
> *"Restaura o servidor para a `base-onu`"*

A IA lerá automaticamente o arquivo `themes/<tema>/theme.json` e executará as ferramentas do `discord-mcp`.

### Opção B: Via Script CLI (`Bun`)
1. Configure seu `.env` a partir do [`.env.example`](./.env.example).
2. Liste os temas disponíveis:
   ```bash
   bun run theme:list
   ```
3. Simule um tema sem alterar nada no Discord (`--dry-run`):
   ```bash
   bun run theme:dry halloween
   ```
4. Aplique o tema em produção:
   ```bash
   bun run theme halloween
   # Ou para voltar ao padrão:
   bun run theme base-onu
   ```

---

## 🔌 5. Configuração do Servidor MCP (`mcp_config.json`)

```json
{
  "mcpServers": {
    "discord-mcp": {
      "command": "java",
      "args": [
        "-jar",
        "C:\\Users\\jcami\\.gemini\\antigravity-cli\\bin\\discord-mcp-1.0.0.jar"
      ],
      "env": {
        "DISCORD_TOKEN": "SEU_DISCORD_BOT_TOKEN_AQUI",
        "DISCORD_GUILD_ID": "561721456405381123"
      }
    }
  }
}
```
