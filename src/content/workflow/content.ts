import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
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
  {
    type: "table",
    headers: ["Claude Rules", "Description"],
    rows: [
      [
        "Verify a plan before executing it",
        "Before /code runs, the plan's assumptions are checked against reality: that required data actually exists, that an external interface returns the fields the plan assumes, that a change is actually possible the way the plan describes. A plan that depends on something unverified is flagged before it's executed, not discovered to be wrong partway through.",
      ],
      [
        "Never assume which environment is meant",
        "Scenario-specific: this setup has more than one environment (e.g. local vs. production), selected by which environment file was last copied into the active configuration. That active configuration's current contents are not a reliable signal of which environment the current conversation is actually about, since it may simply be left over from an earlier, unrelated session. Which environment a query or action is meant for is always either confirmed explicitly or already established in conversation, never inferred from whatever the active configuration currently happens to contain.",
      ],
      [
        "A manual replica of a scheduled/cron process must match it exactly",
        "When a manually-triggered action exists specifically to imitate what a scheduled process does automatically, it calls the exact same underlying code path the scheduled process uses, not a parallel implementation that merely approximates the same steps. A replica that skips a side effect (logging, a status update) the real path performs isn't a faithful replica, it just looks like one until the two are compared side by side.",
      ],
      [
        "During a testing/iteration phase, capture everything into the plan",
        "When the user is actively testing a feature and reporting observations as they go, every remark, however small, is added to the plan as a new item, not just the ones that happen to get an explicit follow-up trigger right away. A remark that's only ever discussed in chat and never written down is effectively lost, since the plan file (not the conversation) is the durable record of everything raised during that phase.",
      ],
    ],
  },
];
