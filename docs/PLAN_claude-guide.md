# PLAN_claude-guide — claude_setup

## Title
Consolidated tracking plan, combining the still-open work carried forward from 4 prior plan files
into one, per user instruction (given during `#commit`, 2026-07-31): `PLAN_son-claude-guide.md`,
`PLAN_stage2-owner-page.md`, `PLAN_stage2-home-tabs.md`, `PLAN_trigger-terminology.md`. Only
unfinished items carry forward — completed work from each source plan is not repeated here; its
full step-by-step history is preserved in this commit (the source plans were fully committed
before being deleted). `PLAN_trigger-terminology.md` contributed nothing forward since every one
of its items was already checked off.

## Plan

### 1. Stage 1 — assemble the full claude-guide document (carried forward from PLAN_son-claude-guide.md, not started)

Produce a single, full, readable markdown document explaining the Claude Code setup implemented in
this workspace, covering everything (workflow, permissions, commands, skills, naming conventions,
database/nextjs-shared-specific rules), not pre-filtered for any one audience or tech stack. The
document is pushed to GitHub and is meant to be read by a Claude Code session working in ANY other
project, that session analyzes each part of the setup and decides for itself what's useful to
adopt into its own project.

**Scope rule:** everything gets included by default, no filtering by audience or stack. Whenever
it's genuinely unclear whether some implementation detail belongs in the document, ask the user
rather than silently deciding to leave it out. The user decides what goes into the source
document; the consuming Claude (reader) decides what it wants to adopt from it.

**Two distinct tasks, combined within each item below:**
1. **Document the existing setup**, a factual, complete account of what is actually implemented in
   this project's Claude Code setup, as it really works.
2. **Annotate portability**, for each documented piece, add a note on whether/how it may not apply
   elsewhere because of this setup's particular choices (Node, Next.js, Postgres, a multi-project
   workspace, etc.). Task 2 is a layer on top of Task 1, not a filter on it.

**Documentation convention, the document is a template, not a rulebook.** A consuming Claude
reviews it and reworks it into its own changed template for its own project. Anything that only
applies under a condition the reader might not share (stack-specific or scenario-specific) is
still included in full, but explicitly flagged so a reader can tell at a glance it doesn't apply to
them.

**Where to find real source material** (read directly, don't rely on summaries):
- `C:\Users\richa\.claude\CLAUDE.md`, global instructions
- `C:\Users\richa\.claude\COMMANDS.md`, the trigger list
- `C:\Users\richa\.claude\skills\`, every skill's `SKILL.md`
- `C:\Users\richa\.claude\settings.json`, permission rules, hooks
- `c:\Users\richa\claude\github\nextjs-shared\.claude\CLAUDE.md`, component-authoring rules
- `c:\Users\richa\claude\github\nextjs-shared\CONSUMING_PROJECTS.md` (in node_modules of any
  consuming project), logging table, cache, dataflow display precedent
- `c:\Users\richa\claude\github\nextjs-shared\scripts\schema.sql`, table/column naming in practice

**Master source is `src/content/*.md`, not this document.** Write the document by concatenating
that content, not by separately authoring prose the UI later mirrors.

Remaining steps:
- [ ] **Item 1, CLAUDE.md setup / plan-gate policy.** Write a full explanation of the policy: when
  Claude executes vs. stays in discussion/planning mode, the "explicit choices, never decide
  silently" rule and why it exists, the constraint-values-must-be-agreed rule, and the rationale
  for a running `## Changes` log.
- [ ] **Item 2, Claude permissions.** Explain `~/.claude/settings.json`'s `allow`/`ask` lists,
  `defaultMode: acceptEdits`, and the two hooks (`permission-exceptions.sh`,
  `project-isolation-guard.js`), what each does and why it exists, in full. Covers
  permissions/hooks only.
- [ ] **Item 3, Claude commands.** Explain the custom trigger commands as documented in
  `~/.claude/COMMANDS.md`: `/plan`/`/code`/`/commit`, `/audit`, `/reinstall`, `/noprompt
  [command]`, `/skillslist`. Also explain the sync convention itself.
- [ ] **Item 4, Claude skills.** Explain the `~/.claude/skills/*/SKILL.md` mechanism itself, how a
  skill is structured and invoked, then give the full list of skills that exist in this setup and
  what each does.
- [ ] **Item 5, Naming conventions.** Sources: global `~/.claude/CLAUDE.md` for the DD variable-
  naming rule, table/column identifier naming, and the constants-file convention; nextjs-shared's
  own `.claude/CLAUDE.md` for the `x`-prefix confirmation in practice and the component
  sub-element override prop naming convention.
- [ ] **Other candidate topics**, write up constants-in-one-place, the dataflow/constants display
  page pattern, the shared logging table, and the cache mechanism, each as its own section.
- [ ] Write one file per section (Items 1-5, Other candidate topics) under `src/content/`, full
  prose from everything agreed above, not just a copy of these bullet notes.
- [ ] Assemble `docs/CLAUDE_SETUP_EXPLAINED.md` by concatenating the `src/content/*.md` files, in
  order, with an overview intro.
- [ ] Push the finished document to GitHub.

### 2. Owner-page logging — manual DB setup (carried forward from PLAN_stage2-owner-page.md)

`scripts/schema.sql` has the `xlg_logging` table DDL for claude_setup's own dedicated local
database (`local_claude_setup`, already set in `.env.locallocal`), but the database itself has not
yet been created.

- [ ] **Manual SQL, not yet run as of 2026-07-31 (confirmed with the user during `#commit`).** Run
  via pgAdmin4:
  ```sql
  CREATE DATABASE local_claude_setup;
  ```
  Then, connected to `local_claude_setup`, run the contents of `scripts/schema.sql` to create the
  `xlg_logging` table.
- [ ] Run the dev server and open `/owner`, confirm the Logging tab loads (via `OwnerTableLogging`)
  without a database-connection error.

## Changes
### docs/PLAN_son-claude-guide.md, docs/PLAN_stage2-owner-page.md, docs/PLAN_stage2-home-tabs.md, docs/PLAN_trigger-terminology.md
- Consolidated into this single file, per user instruction. Completed work is not repeated here
  (preserved in git history via the commit that included each source plan); only open items carry
  forward. All 4 source files deleted.

## Testing
### Carried forward from PLAN_stage2-home-tabs.md
- [ ] Run the dev server and open `/`, confirm all 5 main tabs render cleanly (Overview, Workflow,
  Skills, Permissions, Conventions)
- [ ] Open the Skills tab specifically, confirm its 8 sub-tabs (Overview, plan, code, commit,
  audit, reinstall, skillslist, Claude) all show and switch correctly, the Overview sub-tab shows
  two separate tables ("Executable commands" and "For Claude"), and the combined Claude sub-tab
  shows all 5 skills (noprompt, safe-install, new-project, db-naming, onboarding) each under its
  own heading with a bolded first line
- [ ] Spot-check a few sub-tabs (e.g. `audit`, `Claude`) and the Conventions tab (Naming/
  Constants/Shared sub-tabs) for correct content, including the widened last table column
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean
