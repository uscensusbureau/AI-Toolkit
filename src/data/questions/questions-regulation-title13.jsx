import AI_MODULES from '../modules'

const QUESTIONS_TITLE13 = {
  [AI_MODULES.TITLE13]: [
    {
      question: "Was the data used in the AI system collected under Title 13 authority?",
      options: ["Yes", "No", "Not sure"],
      category: "Data Collection and Use, Data-Specific",
      weight: 1
    },
    {
      question: "Was the data collected exclusively for statistical purposes?",
      options: ["Yes", "No", "Partially", "Unknown"],
      category: "Data Collection and Use, Data-Specific",
      weight: 1
    },
    {
      question: "Is there documentation of the questions/inquiries approved under S5?",
      options: ["Yes - Available", "No", "In Progress"],
      category: "Data Collection and Use, Data-Specific",
      weight: 1
    },
    {
      question: "Was data obtained from other federal, state, or private entities under S6?",
      options: ["Yes", "No", "Unknown"],
      category: "Data Collection and Use, Data-Specific",
      weight: 1
    },
    {
      question: "Were those external sources informed that the data would be used in AI systems?",
      options: ["Yes", "No", "Not Applicable"],
      category: "Data Collection and Use, Data-Specific",
      weight: 1
    },
    {
      question: "Is the AI model trained only on data approved for statistical purposes?",
      options: ["Yes", "No", "Mixed"],
      category: "Data Collection and Use, Model-Specific",
      weight: 1
    },
    {
      question: "Has model training been reviewed for compliance with Title 13 data use restrictions?",
      options: ["Yes - Internal", "Yes - External", "No", "Planned"],
      category: "Data Collection and Use, Model-Specific",
      weight: 1
    },
    {
      question: "Does the dataset contain personally identifiable information (PII)?",
      options: ["Yes", "No", "Unknown"],
      category: "Confidentiality and Disclosure, Data-Specific",
      weight: 1
    },
    {
      question: "Has data been disclosed in identifiable form without respondent consent?",
      options: ["Yes", "No", "Unknown"],
      category: "Confidentiality and Disclosure, Data-Specific",
      weight: 1
    },
    {
      question: "Has data shared with others been aggregated or anonymized?",
      options: ["Yes - Fully", "Partially", "No"],
      category: "Confidentiality and Disclosure, Data-Specific",
      weight: 1
    },
    {
      question: "Has data use been restricted to statistical analysis only?",
      options: ["Yes", "No", "Partially"],
      category: "Confidentiality and Disclosure, Data-Specific",
      weight: 1
    },
    {
      question: "Are datasets and access logs protected from legal discovery or subpoena per S9?",
      options: ["Yes", "No", "Not Applicable"],
      category: "Confidentiality and Disclosure, Data-Specific",
      weight: 1
    },
    {
      question: "Have reidentification or leakage risks from AI models been tested?",
      options: ["Yes – Formal Testing", "Yes – Informal Review", "No"],
      category: "Confidentiality and Disclosure, Model-Specific",
      weight: 1
    },
    {
      question: "Does the model allow for indirect disclosure of Title 13 protected information?",
      options: ["Yes – High Risk", "Moderate Risk", "Low Risk", "No"],
      category: "Confidentiality and Disclosure, Model-Specific",
      weight: 1
    },
    {
      question: "Have all personnel handling the model signed sworn confidentiality agreements?",
      options: ["Yes", "No", "Partially"],
      category: "Confidentiality and Disclosure, Model-Specific",
      weight: 1
    },
    {
      question: "Was address data in the model verified using state or local government sources?",
      options: ["Yes", "No", "Unknown"],
      category: "Local Access and Address Accuracy, Data-Specific",
      weight: 1
    },
    {
      question: "Was a census liaison involved in address validation or recommendation?",
      options: ["Yes", "No", "Not Applicable"],
      category: "Local Access and Address Accuracy, Data-Specific",
      weight: 1
    },
    {
      question: "Was address data used solely for census or statistical validation?",
      options: ["Yes", "No", "Partially"],
      category: "Local Access and Address Accuracy, Data-Specific",
      weight: 1
    },
    {
      question: "Has a Title 13 compliance review been conducted for the AI system?",
      options: ["Yes – Documented", "No", "In Progress"],
      category: "Final Compliance Checks, Cross-Cutting",
      weight: 1
    },
    {
      question: "Are AI model outputs and summaries restricted from revealing Title 13 data?",
      options: ["Yes – Confirmed", "Partially", "No", "Unknown"],
      category: "Final Compliance Checks, Cross-Cutting",
      weight: 1
    },
  ]
};

export default QUESTIONS_TITLE13
