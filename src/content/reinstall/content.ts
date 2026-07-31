import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: [{ bold: '/reinstall' }, ' is a trigger which executes the Claude skill called ', { bold: 'reinstall' }, '.'],
  },
  {
    type: 'paragraph',
    text: "Clean dependency reinstall and rebuild, run inside each consuming project after the shared package is pushed. Removes node_modules, the lockfile, and the build output, reinstalls, then runs a type-check and a build.",
  },
  {
    type: 'paragraph',
    text: 'Runs these steps in order, in the current project directory, stopping on the first failure:',
  },
  {
    type: 'code',
    text: `Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install --legacy-peer-deps
Remove-Item -Recurse -Force .next
npx tsc --noEmit
npm run build`,
  },
]
