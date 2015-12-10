/*
This is empty on purpose! Your code to build the resume will go here.
 */
function createResume() {
	bio.display();
	work.display();
/*
	 education.display();
	 projects.display();*/
}

function appendReplaceElement(element_id, html_element, replacement) {
	return $(html_element.replace('%data%', replacement)).appendTo(element_id);
}
/*
var bio = {
	'name': 'The Doctor',
	'role': 'Timelord',
	'contacts': {
		'mobile': '321-TARDIS',
		'email': 'timelord@tardis.galifrey',
		'github': 'https://github.com/Vaelor',
		'twitter': 'unavailable'
	},
	'location': 'All of time and space',
	'welcomeMessage': 'Yes, it\'s bigger on the inside then the outside!',
	'skills': 'Professional with a sonic Screwdriver',
	'biopic': 'http://i.telegraph.co.uk/multimedia/archive/03010/doctor_who_capaldi_3010171b.jpg',
	'display': function() { showBio(); }
}; */
function showBio() {
	var data = HTMLResumeElements.contactElements;
	appendReplaceElement('#header', data.HTMLheaderName, bio.name);
	appendReplaceElement('#header', data.HTMLheaderRole, bio.role);
	appendReplaceElement('#header', data.HTMLwelcomeMsg, bio.welcomeMessage);
	//$('#header').append(data.HTMLcontactGeneric.replace());
	appendReplaceElement('#header', data.HTMLmobile, bio.contacts.mobile);
	appendReplaceElement('#header', data.HTMLemail, bio.contacts.email);
	appendReplaceElement('#header', data.HTMLtwitter, bio.contacts.twitter);
	appendReplaceElement('#header', data.HTMLgithub, bio.contacts.github);
	appendReplaceElement('#header', data.HTMLblog, bio.contacts.blog);
	//appendReplaceElement('#header', data.HTMLbioPic, bio.biopic);
	$('#header').append(data.HTMLskillsStart);
	appendReplaceElement('#header', data.HTMLskills, bio.skills);
}


function showWork() {
	var data = HTMLResumeElements.workElements;
	for (job in work.jobs) {
		if (_.has(work.jobs, job)) {
			$('#workExperience').append(data.HTMLworkStart);
			var employerAndTitle = data.HTMLworkEmployerAndTitle.replace('%data%', work.jobs[job].employer);
			appendReplaceElement('#workExperience', employerAndTitle, work.jobs[job].title);
			appendReplaceElement('#workExperience', data.HTMLworkDates, work.jobs[job].dates);
			appendReplaceElement('#workExperience', data.HTMLworkLocation, work.jobs[job].location);
			appendReplaceElement('#workExperience', data.HTMLworkDescription, work.jobs[job].description);
		}
	}
}

/*
var education = {
	'schools': [
		{
			'name': 'Springfield Elementary School',
			'location': '19 Plympton Street, Springfield, Earth',
			'degree': 'El Barto',
			'majors': [
				'02.02.2020',
				'http://simpsons.wikia.com/wiki/Springfield_Elementary_School'
			]
		},
		{
			'name': 'AnotherSchool',
			'location': 'somewhere else 1, atAnotherplace, inAnotherCountry, not Earth',
			'degree': 'Another Degree',
			'majors': [
				'03.03.2030',
				'http://invalid:url.com'
			]
		},
		{
			'name': 'School of Time Travel',
			'location': 'Arcadia, Gallifrey',
			'degree': 'Wibbley Wobbley, Timey Wimey - Degree',
			'majors': [
				'04.04.2040',
				'http://tardis.wikia.com/wiki/Arcadia_(city)'
			]
		}
	],
	'onlineCourses': [
		{
			'title': 'How not to give away private data',
			'school': 'privacy school',
			'date': '05.05.2060',
			'url': 'https://www.youtube.com/watch?v=9sJUDx7iEJw'
		},
		{
			'title': 'Bad Webcomics',
			'school': 'Institute of not funny',
			'date': '01.04.2050',
			'url': 'https://www.youtube.com/watch?v=jKz-2mWgLFY'
		}
	],

	'display': function() { showEducation(); }
}; */

function showEducation() {
/*	var data = HTMLResumeElements.schoolElement;
	for (job in work.jobs) {
		if (_.has(work.jobs, job)) {
			$('#workExperience').append(data.HTMLworkStart);
			var employerAndTitle = data.HTMLworkEmployerAndTitle.replace('%data%', work.jobs[job].employer);
			appendReplaceElement('#workExperience', employerAndTitle, work.jobs[job].title);
			appendReplaceElement('#workExperience', data.HTMLworkDates, work.jobs[job].dates);
			appendReplaceElement('#workExperience', data.HTMLworkLocation, work.jobs[job].location);
			appendReplaceElement('#workExperience', data.HTMLworkDescription, work.jobs[job].description);
		}
	}*/
}

function showProjects() {

}

createResume();