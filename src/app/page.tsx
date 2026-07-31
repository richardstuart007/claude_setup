import OwnerPage from 'nextjs-shared/OwnerPage'
import ContentSection from '@/components/ContentSection'
import { content as overviewContent } from '@/content/overview/content'
import { content as workflowContent } from '@/content/workflow/content'
import { content as skillsContent } from '@/content/skills/content'
import { content as planContent } from '@/content/plan/content'
import { content as codeContent } from '@/content/code/content'
import { content as commitContent } from '@/content/commit/content'
import { content as auditContent } from '@/content/audit/content'
import { content as reinstallContent } from '@/content/reinstall/content'
import { content as skillslistContent } from '@/content/skillslist/content'
import { content as claudeContent } from '@/content/claude/content'
import { content as permissionsContent } from '@/content/permissions/content'
import { content as namingContent } from '@/content/naming/content'
import { content as constantsContent } from '@/content/constants/content'
import { content as sharedContent } from '@/content/shared/content'
import { content as sharedComponentsContent } from '@/content/shared-components/content'
import { content as sharedUiComponentsContent } from '@/content/shared-ui-components/content'
import { content as sharedTablesContent } from '@/content/shared-tables/content'
import { content as sharedLoggingContent } from '@/content/shared-logging/content'

//----------------------------------------------------------------------------------------------
//  SkillsTab — a nested tab bar with one sub-tab per skill, Overview leading
//----------------------------------------------------------------------------------------------
function SkillsTab() {
  return (
    <OwnerPage
      persistKey='skills-sub-tabs'
      tabs={[
        { label: 'Overview', content: <ContentSection blocks={skillsContent} /> },
        { label: 'plan', content: <ContentSection blocks={planContent} /> },
        { label: 'code', content: <ContentSection blocks={codeContent} /> },
        { label: 'commit', content: <ContentSection blocks={commitContent} /> },
        { label: 'audit', content: <ContentSection blocks={auditContent} /> },
        { label: 'reinstall', content: <ContentSection blocks={reinstallContent} /> },
        { label: 'skillslist', content: <ContentSection blocks={skillslistContent} /> },
        { label: 'Claude', content: <ContentSection blocks={claudeContent} /> },
      ]}
    />
  )
}

//----------------------------------------------------------------------------------------------
//  ConventionsTab — a nested tab bar: Naming, Constants, Shared (all demoted from main tabs)
//----------------------------------------------------------------------------------------------
function ConventionsTab() {
  return (
    <OwnerPage
      persistKey='conventions-sub-tabs'
      tabs={[
        { label: 'Naming', content: <ContentSection blocks={namingContent} /> },
        { label: 'Constants', content: <ContentSection blocks={constantsContent} /> },
        { label: 'Shared', content: <SharedTab /> },
      ]}
    />
  )
}

//----------------------------------------------------------------------------------------------
//  SharedTab — a nested tab bar for the nextjs-shared package: Overview, Components,
//  UI Components, Tables (cache included as part of Tables), Logging
//----------------------------------------------------------------------------------------------
function SharedTab() {
  return (
    <OwnerPage
      persistKey='shared-sub-tabs'
      tabs={[
        { label: 'Overview', content: <ContentSection blocks={sharedContent} /> },
        { label: 'Components', content: <ContentSection blocks={sharedComponentsContent} /> },
        { label: 'UI Components', content: <ContentSection blocks={sharedUiComponentsContent} /> },
        { label: 'Tables', content: <ContentSection blocks={sharedTablesContent} /> },
        { label: 'Logging', content: <ContentSection blocks={sharedLoggingContent} /> },
      ]}
    />
  )
}

export default function Home() {
  return (
    <main className='w-full px-6 py-10'>
      <h1 className='text-2xl font-semibold text-gray-700 mb-10'>Claude Setup</h1>
      <OwnerPage
        tabs={[
          { label: 'Overview', content: <ContentSection blocks={overviewContent} /> },
          { label: 'Workflow', content: <ContentSection blocks={workflowContent} /> },
          { label: 'Skills', content: <SkillsTab /> },
          { label: 'Permissions', content: <ContentSection blocks={permissionsContent} /> },
          { label: 'Conventions', content: <ConventionsTab /> },
        ]}
      />
    </main>
  )
}
