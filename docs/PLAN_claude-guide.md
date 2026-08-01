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

### 1. Stage 1 — assemble the full claude-guide document (carried forward from PLAN_son-claude-guide.md; design pivoted, see 2026-07-31 note below)

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

**Design pivot, confirmed with the user (2026-07-31):** the plan above assumed a flat
`src/content/*.md` source concatenated into a single portable `docs/CLAUDE_SETUP_EXPLAINED.md`, so
a Claude session in a different project could read one plain file off disk without running this
app. What was actually built instead is a live, tabbed React UI (`src/app/page.tsx`) backed by
`src/content/*.ts` `ContentBlock` arrays — Overview / Workflow / Skills (with one sub-tab per
skill) / Permissions / Conventions (Naming / Constants / Shared). Reviewed against the checklist
below, every one of Items 1-5 plus "Other candidate topics" has full, portability-annotated
content already written in that form. User decision: **the flat-doc requirement is dropped** —
the live UI plus the already-plain-text-readable `src/content/*.ts` files are the finished
deliverable. `docs/CLAUDE_SETUP_EXPLAINED.md` will not be created. "Push to GitHub" is no longer a
distinct Stage 1 action — it happens via the normal `#commit` flow whenever the user chooses to
commit this work, same as any other change.

Remaining steps (struck through where superseded by the pivot above):
- [x] **Item 1, CLAUDE.md setup / plan-gate policy.** Covered by the Workflow tab (phases,
  triggers) and Skills → `plan` sub-tab (explicit-choices rule, constraint-agreement rule, Changes
  log rationale).
- [x] **Item 2, Claude permissions.** Covered by the Permissions tab (allow/ask categories, the two
  hooks, portability caveats).
- [x] **Item 3, Claude commands.** Covered by the Skills tab overview table plus one sub-tab per
  command (`plan`, `code`, `commit`, `audit`, `reinstall`, `skillslist`).
- [x] **Item 4, Claude skills.** Covered by the same Skills tab, plus the combined `Claude`
  sub-tab for the no-fixed-trigger skills (`noprompt`, `safe-install`, `new-project`, `db-naming`,
  `onboarding`).
- [x] **Item 5, Naming conventions.** Covered by Conventions → Naming (DD naming, table/column
  convention, `x`-prefix, component sub-element override-prop convention).
- [x] **Other candidate topics.** Covered by Conventions → Constants, and Conventions → Shared
  (nextjs-shared overview, primitive components, UI panels, tables/table-functions, cache, logging
  schema).
- [x] Write one file per section under `src/content/` — done, as `.ts` `ContentBlock` data feeding
  the live UI rather than `.md` prose (the design pivot above).
- ~~Assemble `docs/CLAUDE_SETUP_EXPLAINED.md` by concatenating the `src/content/*.md` files~~ —
  **dropped**, per the pivot decision above.
- ~~Push the finished document to GitHub~~ — **folded into the normal `#commit` flow**, not a
  separate Stage 1 action.

### 2. Remove Owner-page logging feature (superseded, 2026-07-31 — was: manual DB setup, carried forward from PLAN_stage2-owner-page.md)

Originally this item was "create the `local_claude_setup` database and run `scripts/schema.sql`
so the Owner page's Logging tab works." On review (2026-07-31), the user pointed out this project
is documentation-only, and a grep confirmed no code anywhere in `src/` calls `write_Logging` —
the only references to logging are prose in `src/content/*.ts` describing the convention, and the
`/owner` route which only *displays* `xlg_logging` via `OwnerTableLogging`. Since nothing writes to
that table, standing up a database for it would only ever show an empty view. Decision: remove the
feature instead of provisioning the database.

- [x] Delete `src/app/owner/page.tsx` and `src/app/owner/layout.tsx`.
- [x] Remove the `xlg_logging` table DDL from `scripts/schema.sql`.
- [x] Check `.env.locallocal` / `.env` for the `local_claude_setup`-specific Postgres variables —
  confirm with the user whether to remove them or leave them (they may still be wired to a real
  local database used for other purposes). User confirmed: remove them.
- [x] Confirm no other file imports `OwnerPage` or `OwnerTableLogging` from `nextjs-shared` after
  the route is deleted. `OwnerPage` is still legitimately used in `src/app/page.tsx` as a generic
  tabbed-UI wrapper (unrelated to the deleted `/owner` admin route). `OwnerTableLogging` has no
  remaining imports anywhere — its only remaining mention is a documentation-catalog line in
  `src/content/shared-ui-components/content.ts` listing it as an available nextjs-shared
  component, not a usage.
- [x] Follow-on found during execution: `src/app/layout.tsx` also used `POSTGRES_DATABASE_LOCATION`
  (via `DevLayoutHeader`'s `dbLocation` prop) — a dependency missed by the original plan text. User
  decided (2026-07-31) to stop using `DevLayoutHeader` in this project entirely, since its main
  purpose is a dev banner linking to `/owner`, which no longer exists. Removed the import and the
  `IS_DEV`/`DevLayoutHeader` usage from `src/app/layout.tsx`.
- [x] Follow-on: with `DevLayoutHeader` gone, `NEXT_PUBLIC_APPENV_ISDEV` (its only real consumer)
  and `NEXT_PUBLIC_APPENV_DBHANDLER`/`NEXT_PUBLIC_APPENV_LOG_I` (no consumer in this project ever)
  had no remaining code reference. User confirmed (2026-07-31): remove them too. `.env` and
  `.env.locallocal` are now empty.

### 3. Stage 3 — document instructions from global `~/.claude/CLAUDE.md` missing from the UI (2026-07-31)

A gap-analysis review found ~25 standing rules in `~/.claude/CLAUDE.md` with no presence anywhere
in `src/content/*.ts`, despite the Stage 1 scope rule ("everything gets included by default, no
filtering by audience or stack"). User agreed (2026-07-31): add all of it, portability-annotated
like every existing section. Also agreed the IA mapping below (one new top-level tab, three new
Conventions sub-tabs, the rest folded into existing tabs).

**Source for every item below is `~/.claude/CLAUDE.md` directly** — read the relevant section
fresh when writing each piece of content, don't rely on this summary table alone.

- [x] **Extend Skills → Overview** (`src/content/skills/content.ts`): the "check for a skill
  first" rule before acting on any `#trigger` (with the `#reinstall` incident as the motivating
  example, generalized per this doc's existing style of stating the failure mode without a full
  incident narrative), the `/commands` trigger, and the COMMANDS.md-kept-in-sync rule.
- [x] **New top-level Workspace tab** (`src/content/workspace/content.ts`, wired into
  `src/app/page.tsx`): all-projects-local / discovered-by-scanning-a-directory (never a hardcoded
  project list), the two-file project-tracking system (`.claude/CLAUDE.md` permanent +
  `docs/PLAN_<slug>.md` transient) and why PLAN files live outside `.claude/`, and **project
  isolation** as its own fully-explained section — the hard read-anywhere/write-only-current-project
  boundary, the enforcing hook, and the two named exceptions (nextjs-shared Sync-All,
  next-dbadmin).
- [x] **Extend Conventions → Shared** (`src/content/shared/content.ts` and/or
  `shared-tables/content.ts`): nextjs-shared consumption discipline — read
  `CONSUMING_PROJECTS.md` at the start of every session, propose shared placement before
  implementing a reusable function locally, and propose amending an existing shared component
  rather than working around a near-fit locally.
- [x] **Extend Workflow** (`src/content/workflow/content.ts`): verify a plan's assumptions before
  `#code` runs, the `.env`-reflects-last-selected-environment rule (never infer environment from
  `.env`'s current contents, always ask/state explicitly), UI-replica-must-match-production-exactly,
  never prompt the user to commit, and capture-every-remark-into-the-plan during testing/iteration
  phases.
- [x] **New Conventions → Architecture sub-tab** (`src/content/architecture/content.ts`): reusable
  UI components (build once, use many, once an option-set is likely reused), and the "building
  custom infrastructure vs. adopting an existing package" hard-stop rule.
- [x] **New Conventions → Restrictions sub-tab** (`src/content/restrictions/content.ts`): the
  "never without being asked" list — never strip comments, never rename, never restructure, no
  speculative abstractions, no destructive SQL in code, manual-only DB changes, no migration
  scripts, `schema.sql` as sole source of truth, never hardcode a real-world list without
  confirmation, always assign-then-return, never flag missing React import, Versions-tab for
  pinning.
- [x] **New Conventions → Style sub-tab** (`src/content/style/content.ts`): inline comment format
  (3-line minimum) and function comment-header format, function-declaration style (always
  `function`, hoisting, top-down structure), file structure (`'use server'`/`'use client'` first,
  const ordering, `useState` grouping, named exports only), async conventions (`await` only,
  `useEffect` inner-function pattern), layout conventions (nextjs-shared has no layout opinions,
  admin pages full-width), filter-placement convention (directly above its column), and TypeScript
  conventions (explicit types, `type` over `interface`, shared types from `nextjs-shared/structures`).
- [x] **Extend Conventions → Shared** (`src/content/shared-logging/content.ts`,
  `shared-tables/content.ts`): how code is expected to call `write_Logging` (message format,
  E/W/I severity) alongside the existing table-schema description, and the maintenance/pipeline
  `skipCache: true` rule alongside the existing cache section.
- [x] **Extend Conventions → Naming** (`src/content/naming/content.ts`, Database naming section):
  `GENERATED BY DEFAULT AS IDENTITY` over `SERIAL`, no `table.column` notation (except
  self-joins), no foreign keys, no `CASCADE`, and the 4-step column-reorder process (backup, drop,
  recreate, copy back) for inserting/reordering columns.
- [x] Wire the new Workspace tab into `src/app/page.tsx`'s top-level `OwnerPage` tabs array, and
  the three new Conventions sub-tabs into `ConventionsTab`'s tabs array. Also updated the Overview
  tab's "What the other tabs cover" table to mention Workspace and the three new Conventions
  sub-tabs, so it stays accurate.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 4. Stage 4 — reformat Workflow's 5 process-rules headings into a table (2026-07-31)

The 5 headings added to `src/content/workflow/content.ts` in Stage 3 ("Verify a plan before
executing it", "Never assume which environment is meant", "A manual replica of a scheduled
process must match it exactly", "Never prompt the user to commit", "During a testing/iteration
phase, capture everything into the plan") are converted from individual heading+paragraph blocks
into a single table, headed `Claude Rules` / `Description`, matching the table style already used
elsewhere in this doc (e.g. Permissions' "Actions that always require explicit confirmation").

- [x] Replace the 5 `heading`/`paragraph` block pairs in `src/content/workflow/content.ts` (from
  "Verify a plan before executing it" through the end of the file) with one `table` block, headers
  `['Claude Rules', 'Description']`, one row per rule, text unchanged from Stage 3.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 5. Stage 5 — remove stale `#tested` mention (2026-07-31)

`#tested` is no longer an active trigger; the user pointed out the leftover mention should be
removed rather than documented as history.

- [x] Remove the paragraph in `src/content/skills/content.ts` ("A fourth workflow trigger,
  #tested, originally existed as a skill too. It was identified as an error and removed
  entirely."). Confirmed via grep this is the only mention of the `#tested` trigger anywhere in
  `src/` (a separate, unrelated use of the plain word "tested" exists in `commit/content.ts` and
  is not touched).
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 6. Stage 6 — deactivate `/commands` and remove it from documentation (2026-07-31)

User decided to deactivate `/commands` entirely (not just undocument it), since `/skillslist`
already covers the same need. Global-config side already done directly (pre-authorized, Claude's
own working files, no plan-gate applies to those): removed the "Trigger: `/commands`" section from
`~/.claude/CLAUDE.md`, removed the `## /commands` section from `~/.claude/COMMANDS.md`, and added a
`## History` entry there recording the removal. What remains is this project's own documentation of
it, which does go through the plan-gate like any other code change here.

- [x] Remove the "The /commands trigger" heading/paragraph from `src/content/skills/content.ts`.
  Leave "Keeping the catalog in sync" as-is — that rule (COMMANDS.md staying in sync with trigger
  definitions) is independent of the `/commands` trigger itself and still applies.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 7. Stage 7 — remove duplicated Severity table and schema code block from Shared → Logging (2026-07-31)

The "How application code writes to it" section added in Stage 3 duplicated information already
present elsewhere in the same file: the Severity/Meaning table repeats what the `lg_severity`
column description already states, and the `CREATE TABLE public.xlg_logging` code block repeats
the same schema the column table above it already documents in prose form. User decided: remove
both entirely.

- [x] In `src/content/shared-logging/content.ts`, remove the `table` block (headers
  `['Severity', 'Meaning']`) and the `code` block (the `CREATE TABLE public.xlg_logging ...` SQL)
  added in Stage 3. Keep the "How application code writes to it" heading and its paragraph (the
  message-format convention) — only the table and code block are removed as duplicative.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 8. Stage 8 — add a heading above the Workspace tab's intro paragraph (2026-07-31)

The Workspace tab's opening paragraph ("Scenario-specific: this setup manages several separate
projects from one shared Claude configuration...") currently has no heading above it, unlike most
other sections in this doc. User asked for a heading titled `CLAUDE.md` placed directly above it.

- [x] In `src/content/workspace/content.ts`, insert `{ type: 'heading', text: 'CLAUDE.md' }`
  immediately before the existing opening paragraph block.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 9. Stage 9 — box + background around every table and list (2026-07-31)

Requested mid-run during Stage 4-8's `#code`, but not part of that agreed batch, so it's queued
here for its own `#code` rather than folded into the run in progress. `ContentSection.tsx` is the
single shared renderer for every `table` and `list` block across the whole app (no tab hardcodes
its own markup), so this is a one-file change that applies everywhere at once.

- [x] In `src/components/ContentSection.tsx`, wrap the rendered `<table>` and `<ul>` elements each
  in a container with a border and background, matching the existing `code` block's styling for
  visual consistency (`border border-gray-200 rounded bg-gray-50 p-3`, with `overflow-x-auto` on
  the table wrapper for wide tables).
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 10. Stage 10 — light-blue table background, darker-blue heading row (2026-07-31)

Tables only (not the list boxes added in Stage 9, which stay gray). Proposed shades:
`bg-blue-50` for the table's container box (currently `bg-gray-50`), `bg-blue-200` for the header
row (currently just a bottom border, no fill), keeping the existing `text-gray-800` header text
since `bg-blue-200` is light enough to keep good contrast without switching to white text.

- [x] In `src/components/ContentSection.tsx`, change the table's wrapping `div` from
  `bg-gray-50` to `bg-blue-50` (keep `border-blue-200`-equivalent border or leave border color
  as-is — border color wasn't asked for, only background).
- [x] Add a `bg-blue-200` background to the `<tr>` inside `<thead>` (currently only
  `border-b border-gray-300`, no fill).
- [x] **Width consistency, user-flagged follow-up:** the table's wrapping `div` is currently a
  plain block element, which stretches to the full width of its parent regardless of how wide the
  table itself actually renders (the header's own columns are width-restricted — `w-80` on the
  first column, content-width on the middle columns, `max-w-5xl` as a cap on the last). That
  mismatch leaves visible background past the table's real edge whenever the table is narrower
  than the available space. Fix: change the wrapping `div` to shrink-to-fit its content
  (`inline-block` plus `max-w-full` so it still can't overflow the page), so the colored box's
  width always matches the table's actual rendered width — restricted the same way the header
  columns are. `overflow-x-auto` stays, so a genuinely wide table still scrolls inside its box
  rather than overflowing the page.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 11. Stage 11 — Skills tab: drop the "Executable commands" heading, rename its "Skill" column (2026-07-31)

Applies only to the first table in `src/content/skills/content.ts` (the executable-commands one),
not the second "For Claude" table, which also has a `Skill` header but wasn't mentioned.

- [x] Remove the `{ type: 'heading', text: 'Executable commands (the designer types these)' }`
  block immediately above that table.
- [x] Change that table's headers from `['Skill', 'Trigger', 'Notes']` to
  `['Designer Skill', 'Trigger', 'Notes']`.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 12. Stage 12 — Skills tab: drop the "For Claude" heading, rename its "Skill" column (2026-07-31)

Same treatment as Stage 11, applied to the second table (the no-fixed-trigger one).

- [x] Remove the `{ type: 'heading', text: 'For Claude (no fixed trigger; recognized from the
  situation)' }` block immediately above that table.
- [x] Change that table's headers from `['Skill', 'Trigger', 'Notes']` to
  `['Claude Skill', 'Trigger', 'Notes']` (read "Cluade" as "Claude").
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 13. Stage 13 — convert the Claude sub-tab's 5 skill entries into a table (2026-07-31)

`src/content/claude/content.ts` currently lists noprompt/safe-install/new-project/db-naming/
onboarding as heading+paragraph pairs. User: convert to a table. Each of the 4 non-`noprompt`
entries opens with a near-boilerplate sentence ("There is no fixed trigger for the Claude skill
called X; it runs automatically, matching the situation.") that repeats the row's own skill name;
`noprompt` never had this sentence since it does have a real trigger (`/noprompt`). User decided:
drop the repeated sentence, replace it with one shared intro line above the table, keep the
functional description as the row's only other cell.

- [ ] Replace the file's contents with: one paragraph
  ("None of these have a fixed trigger; each runs automatically, matching the situation."), then
  a single `table` block, headers `['Claude Skill', 'Description']`, rows:
  - `noprompt` — both existing paragraphs kept verbatim and combined (this one has a real
    trigger, `/noprompt`, so it's the exception — note that inline in its own cell rather than
    relying on the shared intro line, since the shared line doesn't apply to it)
  - `safe-install` — "Explains what's being installed and why before running any install or
    download, rather than being invoked by name."
  - `new-project` — "Scaffolds a brand-new project, following this workspace's conventions.
    Next.js-specific mechanics, but the underlying idea (one skill that scaffolds new projects
    consistently) transfers to any stack."
  - `db-naming` — "Enforces this setup's table/column naming convention when a table or column
    is added, and handles Postgres's lack of in-place column reordering (backup, drop, recreate,
    copy back). Postgres-specific mechanics; the naming-discipline idea itself transfers even
    where the mechanics don't."
  - `onboarding` — "Integrates the shared package into a project, and pins every consuming
    project to the same version of it. Tied entirely to this author's own shared-package,
    multi-project workspace; unlikely to be useful as-is outside it."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 14. Stage 14 — remove `noprompt` from the Claude sub-tab, enrich its existing Skills → Overview row instead (2026-07-31)

User pointed out: `noprompt` has a real trigger (`/noprompt`), so it doesn't belong in the Claude
sub-tab (skills with no fixed trigger, recognized from the situation) — it's already correctly
listed in Skills → Overview's Designer Skill table as "Permission exception" / `/noprompt`. Rather
than deleting the detail entirely, fold the richer description currently sitting in the Claude
sub-tab's `noprompt` row into that existing "Permission exception" row's Notes cell.

- [x] In `src/content/skills/content.ts`, expand the "Permission exception" row's Notes cell (
  currently "Generic mechanism, works anywhere") to combine it with the fuller description
  currently in `claude/content.ts`'s `noprompt` row: "Adds an exact-command exception to the
  permission-exceptions mechanism so that one specific command stops triggering a permission
  prompt, while everything else in its family still asks. If no command is given inline, asks
  which exact command to exempt. Runs immediately, no confirmation, including for
  destructive-category commands (force-push, hard reset, branch deletion, cleaning untracked
  files, destructive SQL, killing processes), though those are flagged explicitly in the report.
  Generic mechanism, works anywhere."
- [x] In `src/content/claude/content.ts`, remove the `noprompt` row entirely. With it gone, the
  remaining 4 rows (safe-install, new-project, db-naming, onboarding) all genuinely have no fixed
  trigger, so the intro paragraph's caveat is no longer needed — simplify it back to a plain
  statement ("None of these have a fixed trigger; each runs automatically, matching the
  situation.") with no exception wording required.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 15. Stage 15 — list boxes get the same light-blue background as tables (2026-07-31)

Stage 9 gave lists the same gray box as tables; Stage 10 then moved tables to light blue but left
lists gray. User: match them — light blue for lists too. Background only; border color and the
inline-block width-consistency fix (Stage 10) weren't asked for here and aren't touched.

- [x] In `src/components/ContentSection.tsx`, change the list wrapper `div`'s background from
  `bg-gray-50` to `bg-blue-50`.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 16. Stage 16 — convert the `code` sub-tab's 3 description paragraphs into a table (2026-07-31)

Unlike Stage 4/13's source material, these 3 paragraphs in `src/content/code/content.ts` have no
existing headings to use as row labels — they're sequential prose describing what `/code` does.
Proposed row labels below (a judgment call, open to adjustment before `#code` runs): "Plan file
requirement", "Execution", "Completion". The intro line ("/code is a trigger which executes the
Claude skill called code.") stays as-is above the table, untouched.

- [x] Replace the 3 paragraph blocks (after the intro line) in `src/content/code/content.ts` with
  one `table` block, headers `['Step', 'Description']`, rows:
  - `Plan file requirement` — "Executes the current plan file. If no plan file exists yet for the
    change in question, creates one first. A code change is never made with nothing behind it
    recording what changed and why."
  - `Execution` — "Works through each step in the plan in order: checking it off and appending to
    the log as it goes, with no confirmation needed mid-run. That pause already happened when the
    plan was agreed."
  - `Completion` — "Once every step is checked off, automatically writes a testing checklist and
    presents it in chat. This is a list of concrete, unchecked verification steps. Partially
    verifies some of it itself where possible (e.g. a type-check or build pass); anything
    requiring a running app or visual review is left for the user."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 17. Stage 17 — convert the `commit` sub-tab's 4 description paragraphs into a table (2026-07-31)

Same treatment as Stage 16, applied to `src/content/commit/content.ts`. Proposed row labels:
"Manual SQL confirmation", "Version, stage, commit, push", "Plan file cleanup", "Portability".
The intro line ("/commit is a trigger which executes the Claude skill called commit.") stays
as-is above the table, untouched.

- [x] Replace the 4 paragraph blocks (after the intro line) in `src/content/commit/content.ts`
  with one `table` block, headers `['Step', 'Description']`, rows:
  - `Manual SQL confirmation` — "Runs once the user has tested and is satisfied. First confirms
    any manual database changes for the task have actually been run. Since the plan file where
    that's recorded is about to be deleted, this is the last point where an unconfirmed manual
    step is still tracked anywhere."
  - `Version, stage, commit, push` — "Then: bumps the version, stages and commits everything, not
    just the files the plan mentions. A narrower staging approach once caused a lockfile to go
    uncommitted and broke a production build. Then pushes."
  - `Plan file cleanup` — "Finally removes the plan file from the repo and commits/pushes that
    removal too. The plan's content is preserved permanently in git history from the earlier
    commit; it's just not left lingering as a file in the working tree."
  - `Portability` — "The version bump and build/check gate are Node/npm-specific (package.json's
    version field, a type-check pass, a build pass); a different stack would substitute its own
    version marker and its own check/build step."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 18. Stage 18 — convert the `audit` sub-tab's 3 description paragraphs into a table (2026-07-31)

Same treatment as Stages 16-17, applied to `src/content/audit/content.ts`. Proposed row labels:
"Scope", "Per-project rollout", "Project-isolation exception". The intro line ("/audit is a
trigger which executes the Claude skill called audit.") stays as-is above the table, untouched.

- [x] Replace the 3 paragraph blocks (after the intro line) in `src/content/audit/content.ts`
  with one `table` block, headers `['Step', 'Description']`, rows:
  - `Scope` — "Nextjs-shared-only. Orchestrates a cross-project audit and rollout from a
    shared-package session: audits each consuming project read-only, plans the shared package's
    own changes if needed, then presents a per-project change list for agreement."
  - `Per-project rollout` — "Once a project's changes are agreed, it creates that project's own
    plan file, implements it via that project's own code skill, and commits it via that project's
    own commit skill, all inside that project's own repo."
  - `Project-isolation exception` — "Only possible via a scoped, time-limited exception in the
    project-isolation guard: while an audit is active (capped at 4 hours) and names a project,
    edits into that project are allowed from the shared-package session. Everywhere else, and at
    every other time, project isolation is absolute, no exceptions. The exception is deleted once
    the run ends."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 19. Stage 19 — combine Workflow's Triggers table with the 3 numbered phase sections into one table (2026-07-31)

`src/content/workflow/content.ts`'s short `Triggers` table (Trigger/Skill/Description, one-line
descriptions) duplicates the fuller detail given right below it in "1. Planning phase (/plan)",
"2. Coding phase (/code)" (5 paragraphs), and "3. Commit (/commit)" (1 paragraph) — user: merge
into one table, 3 rows, no duplication. Two mechanical typos get silently fixed along the way
(only one reasonable reading, per the typo-correction precedent): "We are still be in the coding
phase" → "We are still in the coding phase", and "github" → "GitHub" for consistency with its
other use in the same sentence.

- [x] In `src/content/workflow/content.ts`, remove the "1. Planning phase (/plan)", "2. Coding
  phase (/code)", and "3. Commit (/commit)" headings and all their paragraphs. Keep the "Triggers"
  heading and its intro paragraph ("Typing the trigger word...").
- [x] Replace the existing 3-row `Trigger`/`Skill`/`Description` table with one covering the same
  3 rows, but with each Description cell now carrying the fuller merged text (short one-liner
  dropped where the detailed version already covers it):
  - `/plan` / `plan` — "Starts the planning phase: the designer and Claude work together to
    create a plan of what changes are to be made. This is a short written record of what will
    change, agreed before anything is touched. The plan can be iterated on and changed as many
    times as warranted until it's fixed. No code is allowed to change while in planning mode."
  - `/code` / `code` — "Starts the coding phase, and confirms that the planning has completed.
    Claude may prompt with questions or choices that come up during implementation. Any answers
    are written back into the plan itself, not left undocumented. As each part of the plan is
    implemented, it's checked off, until the whole plan is complete. Claude will not allow a
    commit whilst items in the plan have not been checked off during the coding phase. Once
    coding is complete, Claude presents a test plan for the designer to manually test. Testing
    may well reveal changes to the plan and the cycle repeats — we are still in the coding phase.
    It may be that testing reveals a new plan which can be created for implementation at a future
    date, then a new plan file is created."
  - `/commit` / `commit` — "Executes the commit skill. Moves all the code changes to GitHub and
    completes the plan."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 20. Stage 20 — de-duplicate Workflow's Triggers table against Skills → plan/code/commit (2026-07-31)

Stage 19 merged full step-by-step detail into Workflow's `Triggers` table, but that same detail
already lives in Skills → `plan`/`code`/`commit` sub-tabs — real duplication. User: full detail
belongs in the Skills tabs; Workflow can't just have a bare one-liner either, since workflow is
important. Agreed approach: condensed-but-substantive descriptions in Workflow's table (more than
the original one-liner, less than the full merged text), plus a pointer line to the Skills tabs
for full detail. The `Claude Rules` table added in Stage 4 is untouched — not duplicated
elsewhere.

- [x] **Revised 2026-07-31, mid-`#code`:** user caught that the first draft of the `/code` cell
  dropped real facts (Claude prompting with questions and writing answers back into the plan,
  the won't-allow-commit-until-checked-off rule, and testing potentially revealing the need for
  an entirely new plan file) — "nothing should be dropped." Corrected: condense wording/structure
  only, never drop a fact. `/plan` and `/commit` were re-checked against their Stage 19 source
  text and found not to have lost any fact, only wording tightened — left as originally drafted.
  In `src/content/workflow/content.ts`, replace the `Triggers` table's 3 Description cells with:
  - `/plan` / `plan` — "Starts the planning phase: the designer and Claude create a short written
    record of what will change, agreed before anything is touched. Iterated on freely until it's
    fixed. No code changes while in planning mode."
  - `/code` / `code` — "Starts the coding phase once planning is agreed. Claude may prompt with
    questions or choices that come up during implementation, with any answers written back into
    the plan rather than left undocumented. Works through the plan step by step, checking off
    each item as it goes, with no need to pause for confirmation mid-run — that pause already
    happened when the plan was agreed. Won't allow a commit until every item in the plan has been
    checked off. Once every step is complete, presents a test plan for the designer to manually
    verify. Testing may reveal changes to the plan, in which case the cycle repeats within the
    same coding phase; it may also reveal the need for an entirely new plan, to be created and
    implemented at a future date."
  - `/commit` / `commit` — "Executes the commit skill: moves all code changes to GitHub and
    completes the plan."
- [x] Immediately after that table, add one paragraph: "Full step-by-step detail for each of
  these lives in the Skills tab's plan/code/commit sub-tabs."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 21. Stage 21 — convert the `plan` sub-tab's closing 4 items into a table (2026-07-31)

`src/content/plan/content.ts` ends with one un-headed paragraph ("Can be freely amended...") plus
3 heading+paragraph pairs ("Explicit choices: never decide silently", "Constraint values must be
agreed before they're used", "A running Changes log"). User: table this. The first paragraph has
no existing heading, so a row label is invented: "Amendable while in progress". Everything above
this point in the file (intro line, "Creates a plan file..." paragraph, the location/title/
checklist/log `list` block) is untouched.

- [x] Replace the closing paragraph and the 3 heading/paragraph pairs in
  `src/content/plan/content.ts` with one `table` block, headers `['Claude Rules', 'Description']`,
  rows:
  - `Amendable while in progress` — "Can be freely amended for as long as the task is still in
    progress. New steps can be added, existing ones adjusted, right up until execution finishes.
    This is the plan-gate itself: no code change happens without one of these existing first,
    agreed, however small the change."
  - `Explicit choices: never decide silently` — "A genuine judgment call is one a competent
    engineer could reasonably decide differently, not a typo-level fix. When one comes up during
    implementation, it gets surfaced to the user as an explicit choice, rather than silently
    picked and left for the user to discover later by reading the code."
  - `Constraint values must be agreed before they're used` — "Any numeric limit, threshold, cap,
    or similar constant is written into the plan with its actual value and explicitly agreed,
    before it's used in any code. See the Constants sub-tab (under Conventions) for the full
    convention this feeds into."
  - `A running Changes log` — "As each plan step is completed, what actually changed is appended
    to the plan, grouped by file. This is a written record of what was done, readable without
    opening any code file."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 22. Stage 22 — remove the `skillslist` sub-tab (2026-07-31)

User: remove the skillslist tab. Read as removing the dedicated sub-tab from the Skills tab bar —
`/skillslist` is still a live, active trigger, so its row in Skills → Overview's Designer Skill
table ("Combined skill/command catalog" / `/skillslist`) stays; only the standalone detail sub-tab
goes.

- [x] Delete `src/content/skillslist/content.ts`.
- [x] In `src/app/page.tsx`, remove the `skillslistContent` import and the
  `{ label: 'skillslist', content: <ContentSection blocks={skillslistContent} /> }` entry from
  `SkillsTab`'s tabs array.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 23. Stage 23 — convert the `reinstall` sub-tab's command sequence from a code block to a list (2026-07-31)

User: "this is a list, background blue as the others" — referring to the 6-command PowerShell
sequence in `src/content/reinstall/content.ts`, currently a `code` block (gray background,
monospace, untouched by the Stage 10/15 blue styling since those only targeted `table`/`list`
blocks). Converting it to a `list` block picks up the existing blue list styling automatically —
no `ContentSection.tsx` change needed. Note: this trades the code block's monospace/copy-friendly
formatting for plain bulleted text, which is what "this is a list" calls for.

- [x] In `src/content/reinstall/content.ts`, replace the `code` block with a `list` block, items
  being the same 6 lines in the same order: `Remove-Item -Recurse -Force node_modules`,
  `Remove-Item -Force package-lock.json`, `npm install --legacy-peer-deps`,
  `Remove-Item -Recurse -Force .next`, `npx tsc --noEmit`, `npm run build`.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 24. Stage 24 — fold Architecture's content into Shared's Overview, rename the Shared tab to "Architecture" (2026-07-31)

User's final direction (after discussing the reverse merge): move Architecture's 2 sections into
`shared/content.ts` (Overview sub-tab), delete the standalone Architecture tab, and rename the
"Shared" sub-tab label to "Architecture" — so the renamed tab becomes the new home for both the
nextjs-shared package reference and the two general architecture principles.

- [x] Append Architecture's content (both headings and all their paragraphs — "Reusable UI
  components — build once, use many" and "Building custom infrastructure vs. adopting an
  existing package", verbatim) to the end of `src/content/shared/content.ts`, after the existing
  "Consumption discipline" section.
- [x] Delete `src/content/architecture/content.ts`.
- [x] In `src/app/page.tsx`: remove the `architectureContent` import and the
  `{ label: 'Architecture', content: <ContentSection blocks={architectureContent} /> }` entry
  from `ConventionsTab`'s tabs array; rename the remaining `{ label: 'Shared', content: <SharedTab
  /> }` entry's label to `'Architecture'` (component name `SharedTab` and `persistKey`
  `'shared-sub-tabs'` left as-is — internal names, not user-visible, not asked to change).
- [x] Update `src/content/overview/content.ts`'s "What the other tabs cover" table: remove the
  separate Architecture mention from the Conventions row's description and fold it into the
  description of the (renamed) Architecture entry, which now covers both the nextjs-shared
  package reference and the two architecture principles.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 25. Stage 25 — rename the "Style" sub-tab to "Coding-style" (2026-07-31)

- [x] In `src/app/page.tsx`, change `ConventionsTab`'s `{ label: 'Style', content: <ContentSection
  blocks={styleContent} /> }` entry's label to `'Coding-style'` (component/import names left
  as-is).
- [x] Update the "Style" mention in `src/content/overview/content.ts`'s "What the other tabs
  cover" Conventions row to say "Coding-style" instead, matching the rename.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 26. Stage 26 — remove bullets from every list block app-wide (2026-07-31)

User: remove the bullet points from the reinstall command list. Since `ContentSection.tsx` has
one shared renderer for every `list` block (currently used by `reinstall` and the `plan` sub-tab's
4-item list), user confirmed: apply app-wide rather than adding a per-block option.

- [x] In `src/components/ContentSection.tsx`, change the list's `<ul>` className from
  `list-disc pl-5 space-y-1` to `list-none space-y-1` (drop the `pl-5` left-padding too, since
  it exists to make room for bullet markers that no longer render).
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 27. Stage 27 — combine 5 Architecture → Overview sections into one table, moved to the top (2026-07-31)

User: combine "Why it exists" + "What it owns" with "Consumption discipline" + "Reusable UI
components — build once, use many" + "Building custom infrastructure vs. adopting an existing
package" into one table, moved to the top. Read as: one 5-row table, placed right after the
existing intro paragraph (which stays first) and before "Where this shows up elsewhere in this
setup" (which stays where it is, after the new table, since it wasn't named in the combine
request). Each row's Description cell combines that section's paragraph(s) verbatim.

- [x] In `src/content/shared/content.ts`, remove the 5 heading/paragraph(s) blocks for "Why it
  exists", "What it owns", "Consumption discipline", "Reusable UI components — build once, use
  many", and "Building custom infrastructure vs. adopting an existing package" (in their current
  positions — the first two sit before "Where this shows up elsewhere", the other three sit
  after it).
- [x] Insert one `table` block immediately after the intro paragraph (before "Where this shows up
  elsewhere in this setup"), headers `['Topic', 'Description']`, rows:
  - `Why it exists` — "One place to fix a bug or add a feature benefits every consuming project
    at once, instead of the same code being copied and maintained separately in each. This only
    pays off once there's more than one project sharing it. A solo, single-project setup gets no
    benefit from splitting anything out this way."
  - `What it owns` — "Generic database functions every consuming project uses instead of writing
    raw queries directly, a small set of shared primitive components (see the Components tab) and
    full UI panels (see the UI Components tab), its own database tables and a per-user
    server-side cache (see the Tables tab), and a shared logging table (see the Logging tab)."
  - `Consumption discipline` — the 3 existing paragraphs joined: "A consuming project's own
    session reads this package's own reference document at the start of every session, rather
    than relying on memory of its API from an earlier session, since the package can change
    between sessions. Before implementing a utility function locally in a consuming project, the
    question is asked: would this be useful in more than one project, with no project-specific
    dependencies? If yes, adding it to the shared package is proposed first, instead of writing a
    local copy that every other project then has to duplicate independently if it turns out to
    need the same thing. If an existing shared component or function almost fits a requirement
    but can't quite satisfy it, the gap is noted and an amendment to the shared package is
    proposed — typically a new opt-in option that defaults to the current behavior, so existing
    consumers are unaffected — rather than working around the gap with one-off local code. The
    same one-place-to-fix-it reasoning that justifies having a shared package at all is undermined
    if every near-miss gets quietly patched around locally instead of fed back into the shared
    source."
  - `Reusable UI components — build once, use many` — the 2 existing paragraphs joined: "When a
    control's choices are a hardcoded value list (a dropdown, a toggle-button group, a
    multi-select filter) and that same choice set is likely needed in more than one place, it's
    extracted into a reusable component up front, rather than inlining the option list at each
    call site again. The component owns the option list as a named constant, a default selected
    value where relevant, and a prop that lets an individual call site override the list when it
    genuinely needs a different one. This doesn't apply to a genuinely single-use, one-off
    control tightly coupled to its surrounding logic. It applies once the same value set is used,
    or is clearly about to be used, in more than one place: at that point a duplicated option
    list stops being a convenience and starts being a maintenance liability, since a value added
    to one copy but not the others silently diverges without anything flagging the
    inconsistency."
  - `Building custom infrastructure vs. adopting an existing package` — the 3 existing paragraphs
    joined: "Before writing custom logic of real complexity — a parser, a rendering engine, a
    scheduling or recurrence algorithm, a diffing routine, a state machine, a validation layer,
    anything where getting the edge cases right is itself the hard part — the question is asked
    first: does a mature, widely-used package already do this well? If one plausibly does, it's
    named and agreed explicitly before writing custom code instead of using it. The trigger is
    genuine complexity or edge-case risk, not a fixed list of named domains — markdown rendering,
    diagramming, and charting are examples that satisfy the test, not the boundary of it. \"It's
    simple enough to hand-roll\" or \"this gives more control over the format\" are not, on their
    own, sufficient reasons to skip this: they have to be stated and agreed as the actual reason
    for going custom, the same way any other judgment call gets surfaced rather than resolved
    silently. Genuinely mechanical logic — a one-line date format, a basic string transform —
    doesn't need this treatment. The failure mode this guards against: hand-building something a
    mature library already solves well, only to have the hand-built version turn out limited
    enough that it eventually gets abandoned and rewritten using the library that should have
    been adopted from the start. That outcome recurring more than once, independently, in more
    than one place, is strong evidence the original custom build was the wrong call to begin with
    — not just a stylistic preference after the fact."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 28. Stage 28 — fold the "Where this shows up elsewhere" heading into its table's column header (2026-07-31)

User: replace that table's `Where` column header with the full heading text, and remove the
standalone heading above it.

- [x] In `src/content/shared/content.ts`, remove the `{ type: 'heading', text: 'Where this shows
  up elsewhere in this setup' }` block, and change the table immediately below it from
  `headers: ['Where', 'Description']` to `headers: ['Where this shows up elsewhere in this
  setup', 'Description']`. Rows unchanged.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 29. Stage 29 — shorten a row label in Architecture → Overview's Topic table (2026-08-01)

- [x] In `src/content/shared/content.ts`, change the `Topic` table row label
  `'Reusable UI components — build once, use many'` to `'Reusable UI components'`. Description
  cell unchanged.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 30. Stage 30 — split the "Building custom infrastructure vs. adopting an existing package" row into 2 (2026-08-01)

Split by the two options themselves, not by rule-vs-rationale: rule + failure-mode rationale under
"Adopting an existing package"; scope/trigger criteria under "Building custom infrastructure".

- [x] In `src/content/shared/content.ts`'s `Topic` table, replace the single row
  `'Building custom infrastructure vs. adopting an existing package'` with 2 rows:
  - `Adopting an existing package` — "Before writing custom logic of real complexity — a parser,
    a rendering engine, a scheduling or recurrence algorithm, a diffing routine, a state machine,
    a validation layer, anything where getting the edge cases right is itself the hard part — the
    question is asked first: does a mature, widely-used package already do this well? If one
    plausibly does, it's named and agreed explicitly before writing custom code instead of using
    it. The failure mode this guards against: hand-building something a mature library already
    solves well, only to have the hand-built version turn out limited enough that it eventually
    gets abandoned and rewritten using the library that should have been adopted from the start.
    That outcome recurring more than once, independently, in more than one place, is strong
    evidence the original custom build was the wrong call to begin with — not just a stylistic
    preference after the fact."
  - `Building custom infrastructure` — "The trigger for checking first is genuine complexity or
    edge-case risk, not a fixed list of named domains — markdown rendering, diagramming, and
    charting are examples that satisfy the test, not the boundary of it. \"It's simple enough to
    hand-roll\" or \"this gives more control over the format\" are not, on their own, sufficient
    reasons to skip this: they have to be stated and agreed as the actual reason for going
    custom, the same way any other judgment call gets surfaced rather than resolved silently.
    Genuinely mechanical logic — a one-line date format, a basic string transform — doesn't need
    this treatment."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 31. Stage 31 — split Coding-style into 7 sub-tabs (2026-08-01)

`src/content/style/content.ts`'s 7 sections (Comment format, Function declaration style, File
structure, Async conventions, Layout conventions, Filter placement, TypeScript conventions) become
one sub-tab each, mirroring the existing Skills/Shared nested-tab-bar pattern (a `CodingStyleTab`
component, `persistKey='coding-style-sub-tabs'`). No new content invented — each new file gets
exactly that section's existing heading text (dropped, since it becomes the tab label) and
paragraph(s)/table/code blocks, unchanged.

- [x] Create 7 new content files, each with that section's existing blocks (heading removed,
  since the tab label replaces it):
  - `src/content/style-comments/content.ts` — Comment format's paragraph, code block, paragraph.
  - `src/content/style-functions/content.ts` — Function declaration style's paragraph.
  - `src/content/style-file-structure/content.ts` — File structure's table.
  - `src/content/style-async/content.ts` — Async conventions' paragraph and code block.
  - `src/content/style-layout/content.ts` — Layout conventions' paragraph.
  - `src/content/style-filters/content.ts` — Filter placement's paragraph.
  - `src/content/style-typescript/content.ts` — TypeScript conventions' table.
- [x] Delete `src/content/style/content.ts` (fully superseded by the 7 files above).
- [x] In `src/app/page.tsx`: remove the `styleContent` import, add the 7 new imports, add a new
  `CodingStyleTab` component (same shape as `SkillsTab`/`SharedTab`) with sub-tabs labeled
  `Comments`, `Functions`, `File structure`, `Async`, `Layout`, `Filters`, `TypeScript` in that
  order, and change `ConventionsTab`'s `Coding-style` entry to render `<CodingStyleTab />` instead
  of `<ContentSection blocks={styleContent} />`.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 32. Stage 32 — split Naming into 6 sub-tabs (2026-08-01)

Same treatment as Stage 31, applied to `src/content/naming/content.ts`. Its leading un-headed
paragraph (the "core idea" statement) becomes an `Overview` sub-tab, matching the existing
Skills/Shared pattern; the 5 headed sections become 5 more sub-tabs. No new content invented —
each new file gets exactly that section's existing blocks (heading dropped, since it becomes the
tab label), unchanged. New component: `NamingTab`, `persistKey='naming-sub-tabs'`.

- [x] Create 6 new content files:
  - `src/content/naming-overview/content.ts` — the leading "core idea" paragraph.
  - `src/content/naming-database/content.ts` — "Database naming"'s 2 paragraphs and table.
  - `src/content/naming-sql/content.ts` — "SQL conventions"'s paragraph and table.
  - `src/content/naming-column-reorder/content.ts` — "Inserting or reordering a column"'s
    paragraph.
  - `src/content/naming-dd-enforcement/content.ts` — "Enforcement of DD identifiers"'s paragraph
    and table.
  - `src/content/naming-component-props/content.ts` — "A separate convention specific to this
    setup's shared UI component package"'s paragraph and table.
- [x] Delete `src/content/naming/content.ts` (fully superseded by the 6 files above).
- [x] In `src/app/page.tsx`: remove the `namingContent` import, add the 6 new imports, add a new
  `NamingTab` component (same shape as `SkillsTab`/`SharedTab`) with sub-tabs labeled `Overview`,
  `Database naming`, `SQL conventions`, `Column reorder`, `DD enforcement`, `Component props` in
  that order, and change `ConventionsTab`'s `Naming` entry to render `<NamingTab />` instead of
  `<ContentSection blocks={namingContent} />`.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 33. Stage 33 — restructure Naming and Coding-style sub-tabs (2026-08-01)

Three changes: fold Naming's Overview into Database naming; delete the Column reorder sub-tab
entirely (user confirmed: delete, don't relocate); move Restrictions from a top-level Conventions
sub-tab into a new sub-tab of Coding-style.

- [x] In `src/content/naming-database/content.ts`, prepend `naming-overview/content.ts`'s single
  paragraph (the "core idea" statement) before the existing "Postgres-specific..." paragraph.
- [x] Delete `src/content/naming-overview/content.ts`.
- [x] Delete `src/content/naming-column-reorder/content.ts` (its 4-step backup/drop/recreate/
  copy-back content is dropped from the doc entirely, per user confirmation).
- [x] In `src/app/page.tsx`: remove the `namingOverviewContent` and `namingColumnReorderContent`
  imports; remove the `Overview` and `Column reorder` entries from `NamingTab`'s tabs array
  (leaving `Database naming`, `SQL conventions`, `DD enforcement`, `Component props`).
- [x] In `src/app/page.tsx`: remove the `{ label: 'Restrictions', content: <ContentSection
  blocks={restrictionsContent} /> }` entry from `ConventionsTab`'s tabs array, and add it as a new
  entry (same label, same content) at the end of `CodingStyleTab`'s tabs array.
- [x] Update `src/content/overview/content.ts`'s "What the other tabs cover" Conventions row:
  drop the standalone "Restrictions" mention, fold it into the Coding-style description instead.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 34. Stage 34 — move "Projects are discovered, never hardcoded" from Workspace to Skills → audit (2026-08-01)

User: this is part of the `/audit` skill, not the Workspace tab. Moves the heading and its 2
paragraphs out of `workspace/content.ts` entirely, into `audit/content.ts`'s existing
`Step`/`Description` table as a new row, combining both paragraphs into one Description cell.

- [x] In `src/content/workspace/content.ts`, remove the `{ type: 'heading', text: 'Projects are
  discovered, never hardcoded' }` block and its 2 paragraphs entirely. Also update the tab's
  leading "CLAUDE.md" intro paragraph, which lists "don't hardcode what can be discovered" as one
  of the tab's 3 disciplines — drop that clause now that the section it describes has moved out,
  leaving the other two ("keep a durable written record of open work", "know exactly what Claude
  is and isn't allowed to touch").
- [x] In `src/content/audit/content.ts`'s table, add a new row (position: first, before "Scope",
  since project discovery is what the audit scans before anything else):
  - `Project discovery` — "The list of projects is never written down as a fixed array anywhere.
    It's discovered by scanning a known parent directory for subdirectories that look like a
    project (e.g. contain a package.json). If a directory shouldn't be treated as a project, it's
    moved out of that parent directory rather than added to an exclusion list. A separate,
    differently-located parent directory holds projects that aren't pushed to a shared code host.
    This is the same principle as never hardcoding a real-world list without confirmation (see
    Conventions → Coding-style → Restrictions), applied to the one list important enough to
    enforce structurally instead of just by convention: derive it from the filesystem, every
    time, rather than letting a written-down copy drift out of date." (cross-reference path
    updated from "Conventions → Restrictions" to match Stage 33's move of Restrictions under
    Coding-style)
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 35. Stage 35 — fold each skill sub-tab's "/X is a trigger..." intro line into a table (2026-08-01)

`plan` gets a new 2-row table (it has no existing `Step`/`Description` table to fold into —
its only table is the Stage 21 "Claude Rules" one, which is a different kind of content).
`code` and `commit` each already have a `Step`/`Description` table (Stages 16-17); the intro line
folds into each as a new first row using the existing headers.

- [x] In `src/content/plan/content.ts`, replace the 2 paragraphs and the `list` block ("Creates a
  plan file...", the location/title/checklist/log items) with one new `table` block, headers
  `['Topic', 'Description']`, placed where they currently sit (before the existing "Claude Rules"
  table), 2 rows:
  - `/plan` — "/plan is a trigger which executes the Claude skill called plan."
  - `Create plan` — "Creates a plan file in a fixed location in the repo. If an unfinished plan
    file already exists for the project, a new one isn't created alongside it. The existing one
    is amended or continued instead. The file contains: Location: docs/PLAN_<slug>.md; a title; a
    checklist of what will change; an empty log section."
- [x] In `src/content/code/content.ts`, remove the leading paragraph ("/code is a trigger which
  executes the Claude skill called code.") and add it as a new first row in the existing
  `Step`/`Description` table: `/code` — "/code is a trigger which executes the Claude skill
  called code." (before `Plan file requirement`).
- [x] In `src/content/commit/content.ts`, remove the leading paragraph ("/commit is a trigger
  which executes the Claude skill called commit.") and add it as a new first row in the existing
  `Step`/`Description` table: `/commit` — "/commit is a trigger which executes the Claude skill
  called commit." (before `Manual SQL confirmation`).
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 36. Stage 36 — remove 2 paragraphs from Naming → Database naming (2026-08-01)

- [x] In `src/content/naming-database/content.ts`, remove the 2 paragraphs "Postgres-specific,
  but the discipline transfers. Every table gets a 3-character code, unique across the whole
  schema; every column in that table is prefixed with the same code." and "Tables owned by the
  shared package use x instead of t as the first character (e.g. xlg_logging, columns lg_*),
  specifically to avoid clashing with any consuming project's own table names." Leaves the "core
  idea" paragraph (merged in via Stage 33) followed directly by the What/Pattern/Example/
  Description table.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes
### src/content/naming-database/content.ts, src/content/naming-overview/content.ts (deleted), src/content/naming-column-reorder/content.ts (deleted), src/app/page.tsx, src/content/overview/content.ts (Stage 33)
- Folded Naming's "Overview" paragraph into the top of "Database naming"; deleted the Overview
  sub-tab file. Deleted the "Column reorder" sub-tab and its content entirely (per user
  confirmation — not relocated). `NamingTab` now has 4 sub-tabs: Database naming, SQL
  conventions, DD enforcement, Component props. Moved "Restrictions" from a top-level
  Conventions sub-tab into `CodingStyleTab` as its 8th sub-tab; `ConventionsTab` now has 4
  sub-tabs: Naming, Constants, Coding-style, Architecture. Updated Overview's "What the other
  tabs cover" table to match.
### src/content/shared/content.ts (Stages 29-30)
- Shortened "Reusable UI components — build once, use many" to "Reusable UI components". Split
  "Building custom infrastructure vs. adopting an existing package" into 2 rows: "Adopting an
  existing package" (the check-first rule + failure-mode rationale) and "Building custom
  infrastructure" (scope/trigger criteria).

### src/content/style-*/content.ts (7 new files), src/content/style/content.ts (deleted), src/app/page.tsx (Stage 31)
- Split the monolithic Coding-style content into 7 sub-tab files (Comments, Functions, File
  structure, Async, Layout, Filters, TypeScript), added a `CodingStyleTab` component
  (`persistKey='coding-style-sub-tabs'`), and wired it into `ConventionsTab`'s `Coding-style`
  entry in place of the flat `ContentSection`.

### src/content/naming-*/content.ts (6 new files), src/content/naming/content.ts (deleted), src/app/page.tsx (Stage 32)
- Split the monolithic Naming content into 6 sub-tab files (Overview, Database naming, SQL
  conventions, Column reorder, DD enforcement, Component props), added a `NamingTab` component
  (`persistKey='naming-sub-tabs'`), and wired it into `ConventionsTab`'s `Naming` entry in place
  of the flat `ContentSection`.
### src/content/shared/content.ts (Stages 27-28)
- Removed 5 heading/paragraph(s) blocks (Why it exists, What it owns, Consumption discipline,
  Reusable UI components, Building custom infrastructure) and replaced them with one 5-row
  `Topic`/`Description` table placed right after the intro paragraph. Removed the "Where this
  shows up elsewhere in this setup" heading and folded its text into that table's first column
  header, replacing `Where`.
### src/components/ContentSection.tsx (Stage 26)
- Removed bullets from every rendered `list` block: `<ul>` className changed from
  `list-disc pl-5 space-y-1` to `list-none space-y-1`. Applies app-wide (reinstall's command
  list, the plan sub-tab's 4-item list).
### src/content/shared/content.ts, src/content/architecture/content.ts (deleted), src/app/page.tsx, src/content/overview/content.ts (Stage 24)
- Appended Architecture's 2 sections (reusable-components, custom-vs-package) to the end of
  `shared/content.ts`. Deleted `architecture/content.ts`. In `page.tsx`, removed the standalone
  Architecture tab entry and its import, and renamed the `Shared` sub-tab's label to
  `Architecture` (component/persistKey names left as `SharedTab`/`shared-sub-tabs`). Updated
  Overview's "What the other tabs cover" table to describe the merged tab.

### src/app/page.tsx, src/content/overview/content.ts (Stage 25)
- Renamed the `Style` sub-tab's label to `Coding-style` (component/import names unchanged).
  Updated the matching mention in Overview's "What the other tabs cover" table.

### src/content/skillslist/content.ts (Stage 22, deleted)
- Removed the `skillslist` sub-tab entirely: deleted the content file, removed its import and
  tab entry from `src/app/page.tsx`'s `SkillsTab`. The Designer Skill table's "Combined
  skill/command catalog" / `/skillslist` row is untouched — the trigger is still active.

### src/content/reinstall/content.ts (Stage 23)
- Replaced the 6-command `code` block with a `list` block (same 6 lines, same order), which
  picks up the existing blue list background automatically.

### src/content/plan/content.ts (Stage 21)
- Replaced the closing un-headed paragraph and 3 heading/paragraph pairs with one
  `Claude Rules`/`Description` table, 4 rows (Amendable while in progress, Explicit choices,
  Constraint values, A running Changes log). Everything above that point in the file untouched.

### src/content/workflow/content.ts (Stage 20)
- Condensed the `Triggers` table's `/plan` and `/commit` Description cells (wording tightened,
  no facts dropped). Rewrote `/code`'s cell to keep every fact from Stage 19 while restructuring
  for flow, after the first draft was caught dropping some (question-prompting, the
  won't-commit-until-checked-off rule, testing revealing the need for a new plan). Added a
  pointer paragraph directly after the table: "Full step-by-step detail for each of these lives
  in the Skills tab's plan/code/commit sub-tabs."

### src/content/workflow/content.ts (Stage 19)
- Removed the "1. Planning phase (/plan)", "2. Coding phase (/code)", and "3. Commit (/commit)"
  headings and their paragraphs (7 paragraphs total). Merged their content into the existing
  `Triggers` table's Description cells instead, eliminating the duplication between the short
  table and the detailed sections below it. Fixed two mechanical typos along the way ("We are
  still be in" → "We are still in", "github" → "GitHub").

### src/content/skills/content.ts
- Added: check-for-a-skill-first rule, the `/commands` trigger, COMMANDS.md-sync rule, and the
  no-backtick-quoting-for-user-facing-commands convention.

### src/content/workspace/content.ts (new file)
- New tab: projects discovered by scanning a directory (never hardcoded), the two-file
  project-tracking system and why the plan file lives outside the hidden config directory, and
  project isolation as a fully-explained standalone section (the hard boundary, the enforcing
  hook, the known Bash/PowerShell gap, and the two named application-feature exceptions).

### src/content/shared/content.ts
- Added a "Consumption discipline" section: read the shared package's own reference doc each
  session, propose shared placement before implementing a reusable function locally, propose
  amending a near-fit shared component rather than working around it.

### src/content/workflow/content.ts
- Added: verify-a-plan-before-executing, never-assume-which-environment-is-meant, a
  manual-replica-must-match-a-scheduled-process-exactly, never-prompt-the-user-to-commit, and
  capture-everything-into-the-plan-during-testing.

### src/content/architecture/content.ts (new file)
- New Conventions sub-tab: reusable-UI-components (build once, use many), and the
  building-custom-infrastructure-vs-adopting-a-package hard-stop rule.

### src/content/restrictions/content.ts (new file)
- New Conventions sub-tab: the full "never without being asked" list (comments, renames,
  restructuring, speculative abstractions, destructive SQL, manual-only DB changes, no migration
  scripts, single schema-file source of truth, hardcoded real-world lists, assign-then-return,
  framework-implicit-import noise, dedicated version-pinning tool).

### src/content/style/content.ts (new file)
- New Conventions sub-tab: comment/function-header format, function-declaration/hoisting style,
  file structure, async conventions, layout conventions, filter-placement convention, TypeScript
  conventions.

### src/content/shared-logging/content.ts
- Added a "How application code writes to it" section: message-format convention (consequence
  first, then the underlying error) and the E/W/I severity table.

### src/content/shared-tables/content.ts
- Added the maintenance/pipeline `skipCache: true` rule alongside the existing cache section.

### src/content/naming/content.ts
- Added a "SQL conventions" section (identity columns over legacy auto-increment, no
  `table.column` notation except self-joins, no foreign keys, no `CASCADE`) and an
  "Inserting or reordering a column" section (the 4-step backup/drop/recreate/copy-back process).

### src/app/page.tsx
- Wired in the new top-level Workspace tab and the three new Conventions sub-tabs (Architecture,
  Restrictions, Style).

### src/content/overview/content.ts
- Updated the "What the other tabs cover" table to mention Workspace and the three new
  Conventions sub-tabs.

### docs/PLAN_son-claude-guide.md, docs/PLAN_stage2-owner-page.md, docs/PLAN_stage2-home-tabs.md, docs/PLAN_trigger-terminology.md
- Consolidated into this single file, per user instruction. Completed work is not repeated here
  (preserved in git history via the commit that included each source plan); only open items carry
  forward. All 4 source files deleted.

### src/app/owner/page.tsx, src/app/owner/layout.tsx
- Deleted. This route only displayed the `xlg_logging` table via `OwnerTableLogging`; nothing in
  the project ever wrote to that table, so the feature was removed rather than provisioning a
  database for it.

### scripts/schema.sql
- Removed the `xlg_logging` table DDL (the file's only content) — now empty.

### src/app/layout.tsx
- Removed the `DevLayoutHeader` import and its `IS_DEV`-gated render, and the `IS_DEV`/`DB_LOCATION`
  consts. `DevLayoutHeader` always renders an "Owner" link to `/owner`, which no longer exists in
  this project — keeping it would mean shipping a dead link with no way to suppress just that part
  of the component.

### .env, .env.locallocal
- Removed the `local_claude_setup` Postgres connection variables (`POSTGRES_URL`,
  `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE`,
  `POSTGRES_DATABASE_LOCATION`) — nothing in the project uses a database anymore. Then, once
  `DevLayoutHeader` was also removed, the remaining `NEXT_PUBLIC_APPENV_ISDEV`/`DBHANDLER`/`LOG_I`
  vars lost their last real consumer too — removed those as well. Both files are now empty.

### src/content/workflow/content.ts (Stage 4)
- Replaced the 5 `heading`/`paragraph` block pairs added in Stage 3 ("Verify a plan before
  executing it" through "During a testing/iteration phase, capture everything into the plan")
  with a single table, headers `Claude Rules` / `Description`, one row per rule, text unchanged.

### src/content/skills/content.ts (Stages 5 and 6)
- Removed the stale `#tested` paragraph — that trigger is no longer active.
- Removed "The /commands trigger" heading/paragraph — `/commands` was deactivated entirely (see
  below). "Keeping the catalog in sync" was left in place since it's an independent rule.

### ~/.claude/CLAUDE.md, ~/.claude/COMMANDS.md (Stage 6, outside this project — Claude's own global working files, no plan-gate)
- Removed the "Trigger: `/commands`" section from `~/.claude/CLAUDE.md`.
- Removed the `## /commands` section from `~/.claude/COMMANDS.md` and added a `## History` entry
  recording the removal (`/skillslist` already covers the same need).

### src/content/shared-logging/content.ts (Stage 7)
- Removed the Severity/Meaning table and the `CREATE TABLE public.xlg_logging` code block added
  in Stage 3 — both duplicated information already present earlier in the same file.

### src/content/workspace/content.ts (Stage 8)
- Added a `CLAUDE.md` heading directly above the tab's opening paragraph.

### src/components/ContentSection.tsx (Stage 9)
- Wrapped the rendered `<ul>` (list blocks) and `<table>` (table blocks) each in a container div
  with `border border-gray-200 rounded bg-gray-50 p-3` (plus `overflow-x-auto` on the table
  wrapper), matching the existing `code` block's box styling. Applies to every tab at once, since
  this is the single shared renderer.

### src/components/ContentSection.tsx (Stage 10)
- Table wrapper background changed `bg-gray-50` → `bg-blue-50`; header row (`<tr>` inside
  `<thead>`) gained a `bg-blue-200` fill (previously just a bottom border, no fill). List boxes
  (Stage 9) are untouched, still gray.
- Table wrapper changed from a stretching block element to `inline-block max-w-full`, so the
  colored box now shrinks to the table's actual rendered width instead of always spanning the
  full available width — consistent with the header's own width-restricted columns.
  `overflow-x-auto` retained for genuinely wide tables.

### src/content/skills/content.ts (Stages 11 and 12)
- Removed the "Executable commands (the designer types these)" heading; renamed that table's
  `Skill` header to `Designer Skill`.
- Removed the "For Claude (no fixed trigger; recognized from the situation)" heading; renamed
  that table's `Skill` header to `Claude Skill`.

### src/content/claude/content.ts (Stage 13)
- Replaced the 5 heading+paragraph(s) entries (noprompt, safe-install, new-project, db-naming,
  onboarding) with one intro paragraph ("None of these have a fixed trigger; each runs
  automatically, matching the situation.") plus a single table, headers `Claude Skill` /
  `Description`. Each of the 4 non-`noprompt` rows dropped its repeated "there is no fixed
  trigger for X" sentence in favor of the shared intro line; `noprompt`'s row instead notes
  inline that it's the exception, since it does have a real trigger (`/noprompt`).

### src/content/skills/content.ts, src/content/claude/content.ts (Stage 14)
- Expanded the "Permission exception" row's Notes cell in `skills/content.ts` with the fuller
  `/noprompt` description, then removed the now-redundant `noprompt` row from
  `claude/content.ts` entirely (it has a real trigger, so it didn't belong among the
  no-fixed-trigger skills). Simplified the Claude sub-tab's intro line back to a plain statement
  now that all remaining rows genuinely have no fixed trigger.

### src/components/ContentSection.tsx (Stage 15)
- List wrapper background changed `bg-gray-50` → `bg-blue-50`, matching the table boxes.

### src/content/code/content.ts (Stage 16)
- Replaced the 3 sequential description paragraphs with a `Step`/`Description` table (rows:
  Plan file requirement, Execution, Completion). Intro line left untouched.

### src/content/commit/content.ts (Stage 17)
- Replaced the 4 sequential description paragraphs with a `Step`/`Description` table (rows:
  Manual SQL confirmation, Version/stage/commit/push, Plan file cleanup, Portability). Intro
  line left untouched.

### src/content/audit/content.ts (Stage 18)
- Replaced the 3 sequential description paragraphs with a `Step`/`Description` table (rows:
  Scope, Per-project rollout, Project-isolation exception). Intro line left untouched.

### 37. Stage 37 — remove 3 more content blocks (Overview x2, Workspace x1) (2026-08-01)

Three separate removal requests that arrived after Stage 34-36's `#code` run had already started,
so queued here for their own `#code`.

- [x] In `src/content/overview/content.ts`, remove the 3 leading paragraphs ("This is a
  description of a working Claude Code setup...", "Nothing here is filtered by audience or tech
  stack...", "Each section below documents two things together..."), leaving the tab starting
  directly with the "What the other tabs cover" heading and table.
- [x] In `src/content/overview/content.ts`, remove the "Where this UI itself came from" heading
  and its paragraph entirely.
- [x] In `src/content/workspace/content.ts`, remove the paragraph "The plan file deliberately
  does not live in the same hidden config directory as the permanent instructions file..." (the
  permission-glob rationale), leaving "Two files track each project"'s table followed directly by
  "Project isolation — a hard boundary".
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 38. Stage 38 — tighten "Project isolation — a hard boundary" and add the missing /audit exception (2026-08-01)

User: the current 3-paragraph version is too verbose, and omits `/audit`'s own scoped, time-
limited exception to the isolation boundary — an important detail already documented in Skills →
audit's "Project-isolation exception" row but never cross-referenced or mentioned here.

- [x] In `src/content/workspace/content.ts`, replace the 3 paragraphs under "Project isolation —
  a hard boundary" with these 2:
  - "Claude may read anything on the machine, but may only write, edit, or delete files inside
    the project currently being worked in — no exception, not even for the shared package every
    other project depends on. A hook enforces this at the tool layer, blocking any file-edit
    whose target resolves outside the current project. Known gap: a shell command writing via
    redirection or a copy/move isn't covered by the hook, only guarded by instruction."
  - "Three things cross this boundary without being an exception to the rule: a version-pinning
    tool and a database-admin project, both human-triggered through their own product features
    rather than Claude acting on its own initiative; and /audit's own scoped, time-limited
    exception (capped at 4 hours, naming one specific project), which temporarily allows edits
    into that named project from a shared-package session — see Skills → audit for the full
    mechanism."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 39. Stage 39 — fold Global CLAUDE.md into the tracking table, remove the standalone CLAUDE.md intro (2026-08-01)

User: add a "Global CLAUDE.md" row as the table's first row; rename the existing "A project-
specific instructions file" row to "Project CLAUDE.md" (paralleling the new row's naming); remove
the standalone "CLAUDE.md" heading and its scenario-specific paragraph entirely, since that intro
content is superseded by the new table row. The table now covers 3 things, not 2, so its heading
also needs updating — proposed: "Three files, three scopes" (a judgment call, open to adjustment).

- [x] In `src/content/workspace/content.ts`, remove the `{ type: 'heading', text: 'CLAUDE.md' }`
  block and its "Scenario-specific: this setup manages several separate projects..." paragraph
  entirely — the tab will now open directly with the tracking-table heading.
- [x] Rename the `{ type: 'heading', text: 'Two files track each project' }` block to `'Three
  files, three scopes'`.
- [x] In that table, add a new first row: `['Global CLAUDE.md', 'Permanent', 'Applies to every
  project in this shared, multi-project workspace — instructions that aren't project-specific']`.
- [x] Rename the existing `'A project-specific instructions file'` row to `'Project CLAUDE.md'`
  (Lifetime and Purpose cells unchanged).
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes (Stage 39)
### src/content/workspace/content.ts (Stage 39)
- Removed the standalone "CLAUDE.md" heading and its scenario-specific intro paragraph. Renamed
  the tracking table's heading to "Three files, three scopes" and added a "Global CLAUDE.md" row
  as the first row; renamed the existing "A project-specific instructions file" row to "Project
  CLAUDE.md". Table now has 3 rows: Global CLAUDE.md, Project CLAUDE.md, A plan file.

### 40. Stage 40 — remove the "Three files, three scopes" heading (2026-08-01)

- [x] In `src/content/workspace/content.ts`, remove the `{ type: 'heading', text: 'Three files,
  three scopes' }` block (added in Stage 39). The tab now opens directly with the tracking table
  itself, no heading above it.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 41. Stage 41 — convert the Project isolation section into a table (2026-08-01)

Turns the "Project isolation" heading + its 2 paragraphs into one table, 2 rows (the rule itself,
then the exceptions), headers `['Topic', 'Description']` to match the pattern already used
elsewhere in this doc (e.g. Architecture → Overview).

- [x] In `src/content/workspace/content.ts`, remove the `{ type: 'heading', text: 'Project
  isolation' }` block and its 2 paragraphs, replacing them with one `table` block, headers
  `['Topic', 'Description']`, rows:
  - `Project isolation` — "Claude may read anything on the machine, but may only write, edit, or
    delete files inside the project currently being worked in. A hook enforces this at the tool
    layer, blocking any file-edit whose target resolves outside the current project. Known gap: a
    shell command writing via redirection or a copy/move isn't covered by the hook, only guarded
    by instruction."
  - `Exceptions` — "Three things cross this boundary without being an exception to the rule: a
    version-pinning tool and a database-admin project, both human-triggered through their own
    product features rather than Claude acting on its own initiative; and /audit's own scoped,
    time-limited exception (capped at 4 hours, naming one specific project), which temporarily
    allows edits into that named project from a shared-package session — see Skills → audit for
    the full mechanism."
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes (Stages 40-41)
### src/content/workspace/content.ts (Stage 40)
- Removed the "Three files, three scopes" heading (added in Stage 39) — the tab now opens
  directly with the tracking table.

### src/content/workspace/content.ts (Stage 41)
- Replaced the "Project isolation" heading and its 2 paragraphs with one `Topic`/`Description`
  table, 2 rows (`Project isolation`, `Exceptions`).

### 42. Stage 42 — reword "a fixed location in the repo" to "in the docs folder" (2026-08-01)

- [x] In `src/content/plan/content.ts`'s `Create plan` row, change "Creates a plan file in a
  fixed location in the repo." to "Creates a plan file in the docs folder." Rest of the cell text
  unchanged.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes (Stage 42)
### src/content/plan/content.ts (Stage 42)
- Reworded "Creates a plan file in a fixed location in the repo." to "Creates a plan file in the
  docs folder." in the `Create plan` row.

### 43. Stage 43 — mirror src/content/'s directory structure to the tab structure exactly (2026-08-01)

Right now `src/content/` is flat — a nested sub-tab's file (e.g. `plan`, `code`, the `naming-*`
and `style-*` prefixed ones) sits as a top-level sibling directory rather than nested under its
parent tab's folder, so finding "which file backs which tab" requires checking `page.tsx`'s
wiring rather than just the folder path. This moves every nested sub-tab's content file into its
parent tab's folder, renaming directories to drop the now-redundant prefix, and updates every
import path in `page.tsx` to match. No content changes — purely a file-location and import-path
move. Import variable names (aliases) in `page.tsx` stay the same; only the path string changes.

Final structure:
```
src/content/
  overview/
  workspace/
  workflow/
  skills/
    overview/          (was src/content/skills/)
    plan/               (was src/content/plan/)
    code/               (was src/content/code/)
    commit/             (was src/content/commit/)
    audit/              (was src/content/audit/)
    reinstall/          (was src/content/reinstall/)
    claude/             (was src/content/claude/)
  permissions/
  conventions/
    naming/
      database/         (was src/content/naming-database/)
      sql/               (was src/content/naming-sql/)
      dd-enforcement/    (was src/content/naming-dd-enforcement/)
      component-props/   (was src/content/naming-component-props/)
    constants/
    coding-style/
      comments/          (was src/content/style-comments/)
      functions/         (was src/content/style-functions/)
      file-structure/    (was src/content/style-file-structure/)
      async/             (was src/content/style-async/)
      layout/            (was src/content/style-layout/)
      filters/           (was src/content/style-filters/)
      typescript/        (was src/content/style-typescript/)
      restrictions/      (was src/content/restrictions/ — top-level; moves here since
                           Restrictions became a Coding-style sub-tab in Stage 33)
    architecture/
      overview/          (was src/content/shared/)
      components/        (was src/content/shared-components/)
      ui-components/     (was src/content/shared-ui-components/)
      tables/            (was src/content/shared-tables/)
      logging/           (was src/content/shared-logging/)
```

- [x] Move each `content.ts` file listed above into its new directory path (create the new
  directory, move the file, delete the old now-empty directory). `ContentBlock.ts` stays at
  `src/content/ContentBlock.ts` (it's a shared type, not tab content).
- [x] Update every import path in `src/app/page.tsx` to the new locations (import aliases/variable
  names unchanged, only the `@/content/...` path string changes for the 18 moved files:
  `skillsContent`, `planContent`, `codeContent`, `commitContent`, `auditContent`,
  `reinstallContent`, `claudeContent`, `namingDatabaseContent`, `namingSqlContent`,
  `namingDdEnforcementContent`, `namingComponentPropsContent`, `restrictionsContent`,
  `styleCommentsContent`, `styleFunctionsContent`, `styleFileStructureContent`,
  `styleAsyncContent`, `styleLayoutContent`, `styleFiltersContent`, `styleTypescriptContent`,
  `sharedContent`, `sharedComponentsContent`, `sharedUiComponentsContent`,
  `sharedTablesContent`, `sharedLoggingContent`).
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes (Stage 43)
### src/content/**/* (moved), src/app/page.tsx (Stage 43)
- Moved every nested sub-tab's content file into its parent tab's folder, mirroring the app's
  actual tab structure (e.g. `src/content/plan/` → `src/content/skills/plan/`,
  `src/content/naming-database/` → `src/content/conventions/naming/database/`,
  `src/content/shared/` → `src/content/conventions/architecture/overview/`). Updated all 24
  affected import paths in `page.tsx` (variable names unchanged). No content changes.

### 44. Stage 44 — support a nested list inside a table cell, use it for the Exceptions cell (2026-08-01)

Extends the shared `ContentBlock` type (used by every tab) with a new table-cell variant that
renders as a bulleted list inside a `<td>`, then applies it to Workspace's "Exceptions" cell
(currently one run-on sentence describing 3 things). New nested list uses `list-none` (no bullet
markers), matching the app-wide no-bullets decision from Stage 26, not `list-disc`.

- [x] In `src/content/ContentBlock.ts`, add a `TableCell` type: `string | TextPart[] | { list:
  string[] }`, and change the `table` variant's `rows` type from `(string | TextPart[])[][]` to
  `TableCell[][]`.
- [x] In `src/components/ContentSection.tsx`: update `cellPlainText` to handle the new list
  variant (join its items for the plain-text form used by the `#`-prefix style check); add a
  `renderCell` helper that renders a `{ list }` cell as a `<ul className='list-none space-y-1'>`
  of `<li>`s, and falls back to the existing `renderParagraphText` for string/TextPart[] cells;
  use `renderCell` in place of `renderParagraphText` for table-cell rendering.
- [x] In `src/content/workspace/content.ts`, change the `Exceptions` row's Description cell from
  a single string to `{ list: [...] }` with 3 items (row label "Exceptions" already gives context,
  so the "Three things cross this boundary..." lead-in is dropped as redundant):
  - "A version-pinning tool in the shared package's own dev app, human-triggered through its own
    product feature rather than Claude acting on its own initiative."
  - "A database-admin project's own UI, human-triggered through its own product feature rather
    than Claude acting on its own initiative."
  - "/audit's own scoped, time-limited exception (capped at 4 hours, naming one specific
    project), which temporarily allows edits into that named project from a shared-package
    session — see Skills → audit for the full mechanism."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 45. Stage 45 — add a spacing option to in-cell lists: tight / blank-line / bullets (2026-08-01)

Stage 44's nested list rendered fine (each item genuinely on its own `<li>` line), but with no
bullet and only 1-unit spacing, 3 stacked lines read as ambiguous wrapped text rather than a
recognizable list. Rather than a one-off fix, add a general `spacing` option to the `{ list }`
table-cell variant: `'tight'` (current behavior, default), `'blank-line'` (larger vertical gap,
still no bullet), `'bullets'` (visible marker, `list-disc`). Apply `'blank-line'` to the
Exceptions cell specifically, per user's call for this example.

- [x] In `src/content/ContentBlock.ts`, extend the list table-cell variant to `{ list: string[];
  spacing?: 'tight' | 'blank-line' | 'bullets' }`.
- [x] In `src/components/ContentSection.tsx`'s `renderCell`, branch on `cell.spacing` (defaulting
  to `'tight'` when omitted): `'bullets'` → `list-disc pl-5 space-y-1`; `'blank-line'` →
  `list-none space-y-4`; `'tight'` (default) → `list-none space-y-1` (today's behavior, so every
  other existing `{ list }` cell is unaffected).
- [x] In `src/content/workspace/content.ts`, add `spacing: 'blank-line'` to the `Exceptions`
  cell's `{ list: [...] }` object.
- [x] In that same table, convert the `Project isolation` row's Description cell (currently one
  string) into a `{ list: [...], spacing: 'blank-line' }` too, splitting its 3 sentences into 3
  items:
  - "Claude may read anything on the machine, but may only write, edit, or delete files inside
    the project currently being worked in."
  - "A hook enforces this at the tool layer, blocking any file-edit whose target resolves outside
    the current project."
  - "Known gap: a shell command writing via redirection or a copy/move isn't covered by the hook,
    only guarded by instruction."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 46. Stage 46 — dev-only click-to-open-in-VSCode for every rendered block (2026-08-01)

For local dev convenience only, gated by the existing `NEXT_PUBLIC_APPENV_ISDEV` env var
convention (same one `OwnerLayout`/the former `DevLayoutHeader` used) — never active in
production. Every rendered block (paragraph, heading, list, code, table) becomes clickable; since
Stage 43 already split content into small per-tab files, clicking any block opens that tab's own
`content.ts` file in VSCode (landing at the top of the file, not a specific line — these files are
now short enough that this is sufficient). Uses `launch-editor` (the same mature package Next.js's
own dev error overlay uses internally to jump to a file from a stack trace) rather than hand-
rolling editor detection/invocation — install via the `safe-install` skill, not a bare
`npm install`.

- [x] Install `launch-editor` via the `safe-install` skill (user approved `npm install --save-dev
  launch-editor`).
- [x] Create `src/app/api/dev/open-editor/route.ts` — a POST handler that: returns 403 unless
  `process.env.NEXT_PUBLIC_APPENV_ISDEV === 'true'`; otherwise reads `{ filePath: string }` from
  the request body, resolves it to an absolute path via `path.join(process.cwd(), filePath)`, and
  calls `launchEditor(absolutePath)`. Follow-on fix: Turbopack flagged the dynamic `path.join`
  call as a full-project-tracing risk during build — resolved with its own suggested
  `/*turbopackIgnore: true*/` comment.
- [x] Restructure `src/components/ContentSection.tsx`: extract the existing per-block
  type-branching logic (currently inline `return`s in the `.map()` callback) into a
  `renderBlock(block)` helper that returns the same JSX unwrapped. Add a `sourcePath: string` prop
  to the component. In the render loop, call `renderBlock(block)`; when
  `process.env.NEXT_PUBLIC_APPENV_ISDEV === 'true'`, wrap the result in a `<div onClick={...}
  className='cursor-pointer hover:bg-yellow-50 rounded transition-colors'>` whose `onClick` POSTs
  `{ filePath: sourcePath }` to `/api/dev/open-editor`; otherwise render `renderBlock(block)`
  directly, unwrapped, so production output is byte-for-byte unchanged. (Component gained a `'use
  client'` directive, required for the `onClick` handler.)
- [x] In `src/app/page.tsx`, add a `sourcePath` prop to every `<ContentSection blocks={...} />`
  call site, set to that file's own relative path (matching Stage 43's mirrored structure), e.g.
  `sourcePath='src/content/overview/content.ts'`,
  `sourcePath='src/content/skills/plan/content.ts'`,
  `sourcePath='src/content/conventions/naming/sql/content.ts'`,
  `sourcePath='src/content/conventions/coding-style/comments/content.ts'`,
  `sourcePath='src/content/conventions/architecture/overview/content.ts'`, and so on for all ~29
  call sites, each matching its own already-known import path one-to-one.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes (Stages 45-46)
### src/content/ContentBlock.ts, src/components/ContentSection.tsx, src/content/workspace/content.ts (Stage 45)
- Added a `spacing` option (`'tight' | 'blank-line' | 'bullets'`) to the `{ list }` table-cell
  type, defaulting to `'tight'` (today's behavior). Applied `spacing: 'blank-line'` to both the
  `Exceptions` cell and the `Project isolation` cell (the latter newly split from one paragraph
  into 3 list items).

### package.json (Stage 46)
- Added `launch-editor` as a dev dependency (user-approved via the `safe-install` skill).

### src/app/api/dev/open-editor/route.ts (new file, Stage 46)
- New dev-only POST route: 403s unless `NEXT_PUBLIC_APPENV_ISDEV === 'true'`, otherwise resolves
  a project-relative `filePath` to an absolute path and calls `launchEditor()` on it. Uses a
  `/*turbopackIgnore: true*/` comment on the `path.join` call to resolve a Turbopack build
  warning about full-project file tracing.

### src/components/ContentSection.tsx (Stage 46)
- Added `'use client'`. Extracted per-block rendering into a `renderBlock()` helper. Added a
  `sourcePath` prop; in dev mode (`NEXT_PUBLIC_APPENV_ISDEV === 'true'`) every rendered block is
  wrapped in a clickable, hover-highlighted `<div>` that POSTs `sourcePath` to the new API route,
  opening that tab's `content.ts` file in VSCode. In production, blocks render exactly as before.

### src/app/page.tsx (Stage 46)
- Added a `sourcePath` prop (matching each file's own path) to all ~29 `ContentSection` call
  sites.

### 47. Stage 47 — archive completed plan files instead of deleting them (2026-08-01)

User: create `docs/archive/` and change `/commit` to move the plan file there instead of
deleting it. `/commit` is defined in the global `~/.claude/skills/commit/SKILL.md` — a skill file,
which is explicitly carved out of the pre-authorized-markdown exemption, so editing it goes
through this plan-gate like code (unlike `~/.claude/CLAUDE.md`/`COMMANDS.md`, which stay
pre-authorized and are just tracked here for traceability). This changes `/commit`'s behavior for
every project, not only `claude_setup`.

- [x] Create `docs/archive/` in this project (empty folder, so a completed plan has somewhere to
  land the first time `/commit` runs after this change; the skill's own step 10 will also create
  it if missing in any other project where it doesn't yet exist). Added a `.gitkeep` so git
  actually tracks the otherwise-empty directory.
- [x] In `~/.claude/skills/commit/SKILL.md`:
  - Bump `version:` in the frontmatter from `2.2.0` to `2.3.0` (behavior change, not a patch-level
    tweak).
  - Rewrite step 10 from "Delete the `docs/PLAN_*.md` file from disk..." to: "Move the
    `docs/PLAN_*.md` file into `docs/archive/` (creating that folder first if it doesn't already
    exist), then immediately commit and push that move too (e.g. `git commit -m 'Archive
    completed plan file'` / `git push`) — this keeps `docs/` clean of active plans while
    preserving the plan's full content and history in `docs/archive/` for future reference,
    without leaving an uncommitted move lying around afterward."
  - Update step 0's rationale ("since the PLAN file where that's recorded is about to be
    deleted, this is the last point where an unconfirmed manual step is still tracked anywhere")
    to reflect that the file is archived, not deleted — reword to something like: "the task is
    about to be considered closed and the plan moved out of the active `docs/` folder — confirm
    now rather than assuming it'll be caught later."
  - In "What NOT to do", change "Never ask permission before deleting the PLAN file — deletion is
    expected once the commit and push succeed" to the same wording with "archiving"/"moved to
    `docs/archive/`" in place of "deleting"/"deletion".
  - In the Checklist, change "`PLAN_*.md` deleted, no confirmation asked, and that deletion
    committed + pushed too" to "`PLAN_*.md` moved to `docs/archive/`, no confirmation asked, and
    that move committed + pushed too".
- [x] In `~/.claude/CLAUDE.md` (pre-authorized, done directly, no gate — tracked here for
  traceability only): update "Project files — CLAUDE.md and PLAN files" section's "deleted by
  `#commit` (transient)" to "archived by `#commit` into `docs/archive/` (transient)"; update
  "Manual SQL must be confirmed complete before `#commit`" section's reasoning ("the only record
  that it was ever needed disappears along with the plan") since the plan is no longer deleted —
  reword to reflect that confirmation is still required before the task is considered closed out,
  even though the record itself now persists in `docs/archive/`.
- [x] In `~/.claude/COMMANDS.md` (pre-authorized, done directly, no gate): update the `/commit`
  summary's "then delete the PLAN file and commit+push that deletion too" to "then archive the
  PLAN file into `docs/archive/` and commit+push that move too".
- [x] In `src/content/skills/commit/content.ts`'s `Plan file cleanup` row, update the Description
  to describe archiving rather than deleting: "Finally moves the plan file into `docs/archive/`
  and commits/pushes that move too, instead of deleting it — the plan's full content stays
  browsable in the repo going forward, not just recoverable from git history."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes (Stage 47)
### docs/archive/.gitkeep (new)
- Created `docs/archive/` (with a `.gitkeep` so git tracks it) for `/commit` to move completed
  plans into, instead of deleting them.

### ~/.claude/skills/commit/SKILL.md (global, outside this project)
- Bumped version 2.2.0 → 2.3.0. Step 10 now moves `docs/PLAN_*.md` into `docs/archive/` (creating
  it if missing) instead of deleting it, committing/pushing that move. Updated step 0's rationale,
  the "What NOT to do" deletion bullet, and the Checklist item to match — all now describe
  archiving, not deleting. Affects every project using `/commit`, not just this one.

### ~/.claude/CLAUDE.md, ~/.claude/COMMANDS.md (global, outside this project — pre-authorized, no gate)
- Updated the "Project files" section's PLAN-file lifecycle description and the "Manual SQL must
  be confirmed complete before #commit" section's reasoning to reflect archiving instead of
  deletion. Updated COMMANDS.md's `/commit` summary to match, with a history note.

### src/content/skills/commit/content.ts
- Updated the `Manual SQL confirmation` and `Plan file cleanup` row descriptions to describe
  archiving into `docs/archive/` instead of deleting the plan file.

### 48. Stage 48 — create src/lib/constants.ts, move the table-width thresholds into it; IS_DEV gets its own file (2026-08-01)

Per the documented constants-file convention, and the user's specific example: the table
renderer's column-width classes (`w-80` on the first column, `max-w-5xl` capping the last) are
hardcoded thresholds baked directly into `ContentSection.tsx` — exactly the "batch sizes... caps,
thresholds" category the convention names. Also fixes the one genuine duplicated-logic case
found: `process.env.NEXT_PUBLIC_APPENV_ISDEV === 'true'` was re-checked independently in both
`ContentSection.tsx` and `src/app/api/dev/open-editor/route.ts`. **Revised mid-execution:** the
user correctly objected to `IS_DEV` living in `constants.ts` — it's not a fixed value, it's a live
read of `process.env` that must still evaluate `false` in production; filing it under "constants"
mischaracterized it. Moved to its own `src/lib/env.ts` instead, logic unchanged. Styling/content
values beyond the two table-width classes (colors, spacing, prose) stay excluded, per the
convention's own carve-out — this isn't a wholesale hardcode sweep, just the values that actually
fit the test.

- [x] Create `src/lib/constants.ts` exporting `TABLE_LABEL_COLUMN_CLASS = 'w-80 whitespace-nowrap'`
  and `TABLE_LAST_COLUMN_MAX_WIDTH_CLASS = 'max-w-5xl'`.
- [x] Create `src/lib/env.ts` exporting `IS_DEV = process.env.NEXT_PUBLIC_APPENV_ISDEV === 'true'`
  (still a live environment read, not a fixed value — kept separate from `constants.ts` since it
  isn't a tunable constant).
- [x] In `src/components/ContentSection.tsx`, remove the local `const IS_DEV = ...` and import it
  from `@/lib/env`; replace the inline `'w-80 whitespace-nowrap'` and `'max-w-5xl'` literals (both
  appear twice each — once for `<th>`, once for `<td>`) with the two new constants from
  `@/lib/constants`.
- [x] In `src/app/api/dev/open-editor/route.ts`, replace the inline
  `process.env.NEXT_PUBLIC_APPENV_ISDEV !== 'true'` check with `!IS_DEV`, importing `IS_DEV` from
  `@/lib/env`.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 49. Stage 49 — convert Skills → Overview's 3 closing sections into a table (2026-08-01)

Same treatment as prior "table this" requests, applied to `src/content/skills/overview/content.ts`'s
closing 3 heading+paragraph sections ("Check for a matching skill before acting on any trigger",
"Keeping the catalog in sync", "Commands given to the user are never backtick-quoted"). Headers
`['Claude Instructions', 'Description']`, matching the user's own name for this group.

- [x] In `src/content/skills/overview/content.ts`, replace those 3 heading/paragraph pairs with
  one `table` block, headers `['Claude Instructions', 'Description']`, 3 rows using the existing
  headings as row labels and the existing paragraphs as Description cells, verbatim, unchanged.
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes (Stages 48-49)
### src/lib/constants.ts (new file, Stage 48)
- New constants file: `TABLE_LABEL_COLUMN_CLASS`, `TABLE_LAST_COLUMN_MAX_WIDTH_CLASS`.

### src/lib/env.ts (new file, Stage 48)
- New file for the one environment-derived flag, `IS_DEV` — deliberately kept separate from
  `constants.ts` since it's a live `process.env` read, not a fixed value.

### src/components/ContentSection.tsx (Stage 48)
- Removed the local `IS_DEV` computation; imports it from `@/lib/env` instead. Replaced inline
  `'w-80 whitespace-nowrap'`/`'max-w-5xl'` literals (4 occurrences) with the new constants.

### src/app/api/dev/open-editor/route.ts (Stage 48)
- Replaced the inline env-var check with `!IS_DEV`, imported from `@/lib/env` — no longer
  duplicating the check's logic independently from `ContentSection.tsx`.

### src/content/skills/overview/content.ts (Stage 49)
- Replaced the 3 closing heading/paragraph pairs with one `Claude Instructions`/`Description`
  table.

### 50. Stage 50 — fold the standalone environment paragraphs into the /plan row (2026-08-01)

`src/content/workflow/content.ts` currently has 4 standalone paragraphs at the top of the file
(before "Triggers"), about accept-edits mode / Plan Mode disambiguation. User: move them into the
`/plan` row of the Triggers table, as separate paragraphs. Since a table cell can't hold prose
paragraphs and a plain string together, the whole `/plan` cell becomes a `{ list: [...],
spacing: 'blank-line' }`: the row's existing description (split at its 3 natural sentence breaks)
plus the 4 new paragraphs, 7 items total.

- [x] In `src/content/workflow/content.ts`, remove the 4 standalone paragraph blocks from the top
  of the file (everything before `{ type: "heading", text: "Triggers" }`).
- [x] Change the `Triggers` table's `/plan` row's Description cell from a single string to
  `{ list: [...], spacing: 'blank-line' }`, 7 items:
  1. "Starts the planning phase: the designer and Claude create a short written record of what
     will change, agreed before anything is touched."
  2. "Iterated on freely until it's fixed."
  3. "No code changes while in planning mode."
  4. "The designer is normally in Edit Automatically mode throughout, including during planning
     phase."
  5. "This planning phase is not to be confused with Claude Code's own Plan Mode."
  6. "It's a workflow convention layered on top of Claude Code's permission system."
  7. "A designer should spend more time in the planning phase than any other phase."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 51. Stage 51 — split the /code row's Description into a list (2026-08-01)

Same treatment as the `/plan` row (Stage 50): `{ list: [...], spacing: 'blank-line' }` instead of
one run-on paragraph.

- [x] In `src/content/workflow/content.ts`'s `Triggers` table, change the `/code` row's
  Description cell to `{ spacing: 'blank-line', list: [...] }`, 6 items (split at natural sentence
  breaks):
  1. "Starts the coding phase once planning is agreed."
  2. "Claude may prompt with questions or choices that come up during implementation, with any
     answers written back into the plan rather than left undocumented."
  3. "Works through the plan step by step, checking off each item as it goes, with no need to
     pause for confirmation mid-run — that pause already happened when the plan was agreed."
  4. "Won't allow a commit until every item in the plan has been checked off."
  5. "Once every step is complete, presents a test plan for the designer to manually verify."
  6. "Testing may reveal changes to the plan, in which case the cycle repeats within the same
     coding phase; it may also reveal the need for an entirely new plan, to be created and
     implemented at a future date."
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

### 52. Stage 52 — fold the /audit row's intro line into its table (2026-08-01)

Same treatment as `/plan`/`/code`/`/commit` (Stages 35/50/51): the leading "/audit is a trigger
which executes the Claude skill called audit." paragraph folds into the existing
`Step`/`Description` table as a new first row, ahead of `Project discovery`.

- [x] In `src/content/skills/audit/content.ts`, remove the leading paragraph and add it as a new
  first row in the table: `/audit` — "/audit is a trigger which executes the Claude skill called
  audit." (before `Project discovery`).
- [x] Confirmed via `npx tsc --noEmit` and `npm run build`, both pass clean.

## Changes (Stages 51-52)
### src/content/workflow/content.ts (Stage 51)
- Converted the `/code` row's Description cell from one run-on paragraph into a 6-item
  `{ list, spacing: 'blank-line' }`.

### src/content/skills/audit/content.ts (Stage 52)
- Folded the leading "/audit is a trigger..." paragraph into the existing `Step`/`Description`
  table as a new first row, ahead of `Project discovery`.

## Changes (Stage 50)
### src/content/workflow/content.ts (Stage 50)
- Removed the 4 standalone paragraphs from the top of the file. Converted the `/plan` row's
  Description cell from a single string into a 7-item `{ list, spacing: 'blank-line' }`,
  combining its existing 3-sentence description with the 4 moved paragraphs.

## Changes (Stage 44)
### src/content/ContentBlock.ts, src/components/ContentSection.tsx, src/content/workspace/content.ts (Stage 44)
- Added a `TableCell` type (`string | TextPart[] | { list: string[] }`) and a `renderCell` helper
  that renders a `{ list }` cell as a bulleted-free `<ul>` inside its `<td>`. Applied it to
  Workspace's "Exceptions" cell, splitting the single run-on sentence into 3 list items.

## Changes (Stages 37-38)
### src/content/overview/content.ts, src/content/workspace/content.ts (Stages 37-38)
- Removed Overview's 3 leading paragraphs and its "Where this UI itself came from" section
  entirely — the tab now opens directly with "What the other tabs cover". Removed Workspace's
  plan-file-location rationale paragraph. Rewrote "Project isolation — a hard boundary" from 3
  paragraphs to 2, tightened, now explicitly naming `/audit`'s scoped time-limited exception
  (previously undocumented here, cross-referencing Skills → audit for the full mechanism).

## Changes (Stages 34-36)
### src/content/workspace/content.ts, src/content/audit/content.ts (Stage 34)
- Removed "Projects are discovered, never hardcoded" (heading + 2 paragraphs) from Workspace
  entirely; folded its content into a new "Project discovery" row at the top of `audit`'s
  `Step`/`Description` table. Updated Workspace's intro paragraph to drop the now-relocated
  "don't hardcode what can be discovered" clause.

### src/content/plan/content.ts, src/content/code/content.ts, src/content/commit/content.ts (Stage 35)
- `plan`: replaced the 2 intro paragraphs and the location/title/checklist/log list with a new
  `Topic`/`Description` table, 2 rows (`/plan`, `Create plan`). `code` and `commit`: folded their
  leading "/X is a trigger..." paragraph into their existing `Step`/`Description` table as a new
  first row.

### src/content/naming-database/content.ts (Stage 36)
- Removed 2 paragraphs (the Postgres-specific table/column-code explanation and the x-prefix
  note), leaving the "core idea" paragraph directly followed by the naming-pattern table.

## Testing
### Stages 51-52 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workflow tab, confirm the `/code` row now shows 6 blank-line-separated items.
- [ ] Open Skills → audit, confirm a new `/audit` row leads the table, and the standalone intro
  paragraph above it is gone.

### Stage 50 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workflow tab, confirm the `/plan` row now shows its content as several
  blank-line-separated items instead of one run-on paragraph, and the standalone paragraphs that
  used to sit above "Triggers" are gone.

### Stages 48-49 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Restart the dev server (picks up the current `NEXT_PUBLIC_APPENV_ISDEV=true`), hard-refresh
  the browser, and confirm the click-to-open-in-VSCode behavior (Stage 46) still works after the
  constants refactor.
- [ ] Spot-check a couple of tables still show their expected first-column/last-column widths —
  the visual result should be identical to before, since the constants hold the same values.
- [ ] Open Skills → Overview, confirm the 3 closing sections now render as one `Claude
  Instructions`/`Description` table.

### Stage 47 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Confirm `docs/archive/` exists in this project.
- [ ] Next time `/commit` runs (in any project), confirm the plan file ends up moved into
  `docs/archive/` — committed and pushed — rather than deleted.
- [ ] Open Skills → commit, confirm the `Manual SQL confirmation` and `Plan file cleanup` rows
  now describe archiving, not deleting.

### Stages 45-46 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workspace tab, confirm both "Project isolation" and "Exceptions" now show visible
  blank-line spacing between their list items (a clear gap, not just a tight stack).
- [ ] With `NEXT_PUBLIC_APPENV_ISDEV=true` and the dev server running, hover over any paragraph/
  block on any tab — confirm a pointer cursor and a light yellow hover highlight appear, and
  clicking it opens that tab's `content.ts` file in VSCode.
- [ ] Temporarily set `NEXT_PUBLIC_APPENV_ISDEV=false` (or check a production build), confirm
  blocks render with no hover effect and are not clickable — dev-only behavior confirmed off.

### Stage 44 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workspace tab, confirm the "Exceptions" cell now renders as 3 stacked list items
  (no bullet markers, matching the rest of the app) instead of one paragraph.
- [ ] Spot-check other tables (e.g. Skills → Overview) still render their plain-text/bold cells
  exactly as before — the type extension shouldn't change any other table's appearance.

### Stage 43 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Run the dev server and click through every tab/sub-tab (Overview, Workspace, Workflow,
  Skills incl. all 7 sub-tabs, Permissions, Conventions incl. Naming's 4, Coding-style's 8, and
  Architecture's 5), confirm every one still renders its expected content — pure file moves, so
  nothing should look different, but this is the way to catch a missed import path.
- [ ] Spot-check `src/content/`'s folder tree matches the tab structure exactly (e.g.
  `src/content/skills/plan/content.ts`, `src/content/conventions/naming/sql/content.ts`).

### Stage 42 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open Skills → plan, confirm the `Create plan` row now says "Creates a plan file in the docs
  folder." instead of "...in a fixed location in the repo."

### Stages 40-41 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workspace tab, confirm it now opens directly with the 3-row tracking table (no
  "Three files, three scopes" heading above it), followed by a 2-row `Topic`/`Description` table
  (`Project isolation`, `Exceptions`) — no standalone "Project isolation" heading/paragraphs.

### Stage 39 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workspace tab, confirm it now opens directly with "Three files, three scopes"
  (no standalone "CLAUDE.md" heading/paragraph above it), and the table has 3 rows in order:
  Global CLAUDE.md, Project CLAUDE.md, A plan file.

### Stages 37-38 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Overview tab, confirm it now opens directly with "What the other tabs cover" (no
  leading paragraphs, no "Where this UI itself came from" section).
- [ ] Open the Workspace tab, confirm "Two files track each project" is followed directly by
  "Project isolation — a hard boundary" (no plan-file-location paragraph in between), and that
  section now reads as 2 tightened paragraphs with `/audit`'s exception explicitly mentioned.

### Stages 34-36 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workspace tab, confirm "Projects are discovered, never hardcoded" is gone and the
  intro paragraph no longer mentions it.
- [ ] Open Skills → audit, confirm a new "Project discovery" row leads its table.
- [ ] Open Skills → plan, confirm it now opens with a 2-row `Topic`/`Description` table (`/plan`,
  `Create plan`) instead of separate paragraphs/list.
- [ ] Open Skills → code and Skills → commit, confirm each table now has a `/code`/`/commit` row
  as its first row.
- [ ] Open Conventions → Naming → Database naming, confirm it now shows only the "core idea"
  paragraph followed directly by the table.

### Stage 33 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open Conventions → Naming, confirm 4 sub-tabs (Database naming, SQL conventions, DD
  enforcement, Component props — no Overview, no Column reorder), and Database naming opens with
  the "core idea" paragraph followed by the Postgres-specific paragraph.
- [ ] Open Conventions, confirm only 4 top-level sub-tabs (Naming, Constants, Coding-style,
  Architecture — no standalone Restrictions).
- [ ] Open Conventions → Coding-style, confirm 8 sub-tabs now, with Restrictions as the last one.
- [ ] Confirm the Overview tab's "What the other tabs cover" table reflects the new structure.

### Stages 29-32 (2026-08-01)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open Conventions → Architecture → Overview, confirm the `Topic` table now has 6 rows (the
  custom-infra row split into "Adopting an existing package" and "Building custom
  infrastructure"), and "Reusable UI components" no longer has the "— build once, use many" tail.
- [ ] Open Conventions → Naming, confirm it's now a nested tab bar with 6 sub-tabs (Overview,
  Database naming, SQL conventions, Column reorder, DD enforcement, Component props), each
  showing the expected content.
- [ ] Open Conventions → Coding-style, confirm it's now a nested tab bar with 7 sub-tabs
  (Comments, Functions, File structure, Async, Layout, Filters, TypeScript), each showing the
  expected content, including the two code blocks (Comments, Async).

### Stages 27-28 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open Conventions → Architecture → Overview, confirm it now opens with the intro paragraph,
  then a 5-row `Topic`/`Description` table (Why it exists, What it owns, Consumption discipline,
  Reusable UI components, Building custom infrastructure), then a second table whose first
  column header reads "Where this shows up elsewhere in this setup" (no standalone heading above
  it).

### Stage 26 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open Skills → `reinstall` and the `plan` sub-tab, confirm both lists now show no bullet
  markers and text isn't left awkwardly indented from the removed `pl-5`.

### Stages 24-25 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open Conventions, confirm 5 sub-tabs now show: Naming, Constants, Restrictions,
  Coding-style, Architecture (no standalone old Architecture tab, no tab labeled "Shared").
- [ ] Open the renamed Architecture sub-tab, confirm it shows the original nextjs-shared sub-tabs
  (Overview, Components, UI Components, Tables, Logging) and that Overview now also includes the
  "Reusable UI components" and "Building custom infrastructure vs. adopting an existing package"
  sections at the end.
- [ ] Confirm the Overview tab's "What the other tabs cover" table describes the merged
  Architecture entry and says "Coding-style" instead of "Style".

### Stages 22-23 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Skills tab, confirm the `skillslist` sub-tab is gone (Overview, plan, code,
  commit, audit, reinstall, Claude remain) and Skills → Overview's "Combined skill/command
  catalog" row is still present.
- [ ] Open Skills → `reinstall`, confirm the 6 commands now render as a bulleted list with a
  light-blue background instead of a monospace code block.

### Stage 21 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Skills → `plan` sub-tab, confirm the closing section now renders as one
  `Claude Rules`/`Description` table with all 4 rows, and everything above it (intro line, the
  location/title/checklist/log list) is unchanged.

### Stage 20 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workflow tab, confirm the `Triggers` table's 3 rows are now condensed (not the
  full Stage 19 text) but still cover every fact — especially `/code`'s row: question-prompting,
  won't-commit-until-checked-off, and testing revealing the need for a new plan should all still
  be present. Confirm the pointer paragraph to Skills → plan/code/commit appears right after the
  table.

### Stage 19 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workflow tab, confirm the "1. Planning phase", "2. Coding phase", "3. Commit"
  headings are gone, and the `Triggers` table's 3 rows now carry the full merged descriptions
  with no separate sections repeating the same content below it.

### Stages 14-18 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open Skills → Claude sub-tab, confirm `noprompt` is gone and the intro line no longer
  mentions an exception; open Skills → Overview and confirm the "Permission exception" row now
  shows the fuller `/noprompt` description.
- [ ] Confirm list boxes (e.g. the `plan` sub-tab) are now light blue, matching tables.
- [ ] Open the `code`, `commit`, and `audit` sub-tabs and confirm each now shows a `Step`/
  `Description` table below its intro line instead of separate paragraphs.

### Stages 10-13 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open any tab with a table (e.g. Permissions, Skills → Overview) and confirm: the table box
  is light blue, the header row is a darker blue, list boxes (e.g. `plan` sub-tab) are still gray
  (unaffected), and the colored box now hugs the table's actual width rather than stretching full
  width when the table itself is narrow.
- [ ] Open Skills → Overview, confirm both headings ("Executable commands...", "For Claude...")
  are gone and the two tables now read "Designer Skill" and "Claude Skill" respectively.
- [ ] Open Skills → Claude sub-tab, confirm it now renders as one intro line plus a
  `Claude Skill`/`Description` table with all 5 skills, and that the `noprompt` row correctly
  notes it has a real trigger while the other 4 rely on the shared intro line.

### Stage 9 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Run the dev server and open `/`, spot-check a few tabs with tables (e.g. Permissions,
  Skills → Overview) and a tab with a list (e.g. `plan` sub-tab) — confirm each now shows a
  bordered box with a light gray background, and wide tables still scroll horizontally instead of
  overflowing the page.

### Stages 4-8 (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Open the Workflow tab, confirm the 5 process rules now render as one table (headers "Claude
  Rules" / "Description") instead of separate headings/paragraphs, and the Workspace tab shows a
  `CLAUDE.md` heading above its opening paragraph.
- [ ] Open Skills → Overview, confirm the `#tested` mention and "The /commands trigger"
  heading/paragraph are both gone, while "Keeping the catalog in sync" is still present.
- [ ] Open Conventions → Shared → Logging, confirm the Severity/Meaning table and the
  `CREATE TABLE xlg_logging` code block are gone, while the "How application code writes to it"
  heading and its paragraph remain.
- [ ] Confirm `/commands` no longer works as a live trigger (global config change, not testable
  from inside this app, but worth a manual check in a future session).

### Item 2 — Owner-page logging removal (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean, `/owner` no longer
  appears in the build's route table.
- [ ] Run the dev server and open `/`, confirm the page loads with no dev banner/header at the top
  (since `DevLayoutHeader` was removed) and no console errors.
- [ ] Confirm visiting `/owner` directly now 404s (the route no longer exists).

### Item 3 — Stage 3 documentation additions (2026-07-31)
- [ ] Confirmed via `npx tsc --noEmit` and `npm run build` — both pass clean.
- [ ] Run the dev server and open `/`, confirm all 6 main tabs render cleanly (Overview, Workspace,
  Workflow, Skills, Permissions, Conventions), including the new Workspace tab.
- [ ] Open Conventions and confirm all 6 sub-tabs show and switch correctly (Naming, Constants,
  Architecture, Restrictions, Style, Shared), including the 3 new ones.
- [ ] Spot-check content accuracy on the new/extended sections: Workspace (project-isolation
  section reads correctly), Conventions → Architecture, Restrictions, and Style (new sub-tabs),
  Skills → Overview (new trigger-mechanics paragraphs), Workflow (5 new headings after "Commit"),
  Conventions → Naming (new SQL-conventions section), Conventions → Shared (new "Consumption
  discipline" section, and the Logging/Tables sub-tabs' new sections).
- [ ] Confirm the Overview tab's "What the other tabs cover" table mentions Workspace and all 3
  new Conventions sub-tabs.

### Carried forward from PLAN_stage2-home-tabs.md (superseded by Item 3's testing above)
- [ ] Original items referenced 5 main tabs and 3 Conventions sub-tabs, both now stale after
  Stage 3 added a 6th main tab and 3 more Conventions sub-tabs — see Item 3's checklist above for
  the current, accurate version of this same verification.
