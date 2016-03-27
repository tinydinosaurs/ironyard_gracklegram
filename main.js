// variable for url of photo collection
var appURL = 'http://small-tiyfe.herokuapp.com/collections/insta-dana'


// assign html element variables
var imageURL = $('.image-url');
var imageCaption = $('.caption');

var urlError = $('#url-error');
var captionError = $('#caption-error');

$('form').submit(function(e) {
	e.preventDefault();
	var validation;
	urlError.html('&nbsp;');
	captionError.html('&nbsp;');
	if(imageURL.val().trim().lastIndexOf('http://', 0) === -1 && imageURL.val().lastIndexOf('https://', 0) === -1) {
		urlError.html('URL must begin with \'http://\' or \'https://.\'');
		validation = false;
	} 

	if(!imageCaption.val().trim()) {
		captionError.html('Caption field cannot be blank');
		validation = false;
	}

	if(validation === false) {
		return;
	}

	// create an object containing user input as values
	var userInput = {
	image:  imageURL.val(),
	caption:  imageCaption.val()
	}
	
	$('.image-url').val('');
	$('.caption').val('');

	// $.ajax({
	// 	url: appURL,
	// 	type: 'POST',
	// 	data: userInput,
	// 	dataType: 'json',
	// 	success: function(data) {
	// 		//console.log(data);
	// 	},
	// 	error: function(err) {
	// 		console.log('something went horribly wrong here.');
	// 	} 
	// });

	$('section').html('');
	$.ajax(getSettings);

});

// settings for GET
var getSettings = {
	url: appURL,
	type: 'GET',
	dataType: 'json',
	success: function(data) {
		//console.log(data);
		data.forEach(function(imageObject) {
			var container = $('<div class="image-content"></div>');
			var instaImage = $('<img>', {src: imageObject.image});
			var instaCaption = $('<p class="image-caption"></p>').html(imageObject.caption);
		
			// console.log(container, instaImage, instaCaption);
			$('section').append(container);
			container.append(instaImage);
			container.append(instaCaption);
		});

		
	},
	error: function(err) {
		console.log('something went horribly wrong here.')
	}
}

$.ajax(getSettings);


// console.log(userInput)
// create array to store user input objects
// var imageCollection  = [];

// function collectImageEntries(entry) {
// 	imageCollection.push(entry);
// 	// console.log(imageCollection);
// }





// var imageURL = $('.image-url');
// var imageCaption =   $('.caption');
// var urlError = $('#URL-error');
// var captionError = $('caption-error');

// function validationError() {
// 	if()
// }
