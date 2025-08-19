const MODEL_RECOMMENDATIONS = {
  // Tabular data - Classification recommendations
  "Tabular data-Classification-Supervised learning-High interpretability is essential": {
    recommendations: [
      "Logistic Regression: Best for binary classification with linear decision boundaries and transparent coefficients",
      "Decision Trees (max depth 3-5): Provides clear decision paths and easily visualized rules",
      "Explainable Boosting Machine (EBM): Microsoft's interpretable gradient boosting implementation with transparent feature interactions"
    ],
    libraries: "sklearn.linear_model.LogisticRegression, sklearn.tree.DecisionTreeClassifier, interpret.glassbox.ExplainableBoostingClassifier"
  },
  "Tabular data-Classification-Supervised learning-Balance of interpretability and performance": {
    recommendations: [
      "Random Forest (max_features='sqrt', n_estimators=100): Ensemble of decision trees with controlled complexity and built-in feature importance",
      "XGBoost (max_depth=6): Gradient boosting implementation with moderate tree depth for balanced performance and interpretability",
      "LightGBM with feature importance analysis: Faster gradient boosting variant with efficient feature binning"
    ],
    libraries: "sklearn.ensemble.RandomForestClassifier, xgboost.XGBClassifier, lightgbm.LGBMClassifier"
  },
  "Tabular data-Classification-Supervised learning-Performance is more important than interpretability": {
    recommendations: [
      "CatBoost with optimal hyperparameters: Advanced gradient boosting with superior handling of categorical features",
      "Stacked ensemble combining XGBoost, LightGBM and Neural Networks: Meta-learner approach for maximum predictive power",
      "Deep Neural Network with dropout (3-5 hidden layers): MLP architecture with regularization for complex pattern recognition"
    ],
    libraries: "catboost.CatBoostClassifier, sklearn.ensemble.StackingClassifier, tensorflow.keras.Sequential"
  },
  "Tabular data-Classification-Unsupervised learning-High interpretability is essential": {
    recommendations: [
      "K-Means (k chosen via silhouette score): Clear centroid-based clustering with easily visualized groups",
      "Hierarchical Clustering with dendrogram visualization: Tree-based clustering showing relationships between groups",
      "DBSCAN with epsilon parameter tuning: Density-based clustering that identifies outliers explicitly"
    ],
    libraries: "sklearn.cluster.KMeans, sklearn.cluster.AgglomerativeClustering, sklearn.cluster.DBSCAN"
  },

  // Tabular data - Regression recommendations
  "Tabular data-Regression-Supervised learning-High interpretability is essential": {
    recommendations: [
      "Linear Regression with Lasso (L1) regularization: Sparse coefficients for feature selection and clear impact measurement",
      "Ridge Regression (L2 regularization): Stable coefficients for multicollinear features with interpretable weights",
      "Decision Tree Regressor (max_depth=4): Simple tree-based model with clear decision paths for numerical prediction"
    ],
    libraries: "sklearn.linear_model.Lasso, sklearn.linear_model.Ridge, sklearn.tree.DecisionTreeRegressor"
  },
  "Tabular data-Regression-Supervised learning-Balance of interpretability and performance": {
    recommendations: [
      "Random Forest Regressor (100 trees): Ensemble method with moderate complexity and robust performance",
      "ElasticNet (combined L1 and L2 regularization): Flexible linear model balancing sparsity and stability",
      "Gradient Boosting Regressor with early stopping: Interpretable boosting approach with controlled complexity"
    ],
    libraries: "sklearn.ensemble.RandomForestRegressor, sklearn.linear_model.ElasticNet, sklearn.ensemble.GradientBoostingRegressor"
  },
  "Tabular data-Regression-Supervised learning-Performance is more important than interpretability": {
    recommendations: [
      "XGBoost Regressor with hyperparameter optimization: High-performance gradient boosting for complex numerical prediction",
      "LightGBM with dart mode: Drop-out regularized boosting for improved generalization",
      "Neural Network regressor with batch normalization: Deep learning approach for complex non-linear patterns"
    ],
    libraries: "xgboost.XGBRegressor, lightgbm.LGBMRegressor, tensorflow.keras.Sequential"
  },

  // Tabular data - Anomaly Detection
  "Tabular data-Anomaly detection-Unsupervised learning-Performance is more important than interpretability": {
    recommendations: [
      "Isolation Forest (n_estimators=100): Efficient ensemble method for isolating anomalies through random partitioning",
      "One-Class SVM with RBF kernel: Support vector method for learning the boundary of normal data",
      "Deep Autoencoder with reconstruction error thresholding: Neural network approach for learning normal patterns"
    ],
    libraries: "sklearn.ensemble.IsolationForest, sklearn.svm.OneClassSVM, tensorflow.keras.Sequential"
  },

  // Text data recommendations
  "Text data-Classification-Supervised learning-High interpretability is essential": {
    recommendations: [
      "Multinomial Naive Bayes with TF-IDF features: Probabilistic classifier with clear word importance weights",
      "Logistic Regression with L1 regularization and n-gram features: Linear model with sparse word coefficients",
      "Linear SVM with word embedding averages: Support vector classifier with interpretable feature weights"
    ],
    libraries: "sklearn.naive_bayes.MultinomialNB, sklearn.linear_model.LogisticRegression, sklearn.svm.LinearSVC"
  },
  "Text data-Classification-Supervised learning-Performance is more important than interpretability": {
    recommendations: [
      "DistilBERT fine-tuned for classification: Compressed BERT variant with strong performance and moderate resource usage",
      "RoBERTa with a classification head: Robust transformer architecture optimized for classification tasks",
      "DeBERTa with domain-specific pre-training: Enhanced BERT variant with disentangled attention for improved performance"
    ],
    libraries: "transformers.DistilBertForSequenceClassification, transformers.RobertaForSequenceClassification, transformers.DebertaForSequenceClassification"
  },
  "Text data-Natural language processing-Supervised learning-Critical (real-time applications)": {
    recommendations: [
      "DistilBERT quantized to INT8 precision: Compressed and optimized transformer for fast inference",
      "TinyBERT with ONNX Runtime optimization: Ultra-compressed BERT variant for minimal latency",
      "FastText with hash embedding tricks: Lightweight word embedding approach for extremely fast text processing"
    ],
    libraries: "transformers.DistilBertModel, optimum.onnxruntime, fasttext"
  },

  // Image data recommendations
  "Image data-Classification-Supervised learning-Limited (personal computer)": {
    recommendations: [
      "MobileNetV3-Small with width multiplier 0.75: Highly efficient CNN designed for mobile devices",
      "EfficientNet-B0 with transfer learning: Compact CNN with optimal scaling properties",
      "SqueezeNet with model quantization: Ultra-compact architecture with fire modules for efficiency"
    ],
    libraries: "tensorflow.keras.applications.MobileNetV3Small, tensorflow.keras.applications.EfficientNetB0, torchvision.models.squeezenet"
  },
  "Image data-Classification-Supervised learning-Extensive (cloud/distributed computing)": {
    recommendations: [
      "EfficientNetV2-XL with pre-training: State-of-the-art CNN with optimal scaling and training methodology",
      "Vision Transformer (ViT-Large): Transformer architecture applied to image patches for powerful representation",
      "ConvNeXt-XL with layer-wise learning rate: Advanced CNN with transformer-inspired design elements"
    ],
    libraries: "tensorflow.keras.applications.EfficientNetV2XL, transformers.ViTForImageClassification, torchvision.models.convnext_large"
  },
  "Image data-Anomaly detection-Unsupervised learning-Balance of interpretability and performance": {
    recommendations: [
      "Convolutional Autoencoder with reconstruction error maps: Self-supervised approach highlighting anomalous regions",
      "One-Class CNN with activation visualization: CNN variant trained on normal samples with interpretable feature maps",
      "Deep SVDD (Support Vector Data Description): Deep learning approach minimizing the volume of a hypersphere containing normal data"
    ],
    libraries: "tensorflow.keras.Sequential, pytorch_lightning, pyod.models.deep_svdd"
  },

  // Time series data recommendations
  "Time series data-Forecasting-Supervised learning-High interpretability is essential": {
    recommendations: [
      "SARIMA with decomposition visualization: Statistical model capturing seasonality, trend and residuals",
      "Prophet with component plots: Facebook's decomposable forecasting model with explicit holiday effects",
      "Exponential Smoothing (ETS) with parameter interpretation: Classic statistical approach with clear component weights"
    ],
    libraries: "statsmodels.tsa.statespace.SARIMAX, prophet.Prophet, statsmodels.tsa.holtwinters.ExponentialSmoothing"
  },
  "Time series data-Forecasting-Supervised learning-Performance is more important than interpretability": {
    recommendations: [
      "Temporal Fusion Transformer: Attention-based architecture designed specifically for multi-horizon forecasting",
      "DeepAR (Autoregressive Recurrent Networks): Amazon's probabilistic forecasting model with LSTM/GRU cells",
      "N-BEATS (Neural Basis Expansion Analysis): Interpretable deep architecture with backward and forward residual links"
    ],
    libraries: "pytorch_forecasting.models.temporal_fusion_transformer, gluonts.model.deepar, pytorch_forecasting.models.nbeats"
  },
  "Time series data-Anomaly detection-Supervised learning-Critical (real-time applications)": {
    recommendations: [
      "LSTM-Autoencoder with online threshold adaptation: Sequence-to-sequence model for real-time anomaly scoring",
      "Isolation Forest with sliding window features: Ensemble method efficiently processing streaming data",
      "ARIMA with dynamic prediction intervals: Statistical approach with explicit confidence bounds for anomaly detection"
    ],
    libraries: "tensorflow.keras.Sequential, sklearn.ensemble.IsolationForest, statsmodels.tsa.arima.model.ARIMA"
  },

  // Default recommendations for combinations not explicitly covered
  "default": {
    recommendations: [
      "Gradient Boosting (XGBoost/LightGBM): Versatile ensemble methods applicable to most supervised learning tasks",
      "Random Forest: Robust tree-based ensemble with good performance across various data types",
      "Neural Network with architecture tailored to your data type: Adaptable deep learning approach with custom design"
    ],
    libraries: "xgboost.XGBModel, lightgbm.LGBMModel, sklearn.ensemble.RandomForestClassifier, tensorflow.keras.Sequential"
  }
};

export default MODEL_RECOMMENDATIONS;
