# Workspace

## Overview

pnpm workspace monorepo using TypeScript. An Arabic Poetry Teacher app powered by OpenAI via Replit AI Integrations. Features 100 structured levels across 5 stages, from complete beginner to master poet, with role-play scenarios, XP rewards, and a bilingual AI tutor named "المعلم" (The Teacher).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **AI**: OpenAI via Replit AI Integrations (no user API key needed)
- **Frontend**: React + Vite + TailwindCSS + Shadcn UI + Framer Motion

## Features

- **100-level structured learning path** across 5 stages
- **AI tutor "المعلم"** (The Teacher) with level-specific role-play system prompts
- **XP reward system** — earn XP by completing levels, unlock next stages
- **Role-play scenarios** — student becomes the poet (e.g., "You ARE Al-Mutanabbi in the Caliph's court")
- **Streaming AI responses** via SSE (not EventSource)
- **Bilingual UI** (Arabic + English) with RTL text support
- **Dark gold academic aesthetic** — beautiful Arabic calligraphy-inspired design
- **Confetti celebration** when marking a level complete

## Learning Path — 5 Stages

| Stage | Levels | Theme |
|-------|--------|-------|
| 1 | 1-20 | أساسيات الشعر العربي / Arabic Poetry Foundations |
| 2 | 21-40 | بحور الشعر / The Poetic Meters |
| 3 | 41-60 | البلاغة والصور الشعرية / Rhetoric & Imagery |
| 4 | 61-80 | تحليل القصائد / Analysis & Appreciation |
| 5 | 81-100 | الإنشاء والإبداع الشعري / Composition & Creativity |

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── arabic-poetry/      # React + Vite frontend (main app at /)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   ├── db/                 # Drizzle ORM schema + DB connection
│   ├── integrations-openai-ai-server/  # OpenAI server-side integration
│   └── integrations-openai-ai-react/   # OpenAI React hooks
├── scripts/                # Utility scripts (seed-levels.ts)
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Database Schema

- `stages` — 5 learning stages with nameAr, nameEn, icon, levelStart, levelEnd
- `levels` — 100 levels with levelNumber, nameAr, nameEn, skillKey, systemPrompt, roleplaysScenarioAr/En, xpReward
- `conversations` — Chat sessions (linked to a level via levelId)
- `messages` — Individual chat messages (user + assistant)
- `user_progress` — currentLevel, totalXp, completedLevels (JSON array)

## API Routes

All routes under `/api`:
- `GET /api/healthz` — Health check
- `GET /api/stages` — All stages with their levels
- `GET /api/levels/:levelNumber` — Get level detail (no systemPrompt)
- `GET /api/progress` — Get user progress
- `POST /api/progress/complete-level` — Mark level done, award XP
- `POST /api/learning/start-level/:levelNumber` — Create conversation session for level
- `GET /api/openai/conversations/:id` — Get conversation with messages
- `POST /api/openai/conversations/:id/messages` — Send message (SSE streaming)

## Frontend Routes

- `/` — Welcome screen (new users) or Learning Path (returning users)
- `/level/:id` — Level detail page (role-play scenario, begin lesson)
- `/c/:levelNumber/:id` — Chat/lesson page with AI tutor

## AI Integration Notes

- Model: `gpt-5.2` with `max_completion_tokens: 8192`
- SSE streaming: consume with `fetch + ReadableStream`, NOT `EventSource`
- Level system prompts are loaded from DB when conversation has a `levelId`
- Default system prompt used for free-form conversations without a level

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes
- `pnpm --filter @workspace/scripts run seed-levels` — seed the 100 levels and 5 stages
