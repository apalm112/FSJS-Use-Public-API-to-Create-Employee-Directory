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

	$.ajax({
		url: 'https://randomuser.me/api/?results=12&nat=us',
		dataType: 'json',
		success: function(data) {
			Object.assign(cloud, data);
			console.log(data);
			console.log(cloud);
			console.log(data.results[0].picture.medium);
			console.log(cloud.results[0].picture.medium);
			displayRandomUser(data);
			displayModal(data);
			hideModal(data);
		}
	});	// end .ajax()

	function displayModal(data) {
		// Functino to Get & Display data for the modal on user click.
		// Creates a div to display the user info & appends to DOM
		let userInfoDiv = '<div class="modal-user-info"></div>';
		$('.user-modal').append(userInfoDiv);

		// Click on any ul elem triggers function to display THAT ul's user info.
		$('.rando').click(function() {
			buildUserModal(data);
			$('.modal').fadeIn(200);
			$('.user-modal').toggleClass('out in');
		});
	}	// end displayModal()

	function hideModal(data) {
		// Function hides the modal when the closing 'X' is clicked.
		$('.close').click(function() {
			emptyUserModal();
			$('.modal').fadeOut(200);
			$('.user-modal').toggleClass('out in');
		})
	}	// end hideModal()

	/* *********************************************************/
	function buildUserModal(data) {
		// Function to build the DOM elems to hold the user info
		// TODO:	The idx of the ul clicked on can be passed into buildUserModal(userInfo) to display the currentTarget info.
		// Add the idx of user in Cloud to the ul class,
		// then when clicked, use that idx to display matching modal info

		let	modalHTML = '<ul><img src=' + cloud.results[3].picture.medium + '></li></ul>';
		$('.modal-user-info').html(modalHTML);

	}	// end buildUserModal()
	/****************************************************************************/

	function emptyUserModal() {
		// Function to empty out modal div of all user info, to get the modal ready for the next time it is loaded.
		$('.modal-user-info').children().remove();
	}	// end emptyUserModal()





})(window);

	/*	Project Instructions:
				Create a modal window that will pop up when any part of the user’s row is clicked. The following details should display in the modal window:
				Image
				Name
				Username
				Email
				Cell Number
				Detailed Address, including street name and number, city, country and post code.
				Birthdate
				There is a way to close the modal window

				Structure and style the user directory so that it roughly matches the provide mockup.
				Display the users in a grid or table
				Add a hover state to the rows of the user table.
				Make sure there’s a way to close the modal window

				PUSH GOALS:
				TODO: Employees can be filtered by name or username
				Add a way to filter the directory by name or username.

				To do this, you’ll need to request a random user nationality that will only return data in the English alphabet. Note: you don't have to rely on the API to return search results. You'll need to write functionality that filters results once they already on the page.

				TODO:	Functionality has been added to switch back and forth between employees when the detail modal window is open.

				Add a way to move back and forth between employee detail windows when the modal window is open.
	*/
