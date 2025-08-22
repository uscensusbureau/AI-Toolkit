import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Info, CheckCircle, AlertTriangle, XCircle, HelpCircle, ChevronDown, ChevronRight, BarChart3, FileText, Shield, BookOpen, Home, Target, Lightbulb, Users, Settings, Download, ArrowLeft, ArrowRight } from 'lucide-react';

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

// NEW FUNCTION: Get model recommendations based on selected options
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
    const optionIndex = question.options.indexOf(answer);
    const weight = question.weight || 1;

    // Score based on option position (first option is best)
    const optionScore = question.options.length - optionIndex;

    if (categories[category]) {
      categories[category].score += optionScore * weight;
      categories[category].maxScore += question.options.length * weight;
      categories[category].answeredQuestions += 1;
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
    [AI_MODULES.RISK]: `For better risk management, strengthen your approach to ${categoriesList}. Establish clearer ownership of risks in these categories and implement regular review cycles to address emerging concerns.`
  };

  return moduleRecommendations[module] || "Focus on the lowest-scoring categories to improve your overall assessment.";
};

// Landing Page Component
const LandingPage = ({ onLaunchDashboard }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center shadow-md">
                <Home className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Governance Toolkit</h1>
            </div>
            <button
              onClick={onLaunchDashboard}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
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
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="pr-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 shadow-md">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">AI Governance Toolkit</h1>
                  <p className="text-gray-600 mb-6 text-lg">Comprehensive AI System Assessment & Compliance Platform</p>
                  <button
                    onClick={onLaunchDashboard}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Launch Dashboard →
                  </button>
                </div>

                {/* Goals */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg mr-3 flex items-center justify-center">
                      <Target size={16} />
                    </div>
                    Toolkit Goals
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start p-3 bg-white bg-opacity-10 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
                        <Target size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold block mb-1">Assess & Gauge Compliance</span>
                        <p className="text-sm text-gray-200">Comprehensive modules for compliance assessment across AI governance areas</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-white bg-opacity-10 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
                        <Lightbulb size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold block mb-1">Receive Recommendations</span>
                        <p className="text-sm text-gray-200">Detailed assessments and actionable recommendations for your AI systems</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-white bg-opacity-10 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
                        <Download size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold block mb-1">Download Artifacts</span>
                        <p className="text-sm text-gray-200">Generate compliance artifacts for documentation and reporting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pl-2">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 h-full shadow-md">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Who is this toolkit for?</h2>

                  <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center">
                        <Users size={16} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">AI Lifecycle Actors</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Designed for actors across the design, development, deployment, and evaluation phases of the AI lifecycle.</p>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm">
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

                      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 shadow-sm">
                        <h4 className="font-bold text-green-700 mb-2 flex items-center">
                          <div className="w-6 h-6 bg-green-500 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">2</div>
                          Agencies Building a Toolkit
                        </h4>
                        <div className="text-sm space-y-1 text-gray-700">
                          <div className="flex items-start"><span className="text-green-500 mr-2">•</span><span>Utilize all or parts of our toolkit and questionnaires as resources</span></div>
                          <div className="flex items-start"><span className="text-green-500 mr-2">•</span><span>Customize and implement for your specific organizational needs</span></div>
                          <div className="flex items-start"><span className="text-green-500 mr-2">•</span><span>Use modules individually or as a complete assessment suite</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start Guide Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Quick Start Guide</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* How to Use */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center">
                    <HelpCircle size={16} className="text-white" />
                  </div>
                  3-Step Process
                </h3>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-4 flex items-center justify-center shadow-lg">
                        <span className="font-bold text-white text-lg">1</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Choose Your Module</h4>
                    </div>
                    <p className="text-gray-600">Select which compliance area you want to assess first from our comprehensive module library</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full mr-4 flex items-center justify-center shadow-lg">
                        <span className="font-bold text-white text-lg">2</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Answer Questions</h4>
                    </div>
                    <p className="text-gray-600">Complete the assessment questionnaire with guided questions tailored to your selected module</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mr-4 flex items-center justify-center shadow-lg">
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
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Start Assessment →
                  </button>
                </div>
              </div>

              {/* Usage Types */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg mr-3 flex items-center justify-center">
                    <Settings size={16} className="text-white" />
                  </div>
                  Flexible Usage
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full mr-3 mt-1 flex items-center justify-center">
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
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-3 mt-1 flex items-center justify-center">
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
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mr-3 mt-1 flex items-center justify-center">
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

          {/* AI Development Lifecycle Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Development Lifecycle</h2>

            {/* Phase Selection Guide */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-8 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg mr-3 flex items-center justify-center">
                  <Target size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Select Your Project's Phase</h3>
              </div>
              <p className="text-gray-700">
                Select your project's phase for guidance and to evaluate compliance throughout the process. Each development phase has specific modules and requirements to ensure comprehensive AI governance.
              </p>
            </div>

            {/* Development Phases */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 mb-8 shadow-md">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </div>
                Module Usage by Development Phase
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 shadow-md transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-orange-500 pl-3 mb-3">
                    <h4 className="font-bold text-orange-700 text-sm">Planning</h4>
                    <p className="text-xs text-gray-600">Application Context</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• AI Model Mapping</div>
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• Responsible AI</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 shadow-md transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-blue-500 pl-3 mb-3">
                    <h4 className="font-bold text-blue-700 text-sm">Data Collection</h4>
                    <p className="text-xs text-gray-600">Data & Input</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• AI Model Mapping</div>
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• Responsible AI</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 shadow-md transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-green-500 pl-3 mb-3">
                    <h4 className="font-bold text-green-700 text-sm">Model Build</h4>
                    <p className="text-xs text-gray-600">AI Model Development</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• AI Model Mapping</div>
                    <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">• Responsible AI</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg p-4 shadow-md transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-emerald-600 pl-3 mb-3">
                    <h4 className="font-bold text-emerald-700 text-sm">Validation</h4>
                    <p className="text-xs text-gray-600">Verify & Validate</p>
                  </div>
                  <div className="space-y-1">
                    <div className="bg-white rounded px-2 py-0.5 text-xs shadow-sm">• Responsible AI</div>
                    <div className="bg-white rounded px-2 py-0.5 text-xs shadow-sm">• General Policies</div>
                    <div className="bg-white rounded px-2 py-0.5 text-xs shadow-sm">• AI Risk Mgmt</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4 shadow-md transform hover:scale-105 transition-all duration-200">
                  <div className="border-l-4 border-purple-500 pl-3 mb-3">
                    <h4 className="font-bold text-purple-700 text-sm">Deployment</h4>
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
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8 shadow-md">
              <p className="text-lg text-gray-700 mb-4">
                You can also evaluate your project for all compliance requirements{' '}
                <button
                  onClick={onLaunchDashboard}
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  here
                </button>
                .
              </p>
            </div>

            {/* Compliance Requirements */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center shadow-md">
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
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg mr-3 flex items-center justify-center shadow-md">
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

          {/* Available Assessment Modules Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Available Assessment Modules</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(AI_MODULES_INFO).map(([key, module]) => (
                <div key={key} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl mr-3 flex items-center justify-center shadow-md ${
                      key === AI_MODULES.MAPPING ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                      key === AI_MODULES.REGULATION ? 'bg-gradient-to-br from-green-400 to-green-600' :
                      key === AI_MODULES.RESPONSIBLE_AI ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                      key === AI_MODULES.RISK ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                      key === AI_MODULES.OMB_M25_21 ? 'bg-gradient-to-br from-pink-400 to-pink-600' :
                      'bg-gradient-to-br from-amber-400 to-amber-600'
                    }`}>
                      {key === AI_MODULES.MAPPING && <BarChart3 size={20} className="text-white" />}
                      {key === AI_MODULES.REGULATION && <FileText size={20} className="text-white" />}
                      {key === AI_MODULES.RESPONSIBLE_AI && <CheckCircle size={20} className="text-white" />}
                      {key === AI_MODULES.RISK && <AlertTriangle size={20} className="text-white" />}
                      {key === AI_MODULES.OMB_M25_21 && <Shield size={20} className="text-white" />}
                      {key === AI_MODULES.EO_14179 && <BookOpen size={20} className="text-white" />}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{module.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{module.description}</p>
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">
                        Assessment Questions
                      </span>
                      <span className={`text-sm font-bold px-2 py-1 rounded-full text-white ${
                        key === AI_MODULES.MAPPING ? 'bg-blue-500' :
                        key === AI_MODULES.REGULATION ? 'bg-green-500' :
                        key === AI_MODULES.RESPONSIBLE_AI ? 'bg-purple-500' :
                        key === AI_MODULES.RISK ? 'bg-orange-500' :
                        key === AI_MODULES.OMB_M25_21 ? 'bg-pink-500' :
                        'bg-amber-500'
                      }`}>
                        {QUESTIONNAIRES[key]?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-8 text-center shadow-xl">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-3 text-white">Ready to Get Started?</h3>
                <p className="text-lg mb-6 text-blue-100">Begin your AI governance assessment and ensure compliance across your AI lifecycle.</p>
                <button
                  onClick={onLaunchDashboard}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Launch Assessment Dashboard
                </button>
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
    [AI_MODULES.EO_14179]: {}
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
                      [AI_MODULES.REGULATION, AI_MODULES.OMB_M25_21, AI_MODULES.EO_14179].includes(activeModule)
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
                      {[AI_MODULES.REGULATION, AI_MODULES.OMB_M25_21, AI_MODULES.EO_14179].map((key) => {
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
                  {[AI_MODULES.REGULATION, AI_MODULES.OMB_M25_21, AI_MODULES.EO_14179].map((key) => {
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
                <HelpCircle size={20} className="mr-2 text-blue-500 mt-1" />
                <p className="text-sm">
                  {AI_MODULES_INFO[activeModule].description}
                </p>
              </div>

              {moduleView === 'questionnaire' ? (
                <div className="p-4">
                  <h3 className="text-lg mb-4">{AI_MODULES_INFO[activeModule].questTitle}</h3>

                  {!showResults ? (
                    <>
                      <div className="mb-4 bg-gray-100 p-3 rounded-lg">
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

                      {currentQuestions.map((q, index) => {
                        const absoluteIndex = currentPage * questionsPerPage + index;
                        return (
                          <div key={absoluteIndex} className="mb-4 border rounded-lg overflow-hidden">
                            <div className="bg-gray-100 p-4">
                              <h4 className="font-medium text-gray-800">
                                {absoluteIndex + 1}. {q.question}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Category: {q.category}
                              </p>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.options.map((option, optIndex) => (
                                  <button
                                    key={optIndex}
                                    className={`p-2 border rounded w-full ${answers[activeModule][absoluteIndex] === option ? 'bg-blue-600 text-white' : 'border-gray-300'}`}
                                    onClick={() => handleAnswer(absoluteIndex, option)}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
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
                            <h4 className="text-lg font-medium mb-2">Areas for Improvement</h4>
                            <ul className="space-y-2">
                              {categoryScores
                                .filter(cat => cat.percentage < 70)
                                .map((cat, index) => (
                                  <li key={index} className="rounded bg-gray-50 p-4">
                                    <p className="font-medium">{cat.category}</p>
                                    <p className="text-sm text-gray-600">
                                      Current score: {cat.percentage}% - {cat.answeredQuestions}/{cat.questions} questions answered
                                    </p>
                                  </li>
                                ))}
                              {categoryScores.filter(cat => cat.percentage < 70).length === 0 && (
                                <p className="text-green-600 italic">
                                  All categories show good compliance levels!
                                </p>
                              )}
                            </ul>
                          </div>

                          <div className="mt-8">
                            <h4 className="text-lg font-medium mb-2">Recommendations</h4>
                            <div className="bg-gray-50 p-4 rounded">
                              <p>{getRecommendations(categoryScores, activeModule)}</p>
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
