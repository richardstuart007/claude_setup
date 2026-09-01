import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
  {
    type: "table",
    headers: ["Rule", "Description"],
    rows: [
      [
        "One named file",
        "Any hardcoded literal that represents a real decision (a batch size, a retry count, a default category, a threshold) lives in one named constants file per project",
      ],

      [
        "Agreed before use",
        "Written into the plan with its actual value and explicitly agreed, before it's used in any code",
      ],
      [
        "Catches undisclosed decisions",
        {
          list: [
            "Constants as explicit imports make it easier for the designer to see when Claude has made a decision and not said so.",
            "One more method to catch Claude making decisions without informing the designer.",
          ],
        },
      ],
    ],
  },
];
