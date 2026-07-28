# Handoff — claude_setup project

## Goal

Produce a curated, standalone document (or set of documents) explaining which parts of my
Claude Code setup would actually be useful for my son, who uses Claude to build his own
projects (Python, solo, doesn't read Claude-generated code closely). This is NOT a copy of my
`~/.claude/CLAUDE.md` — much of that is Next.js/npm/Postgres-specific and full of anecdotes
tied to my other projects. The deliverable is a translation: only the parts that transfer,
explained for his context.

**His specific stated problem:** Claude changes things he didn't ask for and doesn't tell him,
so on testing he gets a different result and it takes ages to find out why.

**Other candidate topics he raised, not yet evaluated against the 5 areas below:**
- All constants defined in one place; no function may have inbuilt/hardcoded constants
- A "dataflow and constants display" feature (a live-rendered docs page — see nextjs-shared's
  chess-project precedent: `docs/Dataflow.md` rendered via `/owner/dataflow`)
- A shared logging table (`xlg_logging` / `write_logging` pattern in nextjs-shared)
- A cache mechanism (`userCache_store` in nextjs-shared) — user is unsure this is useful for
  son, said "he can decide"

## The 5 areas to review, one at a time

1. **CLAUDE.md setup — explicit workflow `#plan` / `#code` / `#commit`** — ✅ DONE, see verdict below
2. **Claude permissions** — not yet discussed
3. **Claude commands** — not yet discussed (note: this likely means the custom `#`-trigger
   commands like `#audit`, `#reinstall`, `#noprompt`, `#skillslist`, `#showgit`, `#commands` —
   confirm scope with user before assuming)
4. **Claude skills** — not yet discussed (the `~/.claude/skills/*/SKILL.md` mechanism itself —
   how skills work, whether son should build his own)
5. **Naming conventions** — not yet discussed (likely the DD/variable-naming rules, table/column
   naming — confirm which parts are Python-relevant vs Postgres/SQL-specific before including)

## Item 1 — verdict (completed)

**Recommend: yes, but the simplified core only, not the full skill machinery.**

The two specific rules that would have prevented his stated failure mode:

- **The plan-gate itself** — no code change without a written plan first (a short bullet list of
  what will change), agreed before execution starts. Substitutes for reading a diff.
- **"Explicit choices — never decide silently"** — Claude must surface any judgment call (which
  existing thing to reuse, what a default should be) rather than silently picking one. This is
  almost certainly the direct fix for "it changes things I didn't ask for and doesn't tell me."
- **A running `## Changes` log** appended during execution — a written record of what was
  actually done, readable without opening any code file.

**Leave out for him:** the full 4-skill apparatus (`#plan`/`#code`/`#tested`/`#commit` as separate
skill files with a git pipeline — version bumps, npm reinstall steps, etc.) is built around a
multi-project Next.js/npm workspace. For a solo Python project, that mechanical tail is dead
weight. The transferable core could be 3-4 lines in his own CLAUDE.md, not separate skill files,
unless he wants the heavier ceremony deliberately.

## Where to find real source material for items 2-5 (read directly, don't rely on this summary)

Reading is not restricted by project isolation — a session in `claude_setup` can read any of
these directly by absolute path:

- `C:\Users\richa\.claude\CLAUDE.md` — global instructions (source for items 1, 2, 3, 4, 5)
- `C:\Users\richa\.claude\COMMANDS.md` — the `#`-trigger command list (item 3)
- `C:\Users\richa\.claude\skills\` — every skill's `SKILL.md` (item 4)
- `C:\Users\richa\.claude\settings.json` — permission rules, hooks (item 2)
- `c:\Users\richa\claude\github\nextjs-shared\.claude\CLAUDE.md` — component-authoring rules,
  DD-naming section (item 5), constants-file convention
- `c:\Users\richa\claude\github\nextjs-shared\CONSUMING_PROJECTS.md` (in node_modules of any
  consuming project) — logging table, cache, dataflow display precedent (chess project)
- `c:\Users\richa\claude\github\nextjs-shared\scripts\schema.sql` — table/column naming in
  practice

## Also discussed, decided NOT to include in the son-facing document

- A separate side-thread evaluated several built-in Claude Code slash commands (`/goal`,
  `/permissions`, `/add-dir`, `/context`, `/cost`, `/rewind`, `/hooks`, `/model`) against my own
  workflow — conclusion was none of them earn a place given my existing custom-skill setup. This
  was about my own tooling choices, not son-facing content — excluded from this handoff unless
  he asks about built-in commands specifically.

## Structural decisions made about claude_setup itself

- Separate from any "control" dashboard app (Postgres-backed, user-facing) — that's a distinct,
  separate personal project idea, not part of this.
- `claude_setup` (or `claude-setup` for kebab-case consistency with other project names — user's
  call) will NOT have a real application — plain docs only, no database, no UI, unless later
  decided otherwise.
- Lives under `C:\Users\richa\claude\github\claude_setup` as its own git repo (assumed — confirm).
- Will not show up in the automatic project-scan (no `package.json`) — deliberate, not an oversight.
