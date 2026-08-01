import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  { type: 'heading', text: 'Primitive components' },
  {
    type: 'paragraph',
    text: "Every one of these accepts an overrideClass prop, merged with its default styling rather than replacing it outright. A caller can adjust the look without forking the component. Sub-elements with their own hardcoded styling (a label, a heading, a wrapper) expose their own override prop too (labelClass, titleClass, containerClass), following the naming convention on the Naming conventions sub-tab (under Conventions).",
  },
  {
    type: 'table',
    headers: ['Component', 'Description'],
    rows: [
      ['MyButton', 'A standard button'],
      ['MyInput', 'A single-line text input'],
      ['MySelect / MyDropdown', 'A single-choice dropdown/select input'],
      ['MySelectMulti', 'A multi-select variant of the same'],
      ['MyTextarea', 'A multi-line text input'],
      ['MyCheckbox', 'A checkbox input'],
      ['MyConfirmDialog', 'A confirmation dialog, shown before a destructive or otherwise significant action'],
      ['MyTab', 'A tab-bar component; OwnerPage itself is built on this'],
      ['MyBackHomeNav', 'A "back to home" navigation link'],
      ['MyBox', 'A bordered box container, with an optional title'],
      ['MyLink', "A Next.js Link wrapper taking a structured href (reference/pathname/segment/query) instead of a plain string"],
      ['MyPopup', 'A modal dialog, with an optional close-on-backdrop-click and its own close button'],
      ['MyPagination', 'Pagination controls (previous/next arrows) driven by page-number state'],
      ['MyToggle', 'A toggle/switch input'],
      ['MyHourGlass', 'An animated hourglass-emoji spinner'],
      ['MyLoadingMessage', 'An hourglass spinner with up to two lines of message text'],
      ['MyHelp', 'A help panel listing multiple heading/body items, toggled open by a button'],
      ['MyHelpStep', 'A step-by-step help panel (input/processing/output/consumers), toggled open by a button'],
      ['MyHelpField', 'A hover tooltip triggered by a small "?" circle'],
    ],
  },
]
