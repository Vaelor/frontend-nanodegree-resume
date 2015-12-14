/*
I merged the elements into one object, because in my opinion it seems logical to me to group these
elements, adding readability.
Also no Namespace cluttering (not that I would use HTMLheaderName as a variable name
very often, but why add so many global variables to it)

I also merged some elements, for example the HTMLworkEmployer and HTMLworkTitle.
This way I always have complete elements. which also enables me to use my appendReplaceElement function.
*/
var HTMLresumeElements = {
	contactElements: {
		HTMLheaderName: '<h1 id="name">%data%</h1>',
		HTMLheaderRole: '<span>%data%</span><hr>',
		HTMLcontactsCategorie: '<ul id="topContacts" class="flex-box"></ul>',
		HTMLcontactGeneric: '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>',
		HTMLmobile: '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>',
		HTMLemail: '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>',
		HTMLtwitter: '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>',
		HTMLgithub: '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>',
		HTMLblog: '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>',
		HTMLlocation: '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>',
		HTMLbioPic: '<img src="%data%" class="biopic">',
		HTMLwelcomeMsg: '<span class="welcome-message">%data%</span>',
		HTMLskillsStart: '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>',
		HTMLskills: '<li class="flex-item"><span class="white-text">%data%</span></li>'
	},

	workElements: {
		HTMLworkStart: '<div class="work-entry"></div>',
		HTMLworkEmployerAndTitle: '<a href="#">%data%  - %data%</a>',
		HTMLworkDates: '<div class="date-text">%data%</div>',
		HTMLworkLocation: '<div class="location-text">%data%</div>',
		HTMLworkDescription: '<p><br>%data%</p>'
	},

	projectElements: {
		HTMLprojectStart: '<div class="project-entry"></div>',
		HTMLprojectTitle: '<a href="#">%data%</a>',
		HTMLprojectDates: '<div class="date-text">%data%</div>',
		HTMLprojectDescription: '<p><br>%data%</p>',
		HTMLprojectImage: '<img src="%data%">'
	},

	schoolElement: {
		HTMLschoolStart: '<div class="education-entry"></div>',
		HTMLschoolNameAndDegree: '<a href="#">%data% -- %data%</a>',
		HTMLschoolDates: '<div class="date-text">%data%</div>',
		HTMLschoolLocation: '<div class="location-text">%data%</div>',
		HTMLschoolMajor: '<em><br>Major: %data%</em>'
	},

	onlineElement: {
		HTMLonlineStart: '<div class="education-entry"></div>',
		HTMLonlineClasses: '<h3>Online Classes</h3>',
		HTMLonlineTitleAndSchool: '<a href="#">%data% - %data%</a>',
		HTMLonlineDates: '<div class="date-text">%data%</div>',
		HTMLonlineURL: '<br><a href="#">%data%</a>'
	},

	googleMap: '<div id="map"></div>'
};


/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

	var locations;

	var infoWindow;

	var mapOptions = {
		disableDefaultUI: true
	};

	/*
	For the map to be displayed, the googleMap var must be
	appended to #mapDiv in resumeBuilder.js.
	*/
	map = new google.maps.Map(document.querySelector('#map'), mapOptions);

	/*
	locationFinder() returns an array of every location string from the JSONs
	written for bio, education, and work.
	*/
	function locationFinder() {

		// initializes an empty array
		var locations = [];

		// adds the single location property from bio to the locations array
		locations.push(bio.contacts.location);

		// iterates through school locations and appends each location to
		// the locations array
		for (var school in education.schools) {
			if (education.schools.hasOwnProperty(school)) {
				locations.push(education.schools[school].location);
			}
		}

		// iterates through work locations and appends each location to
		// the locations array
		for (var job in work.jobs) {
			if (work.jobs.hasOwnProperty(job)) {
				locations.push(work.jobs[job].location);
			}
		}

		return locations;
	}

	/*
	createMapMarker(placeData) reads Google Places search results to create map pins.
	placeData is the object returned from search results containing information
	about a single location.
	*/
	function createMapMarker(placeData) {

		// The next lines save location data from the search result object to local variables
		var lat = placeData.geometry.location.lat();  // latitude from the place service
		var lon = placeData.geometry.location.lng();  // longitude from the place service
		var name = placeData.formatted_address;   // name of the place from the place service
		var bounds = window.mapBounds;            // current boundaries of the map window

		// marker is an object with additional data about the pin for a single location
		var marker = new google.maps.Marker({
		  map: map,
		  position: placeData.geometry.location,
		  title: name
		});

		/* If an infoWindow already exists, close it first */
		if (!_.isUndefined(infoWindow)) {
			infoWindow.close();
		}
		// infoWindows are the little helper windows that open when you click
		// or hover over a pin on a map. They usually contain more information
		// about a location.
		infoWindow = new google.maps.InfoWindow({
		  content: name
		});

		// hmmmm, I wonder what this is about...
		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.open(map, marker);
		});

		// this is where the pin actually gets added to the map.
		// bounds.extend() takes in a map location object
		bounds.extend(new google.maps.LatLng(lat, lon));
		// fit the map to the new marker
		map.fitBounds(bounds);
		// center the map
		map.setCenter(bounds.getCenter());
	}

	/*
	callback(results, status) makes sure the search returned results for a location.
	If so, it creates a new map marker for that location.
	*/
	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMapMarker(results[0]);
		}
	}

	/*
	pinPoster(locations) takes in the array of locations created by locationFinder()
	and fires off Google place searches for each location
	*/
	function pinPoster(locations) {

		// creates a Google place search service object. PlacesService does the work of
		// actually searching for location data.
		var service = new google.maps.places.PlacesService(map);

		// Iterates through the array of locations, creates a search object for each location
		for (var place in locations) {
			if (locations.hasOwnProperty(place)) {
				// the search request object
				var request = {
					query: locations[place]
				};

				// Actually searches the Google Maps API for location data and runs the callback
				// function with the search results after each search.
				service.textSearch(request, callback);
			}
		}
	}

	// Sets the boundaries of the map based on pin locations
	window.mapBounds = new google.maps.LatLngBounds();

	// locations is an array of location strings returned from locationFinder()
	locations = locationFinder();

	// pinPoster(locations) creates pins on the map for each location in
	// the locations array
	pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});
