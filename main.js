// variable for url of photo collection
var appURL = 'http://small-tiyfe.herokuapp.com/collections/insta-dana'


// assign html element variables
var imageURL = $('.image-url');
var imageCaption = $('.caption');

var urlError = $('#url-error');
var captionError = $('#caption-error');

// event handler for form's submit button
$('form').submit(function(e) {
	// prevent default form event behavior
	e.preventDefault();
	
	// define a variable to validate form fields, but don't assign it a value
	var validation;
	
	// sets default values to a hard-coded space (to keep sizes consistent)
	urlError.html('&nbsp;');
	captionError.html('&nbsp;');
	
	// use lastIndexOf to search for substring 'http://' or 'https://' starting from index 0 and counting backwards
	// By counting backwards, you can make sure the substring is at the beginning of the searched string 
	if(imageURL.val().trim().lastIndexOf('http://', 0) === -1 && imageURL.val().lastIndexOf('https://', 0) === -1) {
		// display this error in the HTML
		urlError.html('URL must begin with \'http://\' or \'https://.\'');
		// set validation variable to false. If true, move on to next step
		validation = false;
	} 

	// check to make sure the value of the caption field is not falsy
	if(!imageCaption.val().trim()) {
		// display this error in HTML
		captionError.html('Caption field cannot be blank');
		// set validation to false. If true, move on to next step
		validation = false;
	}

	// if either if statement returned false, stop doing things.
	if(validation === false) {
		return;
	}

	// create an object containing user input as values
	var userInput = {
	image:  imageURL.val(),
	caption:  imageCaption.val()
	}
	
	// clear input field text
	$('.image-url').val('');
	$('.caption').val('');

	$.ajax({
		url: appURL,
		type: 'POST',
		data: userInput,
		dataType: 'json',
		success: function(data) {
			//console.log(data);
		},
		error: function(err) {
			console.log('something went horribly wrong here.');
		} 
	});

	// clear html content (so you don't get duplicate content)
	$('section').html('');

	// send get request
	$.ajax(getSettings);

});

// settings for GET
var getSettings = {
	url: appURL,
	type: 'GET',
	dataType: 'json',
	success: function(data) {
		data.forEach(function(imageObject) {
			var container = $('<div class="image-content"></div>');
			var instaImage = $('<img>', {src: imageObject.image});
			var instaCaption = $('<p class="image-caption"></p>').html(imageObject.caption);
		
			$('section').append(container);
			container.append(instaImage);
			container.append(instaCaption);
		});

		
	},
	error: function(err) {
		console.log('something went horribly wrong here.')
	}
}

// sent get request
$.ajax(getSettings);

// show or hide form
$('#dropdown').click(function(e) {
	if($('form').is(':hidden')) {
		$('form').slideDown(1000);
	} else {
		$('form').slideUp(1000);
	}

})

// clear input values and error messages on cancel
$('#cancel-btn').click(function() {
    imageURL.val('');
	imageCaption.val('');
	urlError.html('&nbsp;');
	captionError.html('&nbsp;');
});	