# OFurryBot 🐾 — Sistema de Temas & Base Oficial da ONU

**OFurryBot** é o bot e gerenciador de temas sazonais da **Organização das Nações Unidas (ONU)** no Discord (`561721456405381123`).

O sistema foi desenhado de forma **híbrida** (`Markdown + JSON + Assets + Ciclo de 3 Semanas`): cada época do ano possui sua própria pasta em [`themes/`](./themes) com documentação visual (`README.md`), logos oficiais do servidor (`assets/icon.png` e `assets/icon.gif`) e configuração automatizada (`theme.json`).

---

## 🖼️ Galeria de Logos Oficiais dos Temas

| 🌐 Base Oficial (ONU) | 🌐 Base Animada (GIF) | 🎂 Aniversário ONU | 🐰 Páscoa |
| :---: | :---: | :---: | :---: |
| <img src="./themes/base-onu/assets/icon.png" width="120" /> | <img src="./themes/base-onu/assets/icon.gif" width="120" /> | <img src="./themes/aniversario/assets/icon.png" width="120" /> | <img src="./themes/pascoa/assets/icon.png" width="120" /> |
| [`icon.png`](./themes/base-onu/assets/icon.png) | [`icon.gif`](./themes/base-onu/assets/icon.gif) | [`icon.png`](./themes/aniversario/assets/icon.png) | [`icon.png`](./themes/pascoa/assets/icon.png) |

| 🔥 Festa Junina | 🎃 Halloween | 🎄 Natal (Animado) | 🎆 Ano Novo |
| :---: | :---: | :---: | :---: |
| <img src="./themes/festa-junina/assets/icon.png" width="120" /> | <img src="./themes/halloween/assets/icon.png" width="120" /> | <img src="./themes/natal/assets/icon.gif" width="120" /> | <img src="./themes/ano-novo/assets/icon.png" width="120" /> |
| [`icon.png`](./themes/festa-junina/assets/icon.png) | [`icon.png`](./themes/halloween/assets/icon.png) | [`icon.gif`](./themes/natal/assets/icon.gif) · [`icon.png`](./themes/natal/assets/icon.png) | [`icon.png`](./themes/ano-novo/assets/icon.png) |

---

## ⏳ Regra de Ciclo de 3 Semanas (Calendário Automático)

Cada evento sazonal tem duração exata de **3 semanas (21 dias)** estruturadas em 3 fases:
1. **Semana 1 (Pré-Evento / Aquecimento)**: 1 semana antes da semana do evento.
2. **Semana 2 (Semana do Evento)**: A semana principal da data comemorativa.
3. **Semana 3 (Pós-Evento / Ressaca)**: 1 semana após a semana do evento.
4. **Retorno ao Normal (`base-onu`)**: Encerradas as 3 semanas, o servidor retorna automaticamente para a **Base Oficial da ONU**.

| Evento / Tema | Data Central | Início (1 sem. antes) | Semana do Evento | Fim (1 sem. depois) | Pós-Ciclo (Retorno) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| 🎂 **Aniversário da ONU** (`aniversario`) | `31/03` | `17/03` a `23/03` | `24/03` a `30/03` | `31/03` a `06/04` | Transiciona p/ `pascoa` ou `base-onu` |
| 🐰 **Páscoa** (`pascoa`) | `19/04` | `07/04` a `13/04` | `14/04` a `20/04` | `21/04` a `27/04` | Volta p/ `base-onu` em `28/04` |
| 🔥 **Festa Junina** (`festa-junina`) | `24/06` | `10/06` a `16/06` | `17/06` a `23/06` | `24/06` a `30/06` | Volta p/ `base-onu` em `01/07` |
| 🎃 **Halloween** (`halloween`) | `31/10` | `17/10` a `23/10` | `24/10` a `31/10` | `01/11` a `06/11` | Volta p/ `base-onu` em `07/11` |
| 🎄 **Natal** (`natal`) | `25/12` | `08/12` a `14/12` | `15/12` a `25/12` | `26/12` a `28/12` | Transiciona p/ `ano-novo` em `29/12` |
| 🎆 **Ano Novo** (`ano-novo`) | `01/01` | `29/12` a `31/12` | `01/01` a `07/01` | `08/01` a `18/01` | Volta p/ `base-onu` em `19/01` |

---

## 🗂️ 1. Catálogo de Temas (`themes/`)

| Tema | Pasta / Docs | Config JSON | Nome do Servidor | Moldura de Categoria | Sep. Canal | Sep. Cargo | Janela (3 Semanas) |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| 🌐 **Base Oficial (ONU)** | [`themes/base-onu/README.md`](./themes/base-onu/README.md) | [`theme.json`](./themes/base-onu/theme.json) | `Organização das Nações Unidas` | `▬▬▬▬▬▬  Nome  ▬▬▬▬▬▬` | `│` | `-----------------` | *Permanente (Padrão)* |
| 🎂 **Aniversário ONU** | [`themes/aniversario/README.md`](./themes/aniversario/README.md) | [`theme.json`](./themes/aniversario/theme.json) | `Organização das Nações em Gala 🎂` | `👑 ═══ Nome ═══ 👑` | `║` | `═══ 🎂 ═══` | `17/03` a `06/04` |
| 🐰 **Páscoa** | [`themes/pascoa/README.md`](./themes/pascoa/README.md) | [`theme.json`](./themes/pascoa/theme.json) | `Organização das Nações da Páscoa 🐰` | `🌸 ─── Nome ─── 🌸` | `┆` | `─── 🥚 ───` | `07/04` a `27/04` |
| 🔥 **Festa Junina** | [`themes/festa-junina/README.md`](./themes/festa-junina/README.md) | [`theme.json`](./themes/festa-junina/theme.json) | `Organização das Nações Juninas 🔥` | `🌽 ─── Nome ─── 🌽` | `⸾` | `─── 🔥 ───` | `10/06` a `30/06` |
| 🎃 **Halloween** | [`themes/halloween/README.md`](./themes/halloween/README.md) | [`theme.json`](./themes/halloween/theme.json) | `Organização das Nações Assombradas 🎃` | `╭─── 🎃 Nome 🎃 ───╮` | `┃` | `─── 🦇 ───` | `17/10` a `06/11` |
| 🎄 **Natal** | [`themes/natal/README.md`](./themes/natal/README.md) | [`theme.json`](./themes/natal/theme.json) | `Organização das Nações Natalinas 🎄` | `❄️ ═══ Nome ═══ ❄️` | `┇` | `═══ ❄️ ═══` | `08/12` a `28/12` |
| 🎆 **Ano Novo** | [`themes/ano-novo/README.md`](./themes/ano-novo/README.md) | [`theme.json`](./themes/ano-novo/theme.json) | `Organização das Nações Renovadas 🎆` | `✨ ━━━ Nome ━━━ ✨` | `╏` | `━━━ ✨ ━━━` | `29/12` a `18/01` |

> [!TIP]
> O mapeamento bruto completo de segurança (com todos os **48 cargos**, **permissões bitmask**, **54 emojis** e dados do servidor secundário) está salvo em:
> 📄 **[`docs/full-server-mapping.md`](./docs/full-server-mapping.md)**

---

## 🔄 2. Matriz Comparativa de Canais por Tema (IDs Fixos)

Todos os temas mapeiam exatamente os **mesmos 14 canais/categorias** através de seus IDs fixos no Discord:

| Tipo | ID Fixo | 🌐 Base ONU | 🎂 Aniversário | 🐰 Páscoa | 🔥 Festa Junina | 🎃 Halloween | 🎄 Natal | 🎆 Ano Novo |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 📁 | `794044198881198090` | `▬▬▬▬▬▬  Geral  ▬▬▬▬▬▬` | `🎂 ═══ Salão Real da ONU ═══ 🎂` | `🌸 ─── Grande Conselho da Páscoa ─── 🌸` | `🌽 ─── Arraial Geral ─── 🌽` | `╭─── 🎃 Cripta Geral 🎃 ───╮` | `❄️ ═══ Vila do Noel ═══ ❄️` | `✨ ━━━ Réveillon Geral ━━━ ✨` |
| `#` | `794044202803658752` | `🌍│geral-do-geral` | `🎂║parabens-geral` | `🌍┆chat-geral-da-paz` | `🔥⸾prosa-na-fogueira` | `🕸️┃geral-do-além` | `🎄┇ceia-geral` | `🥂╏brinde-geral` |
| `#` | `794044204488720415` | `🎵│musiquinha` | `🎺║hino-da-gala` | `🎵┆sinfonia-da-páscoa` | `🪗⸾forrozinho-e-sanfona` | `🎻┃sinfonia-macabra` | `🔔┇jingle-bells` | `🎶╏playlist-da-virada` |
| `#` | `794044207596568628` | `👋│salve-salve` | `🎈║convidados-de-honra` | `👋┆boas-vindas-da-renovação` | `🤠⸾novos-compadres` | `🪦┃novas-almas` | `🎁┇cartinhas-pro-noel` | `🎇╏novos-ciclos` |
| 📁 | `794044199514406923` | `▬▬▬▬▬ Assembleia  ▬▬▬▬▬` | `👑 ═══ Cúpula de Aniversário ═══ 👑` | `🥚 ─── Plenário de Primavera ─── 🥚` | `🔥 ─── Quadrilha Suprema ─── 🔥` | `╭── 💀 Seita Suprema 💀 ──╮` | `🎄 ═══ Polo Norte ═══ 🎄` | `🎆 ━━━ Cúpula da Virada ━━━ 🎆` |
| `🔊` | `794044207231926302` | `🛰️│Central de Voz` | `👑║Palco do Aniversário` | `🗳️┆Plenário da Primavera` | `🔥⸾Roda da Fogueira` | `🕯️┃Câmara das Sombras` | `🛷┇Trenó Central` | `🎆╏Praia de Copacabana` |
| `🔊` | `794044205231112232` | `🏛️│Supremo Tribunal` | `🏛️║Corte Histórica da ONU` | `⚖️┆Tribunal do Coelho` | `🐍⸾Cadeia do Arraial` | `⚰️┃Tribunal da Inquisição` | `📜┇Lista dos Bons e Maus` | `⚖️╏Retrospectiva do Ano` |
| `🔊` | `794044203771363328` | `🎙️│Palanque Central` | `🎙️║Discurso de Fundação` | `🕊️┆Mesa Redonda dos Ovos` | `💌⸾Correio Elegante` | `🔮┃Altar do Ritual` | `⭐┇Chaminé Central` | `⏳╏Contagem Regressiva` |
| `🔊🔒` | `812400426108452865` | `🎉│Salão da Festa` | `🍰║Hora do Bolo` | `🎉┆Salão de Festa dos Ovos` | `🍷⸾Barraca do Quentão` | `🎃┃Baile dos Vampiros` | `🍗┇Ceia de Natal` | `🍾╏After da Virada` |
| `🔊🔒` | `794044208855777322` | `💤│AFK` | `🎁║Coma de Brigadeiro AFK` | `💤┆Túmulo dos Inativos da Páscoa` | `🌾⸾Cochilo no Paiol AFK` | `🧟┃Cemitério AFK` | `⛄┇Boneco Congelado AFK` | `🥴╏Ressaca AFK` |
| 📁🔒 | `794044200756051989` | `▬▬▬▬▬ ADM ▬▬▬▬▬` | `🥂 ═══ Conselho Fundador ADM ═══ 🥂` | `🍫 ─── Alto Comando do Cacau ─── 🍫` | `🤠 ─── Barraca ADM ─── 🤠` | `╭─── 🩸 Submundo ADM 🩸 ───╮` | `🦌 ═══ Oficina ADM ═══ 🦌` | `🥂 ━━━ Camarote ADM ━━━ 🥂` |
| `#🔒` | `794044213368848396` | `🤙adm-chat` | `👑║cupula-fundadora-adm` | `🔒┆arquivos-secretos-do-conselho` | `🤠⸾delegacia-do-arraial` | `🩸┃pacto-adm` | `🎅┇conselho-do-noel` | `🍾╏vip-adm` |
| `#🔒` | `794044205848723468` | `📉│chat-falido-de-memes` | `📸║capsula-de-memes` | `📉┆memes-chocos` | `🌽⸾memes-de-pamonha` | `👻┃memes-amaldiçoados` | `🧦┇meia-de-memes` | `📉╏retrospectiva-de-memes` |
| `🔊🔒` | `794044216933089320` | `Call Dos Ademar` | `🥂║Salão VIP dos Ademar` | `👑┆Cúpula dos Coelhos Supremos` | `🪗⸾Paiol dos Ademar` | `🦇┃Covil dos Ademar` | `🦌┇Estábulo dos Ademar` | `🥂╏Camarote dos Ademar` |

---

## 🛡️ 3. Matriz Comparativa da Hierarquia Principal de Cargos

Apenas os **4 cargos da Hierarquia Principal** e os **4 separadores visuais** mudam a cada evento (todos os outros ~30 cargos customizados/zoeira permanecem intocados):

| Escalão | Role ID | 🌐 Base ONU | 🎂 Aniversário | 🐰 Páscoa | 🔥 Festa Junina | 🎃 Halloween | 🎄 Natal | 🎆 Ano Novo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (Pos 38)** | `794044179029819392` | `Secretariado` (`#5B92E5`) | `👑 Fundadores Supremos` (`#FFD700`) | `🍫 Alto Comando do Cacau` (`#A0522D`) | `🔥 Coronéis do Arraial` (`#E65100`) | `🎃 Lordes das Sombras` (`#FF6B00`) | `🎅 Conselho do Bom Velhinho` (`#D62828`) | `🎆 Soberanos do Novo Ciclo` (`#FFD700`) |
| **Tier 2 (Pos 29)** | `845826535810269225` | `Corte Jurídica` (`#F1C40F`) | `🎂 Guardiões da Coroa` (`#3B82F6`) | `⚖️ Tribunal do Coelho` (`#FFD166`) | `🤠 Xerifes da Quadrilha` (`#FBC02D`) | `💀 Inquisidores Supremos` (`#9B59B6`) | `⭐ Guardiões da Estrela Guia` (`#F7B801`) | `🥂 Guardiões do Tempo` (`#F4A261`) |
| **Tier 3 (Pos 5)** | `794044189042147340` | `Corpo Diplomático` (`#95A5A6`) | `🥂 Embaixadores de Gala` (`#F43F5E`) | `🕊️ Embaixadores da Primavera` (`#FF85A1`) | `🪗 Sanfoneiros Diplomáticos` (`#D32F2F`) | `🧛 Emissários Noturnos` (`#C0392B`) | `🦌 Embaixadores do Polo Norte` (`#2A9D8F`) | `✨ Embaixadores da Virada` (`#90E0EF`) |
| **Tier 4 (Pos 4)** | `794044191951945778` | `Assembleia Geral` (`#1ABC9C`) | `🎈 Convidados da Assembleia` (`#38BDF8`) | `🥚 Plenário da Páscoa` (`#80ED99`) | `🌽 Caipiras da Assembleia` (`#7CB342`) | `👻 Almas da Assembleia` (`#2ECC71`) | `🧝 Duendes da Assembleia` (`#52B788`) | `🎇 Cidadãos do Novo Ano` (`#E0FBFC`) |
| **Separadores (x4)** | `900181759507968031` etc. | `-----------------` | `═══ 🎂 ═══` | `─── 🥚 ───` | `─── 🔥 ───` | `─── 🦇 ───` | `═══ ❄️ ═══` | `━━━ ✨ ━━━` |

---

## 📸 4. Prints de Referência do Servidor

<p align="left">
  <img src="./img/onu-base.png" width="260" alt="Base Atual da ONU" />
  <img src="./img/onu-legacy-channels.png" width="260" alt="Referência Antiga de Canais" />
</p>

---

## 🚀 5. Como Aplicar um Tema (Modo Híbrido)

### Opção A: Pedindo direto para a IA (Via Discord MCP)
Basta pedir no chat do Antigravity:
> *"Aplica o tema `festa-junina` no servidor da ONU usando o MCP"*
> *"Aplica o tema `aniversario` no servidor da ONU"*
> *"Restaura o servidor para a `base-onu`"*

### Opção B: Via Script CLI (`Bun`)
1. Configure seu `.env` a partir do [`.env.example`](./.env.example).
2. Liste os temas disponíveis e veja qual está ativo no calendário de 3 semanas:
   ```bash
   bun run theme:list
   bun run theme:schedule
   ```
3. Simule um tema sem alterar nada no Discord (`--dry-run`):
   ```bash
   bun run theme:dry festa-junina
   bun run theme:dry aniversario
   ```
4. Aplique automaticamente o tema correspondente à data atual (ou restaure `base-onu` se estiver fora das 3 semanas de evento):
   ```bash
   bun run theme:auto
   ```
5. Ou aplique um tema específico manualmente em produção:
   ```bash
   bun run theme festa-junina
   # Ou para voltar ao padrão:
   bun run theme base-onu
   ```

---

## 🔌 6. Configuração do Servidor MCP (`mcp_config.json`)

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
