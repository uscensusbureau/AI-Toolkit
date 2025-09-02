import AI_MODULES from '../modules'
const QUESTIONS_RAI = {
  [AI_MODULES.RESPONSIBLE_AI]: [
    {
      question: "Does your dataset reflect diverse populations with disaggregated metrics?",
      options: ["Yes, comprehensive diversity", "Moderate diversity", "Limited diversity", "Not evaluated"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Have you performed fairness audits using metrics like disparate impact?",
      options: ["Yes, comprehensive audits", "Initial audits completed", "Planned but not executed", "No audits"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Is your system compliant with relevant privacy regulations?",
      options: ["Yes, fully compliant", "Mostly compliant", "Partially compliant", "Compliance not verified"],
      category: "Privacy & Security",
      weight: 1
    },
    {
      question: "Do you employ privacy-enhancing technologies (anonymization, differential privacy)?",
      options: ["Yes, multiple techniques", "Limited techniques", "Exploring options", "No techniques used"],
      category: "Privacy & Security",
      weight: 1
    },
    {
      question: "Do you provide detailed documentation of model architecture and training?",
      options: ["Yes, comprehensive documentation", "Partial documentation", "Basic documentation", "Limited or no documentation"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Is responsibility for AI system performance clearly assigned?",
      options: ["Yes, clear ownership", "Partial ownership defined", "Informal ownership", "No defined ownership"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Do you maintain audit trails for model outputs and changes?",
      options: ["Yes, comprehensive logs", "Partial logging", "Limited logging", "No logging"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Have you evaluated system performance under edge cases and attacks?",
      options: ["Yes, comprehensive testing", "Limited testing", "Basic testing", "No testing"],
      category: "Robustness & Reliability",
      weight: 1
    },
    {
      question: "Do you monitor for model drift and retrain as needed?",
      options: ["Yes, continuous monitoring", "Periodic monitoring", "Ad-hoc monitoring", "No monitoring"],
      category: "Robustness & Reliability",
      weight: 1
    },
    {
      question: "Have you established fallback strategies for system failure?",
      options: ["Yes, comprehensive strategies", "Basic strategies", "Minimal planning", "No strategies"],
      category: "Robustness & Reliability",
      weight: 1
    },
    {
      question: "Do you apply fairness-aware methods during model training and evaluation?",
      options: ["Yes, multiple fairness constraints", "Basic fairness techniques", "Under consideration", "No fairness constraints"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Do you evaluate model behavior across different subgroups to identify performance disparities?",
      options: ["Yes, comprehensive subgroup analysis", "Basic demographic analysis", "Limited analysis", "No subgroup analysis"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Do you have established procedures to detect and resolve inequitable results?",
      options: ["Yes, formal mitigation protocols", "Basic remediation processes", "Ad-hoc approaches", "No formal procedures"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Do you restrict access to models and outputs to authorized individuals?",
      options: ["Yes, robust access controls", "Basic access restrictions", "Limited controls", "No specific access controls"],
      category: "Privacy & Security",
      weight: 1
    },
    {
      question: "Do you conduct third-party security reviews and penetration testing?",
      options: ["Yes, regular external audits", "Occasional third-party reviews", "Internal testing only", "No security audits"],
      category: "Privacy & Security",
      weight: 1
    },
    {
      question: "Do you offer explanations tailored to different stakeholder groups?",
      options: ["Yes, audience-specific explanations", "General explanations available", "Limited explanations", "No explanations provided"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Do you incorporate interpretability tools (SHAP, LIME, counterfactuals) for complex models?",
      options: ["Yes, multiple interpretability methods", "Basic interpretability features", "Under consideration", "No interpretability tools"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Do you use accessible, non-technical language for public understanding?",
      options: ["Yes, layered communication approach", "Somewhat accessible language", "Primarily technical language", "No public communications"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Do you maintain up-to-date documentation throughout development and deployment?",
      options: ["Yes, continuous documentation updates", "Periodic updates", "Infrequent updates", "Static documentation"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Do you allow users to contest or appeal AI-generated decisions?",
      options: ["Yes, formal appeal process", "Basic feedback mechanism", "Limited recourse", "No appeal process"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Are models reviewed by internal or external ethics boards?",
      options: ["Yes, formal ethics reviews", "Some ethical oversight", "Ad-hoc consultations", "No ethics reviews"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Do you publish contact, policy, and impact information for accountability?",
      options: ["Yes, comprehensive public information", "Basic contact information", "Limited information", "No public information"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Do you validate system behavior in varied and real-world contexts?",
      options: ["Yes, extensive real-world testing", "Limited field testing", "Controlled testing only", "No environmental testing"],
      category: "Robustness & Reliability",
      weight: 1
    },
    {
      question: "Do you confirm model stability prior to deployment?",
      options: ["Yes, rigorous pre-deployment validation", "Basic stability testing", "Limited testing", "No specific stability testing"],
      category: "Robustness & Reliability",
      weight: 1
    }
  ]
};

export default QUESTIONS_RAI
