import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Claude Code's tool permissions live in one settings file. This setup's allow list is broad. Reading files, editing/writing, running shell commands are all allowed without a prompt, and edits themselves never trigger a permission prompt either.",
  },
  {
    type: "paragraph",
    text: "That's deliberate, not loose. The permission layer is not where control is meant to happen. The plan-gate is (see the Workflow tab). Once a plan is agreed and its scope is agreed, execution is meant to proceed without hindrance. Permissions exist only to catch a narrow set of actions that are hard to reverse or reach outside the current project. They don't gate ordinary edits within an already-agreed plan's scope.",
  },
  { type: "heading", text: "Actions that always require explicit confirmation" },
  {
    type: "table",
    headers: ["Category", "Description"],
    rows: [
      ["Installs and downloads", "Package/tool installs and binary downloads"],
      [
        "Destructive git operations",
        "Force-push, hard reset, deleting a branch, cleaning untracked files",
      ],
      ["Destructive database CLI access", "Any direct database command-line tool invocation"],
      ["Killing processes", "Stopping a running process before it completes"],
    ],
  },
  {
    type: "paragraph",
    text: "Each category exists because of a real failure mode: an unrequested install or download running silently, an accidentally-destructive git operation, direct destructive SQL run outside the normal manual-review flow, or a killed process nobody asked to stop.",
  },
  { type: "heading", text: "Two hooks reinforce this at the tool layer" },
  {
    type: "table",
    headers: ["Hook", "Description"],
    rows: [
      [
        "Per-command exception mechanism",
        "Lets one specific, exact command be exempted from a confirmation rule while everything else in that command's family still asks",
      ],
      [
        "Project-isolation guard",
        "Blocks any file edit/write whose target resolves outside the current project (or outside Claude's own working files). This only matters if the reader runs Claude across multiple concurrent projects sharing one configuration. A single-project setup gets no value from it, for a different reason than wrong tech stack",
      ],
    ],
  },
];
