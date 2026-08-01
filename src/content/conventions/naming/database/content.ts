import type { ContentBlock } from "@/content/ContentBlock";

export const content: ContentBlock[] = [
  {
    type: "paragraph",
    text: "The core idea: a value's name stays tied to one canonical meaning everywhere it appears, whether in the database, in a query result, in a variable, or in a component prop. It's never renamed to something friendlier at each layer. The point is that a reader sees the canonical name and knows immediately what it is, with nothing to guess at.",
  },
  {
    type: "table",
    headers: ["What", "Pattern", "Example", "Description"],
    rows: [
      ["Table name", "txxx_table_name", "tusr_users", "Example table identifier is usr"],
      [
        "Primary Key",
        "xxx_xxxid (xxx_xxx_id also acceptable)",
        "usr_usrid",
        "id is the identifier",
      ],
      [
        "Column Name",
        "xxx_column_name",
        "usr_username",
        [
          { bold: "Data Dictionary (DD)" },
          ": a different, easily-confused sense of \"identifier\". Each column's full name (e.g. usr_usrid, gd_gdid) is itself a data-dictionary identifier. This is a canonical name for that value, not just a database detail. A value read from or written to a given column is named after that column's own data-dictionary identifier wherever it appears in code. It's never a different, more readable invention",
        ],
      ],
    ],
  },
];
