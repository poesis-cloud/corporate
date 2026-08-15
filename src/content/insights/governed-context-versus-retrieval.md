---
title: 'Governed context or document retrieval'
category: 'Research'
date: 2026-08-11
summary: 'Retrieval answers which passages resemble a prompt. Enterprise assistants usually need something else: which definition is in effect, which policy binds this scope, and which action is permitted. Where a domain is modeled, governed context can replace the retrieval layer rather than supplement it — the layer context engineering is still missing.'
---

Most enterprise AI assistants are built the same way. Documents are chunked, embedded, and indexed; a question retrieves the most similar passages; a model composes an answer from them. This works well, and for open-ended exploration of a large document estate it remains the right design.

It is also frequently the wrong tool for the question actually being asked. **Context engineering** has made assembling the model's context a first-class discipline — but it inherited retrieval's blind spot: it engineers *which text* reaches the model, not *which definition is in effect*.

## What similarity cannot tell you

Retrieval ranks passages by resemblance to a prompt. That is a useful proxy for relevance, but it is silent on the properties an enterprise answer usually depends on:

- **Currency** — is this the version in effect, or one superseded two revisions ago?
- **Scope** — does this policy apply to this business unit, jurisdiction, or system?
- **Authority** — is this an approved obligation, a draft proposal, or someone's summary?
- **Consistency** — do two retrieved documents contradict each other, and which one wins?
- **Permission** — given all of the above, what is this process actually allowed to do?

A retrieval system that surfaces a superseded policy alongside the current one has not malfunctioned. It has done exactly what it was built to do. The organizational meaning — which of the two governs — was never in the index, because it was never anywhere machine-readable at all.

This is why so many enterprise assistants plateau after an encouraging demonstration. The demonstration tests fluency over documents. Production tests fidelity to institutional truth.

## Context as governed material

The alternative is to treat context as something governed rather than something retrieved. In the Poesis stack, SIE (the Systemic Intelligence Engine) is designed to assemble and serve four related forms of context:

- **Observed context** — evidence about the current state of the governed system.
- **Asserted context** — approved definitions, policies, rules, schemas, and their scopes.
- **Derived context** — evaluations, deviations, impact projections, and feasibility assessments.
- **Provenance context** — why something is believed, approved, and currently applicable.

The first two are the working pair. Asserted context makes observation intelligible — it supplies the categories under which evidence counts as evidence; observed context makes assertion corrigible. That relation, and why it is a loop rather than an opposition, is the subject of [Definition versus description](/insights/definition-versus-description/).

These are not documents about the organization. They are typed, versioned definitions governed through [GSM](https://docs.poesis.cloud/gsm/), the specification underneath the stack. A definition has a stable identity, an explicit lifecycle, an owner, and a version history. Asking which policy is in effect is a query, not an inference.

Today, asserted context is served by the [Definition Manager](https://github.com/poesis-cloud/sie-definition-manager), and the [Operator](https://github.com/poesis-cloud/sie-operator) evaluates typed rules deterministically over it. The Definition Blackboard, the observation and derivation planes, and the observability floor are in development. We separate what is implemented from what is designed because a piece arguing for inspectable context should be inspectable itself.

## When governed context replaces retrieval

The substitution is conditional, and the condition is simple: **the domain must be modeled, and its definitions must be in effect.**

Where that holds, serving governed context is the stronger design. The assistant no longer reconstructs institutional truth from prose; it reads it. Consider the questions enterprise assistants are actually asked:

- Which security policy applies to this workload, in this region, right now?
- What obligations does this regulation place on this system, and who owns them?
- What is our current architecture standard for this integration pattern, and what supersedes the standard someone cited last quarter?
- Is this change permitted, and if not, who can approve it?
- Why was this decision made, on what evidence, and is that evidence still valid?

Each of these has a determinate answer in a governed model and only a plausible answer in a document index. The difference matters most precisely where the stakes are highest: compliance posture, architectural authority, permitted action, and decision rationale.

The model's job improves as well. Instead of spending its capability reconstructing which of five retrieved passages is authoritative, it spends that capability on interpretation, synthesis, and explanation — the things it is genuinely good at.

## When retrieval remains the right tool

Governed context does not subsume every use case, and claiming otherwise would be the same overreach we are arguing against.

Conventional retrieval remains appropriate where the corpus is large and unmodeled, where the task is genuinely exploratory, where the material is narrative rather than normative, or where the cost of modeling exceeds the value of governing the answer. Meeting notes, research literature, support transcripts, and market intelligence are usually better retrieved than defined.

The practical architecture is therefore often hybrid. Semantic retrieval discovers candidate material across the document estate; the governed model determines what is accepted, what is in effect, and what may be acted upon. Retrieval proposes; governance disposes — the same division that separates model proposal from governed action in [Better context beats bigger models](/insights/why-poesis-matters-for-language-models/), applied here to the context supply rather than to the model. As definitions mature in a given domain, the boundary moves — and parts of an SIE instance progressively subsume the retrieval application that preceded it.

## The honest objection: modeling costs something

The fair criticism of this position is effort. Indexing documents is cheap and nearly automatic. Defining governed concepts is neither.

Three things make the cost tractable.

**Frameworks are sourced once.** Regulatory and architectural corpora — NIS2, DORA, TOGAF, the ISO 25000 series — are expressed as reusable definitions rather than re-derived per organization. Most enterprises are not inventing their obligations; they are adopting and specializing them. [Continuous regulatory compliance](/insights/continuous-regulatory-compliance/) sets out how those models are sourced without flattening their differences, and how they compose over the same subject.

**Sourcing is collaborative and assisted.** The Definition Blackboard, currently in development, is designed as a path for agentic and human sourcers to propose definitions with a confidence envelope and a provenance envelope attached, which deterministic reduction and governance review then accept or reject. Language models are well suited to proposing candidate definitions from existing documents; they are not suited to deciding unilaterally what becomes authoritative.

**Coverage can be partial.** Nothing requires modeling the entire organization before value appears. Model the domain where wrong answers are expensive — compliance obligations, architecture standards, approval boundaries — and leave the rest to retrieval.

Confidence and provenance do not make a contribution true — a source can be confidently wrong. They make it inspectable enough to be governed, which is the property retrieval scores cannot provide.

## The question to ask of your own assistant

Before building another retrieval pipeline, it is worth asking what the assistant is really for.

If it helps people find and digest material, retrieval is the right foundation. If it is expected to state what the organization currently requires, permits, or owns — and to be relied upon when it does — then the missing ingredient is not a better index or a larger model. It is a governed definition of the answer.
