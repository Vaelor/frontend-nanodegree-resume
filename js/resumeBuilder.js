var education = {
	"schools": [
		{
			"name": "Springfield Elementary School",
			"location": "19 Plympton Street, Springfield, Earth",
			"degree": "El Barto",
			"majors": ["How to behave"],
			"dates": 2020,
			"url": "http://simpsons.wikia.com/wiki/Springfield_Elementary_School"
		},
		{
			"name": "AnotherSchool",
			"location": "Earth",
			"degree": "Another Degree",
			"majors": ["The Alphabet"],
			"dates": 2030,
			"url": "http://invalid:url.com"
		},
		{
			"name": "School of Time Travel",
			"location": "Arcadia, Gallifrey",
			"degree": "Wibbley Wobbley, Timey Wimey - Degree",
			"majors": ["Time Travel"],
			"dates": 2040,
			"url": "http://tardis.wikia.com/wiki/Arcadia_(city)"
		}
	],
	"onlineCourses": [
		{
			"title": "How not to give away private data",
			"school": "privacy school",
			"date": "05.05.2060",
			"url": "https://www.youtube.com/watch?v=9sJUDx7iEJw"
		},
		{
			"title": "Bad Webcomics",
			"school": "Institute of not funny",
			"date": "01.04.2050",
			"url": "https://www.youtube.com/watch?v=jKz-2mWgLFY"
		}
	]
};


var bio = {
	"name": "The Doctor",
	"role": "Timelord",
	"contacts": {
		"mobile": "321-TARDIS",
		"email": "timelord@tardis.galifrey",
		"github": "https://github.com/Vaelor",
		"twitter": "unavailable",
		"blog": "I don't have a blog",
		"location": "All of time and space"
	},
	"welcomeMessage": "Yes, it's bigger on the inside then the outside!",
	"skills": ["Professional with a sonic Screwdriver", "Creating Fake Profiles"],
	"biopic": "http://i.telegraph.co.uk/multimedia/archive/03010/doctor_who_capaldi_3010171b.jpg"
};

var projects = {
	"projects": [
		{
			"title": "FakeProject1",
			"dates": "1900 - 1999",
			"description": "A fake project with 3 piotures! Awesome.",
			"images": [
				"images/projects/clouds_extra_small.jpg",
				"images/projects/flowers_extra_small.jpg",
				"images/projects/ground_extra_small.jpg"
			]
		},
		{
			"title": "FakeProject2",
			"dates": "2000 - 2090",
			"description": "Another Fake Project 2 Pictures.",
			"images": [
				"images/projects/landscape_extra_small.jpg",
				"images/projects/main_extra_small.jpg"
			]
		}
	]
};

var work = {
	"jobs": [
		{
			"employer": "Independent",
			"title": "Winning the Time War",
			"location": "California",
			"dates": "All of Time and Space",
			"description": "Winning the Time War."
		},
		{
			"employer": "Independent",
			"title": "Saving Earth and the Universe",
			"location": "Boston",
			"dates": "Always",
			"description": "Saving Earth and the Universe again and again."
		}
	]
};

/**
 * Fills the HTML-site when  the document is ready
 */
$(document).ready(function() {
	bio.display();
	work.display();
	education.display();
	projects.display();
	$('#mapDiv').append(HTMLresumeElements.googleMap);

	$(".nav a").on("click", function(){
		$(".nav").find(".active").removeClass("active");
		$(this).parent().addClass("active");
		$(".navbar-collapse").collapse('hide');
	});
});


/**
 * Replace a placeholder in a string and append it to an existing DOM element
 * @param {string} elementId - the DOM element to append to
 * @param {string} htmlElement - the element to be appended, with placeholders
 * @param {string|Array} replacements - The value or values to replace in the string
 * @param {string=} placeholder - what the placeholder looks like
 * @returns {string|HTMLElement} - On Success return the appended/modified HTMLElement, else the old one
 */
function appendReplaceElement(elementId, htmlElement, replacements, placeholder) {
	if (_.isUndefined(placeholder)) {
		placeholder = '%data%';
	}
	/* If I have multiple elements in the string to replace go trough all of them one by one */
	if (_.isArray(replacements)) {
		replacements.forEach(function(replacement) {
			htmlElement = htmlElement.replace(placeholder, replacement);
		});
		return $(htmlElement).appendTo(elementId);
	/* Else I assume I only have one, if it is not undefined */
	} else if (!_.isUndefined(replacements)) {
		return $(htmlElement.replace(placeholder, replacements)).appendTo(elementId);
	}
	/* I return the unmodified string in case anything goes wrong, so that at least not the whole site breaks */
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
	_.forEach(work.jobs, function (job) {
		$('#workExperience').append(data.HTMLworkStart);
		appendReplaceElement('.work-entry:last', data.HTMLworkEmployerAndTitle, [job.employer, job.title]);
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
