import AI_MODULES from './modules'
import QUESTIONS_MAPPING from './questions/questions-mapping'
import QUESTIONS_RAI from './questions/questions-rai'
import QUESTIONS_REGULATION from './questions/questions-regulation'
import QUESTIONS_OMB from './questions/questions-regulation-omb'
import QUESTIONS_EO from './questions/questions-regulation-eo'
import QUESTIONS_RISK from './questions/questions-risk'

const QUESTIONNAIRES = {
  [AI_MODULES.MAPPING]: QUESTIONS_MAPPING[AI_MODULES.MAPPING],
  [AI_MODULES.RESPONSIBLE_AI]: QUESTIONS_RAI[AI_MODULES.RESPONSIBLE_AI],
  [AI_MODULES.REGULATION]: QUESTIONS_REGULATION[AI_MODULES.REGULATION],
  [AI_MODULES.OMB]: QUESTIONS_OMB[AI_MODULES.OMB],
  [AI_MODULES.EO]: QUESTIONS_EO[AI_MODULES.EO],
  [AI_MODULES.RISK]: QUESTIONS_RISK[AI_MODULES.RISK],
};

export default QUESTIONNAIRES
