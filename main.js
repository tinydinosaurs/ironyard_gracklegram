// variable for url of photo collection
var appURL = 'http://small-tiyfe.herokuapp.com/collections/insta-dana'


$('form').submit(function(e) {
	e.preventDefault();
	// create object containing user input as values
	

	var userInput = {
	image:  $('.image-url').val(),
	caption:  $('.caption').val()
	}
	
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
