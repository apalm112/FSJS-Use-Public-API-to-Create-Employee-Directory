/* eslint-disable */
// 	Review the Random User Generator documentation. Grab the example they provide and console.log the data so you can see what information you’ll receive and start to think about how you’ll access the correct information and display it on the page.
'use strict';

(function() {

// Object to hold the data.results Object returned from $.ajax call.
// This keeps the data accessible for rest of the script.
let cloud = {};

	function displayRandomUser(data) {
		let randoHTML = '';
		let randoHTML2 = '';
		let randoHTML3 = '';
		$.each(data.results, function(idx, picture) {
			if ( idx <= 3 ) {
				randoHTML += '<ul class="rando">';
				randoHTML += '<img src=' + data.results[idx].picture.medium + '>';
				randoHTML += '<li class="box name">' + data.results[idx].name.first + ' ' + data.results[idx].name.last + '</li>';
				randoHTML += '<li class="box">' + data.results[idx].login.username + '</li>';
				randoHTML += '<li class="box">' + data.results[idx].location.city + ', ' + data.results[idx].nat + '</li>';
			}
				randoHTML += '</ul>';
			if ( idx >= 4 && idx <= 7 ) {
				randoHTML2 += '<ul class="rando">';
				randoHTML2 += '<img src=' + data.results[idx].picture.medium + '>';
				randoHTML2 += '<li class="box name">' + data.results[idx].name.first + ' ' + data.results[idx].name.last + '</li>';
				randoHTML2 += '<li class="box">' + data.results[idx].login.username + '</li>';
				randoHTML2 += '<li class="box">' + data.results[idx].location.city + ', ' + data.results[idx].nat + '</li>';
			}
				randoHTML2 += '</ul>';
			if ( idx >= 8 ) {
				randoHTML3 += '<ul class="rando">';
				randoHTML3 += '<img src=' + data.results[idx].picture.medium + '>';
				randoHTML3 += '<li class="box name">' + data.results[idx].name.first + ' ' + data.results[idx].name.last + '</li>';
				randoHTML3 += '<li class="box">' + data.results[idx].login.username + '</li>';
				randoHTML3 += '<li class="box">' + data.results[idx].location.city + ', ' + data.results[idx].nat + '</li>';
			}
				randoHTML3 += '</ul>';
	});
		$('.grid_1').html(randoHTML);
		$('.grid_2').html(randoHTML2);
		$('.grid_3').html(randoHTML3);
	}	// end displayRandomUser()

	function displayModal(cloud) {
		// Functino to Get & Display data for the modal on user click.
		// Click on any ul elem triggers function to display THAT ul's user info.
		$('.rando').click(function() {
			var targetElement = $('.rando').index(this);
			console.log(targetElement);
			// targetElement gets the index of the employee clicked on
			buildUserModal(cloud, targetElement);
			$('.modal').fadeIn(200);
			$('.user-modal').toggleClass('out in');
		});	// end $.click()
	}	// end displayModal()

	function hideModal(data) {
		// Function hides the modal when the closing 'X' is clicked.
		$('.close').click(function() {
			emptyUserModal();
			$('.modal').fadeOut(200);
			$('.user-modal').toggleClass('out in');
		})
	}	// end hideModal()

	function buildUserModal(cloud, targetElement) {
		// Function to build the DOM elems to hold the user info
		// Creates a div to display the user info & appends to DOM
		// data attribute passes along the employee index for later use by modal icon click function.
		let userInfoDiv = '<div class="modal-user-info" data="' + targetElement + '"></div>';
		$('.user-modal').append(userInfoDiv);
		let modalHTML = '';
		modalHTML += '<ul>';
		modalHTML += '<li><img src=' + cloud.results[targetElement].picture.medium + '></li>';
		modalHTML += '<li>' + cloud.results[targetElement].name.first + ' ' +  cloud.results[targetElement].name.last + '</li>';
		// modalHTML += '<span class="icon-circle-left"></span>';
		modalHTML += '<li>' + cloud.results[targetElement].login.username + '</li>';
		// modalHTML += '<span class="icon-circle-right"></span>';
		modalHTML += '<li>' + cloud.results[targetElement].email + '</li>';
		modalHTML += '<li class="line">---------------------------------------------------------</li>';

		let cellNum = cloud.results[targetElement].cell;
		modalHTML += '<li>' + formatCell(cellNum) + '</li>';

		modalHTML += '<li>' + cloud.results[targetElement].location.street + ' ' + cloud.results[targetElement].location.city + ', ' + cloud.results[targetElement].nat + ' ' + cloud.results[targetElement].location.postcode + '</li>';

		let dobToFormat = cloud.results[targetElement].dob;
		modalHTML += '<li>Birthday: ' + formatDob(dobToFormat) + '</li>';

		modalHTML += '</ul>';

		$('.modal-user-info').html(modalHTML);
	}	// end buildUserModal()

	function emptyUserModal() {
		// Function to remove modal div of all user info, this gets the modal ready for the next time it is loaded.
		$('.modal-user-info').remove();
	}

	function formatCell(cellNum) {
		// http://regexr.com/
		const cellRegex = /\)-?/g;
		let properCellFormat = cellNum.replace(cellRegex, ') ');
		return properCellFormat;
	}

	function formatDob(dobToFormat) {
		// https://regex101.com/
		const dobRegex = /\/"\d{4}-\d{2}-\d{2}\g/;
		// const dobRegex = /\"\d{4}-\d{2}-\d{2}/;
		let properDob = dobToFormat.replace(dobRegex);
		let properDob1 = properDob.split('-', 3);
		let month = properDob1[1];
		let day = properDob1[2].slice([0], [2]);
		let year = properDob1[0].slice([2], [4]);
		let properDob2 = month + '/' + day + '/' + year;
		return properDob2;
	}

	function hoverState() {
		// Add a visual cue to the current ul of user info being hovered over.
		$('.rando').hover(function() {
			$(this).css('background', 'rgba(0,0,0,0.1)');
		}, function() {
			$(this).css('background', '#fffcf7');
			}
		);
	}



	/* ********************************************************/
	let $left = $('.icon-circle-left');
	let $right = $('.icon-circle-right');
	// let $rightIdx = $duh[0].getAttribute('data');

	function circleLeftHover() {
		$left.hover(function() {
			$(this).css({'color': '#140823'});
			$(this).css({'background': 'rgba(7,7,7,0.7)'});
			$(this).css({'border-radius': '20px'});
		}, function() {
				$(this).css({'color': '#636161'});
				$(this).css({'background': '#fffcf7'});
				$(this).css({'border-radius': ''});
		});
	}
	function circleRightHover() {
		// add a hover & click functions to control icomoons
		$right.hover(function() {
			$(this).css({'color': '#140823'});
			$(this).css({'background': 'rgba(7,7,7,0.7)'});
			$(this).css({'border-radius': '20px'});
		}, function() {
				$(this).css({'color': '#636161'});
				$(this).css({'background': '#fffcf7'});
				$(this).css({'border-radius': '20'});
		});
	}

	function clickLeftHover(cloud) {
		// On click display respective employee info in modal.
		$left.click(function() {
			// Click on any ul elem triggers function to display THAT ul's user info.
			// get the data attribute of the modal-user-info
			let $duh = $('.modal-user-info');
			let $leftIdx = $duh[0].getAttribute('data');
			// new stuff
			// mutate obj into string
			let tes = $leftIdx.valueOf();
			// mutate string into integer
			let tes1 = parseInt(tes);
			// set data attribute to new index of employee object the cloud so next arrow click will produce the correct employee info.
			$duh.attr('data', tes1);
			console.log($leftIdx);
			if (tes1 >= 1) {
				tes1 -= 1;
				emptyUserModal();
				buildUserModal(cloud, tes1); // NEED NEW FUNCTION?
			} else {
				tes1 = 0;
			}
		});	//	end click()
	}	// end clickLeftHover()

	function clickRightHover(cloud) {
		// On click display respective employee info in modal.
		$right.click(function() {
			// Click on any ul elem triggers function to display THAT ul's user info.
			// get the data attribute of the modal-user-info
			let $duh = $('.modal-user-info');
			let $rightIdx = $duh[0].getAttribute('data');
			// set data attribute to new idx value, so +1
			let test = $rightIdx.valueOf();
			let test1 = parseInt(test);
			$duh.attr('data', test1);

			console.log($rightIdx);
			if (test1 <= 10) {
				test1 += 1;
				emptyUserModal();
				buildUserModal(cloud, test1);
			} else {
				test1 = 11;
			}
		});	//	end click()
	}	// end clickLeftHover()
	/****************************************************************************/

	$(document).ready(function() {
		$.ajax({
			// url: 'https://randomuser.me/api/?results=12&nat=us',
			url: 'https://randomuser.me/api/?results=12',
			dataType: 'json',
			success: function(data) {
				Object.assign(cloud, data);
				console.log(cloud);
				displayRandomUser(data);
				displayModal(cloud);
				hoverState();
			}
		});	// end .ajax()

		hideModal();
		circleLeftHover()
		circleRightHover();
		clickLeftHover(cloud);
		clickRightHover(cloud);
	});


})(window);


			/* Project Instructions:
				PUSH GOALS:
				TODO: Employees can be filtered by name or username
				Add a way to filter the directory by name or username.

				To do this, you’ll need to request a random user nationality that will only return data in the English alphabet. Note: you don't have to rely on the API to return search results. You'll need to write functionality that filters results once they already on the page.  */
