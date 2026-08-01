import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
  {
    type: "table",
    headers: ["Tab", "Description"],
    rows: [
      ["Workspace", "Claude and Plan"],
      [
        "Workflow",
        "When Claude executes code changes and the rules that prevent silent, unrequested changes",
      ],
      [
        "Skills",
        "The mechanism for packaging a repeatable procedure, split into what the designer runs directly vs. what Claude recognizes from a situation",
      ],
      [
        "Permissions",
        "What's freely allowed vs. what requires explicit confirmation, and why the balance is deliberately skewed toward the plan-gate doing the real work",
      ],

      ["Conventions", "Naming, Constants, Coding-style, and Architecture"],
    ],
  },
];
