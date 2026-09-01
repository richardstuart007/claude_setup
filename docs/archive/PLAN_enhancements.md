# PLAN_enhancements — claude_setup

## Title
enhancements

## Plan
- [x] In `ContentSection.tsx`, change the dev-only click handler on each block from
      `onClick={() => openInEditor(sourcePath)}` to `onDoubleClick={() => openInEditor(sourcePath)}`.
      Gating stays `IS_DEV`-only, unchanged. Single click does nothing for now (per-item link
      behavior, e.g. the designer-skills table linking to other tabs, is deferred — out of scope
      for this step).
- [x] Split Workflow into two sub-tabs, following the same nested-`OwnerPage` pattern as
      `SkillsTab` in `page.tsx`:
      - Move the "Triggers" heading, paragraph, and trigger table out of
        `src/content/workflow/content.ts` into a new `src/content/workflow/triggers/content.ts`.
      - Move the "Claude Rules" table into a new `src/content/workflow/rules/content.ts`.
      - Delete the now-empty `src/content/workflow/content.ts`.
      - Add a `WorkflowTab` function in `page.tsx` (nested `OwnerPage`, `persistKey='workflow-sub-tabs'`)
        with two sub-tabs: `Triggers` and `Rules`, each rendering `ContentSection` with its own
        `sourcePath`.
      - Replace the top-level Workflow tab's `content` in `Home` with `<WorkflowTab />`.
- [x] In `src/content/permissions/content.ts`, make the settings-file description concrete:
      - First paragraph: name the actual file, `~/.claude/settings.json`, instead of only
        "one settings file".
      - "Two hooks" table: name the actual script for each row — `permission-exceptions.sh`
        for "Per-command exception mechanism", `project-isolation-guard.js` for
        "Project-isolation guard" — instead of describing them only in the abstract.
- [x] In `src/content/conventions/naming/database/content.ts`, turn the "Column Name" row's
      Description cell (currently `TextPart[]`: bold "Data Dictionary (DD)" + one dense
      paragraph) into a `{ list: [...] }` cell, split at sentence boundaries, matching the list
      format already used in the Triggers table's `/plan` and `/code` rows. The bold "Data
      Dictionary (DD)" label can't be preserved as bold inside a list item (`TableCell`'s list
      form only supports plain strings) — it becomes the plain-text lead of the first item:
      - "Data Dictionary (DD): Example username, a different, easily-confused sense of \"identifier\"."
      - "Each column's full name (e.g. usr_usrid, gd_gdid) is itself a data-dictionary identifier."
      - "This is a canonical name for that value, not just a database detail."
      - "A value read from or written to a given column is named after that column's own
        data-dictionary identifier wherever it appears in code."
      - "It's never a different, more readable invention."
- [x] In `src/content/conventions/constants/content.ts`, turn the "Catches undisclosed decisions"
      row's Description cell into a `{ list: [...] }` cell, split into its two sentences:
      - "Constants as explicit imports make it easier for the designer to see when Claude has
        made a decision and not said so."
      - "One more method to catch Claude making decisions without informing the designer."
- [x] Add a max-width cap to every content block, applied once at the source: add
      `CONTENT_MAX_WIDTH_CLASS = 'max-w-5xl'` to `src/lib/constants.ts` (a new, separately-named
      constant — not a reuse of the existing `TABLE_LAST_COLUMN_MAX_WIDTH_CLASS`, which is scoped
      to one table column, not the whole block), and apply it to `ContentSection`'s outer wrapper
      div in `ContentSection.tsx` (the single place all blocks — paragraphs, headings, lists,
      code, tables — render through), so it's enforced everywhere without touching individual
      block markup. Tables already have their own `overflow-x-auto`, so a table wider than the
      cap scrolls within its own box rather than stretching the page.
- [x] Move the max-width cap from `ContentSection` up to the page layout instead, so it covers
      everything (including the `OwnerPage` tab bar chrome, not just block content):
      - Remove `CONTENT_MAX_WIDTH_CLASS` from `src/lib/constants.ts` and its usage/import in
        `ContentSection.tsx` (revert to the plain `space-y-4 text-sm text-gray-700` wrapper).
      - Add `PAGE_MAX_WIDTH_CLASS = 'max-w-5xl'` to `src/lib/constants.ts`.
      - In `page.tsx`'s `Home`, wrap the `<h1>` + top-level `<OwnerPage>` in a
        `<div className={`${PAGE_MAX_WIDTH_CLASS} mx-auto`}>` inside `<main>`, so the cap applies
        once at the top and cascades to all nested tabs/content.
- [x] Remove the per-table last-column width cap in `ContentSection.tsx`, now that the page-level
      `PAGE_MAX_WIDTH_CLASS` box is the single width constraint. The 1024px (`max-w-5xl`) cap on
      a table's last column was fighting the wider page box, causing tables to wrap/shrink
      inconsistently regardless of how much room the page actually gives them:
      - Remove `TABLE_LAST_COLUMN_MAX_WIDTH_CLASS` from the `<th>` className (currently applied
        via the constant) and the hardcoded `'max-w-5xl'` literal from the `<td>` className
        (currently a duplicate of the same value, hardcoded separately instead of using the
        constant — an existing inconsistency, fixed as part of this removal).
      - Remove `TABLE_LAST_COLUMN_MAX_WIDTH_CLASS` from `src/lib/constants.ts` and its import in
        `ContentSection.tsx`, since it becomes unused.
      - Tables keep their `inline-block` shrink-to-fit sizing and first-column `w-80` label
        width — only the last column's independent cap is removed, so a table now only wraps
        once it reaches the page's own width constraint, not an earlier, unrelated one.
- [x] Make every table span the full page width, instead of shrinking to fit its own content, in
      `ContentSection.tsx`'s `renderBlock`:
      - Change the table wrapper `<div>` from `inline-block max-w-full` to `w-full` (drop the
        shrink-to-fit behavior; `overflow-x-auto` stays, for the rare table that's still wider
        than the page even at full width).
      - Add `w-full` to the `<table>` element itself, so its columns stretch to fill the
        available width instead of shrinking to content — the fixed-width first column (`w-80`)
        stays as-is, and the last (description) column takes up the remaining space.
- [x] In `src/content/conventions/architecture/overview/content.ts`, replace the standalone intro
      paragraph with a new `['Project', 'Description']` table (subject to amendment):
      | Project | Description |
      |---|---|
      | Project | Scenario-specific to this author's setup: a private shared package, consumed by several of the author's own Next.js projects, providing all direct database access, shared UI components, and utility functions. Consuming projects never call the database directly — they always go through this package. |
      | Elements | Tables, components, and logging — this package owns its own database tables and a per-user server-side cache, a small set of shared primitive components and full UI panels, and a shared logging table. |
      | Consumeables | Full API details for every component prop, database function signature, and setup instruction are documented in `node_modules/nextjs-shared/CONSUMING_PROJECTS.md`, read at the start of every session in a consuming project. |

### nextjs-shared cleanup pass (2026-09-01)
- [x] `#reinstall` — clean reinstall + rebuild. Result: `nextjs-shared` 2.1.48 → **2.1.84**
      (commit `f4f1fafe`); `npx tsc --noEmit` and `npm run build` both clean.
- [x] Step 1 (TableResult unwrap + check `.ok`): **N/A** — this project has zero
      `table_*` / `fetch*` / `write_logging` / `sql()` / `db` call sites. Its only
      `nextjs-shared` use is `import OwnerPage from 'nextjs-shared/OwnerPage'`. The
      `table_*` strings under Conventions → Architecture → Tables / Logging are
      documentation copy, not code — no call sites to update. (The Tables/Logging tab
      copy still describes the pre-`TableResult` "returns `[]` on error" behaviour;
      refreshing that copy is a separate content change, out of scope here.)
- [x] Step 2 (`table:` on every call): **N/A** — same reason, no call sites.
- [x] Step 3 (function-order, **strict** per designer): no arrow→function conversions
      needed anywhere — all four real code files already use `function` declarations.
      Reorder each file top-down (no `useEffect`s → main export → helpers by first use):
      - `src/app/page.tsx`: `Home` moved above the tab helpers; helpers ordered
        `WorkflowTab`, `SkillsTab`, `ConventionsTab`, `NamingTab`, `CodingStyleTab`,
        `SharedTab` (first-use order through `Home` then `ConventionsTab`).
      - `src/components/ContentSection.tsx`: `ContentSection` moved above its helpers;
        helpers ordered `renderBlock`, `renderParagraphText`, `cellPlainText`,
        `renderCell`, `openInEditor`.
      - `src/app/api/dev/open-editor/route.ts`, `src/app/layout.tsx`: single export
        each — nothing to reorder.
- [x] Step 4 (function-headers): add the numbered `1)` main header (double-equals
      border, before imports / after any directive) for each file's single main export
      — `Home`, `ContentSection`, `POST`, `RootLayout`. Propless components omit the
      `Parameters:`/`Returns:` sub-sections (nothing to list — not adding empty ones).
      Existing helper single-dash headers left as-is (already canonical bordered
      style; dash-count not re-audited). Skipped: all `content.ts`, `constants.ts`,
      `env.ts`, `ContentBlock.ts` — pure constant/type modules. No fabricated
      `2) NOTES` / `3) CHANGE HISTORY`.
- [x] Step 5 gate: `npx tsc --noEmit` + `npm run build` clean.

### cursor affordances (2026-09-01)
- [x] In `src/app/globals.css`, add an `@layer base` block restoring `cursor: pointer` on
      `button` and `[role="button"]` when not `:disabled`. Tailwind v4's Preflight dropped this
      (v3 had it); re-adding it project-wide means `OwnerPage`'s `MyTab` `<button>` tabs show the
      hand cursor again, matching the v3 behaviour.
- [x] In `src/components/ContentSection.tsx`, remove `cursor-pointer` from the dev-only block
      wrapper's className, keeping `hover:bg-yellow-50 rounded transition-colors`. Single-click
      does nothing (only `onDoubleClick` is wired), so the hand cursor was a misleading
      affordance; the hover background stays as the "this is interactive" hint.
- [x] Gate: `npx tsc --noEmit` + `npm run build` clean.

## Changes
### src/components/ContentSection.tsx
- Changed the dev-only block click handler from `onClick` to `onDoubleClick`, so opening a
  block's source file in the editor now requires a double-click instead of a single click.
  Single click currently does nothing (link-to-other-tab behavior deferred to a future step).

### src/content/workflow/triggers/content.ts (new)
- Contains the "Triggers" heading, paragraph, and trigger table moved from the old
  `src/content/workflow/content.ts`, unchanged.

### src/content/workflow/rules/content.ts (new)
- Contains the "Claude Rules" table moved from the old `src/content/workflow/content.ts`,
  unchanged.

### src/content/workflow/content.ts (deleted)
- Replaced by the two files above.

### src/app/page.tsx
- Swapped the `workflowContent` import for `workflowTriggersContent` and `workflowRulesContent`.
- Added a `WorkflowTab` function (nested `OwnerPage`, `persistKey='workflow-sub-tabs'`) with
  `Triggers` and `Rules` sub-tabs.
- Replaced the top-level Workflow tab's content with `<WorkflowTab />`.

### src/content/permissions/content.ts
- Named the actual settings file (`~/.claude/settings.json`) in the intro paragraph instead of
  the generic "one settings file".
- Named the two hook scripts (`permission-exceptions.sh`, `project-isolation-guard.js`) in the
  "Two hooks" table rows instead of describing them only in the abstract.

### src/content/conventions/naming/database/content.ts
- Turned the "Column Name" row's Description cell from one dense `TextPart[]` paragraph into a
  5-item `{ list: [...] }` cell, split at sentence boundaries. The "Data Dictionary (DD)" label
  is no longer bold — it's now plain text leading the first list item, since the list-cell form
  only supports plain strings.

### src/content/conventions/constants/content.ts
- Turned the "Catches undisclosed decisions" row's Description cell into a 2-item
  `{ list: [...] }` cell, split into its two sentences.

### src/lib/constants.ts
- Replaced `CONTENT_MAX_WIDTH_CLASS` with `PAGE_MAX_WIDTH_CLASS`, moved from a block-level concern
  to a page-layout concern. Later changed from `max-w-5xl` to `max-w-screen-2xl` (96rem/1536px)
  at the designer's request, to give tables more room.
- Removed `TABLE_LAST_COLUMN_MAX_WIDTH_CLASS` entirely (was `max-w-5xl`) — its fixed 1024px cap
  was fighting the page-level box, causing tables to wrap/shrink inconsistently regardless of the
  page's actual width. The page-level `PAGE_MAX_WIDTH_CLASS` box is now the only width constraint.

### src/components/ContentSection.tsx
- Reverted the outer wrapper div back to plain `space-y-4 text-sm text-gray-700` (no max-width) —
  the cap now lives at the page layout level instead.
- Removed `TABLE_LAST_COLUMN_MAX_WIDTH_CLASS` (and the `lastColumnIndex` variable that existed
  only to apply it) from both the `<th>` className and the `<td>` className — the `<td>` side had
  been hardcoding the literal `'max-w-5xl'` directly instead of using the constant, an existing
  inconsistency fixed as part of this removal. Tables keep their `inline-block` shrink-to-fit
  sizing and fixed-width first column; only the last column's independent cap is gone.
- Changed the table wrapper `<div>` from `inline-block max-w-full` to `w-full`, and added
  `w-full` to the `<table>` element, so every table now spans the full page width instead of
  shrinking to fit its content. `overflow-x-auto` stays on the wrapper for the rare case a table
  is still wider than the page even at full width.

### src/app/page.tsx
- Wrapped `Home`'s `<h1>` and top-level `<OwnerPage>` in a box (via `PAGE_MAX_WIDTH_CLASS`) inside
  `<main>`, so the cap applies once and covers everything — the tab bar chrome and all nested tab
  content — rather than only `ContentSection` blocks.
- Left-justified per designer feedback (no `mx-auto` — the box sits at the left edge, not centered).
- Added a temporary `bg-pink-200` on the same box, at the designer's request, so the box's edges
  are visible while checking the width changes in the browser. Not yet removed — still in place.

### src/content/conventions/architecture/overview/content.ts
- Replaced the standalone intro paragraph with a new `['Project', 'Description']` table (rows:
  Project, Elements, Consumeables), folding in the original intro text plus a pointer to
  `node_modules/nextjs-shared/CONSUMING_PROJECTS.md`. Subject to further amendment by the designer.

### nextjs-shared cleanup pass (2026-09-01)

**Dependency:** `#reinstall` bumped `nextjs-shared` 2.1.48 → 2.1.84 (commit `f4f1fafe`).
No `package.json` change (bare `github:` spec, resolved via `--force`).

**Steps 1 & 2 (TableResult unwrap, `table:` on every call): no changes.** This project has no
database access — grep of `src/` found zero `table_*` / `fetch*` / `write_logging` / `sql()` /
`db` call sites. Only `nextjs-shared` use is `import OwnerPage from 'nextjs-shared/OwnerPage'`.
The `table_*` occurrences are documentation strings in `content.ts` data files. There is one
fire-and-forget `fetch('/api/dev/open-editor', ...)` in `ContentSection.tsx` (result unused, no
try/catch) — a plain browser `fetch`, not a `nextjs-shared` helper — left as-is.

### src/app/page.tsx
- function-order (strict): moved `Home` (the default export) above the six tab helper
  components. Helpers now ordered by first use — `WorkflowTab`, `SkillsTab`, `ConventionsTab`
  (used directly in `Home`), then `NamingTab`, `CodingStyleTab`, `SharedTab` (used in
  `ConventionsTab`). No arrow→function conversions needed — all seven were already `function`
  declarations. Bodies and the plain single-dash helper headers unchanged.
- function-headers: added the numbered `1) DESCRIPTION` main header (double-equals border) at
  the top of the file for `Home`. No `Parameters:`/`Returns:` sub-sections (propless component
  returning JSX). No `2) NOTES` / `3) CHANGE HISTORY`.

### src/components/ContentSection.tsx
- function-order (strict): moved `ContentSection` (the default export) above its helpers.
  Helpers now ordered by first use — `renderBlock`, `openInEditor` (used in `ContentSection`),
  and within `renderBlock`: `renderParagraphText`, `cellPlainText`, `renderCell`. No
  arrow→function conversions needed. `.map` / `onDoubleClick` inline callbacks left as arrows.
- function-headers: replaced the plain single-dash `ContentSection` header with the numbered
  `1) DESCRIPTION` main header (double-equals border, between the `'use client'` directive and
  the imports), with a `Parameters:` sub-section for `blocks` / `sourcePath`. Helper single-dash
  headers left as-is (already canonical bordered style).

### src/app/api/dev/open-editor/route.ts
- function-headers: replaced the plain single-dash `POST` header with the numbered
  `1) DESCRIPTION` main header (double-equals border, before the imports — no directive in this
  file), with `Parameters:` (`request` / JSON body) and `Returns:` (success + 403) sub-sections.
  No reorder (single export).

### src/app/layout.tsx
- function-headers: added the numbered `1) DESCRIPTION` main header (double-equals border, before
  the imports) for `RootLayout`, with a `Parameters:` sub-section for `children`. `metadata`
  export left in place. No reorder (single export).

### cursor affordances (2026-09-01)

Follow-up to the observation that `OwnerPage` tabs showed the arrow cursor while non-interactive
dev content blocks showed the hand.

### src/app/globals.css
- Added an `@layer base` block setting `cursor: pointer` on `button:not(:disabled)` and
  `[role="button"]:not(:disabled)`. Tailwind v4's Preflight no longer does this (v3 did); the
  rule restores it project-wide so the `MyTab` `<button>` tabs rendered by `OwnerPage` show the
  hand cursor again. Disabled controls keep the default arrow.

### src/components/ContentSection.tsx
- Removed `cursor-pointer` from the dev-only (`IS_DEV`) block wrapper's className — now just
  `hover:bg-yellow-50 rounded transition-colors`. The handler is `onDoubleClick`, so a single
  click does nothing; the hand cursor implied a single-click action that isn't there. The hover
  background stays as the affordance hint.

## Testing
- [ ] Run the app in dev mode, go to any content tab (e.g. Skills > Overview), single-click a
      block — confirm nothing happens (no editor opens).
- [ ] Double-click the same block — confirm it opens the corresponding source file
      (e.g. `src/content/skills/overview/content.ts`) in VS Code.
- [ ] Confirm a production build (`npm run build`) still renders blocks with no click handler at
      all (non-dev behavior unchanged).
- [ ] Open the Workflow tab — confirm it now shows two sub-tabs, "Triggers" and "Rules", with the
      same content that used to appear as one combined Workflow tab.
- [ ] Switch between Workflow's Triggers/Rules sub-tabs, navigate away and back — confirm the
      selected sub-tab is remembered (via `persistKey='workflow-sub-tabs'`).
- [ ] Open the Permissions tab — confirm the intro paragraph names
      `~/.claude/settings.json` and the "Two hooks" table names
      `permission-exceptions.sh` / `project-isolation-guard.js`.
- [ ] Open Conventions > Naming > Database naming — confirm the "Column Name" row's Description
      cell now renders as a 5-item bulleted list instead of one paragraph.
- [ ] Open Conventions > Constants — confirm the "Catches undisclosed decisions" row's
      Description cell now renders as a 2-item bulleted list instead of one paragraph.
- [ ] At a wide browser width, confirm the whole page — heading, tab bar, and tab content — is
      capped at `max-w-screen-2xl`, left-justified (not centered), not just the content blocks.
      The box currently has a pink debug background — remove `bg-pink-200` from `page.tsx`'s
      `Home` once you're done checking the width visually.
- [ ] Open Conventions > Architecture > Overview — confirm both the "Topic" and "Where this shows
      up elsewhere in this setup" tables now span the full page width, not just as much as their
      own content needs.
- [ ] Open the Permissions tab — confirm both tables (Category, Hook) now render at the same
      full page width as each other, instead of one being visibly narrower than the other.
- [ ] Spot-check a couple more tables elsewhere (e.g. Skills > Overview, Workflow > Triggers) —
      confirm they also span full width and columns still look reasonable (first column narrow
      and fixed, last column taking the remaining space).
- [ ] Open Conventions > Architecture > Overview — confirm a new "Project" table appears first,
      with rows Project/Elements/Consumeables, and that Consumeables names
      `node_modules/nextjs-shared/CONSUMING_PROJECTS.md`.

### nextjs-shared cleanup pass
- [ ] Comment/reorder-only + dependency bump — verified via `npx tsc --noEmit` + `npm run build`
      (both clean, after `#reinstall` to `nextjs-shared` 2.1.84). No user-facing behaviour change.
- [ ] `npm run dev`, open the app — confirm all tabs and nested sub-tabs (Workflow, Skills,
      Conventions → Naming / Coding-style / Architecture) still render, since `page.tsx` function
      order changed.
- [ ] In dev, double-click a content block on any tab — confirm it still opens the matching
      `content.ts` in the editor (`ContentSection.tsx` / `open-editor/route.ts` were reordered /
      re-headered).

### cursor affordances
- [ ] `npm run dev`, hover over a top-level tab and a nested sub-tab — confirm the cursor is now
      the hand (pointer), not the arrow.
- [ ] Hover over a dev content block — confirm the cursor is the normal arrow (no hand), while
      the yellow hover background still appears.
- [ ] Confirm no regression on any genuinely disabled button elsewhere — it should still show the
      default arrow, not the hand.
