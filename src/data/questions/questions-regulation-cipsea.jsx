import AI_MODULES from '../modules'

const QUESTIONS_CIPSEA = {
  [AI_MODULES.CIPSEA]: [
    {
      question: "Is the data asset used to train or evaluate this AI system collected by a designated statistical agency or unit?",
      options: ["Yes", "No", "Not Sure"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "Has the dataset been classified as collected for a statistical purpose under CIPSEA?",
      options: ["Yes", "No", "Not Applicable"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "Does the dataset contain information in identifiable form?",
      options: ["Yes", "No", "Uncertain – Needs Review"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "Have identifiability risks been assessed before AI model training?",
      options: ["Yes – Formal Risk Assessment", "Yes – Informal Review", "No", "Planned but not completed"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "Was the dataset explicitly collected for statistical, not nonstatistical, purposes?",
      options: ["Yes", "No", "Unknown"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "If the data may be used for nonstatistical purposes, was the public notified in advance?",
      options: ["Yes", "No", "Not applicable"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "Is the AI model solely used for statistical estimation or analysis (not regulatory or enforcement purposes)?",
      options: ["Yes", "No", "Dual-Use – Documented"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "Has the statistical purpose of the AI model been documented and reviewed?",
      options: ["Yes – Documented", "In Progress", "No"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "Has your agency’s use of this model been reviewed for CIPSEA alignment?",
      options: ["Yes – OMB Reviewed", "Yes – Internal Review", "No", "Unknown"],
      category: "General Responsibilities & Definitions",
      weight: 1
    },
    {
      question: "Are access logs maintained for those handling the data?",
      options: ["Yes – Automated", "Yes – Manual", "No"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "Have data sensitivity levels been formally assessed?",
      options: ["Yes – High", "Moderate", "Low", "No", "In Progress"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "Is any part of the dataset shared externally in identifiable form?",
      options: ["Yes", "No", "Unknown"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "If yes, was informed consent obtained and agency head approval documented?",
      options: ["Yes – Consent and Approval", "Only Consent", "Only Approval", "Neither", "Not Applicable"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "Was the AI model trained on data collected under a confidentiality pledge?",
      options: ["Yes", "No", "Mixed Data Sources"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "Have model memorization or leakage risks been evaluated?",
      options: ["Yes – Formal Audit", "Yes – Informal Review", "No", "Unknown"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "Do model outputs pose reidentification risks?",
      options: ["Yes – High", "Moderate", "Low", "No", "Not Assessed"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "Have outputs been audited for privacy risks (e.g., inversion attacks)?",
      options: ["Yes", "No", "Planned"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "Have all agents working on the model signed confidentiality agreements?",
      options: ["Yes", "No", "Partial Coverage"],
      category: "Confidential Information Protection",
      weight: 1
    },
    {
      question: "Is the AI system trained on data shared between BLS, BEA, or Census?",
      options: ["Yes", "No", "Unknown"],
      category: "Statistical Efficiency & Data Sharing",
      weight: 1
    },
    {
      question: "Was a 60-day public notice provided for any data sharing not disclosed to respondents?",
      options: ["Yes", "No", "Not Applicable"],
      category: "Statistical Efficiency & Data Sharing",
      weight: 1
    },
    {
      question: "Are any AI models co-developed across agencies?",
      options: ["Yes", "No", "In Progress"],
      category: "Statistical Efficiency & Data Sharing",
      weight: 1
    },
    {
      question: "Are co-developed models governed by written CIPSEA-compliant agreements?",
      options: ["Yes", "No", "Not Yet"],
      category: "Statistical Efficiency & Data Sharing",
      weight: 1
    },
    {
      question: "Has it been assigned a sensitivity and accessibility level?",
      options: ["Yes – High", "Moderate", "Low", "No", "Not Required"],
      category: "Access to Data for Evidence",
      weight: 1
    },
    {
      question: "Has the dataset been de-identified or transformed to reduce sensitivity?",
      options: ["Yes – Anonymization", "Yes – Aggregation", "Low", "Partial"],
      category: "Access to Data for Evidence",
      weight: 1
    },
    {
      question: "Has a comprehensive risk assessment been completed?",
      options: ["Yes", "No", "In Progress"],
      category: "Access to Data for Evidence",
      weight: 1
    },
    {
      question: "Is the AI model or output shared externally?",
      options: ["Yes – Open Model", "Yes – Limited Use", "No"],
      category: "Access to Data for Evidence",
      weight: 1
    },
    {
      question: "Are requests to access the model or outputs logged and tracked?",
      options: ["Yes", "No", "In Progress"],
      category: "Access to Data for Evidence",
      weight: 1
    },
    {
      question: "Are the following publicly available:",
      options: ["List of applications for access", "Application statuses", "Final determinations", "Appeals process documentation"],
      category: "Access to Data for Evidence",
      weight: 1
    },
  ]
};

export default QUESTIONS_CIPSEA
