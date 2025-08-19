import AI_MODULES from './modules'
import QUESTIONS_MAPPING from './questions/questions-mapping'
import QUESTIONS_RAI from './questions/questions-rai'
import QUESTIONS_REGULATION from './questions/questions-regulation'
import QUESTIONS_OMB from './questions/questions-regulation-omb'
import QUESTIONS_EO from './questions/questions-regulation-eo'
import QUESTIONS_CIPSEA from './questions/questions-regulation-cipsea'
import QUESTIONS_TITLE13 from './questions/questions-regulation-title13'
import QUESTIONS_RISK from './questions/questions-risk'

const QUESTIONNAIRES = {
  [AI_MODULES.MAPPING]: QUESTIONS_MAPPING[AI_MODULES.MAPPING],
  [AI_MODULES.RESPONSIBLE_AI]: QUESTIONS_RAI[AI_MODULES.RESPONSIBLE_AI],
  [AI_MODULES.REGULATION]: QUESTIONS_REGULATION[AI_MODULES.REGULATION],
  [AI_MODULES.OMB_M25_21]: QUESTIONS_OMB[AI_MODULES.OMB_M25_21],
  [AI_MODULES.EO_14179]: QUESTIONS_EO[AI_MODULES.EO_14179],
  [AI_MODULES.CIPSEA]: QUESTIONS_CIPSEA[AI_MODULES.CIPSEA],
  [AI_MODULES.TITLE13]: QUESTIONS_TITLE13[AI_MODULES.TITLE13],
  [AI_MODULES.RISK]: QUESTIONS_RISK[AI_MODULES.RISK],
};

export default QUESTIONNAIRES
