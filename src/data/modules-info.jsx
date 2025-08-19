import AI_MODULES from './modules'

const AI_MODULES_INFO = {
  [AI_MODULES.MAPPING]: {
    title: 'AI Model Mapping',
    description: 'Match machine learning models to application needs based on data modality, task type, learning paradigm, and constraints.',
    guideTitle: 'AI Model Mapping Guide',
    questTitle: 'ML Model Selection Questionnaire',
    color: '#2196F3'
  },
  [AI_MODULES.REGULATION]: {
    title: 'AI Regulation & Policy',
    description: 'Ensure compliance with federal AI regulations and policies for responsible and transparent AI governance.',
    guideTitle: 'Federal AI Regulations Guide',
    questTitle: 'Federal AI Compliance Questionnaire',
    color: '#4CAF50'
  },
  [AI_MODULES.RESPONSIBLE_AI]: {
    title: 'Responsible AI',
    description: 'Apply the five core principles of Responsible AI: Bias & Fairness, Privacy & Security, Transparency, Accountability, and Robustness.',
    guideTitle: 'Responsible AI Principles Guide',
    questTitle: 'Responsible AI Compliance Questionnaire',
    color: '#9C27B0'
  },
  [AI_MODULES.OMB_M25_21]: {
    title: 'OMB-M-25-21',
    description: 'OMB-M-25-21 Model Specific AI Compliance Questions',
    guideTitle: 'OMB-M-25-21 Compliance Guide',
    questTitle: 'OMB-M-25-21 Compliance Questionnaire',
    color: '#4CAF50'
  },
  [AI_MODULES.EO_14179]: {
    title: 'EO 14179',
    description: 'EO 14179 Model Specific AI Compliance Questions',
    guideTitle: 'EO 14179 Compliance Guide',
    questTitle: 'EO 14179 Compliance Questionnaire',
    color: '#4CAF50'
  },
  [AI_MODULES.TITLE13]: {
    title: 'Title 13',
    description: 'Title 13 Model Specific AI Compliance Questions',
    guideTitle: 'Title 13 Compliance Guide',
    questTitle: 'Title 13 Compliance Questionnaire',
    color: '#4CAF50'
  },
  [AI_MODULES.CIPSEA]: {
    title: 'CIPSEA',
    description: 'CIPSEA Model Specific AI Compliance Questions',
    guideTitle: 'CIPSEA Compliance Guide',
    questTitle: 'CIPSEA Compliance Questionnaire',
    color: '#4CAF50'
  },
  [AI_MODULES.RISK]: {
    title: 'AI Risk Management',
    description: 'Identify, evaluate, respond to, and govern AI risks through the NIST AI Risk Management Framework.',
    guideTitle: 'NIST AI RMF Guide',
    questTitle: 'AI RMF Risk Assessment Questionnaire',
    color: '#FF9800'
  }
};

export default AI_MODULES_INFO;
