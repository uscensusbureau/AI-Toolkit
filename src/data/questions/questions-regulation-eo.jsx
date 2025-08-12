import AI_MODULES from '../modules'

const QUESTIONS_EO = {
  [AI_MODULES.EO]: [
    {
      question: "Does this AI system include documentation showing it was developed free from ideological bias or engineered social agendas?",
      options: ["Yes, documentation and tests completed", "Reviewed by policy team, limited testing done", "Pending additional analysis", "No explicit check"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has the team conducted checks to ensure the system aligns with goals of promoting human flourishing, economic competitiveness, and national security?",
      options: ["Objectives clearly documented", "General benefits documented, not tied to strategy", "Under development", "No documented alignment"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "If this system was subject to prior directives under EO 14110, has it been reviewed to ensure no policies inconsistent with EO 14179 still apply?",
      options: ["Reviewed, no conflicts found", "Prior requirements flagged for removal", "Pending full review", "Not reviewed for legacy conflicts"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does this model\’s documentation comply with revisions to OMB M-24-10 and related documents as required by EO 14179?",
      options: ["Complies with updated guidance", "Aligns with older memos, reviewing new standards", "In transition", "Not updated yet"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has this system\’s risk classification (or waiver) been reviewed under new OMB guidance?",
      options: ["Classification updated", "Initial classification done, waiver unclear", "Will reassess", "No reclassification yet"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has the system undergone technical evaluations that align with fostering U.S. leadership in safe, trustworthy AI?",
      options: ["Full technical evaluation completed", "Limited evaluation", "Additional evaluation planned", "No evaluation tied to EO goals"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Is there evidence that safety and trustworthiness assessments did not impose ideological or extraneous constraints?",
      options: ["Tests conducted without social engineering aims", "General fairness tests, unclear alignment", "Under review", "Not documented"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has development or deployment been reviewed to ensure no undue regulatory barriers or delays inconsistent with EO 14179?",
      options: ["Process streamlined", "Some legacy bottlenecks", "Legal review underway", "Additional hurdles present"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "If this system involves procurement or contracts, were they executed to accelerate AI adoption and align with EO priorities?",
      options: ["Contracting supported rapid adoption", "Some steps slowed implementation", "New templates planned", "No review done"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does this system maintain records suitable for potential public disclosure of decision processes and rationale?",
      options: ["Documentation suitable for disclosure", "Technical docs only, no summaries", "Preparing public docs", "No suitable records"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Is the intended benefit to U.S. competitiveness or security documented?",
      options: ["Clearly articulated in project charter", "Discussed informally", "Drafting justification", "Not documented"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has compliance been coordinated with agency-wide EO 14179 policy revisions?",
      options: ["Reviewed with agency EO team", "Coordination started", "Awaiting agency updates", "No coordination yet"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Is this system included in agency compliance plans under EO 14179?",
      options: ["Part of compliance portfolio", "Candidate for future tracking", "Being documented now", "Not integrated"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does this system include an appeals/redress mechanism for affected individuals?",
      options: ["Formal appeals/redress process exists", "Limited user feedback channel", "Under legal review", "No documented process"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does this AI system maintain audit logs or provenance to trace processing and outputs?",
      options: ["Comprehensive logs maintained", "Basic logs, incomplete", "Logging enhancements planned", "No logs"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Is there documentation that fairness/bias testing avoided imposing engineered social norms?",
      options: ["Testing aligned to technical risks only", "General bias tests, under review", "Developing new criteria", "No explicit review tied to EO"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does this system contribute to U.S. global AI leadership under the National AI Strategy?",
      options: ["Strategy ties system to global goals", "Indirect contribution via agency mission", "Strategy paper underway", "No linkage documented"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Is this system compliant with updated agency standards post-EO 14179?",
      options: ["Fully aligned", "Pending updates", "Reviewing", "No review yet"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has a decision been made to continue, revise, or phase out this system under EO 14179?",
      options: ["Decision to continue documented", "Under consideration", "Assessment underway", "No decision yet"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Is there a central compliance file for this system under EO 14179?",
      options: ["Complete compliance file exists", "Partial documentation", "Assembling file", "No record maintained"],
      category: "Identification & Governance",
      weight: 1
    },
  ]
};

export default QUESTIONS_EO
