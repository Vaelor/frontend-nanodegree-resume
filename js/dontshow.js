// Notice how all of a sudden there's JavaScript inside this HTML
// document? You can write JavaScript between <script> tags. At the end of your
// JavaScript, don't forget the closing script tag with the slash (/).


// Also, this is a JavaScript style comment. You can comment in JavaScript with:

//   two slashes for all following characters on a single line, or

/*
 an opening and closing set of slash asterisks for block comments.
 */


if (document.getElementsByClassName('flex-item').length === 0) {
	document.getElementById('topContacts').style.display = 'none';
}
if (document.getElementsByTagName('h1').length === 0) {
	document.getElementById('header').style.display = 'none';
}
if (document.getElementsByClassName('work-entry').length === 0) {
	document.getElementById('workExperience').style.display = 'none';
}
if (document.getElementsByClassName('project-entry').length === 0) {
	document.getElementById('projects').style.display = 'none';
}
if (document.getElementsByClassName('education-entry').length === 0) {
	document.getElementById('education').style.display = 'none';
}
if (document.getElementsByClassName('flex-item').length === 0) {
	document.getElementById('lets-connect').style.display = 'none';
}
if (document.getElementById('map') === null) {
	document.getElementById('mapDiv').style.display = 'none';
}