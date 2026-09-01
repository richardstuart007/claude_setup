import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
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
        {
          spacing: "blank-line",
          list: [
            "Starts the planning phase: the designer and Claude create a short written record of what will change, agreed before anything is touched.",
            "Iterated on freely until it's fixed.",

            "The designer is normally in Edit Automatically mode throughout, including during planning phase.  This planning phase is not to be confused with Claude Code's own Plan Mode.  It's a workflow convention layered on top of Claude Code's permission system.",
            "A designer should spend more time in the planning phase than any other phase.",
            "No code changes while in planning mode.",
          ],
        },
      ],
      [
        "/code",
        "code",
        {
          spacing: "blank-line",
          list: [
            "Starts the coding phase once planning is agreed.",
            "Claude may prompt with questions or choices that come up during implementation, with any answers written back into the plan rather than left undocumented.",
            "Works through the plan step by step, checking off each item as it goes, with no need to pause for confirmation mid-run — that pause already happened when the plan was agreed.",
            "Won't allow a commit until every item in the plan has been checked off.",
            "Once every step is complete, presents a test plan for the designer to manually verify.",
            "Testing may reveal changes to the plan, in which case the cycle repeats within the same coding phase; it may also reveal the need for an entirely new plan, to be created and implemented at a future date.",
          ],
        },
      ],
      ["/commit", "commit", "Moves all code changes to GitHub and completes the plan."],
    ],
  },
];
