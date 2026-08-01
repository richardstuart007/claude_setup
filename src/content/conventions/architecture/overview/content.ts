import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "Scenario-specific to this author's setup: a private shared package, consumed by several of the author's own Next.js projects, providing all direct database access, shared UI components, and utility functions. Consuming projects never call the database directly. They always go through this package.",
  },
  {
    type: 'table',
    headers: ['Topic', 'Description'],
    rows: [
      [
        'Why it exists',
        "One place to fix a bug or add a feature benefits every consuming project at once, instead of the same code being copied and maintained separately in each. This only pays off once there's more than one project sharing it. A solo, single-project setup gets no benefit from splitting anything out this way.",
      ],
      [
        'What it owns',
        'Generic database functions every consuming project uses instead of writing raw queries directly, a small set of shared primitive components (see the Components tab) and full UI panels (see the UI Components tab), its own database tables and a per-user server-side cache (see the Tables tab), and a shared logging table (see the Logging tab).',
      ],
      [
        'Consumption discipline',
        "A consuming project's own session reads this package's own reference document at the start of every session, rather than relying on memory of its API from an earlier session, since the package can change between sessions. Before implementing a utility function locally in a consuming project, the question is asked: would this be useful in more than one project, with no project-specific dependencies? If yes, adding it to the shared package is proposed first, instead of writing a local copy that every other project then has to duplicate independently if it turns out to need the same thing. If an existing shared component or function almost fits a requirement but can't quite satisfy it, the gap is noted and an amendment to the shared package is proposed — typically a new opt-in option that defaults to the current behavior, so existing consumers are unaffected — rather than working around the gap with one-off local code. The same one-place-to-fix-it reasoning that justifies having a shared package at all is undermined if every near-miss gets quietly patched around locally instead of fed back into the shared source.",
      ],
      [
        'Reusable UI components',
        "When a control's choices are a hardcoded value list (a dropdown, a toggle-button group, a multi-select filter) and that same choice set is likely needed in more than one place, it's extracted into a reusable component up front, rather than inlining the option list at each call site again. The component owns the option list as a named constant, a default selected value where relevant, and a prop that lets an individual call site override the list when it genuinely needs a different one. This doesn't apply to a genuinely single-use, one-off control tightly coupled to its surrounding logic. It applies once the same value set is used, or is clearly about to be used, in more than one place: at that point a duplicated option list stops being a convenience and starts being a maintenance liability, since a value added to one copy but not the others silently diverges without anything flagging the inconsistency.",
      ],
      [
        'Adopting an existing package',
        "Before writing custom logic of real complexity — a parser, a rendering engine, a scheduling or recurrence algorithm, a diffing routine, a state machine, a validation layer, anything where getting the edge cases right is itself the hard part — the question is asked first: does a mature, widely-used package already do this well? If one plausibly does, it's named and agreed explicitly before writing custom code instead of using it. The failure mode this guards against: hand-building something a mature library already solves well, only to have the hand-built version turn out limited enough that it eventually gets abandoned and rewritten using the library that should have been adopted from the start. That outcome recurring more than once, independently, in more than one place, is strong evidence the original custom build was the wrong call to begin with — not just a stylistic preference after the fact.",
      ],
      [
        'Building custom infrastructure',
        "The trigger for checking first is genuine complexity or edge-case risk, not a fixed list of named domains — markdown rendering, diagramming, and charting are examples that satisfy the test, not the boundary of it. \"It's simple enough to hand-roll\" or \"this gives more control over the format\" are not, on their own, sufficient reasons to skip this: they have to be stated and agreed as the actual reason for going custom, the same way any other judgment call gets surfaced rather than resolved silently. Genuinely mechanical logic — a one-line date format, a basic string transform — doesn't need this treatment.",
      ],
    ],
  },
  {
    type: 'table',
    headers: ['Where this shows up elsewhere in this setup', 'Description'],
    rows: [
      ['The audit skill', 'Orchestrates a rollout of a change across every consuming project'],
      [
        'The onboarding and version-pinning skills',
        'Integrate this package into a project, and pin every consuming project to the same version',
      ],
      [
        'The x-prefix table-naming convention',
        'Covered on the Naming conventions sub-tab (under Conventions)',
      ],
      [
        'The component sub-element prop-naming convention (className/labelClass/titleClass/containerClass)',
        'Also on the Naming conventions sub-tab (under Conventions)',
      ],
    ],
  },
]
