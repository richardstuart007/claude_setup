# Window colors for claude_setup

## Plan
- [x] Create `.vscode/settings.json` in `claude_setup`, matching the full template used by other
  projects (prettier formatter, format-on-save, `[html]` formatter block), with
  `workbench.colorCustomizations` set to a distinct yellow — `#fde047` (yellow-300) for
  `titleBar.activeBackground`/`inactiveBackground`/`activityBar.background`, with dark foreground
  `#1f2937` (chosen over the other projects' white-on-dark scheme because this pale yellow needs
  dark text/icons for contrast). Distinct from chess's `#eab308` so the two windows stay visually
  distinguishable in the taskbar/window switcher.

## Changes
### .vscode/settings.json
- Created, using the same template shape as other projects (prettier formatter, format-on-save,
  `[html]` formatter block) plus `workbench.colorCustomizations` set to yellow-300 (`#fde047`) with
  dark foreground (`#1f2937`/`#4b5563`) — a distinct shade from chess's `#eab308` so the two
  windows remain visually distinguishable.

## Testing
- [ ] Reload/reopen the claude_setup window in VS Code and confirm the title bar and activity bar
  show the pale yellow (#fde047), not the default color
- [ ] Confirm the yellow is visibly different from chess's window color (amber, #eab308) when both
  are open side by side
