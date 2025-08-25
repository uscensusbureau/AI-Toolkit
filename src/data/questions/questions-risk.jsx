import AI_MODULES from '../modules'

const QUESTIONS_RISK = {
  [AI_MODULES.RISK]: [
    {
      question: "Have you clearly defined the AI system's function, role, and objectives?",
      options: ["Yes, clearly defined", "Partially defined", "Vaguely defined", "Not defined"],
      category: "Map - Contextualization",
      weight: 1
    },
    {
      question: "Have you identified and engaged key stakeholders (developers, users, impacted communities)?",
      options: ["Yes, comprehensive engagement", "Partial engagement", "Limited engagement", "No engagement"],
      category: "Map - Contextualization",
      weight: 1
    },
    {
      question: "Have you assessed intended and unintended effects across the AI lifecycle?",
      options: ["Yes, comprehensive assessment", "Partial assessment", "Limited assessment", "No assessment"],
      category: "Map - Contextualization",
      weight: 1
    },
    {
      question: "Are you using scenario planning, testing, and expert input for risk discovery?",
      options: ["Yes, all methods", "Some methods", "Limited methods", "No structured methods"],
      category: "Measure - Risk Identification & Evaluation",
      weight: 1
    },
    {
      question: "Have you estimated consequences and probability of risk events?",
      options: ["Yes, detailed estimation", "Basic estimation", "Qualitative estimation only", "No estimation"],
      category: "Measure - Risk Identification & Evaluation",
      weight: 1
    },
    {
      question: "Do you maintain and update a risk inventory?",
      options: ["Yes, regularly updated", "Occasionally updated", "Created but not updated", "No inventory"],
      category: "Measure - Risk Identification & Evaluation",
      weight: 1
    },
    {
      question: "Have you documented controls and mitigation actions for identified risks?",
      options: ["Yes, comprehensive documentation", "Partial documentation", "Limited documentation", "No documentation"],
      category: "Manage - Risk Response",
      weight: 1
    },
    {
      question: "Have you identified risk owners and maintained accountability?",
      options: ["Yes, clear ownership", "Partial ownership", "Informal ownership", "No defined ownership"],
      category: "Manage - Risk Response",
      weight: 1
    },
    {
      question: "Have you created an oversight structure (boards or designated responsible parties)?",
      options: ["Yes, formal structure", "Informal structure", "Planning stage", "No structure"],
      category: "Govern - Oversight & Accountability",
      weight: 1
    },
    {
      question: "Have you implemented audit trails and logs for accountability?",
      options: ["Yes, comprehensive implementation", "Partial implementation", "Limited implementation", "No implementation"],
      category: "Govern - Oversight & Accountability",
      weight: 1
    },
    {
      question: "Have you confirmed alignment with agency mission, legal boundaries, and ethical frameworks?",
      options: ["Yes, comprehensive alignment verified", "Partial alignment verified", "Preliminary analysis", "No verification"],
      category: "Map - Contextualization",
      weight: 1
    },
    {
      question: "Have you documented all system dependencies, integrations, and environmental interactions?",
      options: ["Yes, comprehensive documentation", "Partial documentation", "Basic documentation", "No documentation"],
      category: "Map - Contextualization",
      weight: 1
    },
    {
      question: "Have you assessed accuracy under varied inputs and conditions to understand performance boundaries?",
      options: ["Yes, systematic conditional testing", "Limited conditional testing", "Basic testing", "No conditional testing"],
      category: "Measure - Risk Identification & Evaluation",
      weight: 1
    },
    {
      question: "Do you include fairness, robustness, privacy, and reliability metrics beyond accuracy?",
      options: ["Yes, comprehensive metrics", "Some additional metrics", "Primarily accuracy metrics", "No comprehensive metrics"],
      category: "Measure - Risk Identification & Evaluation",
      weight: 1
    },
    {
      question: "Do you keep risk logs updated and accessible?",
      options: ["Yes, actively maintained", "Periodically updated", "Created but static", "No risk logs"],
      category: "Manage - Risk Response",
      weight: 1
    },
    {
      question: "Have you established clear thresholds and response protocols for emerging risks?",
      options: ["Yes, defined protocols and thresholds", "Basic incident procedures", "Ad-hoc responses", "No protocols"],
      category: "Manage - Risk Response",
      weight: 1
    },
    {
      question: "Do you test risk mitigations for performance?",
      options: ["Yes, systematic effectiveness testing", "Limited testing", "Informal assessment", "No effectiveness testing"],
      category: "Manage - Risk Response",
      weight: 1
    },
    {
      question: "Have you aligned AI use with broader organizational policies?",
      options: ["Yes, fully integrated with existing policies", "Partial policy integration", "Limited alignment", "No policy integration"],
      category: "Govern - Oversight & Accountability",
      weight: 1
    },
    {
      question: "Do you ensure adherence to AI governance frameworks, ethical guidelines, and legal mandates?",
      options: ["Yes, formal compliance program", "Partial compliance efforts", "Ad-hoc compliance", "No formal adherence"],
      category: "Govern - Oversight & Accountability",
      weight: 1
    },
    {
      question: "Do you share relevant risk insights with stakeholders through appropriate channels?",
      options: ["Yes, structured transparency program", "Selected information shared", "Limited transparency", "No risk sharing"],
      category: "Govern - Oversight & Accountability",
      weight: 1
    }
  ]
};

export default QUESTIONS_RISK
