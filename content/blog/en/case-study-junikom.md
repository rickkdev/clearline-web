Junikom builds software for municipalities and public-sector clients. Its products are used by public administrations and also by politicians, who store both public and internal content in them. Security is therefore not an add-on but part of the product. When I started the engagement, the goal was clear. The development teams should ship faster with AI without compromising on quality or security.

I usually scope my engagements at three months, with the option to extend. Many companies then book another two to three months. That is what happened at Junikom. This case study describes where we started, what we built, and what changed for the teams.

## The starting point

Junikom's situation is typical of many German software companies. Some developers were already using AI, but many used it rarely or not at all. The projects had no agent files. The repositories of the various codebases were not documented or set up in a way that let a coding agent work in them reliably.

At the same time, there was no capacity to solve this internally. A CTO cannot coach every developer one by one. Product managers find it hard to tell developers to adopt a new way of working. The company needed someone who works directly with the teams and recalibrates the process together with them.

## Taking the development teams to the next level

The focus was on how the developers work. In pair-coding sessions, I showed how coding agents work today, what context they need, and what a good workflow looks like. We worked on real tickets, not demo tasks.

We measured token usage from day one. The goal was not to burn as many tokens as possible. High usage on its own would, if anything, point to a poor setup. But the numbers showed us who was already using AI heavily and who had barely started.

That told us where support would have the most impact. Developers with low usage got targeted sessions. Developers who were already working well with AI showed their approach in team meetings. Colleagues from your own team are often more convincing than an outside consultant.

## The foundation: agent files, MCP, and a knowledge base


Every repository got an agent file. It describes what the project does, how to run it, how to test it, and which rules apply in the code. Without it, an agent has to guess the answers to these questions on every ticket. A typical structure looks like this:

```text
AGENTS.md
├── Purpose of the project and key domain terms
├── Running, testing, and linting with the exact commands
├── Architecture: modules, responsibilities, data flow
├── Rules: security, permissions, data protection
└── References to specifications in /docs
```

We added MCP connections, for example to Atlassian. This let agents read Jira tickets and Confluence pages. It was especially useful for onboarding new developers, because the agent could answer questions about the project from the right sources.

We also built a knowledge base directly in the code. We moved the relevant Confluence content into Markdown and keep it up to date together with the product manager. These documents serve as a specification that developers and agents can use on every ticket.

## Loops and verification: code that provably works


An agent that writes code also has to be able to check whether that code works. So we taught the teams to work with loops and verification methods. The agent makes a change, checks the result, reads the errors, and makes targeted fixes.

For web applications we use Playwright with an isolated Chrome session. The agent writes an end-to-end test, clicks through the affected features, and confirms whether the feature actually works. A successful build is not enough proof. I describe this workflow in detail in the article [Coding agents in the team: context, MCP, and verifiable results](/en/blog/coding-agents-verifikation).

This knowledge was the core of the engagement. As they gained experience, the developers shipped faster, more safely, and with less rework. Some teams finished projects two to three months earlier than originally planned.

## An agent on a VPS and scheduled checks

Alongside the work with the teams, we set up an agent on a dedicated VPS that is available at any time. The product manager uses it for tasks he does not want to do himself in the developer tools. One example is comments in GitLab.

There are also scheduled tasks that run daily or weekly. One example is the legal landscape. Junikom works a lot with municipalities, where new laws and regulations can require changes to the product. A recurring job therefore checks for changes in the legal environment and summarizes what could become relevant for the product. This lets us plan ahead together with the client instead of reacting only once a request comes in.

## Security: pentests with open-source models

For penetration testing we mainly used open-source models. Proprietary models from OpenAI or Anthropic often refuse offensive security tasks because of their safeguards, and details about vulnerabilities should not leave your own infrastructure anyway.

This mattered especially for Junikom. Software used by municipalities and political actors has to be tested thoroughly. The self-hosted models made it possible to check the products for vulnerabilities regularly, without sharing any data.

## Salesforce and Claude: MCP today, custom agents tomorrow

On the business side, we looked at the Salesforce integration that is currently being rolled out. The question was how to make it work well with AI. We connected Claude to Salesforce via MCP, so employees can query and edit data directly in the chat.

We also compared Agentforce with a custom agentic system. A custom agent with access to Salesforce is an option for 2027. It would cover workflows the Claude interface with MCP is not well suited for, such as custom pipelines that customers trigger themselves.

## Compliance: AI literacy under Article 4 of the EU AI Act


Article 4 of the EU AI Act requires companies to promote AI literacy among their staff. The obligation has applied since February 2, 2025. The Digital Omnibus weakened it in 2026. Companies must take measures, but they do not have to guarantee a specific level of competence. For a company that works for municipalities, documented training still makes sense.

For Junikom, I ran a workshop on this. It covered these topics:

| Topic | Content |
| --- | --- |
| Fundamentals | How language models work, what they can do, and where their limits are |
| Common failures | Recognizing hallucinations, outdated knowledge, and convincingly worded false statements |
| Data protection | Which data may go into which tool, and the role of the GDPR and data processing agreements |
| Security | Prompt injection, handling credentials, and the risks of agents with tool access |
| AI Act | An overview of risk categories, prohibited practices, and transparency obligations |
| Accountability | Human review, approvals, and internal rules for using AI |
| Practice | Exercises with the tools the team actually uses |

The content was weighted by role. Developers need more on security and agents, while sales and administration need more on data protection and checking results. Attendance and content are documented so Junikom can demonstrate the measure.

## Results and next steps

After the first three months, Junikom extended the engagement. The development teams now work with documented repositories, an up-to-date knowledge base, and agents that verify their own work. Some teams finished projects two to three months early. Pentests with open-source models, regular checks of the legal environment, and documented AI training round this out.

If your development team is facing a similar situation, let's talk. As a Fractional Head of AI and Forward Deployed Engineer, I work directly with your teams and build the tools and workflows together with them.
