import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'table',
    headers: ['Step', 'Description'],
    rows: [
      ['/commit', '/commit is a trigger which executes the Claude skill called commit.'],
      [
        'Manual SQL confirmation',
        "Runs once the user has tested and is satisfied. First confirms any manual database changes for the task have actually been run. The task is about to be considered closed and the plan archived, so this is the last point to confirm now rather than assuming it'll be caught later.",
      ],
      [
        'Version, stage, commit, push',
        "Then: bumps the version, stages and commits everything, not just the files the plan mentions. A narrower staging approach once caused a lockfile to go uncommitted and broke a production build. Then pushes.",
      ],
      [
        'Plan file cleanup',
        "Finally moves the plan file into docs/archive/ and commits/pushes that move too, instead of deleting it — the plan's full content stays browsable in the repo going forward, not just recoverable from git history.",
      ],
      [
        'Portability',
        "The version bump and build/check gate are Node/npm-specific (package.json's version field, a type-check pass, a build pass); a different stack would substitute its own version marker and its own check/build step.",
      ],
    ],
  },
]
