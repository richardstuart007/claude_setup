import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "Tables owned by the shared package use x instead of t as the first character, specifically to avoid clashing with any consuming project's own table names.",
  },
  {
    type: 'table',
    headers: ['Table', 'Description'],
    rows: [
      ['xlg_logging', 'Application log entries. Full schema on the Logging tab'],
      ['xsc_schema', 'Schema snapshots, used for comparing database structure across environments'],
    ],
  },
  { type: 'heading', text: 'Table Functions' },
  {
    type: 'paragraph',
    text: 'Every database read and write goes through a fixed set of generic functions, never a direct call to the database library:',
  },
  {
    type: 'paragraph',
    text: 'Why these functions exist instead of calling the database directly:',
  },
  {
    type: 'table',
    headers: ['Reason', 'Description'],
    rows: [
      [
        'Connection',
        'Every function routes through the same db.ts, rather than each caller opening its own connection',
      ],
      [
        'Automatic logging',
        "Each call logs itself to the shared logging table under its own function name, so a log line shows the operation type at a glance without reading the SQL text. A direct database call loses that signal entirely",
      ],
      [
        'Caching built in',
        'Reads can be served from a per-user cache, keyed on the exact query, instead of hitting the database every time',
      ],
    ],
  },
  {
    type: 'table',
    headers: ['Table Functions', 'Description'],
    rows: [
      ['table_fetch', 'Fetch rows from any table'],
      ['table_write', 'Insert a row'],
      ['table_update', 'Update a row'],
      ['table_upsert', 'Insert or update a row'],
      ['table_delete', 'Delete a row'],
      ['table_count', 'Count rows'],
      ['table_check', 'Check row existence'],
      [
        'table_query',
        'Raw SQL, for queries too complex for the functions above (joins, computed SET/WHERE expressions, subqueries). Still routed through this same layer',
      ],
      ['fetchFiltered', 'Paginated, filtered SELECT'],
      ['fetchTotalPages', 'Page count for pagination'],
    ],
  },
  {
    type: 'table',
    headers: ['Schema & Logging Functions', 'Description'],
    rows: [
      ['write_logging', 'Write to the shared logging table'],
      ['schemaSnapshot', "Snapshot a database's schema for comparison"],
      ['schemaCompare', 'Diff two schema snapshots'],
      ['copyTables', 'Copy table data between databases'],
    ],
  },
  { type: 'heading', text: 'Cache' },
  {
    type: 'paragraph',
    text: "A per-user, server-side cache keyed on the exact query being cached, sitting in front of database reads that are safe to serve slightly stale. Read-heavy, display-oriented data is a good fit; anything checking live state should bypass the cache entirely, since a cache with no automatic expiry can otherwise return the same stale result indefinitely until it's explicitly cleared or the server restarts. Whether this is worth adopting elsewhere depends entirely on whether the reader's own project has a read-heavy hot path worth protecting. It's not a default yes.",
  },
]
