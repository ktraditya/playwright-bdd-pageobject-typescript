# playwright-practice

Playwright test suite targeting the public demo site
[the-internet.herokuapp.com](https://the-internet.herokuapp.com/). It exercises login,
checkboxes, a dropdown, dynamically-loaded content, JS dialogs, and add/remove elements —
implemented two ways on top of the same Page Object Model: as plain Playwright specs, and
as Gherkin/BDD scenarios via `playwright-bdd`.

## Prerequisites

- Node.js (LTS) and npm
- No local app to run — tests hit the live public site directly, no dev server needed

## Getting started

```bash
git clone https://github.com/ktraditya/playwright-practice.git
cd playwright-practice
npm install
npx playwright install       # downloads the Chromium/Firefox/WebKit browser binaries
```

## Running the tests

```bash
npm test                     # regenerates BDD specs, then runs the full suite, all projects
npx playwright test          # same, without regenerating BDD specs (fine if nothing in features/ changed)
```

Common variations:

```bash
npx playwright test --project=chromium        # one browser project only
npx playwright test --project=bdd             # only the Gherkin-derived scenarios
npx playwright test tests/login.spec.ts        # one file
npx playwright test --headed                   # watch the browser while it runs
npx playwright test --ui                       # Playwright's interactive UI mode
npx playwright show-report                     # open the HTML report from the last run
```

Traces are collected automatically on the first retry of a failing test (see
`trace: 'on-first-retry'` in `playwright.config.ts`); open one with:

```bash
npx playwright show-trace <path-to-trace.zip>
```

## Project structure

```
playwright.config.ts       # single source of truth for how tests run (browsers, baseURL, reporter, BDD wiring)
fixtures.ts                 # extends Playwright's `test` with one fixture per page object
pages/                      # Page Object Model — one class per site page (locators + actions)
tests/                      # plain Playwright specs, written directly against the page objects
features/                   # Gherkin .feature files + step definitions (BDD layer, see below)
.features-gen/               # generated output of features/ — gitignored, rebuilt by `bddgen`
.github/workflows/playwright.yml   # CI: runs the suite on push/PR to main
.github/agents/              # VS Code Copilot Chat custom agents (see below)
.vscode/mcp.json             # Playwright MCP server config, used by those agents
```

## Page Object Model

Each page on the site has a class under `pages/` (`LoginPage`, `CheckboxesPage`, etc.)
holding its locators and the actions you can take on it — tests never reach for a raw
CSS selector themselves. `fixtures.ts` wires these classes into Playwright's fixture
system, so a test just asks for the page object it needs:

```ts
test('shows success message with valid credentials', async ({ page, loginPage }) => {
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
});
```

Both `tests/*.spec.ts` and the BDD step definitions in `features/steps/` are built on
this same layer, so a locator only ever needs to be fixed in one place.

## `tests/*.spec.ts` vs `features/*.feature` (BDD)

These currently cover **the same scenarios twice**, deliberately, as two different
front-ends onto the same page objects:

| | `tests/*.spec.ts` | `features/*.feature` |
|---|---|---|
| Style | Plain TypeScript, calls page objects directly | Gherkin (`Given/When/Then`), backed by step definitions that call the same page objects |
| Runs on | chromium, firefox, webkit (3 browsers) | chromium only, via the `bdd` project |
| Best for | Engineers; fastest to read/write/debug as code | Anyone who wants scenarios in plain language; a template for adding BDD-style tests going forward |

Both are compiled and executed by the same `playwright.config.ts` / `npx playwright
test` — `playwright-bdd`'s `defineBddConfig()` just compiles `features/*.feature` +
`features/steps/*.ts` into real spec files under `.features-gen/` at test-collection
time (via `bddgen`), which the `bdd` project then runs like any other spec directory.
There's no separate Cucumber runner involved.

This duplication is fine short-term, but worth resolving deliberately once you know
which style you actually want going forward — either:
- keep `tests/*.spec.ts` as the cross-browser regression suite and treat `features/`
  as living documentation / a BDD template, or
- commit to BDD, delete `tests/*.spec.ts`, and add firefox/webkit projects for `bdd`
  so you don't lose cross-browser coverage.

## CI

`.github/workflows/playwright.yml` runs on every push/PR to `main`/`master`: installs
dependencies, installs browsers, runs `npx playwright test`, and uploads the HTML
report as a build artifact.

> **Known gap:** the workflow runs `npx playwright test` directly, not `npm test`, so
> it never regenerates `.features-gen/` before running — the `bdd` project will find no
> tests in CI. Change the workflow's run step to `npm test` (or add an `npx bddgen`
> step before it) to fix this.

## AI agent scaffolding (VS Code Copilot Chat only)

`.github/agents/Planner.agent.md`, `Generator.agent.md`, and `Healer.agent.md` are
custom chat modes for **GitHub Copilot Chat in VS Code** — not Claude Code, which uses
a different, incompatible format (`.claude/agents/*.md`). They demonstrate an
AI-assisted test-authoring workflow:

- **Planner** drives a real browser (via the Playwright MCP server configured in
  `.vscode/mcp.json`) to explore a page and write a plain-language test plan to `specs/`.
- **Generator** turns that plan into a real spec file under `tests/`.
- **Healer** reproduces a failing test, inspects the live page via MCP, and patches only
  the broken locator/assertion.

To use them: reload the VS Code window (`Ctrl+Shift+P` → "Developer: Reload Window") so
it picks up `.vscode/mcp.json` and the agent files, trust/start the `playwright` MCP
server when prompted, then pick Planner/Generator/Healer from Copilot Chat's mode
dropdown. If they don't appear, your Copilot Chat extension version likely predates
workspace `.agent.md` support — update the extension.
