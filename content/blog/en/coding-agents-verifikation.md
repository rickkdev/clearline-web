A coding agent can write code, run tests, and prepare changes. Whether that turns into a working feature depends on whether it is solving the right problem and can actually verify its own result. For a business, the decisive question is therefore not which agent changes the most files. What matters is whether developers can trace what has improved for users and what evidence supports it.

I recommend a workflow that starts with a concrete outcome. The agent gets the project context it needs, works in its own environment, and checks the feature through the same interface that people will use later. The steps below combine this way of working with carefully chosen MCP connections and a verifiable browser loop.

## Start with a verifiable task

"Improve our customer portal" is not a usable acceptance criterion. "A support agent can assign a ticket to a team, and the assignment persists after a reload" describes an observable outcome. A good task also states the starting point, the permitted test environment, and the evidence expected at the end.

A first task might look like this:

```text
Goal: A support agent assigns a ticket to the right team.
Starting point: The test ticket is not yet assigned to any team.
Acceptance: The new assignment is still visible after a reload.
Environment: Local app, dedicated test data, and a separate browser profile.
Evidence: The completed user journey, test output, and an error trace if needed.
Boundary: No changes to production tickets or user accounts.
```

The agent should first read the existing feature and understand who owns what. For a small change, a few files and a short proposal are enough. For a change to the data model or permissions, an architecture decision has to come first. A plan is useful when it resolves a real uncertainty. A long task list on its own does not make the implementation more reliable.

## What I take from Theo and pstack

In his article ["What is a harness?"](https://t3.gg/blog/post/what-is-a-harness), Theo Browne distinguishes between the interface for humans, the model, and the runtime that executes tools. This separation is helpful when a company chooses its tooling. A different chat client does not automatically change the tools the agent uses to read code, start processes, or operate the browser.

In his video ["How I code with AI changed a lot", from around 39:29](https://www.youtube.com/watch?v=xJaMTo2YgO8&t=2369s), Theo stresses that an agent needs the means to check its own work. That can include command-line programs, tests, or computer use. My practical takeaway is to define the verification path in the task itself. The agent should not discover at the very end that it cannot start or open the application.

Lauren Tan's pstack also puts verification against the real result at the center. The [pstack port by Ahmed Benaw](https://github.com/ahmedbenaw/pstack) credits Lauren Tan as the original author. Its principles ["Prove It Works"](https://github.com/ahmedbenaw/pstack/blob/main/skills/principle-prove-it-works/SKILL.md) and ["Test Behavior, Not Implementation"](https://github.com/ahmedbenaw/pstack/blob/main/skills/principle-test-behavior-not-implementation/SKILL.md) require evidence based on how the software behaves. A successful build and a green test that merely restates the implementation are not enough.

The recommendations below combine these approaches with the official tool documentation for use in a company setting.

## Pull context from Jira, Confluence, and the repository


An agent rarely needs all of a company's knowledge. For a specific change, the relevant ticket, the related product decision, the affected files, and the existing tests are usually what helps. Have it state up front which question it intends to answer with which source.

MCP stands for Model Context Protocol. It standardizes the connection between an agent client and external tools or data sources. It replaces neither the permissions of the underlying service nor the judgment of whether a particular call makes sense. A good selection starts with the tools you already have. If a repository is already checked out locally and the right CLI is installed, you do not need an additional MCP server for the same file access.

For a development team, I would evaluate these connections one by one:

| Connection | What it is useful for | What must be settled first |
| --- | --- | --- |
| Atlassian MCP | Researching requirements in Jira and decisions in Confluence | Which projects and pages the account in use may view and modify |
| GitHub MCP | Bringing together issues, pull requests, and repository context | The toolsets and permissions actually needed, instead of enabling every tool across the board |
| GitLab MCP | Including project context, merge requests, and CI information | Availability on your own instance and the prerequisites of the chosen tools |
| Browser tools | Operating the local application through its real interface | A dedicated test environment, test accounts, and a defined acceptance criterion |

The [official Atlassian MCP server](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/) supports both research and write operations. A connection to Confluence is therefore not automatically read-only. Check which tools the client actually exposes and what access rights sit underneath. Setup steps and available features change over time. Take endpoints from the current Atlassian guide, not from an old configuration file.

The [official GitHub MCP server](https://github.com/github/github-mcp-server/blob/main/docs/server-configuration.md) offers targeted toolsets and a read-only mode. For the remote server, for example, GitHub documents the `X-MCP-Readonly` header. That is a concrete restriction on this server connection. It does not also restrict a separately available shell or another tool with broader credentials.

[GitLab also offers an official MCP server](https://docs.gitlab.com/user/model_context_protocol/mcp_server/). Its documentation distinguishes between transport, toolsets, and the prerequisites of specific features. An entry in a configuration file therefore does not prove a working integration. Have the agent read a known test issue and report back an expected piece of information. Only after that should a write operation follow, in a test project set aside for that purpose.

## A separate working environment for every task


Parallel agents must not accidentally modify the same files, the same data, or the same logged-in browser session. A separate Git worktree per implementation keeps working copies apart. A separate test tenant or database keeps application state apart. These boundaries solve different problems and have to fit together.

The same applies to ports, temporary uploads, and test accounts. If two agents work on the same ticket, a test can pass because the other agent already produced the desired state. So assign each task its own record. Only introduce parallel browser tests once the test data is independent as well.

A separate Chrome profile keeps the test run from picking up your personal cookies and logins. It does not automatically make the application under test harmless, and it is not a security sandbox for arbitrary programs. A logged-in test user can still do everything their account is permitted to do. If the agent runs untrusted code, the execution environment itself also needs to be restricted, for example with a dedicated VM or container.

## Verify through the real interface with Playwright


[Playwright Test isolates tests through separate browser contexts](https://playwright.dev/docs/browser-contexts). For many UI checks, that is enough. If you specifically want to test Google Chrome, you can [configure a Chrome channel](https://playwright.dev/docs/browsers). The tests still use separate contexts and do not pick up your personal default profile. Chrome has to be installed on the test machine for this.

The following example shows a concrete navigation on this website. It checks whether a visitor can get from the home page to the talks page and find a specific conference talk there. It is a template for a project with matching routes and copy. In your product, replace this user journey with the business process you actually promise.

In a pnpm project without an existing Playwright configuration, start with:

```sh
pnpm add -D @playwright/test
pnpm exec playwright install chromium
```

A configuration for `playwright.config.ts` might look like this:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'chrome', use: { channel: 'chrome' } },
  ],
  webServer: {
    command: 'pnpm dev --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
});
```

The start command has to match your app. Playwright launches its own local instance through its [webServer configuration](https://playwright.dev/docs/test-webserver). `reuseExistingServer: false` prevents the test from silently using a server that is already running. Use a local test configuration whose backend and database also point to dedicated test data.

The user journey lives, for example, in `tests/speaking.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('Visitor finds the conference talks', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', {
    name: /Vorträge und Auftritte ansehen/,
  }).click();

  await expect(page).toHaveURL(/\/speaking\/?$/);
  await expect(page.getByRole('heading', {
    name: 'Vorträge und Auftritte.', exact: true,
  })).toBeVisible();
  await expect(page.getByRole('heading', {
    name: 'When Agents Transact: Identity, Delegation and Payments',
    exact: true,
  })).toBeVisible();
});
```

Start with the bundled Chromium. For a visible run with an installed Google Chrome, then select the second project:

```sh
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=chrome --headed
```

[Playwright's web-first assertions](https://playwright.dev/docs/test-assertions) wait for the expected state. That is more robust than sleeping for a fixed few seconds. A click on its own is not a success criterion. For a product feature that writes data, the test must also check that the saved state still exists after a reload and is visible to the intended user.

The example does not replace testing a real calendar booking, a login, or a database change. It deliberately covers only the read-only journey described. External services and write flows need their own, appropriately scoped test cases.

## Fix failures in a short loop

The loop consists of an attempt, an observation, and a targeted fix. The agent runs the agreed user journey, reads the actual output when something fails, and fixes the first proven cause. Then the same test runs again. Only once that test passes do the adjacent checks follow.

A [Playwright trace](https://playwright.dev/docs/trace-viewer) shows the actions and the state of the page during the run. That helps you tell, for example, whether a click missed its target or the server rejected the requested change. Adding a longer timeout does not automatically solve either problem.

Set a limit for autonomous loops. After three attempts without new insight, the agent should name the open assumption and investigate it, instead of continuing to embellish the same approach. That number is a working rule I recommend, not a technical limit of Playwright. A green run after several unchanged retries is first a sign of flakiness, not proof of a fix.

For authenticated tests, saved state files may contain usable credentials. The [Playwright authentication documentation](https://playwright.dev/docs/auth) recommends not checking such files in. Use dedicated test accounts, close the browser context after the run, and check screenshots and traces for personal data before sharing them.

## Review and accountability stay with the team

Before a merge, a different perspective should check the change against the original task. That can be a developer or an independent review agent with a narrowly scoped job. Its purpose is not to produce approval but to find and document concrete defects. For a permissions change, a negative user journey is especially valuable, for example proof that a user from team A still cannot open a ticket belonging to team B.

A good handoff states the outcome for the user, the journeys that were tested, and the remaining limitations. It distinguishes a browser test that actually ran from a test that was merely proposed. It also records which instance was checked and which commit was tested. That way the next team member can reproduce the evidence.

More agents pay off when there are genuinely independent tasks. Having four agents write the same small change, on the other hand, often multiplies the coordination effort. I would first establish a clear task, a usable repository, and a reliable verification path. Only then should the team increase parallelism.

## How I would get started in a company

Pick a common, manageable type of change. Describe the user outcome and the test data that goes with it. Connect only the sources that this task is missing. Then have one agent implement the change and verify the same user journey in an isolated browser.

Afterwards, do not measure the number of lines of code produced. Measure how usable the result is and how much rework it needs. What matters is whether the team understands the task, the change, and the evidence behind it. As a freelance Applied AI Engineer and Fractional Head of AI, I help companies build exactly this workflow into their existing development process. That includes the right tools, transparent access rights, and tests that actually use the product.
