import AI_MODULES from '../modules'

const QUESTIONS_REGULATION = {
  [AI_MODULES.REGULATION]: [
    {
      question: "Is your AI system cataloged in your agency's use case inventory?",
      options: ["Yes, fully documented", "Partially documented", "Not yet documented", "Not applicable"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has your agency designated leadership (e.g., Chief AI Officer) for AI governance?",
      options: ["Yes, with clear responsibilities", "Yes, but roles need clarification", "In progress", "No"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Has your AI system been reviewed by a governance board?",
      options: ["Yes, comprehensive review completed", "Partial review completed", "Review scheduled", "No review planned"],
      category: "Identification & Governance",
      weight: 1
    },
    {
      question: "Does your AI system align with your agency's mission and statutory limits?",
      options: ["Yes, clearly aligned", "Mostly aligned with minor gaps", "Partially aligned with significant gaps", "Alignment not verified"],
      category: "Purpose & Use Justification",
      weight: 1
    },
    {
      question: "Has a Risk-Based Impact Assessment (RBIA) been conducted for your AI system?",
      options: ["Yes, comprehensive assessment", "Partial assessment", "Assessment planned", "No assessment"],
      category: "Risk Assessment & Classification",
      weight: 1
    },
    {
      question: "Is documentation about your AI model and datasets version-controlled?",
      options: ["Yes, comprehensive version control", "Partial version control", "Basic documentation without version control", "Limited or no documentation"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Does your AI system have human review mechanisms for key decisions?",
      options: ["Yes, robust human oversight", "Partial human oversight", "Limited human oversight", "No human oversight"],
      category: "Human Oversight & Accountability",
      weight: 1
    },
    {
      question: "Has your Senior Agency Official for Privacy (SAOP) assessed the system?",
      options: ["Yes, thoroughly assessed", "Initial assessment completed", "Assessment planned", "No assessment"],
      category: "Privacy, Fairness & Data Integrity",
      weight: 1
    },
    {
      question: "Does your system comply with FISMA and have Authority to Operate (ATO)?",
      options: ["Yes, full compliance with ATO", "Provisional ATO granted", "ATO in progress", "No ATO process initiated"],
      category: "Security & Robustness",
      weight: 1
    },
    {
      question: "Have you published clear, accessible documentation about the system's purpose and function?",
      options: ["Yes, comprehensive public documentation", "Basic public information available", "Internal documentation only", "Limited or no documentation"],
      category: "Purpose & Use Justification",
      weight: 1
    },
    {
      question: "Does your system undergo independent evaluation or red-team exercises?",
      options: ["Yes, regular third-party assessments", "Occasional external reviews", "Internal evaluations only", "No formal evaluation process"],
      category: "Risk Assessment & Classification",
      weight: 1
    },
    {
      question: "Are explainability tools (SHAP, LIME, etc.) implemented for high-stakes predictions?",
      options: ["Yes, comprehensive tools implemented", "Basic explainability features", "Planned but not implemented", "No explainability tools"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Are operators trained in ethical AI use and escalation protocols?",
      options: ["Yes, comprehensive training program", "Basic training provided", "Limited or ad-hoc training", "No formal training"],
      category: "Human Oversight & Accountability",
      weight: 1
    },
    {
      question: "Are fairness audits conducted to assess disparate impact across demographic groups?",
      options: ["Yes, regular comprehensive audits", "Limited fairness assessments", "Planned but not implemented", "No fairness audits"],
      category: "Privacy, Fairness & Data Integrity",
      weight: 1
    },
    {
      question: "Are there safeguards against adversarial attacks and data leakage?",
      options: ["Yes, robust security controls", "Basic security measures", "Limited protections", "No specific AI security measures"],
      category: "Security & Robustness",
      weight: 1
    },
    {
      question: "Do you have mechanisms to detect and mitigate performance decay and concept drift?",
      options: ["Yes, automated monitoring systems", "Manual periodic reviews", "Ad-hoc checks only", "No drift monitoring"],
      category: "Security & Robustness",
      weight: 1
    },
    {
      question: "For systems affecting public services, are feedback and correction mechanisms available?",
      options: ["Yes, robust redress processes", "Basic feedback mechanisms", "Limited channels", "No redress mechanisms"],
      category: "Public Services & High-Impact Systems",
      weight: 1
    },
    {
      question: "Does your agency have a plan for system retirement or replacement?",
      options: ["Yes, comprehensive decommissioning plan", "Basic end-of-life planning", "Informal considerations only", "No decommissioning plan"],
      category: "Lifecycle & Open Source Considerations",
      weight: 1
    },
    {
      question: "Has open source publication of the system's code been evaluated when feasible?",
      options: ["Yes, with clear publication criteria", "Basic evaluation conducted", "Under consideration", "No open source evaluation"],
      category: "Lifecycle & Open Source Considerations",
      weight: 1
    }
  ]
};

export default QUESTIONS_REGULATION