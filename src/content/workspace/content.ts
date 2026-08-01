import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
  {
    type: "table",
    headers: ["File", "Scope", "Purpose"],
    rows: [
      ["Global CLAUDE.md", "Global", "Shared, multi-project workspace"],
      [
        "Project CLAUDE.md",
        "Project",
        "Project's own instructions, layered on top of the global instructions",
      ],
      ["A plan file", "Plan", "Plan checked off as code is written"],
    ],
  },
  {
    type: "table",
    headers: ["Topic", "Description"],
    rows: [
      [
        "Project isolation",
        {
          spacing: "blank-line",
          list: [
            "Claude may read anything on the machine, but may only write, edit, or delete files inside the project currently being worked in.",
            "A hook enforces this at the tool layer, blocking any file-edit whose target resolves outside the current project.",
            "Known gap: a shell command writing via redirection or a copy/move isn't covered by the hook, only guarded by instruction.",
          ],
        },
      ],
      [
        "Exceptions",
        {
          spacing: "blank-line",
          list: [
            "A version-pinning tool in the shared package's own dev app, human-triggered through its own product feature rather than Claude acting on its own initiative.",
            "A database-admin project's own UI, human-triggered through its own product feature rather than Claude acting on its own initiative.",
            "/audit's own scoped, time-limited exception which temporarily allows edits into that named project from a shared-package session",
          ],
        },
      ],
    ],
  },
];
