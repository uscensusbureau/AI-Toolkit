import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Info, CheckCircle, AlertTriangle, XCircle, HelpCircle, ChevronDown, ChevronRight, BarChart3, FileText, Home, Settings, Download, ArrowLeft, ArrowRight, Shield, BookOpen, Users, Target, Lightbulb, ArrowUpRight } from 'lucide-react';

import AI_MODULES from './data/modules'
import AI_MODULES_INFO from './data/modules-info'
import GUIDE_CONTENT from './data/guide-content'
import MODEL_RECOMMENDATIONS from './data/model-recommendations'
import QUESTIONNAIRES from './data/questionnaires'

import ModuleProgressComponent from './components/component-module-progress'

import './index.css'

// Calculate score and recommendation functions
const calculateModuleScore = (answers, module) => {
  if (!answers || !answers[module] || !QUESTIONNAIRES[module] || Object.keys(answers[module]).length === 0) {
    return { score: 0, maxScore: 0, percentage: 0 };
  }

  const questions = QUESTIONNAIRES[module];
  let score = 0;
  let maxScore = 0;

  Object.entries(answers[module]).forEach(([qIndex, answer]) => {
    const question = questions[parseInt(qIndex)];
    if (!question || !question.options) return;

    // Skip "Not Applicable" or "NA" answers in scoring
    if (answer === "Not Applicable" || answer === "NA") return;

    const optionIndex = question.options.indexOf(answer);
    const weight = question.weight || 1;

    // Score based on option position (first option is best)
    const optionScore = question.options.length - optionIndex;
    score += optionScore * weight;
    maxScore += question.options.length * weight;
  });

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return { score, maxScore, percentage };
};

const getComplianceLevel = (percentage) => {
  if (percentage >= 90) return { level: 'High Compliance', color: '#4CAF50', icon: <CheckCircle size={20} /> };
  if (percentage >= 70) return { level: 'Moderate Compliance', color: '#FF9800', icon: <AlertTriangle size={20} /> };
  return { level: 'Low Compliance', color: '#F44336', icon: <XCircle size={20} /> };
};

// Get learning tips for specific categories
const getCategoryLearningTip = (category, module) => {
  const tips = {
    // OMB M-25-21 tips
    "Documentation & Assessment Requirements": "Start with clear system documentation - it's the foundation for all other compliance activities",
    "AI Impact Assessment (AIIA) Components": "The AIIA is your comprehensive compliance record - invest time in making it thorough",
    "Human Oversight & Safety Mechanisms": "Human oversight isn't just a checkbox - design meaningful intervention points",
    "Monitoring & Accountability Framework": "Continuous monitoring catches issues early - automate what you can, audit what matters",
    "Public Transparency & Disclosure": "Transparency builds trust - communicate clearly about your AI systems' purpose and limitations",

    // EO 14179 tips
    "Ideological Bias Prevention & Technical Integrity": "Focus on objective technical metrics rather than subjective social outcomes",
    "Strategic Alignment & National Competitiveness": "Connect your AI work to broader national objectives and document the benefits",
    "Policy Compliance & Regulatory Efficiency": "Review and remove outdated requirements from previous executive orders",
    "Agency Integration & Coordination": "Coordinate with your agency's overall EO 14179 implementation strategy",

    // Risk Management tips
    "Map - Contextualization": "Understanding your AI system's purpose and stakeholders is the first step in effective risk management",
    "Measure - Risk Identification & Evaluation": "Use multiple methods to discover risks - what you don't know can hurt you",
    "Manage - Risk Response": "Every identified risk needs an owner and a plan - avoid orphaned risks",
    "Govern - Oversight & Accountability": "Good governance creates the structure for everything else to work",

    // General tips
    default: "Review the information guide for detailed explanations and best practices for this category"
  };

  return tips[category] || tips.default;
};

// Get model recommendations based on selected options
const getModelRecommendation = (answers) => {
  if (!answers || !answers[AI_MODULES.MAPPING]) return null;

  const mappingAnswers = answers[AI_MODULES.MAPPING];

  // Need at least data type, task type, learning type, and interpretability to make recommendation
  if (Object.keys(mappingAnswers).length < 4) {
    return {
      recommendations: [
        "Complete more questionnaire fields for tailored recommendations",
        "At minimum, specify data type, task, learning paradigm, and interpretability needs",
        "Additional specificity will result in more targeted recommendations"
      ]
    };
  }

  // Extract key parameters from answers
  const dataType = mappingAnswers[0]; // Data modality
  const taskType = mappingAnswers[1]; // ML task
  const learningType = mappingAnswers[2]; // Learning paradigm
  const interpretability = mappingAnswers[3]; // Interpretability vs. complexity

  // Try to find specific recommendations based on these parameters
  const specificKey = `${dataType}-${taskType}-${learningType}-${interpretability}`;

  // Look for the most specific match first, then fall back to more general matches
  if (MODEL_RECOMMENDATIONS[specificKey]) {
    return MODEL_RECOMMENDATIONS[specificKey];
  } else {
    // If no specific recommendation, provide a general one
    return MODEL_RECOMMENDATIONS.default;
  }
};

// Create category scores for visualization
const getCategoryScores = (answers, module) => {
  if (!answers || !answers[module] || !QUESTIONNAIRES[module] || Object.keys(answers[module]).length === 0) {
    return [];
  }

  const questions = QUESTIONNAIRES[module];
  const categories = {};

  // Initialize categories
  questions.forEach(q => {
    if (!q || !q.category) return;
    if (!categories[q.category]) {
      categories[q.category] = {
        category: q.category,
        score: 0,
        maxScore: 0,
        percentage: 0,
        questions: 0,
        answeredQuestions: 0
      };
    }
    categories[q.category].questions += 1;
  });

  // Calculate scores per category
  Object.entries(answers[module]).forEach(([qIndex, answer]) => {
    const question = questions[parseInt(qIndex)];
    if (!question || !question.category || !question.options) return;

    const category = question.category;

    // Count as answered regardless of NA status
    if (categories[category]) {
      categories[category].answeredQuestions += 1;
    }

    // Skip "Not Applicable" or "NA" answers in scoring
    if (answer === "Not Applicable" || answer === "NA") return;

    const optionIndex = question.options.indexOf(answer);
    const weight = question.weight || 1;

    // Score based on option position (first option is best)
    const optionScore = question.options.length - optionIndex;

    if (categories[category]) {
      categories[category].score += optionScore * weight;
      categories[category].maxScore += question.options.length * weight;
    }
  });

  // Calculate percentages
  Object.values(categories).forEach(category => {
    category.percentage = category.maxScore > 0
      ? Math.round((category.score / category.maxScore) * 100)
      : 0;
  });

  return Object.values(categories);
};

// Recommendations based on scores and categories
const getRecommendations = (categoryScores, module) => {
  const lowScoreCategories = categoryScores.filter(cat => cat.percentage < 70);

  if (lowScoreCategories.length === 0) {
    return "Your current practices are well aligned with best practices. Focus on maintaining your governance approach and staying current with evolving standards.";
  }

  const categoriesList = lowScoreCategories.map(cat => cat.category).join(", ");

  const moduleRecommendations = {
    [AI_MODULES.MAPPING]: `Consider reviewing your selections related to ${categoriesList}. A more appropriate model architecture or approach may better address your specific needs in these areas.`,
    [AI_MODULES.REGULATION]: `To enhance regulatory compliance, prioritize improvements in ${categoriesList}. Consider implementing a more formal governance structure with clear documentation and review processes for these aspects.`,
    [AI_MODULES.RESPONSIBLE_AI]: `To strengthen responsible AI practices, focus on improvements in ${categoriesList}. Implementing regular audits and creating more robust processes in these areas will enhance your overall responsible AI framework.`,
    [AI_MODULES.RISK]: `For better risk management, strengthen your approach to ${categoriesList}. Establish clearer ownership of risks in these categories and implement regular review cycles to address emerging concerns.`,
    [AI_MODULES.OMB_M25_21]: getOMBSpecificRecommendations(lowScoreCategories),
    [AI_MODULES.EO_14179]: getEOSpecificRecommendations(lowScoreCategories),
    [AI_MODULES.TITLE_13]: `To improve Title 13 compliance, focus on strengthening ${categoriesList}. Implement additional safeguards and documentation in these areas to ensure proper protection of statistical data and compliance with confidentiality requirements.`
  };

  return moduleRecommendations[module] || "Focus on the lowest-scoring categories to improve your overall assessment.";
};

// Tooltip component for term explanations
const ExplanationTooltip = ({ term, definition, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        className="border-b border-dotted border-blue-500 text-blue-600 cursor-help"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50">
          <div className="font-medium mb-1">{term}</div>
          <div>{definition}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

// Policy context modal
const PolicyModal = ({ isOpen, onClose, title, content, policyLink }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl max-h-96 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle size={24} />
            </button>
          </div>
          <div className="text-sm text-gray-700 mb-4">
            {content}
          </div>
          {policyLink && (
            <a
              href={policyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
            >
              Read full policy document
              <ArrowUpRight size={14} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced question component with learning aids
const EnhancedQuestion = ({ question, questionIndex, answers, activeModule, handleAnswer }) => {
  const [showContext, setShowContext] = useState(false);

  // Add contextual learning content based on question content
  const getContextualHelp = (questionText, category) => {
    const contexts = {
      "Risk-Based Impact Assessment": {
        context: "An RBIA evaluates potential AI system impacts across multiple dimensions including safety, rights, and societal effects. It's required under OMB guidance to classify systems as low, moderate, or high impact.",
        policyLink: "https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf"
      },
      "Authority to Operate": {
        context: "ATO is a formal security authorization required under FISMA for federal information systems. AI systems must complete this process to demonstrate they meet security requirements.",
        policyLink: "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      "AIIA": {
        context: "The AI Impact Assessment is a comprehensive evaluation document required by OMB M-25-21 for AI systems that may impact individual rights or safety.",
        policyLink: "https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf"
      }
    };

    // Look for key terms in the question
    for (const [term, info] of Object.entries(contexts)) {
      if (questionText.includes(term) || questionText.includes(term.toUpperCase())) {
        return info;
      }
    }
    return null;
  };

  const contextHelp = getContextualHelp(question.question, question.category);

  // Check if this is the AI Mapping module - no color coding for mapping
  const isMappingModule = activeModule === AI_MODULES.MAPPING;

  return (
    <div className="mb-4 border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-2">
              {questionIndex + 1}. {question.question}
            </h4>
            <p className="text-sm text-gray-500">
              Category: {question.category}
            </p>
          </div>
          {contextHelp && (
            <button
              onClick={() => setShowContext(!showContext)}
              className="ml-4 p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
              title="Learn more about this requirement"
            >
              <HelpCircle size={18} />
            </button>
          )}
        </div>

        {/* Expandable context */}
        {showContext && contextHelp && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Info size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 mb-2">{contextHelp.context}</p>
                {contextHelp.policyLink && (
                  <a
                    href={contextHelp.policyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center"
                  >
                    View in policy document
                    <ArrowUpRight size={12} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.options.map((option, optIndex) => {
            // For mapping module, use neutral styling for all options
            let optionStyling = 'border-gray-300';
            let scoreIndicator = '';

            if (!isMappingModule) {
              // Only apply color coding and score indicators for non-mapping modules
              if (option === "Not Applicable" || option === "NA") {
                optionStyling = 'border-gray-300 bg-gray-50';
                scoreIndicator = '⚪';
              } else if (optIndex === 0) {
                optionStyling = 'border-green-300 bg-green-50';
                scoreIndicator = '🟢';
              } else if (optIndex === 1) {
                optionStyling = 'border-blue-300 bg-blue-50';
                scoreIndicator = '🔵';
              } else if (optIndex === question.options.length - 1 && option !== "Not Applicable" && option !== "NA") {
                optionStyling = 'border-red-300 bg-red-50';
                scoreIndicator = '🔴';
              } else {
                optionStyling = 'border-yellow-300 bg-yellow-50';
                scoreIndicator = '🟡';
              }
            }

            return (
              <button
                key={optIndex}
                className={`p-2 border rounded w-full text-left ${answers[activeModule][questionIndex] === option ? 'bg-blue-600 text-white border-blue-600' : optionStyling} hover:shadow-sm transition-all duration-200`}
                onClick={() => handleAnswer(questionIndex, option)}
              >
                <div className="flex items-start">
                  {!isMappingModule && <span className="mr-2 text-xs mt-1">{scoreIndicator}</span>}
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Term definitions for tooltips
const TERM_DEFINITIONS = {
  "RBIA": "Risk-Based Impact Assessment - A systematic evaluation to classify AI systems as low, moderate, or high impact based on potential consequences",
  "SAOP": "Senior Agency Official for Privacy - The designated official responsible for privacy compliance and oversight within a federal agency",
  "ATO": "Authority to Operate - A formal security authorization required under FISMA allowing a system to operate in a federal environment",
  "FISMA": "Federal Information Security Management Act - Legislation requiring federal agencies to implement information security programs",
  "AIIA": "AI Impact Assessment - A comprehensive evaluation document required for AI systems that may impact rights or safety",
  "Title 13": "Federal law protecting the confidentiality of census data and restricting its use to statistical purposes only",
  "NIST AI RMF": "National Institute of Standards and Technology AI Risk Management Framework - Guidelines for managing AI-related risks",
  "Red-teaming": "Adversarial testing where external teams attempt to find vulnerabilities or failure modes in AI systems",
  "Concept drift": "When the statistical properties of data change over time, potentially degrading model performance",
  "Differential privacy": "A mathematical framework that provides privacy guarantees by adding carefully calibrated noise to data"
};

// Enhanced question text with tooltips
const enhanceTextWithTooltips = (text) => {
  let enhancedText = text;

  Object.entries(TERM_DEFINITIONS).forEach(([term, definition]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    enhancedText = enhancedText.replace(regex, (match) => {
      return `<tooltip term="${term}" definition="${definition}">${match}</tooltip>`;
    });
  });

  return enhancedText;
};

// Specific actionable recommendations for OMB M-25-21
const getOMBSpecificRecommendations = (lowScoreCategories) => {
  const recommendations = [];

  lowScoreCategories.forEach(category => {
    switch(category.category) {
      case "Documentation & Assessment Requirements":
        recommendations.push("• Create comprehensive system documentation including intended use, objectives, and expected outcomes");
        recommendations.push("• Conduct formal high-impact assessment using established OMB criteria and document rationale");
        recommendations.push("• Implement systematic pre-deployment testing with documented validation procedures");
        break;
      case "AI Impact Assessment (AIIA) Components":
        recommendations.push("• Develop complete AIIA including system overview, dataset documentation, and performance metrics");
        recommendations.push("• Conduct thorough rights impact analysis focusing on privacy, civil rights, and civil liberties");
        recommendations.push("• Document public cost-benefit analysis and independent evaluation/red-teaming activities");
        recommendations.push("• Clearly document risk acceptance decisions and residual risk management strategies");
        break;
      case "Human Oversight & Safety Mechanisms":
        recommendations.push("• Implement meaningful human oversight mechanisms with clear intervention procedures");
        recommendations.push("• Design and test documented fail-safe mechanisms for unintended failure scenarios");
        recommendations.push("• Establish formal appeals process with clear procedures for affected individuals");
        break;
      case "Monitoring & Accountability Framework":
        recommendations.push("• Implement continuous monitoring procedures with key performance indicators and alerting");
        recommendations.push("• Maintain comprehensive audit logs sufficient for tracing decisions and automated outputs");
        recommendations.push("• Create public feedback mechanisms for users to submit concerns and suggestions");
        break;
      case "Public Transparency & Disclosure":
        recommendations.push("• Publish AIIA or appropriate summary on agency website for public access");
        recommendations.push("• Make ongoing monitoring results publicly available as required by OMB guidance");
        recommendations.push("• Ensure transparency documentation is accessible and written for general audiences");
        break;
      default:
        recommendations.push(`• Address gaps in ${category.category} through enhanced documentation and process improvements`);
    }
  });

  return recommendations.join("\n");
};


// Specific actionable recommendations for EO 14179
const getEOSpecificRecommendations = (lowScoreCategories) => {
  const recommendations = [];

  lowScoreCategories.forEach(category => {
    switch(category.category) {
      case "Ideological Bias Prevention & Technical Integrity":
        recommendations.push("• Conduct objective technical evaluation focusing on performance metrics rather than social engineering");
        recommendations.push("• Document bias testing methodology that aligns with technical risks and empirical evidence");
        recommendations.push("• Implement fairness testing based on objective performance criteria rather than ideological frameworks");
        recommendations.push("• Ensure all safety assessments focus on technical risks without imposing extraneous social constraints");
        break;
      case "Strategic Alignment & National Competitiveness":
        recommendations.push("• Document clear linkage between AI system and national objectives (human flourishing, economic competitiveness, national security)");
        recommendations.push("• Align technical evaluations with fostering U.S. leadership in safe, trustworthy AI development");
        recommendations.push("• Create explicit documentation showing contribution to U.S. global AI leadership under National AI Strategy");
        recommendations.push("• Establish metrics showing intended benefit to U.S. competitiveness or security");
        break;
      case "Policy Compliance & Regulatory Efficiency":
        recommendations.push("• Review and remove any legacy policies from EO 14110 that conflict with EO 14179 requirements");
        recommendations.push("• Update documentation to comply with revised OMB M-24-10 and related EO 14179 guidance");
        recommendations.push("• Reassess risk classifications and waivers under new OMB guidance framework");
        recommendations.push("• Streamline development and procurement processes to accelerate AI adoption per EO priorities");
        recommendations.push("• Remove undue regulatory barriers that slow implementation inconsistent with EO 14179");
        break;
      case "Transparency & Documentation Standards":
        recommendations.push("• Maintain comprehensive records suitable for potential public disclosure of decision processes");
        recommendations.push("• Implement comprehensive audit logs and provenance tracking for all AI processing and outputs");
        recommendations.push("• Create and maintain central compliance file for the system under EO 14179 requirements");
        break;
      case "Appeals & Redress Mechanisms":
        recommendations.push("• Establish formal appeals and redress process for individuals affected by AI-driven decisions");
        recommendations.push("• Ensure redress mechanisms are accessible and provide meaningful opportunities for relief");
        recommendations.push("• Document clear procedures and timelines for appeal resolution");
        break;
      case "Agency Integration & Coordination":
        recommendations.push("• Coordinate compliance activities with agency-wide EO 14179 policy implementation");
        recommendations.push("• Include system in comprehensive agency compliance portfolio under EO 14179");
        recommendations.push("• Update system to align with revised agency standards post-EO 14179");
        recommendations.push("• Make clear lifecycle decisions (continue, revise, phase out) under EO 14179 framework");
        break;
      default:
        recommendations.push(`• Address compliance gaps in ${category.category} through systematic policy alignment with EO 14179`);
    }
  });

  return recommendations.join("\n");
};


// Landing Page Component
const LandingPage = ({ onLaunchDashboard }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg mr-3 flex items-center justify-center shadow">
                <Home className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">AI Governance Toolkit</h1>
            </div>
            <button
              onClick={onLaunchDashboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow transform hover:scale-105 transition-all duration-200"
            >
              Launch Dashboard →
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - All sections in one page */}
      <div className="container mx-auto px-6 py-8 overflow-auto">
        <div className="space-y-12">

          {/* Overview Section */}
          <section className="bg-white rounded-lg shadow p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="pr-6">
                <div className="bg-blue-50 rounded-lg p-6 mb-6 shadow-sm">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">AI Governance Toolkit</h1>
                  <p className="text-gray-600 mb-6 text-lg">Comprehensive AI System Assessment & Compliance Platform</p>
                  <button
                    onClick={onLaunchDashboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow transform hover:scale-105 transition-all duration-200"
                  >
                    Launch Dashboard →
                  </button>
                </div>

                {/* Goals */}
                <div className="bg-gray-50 rounded-lg p-6 shadow">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                      <Target size={16} className="text-gray-600" />
                    </div>
                    Toolkit Goals
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
                        <Target size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold block mb-1 text-gray-900">Assess & Gauge Compliance</span>
                        <p className="text-sm text-gray-600">Comprehensive modules for compliance assessment across AI governance areas</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
                        <Lightbulb size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold block mb-1 text-gray-900">Receive Recommendations</span>
                        <p className="text-sm text-gray-600">Detailed assessments and actionable recommendations for your AI systems</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
                        <Download size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold block mb-1 text-gray-900">Download Artifacts</span>
                        <p className="text-sm text-gray-600">Generate compliance artifacts for documentation and reporting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pl-2">
                <div className="bg-gray-50 rounded-lg p-6 h-full shadow-sm">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Who is this toolkit for?</h2>

                  <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center">
                        <Users size={16} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">AI Lifecycle Actors</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Designed for actors across the design, development, deployment, and evaluation phases of the AI lifecycle.</p>

                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                        <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                          <div className="w-6 h-6 bg-blue-500 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">1</div>
                          Practitioners Assessing Risk & Compliance
                        </h4>
                        <div className="text-sm space-y-1 text-gray-700">
                          <div className="flex items-start"><span className="text-blue-500 mr-2">•</span><span>Creating compliance artifacts aligned with OMB Memos and Executive Orders</span></div>
                          <div className="flex items-start"><span className="text-blue-500 mr-2">•</span><span>Assessing and gauging compliance throughout the AI lifecycle</span></div>
                          <div className="flex items-start"><span className="text-blue-500 mr-2">•</span><span>Documenting risk management and mitigation strategies</span></div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                        <h4 className="font-bold text-gray-700 mb-2 flex items-center">
                          <div className="w-6 h-6 bg-gray-500 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">2</div>
                          Agencies Building a Toolkit
                        </h4>
                        <div className="text-sm space-y-1 text-gray-700">
                          <div className="flex items-start"><span className="text-gray-500 mr-2">•</span><span>Utilize all or parts of our toolkit and questionnaires as resources</span></div>
                          <div className="flex items-start"><span className="text-gray-500 mr-2">•</span><span>Customize and implement for your specific organizational needs</span></div>
                          <div className="flex items-start"><span className="text-gray-500 mr-2">•</span><span>Use modules individually or as a complete assessment suite</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start Guide Section */}
          <section className="bg-white rounded-lg shadow p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Quick Start Guide</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* How to Use */}
              <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center">
                    <HelpCircle size={16} className="text-white" />
                  </div>
                  3-Step Process
                </h3>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm transform hover:scale-105 transition-all duration-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full mr-4 flex items-center justify-center shadow">
                        <span className="font-bold text-white text-lg">1</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Choose Your Module</h4>
                    </div>
                    <p className="text-gray-600">Select which compliance area you want to assess first from our comprehensive module library</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm transform hover:scale-105 transition-all duration-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full mr-4 flex items-center justify-center shadow">
                        <span className="font-bold text-white text-lg">2</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Answer Questions</h4>
                    </div>
                    <p className="text-gray-600">Complete the assessment questionnaire with guided questions tailored to your selected module</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm transform hover:scale-105 transition-all duration-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full mr-4 flex items-center justify-center shadow">
                        <span className="font-bold text-white text-lg">3</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Get Results</h4>
                    </div>
                    <p className="text-gray-600">View your compliance score, detailed insights, and download actionable recommendations</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={onLaunchDashboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow transform hover:scale-105 transition-all duration-200"
                  >
                    Start Assessment →
                  </button>
                </div>
              </div>

              {/* Usage Types */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-lg mr-3 flex items-center justify-center">
                    <Settings size={16} className="text-white" />
                  </div>
                  Flexible Usage
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 mt-1 flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">All at once:</span>
                        <p className="text-sm text-gray-600">Complete comprehensive assessment across all modules for full compliance coverage</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 mt-1 flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">Plug and play:</span>
                        <p className="text-sm text-gray-600">Use individual modules to fit your specific organizational needs and priorities</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 mt-1 flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">Lifecycle integration:</span>
                        <p className="text-sm text-gray-600">Document compliance throughout model iterations and development phases</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-bold text-blue-700 mb-4">Key Capabilities</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Download size={14} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Download questionnaires to modify for your own purposes</span>
                    </div>
                    <div className="flex items-start">
                      <FileText size={14} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Export reports in JSON format for documentation and CI/CD pipelines</span>
                    </div>
                    <div className="flex items-start">
                      <BarChart3 size={14} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Track compliance changes throughout the model lifecycle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Available Assessment Modules Section */}
          <section className="bg-white rounded-lg shadow p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Available Assessment Modules</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(AI_MODULES_INFO).map(([key, module]) => (
                <div key={key} className="bg-white rounded-lg p-6 shadow hover:shadow-md transform hover:scale-105 transition-all duration-200 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg mr-3 flex items-center justify-center shadow-sm">
                      {key === AI_MODULES.MAPPING && <BarChart3 size={20} className="text-white" />}
                      {key === AI_MODULES.REGULATION && <FileText size={20} className="text-white" />}
                      {key === AI_MODULES.RESPONSIBLE_AI && <CheckCircle size={20} className="text-white" />}
                      {key === AI_MODULES.RISK && <AlertTriangle size={20} className="text-white" />}
                      {key === AI_MODULES.OMB_M25_21 && <Shield size={20} className="text-white" />}
                      {key === AI_MODULES.EO_14179 && <BookOpen size={20} className="text-white" />}
                      {key === AI_MODULES.TITLE_13 && <FileText size={20} className="text-white" />}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{module.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{module.description}</p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">
                        Assessment Questions
                      </span>
                      <span className="text-sm font-bold px-2 py-1 rounded-full text-white bg-blue-500">
                        {QUESTIONNAIRES[key]?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 rounded-lg p-8 text-center shadow">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-lg mb-6 text-gray-700">Begin your AI governance assessment and ensure compliance across your AI lifecycle.</p>
                <button
                  onClick={onLaunchDashboard}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg shadow transform hover:scale-105 transition-all duration-200"
                >
                  Launch Assessment Dashboard
                </button>
              </div>
            </div>
          </section>

          {/* AI Development Lifecycle Section */}
          <section className="bg-white rounded-lg shadow p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">AI Development Lifecycle</h2>

            {/* Phase Selection Guide */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center">
                  <Target size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Select Your Project's Phase</h3>
              </div>
              <p className="text-gray-700">
                Select your project's phase for guidance and to evaluate compliance throughout the process. Each development phase has specific modules and requirements to ensure comprehensive AI governance.
              </p>
            </div>

            {/* Development Phases */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </div>
                Module Usage by Development Phase
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 shadow-sm transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-blue-500 pl-3 mb-3">
                    <h4 className="font-bold text-blue-700 text-sm">Planning</h4>
                    <p className="text-xs text-gray-600">Application Context</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• AI Model Mapping</div>
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• Responsible AI</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 shadow-sm transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-blue-500 pl-3 mb-3">
                    <h4 className="font-bold text-blue-700 text-sm">Data Collection</h4>
                    <p className="text-xs text-gray-600">Data & Input</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• AI Model Mapping</div>
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• Responsible AI</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 shadow-sm transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-blue-500 pl-3 mb-3">
                    <h4 className="font-bold text-blue-700 text-sm">Model Build</h4>
                    <p className="text-xs text-gray-600">AI Model Development</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• AI Model Mapping</div>
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• Responsible AI</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 shadow-sm transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-blue-500 pl-3 mb-3">
                    <h4 className="font-bold text-blue-700 text-sm">Validation</h4>
                    <p className="text-xs text-gray-600">Verify & Validate</p>
                  </div>
                  <div className="space-y-1">
                    <div className="bg-white rounded px-2 py-0.5 text-xs shadow-sm">• Responsible AI</div>
                    <div className="bg-white rounded px-2 py-0.5 text-xs shadow-sm">• General Policies</div>
                    <div className="bg-white rounded px-2 py-0.5 text-xs shadow-sm">• AI Risk Mgmt</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 shadow-sm transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-blue-500 pl-3 mb-3">
                    <h4 className="font-bold text-blue-700 text-sm">Deployment</h4>
                    <p className="text-xs text-gray-600">Task & Output</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• General Policies</div>
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• AI Risk Mgmt</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8 shadow-sm">
              <p className="text-lg text-gray-700">
                <button
                  onClick={onLaunchDashboard}
                  className="text-blue-700 hover:text-blue-900 underline font-medium"
                >
                  Evaluate your project for all compliance requirements
                </button>
              </p>
            </div>

            {/* Compliance Requirements */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg mr-3 flex items-center justify-center shadow-sm">
                    <Shield size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">OMB M-25-21 Compliance</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Ensure compliance with OMB Memorandum M-25-21 requirements for AI system documentation, impact assessment, and governance.</p>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2" /><span>AI Impact Assessment (AIIA)</span></div>
                    <div className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2" /><span>Human oversight mechanisms</span></div>
                    <div className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2" /><span>Public transparency & disclosure</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg mr-3 flex items-center justify-center shadow-sm">
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">EO 14179 Compliance</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Ensure compliance with Executive Order 14179 requirements for promoting American leadership in AI while preventing ideological bias.</p>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2" /><span>Bias-free development</span></div>
                    <div className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2" /><span>Strategic alignment & competitiveness</span></div>
                    <div className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2" /><span>Policy compliance & efficiency</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


// Main Dashboard Component
const Dashboard = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [activeModule, setActiveModule] = useState(AI_MODULES.MAPPING);
  const [moduleView, setModuleView] = useState('questionnaire'); // 'questionnaire' or 'guide'
  const [answers, setAnswers] = useState({
    [AI_MODULES.MAPPING]: {},
    [AI_MODULES.REGULATION]: {},
    [AI_MODULES.RESPONSIBLE_AI]: {},
    [AI_MODULES.RISK]: {},
    [AI_MODULES.OMB_M25_21]: {},
    [AI_MODULES.EO_14179]: {},
    [AI_MODULES.TITLE_13]: {}
  });
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [policyDropdownOpen, setPolicyDropdownOpen] = useState(true);
  const questionsPerPage = 10;

  // Load answers from localStorage if available
  useEffect(() => {
    const savedAnswers = localStorage.getItem('aiGovernanceAnswers');
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        // Ensure all modules are present in the loaded data
        const completeAnswers = {
          [AI_MODULES.MAPPING]: {},
          [AI_MODULES.REGULATION]: {},
          [AI_MODULES.RESPONSIBLE_AI]: {},
          [AI_MODULES.RISK]: {},
          [AI_MODULES.OMB_M25_21]: {},
          [AI_MODULES.EO_14179]: {},
          [AI_MODULES.TITLE_13]: {},
          ...parsedAnswers
        };
        setAnswers(completeAnswers);
      } catch (error) {
        console.warn('Failed to parse saved answers:', error);
      }
    }
  }, []);

 // Save answers to localStorage when they change
  useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      localStorage.setItem('aiGovernanceAnswers', JSON.stringify(answers));
    }
  }, [answers]);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [activeModule]: {
        ...prev[activeModule],
        [questionIndex]: answer
      }
    }));
  };

  const handleModuleChange = (module) => {
    setActiveModule(module);
    setCurrentPage(0);
    setShowResults(false);
  };

  const submitQuestionnaire = () => {
    setShowResults(true);
  };

  const resetQuestionnaire = () => {
    setAnswers(prev => ({
      ...prev,
      [activeModule]: {}
    }));
    setCurrentPage(0);
    setShowResults(false);
  };

  const downloadResults = () => {
    const moduleScore = calculateModuleScore(answers, activeModule);
    const categoryScores = getCategoryScores(answers, activeModule);
    const complianceLevel = getComplianceLevel(moduleScore.percentage);

    // Create a results object
    const results = {
      module: AI_MODULES_INFO[activeModule].title,
      date: new Date().toISOString().split('T')[0],
      overallScore: moduleScore.percentage,
      complianceLevel: complianceLevel.level,
      categoryScores: categoryScores.map(cat => ({
        category: cat.category,
        score: cat.percentage,
        questions: cat.questions,
        answered: cat.answeredQuestions
      })),
      recommendations: getRecommendations(categoryScores, activeModule)
    };

    // Add model recommendations for AI Mapping Module
    if (activeModule === AI_MODULES.MAPPING) {
      const modelRec = getModelRecommendation(answers);
      if (modelRec) {
        results.modelRecommendations = {
          recommendedModels: modelRec.recommendations || [],
          pythonLibraries: modelRec.libraries || null
        };
      }
    }

    // Convert to JSON
    const resultsJson = JSON.stringify(results, null, 2);
    const blob = new Blob([resultsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${AI_MODULES_INFO[activeModule].title.replace(/\s+/g, '_')}_Assessment_${results.date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const moduleScore = calculateModuleScore(answers, activeModule);
  const categoryScores = getCategoryScores(answers, activeModule);
  const complianceLevel = getComplianceLevel(moduleScore.percentage);
  const modelRecommendation = activeModule === AI_MODULES.MAPPING ? getModelRecommendation(answers) : null;

  const totalPages = Math.ceil(QUESTIONNAIRES[activeModule].length / questionsPerPage);
  const currentQuestions = QUESTIONNAIRES[activeModule].slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const progress = {
    answered: Object.keys(answers[activeModule] || {}).length,
    total: QUESTIONNAIRES[activeModule]?.length || 0,
    percentage: QUESTIONNAIRES[activeModule]?.length > 0
      ? Math.round((Object.keys(answers[activeModule] || {}).length / QUESTIONNAIRES[activeModule].length) * 100)
      : 0
  };

  if (showLandingPage) {
    return <LandingPage onLaunchDashboard={() => setShowLandingPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setShowLandingPage(true)}
              className="mr-4 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Back to Home"
            >
              <Home size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AI Governance Dashboard</h1>
              <p className="text-gray-600">Comprehensive AI System Assessment & Compliance Tool</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Assessment Progress</div>
            <div className="text-lg font-semibold text-blue-600">
              {Object.values(answers || {}).reduce((total, moduleAnswers) => {
                return total + Object.keys(moduleAnswers || {}).length;
              }, 0)} questions answered
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white shadow rounded-lg p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Modules</h2>
                <button
                  onClick={() => setShowLandingPage(true)}
                  className="flex items-center text-sm px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Back to Home"
                >
                  <Home size={16} className="mr-1" />
                  Home
                </button>
              </div>
              <ul className="space-y-2">
                {/* Standalone modules */}
                {[AI_MODULES.MAPPING, AI_MODULES.RESPONSIBLE_AI, AI_MODULES.RISK].map((key) => {
                  const value = AI_MODULES_INFO[key];
                  return (
                    <li
                      key={key}
                      onClick={() => handleModuleChange(key)}
                      className={`p-3 rounded-lg cursor-pointer ${activeModule === key ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        {key === AI_MODULES.MAPPING && <BarChart3 size={20} className="mr-2 text-blue-500" />}
                        {key === AI_MODULES.RESPONSIBLE_AI && <CheckCircle size={20} className="mr-2 text-purple-500" />}
                        {key === AI_MODULES.RISK && <AlertTriangle size={20} className="mr-2 text-orange-500" />}
                        <span>{value.title}</span>
                      </div>
                    </li>
                  );
                })}

                {/* Policy modules dropdown */}
                <li className="border rounded-lg overflow-hidden">
                  <div
                    className={`p-3 cursor-pointer flex items-center justify-between ${
                      [AI_MODULES.REGULATION, AI_MODULES.OMB_M25_21, AI_MODULES.EO_14179, AI_MODULES.TITLE_13].includes(activeModule)
                        ? 'bg-blue-50' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setPolicyDropdownOpen(!policyDropdownOpen)}
                  >
                    <div className="flex items-center">
                      <FileText size={20} className="mr-2 text-green-600" />
                      <span className="font-medium">AI Regulations, Policies & Practices</span>
                    </div>
                    {policyDropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>

                  {policyDropdownOpen && (
                    <div className="bg-gray-50">
                      {[AI_MODULES.REGULATION, AI_MODULES.OMB_M25_21, AI_MODULES.EO_14179, AI_MODULES.TITLE_13].map((key) => {
                        const value = AI_MODULES_INFO[key];
                        return (
                          <div
                            key={key}
                            onClick={() => handleModuleChange(key)}
                            className={`p-3 pl-8 cursor-pointer border-t ${activeModule === key ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                          >
                            <div className="flex items-center">
                              {key === AI_MODULES.REGULATION && <FileText size={18} className="mr-2 text-green-500" />}
                              {key === AI_MODULES.OMB_M25_21 && <Shield size={18} className="mr-2 text-pink-500" />}
                              {key === AI_MODULES.EO_14179 && <BookOpen size={18} className="mr-2 text-amber-700" />}
                              {key === AI_MODULES.TITLE_13 && <FileText size={18} className="mr-2 text-blue-600" />}
                              <span className="text-sm">{value.title}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </li>
              </ul>

              <hr className="my-4" />

              <div className="mt-4">
                <h3 className="font-medium mb-2">Module Progress</h3>

                {/* Standalone modules progress */}
                {[AI_MODULES.MAPPING, AI_MODULES.RESPONSIBLE_AI, AI_MODULES.RISK].map((key) => {
                  const value = AI_MODULES_INFO[key];
                  const moduleAnswers = answers[key] || {};
                  const questionsAnswered = Object.keys(moduleAnswers).length;
                  const totalQuestions = QUESTIONNAIRES[key]?.length || 0;
                  const progressPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0;

                  return (
                    <div key={key} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-xs">{value.title}</span>
                        <span className="text-xs">{questionsAnswered}/{totalQuestions}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${progressPercentage}%`,
                            backgroundColor: value.color
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}

                {/* Policy modules progress */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">AI Regulations, Policies & Practices</h4>
                  {[AI_MODULES.REGULATION, AI_MODULES.OMB_M25_21, AI_MODULES.EO_14179, AI_MODULES.TITLE_13].map((key) => {
                    const value = AI_MODULES_INFO[key];
                    const moduleAnswers = answers[key] || {};
                    const questionsAnswered = Object.keys(moduleAnswers).length;
                    const totalQuestions = QUESTIONNAIRES[key]?.length || 0;
                    const progressPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0;

                    return (
                      <div key={key} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-xs">{value.title}</span>
                          <span className="text-xs">{questionsAnswered}/{totalQuestions}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${progressPercentage}%`,
                              backgroundColor: value.color
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start">
                  <Info size={20} className="mr-2 text-blue-500 mt-1" />
                  <p className="text-sm text-gray-700">
                    Complete all modules for a comprehensive AI governance assessment, or focus on specific areas of interest.
                  </p>
                </div>
              </div>

              {progress.answered > 0 && (
                <div className="mt-4">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center"
                    onClick={() => setShowResults(true)}
                  >
                    <BarChart3 size={16} className="mr-2" />
                    View Results
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white shadow rounded-lg mb-4">
              <div className="border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-medium">{AI_MODULES_INFO[activeModule].title}</h2>
                <div>
                  <button
                    className={`mr-2 ${moduleView === 'questionnaire' ? 'bg-blue-600 text-white' : 'bg-gray-200'} px-3 py-1 rounded`}
                    onClick={() => setModuleView('questionnaire')}
                  >
                    Questionnaire
                  </button>
                  <button
                    className={`${moduleView === 'guide' ? 'bg-blue-600 text-white' : 'bg-gray-200'} px-3 py-1 rounded`}
                    onClick={() => setModuleView('guide')}
                  >
                    Information Guide
                  </button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 mb-4 flex items-start">
                <HelpCircle size={20} className="mr-2 text-blue-500" />
                <p className="text-sm">
                  {AI_MODULES_INFO[activeModule].description}
                </p>
              </div>

              {moduleView === 'questionnaire' ? (
                <div className="p-4">
                  <h3 className="text-lg mb-4">{AI_MODULES_INFO[activeModule].questTitle}</h3>

                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                      <Info size={20} className="mr-3 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-blue-700 font-medium mb-1">📖 Need help with terminology or concepts?</p>
                        <p className="text-sm text-blue-600">
                          Review the <button
                            className="underline font-medium hover:text-blue-800"
                            onClick={() => setModuleView('guide')}
                          >Information Guide</button> tab above for detailed explanations of terms, requirements, and best practices before completing the questionnaire.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Learning Mode Toggle */}
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lightbulb size={20} className="mr-2 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Interactive Learning Mode</span>
                      </div>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Always On</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Look for <HelpCircle size={12} className="inline mx-1" /> icons to explore policy context, hover over <ExplanationTooltip term="Example Term" definition="This is how tooltips work">underlined terms</ExplanationTooltip> for definitions, and discover learning aids throughout your assessment.
                    </p>
                  </div>
                  {(activeModule === AI_MODULES.RISK || activeModule === AI_MODULES.EO_14179 || activeModule === AI_MODULES.OMB_M25_21) && (
                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-start">
                        <BookOpen size={20} className="mr-3 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-700 font-medium mb-2">📄 Reference Documents:</p>
                          {activeModule === AI_MODULES.RISK && (
                            <a
                              href="https://www.nist.gov/itl/ai-risk-management-framework"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center"
                            >
                              NIST AI Risk Management Framework (AI RMF 1.0)
                              <ArrowUpRight size={14} className="ml-1" />
                            </a>
                          )}
                          {activeModule === AI_MODULES.EO_14179 && (
                            <a
                              href="https://www.federalregister.gov/documents/2025/01/31/2025-02172/removing-barriers-to-american-leadership-in-artificial-intelligence"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center"
                            >
                              Executive Order 14179: Removing Barriers to American Leadership in Artificial Intelligence
                              <ArrowUpRight size={14} className="ml-1" />
                            </a>
                          )}
                          {activeModule === AI_MODULES.OMB_M25_21 && (
                            <a
                              href="https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center"
                            >
                              OMB Memorandum M-25-21: Accelerating Federal Use of AI through Innovation, Governance, and Public Trust
                              <ArrowUpRight size={14} className="ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {!showResults ? (
                    <>
                      <div className="sticky top-0 z-10 mb-4 bg-gray-100 p-3 rounded-lg shadow-md border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Questionnaire Progress</span>
                              <span className="text-sm">{progress.answered} of {progress.total} questions answered ({progress.percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full bg-blue-600"
                                style={{ width: `${progress.percentage}%` }}
                              ></div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              Page {currentPage + 1} of {totalPages}
                            </div>
                          </div>
                          <div className="ml-4">
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded shadow-sm"
                              onClick={resetQuestionnaire}
                              title="Reset all answers"
                            >
                              Reset
                            </button>
                          </div>
                        </div>

                        {/* Scoring Tip */}
                        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                          <div className="flex items-start">
                            <Info size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                            <div className="text-xs text-blue-700">
                              <span className="font-medium">Scoring Tip:</span> First options typically indicate best practices and full compliance (highest scores), while later options show areas needing improvement (lower scores). "Not Applicable" responses don't affect your score.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Score Impact Legend - shown once at top for non-mapping modules */}
                      {activeModule !== AI_MODULES.MAPPING && (
                        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="font-medium text-gray-700">Score Impact Legend:</span>
                            <span className="flex items-center"><span className="mr-1">🟢</span>Best (High Score)</span>
                            <span className="flex items-center"><span className="mr-1">🔵🟡</span>Good/Moderate</span>
                            <span className="flex items-center"><span className="mr-1">🔴</span>Needs Improvement</span>
                            <span className="flex items-center"><span className="mr-1">⚪</span>Not Scored</span>
                          </div>
                        </div>
                      )}

                      {currentQuestions.map((q, index) => {
                        const absoluteIndex = currentPage * questionsPerPage + index;
                        return (
                          <EnhancedQuestion
                            key={absoluteIndex}
                            question={q}
                            questionIndex={absoluteIndex}
                            answers={answers}
                            activeModule={activeModule}
                            handleAnswer={handleAnswer}
                          />
                        );
                      })}

                      <div className="mt-6 flex justify-between">
                        <button
                          className={`flex items-center ${currentPage === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800 px-4 py-2 rounded`}
                          onClick={prevPage}
                          disabled={currentPage === 0}
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          Previous Page
                        </button>

                        <div className="flex space-x-2">
                          <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            onClick={resetQuestionnaire}
                          >
                            Reset
                          </button>
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            onClick={submitQuestionnaire}
                          >
                            View Results
                          </button>
                        </div>

                        <button
                          className={`flex items-center ${currentPage >= totalPages - 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800 px-4 py-2 rounded`}
                          onClick={nextPage}
                          disabled={currentPage >= totalPages - 1}
                        >
                          Next Page
                          <ArrowRight size={16} className="ml-2" />
                        </button>
                      </div>
                    </>
                  ) : (
                    // Results view
                    <div>
                      <div className="mb-6 border rounded-lg overflow-hidden">
                        <div className="bg-blue-50 p-4 border-b">
                          <h3 className="text-xl font-bold">Assessment Results</h3>
                        </div>
                        <div className="p-4">
                          <div className="mb-4">
                            <h4 className="text-lg font-medium mb-2">Overall Compliance Score</h4>
                            <div className="flex items-center mb-2">
                              <div className="flex-grow">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div
                                    className="h-2.5 rounded-full"
                                    style={{
                                      width: `${moduleScore.percentage}%`,
                                      backgroundColor: complianceLevel.color
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <span className="ml-4 font-bold">
                                {moduleScore.percentage}%
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2" style={{ color: complianceLevel.color }}>
                                {complianceLevel.icon}
                              </span>
                              <span style={{ color: complianceLevel.color }}>
                                {complianceLevel.level}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              Questions Answered: {progress.answered} of {progress.total} ({progress.percentage}%)
                            </div>
                          </div>

                          {/* Scoring Methodology Explanation */}
                          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="text-lg font-medium mb-3 text-blue-800 flex items-center">
                              <Info size={20} className="mr-2" />
                              How Your Score is Calculated
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="bg-white rounded p-3">
                                <p className="font-medium text-gray-800 mb-2">📊 Scoring Method:</p>
                                <p className="text-gray-700">Each question is scored based on response quality, with the first option being the highest score and subsequent options receiving progressively lower scores. "Not Applicable" responses are excluded from scoring to ensure fair assessment.</p>
                              </div>
                              <div className="bg-white rounded p-3">
                                <p className="font-medium text-gray-800 mb-2">✅ What Makes a "Good" Answer:</p>
                                <ul className="text-gray-700 space-y-1 ml-4">
                                  <li>• <strong>First options</strong> typically indicate full compliance, comprehensive implementation, or best practices</li>
                                  <li>• <strong>Examples:</strong> "Yes, comprehensive assessment" or "Formal process exists" or "Fully compliant"</li>
                                  <li>• These answers show proactive governance and mature AI practices</li>
                                </ul>
                              </div>
                              <div className="bg-white rounded p-3">
                                <p className="font-medium text-gray-800 mb-2">⚠️ What Makes a "Lower" Answer:</p>
                                <ul className="text-gray-700 space-y-1 ml-4">
                                  <li>• <strong>Later options</strong> indicate partial implementation, planned activities, or gaps</li>
                                  <li>• <strong>Examples:</strong> "No assessment," "Planning stage," or "Limited implementation"</li>
                                  <li>• These highlight areas needing improvement for compliance</li>
                                </ul>
                              </div>
                              <div className="bg-white rounded p-3">
                                <p className="font-medium text-gray-800 mb-2">🎯 Compliance Levels:</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                  <div className="bg-green-50 p-2 rounded border border-green-200">
                                    <span className="font-medium text-green-700">90-100%: High Compliance</span>
                                    <p className="text-green-600 mt-1">Strong governance practices in place</p>
                                  </div>
                                  <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                                    <span className="font-medium text-yellow-700">70-89%: Moderate Compliance</span>
                                    <p className="text-yellow-600 mt-1">Good foundation, some improvements needed</p>
                                  </div>
                                  <div className="bg-red-50 p-2 rounded border border-red-200">
                                    <span className="font-medium text-red-700">Below 70%: Low Compliance</span>
                                    <p className="text-red-600 mt-1">Significant gaps requiring attention</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {activeModule !== AI_MODULES.MAPPING && (
                            <div className="mt-8">
                              <h4 className="text-lg font-medium mb-4">Category Breakdown</h4>
                              <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  {activeModule === AI_MODULES.RESPONSIBLE_AI ? (
                                    <RadarChart outerRadius={90} data={categoryScores}>
                                      <PolarGrid />
                                      <PolarAngleAxis dataKey="category" />
                                      <PolarRadiusAxis domain={[0, 100]} />
                                      <Radar name="Score" dataKey="percentage" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                      <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                                    </RadarChart>
                                  ) : (
                                    <BarChart data={categoryScores}>
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="category" />
                                      <YAxis domain={[0, 100]} />
                                      <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                                      <Legend />
                                      <Bar dataKey="percentage" name="Compliance Score" fill="#8884d8" />
                                    </BarChart>
                                  )}
                                </ResponsiveContainer>
                              </div>
                            </div>
                          )}

                          {activeModule === AI_MODULES.MAPPING && modelRecommendation && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                              <h4 className="text-lg font-bold mb-2">Recommended AI Mapping Model Options</h4>
                              <ul className="space-y-4">
                                {modelRecommendation.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start ml-2">
                                    <CheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={18} />
                                    <p className="font-medium">{rec}</p>
                                  </li>
                                ))}
                              </ul>
                              {modelRecommendation.libraries && (
                                <div className="mt-4 pt-4 border-t border-blue-200">
                                  <p className="text-sm font-medium text-gray-700 mb-1">Recommended Libraries/Implementations:</p>
                                  <p className="text-sm font-mono bg-blue-100 p-2 rounded">{modelRecommendation.libraries}</p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="mt-8">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-medium">Areas for Improvement</h4>
                              <ExplanationTooltip term="Areas for Improvement" definition="Categories scoring below 70% that need attention to enhance your AI governance maturity">
                                <HelpCircle size={16} className="text-gray-400 hover:text-blue-500 cursor-help" />
                              </ExplanationTooltip>
                            </div>
                            <ul className="space-y-2">
                              {categoryScores
                                .filter(cat => cat.percentage < 70)
                                .map((cat, index) => (
                                  <li key={index} className="rounded bg-gray-50 p-4 border-l-4 border-orange-400">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-900">{cat.category}</p>
                                        <p className="text-sm text-gray-600">
                                          Current score: {cat.percentage}% - {cat.answeredQuestions}/{cat.questions} questions answered
                                        </p>
                                      </div>
                                      <div className="ml-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          cat.percentage >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                          {cat.percentage >= 50 ? 'Moderate Priority' : 'High Priority'}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Quick learning tip for each category */}
                                    <div className="mt-2 text-xs text-blue-600">
                                      💡 Tip: {getCategoryLearningTip(cat.category, activeModule)}
                                    </div>
                                  </li>
                                ))}
                              {categoryScores.filter(cat => cat.percentage < 70).length === 0 && (
                                <p className="text-green-600 italic flex items-center">
                                  <CheckCircle size={16} className="mr-2" />
                                  All categories show good compliance levels!
                                </p>
                              )}
                            </ul>
                          </div>

                          {/* Enhanced Recommendations with Learning Context */}
                          <div className="mt-8">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-medium">Recommendations</h4>
                              <ExplanationTooltip term="Recommendations" definition="Specific, actionable guidance based on your assessment results to improve compliance and governance practices">
                                <HelpCircle size={16} className="text-gray-400 hover:text-blue-500 cursor-help" />
                              </ExplanationTooltip>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                              <div className="whitespace-pre-line">{getRecommendations(categoryScores, activeModule)}</div>

                              {/* Context-aware learning links */}
                              {(activeModule === AI_MODULES.RISK || activeModule === AI_MODULES.EO_14179 || activeModule === AI_MODULES.OMB_M25_21) && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <p className="text-sm font-medium text-gray-700 mb-2">📚 Learn More:</p>
                                  <div className="space-y-1">
                                    {activeModule === AI_MODULES.RISK && (
                                      <a
                                        href="https://www.nist.gov/itl/ai-risk-management-framework"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center"
                                      >
                                        NIST AI RMF Implementation Guidance
                                        <ArrowUpRight size={10} className="ml-1" />
                                      </a>
                                    )}
                                    {activeModule === AI_MODULES.EO_14179 && (
                                      <a
                                        href="https://www.federalregister.gov/documents/2025/01/31/2025-02172/removing-barriers-to-american-leadership-in-artificial-intelligence"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center"
                                      >
                                        Executive Order 14179 Full Text
                                        <ArrowUpRight size={10} className="ml-1" />
                                      </a>
                                    )}
                                    {activeModule === AI_MODULES.OMB_M25_21 && (
                                      <a
                                        href="https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center"
                                      >
                                        OMB M-25-21 Implementation Guide
                                        <ArrowUpRight size={10} className="ml-1" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          className="flex items-center mt-4 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                          onClick={() => setShowResults(false)}
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          Return to Questionnaire
                        </button>

                        <button
                          className="flex items-center mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                          onClick={downloadResults}
                        >
                          <Download size={16} className="mr-2" />
                          Export Results
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Guide view
                <div className="p-4">
                  <h3 className="text-lg mb-4">{AI_MODULES_INFO[activeModule].guideTitle}</h3>

                  {/* Reference Documents - Show for specific modules */}
                  {(activeModule === AI_MODULES.RISK || activeModule === AI_MODULES.EO_14179 || activeModule === AI_MODULES.OMB_M25_21) && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start">
                        <BookOpen size={20} className="mr-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-blue-700 font-medium mb-2">📄 Official Reference Document:</p>
                          {activeModule === AI_MODULES.RISK && (
                            <div>
                              <a
                                href="https://www.nist.gov/itl/ai-risk-management-framework"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center mb-2"
                              >
                                NIST AI Risk Management Framework (AI RMF 1.0)
                                <ArrowUpRight size={14} className="ml-1" />
                              </a>
                              <p className="text-xs text-gray-600">The official NIST framework this assessment is based on. Provides comprehensive guidance on managing AI risks throughout the lifecycle.</p>
                            </div>
                          )}
                          {activeModule === AI_MODULES.EO_14179 && (
                            <div>
                              <a
                                href="https://www.federalregister.gov/documents/2025/01/31/2025-02172/removing-barriers-to-american-leadership-in-artificial-intelligence"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center mb-2"
                              >
                                Executive Order 14179: Removing Barriers to American Leadership in Artificial Intelligence
                                <ArrowUpRight size={14} className="ml-1" />
                              </a>
                              <p className="text-xs text-gray-600">The official Executive Order this assessment is designed to ensure compliance with. Read the full text for complete requirements and context.</p>
                            </div>
                          )}
                          {activeModule === AI_MODULES.OMB_M25_21 && (
                            <div>
                              <a
                                href="https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center mb-2"
                              >
                                OMB Memorandum M-25-21: Accelerating Federal Use of AI through Innovation, Governance, and Public Trust
                                <ArrowUpRight size={14} className="ml-1" />
                              </a>
                              <p className="text-xs text-gray-600">The official OMB memorandum this assessment is based on. Contains detailed requirements for AI governance, documentation, and compliance.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {GUIDE_CONTENT[activeModule].map((section, index) => (
                    <div key={index} className="mb-4 border rounded-lg overflow-hidden">
                      <div
                        className="bg-gray-100 p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => {
                          const element = document.getElementById(`section-${index}`);
                          if (element) {
                            element.style.display = element.style.display === 'none' ? 'block' : 'none';
                          }
                        }}
                      >
                        <h4 className="font-medium">{section.title}</h4>
                        <ChevronDown />
                      </div>
                      <div id={`section-${index}`} className="p-4">
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex py-2">
                              <span className="mr-2 text-blue-500">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>AI Governance Dashboard © 2025 - Last updated: May 7, 2025</p>
      </footer>
    </div>
  );
};

export default Dashboard;
