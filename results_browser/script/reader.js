// Check for the various File API support
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // hurray
} else {
  alert('Sorry, your browser is not supported. Try a current version of say, Firefox.');
}

window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');
	var nextButton = document.getElementById('next');
	var previousButton = document.getElementById('previous');
	var debugArea = document.getElementById('debugArea');
	var iframeDisplay = document.getElementById('iframeDisplay');
	var currentItem = document.getElementById('currentItem');
	var controls = document.getElementById('controls');
	var currentIframe = null;

	fileInput.addEventListener('change', function() {

		var resultsList = document.getElementById('resultsList');
		var currentIframe = document.getElementById("currentIframe");
		var file = fileInput.files[0];
		var textType = /^text\/plain/;
		var current_position = 0;
		var index;
		var lines;

		if (currentIframe != null) {
			console.log("deleting currentIframe");
			document.getElementById("currentIframe").remove();
		}
		
		if (file.type.match(textType)) {
			var reader = new FileReader();
			var errors = document.getElementById('errors');

			// delete existing error messages if they exist
			if (errors != null) {
				document.getElementById('errors').remove();
			}

			// read in file
			reader.readAsText(file);

			reader.onload = function() {
				
				// create an array of each line of the file
				lines = this.result.split('\n');

				// unhide controls and results link
				controls.style.visibility = 'visible';
				showResults.style.visibility = 'visible';

				// create iframe, set id, set initial frame src
				var iframe = document.createElement('iframe');
				iframe.setAttribute('id', 'currentIframe');
				iframeDisplay.appendChild(iframe);
				document.getElementById('currentIframe').src = "http://" + lines[current_position];

				// set currentItem text
				currentItem.innerHTML = lines[current_position];

				// list results
				fileDisplayArea.innerHTML = reader.result;

			}

			// create handler on "previous" button clicks
			previousButton.addEventListener('click', function() {
				current_position -= 1;
				currentItem.innerHTML = lines[current_position]; // set currentItem text
				document.getElementById('currentIframe').src = "http://" + lines[current_position]; //set new iframe src
			});

			
			// create handler on "next" button clicks
			nextButton.addEventListener('click', function() {
				current_position += 1;
				currentItem.innerHTML = lines[current_position]; // set currentItem text
				document.getElementById('currentIframe').src = "http://" + lines[current_position]; // set new iframe src
			});

			// show/hide all results
			showResults.addEventListener('click', function() {
				if (resultsList.style.visibility == 'visible') {
					resultsList.style.visibility = 'hidden';
					fileDisplayArea.style.display = 'none';
					console.log("hidden");
					return;
				} else {
					resultsList.style.visibility = 'visible';
					fileDisplayArea.style.display = 'block';
					console.log("shown");
					return;
				}
			});

		} else {
			errors = document.getElementById('errors').innerHTML = "<br />This is not the file you're looking for... ";
		}
	});
}