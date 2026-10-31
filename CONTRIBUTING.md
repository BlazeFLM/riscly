# Contributing to Riscly

Thanks for helping make computers understandable. Keep changes focused, readable, and useful to a learner seeing the idea for the first time.

## Getting started

1. Use Node.js 22 or newer.
2. Run `npm start` and open `http://localhost:4173`.
3. Make a focused change on a branch.
4. Run `npm test`.
5. For interface changes, check both desktop and a narrow screen. Try adding and reordering blocks, switching views, stepping forward and backward, and inspecting bits.

## Pull requests

Explain the learner-facing problem, what changes, and how you checked it. Include before/after screenshots for visual changes when possible. Keep unrelated changes in separate commits and preserve saved-program compatibility.

Use UTF-8, two-space indentation, and LF line endings. Avoid adding dependencies for behavior that the browser already provides. Keep styles in the stylesheet, and keep instruction semantics consistent with the RISC-V specification. Add behavior tests when changing instruction execution or encoding.

## Issues and scope

For a bug, include the program or example, expected behavior, observed behavior, and browser. Do not include personal information from your browser or computer. For lesson ideas, explain the concept being taught and what learners should be able to predict or build afterward.

Licensing is still to be decided by the maintainer. Discuss substantial contributions before submitting them.
