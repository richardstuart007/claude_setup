import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "The core idea: a value's name stays tied to one canonical meaning everywhere it appears, whether in the database, in a query result, in a variable, or in a component prop. It's never renamed to something friendlier at each layer. The point is that a reader sees the canonical name and knows immediately what it is, with nothing to guess at.",
  },
  { type: 'heading', text: 'Database naming' },
  {
    type: 'paragraph',
    text: "Postgres-specific, but the discipline transfers. Every table gets a 3-character code, unique across the whole schema; every column in that table is prefixed with the same code.",
  },
  {
    type: 'paragraph',
    text: "Tables owned by the shared package use x instead of t as the first character (e.g. xlg_logging, columns lg_*), specifically to avoid clashing with any consuming project's own table names.",
  },
  {
    type: 'table',
    headers: ['What', 'Pattern', 'Example', 'Description'],
    rows: [
      ['Table name', 'txxx_table_name', 'tusr_users (code: usr)', ''],
      ['Primary Key', 'xxx_xxxid (xxx_xxx_id also acceptable)', 'usr_usrid', 'Identifier'],
      [
        'Column Name',
        'xxx_column_name',
        'usr_username',
        [
          { bold: 'Data Dictionary (DD)' },
          ": a different, easily-confused sense of \"identifier\". Each column's full name (e.g. usr_usrid, gd_gdid) is itself a data-dictionary identifier. This is a canonical name for that value, not just a database detail. A value read from or written to a given column is named after that column's own data-dictionary identifier wherever it appears in code. It's never a different, more readable invention",
        ],
      ],
    ],
  },
  { type: 'heading', text: 'Enforcement of DD identifiers' },
  {
    type: 'paragraph',
    text: 'Anything operating on a specific data-dictionary item leads with that item\'s own name, with a role-indicating prefix or suffix added only to disambiguate. This applies beyond plain variables:',
  },
  {
    type: 'table',
    headers: ['Kind', 'Example'],
    rows: [
      [
        'Function',
        'A function deriving distinct club values is about club, so club belongs in its name. If the DD item is club, the function may be club_fetch',
      ],
      [
        'Component',
        'A club multi-select component is named from that item, e.g. clubOptions. For example, Club_Options',
      ],
      ['Dropdown/option list', 'clubOptions, not a generic optionsA/dropdown1'],
      ['Table column reference', "The bare column name is already its DD identifier; no table.column notation"],
      ["Filter's state variable", 'A filter on column se_club is filter_club / setFilter_club'],
    ],
  },
  { type: 'heading', text: "A separate convention specific to this setup's shared UI component package" },
  {
    type: 'paragraph',
    text: 'Any sub-element of a component with a hardcoded style class exposes that class as a named override prop, using a fixed suffix per role, so a caller can restyle just that one part without forking the component. This is the same one-canonical-name principle applied to component authoring rather than data values.',
  },
  {
    type: 'table',
    headers: ['Role', 'Prop'],
    rows: [
      ['The main element itself', 'className (plain passthrough)'],
      ['Label', 'labelClass'],
      ['Heading/title', 'titleClass'],
      ['Wrapper/container div', 'containerClass'],
    ],
  },
]
