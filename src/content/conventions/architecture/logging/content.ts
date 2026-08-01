import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: 'A single database table that every server-side function writes to, so any error, warning, or informational event is queryable in one place rather than scattered across console output. The convention:',
  },
  {
    type: 'table',
    headers: ['Column', 'Description'],
    rows: [
      [
        'lg_severity',
        "Log severity as a single character: E for an error, W for a warning, I for informational",
      ],
      [
        'lg_level',
        'A level for verbosity or importance, defaulting to 1. Lets a reader filter noisy detail out from higher-priority entries without a separate log table',
      ],
      [
        'lg_isupdate',
        'Whether the call was a write (insert/update/delete) rather than a read, defaulting to false. Distinguishes routine reads from the writes that actually changed data',
      ],
      [
        'lg_caller',
        'The calling context that invoked this operation, e.g. which page or higher-level function triggered it, passed in by the caller rather than inferred',
      ],
      [
        'lg_functionname',
        'The name of the specific generic function that ran (table_fetch, table_write, write_logging, etc.). This is the key signal: a log line shows the operation type at a glance without reading the SQL text',
      ],
      [
        'lg_table',
        'Which table the operation targeted, where applicable. Optional, since not every logged event is about a specific table',
      ],
      [
        'lg_msg',
        'The actual log message: the SQL query and its parameters for a routine call, or the error message for a failure',
      ],
      ['lg_datetime', 'When the entry was written, so log entries can be read back in order'],
    ],
  },
  {
    type: 'paragraph',
    text: "Postgres-specific as implemented. A reader without Postgres would substitute their own database's equivalent log store; the transferable part is one central log destination with a consistent shape, not the exact table structure.",
  },
  { type: 'heading', text: 'How application code writes to it' },
  {
    type: 'paragraph',
    text: "A failure is never logged with a bare error object alone. The message states the consequence first, followed by the underlying error text, so a reader scanning the log sees the impact before the mechanism. Severity is one of three fixed values: an error, a warning, or purely informational.",
  },
]
