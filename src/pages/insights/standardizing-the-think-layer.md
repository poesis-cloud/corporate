---
layout: ../../layouts/PostLayout.astro
title: Standardizing the THINK layer of IT
description: OpenTelemetry gave the RUN layer a neutral standard. The definitions those runtimes enforce — the THINK layer — still have none. Here is why that matters.
pubDate: 2026-06-26
---

Cloud-native systems are governed systems. Every workload carries obligations: a security posture, service-level objectives, supply-chain provenance, data-protection rules, delivery guardrails, cost ceilings. None of that is optional, and all of it is supposed to be true at runtime.

Yet those obligations live in non-portable, tool-specific configuration and prose. Change your policy engine, your delivery tool, or your platform, and you re-author the same intent again — in a new dialect. The *definition* of how the system should behave is scattered across the very tools meant to enforce it.

## The RUN layer was solved; the THINK layer wasn't

OpenTelemetry ended this fragmentation for **RUN**: telemetry is now portable across vendors because the wire format is a neutral standard. But the **THINK** layer — the definitions those runtimes enforce and measure *against* — has no equivalent. It is fragmenting across proprietary GRC and architecture tools instead.

## What GSM provides

The Generative System Model is that missing standard. It specifies a small, fixed core of primitives, a three-tempo governance grammar (Directives, Norms, Ascriptions), a normative lifecycle, sandboxed expression profiles, and a canonical JSON interchange — so that governed definitions are **portable** across conforming tools instead of trapped in one.

Crucially, GSM **composes** with the cloud-native ecosystem rather than competing with it. Norms express SLOs while OpenTelemetry supplies the evidence; Directives are the authoritative obligation while OPA and Kyverno enforce; supply-chain rules bind to sigstore, SLSA, and in-toto. GSM is the definition; existing projects realize it.

## Why a standard, not a product

Portability requires neutrality. A definition standard owned by one vendor isn't a standard — it's a lock-in with extra steps. So GSM is open and vendor-neutral, and the reference implementation holds no privileged status in the specification. Poesis builds the best implementation; the model belongs to everyone.
