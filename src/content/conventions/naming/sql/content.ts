import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
  {
    type: "table",
    headers: ["Rule", "Description"],
    rows: [
      [
        "Identity columns",
        "An auto-incrementing primary key uses the SQL-standard identity-column syntax, never the older Postgres-specific auto-increment shorthand. The standard syntax has cleaner ownership semantics and inherits table permissions automatically",
      ],
      [
        "No table.column notation",
        "Every column name is unique across the entire schema by convention, so a column is referenced by its bare name, not qualified with its table. A self-join, where the same table appears twice in one query, is the one situation where qualification is unavoidable",
      ],
      [
        "No foreign key references",
        "Tables are kept completely standalone, with no cross-table references declared at the schema level",
      ],
      [
        "No CASCADE, anywhere",
        "Never used on a drop or a foreign key in any context, since a cascading delete can silently take far more with it than the person running the statement intended",
      ],
    ],
  },
];
