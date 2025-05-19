import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Info, CheckCircle, AlertTriangle, XCircle, HelpCircle, ChevronDown, BarChart3, FileText, Home, Settings, Download, ArrowLeft, ArrowRight } from 'lucide-react';

import AI_MODULES from './data/modules'
import AI_MODULES_INFO from './data/modules-info'
import GUIDE_CONTENT from './data/guide-content'
import MODEL_RECOMMENDATIONS from './data/model-recommendations'
import QUESTIONNAIRES from './data/questionnaires'

import ModuleProgressComponent from './components/component-module-progress'

import './index.css'

// Calculate score and recommendation functions
const calculateModuleScore = (answers, module) => {
  if (!answers || !answers[module] || Object.keys(answers[module]).length === 0) {
    return { score: 0, maxScore: 0, percentage: 0 };
  }
  
  const questions = QUESTIONNAIRES[module];
  let score = 0;
  let maxScore = 0;
  
  Object.entries(answers[module]).forEach(([qIndex, answer]) => {
    const question = questions[parseInt(qIndex)];
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
  const fallbackKey = `${dataType}-${taskType}-${learningType}`;
  
  // Look for the most specific match first, then fall back to more general matches
  if (MODEL_RECOMMENDATIONS[specificKey]) {
    return MODEL_RECOMMENDATIONS[specificKey];
  } else if (MODEL_RECOMMENDATIONS[fallbackKey]) {
    return MODEL_RECOMMENDATIONS[fallbackKey];
  } else {
    // If no specific recommendation, provide a general one
    return MODEL_RECOMMENDATIONS.default;
  }
};

// Create category scores for visualization
const getCategoryScores = (answers, module) => {
  if (!answers || !answers[module] || Object.keys(answers[module]).length === 0) {
    return [];
  }
  
  const questions = QUESTIONNAIRES[module];
  const categories = {};
  
  // Initialize categories
  questions.forEach(q => {
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
    const category = question.category;
    const optionIndex = question.options.indexOf(answer);
    const weight = question.weight || 1;
    
    // Score based on option position (first option is best)
    const optionScore = question.options.length - optionIndex;
    
    categories[category].score += optionScore * weight;
    categories[category].maxScore += question.options.length * weight;
    categories[category].answeredQuestions += 1;
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

function App() {
  const [activeModule, setActiveModule] = useState(AI_MODULES.MAPPING);
  const [moduleView, setModuleView] = useState('questionnaire'); // 'questionnaire' or 'guide'
  const [answers, setAnswers] = useState({
    [AI_MODULES.MAPPING]: {},
    [AI_MODULES.REGULATION]: {},
    [AI_MODULES.RESPONSIBLE_AI]: {},
    [AI_MODULES.RISK]: {}
  });
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;
  
  // Load answers from localStorage if available
  useEffect(() => {
    const savedAnswers = localStorage.getItem('aiGovernanceAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);
  
 // Save answers to localStorage when they change
  useEffect(() => {
    localStorage.setItem('aiGovernanceAnswers', JSON.stringify(answers));
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
    answered: Object.keys(answers[activeModule]).length,
    total: QUESTIONNAIRES[activeModule].length,
    percentage: Math.round((Object.keys(answers[activeModule]).length / QUESTIONNAIRES[activeModule].length) * 100)
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow p-4 mb-6">
          <h1 className="text-center text-2xl font-bold text-gray-800">AI Governance Dashboard</h1>
          <p className="text-center text-gray-600 mt-2">Comprehensive AI System Assessment & Compliance Tool</p>
        </div>
        
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white shadow rounded-lg p-4 h-full">
                <h2 className="text-xl font-medium mb-4">Modules</h2>
                <ul className="space-y-2">
                  {Object.entries(AI_MODULES_INFO).map(([key, value]) => (
                    <li 
                      key={key}
                      onClick={() => handleModuleChange(key)}
                      className={`p-3 rounded-lg cursor-pointer ${activeModule === key ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        {key === AI_MODULES.MAPPING && <BarChart3 size={20} className="mr-2 text-blue-500" />}
                        {key === AI_MODULES.REGULATION && <FileText size={20} className="mr-2 text-green-500" />}
                        {key === AI_MODULES.RESPONSIBLE_AI && <CheckCircle size={20} className="mr-2 text-purple-500" />}
                        {key === AI_MODULES.RISK && <AlertTriangle size={20} className="mr-2 text-orange-500" />}
                        <span>{value.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <hr className="my-4" />
                
                <div className="mt-4">
                  <ModuleProgressComponent AI_MODULES_INFO={AI_MODULES_INFO} answers={answers} QUESTIONNAIRES={QUESTIONNAIRES} />
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
                    
                    {activeModule === AI_MODULES.RESPONSIBLE_AI && (
                      <div className="mt-6">
                        <h4 className="text-lg font-medium mb-4">Responsible AI Principles Framework</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart 
                              outerRadius={90} 
                              data={[
                                { area: "Bias & Fairness", fullMark: 100, value: 100 },
                                { area: "Privacy & Security", fullMark: 100, value: 100 },
                                { area: "Transparency", fullMark: 100, value: 100 },
                                { area: "Accountability", fullMark: 100, value: 100 },
                                { area: "Robustness", fullMark: 100, value: 100 }
                              ]}
                            >
                              <PolarGrid />
                              <PolarAngleAxis dataKey="area" />
                              <PolarRadiusAxis domain={[0, 100]} />
                              <Radar name="Framework" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                    
                    {activeModule === AI_MODULES.RISK && (
                      <div className="mt-6">
                        <h4 className="text-lg font-medium mb-4">NIST AI RMF Core Functions</h4>
                        <div className="flex flex-wrap justify-center">
                          {["Map", "Measure", "Manage", "Govern"].map((func, idx) => (
                            <div key={idx} className="m-2 p-4 w-40 h-40 rounded-full flex flex-col items-center justify-center text-center bg-blue-100 border-2 border-blue-500">
                              <span className="font-bold text-blue-800">{func}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeModule === AI_MODULES.MAPPING && (
                      <div className="mt-6">
                        <h4 className="text-lg font-medium mb-4">Model Selection Framework</h4>
                        <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                          <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-blue-100 border-r border-b p-4">
                            <p className="font-bold">Data Modality</p>
                            <p className="text-sm">Structured vs. Unstructured</p>
                          </div>
                          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-green-100 border-l border-b p-4">
                            <p className="font-bold">Task Type</p>
                            <p className="text-sm">Classification, Regression, etc.</p>
                          </div>
                          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-yellow-100 border-r border-t p-4">
                            <p className="font-bold">Learning Paradigm</p>
                            <p className="text-sm">Supervised, Unsupervised, etc.</p>
                          </div>
                          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-purple-100 border-l border-t p-4">
                            <p className="font-bold">Constraints</p>
                            <p className="text-sm">Resources, Interpretability, etc.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeModule === AI_MODULES.REGULATION && (
                      <div className="mt-6">
                        <h4 className="text-lg font-medium mb-4">Federal AI Policy Pillars</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              data={[
                                { name: "Governance", value: 100 },
                                { name: "Transparency", value: 100 },
                                { name: "Accountability", value: 100 },
                                { name: "Privacy", value: 100 },
                                { name: "Security", value: 100 },
                                { name: "Fairness", value: 100 }
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip />
                              <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
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
    </>
  )
}

export default App
