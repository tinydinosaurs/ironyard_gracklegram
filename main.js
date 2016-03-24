// variable for url of photo collection
var appURL = 'http://small-tiyfe.herokuapp.com/collections/insta-dana'

// storing user input in two variables, one for each input field
var imageInput = $('.image-url');
var captionInput = $('.caption');



// console.log(userInput)
// create array to store user input objects
var imageCollection  = [];

function collectImageEntries(entry) {
	imageCollection.push(entry);
	// console.log(imageCollection);
}

// settings for POST
var postSettings = {
	url: appURL,
	type: 'POST',
	dataType: 'json',
	success: function(data) {
		console.log(data);
	},
	error: function(err) {
		console.log('something went horribly wrong here.');
	}
}

// $.ajax(postSettings);

// settings for GET
var getSettings = {
	url: appURL,
	type: 'GET',
	dataType: 'json',
	success: function(data) {
		console.log(data)
	},
	error: function(err) {
		console.log('something went horribly wrong here.')
	}
}

// make it happen!
$.ajax(getSettings);

$('form').submit(function(e) {
	e.preventDefault();
	// create object containing user input as values
	var userInput = {
	image: imageInput.val(),
	caption: captionInput.val()
}
	collectImageEntries(userInput);
	console.log(userInput);

});

