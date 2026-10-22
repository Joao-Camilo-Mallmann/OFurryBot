# OFurryBot 🐾

**OFurryBot** is a seasonal theme manager bot built for the **Organização das Nações Unidas (ONU)** Discord server.

It automatically updates the server's visual identity throughout the year—changing the **server name**, **icon**, **categories**, **channels**, and **main role hierarchy** to match special holidays and commemorative dates, and restoring the default look once each event ends.

---

## 🖼️ Seasonal Themes

| 🌐 Official Base (ONU) | 🎂 ONU Anniversary | 🐰 Easter | 🔥 Festa Junina |
| :---: | :---: | :---: | :---: |
| <img src="./themes/base-onu/assets/icon.png" width="110" /> | <img src="./themes/aniversario/assets/icon.png" width="110" /> | <img src="./themes/pascoa/assets/icon.png" width="110" /> | <img src="./themes/festa-junina/assets/icon.png" width="110" /> |
| **Default Theme** | **Mar 17 – Apr 06** | **Apr 07 – Apr 27** | **Jun 10 – Jun 30** |

| 🎃 Halloween | 🎄 Christmas | 🎆 New Year |
| :---: | :---: | :---: |
| <img src="./themes/halloween/assets/icon.png" width="110" /> | <img src="./themes/natal/assets/icon.gif" width="110" /> | <img src="./themes/ano-novo/assets/icon.png" width="110" /> |
| **Oct 17 – Nov 06** | **Dec 08 – Dec 28** | **Dec 29 – Jan 18** |

---

## ✨ How It Works

Each seasonal theme runs for a **3-week cycle** (1 week before the holiday, the holiday week itself, and 1 week after):
- **During an event window**: The bot applies the holiday theme (custom server name, logo, themed channel names, and role colors/titles).
- **Outside event windows**: The server automatically returns to the default **Official Base (`base-onu`)** theme.
- **Automated Daily Check**: A daily GitHub Actions workflow checks the calendar and updates the server only when a theme transition occurs.

---

## 🚀 Basic Usage

### Requirements
- [Bun](https://bun.sh/) installed
- A `.env` file configured with `DISCORD_TOKEN` and `DISCORD_GUILD_ID` (see [`.env.example`](./.env.example))

### Commands

```bash
# List all available themes and see which one is active today
bun run theme:list

# View the annual 3-week event schedule
bun run theme:schedule

# Preview changes without modifying the Discord server (dry run)
bun run theme:dry <theme-id>

# Automatically apply the theme for today's date
bun run theme:auto

# Manually apply a specific theme (e.g., halloween, natal, base-onu)
bun run theme <theme-id>
```

---

## 📁 Project Structure

- [`themes/`](./themes) — Theme definitions (`theme.json`), visual assets (`icon.png` / `icon.gif`), and previews for each season.
- [`scripts/apply-theme.ts`](./scripts/apply-theme.ts) — Script that resolves the active theme and updates the Discord server.
- [`.github/workflows/theme-auto.yml`](./.github/workflows/theme-auto.yml) — Daily scheduled workflow for automatic theme switching.
