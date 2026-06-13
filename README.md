# GameBeliever Web

GameBeliever - Your Ultimate Gaming Guide Platform

## Tech Stack

- **Framework**: Astro
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via UnoCSS)
- **Content Pipeline**: Custom AI-powered content generation

## Project Structure

```
src/
├── content/          # Markdown content collections
├── content.config.ts # Content collections configuration
├── data/             # JSON data files
│   ├── characters/   # Character data (core, skills, traces, etc.)
│   └── keywords/     # SEO keywords per character
├── components/       # Astro components
├── layouts/          # Page layouts
├── pages/            # Route pages
├── scripts/          # Build scripts
│   ├── build-prompt.ts  # Prompt assembly
│   └── generate.ts      # AI content generation
├── qa/               # QA scripts
│   ├── check.ts      # Quality assurance checks
│   └── rules.json    # QA rules configuration
└── types/            # TypeScript type definitions
prompts/              # Prompt templates
temp/                 # Temporary prompt files
```

## Commands

### Development
| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |

### Content Pipeline
| Command | Action |
|---------|--------|
| `npm run prompt:build -- --char=kafka --type=character` | Build prompt for specific content |
| `npm run generate -- --char=kafka --type=character` | Generate single content piece |
| `npm run generate -- --char=kafka --all` | Generate all content for a character |
| `npm run generate:all` | Generate content for all characters |
| `npm run qa` | Run QA on all content |
| `npm run qa:file -- --file=path/to/file.md` | Run QA on specific file |

## Content Pipeline

The content pipeline automates content generation:

1. **JSON Data** → Character data stored in `src/data/characters/{slug}/`
2. **Prompt Builder** → Assembles prompts from templates + data + keywords
3. **AI Generation** → Calls DeepSeek/OpenAI API to generate content
4. **QA Check** → Validates content quality (word count, FAQs, links, etc.)
5. **Markdown Output** → Saves to `src/content/` for Astro to build

### Setup

1. Copy `.env.example` to `.env`
2. Add your AI API key
3. Run `npm run generate -- --char=kafka --all`

## Content Collections

- `characters` - Character profiles
- `builds` - Character build guides
- `teams` - Team compositions
- `pull-advice` - Pull recommendation guides

## Deployment

Recommended: Cloudflare Pages

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
