import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "Scenario-specific: shared UI components in this setup deliberately carry no layout opinions of their own — no width, height, padding, scroll, or border decisions baked in. The project consuming a component controls all of that itself. Administrative pages use the full viewport width; a consumer-facing page's width constraints are decided by the consuming project based on the device it targets.",
  },
]
