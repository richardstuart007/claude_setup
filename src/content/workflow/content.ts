import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
  { type: "heading", text: "Claude Environment" },
  {
    type: "paragraph",
    text: "The designer is normally in Edit Automatically (accept-edits) permission mode throughout, including during this planning phase, not using the tool-restricted Plan Mode Claude Code itself provides.  This planning phase is not to be confused with Claude Code's own Plan Mode. It's a workflow convention layered on top of Claude Code's permission system, not the same thing as that separate, built-in feature. ",
  },
  {
    type: "paragraph",
    text: "A designer should spend more time in the planning phase than any other phase. The actual code change, once a plan is agreed, is often the fast part.",
  },
  { type: "heading", text: "Triggers" },
  {
    type: "paragraph",
    text: "Typing the trigger word into the Claude interface is simply the designer's way of executing that skill.",
  },
  {
    type: "table",
    headers: ["Trigger", "Skill", "Description"],
    rows: [
      [
        "/plan",
        "plan",
        "Starts the planning phase: creates a plan of what changes are to be made",
      ],
      ["/code", "code", "Starts the coding phase: implements the agreed plan"],
      ["/commit", "commit", "Moves all code changes to GitHub and completes the plan"],
    ],
  },
  { type: "heading", text: "1. Planning phase (/plan)" },
  {
    type: "paragraph",
    text: "/plan starts the planning phase: the designer and Claude work together to create a plan of what changes are to be made. This is a short written record of what will change, agreed before anything is touched. The plan can be iterated on and changed as many times as warranted until it's fixed. No code is allowed to change while in planning mode.",
  },
  { type: "heading", text: "2. Coding phase (/code)" },
  {
    type: "paragraph",
    text: "/code starts the coding phase, and confirms that the planning has completed. Claude may prompt with questions or choices that come up during implementation. Any answers are written back into the plan itself, not left undocumented. As each part of the plan is implemented, it's checked off, until the whole plan is complete.",
  },
  {
    type: "paragraph",
    text: "Claude will not allow a commit whilst items in the plan have not been checked off during the coding phase.",
  },
  {
    type: "paragraph",
    text: "Once coding is complete, Claude presents a test plan for the designer to manually test.",
  },
  {
    type: "paragraph",
    text: "Testing may well reveal changes to the plan and the cycle repeats.  We are still be in the coding phase.",
  },
  {
    type: "paragraph",
    text: "It may be that testing reveals a new plan which can be created for implementation at a future date, then a new plan file is created.",
  },
  { type: "heading", text: "3. Commit (/commit)" },
  {
    type: "paragraph",
    text: "/commit executes the commit skill.  The commit moves all the code changes to github and completes the plan.",
  },
];
