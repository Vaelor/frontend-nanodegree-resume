/*
This is empty on purpose! Your code to build the resume will go here.
 */
function createResume() {
	showHeader();
	work.display();
	/*	bio.display();
	 education.display();
	 projects.display();*/
}

function appendReplaceElement(element_id, html_element, replacement) {
	return $(html_element.replace('%data%', replacement)).appendTo(element_id);
}


function showHeader() {
	appendReplaceElement('#header', HTMLResumeElements.HTMLheaderName, "Christian");
	appendReplaceElement('#header', HTMLResumeElements.HTMLheaderRole, "Something software");
}


function showWork() {

	for (job in work.jobs) {
		if (_.has(work.jobs, job)) {
			$('#workExperience').append(HTMLResumeElements.HTMLworkStart);
			var employerAndTitle = HTMLResumeElements.HTMLworkEmployerAndTitle.replace('%data%', work.jobs[job].employer);
			appendReplaceElement('#workExperience', employerAndTitle, work.jobs[job].title);
			appendReplaceElement('#workExperience', HTMLResumeElements.HTMLworkDates, work.jobs[job].dates);
			appendReplaceElement('#workExperience', HTMLResumeElements.HTMLworkLocation, work.jobs[job].location);
			appendReplaceElement('#workExperience', HTMLResumeElements.HTMLworkDescription, work.jobs[job].description);
		}
	}
}

createResume();