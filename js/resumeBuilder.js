function createResume() {
	bio.display();
	work.display();
	education.display();
	projects.display();
	$('#mapDiv').append(HTMLresumeElements.googleMap);
	$('#main').append(HTMLresumeElements.internationalizeButton);
	hideAll('#workExperience');

	$('#tabWork').on('click', function() {
		hideAll('#workExperience');
	});
	$('#tabProjects').on('click', function() {
		hideAll('#projects');
	});
	$('#tabEducation').on('click', function() {
		hideAll('#education');
	});
	$('#tabMap').on('click', function() {
		hideAll('#mapDiv');
	});

	$(".nav a").on("click", function(){
		$(".nav").find(".active").removeClass("active");
		$(this).parent().addClass("active");
	});
}

/**
 * Hides all sections
 * @param {string=} id - this id will be shown after hiding
 */
function hideAll(id) {
	$('#workExperience').hide();
	$('#projects').hide();
	$('#education').hide();
	$('#mapDiv').hide();
	if (!_.isUndefined(id)) {
		$(id).show();
	}
}


/**
 * Replace a placeholder in a string and append it to an existing DOM element
 * @param {string} elementId - the DOM element to append to
 * @param {string} htmlElement - the element to be appended, with placeholders
 * @param {string|Array} replacements - The value or values to replace in the string
 * @param {string=} placeholder - what the placeholder looks like
 * @returns {string|HTMLElement} - On Success return the appended HTMLElement, else the old string
 */
function appendReplaceElement(elementId, htmlElement, replacements, placeholder) {
	if (_.isUndefined(placeholder)) { placeholder = '%data%'; }
	if (_.isArray(replacements)) {
		replacements.forEach(function(replacement) {
			htmlElement = htmlElement.replace(placeholder, replacement);
		});
		return $(htmlElement).appendTo(elementId);
	} else if (!_.isUndefined(replacements)) {
		return $(htmlElement.replace(placeholder, replacements)).appendTo(elementId);
	}
	return htmlElement;
}

education.display = function() {
	var data = HTMLresumeElements.schoolElement;
	_.forEach(education.schools, function(school) {
		$('#education').append(data.HTMLschoolStart);
		appendReplaceElement('.education-entry:last', data.HTMLschoolNameAndDegree, [school.name, school.degree]);
		appendReplaceElement('.education-entry:last', data.HTMLschoolDates, school.dates);
		appendReplaceElement('.education-entry:last', data.HTMLschoolLocation, school.location);
		_.forEach(school.majors, function(major){
			appendReplaceElement('.education-entry:last', data.HTMLschoolMajor, major);
		});
	});

	data = HTMLresumeElements.onlineElement;
	$('#education').append(data.HTMLonlineClasses);
	_.forEach(education.onlineCourses, function(course){
		$('#education').append(data.HTMLonlineStart);
		appendReplaceElement('.education-entry:last', data.HTMLonlineTitleAndSchool, [course.title, course.school]);
		appendReplaceElement('.education-entry:last', data.HTMLonlineDates, course.date);
		appendReplaceElement('.education-entry:last', data.HTMLonlineURL, course.url);
	});
};

bio.display = function() {
	var data = HTMLresumeElements.contactElements;
	appendReplaceElement('#header', data.HTMLheaderName, bio.name);
	appendReplaceElement('#header', data.HTMLheaderRole, bio.role);
	$('#header').append(data.HTMLcontactsCategorie);
	appendReplaceElement('#topContacts', data.HTMLmobile, bio.contacts.mobile);
	appendReplaceElement('#topContacts', data.HTMLemail, bio.contacts.email);
	appendReplaceElement('#topContacts', data.HTMLtwitter, bio.contacts.twitter);
	appendReplaceElement('#topContacts', data.HTMLgithub, bio.contacts.github);
	appendReplaceElement('#topContacts', data.HTMLblog, bio.contacts.blog);
	appendReplaceElement('#topContacts', data.HTMLlocation, bio.contacts.location);
	appendReplaceElement('#header', data.HTMLwelcomeMsg, bio.welcomeMessage);
	appendReplaceElement('#header', data.HTMLbioPic, bio.biopic);
	$('#header').append(data.HTMLskillsStart);
	_.forEach(bio.skills, function (skill) {
		appendReplaceElement('#skills-h3', data.HTMLskills, skill);
	});
};

work.display = function() {
	var data = HTMLresumeElements.workElements;
	work.jobs.forEach(function (job) {
		$('#workExperience').append(data.HTMLworkStart);
		var employerAndTitle = data.HTMLworkEmployerAndTitle.replace('%data%', job.employer);
		appendReplaceElement('.work-entry:last', employerAndTitle, job.title);
		appendReplaceElement('.work-entry:last', data.HTMLworkDates, job.dates);
		appendReplaceElement('.work-entry:last', data.HTMLworkLocation, job.location);
		appendReplaceElement('.work-entry:last', data.HTMLworkDescription, job.description);
	});
};

projects.display = function() {
	var data = HTMLresumeElements.projectElements;
	projects.projects.forEach(function (project) {
		$('#projects').append(data.HTMLprojectStart);
		appendReplaceElement('.project-entry:last', data.HTMLprojectTitle, project.title);
		appendReplaceElement('.project-entry:last', data.HTMLprojectDates, project.dates);
		appendReplaceElement('.project-entry:last', data.HTMLprojectDescription, project.description);
		_.forEach(project.images, function (image) {
			appendReplaceElement('.project-entry:last', data.HTMLprojectImage, image);
		});
	});
};

createResume();
