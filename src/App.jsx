import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Info, CheckCircle, AlertTriangle, XCircle, HelpCircle, ChevronDown, BarChart3, FileText, Home, Settings, Download, ArrowLeft, ArrowRight } from 'lucide-react';

import './index.css'

const AI_MODULES = {
  MAPPING: 'ai-mapping',
  REGULATION: 'ai-regulation',
  RESPONSIBLE_AI: 'responsible-ai',
  RISK: 'ai-risk'
};

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
  [AI_MODULES.RISK]: {
    title: 'AI Risk Management',
    description: 'Identify, evaluate, respond to, and govern AI risks through the NIST AI Risk Management Framework.',
    guideTitle: 'NIST AI RMF Guide',
    questTitle: 'AI RMF Risk Assessment Questionnaire',
    color: '#FF9800'
  }
};

// Information guides content
const GUIDE_CONTENT = {
  [AI_MODULES.MAPPING]: [
    {
      title: 'Data Modality',
      items: [
        'Tabular data: Structured data in tables with rows and columns. This includes CSV files, database tables, and spreadsheets. Common in business applications, financial systems, and enterprise environments where data is highly structured and follows a schema.',
        'Text data: Unstructured or semi-structured data such as articles, documents, reviews, emails, and chat logs. These require natural language processing techniques and typically benefit from transformer-based models that can understand semantic meaning.',
        'Image data: Pixel-based data including grayscale and RGB images, medical scans, satellite imagery, and video frames. Convolutional neural networks excel with these inputs by detecting spatial patterns and hierarchical features.',
        'Time series data: Sequential data points collected over time, such as sensor readings, stock prices, IoT device metrics, and user activity logs. Temporal patterns and seasonality are key features that specialized algorithms can detect.'
      ]
    },
    {
      title: 'Machine Learning Task',
      items: [
        'Classification: Assigning data to predefined categories or classes. Examples include spam detection, sentiment analysis, disease diagnosis, and object recognition. Classification models output discrete labels or probabilities of class membership, with metrics like accuracy, precision, recall, and F1 score used for evaluation.',
        'Regression: Predicting continuous numerical values based on input features. Use cases include price prediction, demand forecasting, and resource allocation. These models output real numbers rather than categories, with performance measured by metrics like Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared.',
        'Clustering: Grouping similar data points together without predefined labels. Used for customer segmentation, anomaly detection, and document organization. Algorithms like K-means, DBSCAN, and hierarchical clustering identify natural groupings in data based on similarity or distance measures.',
        'Anomaly Detection: Identifying rare, unusual, or suspicious data instances that deviate significantly from the norm. Critical for fraud detection, network security, manufacturing quality control, and system health monitoring. These models learn what "normal" patterns look like and flag deviations.'
      ]
    },
    {
      title: 'Learning Paradigm',
      items: [
        'Supervised learning: Learning from labeled data with known outcomes. The model is trained on input-output pairs (features and target labels/values) and learns to predict outputs for new inputs. This is the most common approach, suitable when you have sufficient labeled data and clear target variables. Examples include image classification, sentiment analysis, and spam filtering.',
        'Unsupervised learning: Learning patterns and structures from unlabeled data without explicit guidance. The algorithm discovers hidden patterns, groupings, or representations in data. Used when labeled data is unavailable or expensive to obtain, or when exploring unknown patterns. Examples include clustering, dimensionality reduction, and anomaly detection.',
        'Semi-supervised learning: Learning from a mix of labeled and unlabeled data. This hybrid approach leverages small amounts of labeled data with larger amounts of unlabeled data. Particularly valuable when obtaining labeled data is expensive or time-consuming. Common in medical imaging, speech recognition, and text classification where partial labeling is feasible.',
        'Reinforcement learning: Learning optimal actions through trial-and-error interactions with an environment. The model (agent) learns by receiving rewards or penalties based on its actions. Used for sequential decision-making problems like robotics, game playing, autonomous vehicles, and resource management. Differs from other paradigms by focusing on long-term rewards rather than immediate prediction accuracy.'
      ]
    },
    {
      title: 'Constraints',
      items: [
        'Model complexity: The sophistication of the model and interpretability trade-offs. Simpler models (linear regression, decision trees) are more explainable but may underfit complex data. Complex models (deep neural networks, ensemble methods) can capture intricate patterns but function as "black boxes," creating challenges for explainability, regulatory compliance, and stakeholder trust. Consider your explainability requirements carefully when selecting model architecture.',
        'Training resources: Amount of computational power, memory, time, and expertise needed. Resource requirements increase with data size, model complexity, and hyperparameter tuning needs. Consider your available infrastructure (CPUs, GPUs, TPUs, cloud resources), time constraints, and budget. Remember that resource-intensive models also typically require specialized expertise to develop and maintain.',
        'Inference speed: How quickly the model can make predictions after deployment. Critical for real-time applications like autonomous vehicles, fraud detection, and recommendation systems. Models with fast inference may require optimization techniques like quantization, pruning, distillation, or specialized hardware. Consider latency requirements, throughput needs, and deployment environment constraints (edge devices, browser-based, server-side).',
        'Operational considerations: Additional factors like model maintainability, retraining frequency, data pipeline complexity, and integration with existing systems. Consider the full lifecycle of your model, including monitoring for drift, versioning, A/B testing capabilities, and compliance with organizational policies and industry regulations.'
      ]
    }
  ],
  [AI_MODULES.REGULATION]: [
    {
      title: 'Identification & Governance',
      items: [
        'System Inventory: AI systems must be cataloged in the agency\'s use case inventory. This inventory should include comprehensive metadata about each AI system, including purpose, data sources, development methodology, deployment status, and risk classification. Regular audits should ensure the inventory remains current as systems evolve or new ones are developed.',
        'Designated Leadership: Each agency must have a Chief AI Officer and governance lead who is accountable for AI risk management and compliance. This leadership role should have sufficient authority, resources, and expertise to effectively oversee AI activities across the organization. The CAIO typically reports to senior leadership and coordinates with privacy, security, and ethics officers.',
        'Review by AI Board: Governance boards should evaluate rights-impacting or high-risk systems through a structured review process. These cross-functional boards typically include legal, technical, ethics, and domain experts who conduct thorough assessments before deployment and during operation. High-risk systems require more rigorous review, including potential red-team exercises and independent verification.'
      ]
    },
    {
      title: 'Purpose & Use Justification',
      items: [
        'Mission Alignment: AI use must support federal missions and not contradict statutory limits. Agencies should clearly document how each AI system furthers specific mission objectives and operates within legal boundaries. This requires collaboration between technical teams, legal counsel, and policy experts to ensure both technical capabilities and implementation approaches align with the agency\'s authorized activities and avoid mission creep or statutory violations.',
        'Rights-Impacting Assessment: Evaluate if the AI system affects individual rights or access to benefits. Systems that influence decisions about individuals—especially in areas like benefits determination, law enforcement, immigration, or public services—require heightened scrutiny. This assessment should analyze potential impacts on constitutional rights, civil liberties, privacy, and equitable access to government services, with special attention to effects on marginalized communities.',
        'Public Disclosure: Purpose and function must be stated in clear, accessible language. Agencies must provide transparency about AI systems through public-facing documentation that avoids technical jargon. This disclosure should include the system\'s purpose, capabilities, limitations, data sources (at an appropriate level of detail), and how it fits into agency decision-making processes. For sensitive systems, disclosures should provide meaningful transparency while respecting security and privacy constraints.'
      ]
    },
    {
      title: 'Risk Assessment & Classification',
      items: [
        'Risk-Based Impact Assessment (RBIA): Conducted to classify systems as low, moderate, or high impact. This formal assessment evaluates potential harms across multiple dimensions including rights and safety impacts, scope of deployment, autonomy level, and technical maturity. The resulting classification determines the governance requirements, with high-impact systems subject to more stringent controls. RBIA should consider both likelihood and severity of potential harms, with special attention to irreversible impacts.',
        'Independent Evaluation: External reviews or red-teaming are encouraged for high-risk systems. Third-party assessments provide valuable independent verification of risk controls and can identify blind spots missed by internal teams. For high-impact systems, these evaluations should include adversarial testing, stress testing with edge cases, and evaluation of fairness across demographic groups. Independent reviewers should have appropriate expertise and sufficient access to system details.',
        'Ongoing Monitoring: Risks should be evaluated before and after deployment, with regular reassessments throughout the system lifecycle. Initial risk assessments are insufficient; agencies must implement continuous monitoring to detect emergent risks, performance degradation, or concept drift. This includes establishing key risk indicators, threshold alerts, regular risk reviews, and post-incident analyses to ensure risks remain within acceptable tolerances and to identify new mitigation strategies as the operational environment evolves.'
      ]
    },
    {
      title: 'Transparency & Explainability',
      items: [
        'Documentation: Models and datasets must be documented and version-controlled. This documentation should include model architecture, training methodology, performance metrics, testing procedures, known limitations, data sources, and preprocessing steps. Model cards and datasheets are emerging standards that provide structured templates for thorough documentation. Version control should track all changes to models and data, including retraining cycles, with the ability to roll back to previous versions if issues arise.',
        'Explainability: AI outputs should be understandable to users, especially for critical decisions. Agencies must provide appropriate explanations tailored to different stakeholder needs—from technical details for specialists to clear reasoning for affected individuals. Explainability approaches should be proportional to the system\'s impact and complexity. For high-impact systems, agencies should implement layered explanations that provide both overview-level and detailed justifications for outcomes.',
        'Interpretability Tools: Use SHAP, LIME, or similar techniques to explain high-stakes predictions. For complex models like neural networks, these interpretability methods help identify which features most influence specific predictions. Tools should be selected based on the model type, use case, and stakeholder needs. For critical systems, agencies should implement multiple complementary interpretability approaches, as each method has different strengths and limitations. These tools should be incorporated into user interfaces where appropriate to provide real-time explanations.'
      ]
    },
    {
      title: 'Human Oversight & Accountability',
      items: [
        'Human-in-the-Loop: Ensure human review of key AI-driven decisions. Agencies must establish mechanisms for human oversight of critical AI outputs, especially where they impact individual rights, benefits, or significant public interests. This includes defining when human review is required, establishing clear roles and responsibilities, training human reviewers, and providing them with appropriate contextual information to make informed decisions.',
        'Redress Mechanisms: Establish paths for affected individuals to challenge outcomes. Agencies should implement clear, accessible processes for people to contest AI-influenced decisions, provide additional information, or request reconsideration. These mechanisms should include multiple channels (digital, phone, in-person), reasonable timeframes, transparency about the process, and accountability for resolution.',
        'Personnel Training: Operators must be trained in ethical AI use and escalation protocols. Training should include understanding the AI system\'s capabilities and limitations, recognizing potential biases or failure modes, identifying cases that require additional scrutiny, and following proper escalation procedures. Regular refresher training should incorporate lessons learned and emerging best practices.'
      ]
    },
    {
      title: 'Privacy, Fairness & Data Integrity',
      items: [
        'SAOP Involvement: The Senior Agency Official for Privacy must assess the system. Privacy assessment should occur early in development and continue throughout the system lifecycle. The SAOP should evaluate data collection, processing, storage, and sharing practices; identify privacy risks; and recommend appropriate controls. Privacy considerations should address both legal compliance and ethical responsibilities beyond minimum legal requirements.',
        'Bias Audits: Fairness audits should assess disparate impact and demographic performance. Agencies should regularly evaluate whether AI systems produce significantly different outcomes across demographic groups, especially for protected characteristics. These audits should use appropriate fairness metrics, test various demographic intersections, consider historical and societal context, and document methodologies and findings. Results should inform mitigation strategies and continuous improvement.',
        'Data Governance: Demographic and sensitive data use must be justified and documented. Agencies must establish clear governance frameworks for sensitive data, including purpose limitations, access controls, quality assurance, and appropriate use. This includes specifying why demographic or sensitive data is necessary, how it will be protected, and what processes ensure its accuracy and currency.'
      ]
    },
    {
      title: 'Security & Robustness',
      items: [
        'ATO Compliance: Systems must comply with FISMA and receive Authority to Operate. AI systems should be integrated into agency security assessment and authorization processes, with security controls tailored to AI-specific risks. Security categorization should consider the sensitivity of data processed, potential for adversarial manipulation, and consequences of system compromise.',
        'Security Controls: Safeguards against adversarial attacks and data leakage must be in place. These controls should address input validation, model robustness, poisoning attacks, inference attacks, and data confidentiality. Agencies should implement defense-in-depth strategies, including access controls, encryption, monitoring systems, and incident response plans specifically designed for AI system risks.',
        'Performance Drift: Detect and mitigate performance decay and concept drift. Agencies should implement monitoring systems to identify when AI performance degrades or when input distributions change from training conditions. This monitoring should include automated alerts, regular performance evaluations against benchmark datasets, and processes for investigating drift causes and implementing appropriate responses (retraining, model updates, or operational adjustments).'
      ]
    },
    {
      title: 'Public Services & High-Impact Systems',
      items: [
        'High-Impact Services: Systems affecting public service delivery must meet additional standards. For AI systems that influence access to benefits, rights, or critical services, agencies should implement enhanced governance, testing, transparency, and oversight. These systems require robust validation in real-world conditions, diverse validation datasets, and careful analysis of potential failure modes and their consequences.',
        'Public Redress: Feedback and correction mechanisms should be made available. Agencies should publish clear information about how individuals can provide feedback, report issues, or seek reconsideration of AI-influenced decisions. These mechanisms should be accessible to diverse populations, including those with limited technical knowledge, language differences, or disabilities.',
        'IQA Compliance: Systems must meet Information Quality Act requirements. AI outputs used in agency decision-making must adhere to utility, objectivity, integrity, and quality standards. Agencies should establish processes to verify that AI-generated information meets these standards, with appropriate documentation of verification methods and results.'
      ]
    },
    {
      title: 'Lifecycle & Open Source Considerations',
      items: [
        'Documentation Maintenance: Training, testing, and deployment documents must be up to date. Agencies should maintain comprehensive documentation throughout the AI system lifecycle, including requirements, design, development, testing, deployment, and operational phases. Documentation should capture model specifications, training data characteristics, performance metrics, limitation boundaries, known issues, and version history.',
        'Decommissioning Plans: There should be a plan for system retirement or replacement. Before deployment, agencies should consider the full lifecycle of AI systems, including criteria for determining when retirement or replacement is needed, processes for transitioning to new systems, and procedures for secure data handling during decommissioning. These plans should address user notification, service continuity, and preservation of relevant records.',
        'Open Source Evaluation: Source code should be published when feasible and not restricted. Agencies should assess whether AI system code can be released as open source to promote transparency, enable external validation, and support broader innovation. This evaluation should consider security implications, intellectual property constraints, and maintenance responsibilities while prioritizing openness where possible.'
      ]
    }
  ],
  [AI_MODULES.RESPONSIBLE_AI]: [
    {
      title: 'Bias & Fairness',
      items: [
        'Dataset Representativeness: Ensure datasets reflect diverse populations and use disaggregated metrics. This requires careful data collection and curation to include adequate representation across relevant demographic groups. Organizations should document dataset composition, identify potential gaps or underrepresented groups, and supplement data where necessary. Disaggregated metrics involve analyzing model performance separately for different subgroups to identify disparities that might be hidden in aggregate statistics.',
        'Bias Audits: Perform fairness audits using metrics like disparate impact or equal opportunity. Fairness audits should be conducted throughout the AI lifecycle—during development, before deployment, and regularly in production. Organizations should select appropriate fairness metrics based on the specific context and use case. Common metrics include demographic parity, equal opportunity, equalized odds, and counterfactual fairness. The results of these audits should inform model modifications and deployment decisions.',
        'Fairness Constraints: Apply fairness-aware methods during training and evaluation. These methods can include pre-processing techniques (modifying training data to reduce bias), in-processing approaches (incorporating fairness objectives directly into model training), and post-processing methods (adjusting model outputs to ensure fair results). Organizations should document which fairness definitions and constraints they prioritize, as different fairness metrics can sometimes be mathematically incompatible.',
        'Disparate Impact Monitoring: Evaluate model behavior across subgroups to identify differential performance. This involves regular testing across demographic categories and protected attributes to uncover unintended discrimination. Organizations should establish thresholds for acceptable performance differences and implement alerting systems when disparities exceed these thresholds. For high-risk applications, consider using formal disparate impact analysis frameworks from legal and regulatory contexts.',
        'Unfair Outcome Mitigation: Establish procedures to detect and resolve inequitable results. Create clear protocols for addressing fairness issues when discovered, including potential model updates, additional controls, or human review processes. Define escalation paths and response timelines based on the severity of fairness concerns. Mitigation strategies should be documented and evaluated for effectiveness. Organizations should maintain a library of fairness issues and their resolutions to build institutional knowledge.'
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        'Sensitive Data Protection: Ensure compliance with privacy regulations and minimize sensitive data use. Organizations should inventory all data used in AI systems, classify data sensitivity levels, and implement appropriate controls based on data type. This includes meeting requirements from regulations like GDPR, HIPAA, CCPA, and federal privacy laws. Sensitive data minimization principles should apply throughout the AI lifecycle—from collection to processing, storage, and retention. Organizations should document data flows and implement privacy impact assessments for high-risk systems.',
        'Privacy-Enhancing Technologies (PETs): Use techniques like anonymization, differential privacy, or secure multiparty computation to protect individual privacy while maintaining utility. These technologies allow organizations to derive insights from sensitive data while minimizing privacy risks. Differential privacy adds mathematical noise to protect individual records while preserving statistical validity. Federated learning enables model training across distributed datasets without centralizing sensitive data. Homomorphic encryption allows computation on encrypted data without decryption.',
        'Access Controls: Restrict access to models and outputs to authorized individuals based on least privilege principles. Implement role-based access controls, authentication mechanisms, and audit logging for all system interactions. For sensitive AI systems, consider implementing multi-factor authentication and privileged access management. Access permissions should be regularly reviewed and updated as roles change. AI outputs containing sensitive information should inherit the protection level of the underlying data.',
        'Adversarial Defense: Protect against model manipulation, data poisoning, and inference attacks. Organizations should implement defenses against various attack vectors, including adversarial examples (inputs designed to cause misclassification), model inversion (reconstructing training data), and membership inference (determining if data was used in training). Defense strategies include adversarial training, input validation, model distillation, and regularization techniques that enhance model robustness.',
        'External Audits: Conduct third-party reviews and penetration testing to identify vulnerabilities. Independent security assessments provide objective evaluation of security controls and identify gaps that internal teams might miss. For high-risk systems, organizations should implement a regular cadence of security audits, including penetration testing, model security reviews, and privacy assessments. Results should inform security improvements and be incorporated into organizational risk management processes.'
      ]
    },
    {
      title: 'Transparency & Explainability',
      items: [
        'Model Documentation: Provide detailed records of model architecture, training, and assumptions. This documentation should cover the model\'s purpose, design choices, training methodology, data processing, performance metrics, and known limitations. It serves as both a technical reference and a transparency mechanism. Documentation should be detailed enough for technical stakeholders to understand how the model works while also providing appropriate summaries for other audiences. Keep documentation updated when models change.',
        'User-Facing Explanations: Offer explanations tailored to different stakeholder groups. Different users have different explanation needs—from developers needing technical insights to end-users wanting to understand why a specific decision was made. Organizations should implement layered explanations that address these diverse needs. Explanations should balance comprehensiveness with clarity, avoiding overwhelming technical details for non-technical audiences while still providing meaningful transparency.',
        'Interpretability Tools: Incorporate SHAP, LIME, or counterfactuals for complex models. For black-box models like deep neural networks, these technical approaches help identify feature importance and decision boundaries. SHAP values quantify each feature\'s contribution to predictions, LIME builds local interpretable approximations, and counterfactuals show what would need to change to get a different result. These tools should be integrated into development workflows and, where appropriate, user interfaces.',
        'Non-Technical Communication: Use accessible language for public understanding. Technical explanations should be complemented by clear, jargon-free communication about how AI systems work, what they do, and what their limitations are. This information should be made available in accessible formats and languages, with consideration for diverse reading levels and technical backgrounds. Visual explanations can supplement text to enhance understanding of complex concepts.',
        'Lifecycle Transparency: Keep documentation up to date through development and deployment. As models evolve through retraining, fine-tuning, or architectural changes, documentation should be updated to reflect current behavior. Version control for documentation should align with model versioning. Organizations should implement processes to ensure documentation accuracy over time, including regular reviews and validation that documentation matches actual system behavior.'
      ]
    },
    {
      title: 'Accountability',
      items: [
        'Ownership: Assign responsibility for AI system development, performance, and oversight. Clear ownership should be established for different aspects of the AI lifecycle, including who is responsible for development decisions, operational performance, and addressing issues. This includes technical, business, and executive stakeholders. Ownership should be documented and communicated to relevant parties, with escalation paths for issues that require higher-level attention.',
        'Appeal Mechanisms: Allow users to contest or appeal AI-generated decisions. Organizations should implement clear processes for users to challenge AI decisions, provide additional information, or request human review. These mechanisms should be accessible, responsive, and transparent about how appeals are handled. For high-impact decisions, multiple levels of appeal may be appropriate. Appeal outcomes should inform system improvements to address recurring issues.',
        'Audit Trails: Log model outputs, training changes, and deployment events. Comprehensive logging captures what decisions were made, when, and based on what inputs. These logs should be secured, tamper-resistant, and retained according to appropriate retention policies. For high-stakes systems, consider implementing immutable logging through technologies like append-only databases or blockchain. Logs should be structured to support investigations when issues arise.',
        'Governance Processes: Ensure models are reviewed by internal or external ethics boards. Formal governance structures provide oversight throughout the AI lifecycle, from concept approval to deployment and monitoring. These processes should include diverse perspectives, clear criteria for approvals and rejections, and appropriate documentation. Governance should be proportional to risk—higher-impact systems warrant more rigorous and frequent review.',
        'Public Disclosure: Publish contact, policy, and impact information for accountability. Organizations should provide clear information about who is responsible for AI systems, what policies govern their use, and how to report issues or concerns. This transparency supports accountability by making it clear who stands behind AI systems and what commitments they have made. For public-sector and high-impact private-sector systems, impact assessments should be published where possible.'
      ]
    },
    {
      title: 'Robustness & Reliability',
      items: [
        'Stress Testing: Evaluate performance under edge cases and simulated attacks. Testing should go beyond standard validation to include boundary conditions, unusual inputs, adversarial examples, and stress scenarios. These tests help identify potential failure modes before deployment. Organizations should develop comprehensive test suites that include both expected operational conditions and edge cases, with regular expansion to include new scenarios as they are identified.',
        'Monitoring & Maintenance: Track drift and accuracy over time and retrain as needed. Continuous monitoring detects when model performance degrades due to data drift, concept drift, or environmental changes. Monitoring should include automated alerting for performance anomalies, regular benchmarking against holdout sets, and comparison of production predictions to expected distributions. When degradation is detected, models should be retrained or updated to maintain performance.',
        'Fallback Strategies: Plan for system failure modes with safe alternatives. Organizations should identify potential failure scenarios and develop appropriate fallback mechanisms—from graceful degradation to safe defaults or human review. Fallback strategies should be documented, tested, and incorporated into operational procedures. Critical systems may require redundant implementations or alternative approaches that can take over when primary systems fail.',
        'Environment Testing: Validate behavior in varied and real-world contexts. Testing should extend beyond controlled environments to include diverse real-world scenarios that represent actual deployment conditions. This includes varying input quality, user behaviors, and integration environments. Field testing or beta deployments can provide valuable insights about performance in actual usage contexts before full-scale deployment.',
        'Operational Readiness: Confirm model stability prior to deployment. Before moving to production, organizations should verify that models are stable, reliable, and ready for operational use. This includes performance consistency across multiple runs, resource utilization within acceptable limits, appropriate error handling, and integration testing with downstream systems. Deployment checklists should verify that all operational requirements are met before systems go live.'
      ]
    }
  ],
  [AI_MODULES.RISK]: [
    {
      title: 'Map - Contextualization',
      items: [
        'Purpose Clarity: Define the AI system\'s function, role, and objectives with precision and specificity. This goes beyond simple descriptions to articulate exactly what the system is designed to do, its capabilities and limitations, and how it will be used in practice. The purpose statement should address the problem being solved, value proposition, intended users, and societal implications. This clarity is foundational for all subsequent risk assessment activities.',
        'Stakeholder Identification: Engage developers, users, and impacted communities throughout the AI lifecycle. Stakeholder mapping should identify both direct stakeholders (users, operators, decision-makers) and indirect stakeholders (communities affected by decisions, marginalized groups, regulatory bodies). Engagement should be proportional to risk level and include diverse perspectives. For high-impact systems, consider creating formal advisory panels with representatives from affected communities.',
        'Impact Mapping: Assess intended and unintended effects across the AI lifecycle using structured methodologies. This includes identifying primary, secondary, and tertiary impacts across social, economic, environmental, and ethical dimensions. Organizations should use techniques like scenario planning and consequence scanning to anticipate unexpected outcomes. Impact assessment should span from development through deployment, ongoing operation, and eventual decommissioning or replacement.',
        'Legal/Ethical Fit: Confirm alignment with agency mission, legal boundaries, and ethical frameworks. This involves detailed analysis of relevant laws, regulations, ethical guidelines, and organizational values. For each identified risk, map applicable legal requirements and ethical principles. Document where compliance is required versus where ethical considerations go beyond legal minimums. This analysis should inform go/no-go decisions for AI development and deployment.',
        'System Interactions: Document all system dependencies, integrations, and environmental interactions. Create comprehensive maps of how the AI system connects with other systems, data sources, and human workflows. This includes technical dependencies, operational relationships, and potential cascade effects. Understanding these interconnections is crucial for identifying emergent risks that arise from system interactions rather than from individual components.'
      ]
    },
    {
      title: 'Measure - Risk Identification & Evaluation',
      items: [
        'Risk Discovery Methods: Use scenario planning, testing, and expert input to systematically identify potential risks. Effective risk discovery employs multiple complementary methods, including red team exercises, tabletop scenarios, failure mode analysis, and expert workshops. Organizations should consider both known risks from similar systems and novel risks specific to the application context. For high-impact systems, implement participatory approaches that include diverse stakeholders in the risk identification process.',
        'Severity and Likelihood Assessment: Estimate consequences and probability of risk events using both quantitative and qualitative methods. Develop impact scales that consider dimensions such as harm severity, number of people affected, duration of impact, and reversibility. Create likelihood scales based on historical data where available and structured expert judgment where needed. Risk prioritization should consider both dimensions, with special attention to low-probability, high-consequence events that could cause catastrophic harm.',
        'Conditional Performance Evaluation: Assess accuracy under varied inputs and conditions to understand performance boundaries. Test model behavior across different subpopulations, edge cases, and adversarial scenarios. Identify conditions where performance degrades significantly, which represents hidden risk. For safety-critical applications, stress testing should evaluate performance under low-frequency but high-risk scenarios, including rare input patterns and system failures.',
        'Comprehensive Metrics: Include fairness, robustness, privacy, and reliability measures beyond standard accuracy metrics. Develop a balanced scorecard of metrics relevant to the specific application context and stakeholder concerns. For each metric, establish thresholds that define acceptable performance levels and trigger points for intervention. Monitor trade-offs between competing objectives, such as privacy versus utility or performance versus explainability.',
        'Risk Tracking: Maintain and update a comprehensive risk inventory throughout the AI lifecycle. The risk register should document each identified risk, its assessment, mitigations, ownership, and current status. Implement regular review cycles to update risk assessments as the system, its usage, or operating environment evolves. For high-impact systems, integrate AI risk tracking with enterprise risk management processes for appropriate governance oversight.'
      ]
    },
    {
      title: 'Manage - Risk Response',
      items: [
        'Mitigation Planning: Document controls and mitigation actions for each identified risk. Develop a structured response strategy that may include risk acceptance (for low-impact risks within tolerance), avoidance (eliminating the risk source), transfer (sharing risk through insurance or partnerships), or reduction (implementing controls to lower probability or impact). For each mitigation, document implementation approach, required resources, timeline, and expected risk reduction. Mitigation plans should be proportional to risk level and address root causes where possible.',
        'Responsibility Assignment: Identify risk owners and maintain clear accountability throughout the AI lifecycle. Each identified risk should have a designated owner with appropriate authority and resources to implement mitigations. Responsibilities should span technical teams, business units, legal/compliance, and executive leadership based on risk nature and severity. Document roles in risk governance, including who approves risk acceptance decisions at different thresholds and who is responsible for ongoing monitoring and escalation.',
        'Dynamic Risk Register: Keep risk logs updated and accessible to support active risk management. The risk register should be a living document that evolves as risks change, new risks emerge, and mitigations are implemented. Include risk descriptions, assessments, controls, status, review dates, and audit trail of changes. For complex or high-impact systems, consider implementing specialized AI risk management tools that can track risks across multiple dimensions and link to related artifacts.',
        'Incident Escalation: Set clear thresholds and response protocols for emergent risks and incidents. Define triggers for different escalation levels based on impact severity, vulnerability exploitation, or performance degradation. Document notification requirements, response team composition, and decision authority at each escalation level. For high-impact systems, conduct regular incident response exercises to test protocols and improve organizational readiness.',
        'Effectiveness Testing: Test risk mitigations for performance to verify they function as intended. Implement both pre-deployment validation and post-implementation monitoring of control effectiveness. For critical controls, conduct periodic testing under realistic conditions, including potential circumvention attempts. When mitigations prove less effective than expected, adjust the approach and document lessons learned to improve future risk management practices.'
      ]
    },
    {
      title: 'Govern - Oversight & Accountability',
      items: [
        'Governance Structure: Create oversight boards or designate responsible parties with clear authority and reporting lines. Effective AI governance requires formal structures with appropriate expertise, diversity, and decision-making authority. For organizations developing or deploying multiple AI systems, consider tiered governance with system-specific reviews feeding into enterprise-level oversight. Governance bodies should include technical expertise, domain knowledge, ethics perspectives, and legal/compliance representation to ensure comprehensive risk management.',
        'Policy Integration: Align AI use with broader organizational policies on data governance, security, privacy, and ethics. AI governance should not exist in isolation but should connect to existing organizational frameworks. Document how AI-specific policies interact with enterprise risk management, information security, privacy, procurement, and compliance policies. This integration ensures consistency in risk approach and leverages existing controls where appropriate.',
        'Audit Mechanisms: Use audit trails and logs for accountability throughout the AI lifecycle. Implement technical logging to capture key model behaviors, data access, and system changes. Document decision points, approvals, and policy exceptions. For high-impact systems, consider implementing immutable audit trails to prevent tampering. Automated monitoring and alerting should complement human review processes to flag anomalies or policy violations.',
        'Ethical & Legal Oversight: Ensure adherence to AI governance frameworks, ethical guidelines, and legal mandates. Develop processes to monitor evolving regulations and standards in AI governance. Conduct regular compliance assessments against applicable laws, regulations, and ethical frameworks. Document how system design and operational controls address specific requirements, and maintain evidence of compliance for potential regulatory review.',
        'Transparency Practices: Share relevant risk insights with internal and external stakeholders through appropriate channels. Determine what information should be shared with different stakeholder groups—from technical details for regulators to accessible summaries for affected communities. For public-facing systems, publish appropriate documentation about system purpose, capabilities, limitations, and governance. For internal systems, ensure decision-makers understand key risk factors and controls.'
      ]
    }
  ]
};

// Enhanced model recommendations based on different combinations with specific ML models
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

// Questionnaires
const QUESTIONNAIRES = {
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
  ],
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
  ],
  [AI_MODULES.RESPONSIBLE_AI]: [
    {
      question: "Does your dataset reflect diverse populations with disaggregated metrics?",
      options: ["Yes, comprehensive diversity", "Moderate diversity", "Limited diversity", "Not evaluated"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Have you performed fairness audits using metrics like disparate impact?",
      options: ["Yes, comprehensive audits", "Initial audits completed", "Planned but not executed", "No audits"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Is your system compliant with relevant privacy regulations?",
      options: ["Yes, fully compliant", "Mostly compliant", "Partially compliant", "Compliance not verified"],
      category: "Privacy & Security",
      weight: 1
    },
    {
      question: "Do you employ privacy-enhancing technologies (anonymization, differential privacy)?",
      options: ["Yes, multiple techniques", "Limited techniques", "Exploring options", "No techniques used"],
      category: "Privacy & Security",
      weight: 1
    },
    {
      question: "Do you provide detailed documentation of model architecture and training?",
      options: ["Yes, comprehensive documentation", "Partial documentation", "Basic documentation", "Limited or no documentation"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Is responsibility for AI system performance clearly assigned?",
      options: ["Yes, clear ownership", "Partial ownership defined", "Informal ownership", "No defined ownership"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Do you maintain audit trails for model outputs and changes?",
      options: ["Yes, comprehensive logs", "Partial logging", "Limited logging", "No logging"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Have you evaluated system performance under edge cases and attacks?",
      options: ["Yes, comprehensive testing", "Limited testing", "Basic testing", "No testing"],
      category: "Robustness & Reliability",
      weight: 1
    },
    {
      question: "Do you monitor for model drift and retrain as needed?",
      options: ["Yes, continuous monitoring", "Periodic monitoring", "Ad-hoc monitoring", "No monitoring"],
      category: "Robustness & Reliability",
      weight: 1
    },
    {
      question: "Have you established fallback strategies for system failure?",
      options: ["Yes, comprehensive strategies", "Basic strategies", "Minimal planning", "No strategies"],
      category: "Robustness & Reliability",
      weight: 1
    },
    {
      question: "Do you apply fairness-aware methods during model training and evaluation?",
      options: ["Yes, multiple fairness constraints", "Basic fairness techniques", "Under consideration", "No fairness constraints"],
      category: "Bias & Fairness", 
      weight: 1
    },
    {
      question: "Do you evaluate model behavior across different subgroups to identify performance disparities?",
      options: ["Yes, comprehensive subgroup analysis", "Basic demographic analysis", "Limited analysis", "No subgroup analysis"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Do you have established procedures to detect and resolve inequitable results?",
      options: ["Yes, formal mitigation protocols", "Basic remediation processes", "Ad-hoc approaches", "No formal procedures"],
      category: "Bias & Fairness",
      weight: 1
    },
    {
      question: "Do you restrict access to models and outputs to authorized individuals?",
      options: ["Yes, robust access controls", "Basic access restrictions", "Limited controls", "No specific access controls"],
      category: "Privacy & Security",
      weight: 1
    },
    {
      question: "Do you conduct third-party security reviews and penetration testing?",
      options: ["Yes, regular external audits", "Occasional third-party reviews", "Internal testing only", "No security audits"],
      category: "Privacy & Security",
      weight: 1
    },
    {
      question: "Do you offer explanations tailored to different stakeholder groups?",
      options: ["Yes, audience-specific explanations", "General explanations available", "Limited explanations", "No explanations provided"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Do you incorporate interpretability tools (SHAP, LIME, counterfactuals) for complex models?",
      options: ["Yes, multiple interpretability methods", "Basic interpretability features", "Under consideration", "No interpretability tools"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Do you use accessible, non-technical language for public understanding?",
      options: ["Yes, layered communication approach", "Somewhat accessible language", "Primarily technical language", "No public communications"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Do you maintain up-to-date documentation throughout development and deployment?",
      options: ["Yes, continuous documentation updates", "Periodic updates", "Infrequent updates", "Static documentation"],
      category: "Transparency & Explainability",
      weight: 1
    },
    {
      question: "Do you allow users to contest or appeal AI-generated decisions?",
      options: ["Yes, formal appeal process", "Basic feedback mechanism", "Limited recourse", "No appeal process"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Are models reviewed by internal or external ethics boards?",
      options: ["Yes, formal ethics reviews", "Some ethical oversight", "Ad-hoc consultations", "No ethics reviews"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Do you publish contact, policy, and impact information for accountability?",
      options: ["Yes, comprehensive public information", "Basic contact information", "Limited information", "No public information"],
      category: "Accountability",
      weight: 1
    },
    {
      question: "Do you validate system behavior in varied and real-world contexts?",
      options: ["Yes, extensive real-world testing", "Limited field testing", "Controlled testing only", "No environmental testing"],
      category: "Robustness & Reliability",
      weight: 1
    },
    {
      question: "Do you confirm model stability prior to deployment?",
      options: ["Yes, rigorous pre-deployment validation", "Basic stability testing", "Limited testing", "No specific stability testing"],
      category: "Robustness & Reliability",
      weight: 1
    }
  ],
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
                  <h3 className="font-medium mb-2">Module Progress</h3>
                  {Object.entries(AI_MODULES_INFO).map(([key, value]) => {
                    const moduleAnswers = answers[key];
                    const questionsAnswered = Object.keys(moduleAnswers).length;
                    const totalQuestions = QUESTIONNAIRES[key].length;
                    const progressPercentage = Math.round((questionsAnswered / totalQuestions) * 100);
                    
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
