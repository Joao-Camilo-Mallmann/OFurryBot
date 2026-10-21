# 🔥 Tema: Festa Junina (`festa-junina`)

Tema especial de **São João / Festa Junina (Junho)** para a ONU. Utiliza molduras rústicas de espigas de milho (`🌽 ─── ... ─── 🌽`), separador ondulado de bandeirinha (`⸾`) e paleta quente de fogueira, milho, bandeirinha vermelha e roça.

- **Arquivo de Automação**: [`theme.json`](./theme.json)
- **Logo Oficial de Festa Junina**: [`./assets/icon.png`](./assets/icon.png)
- **Ciclo de Duração (3 Semanas)**: `10/06` a `30/06` (1 semana antes + semana de São João `24/06` + 1 semana depois → retorna para `base-onu` em `01/07`).

<p align="left">
  <img src="./assets/icon.png" width="180" alt="Logo Festa Junina ONU" />
</p>

---

## 🏛️ Identidade do Servidor

| Propriedade | Base ONU | Tema Festa Junina |
| :--- | :--- | :--- |
| **Nome do Servidor** | `Organização das Nações Unidas` | `Organização das Nações Juninas 🔥` |
| **Moldura de Categoria** | `▬▬▬▬▬▬  Nome  ▬▬▬▬▬▬` | `🌽 ─── Nome ─── 🌽` |
| **Separador de Canal** | `│` | `⸾` |
| **Separador de Cargos** | `-----------------` | `─── 🔥 ───` |

---

## 📂 Estrutura de Categorias e Canais

```text
Organização das Nações Juninas 🔥
│
├── 📁 🌽 ─── Arraial Geral ─── 🌽 (794044198881198090)
│   ├── # 🔥⸾prosa-na-fogueira          (794044202803658752)
│   ├── # 🪗⸾forrozinho-e-sanfona       (794044204488720415)
│   └── # 🤠⸾novos-compadres            (794044207596568628)
│
├── 📁 🔥 ─── Quadrilha Suprema ─── 🔥 (794044199514406923)
│   ├── 🔊 🔥⸾Roda da Fogueira          (794044207231926302)
│   ├── 🔊 🐍⸾Cadeia do Arraial         (794044205231112232)
│   ├── 🔊 💌⸾Correio Elegante          (794044203771363328)
│   ├── 🔊🔒 🍷⸾Barraca do Quentão      (812400426108452865)
│   └── 🔊🔒 🌾⸾Cochilo no Paiol AFK    (794044208855777322)
│
└── 📁 🤠 ─── Barraca ADM ─── 🤠 (794044200756051989)
    ├── #🔒 🤠⸾delegacia-do-arraial     (794044213368848396)
    ├── #🔒 🌽⸾memes-de-pamonha         (794044205848723468)
    └── 🔊🔒 🪗⸾Paiol dos Ademar        (794044216933089320)
```

---

## 🛡️ Hierarquia Principal de Cargos (Paleta de São João)

| Escalão | Role ID | Nome Original | Nome na Festa Junina | Cor Hex | Estilo da Cor |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Tier 1** | `794044179029819392` | `Secretariado` | `🔥 Coronéis do Arraial` | `#E65100` | 🟠 Laranja Fogueira |
| **Tier 2** | `845826535810269225` | `Corte Jurídica` | `🤠 Xerifes da Quadrilha` | `#FBC02D` | 🟡 Amarelo Milho / Palha |
| **Tier 3** | `794044189042147340` | `Corpo Diplomático` | `🪗 Sanfoneiros Diplomáticos` | `#D32F2F` | 🔴 Vermelho Bandeirinha |
| **Tier 4** | `794044191951945778` | `Assembleia Geral` | `🌽 Caipiras da Assembleia` | `#7CB342` | 🟢 Verde Roça |
| **Separadores (x4)** | `900181759507968031` etc. | `-----------------` | `─── 🔥 ───` | `None` | Fogueiras divisoras |
