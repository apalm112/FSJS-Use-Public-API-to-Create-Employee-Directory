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
		let userInfoDiv = '<div class="modal-user-info"></div>';
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
	function circleLeftHover() {
		let $left = $('.icon-circle-left');
		$left.hover(function() {
			$(this).css({'color': '#140823'});
			$(this).css({'background': 'rgba(7,7,7,0.7)'});
		}, function() {
				$(this).css({'color': '#636161'});
				$(this).css({'background': '#fffcf7'});
		});
	}
	function circleRightHover() {
		// add a hover & click functions to control icomoons
		let $ah = $('.icon-circle-right');
		$ah.hover(function() {
			$(this).css({'color': '#140823'});
			$(this).css({'background': 'rgba(7,7,7,0.7)'});
		}, function() {
				$(this).css({'color': '#636161'});
				$(this).css({'background': '#fffcf7'});
		});
	}

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
				// hideModal();
				// hoverState();
			}
		});	// end .ajax()
		hideModal();
		hoverState();
		circleLeftHover()
		circleRightHover();

	});


})(window);


			/* Project Instructions:
				Structure and style the user directory so that it roughly matches the provide mockup.
				Display the users in a grid or table
------->Add a hover state to the rows of the user table.	<--------------

				PUSH GOALS:
				TODO: Employees can be filtered by name or username
				Add a way to filter the directory by name or username.

				To do this, you’ll need to request a random user nationality that will only return data in the English alphabet. Note: you don't have to rely on the API to return search results. You'll need to write functionality that filters results once they already on the page.


				Add a way to move back and forth between employee detail windows when the modal window is open. */
