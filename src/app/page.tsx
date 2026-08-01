import OwnerPage from 'nextjs-shared/OwnerPage'
import ContentSection from '@/components/ContentSection'
import { content as overviewContent } from '@/content/overview/content'
import { content as workspaceContent } from '@/content/workspace/content'
import { content as workflowContent } from '@/content/workflow/content'
import { content as skillsContent } from '@/content/skills/overview/content'
import { content as planContent } from '@/content/skills/plan/content'
import { content as codeContent } from '@/content/skills/code/content'
import { content as commitContent } from '@/content/skills/commit/content'
import { content as auditContent } from '@/content/skills/audit/content'
import { content as reinstallContent } from '@/content/skills/reinstall/content'
import { content as claudeContent } from '@/content/skills/claude/content'
import { content as permissionsContent } from '@/content/permissions/content'
import { content as namingDatabaseContent } from '@/content/conventions/naming/database/content'
import { content as namingSqlContent } from '@/content/conventions/naming/sql/content'
import { content as namingDdEnforcementContent } from '@/content/conventions/naming/dd-enforcement/content'
import { content as namingComponentPropsContent } from '@/content/conventions/naming/component-props/content'
import { content as constantsContent } from '@/content/conventions/constants/content'
import { content as restrictionsContent } from '@/content/conventions/coding-style/restrictions/content'
import { content as styleCommentsContent } from '@/content/conventions/coding-style/comments/content'
import { content as styleFunctionsContent } from '@/content/conventions/coding-style/functions/content'
import { content as styleFileStructureContent } from '@/content/conventions/coding-style/file-structure/content'
import { content as styleAsyncContent } from '@/content/conventions/coding-style/async/content'
import { content as styleLayoutContent } from '@/content/conventions/coding-style/layout/content'
import { content as styleFiltersContent } from '@/content/conventions/coding-style/filters/content'
import { content as styleTypescriptContent } from '@/content/conventions/coding-style/typescript/content'
import { content as sharedContent } from '@/content/conventions/architecture/overview/content'
import { content as sharedComponentsContent } from '@/content/conventions/architecture/components/content'
import { content as sharedUiComponentsContent } from '@/content/conventions/architecture/ui-components/content'
import { content as sharedTablesContent } from '@/content/conventions/architecture/tables/content'
import { content as sharedLoggingContent } from '@/content/conventions/architecture/logging/content'

//----------------------------------------------------------------------------------------------
//  SkillsTab — a nested tab bar with one sub-tab per skill, Overview leading
//----------------------------------------------------------------------------------------------
function SkillsTab() {
  return (
    <OwnerPage
      persistKey='skills-sub-tabs'
      tabs={[
        { label: 'Overview', content: <ContentSection blocks={skillsContent} sourcePath='src/content/skills/overview/content.ts' /> },
        { label: 'plan', content: <ContentSection blocks={planContent} sourcePath='src/content/skills/plan/content.ts' /> },
        { label: 'code', content: <ContentSection blocks={codeContent} sourcePath='src/content/skills/code/content.ts' /> },
        { label: 'commit', content: <ContentSection blocks={commitContent} sourcePath='src/content/skills/commit/content.ts' /> },
        { label: 'audit', content: <ContentSection blocks={auditContent} sourcePath='src/content/skills/audit/content.ts' /> },
        { label: 'reinstall', content: <ContentSection blocks={reinstallContent} sourcePath='src/content/skills/reinstall/content.ts' /> },
        { label: 'Claude', content: <ContentSection blocks={claudeContent} sourcePath='src/content/skills/claude/content.ts' /> },
      ]}
    />
  )
}

//----------------------------------------------------------------------------------------------
//  NamingTab — a nested tab bar: Database naming, SQL conventions, DD enforcement,
//  Component props
//----------------------------------------------------------------------------------------------
function NamingTab() {
  return (
    <OwnerPage
      persistKey='naming-sub-tabs'
      tabs={[
        { label: 'Database naming', content: <ContentSection blocks={namingDatabaseContent} sourcePath='src/content/conventions/naming/database/content.ts' /> },
        { label: 'SQL conventions', content: <ContentSection blocks={namingSqlContent} sourcePath='src/content/conventions/naming/sql/content.ts' /> },
        { label: 'DD enforcement', content: <ContentSection blocks={namingDdEnforcementContent} sourcePath='src/content/conventions/naming/dd-enforcement/content.ts' /> },
        { label: 'Component props', content: <ContentSection blocks={namingComponentPropsContent} sourcePath='src/content/conventions/naming/component-props/content.ts' /> },
      ]}
    />
  )
}

//----------------------------------------------------------------------------------------------
//  CodingStyleTab — a nested tab bar: Comments, Functions, File structure, Async, Layout,
//  Filters, TypeScript, Restrictions
//----------------------------------------------------------------------------------------------
function CodingStyleTab() {
  return (
    <OwnerPage
      persistKey='coding-style-sub-tabs'
      tabs={[
        { label: 'Comments', content: <ContentSection blocks={styleCommentsContent} sourcePath='src/content/conventions/coding-style/comments/content.ts' /> },
        { label: 'Functions', content: <ContentSection blocks={styleFunctionsContent} sourcePath='src/content/conventions/coding-style/functions/content.ts' /> },
        { label: 'File structure', content: <ContentSection blocks={styleFileStructureContent} sourcePath='src/content/conventions/coding-style/file-structure/content.ts' /> },
        { label: 'Async', content: <ContentSection blocks={styleAsyncContent} sourcePath='src/content/conventions/coding-style/async/content.ts' /> },
        { label: 'Layout', content: <ContentSection blocks={styleLayoutContent} sourcePath='src/content/conventions/coding-style/layout/content.ts' /> },
        { label: 'Filters', content: <ContentSection blocks={styleFiltersContent} sourcePath='src/content/conventions/coding-style/filters/content.ts' /> },
        { label: 'TypeScript', content: <ContentSection blocks={styleTypescriptContent} sourcePath='src/content/conventions/coding-style/typescript/content.ts' /> },
        { label: 'Restrictions', content: <ContentSection blocks={restrictionsContent} sourcePath='src/content/conventions/coding-style/restrictions/content.ts' /> },
      ]}
    />
  )
}

//----------------------------------------------------------------------------------------------
//  ConventionsTab — a nested tab bar: Naming, Constants, Coding-style, Architecture
//----------------------------------------------------------------------------------------------
function ConventionsTab() {
  return (
    <OwnerPage
      persistKey='conventions-sub-tabs'
      tabs={[
        { label: 'Naming', content: <NamingTab /> },
        { label: 'Constants', content: <ContentSection blocks={constantsContent} sourcePath='src/content/conventions/constants/content.ts' /> },
        { label: 'Coding-style', content: <CodingStyleTab /> },
        { label: 'Architecture', content: <SharedTab /> },
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
        { label: 'Overview', content: <ContentSection blocks={sharedContent} sourcePath='src/content/conventions/architecture/overview/content.ts' /> },
        { label: 'Components', content: <ContentSection blocks={sharedComponentsContent} sourcePath='src/content/conventions/architecture/components/content.ts' /> },
        { label: 'UI Components', content: <ContentSection blocks={sharedUiComponentsContent} sourcePath='src/content/conventions/architecture/ui-components/content.ts' /> },
        { label: 'Tables', content: <ContentSection blocks={sharedTablesContent} sourcePath='src/content/conventions/architecture/tables/content.ts' /> },
        { label: 'Logging', content: <ContentSection blocks={sharedLoggingContent} sourcePath='src/content/conventions/architecture/logging/content.ts' /> },
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
          { label: 'Overview', content: <ContentSection blocks={overviewContent} sourcePath='src/content/overview/content.ts' /> },
          { label: 'Workspace', content: <ContentSection blocks={workspaceContent} sourcePath='src/content/workspace/content.ts' /> },
          { label: 'Workflow', content: <ContentSection blocks={workflowContent} sourcePath='src/content/workflow/content.ts' /> },
          { label: 'Skills', content: <SkillsTab /> },
          { label: 'Permissions', content: <ContentSection blocks={permissionsContent} sourcePath='src/content/permissions/content.ts' /> },
          { label: 'Conventions', content: <ConventionsTab /> },
        ]}
      />
    </main>
  )
}
