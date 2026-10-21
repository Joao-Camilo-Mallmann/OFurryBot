# DiscordFurryBot 🐾

DiscordFurryBot é um bot Discord completo com suporte a automações, moderação, comandos slash e integração com o **Model Context Protocol (MCP)**.

---

## 🔌 Configuração do MCP (Model Context Protocol)

O bot pode ser executado como um servidor MCP para que assistentes de IA (como Antigravity, Claude Desktop, Cursor, Windsurf, Cline) possam gerenciar o Discord automaticamente.

### 1. Pré-requisitos
- **Java 17+** instalado (`java -version`)
- Token do Discord Bot criado no [Discord Developer Portal](https://discord.com/developers/applications) com as intents ativadas (**Message Content Intent**, **Server Members Intent**).
- O arquivo `.jar` do servidor MCP (por exemplo, `discord-mcp-1.0.0.jar`).

---

### 2. Configuração no `mcp_config.json`

Adicione ao seu arquivo de configuração MCP (global em `~/.gemini/config/mcp_config.json` ou no seu cliente):

#### Execução via Java (Stdio - Recomendado para Windows):
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
        "DISCORD_GUILD_ID": "ID_OPCIONAL_DO_SERVIDOR"
      }
    }
  }
}
```

#### Execução via Docker (Alternativa):
```json
{
  "mcpServers": {
    "discord-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "DISCORD_TOKEN=SEU_DISCORD_BOT_TOKEN_AQUI",
        "ghcr.io/saseq/discord-mcp:latest"
      ]
    }
  }
}
```

---

## 🚀 Como Começar (Desenvolvimento Tradicional)

### Configuração de Ambiente
1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
2. Preencha as credenciais no `.env`:
   ```env
   DISCORD_TOKEN=seu_token_aqui
   CLIENT_ID=1562259079416778772
   GUILD_ID=seu_guild_id
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou
   bun install
   ```

4. Execute o bot:
   ```bash
   npm start
   # ou
   bun run dev
   ```

---

## 🛠️ Ferramentas MCP Disponíveis
Com o MCP conectado, a IA ganha superpoderes no seu servidor:
- 💬 **Mensagens**: Enviar mensagens, responder threads, ler histórico e editar/deletar posts.
- 📁 **Canais & Categorias**: Criar, listar, mover e configurar canais de texto, voz e fóruns.
- 🛡️ **Moderação**: Gerenciar cargos, permissões de canais e membros.
- 🎭 **Reações & Emojis**: Adicionar reações automáticas com emojis.
