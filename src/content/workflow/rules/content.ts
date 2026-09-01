import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
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
