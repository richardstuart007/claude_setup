import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
  {
    type: "table",
    headers: ["Kind", "Example"],
    rows: [
      [
        "Function",
        "A function deriving distinct club values is about club, so club belongs in its name. If the DD item is club, the function may be club_fetch",
      ],
      [
        "Component",
        "A club multi-select component is named from that item, e.g. clubOptions. For example, Club_Options",
      ],
      ["Dropdown/option list", "clubOptions, not a generic optionsA/dropdown1"],
      [
        "Table column reference",
        "The bare column name is already its DD identifier; no table.column notation",
      ],
      ["Filter's state variable", "A filter on column se_club is filter_club / setFilter_club"],
    ],
  },
];
