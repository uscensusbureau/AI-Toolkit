function ModuleProgressComponent({ AI_MODULES_INFO, answers, QUESTIONNAIRES }) {

	return(
		<>
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
		</>
	)
}

export default ModuleProgressComponent;