import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'table',
    headers: ['Component', 'Description'],
    rows: [
      [
        'OwnerLayout',
        "Dev-only guard layout with a sessionStorage back-link. The guard reads the NEXT_PUBLIC_APPENV_ISDEV environment variable; unless it's exactly 'true', the layout redirects away instead of rendering its children",
      ],
      [
        'OwnerPage',
        "Tabbed page chrome; accepts a tabs array of label/content pairs. Used throughout this document's own UI",
      ],
      ['OwnerTableLogging', 'A paginated view of the shared logging table'],
      ['OwnerTableCache', 'An inspector for the shared cache'],
      ['DevLayoutHeader', 'A dev-environment header, with optional dbLocation/extraLinks props'],
      [
        'OwnerSyncVersions',
        'The Versions-tab panel for pinning a package to a non-latest version across every consuming project',
      ],
    ],
  },
]
