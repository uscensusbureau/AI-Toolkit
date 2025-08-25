import AI_MODULES from './modules'

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
  ],
  [AI_MODULES.OMB_M25_21]: [
    {
      title: 'Documentation & Assessment Requirements',
      items: [
        'System Documentation: AI systems must have clear descriptions of intended use, objectives, and expected outcomes. This documentation serves as the foundation for all other compliance activities and should be comprehensive enough to understand the system\'s purpose and scope.',
        'High-Impact Assessment: All AI systems must undergo formal assessment to determine if they qualify as high-impact use cases. This assessment should follow established criteria and methodologies, with clear documentation of the rationale for the determination.',
        'Rationale Documentation: For systems determined not to be high-impact, the reasoning must be thoroughly documented and justifiable. This documentation should address all relevant factors that led to the determination and be available for review.',
        'Pre-Deployment Testing: Systems must undergo comprehensive testing before deployment to validate they meet intended goals and mitigate foreseeable risks. Testing should be systematic, documented, and address all critical system functions and risk scenarios.'
      ]
    },
    {
      title: 'AI Impact Assessment (AIIA) Components',
      items: [
        'System Overview: The AIIA must include comprehensive documentation of system overview, objectives, and intended uses. This should provide stakeholders with a clear understanding of what the system does and how it will be used.',
        'Dataset Documentation: Complete documentation of datasets used for training and testing, including data sources, collection methods, preprocessing steps, and any limitations or biases identified in the data.',
        'Performance Metrics: Clear articulation of anticipated benefits and relevant performance metrics, including how success will be measured and what constitutes acceptable performance levels.',
        'Rights Impact Analysis: Thorough assessment of potential impacts on privacy, civil rights, and civil liberties, with particular attention to vulnerable populations and protected characteristics.',
        'Public Cost-Benefit Analysis: Documentation of expected costs and benefits to the public, including both quantitative and qualitative impacts on citizens, communities, and society.',
        'Independent Evaluation: Documentation of independent evaluation or red-teaming activities, including methodologies used, findings, and how results informed system development.',
        'Risk Documentation: Clear documentation of risk acceptance decisions and residual risks that remain after mitigation efforts, including ongoing monitoring plans.'
      ]
    },
    {
      title: 'Human Oversight & Safety Mechanisms',
      items: [
        'Human Oversight: Systems must include meaningful mechanisms for human oversight and intervention, ensuring that humans retain appropriate control over AI-driven decisions and processes.',
        'Fail-Safe Mechanisms: Implementation of documented fail-safes or fallback mechanisms to prevent or mitigate unintended failure or harm, with clear procedures for activation and response.',
        'Appeals Process: Establishment of documented processes by which individuals can appeal or seek redress if affected by decisions from the AI system, ensuring due process and fair treatment.'
      ]
    },
    {
      title: 'Monitoring & Accountability Framework',
      items: [
        'Ongoing Monitoring: Implementation of documented procedures for ongoing monitoring to detect unintended consequences after deployment, including key performance indicators and alerting mechanisms.',
        'Audit Trails: Maintenance of comprehensive audit logs or activity records sufficient to trace decisions, data processing, and automated outputs for accountability and debugging purposes.',
        'Feedback Mechanisms: Establishment of mechanisms for the public or end users to submit feedback on the AI system, ensuring continuous improvement and stakeholder engagement.'
      ]
    },
    {
      title: 'Public Transparency & Disclosure',
      items: [
        'Public Publication: The AIIA or appropriate summary must be published or made available on agency websites, ensuring transparency and public accountability for AI system deployment.',
        'Monitoring Reports: Results of ongoing monitoring must be made publicly available as required, providing transparency about system performance and any issues identified post-deployment.'
      ]
    }
  ],
  [AI_MODULES.EO_14179]: [
    {
      title: 'Ideological Bias Prevention & Technical Integrity',
      items: [
        'Bias-Free Development: AI systems must be developed free from ideological bias or engineered social agendas, with documentation and testing to verify technical objectivity in system design and implementation.',
        'Technical Risk Focus: Safety and trustworthiness assessments should focus on technical risks and performance rather than imposing ideological or extraneous constraints that could compromise system effectiveness.',
        'Objective Testing: Fairness and bias testing should be aligned to technical risks and objective performance criteria, avoiding the imposition of engineered social norms that could bias system outcomes.',
        'Evidence-Based Assessment: All evaluations should be based on empirical evidence and technical merit rather than ideological considerations, ensuring systems serve their intended technical purposes.'
      ]
    },
    {
      title: 'Strategic Alignment & National Competitiveness',
      items: [
        'National Objectives: Systems must align with goals of promoting human flourishing, economic competitiveness, and national security, with clear documentation of how each system contributes to these objectives.',
        'U.S. Leadership: Technical evaluations should align with fostering U.S. leadership in safe, trustworthy AI, ensuring American innovation and competitive advantage in AI technologies.',
        'Competitiveness Documentation: The intended benefit to U.S. competitiveness or security must be clearly documented and tied to broader strategic objectives and national AI strategy.',
        'Global Leadership: Systems should contribute to U.S. global AI leadership under the National AI Strategy, with clear linkages between individual systems and broader strategic goals.'
      ]
    },
    {
      title: 'Policy Compliance & Regulatory Efficiency',
      items: [
        'Legacy Policy Review: Systems previously subject to EO 14110 directives must be reviewed to ensure no policies inconsistent with EO 14179 still apply, with documented resolution of any conflicts.',
        'Updated Guidance Compliance: System documentation must comply with revisions to OMB M-24-10 and related documents as required by EO 14179, ensuring alignment with current policy frameworks.',
        'Risk Classification Review: Risk classifications and waivers must be reviewed under new OMB guidance to ensure appropriate categorization and treatment under updated policy requirements.',
        'Regulatory Barrier Removal: Development and deployment processes should be reviewed to ensure no undue regulatory barriers or delays inconsistent with EO 14179 objectives exist.',
        'Streamlined Procurement: Procurement and contracting processes should be executed to accelerate AI adoption and align with EO priorities, reducing unnecessary delays and obstacles.'
      ]
    },
    {
      title: 'Transparency & Documentation Standards',
      items: [
        'Public Disclosure Readiness: Systems must maintain records suitable for potential public disclosure of decision processes and rationale, ensuring transparency while protecting sensitive information.',
        'Comprehensive Audit Trails: AI systems must maintain comprehensive audit logs or provenance records to trace processing and outputs, supporting accountability and oversight requirements.',
        'Central Compliance Files: A central compliance file must be maintained for each system under EO 14179, containing all relevant documentation and compliance evidence.'
      ]
    },
    {
      title: 'Appeals & Redress Mechanisms',
      items: [
        'Individual Redress: Systems must include appeals and redress mechanisms for affected individuals, ensuring due process and fair treatment for those impacted by AI-driven decisions.',
        'Accessible Processes: Redress mechanisms should be accessible, well-documented, and provide meaningful opportunities for individuals to challenge decisions or seek relief from adverse impacts.'
      ]
    },
    {
      title: 'Agency Integration & Coordination',
      items: [
        'Agency-Wide Coordination: Compliance must be coordinated with agency-wide EO 14179 policy revisions, ensuring consistent implementation across all AI systems and activities.',
        'Compliance Portfolio: Systems must be included in agency compliance plans under EO 14179, with appropriate tracking and oversight mechanisms in place.',
        'Updated Standards Alignment: Systems must be compliant with updated agency standards post-EO 14179, ensuring ongoing alignment with evolving policy requirements.',
        'Lifecycle Management: Clear decisions must be made to continue, revise, or phase out systems under EO 14179, with appropriate documentation of rationale and implementation plans.'
      ]
    }
  ],
  [AI_MODULES.TITLE_13]: [
    {
      title: 'Data Collection & Authorized Use',
      items: [
        'Statistical Purpose Authority: Title 13 data must be collected and used exclusively for statistical purposes as defined under the statute. AI systems using this data must demonstrate that their purpose aligns with statistical analysis, research, and reporting functions authorized by Title 13.',
        'Approved Collection Methods: Data collection must follow approved questionnaires and inquiries documented under Section 5 authority. Any AI system using Title 13 data should verify that the underlying data collection was properly authorized and documented.',
        'External Data Integration: When incorporating data from federal, state, or private entities under Section 6, organizations must ensure these external sources were informed about AI system usage and that appropriate agreements are in place.',
        'Training Data Compliance: AI models must be trained exclusively on data that was approved for statistical purposes, with clear documentation that mixed-use data has been properly segregated and authorized for AI applications.'
      ]
    },
    {
      title: 'Confidentiality & Disclosure Protection',
      items: [
        'PII Identification & Protection: Systems must identify and protect all personally identifiable information within Title 13 datasets. This includes implementing technical safeguards to prevent direct or indirect disclosure of individual-level information.',
        'Aggregation & Anonymization Requirements: Any data sharing or output from AI systems must ensure information is properly aggregated or anonymized to prevent identification of individual respondents. Statistical disclosure control methods should be implemented and validated.',
        'Sworn Personnel Requirements: All personnel with access to Title 13 data through AI systems must sign sworn confidentiality agreements as required by the statute. This includes developers, data scientists, and system administrators.',
        'Legal Protection Maintenance: Datasets and system access logs must be protected from legal discovery or subpoena per Section 9 requirements. Organizations should implement appropriate legal and technical controls to maintain this protection.'
      ]
    },
    {
      title: 'AI-Specific Risk Management',
      items: [
        'Reidentification Testing: AI models using Title 13 data must undergo formal testing for reidentification and data leakage risks. This includes adversarial testing to identify potential privacy vulnerabilities specific to machine learning systems.',
        'Indirect Disclosure Assessment: Organizations must evaluate whether AI model outputs could enable indirect disclosure of Title 13 protected information through inference attacks, model inversion, or other techniques specific to AI systems.',
        'Model Output Controls: AI system outputs and summaries must be designed and validated to prevent revealing Title 13 protected data, with appropriate disclosure review procedures for all system outputs.',
        'Algorithmic Transparency Balance: While maintaining Title 13 confidentiality requirements, organizations should document AI system functionality to the extent possible without compromising data protection obligations.'
      ]
    },
    {
      title: 'Address Data & Geographic Information',
      items: [
        'Address Verification Procedures: When AI systems use address data, verification must be conducted using authorized state and local government sources, with appropriate documentation of the verification process and results.',
        'Census Liaison Coordination: Address validation activities should involve designated census liaisons when applicable, ensuring proper coordination and compliance with address confidentiality requirements.',
        'Geographic Use Restrictions: Address data in AI systems must be used solely for census operations or statistical validation purposes, not for operational or administrative functions outside Title 13 authority.',
        'Location Privacy Safeguards: AI systems processing geographic information must implement additional safeguards to prevent location-based reidentification or disclosure of sensitive demographic patterns.'
      ]
    },
    {
      title: 'Compliance Monitoring & Governance',
      items: [
        'Title 13 Compliance Review: Organizations must conduct documented Title 13 compliance reviews specifically for AI systems, addressing the unique privacy and security challenges posed by machine learning technologies.',
        'Ongoing Monitoring Systems: Implement continuous monitoring for Title 13 compliance throughout the AI system lifecycle, including automated checks for potential disclosure risks and regular compliance audits.',
        'Documentation Requirements: Maintain comprehensive documentation of Title 13 compliance measures, including data flow diagrams, privacy impact assessments, and technical safeguard implementations specific to AI systems.',
        'Incident Response Procedures: Establish clear procedures for responding to potential Title 13 violations involving AI systems, including containment measures, notification requirements, and remediation steps.'
      ]
    }
  ],
}

export default GUIDE_CONTENT
