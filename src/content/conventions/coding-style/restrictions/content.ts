import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "A set of things never done without being explicitly asked first, regardless of how small or how obviously-correct the change might seem. Each exists to stop a plausible-looking cleanup from quietly destroying intent, history, or a deliberate design choice.",
  },
  {
    type: 'table',
    headers: ['Restriction', 'Why'],
    rows: [
      ['Never strip comments', 'Comment headers and inline comments are treated as intentional, not clutter to tidy away'],
      ['Never rename functions, variables, or files', 'Names are deliberate; a rename silently breaks every caller and severs git history for that identifier. In a package consumed by other projects, a rename breaks every consumer at once, not just local callers'],
      ['Never restructure or reorganize code', "Reordering functions, extracting helpers, or splitting files isn't done unless explicitly instructed, even when it would arguably read better"],
      ['Never add abstractions speculatively', 'Only what is asked for gets built; no designing for a hypothetical future requirement'],
      [
        'Never embed data-destructive operations in code or automation',
        'Bulk deletes and destructive schema changes never appear in application code, scripts, or migration functions — that class of operation is run manually, by a human, one time, with a backup taken first',
      ],
      [
        'Database changes are executed manually',
        "Schema and data changes are provided as SQL text for a human to run through a database tool of their choosing, never as a file, and never executed directly. Once run, the SQL isn't kept anywhere further — it did its job",
      ],
      [
        'No migration scripts or migration functions',
        'Schema evolution is handled entirely by a human running provided SQL, not by code that runs migrations automatically',
      ],
      [
        "One schema file is the source of truth",
        'Every new table and index is added to a single project-wide schema file; there is no second, competing source describing the database structure',
      ],
      [
        'Never hardcode a real-world list without confirmation',
        "Before writing a constant array or object enumerating real-world entities (paths, names, versions, environments, URLs), the list is confirmed with the user rather than inferred from context. The one list important enough to be structurally derived instead of just confirmed is the project list itself (see the Workspace tab)",
      ],
      [
        'Always assign a function result to a name before returning it',
        "const result = fn(args); return result rather than return fn(args) directly, so the value is inspectable mid-debug. This is a debugging-ergonomics convention that trades a little verbosity for that inspectability — worth adopting anywhere a debugger is the primary tool for stepping through a failure. A UI framework's own renderable elements are typically the one exception, since they aren't meaningfully inspectable as data the way a plain value is",
      ],
      [
        "Don't flag a framework's implicit import as missing",
        "Some frameworks make a core import available without an explicit import line; flagging its absence as an error is noise specific to how that framework works, not a real problem",
      ],
      [
        'A dedicated tool owns non-latest version pinning',
        "When a dependency needs pinning to a specific version across every consuming project, that's done through a purpose-built tool for it, rather than hand-editing a manifest file or adding a workaround override block",
      ],
    ],
  },
]
