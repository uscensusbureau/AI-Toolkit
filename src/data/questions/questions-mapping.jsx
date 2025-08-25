import AI_MODULES from '../modules'

const QUESTIONS_MAPPING = {
  [AI_MODULES.MAPPING]: [
    {
      question: "What type of data will your AI system primarily process?",
      options: ["Tabular data", "Text data", "Image data", "Time series data", "Audio data", "Mixed data types"],
      category: "Data Modality"
    },
    {
      question: "What is the primary task your AI system needs to perform?",
      options: ["Classification", "Regression", "Clustering", "Anomaly detection", "Recommendation", "Natural language processing", "Forecasting"],
      category: "Machine Learning Task"
    },
    {
      question: "What learning paradigm is most appropriate for your use case?",
      options: ["Supervised learning", "Unsupervised learning", "Semi-supervised learning", "Reinforcement learning", "Transfer learning"],
      category: "Learning Paradigm"
    },
    {
      question: "What is your priority regarding model complexity vs. interpretability?",
      options: ["High interpretability is essential", "Balance of interpretability and performance", "Performance is more important than interpretability"],
      category: "Constraints"
    },
    {
      question: "What computational resources are available for model training?",
      options: ["Limited (personal computer)", "Moderate (workstation)", "Substantial (dedicated servers)", "Extensive (cloud/distributed computing)"],
      category: "Constraints"
    },
    {
      question: "How important is inference speed for your application?",
      options: ["Critical (real-time applications)", "Important but not critical", "Moderate importance", "Not a significant concern"],
      category: "Constraints"
    },
    {
      question: "What is the expected volume of data for model training?",
      options: ["Small (hundreds of samples)", "Medium (thousands of samples)", "Large (hundreds of thousands of samples)", "Very large (millions+ samples)"],
      category: "Data Modality"
    },
    {
      question: "Are there stringent explainability requirements for your application?",
      options: ["Yes, full transparency required", "Yes, need to explain key predictions", "Some explanation helpful", "Black-box predictions acceptable"],
      category: "Constraints"
    },
    {
      question: "What is the level of noise or data quality issues in your dataset?",
      options: ["Minimal noise, high-quality data", "Some noise but generally clean", "Moderate noise requiring preprocessing", "Significant noise/quality issues"],
      category: "Data Modality"
    },
    {
      question: "What is the frequency of model retraining and updates needed?",
      options: ["Continuous (online learning)", "Frequent (daily/weekly)", "Periodic (monthly/quarterly)", "Infrequent (annually or less)"],
      category: "Constraints"
    },
    {
      question: "How well-defined are the patterns or relationships in your data?",
      options: ["Very well-defined, clear patterns", "Moderately clear patterns", "Subtle or complex patterns", "Unknown or highly variable patterns"],
      category: "Machine Learning Task"
    },
    {
      question: "What is the acceptable false positive/negative rate for your application?",
      options: ["Extremely low (safety-critical)", "Very low (high-stakes decisions)", "Moderate (balanced approach)", "Higher tolerance (exploratory)"],
      category: "Machine Learning Task"
    }
  ]
};

export default QUESTIONS_MAPPING
