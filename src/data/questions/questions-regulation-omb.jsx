import AI_MODULES from '../modules'

const QUESTIONS_OMB = {
  [AI_MODULES.OMB]: [
    {
      question: "Is this AI system documented with a clear description of its intended use, objectives, and expected outcomes?",
      options: ["Yes", "No", "In-progress", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has this AI system been formally assessed to determine whether it qualifies as a high-impact AI use case?",
      options: ["Yes, determined high-impact or NOT", "No assessment conducted", "Assessment in-Progress", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "If determined not high-impact, is the rationale documented?",
      options: ["Yes, documented", "No, not documented", "Documentation in-Progress", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Was this AI system subject to pre-deployment testing to validate that it meets intended goals and mitigates foreseeable risks?",
      options: ["Yes, testing completed", "No testing conducted", "Testing in-Progress", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Is there a documented risk mitigation plan specifically for this AI system?",
      options: ["Yes, plan approved", "No plan documented", "Draft or partial plan documented", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does the AIIA include system overview, objectives, and intended uses?",
      options: ["Yes, included in the assessment", "Partially addressed in the assessment", "Draft or partial plan documented", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does the AI Impact Assessment (AIIA) include datasets used for training and testing?",
      options: ["Yes, included in the assessment", "Not included in the assessment", "Partially included in the assessment", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does the AIIA include anticipated benefits and relevant performance metrics?",
      options: ["Yes, included in the assessment", "Not included in the assessment", "Partially included in the assessment", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does the AIIA include expected costs and benefits to the public?",
      options: ["Yes, included in the assessment", "Not included in the assessment", "Partially included in the assessment", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does the AIIA include independent evaluation or red-teaming documentation?",
      options: ["Yes, included in the assessment", "Not included in the assessment", "Partially included in the assessment", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does the AIIA include documentation of risk acceptance or residual risks?",
      options: ["Yes, included in the assessment", "Not included in the assessment", "Partially included in the assessment", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does the system include mechanisms for human oversight and meaningful human intervention?",
      options: ["Yes, manual override built-in", "Limited oversight (alerts only)", "No human intervention mechanism", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Are there documented fail-safes or fallback mechanisms in case of unintended failure or harm?",
      options: ["Yes, automated fail-safe or fall back", "No fail-safes implemented", "Partial fail-safe mechanism", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Is there a documented process by which individuals can appeal or seek redress if affected by decisions from this AI system?",
      options: ["Yes, formal appeals/redress process", "No documented process", "Process under-developement", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Are there documented procedures for ongoing monitoring to detect unintended consequences after deployment?",
      options: ["Yes, continuous monitoring process", "No documented process", "Periodic manual review", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does this AI system maintain audit logs or activity records sufficient to trace decisions, data processing, and any automated outputs?",
      options: ["Yes, comprehensive logs available", "No logs maintained/available", "Partial logs available for specific processes", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has a mechanism been established for the public or end users to submit feedback on this AI system?",
      options: ["Yes, public portal or contact info is listed", "No feedback mechanism", "Limited to internal stakeholders", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has the AIIA (or summary) for this system been published or made available on an agency website?",
      options: ["Yes, published in the public domain", "Not published", "Limited only to internal stakeholders", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Are the results of ongoing monitoring of this system made publicly available as required?",
      options: ["Yes, public reports available", "Not publicly shared", "Limited to internal stakeholders", "Not Applicable"],
      category: "Identification & Governance",
      weight: 1
    },
  ]
};

export default QUESTIONS_OMB
