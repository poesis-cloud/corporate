---
title: 'Continuous regulatory compliance: a reusable governance model'
category: 'Research'
date: 2026-08-06
summary: 'A framework-independent reference model for turning regulatory obligations into governed definitions, evaluable Norms, and continuous evidence without flattening each framework into a generic control list.'
---

Regulatory compliance is still commonly reconstructed before an audit. Organizations gather evidence from scattered processes and systems, map it back to obligations, resolve conflicting interpretations, and discover too late that a policy, control, supplier, or service has changed.

The recurring problem is not specific to NIS2, DORA, GDPR, or any other framework. Each asks different questions and preserves different legal concepts, but operational compliance always requires the same connective work:

- determine what is in scope;
- preserve the authoritative obligation and its provenance;
- translate that obligation into governing intent and evaluable criteria;
- connect those criteria to the organization, process, information, service, or technology they govern;
- collect evidence about what is actually realized;
- expose deviations and govern corrective change.

Poesis provides a common grammar for that work. It does not reduce frameworks to one universal checklist. Each model keeps its own taxonomy and meaning, while GSM connects its concepts to the same definitional governance loop.

This article presents a **reference model**, not a customer deployment. Published content in `gsm-frameworks` currently includes concrete regulatory Directives and Norms for NIS2 and GDPR, alongside TOGAF, the ISO 25000 quality models, SCAP security-identification vocabularies, HTTP semantics, and ITIP sourcing definitions. DORA and several other models are planned or reserved rather than fully sourced. The integrated compliance experience remains in development.

## The framework changes; the governance problem does not

Regulations differ for good reason. GDPR governs personal-data processing and rights. NIS2 governs cybersecurity risk, accountability, incident reporting, and supply-chain security. DORA adds financial-sector operational resilience and third-party ICT risk. Architecture and quality standards answer different questions again.

A reusable compliance model must preserve those distinctions. It must also connect them when they apply to the same subject.

GSM does this through three governance layers:

- **Directives** express governing intent and establish its legitimate scope.
- **Norms** make selected consequences of that intent evaluable.
- **Ascriptions** carry governed, versioned definitions of the affected subjects.

Evidence can then be assessed against the definitions and Norms currently in effect. When an obligation, organizational structure, process, or implementation changes, the affected relations are explicit rather than reconstructed from documents at the next audit.

## One fabric, different model roles

The `gsm-frameworks` catalog contains more than regulations because compliance does not stop at legal text. Obligations must be related to the organization and its operations, expressed through measurable qualities, and connected to identifiable implementations.

| Model role | Current catalog examples | Contribution to continuous compliance |
| --- | --- | --- |
| Regulatory governance | NIS2, GDPR; DORA planned | Legal scope, obligations, deadlines, accountability, and regulatory Norms |
| Architecture governance | TOGAF | Organizations, capabilities, processes, services, architecture requirements, principles, and standards |
| Quality vocabulary | ISO/IEC 25010, 25011, 25012 | Evaluable product, service, and data-quality dimensions |
| Security identification | SCAP CPE and CCE | Stable identification of technology platforms and configuration settings |
| Protocol and interaction semantics | HTTP; other protocol families reserved | Typed descriptions of how governed systems interact |
| Sourcing governance | ITIP definitions | Provenance-bearing contributions and framework-sourcing processes |

These models are not merged into a synthetic “Poesis framework.” Composition happens through GSM. A subject can carry several definition layers at once: its architectural role, applicable regulatory obligations, quality expectations, technical identity, and current operative definition.

For example, the same service may be:

- represented through TOGAF architecture concepts;
- governed by NIS2 cybersecurity obligations;
- governed simultaneously by GDPR when it processes personal data;
- evaluated through ISO 25011 service reliability and ISO 25012 data-quality characteristics;
- connected to SCAP identifiers for the technologies and configuration settings that realize it.

Each framework remains independently traceable. Their conjunction becomes governable.

## From regulatory text to continuous conformance

The reusable pattern has seven steps.

### 1. Source the framework without denaturing it

Framework concepts are organized by the source model's own taxonomy and retain provenance to the relevant authority and clause. Regulatory concepts become vocabulary schemas and, where the source creates concrete obligations, governed Directive and Norm instances.

This is where framework-specific interpretation belongs. NIS2 entity classification must not be replaced by GDPR controller/processor roles, and neither should be approximated by a generic `regulatedEntity` field.

### 2. Determine applicability

Compliance begins with scope. Applicability may depend on jurisdiction, sector, entity category, processing role, activity, information type, service criticality, or contractual relationship.

These conditions become explicit inputs to governance rather than assumptions buried in an audit workbook. The result is not merely a list of potentially relevant clauses, but a queryable account of which obligations apply to which governed subjects and why.

### 3. Connect obligations to operative definitions

A regulation rarely specifies the complete implementation. Its intent must connect to the policies, processes, responsibilities, services, information assets, supplier relationships, and technical mechanisms through which the organization realizes it.

TOGAF and domain vocabularies help define those subjects. Directives establish what must be preserved or produced; Norms establish what can be evaluated; Ascriptions identify the current definitions in effect.

### 4. Reuse measurement vocabularies

Legal obligations and quality measurements are not interchangeable. The obligation creates authority; a quality model supplies reusable properties through which part of that obligation can be assessed.

NIS2 may require continuity and effective risk management. ISO 25011 can provide service-reliability vocabulary. GDPR may require accuracy, confidentiality, and portability. ISO 25012 can provide corresponding data-quality vocabulary. The regulation says **why the quality is binding**; the quality model helps define **what evidence can demonstrate it**.

### 5. Bind definitions to observable realization

Policies and controls are not evidence that they work. The model must connect governed definitions to observations from processes, reviews, incidents, suppliers, services, information flows, and technical environments.

SCAP identifiers can anchor evidence to known platforms and configuration settings. Protocol definitions can make relevant interactions inspectable. Human attestations and audit findings remain valid evidence when their provenance, scope, and time are explicit.

### 6. Evaluate conformance continuously

Continuous compliance does not mean declaring the organization permanently compliant. It means that conformance can be reevaluated whenever relevant definitions or evidence change.

The useful questions become operational:

- Which obligations apply now?
- Which governed subjects do they constrain?
- Which Norms have sufficient current evidence?
- Where is evidence missing, stale, or contradictory?
- Which deviations are within tolerance, and which require disposition?

The output is a current, inspectable compliance position — not an assurance claim detached from evidence.

### 7. Govern change and preserve the trail

When a regulation changes, a service is redesigned, a supplier is replaced, or evidence invalidates an assumption, the response is a governed change to definitions and their relations. Previous versions remain attributable; proposed changes pass through lifecycle and authority; decisions retain their evidence and rationale.

This is the difference between continuous compliance and continuous monitoring. Monitoring reports events. Continuous compliance connects those events to the obligations, definitions, authority, and adaptation they affect.

## A general example: supplier governance

Consider an organization onboarding a supplier that will operate a critical service and process personal data.

NIS2 may govern supply-chain cybersecurity and incident handling. GDPR governs the processing relationship, transfer conditions, and breach obligations. Future DORA definitions may add financial-sector requirements for ICT third-party risk. TOGAF can locate the supplier relationship within the operating and service architecture. ISO quality models can define service, product, and data qualities to evaluate. SCAP can identify relevant technology and configuration evidence.

A spreadsheet can list all of these controls. A governed model can express their different authority, scope, subjects, versions, and evidence while showing where they converge on the same supplier relationship.

If the supplier changes a subprocess, hosting region, technology platform, or subcontractor, the question is no longer “which audit documents should we update?” It becomes “which governed definitions, obligations, Norms, and evidence are affected?” That is a tractable impact query rather than a new compliance reconstruction.

## What the reference model proves — and what it does not

The model demonstrates a coherent way to compose regulatory, architecture, quality, security-identification, and interaction vocabularies without erasing their differences. It supports framework-independent questions about applicability, coverage, conformance, evidence, and change impact.

It does not prove that an organization complies with any regulation. That requires organization-specific definitions, evidence, accountable disposition, and assurance appropriate to the relevant authority. Nor does the current catalog have equal maturity across every model: NIS2 and GDPR contain sourced governance instances; DORA remains planned; several protocol families are placeholders.

That boundary is useful. The reusable model belongs here. Framework-specific interpretation, obligation mappings, evidence patterns, and sector scenarios deserve separate case studies.

## From periodic reconstruction to governed continuity

The central shift is simple: stop treating compliance as a report assembled after the fact, and start treating it as a governed relation among obligations, organizational definitions, realized operation, and evidence.

Frameworks will continue to multiply and overlap. A durable compliance architecture cannot be rebuilt around each one. It needs a stable governance grammar that preserves each framework's authority and meaning while composing them over the same organization.

That is the general use case for `gsm-frameworks`: source each model once, specialize it without corrupting its semantics, and connect it through GSM to the subjects and evidence it governs. The result is not one more control library. It is a path toward compliance that remains inspectable as both regulation and reality change.
