/* eslint-disable */
'use strict';

/* Treehouse Project 5 */
( () =>  {

// Object to hold the data.results Object returned from $.ajax call.
// This keeps the data accessible for rest of the script.
	let cloud = {};
	let $left = $('.icon-circle-left');
	let $right = $('.icon-circle-right');

	let ajax = () => {
		$.ajax({
			url: 'https://randomuser.me/api/?results=12',
			dataType: 'json',
			success:  (data) => {
				// Sets up the data into a local copy so the info will still be available for the modal.
				Object.assign(cloud, data);
				displayRandomUser(data);
				displayModal(cloud);
				hoverState('.rando');
				appendSearchDiv();
				filterUser();
			}
		});
	}


	const displayRandomUser = (data) => {
		// Builds the ul's to display employee data recieved from randomuser.me in the DOM.
		let randoHTML = '';
		let randoHTML2 = '';
		let randoHTML3 = '';
		$.each(data.results, function(idx) {
			// Data is split between 3 columns to match the project mockup.
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
	}

	const displayModal = (cloud) => {
		// Function to Get & Display data for the modal on user click.
		// Click on any ul triggers function to display that ul's user info.
		$('.rando').click(function() {
			let targetElement = $('.rando').index(this);
			// targetElement gets the index of the employee clicked on
			buildUserModal(cloud, targetElement);
			$('.modal').fadeIn(200);
			$('.user-modal').toggleClass('out in');
		});
	}

	const hideModal = () => {
		// When the closing 'X' is clicked, hide the modal.
		$('.close').click(function() {
			emptyUserModal();
			$('.modal').fadeOut(200);
			$('.user-modal').toggleClass('out in');
		});
	}

	const buildUserModal = (cloud, targetElement) => {
		// Creates a div & formats it to display more employee info & appends to the DOM.
		// data attribute passes along the employee index for later use by modal icon click function.
		let userInfoDiv = '<div class="modal-user-info" data="' + targetElement + '"></div>';
		$('.user-modal').append(userInfoDiv);
		let modalHTML = '';
		modalHTML += '<ul>';
		modalHTML += '<li><img src=' + cloud.results[targetElement].picture.medium + '></li>';
		modalHTML += '<li>' + cloud.results[targetElement].name.first + ' ' + cloud.results[targetElement].name.last + '</li>';
		modalHTML += '<li>' + cloud.results[targetElement].login.username + '</li>';
		modalHTML += '<li>' + cloud.results[targetElement].email + '</li>';
		modalHTML += '<li class="line">---------------------------------------------------------</li>';
		let cellNum = cloud.results[targetElement].cell;
		modalHTML += '<li>' + formatCell(cellNum) + '</li>';
		modalHTML += '<li>' + cloud.results[targetElement].location.street + ' ' + cloud.results[targetElement].location.city + ', ' + cloud.results[targetElement].nat + ' ' + cloud.results[targetElement].location.postcode + '</li>';
		let dobToFormat = cloud.results[targetElement].dob;
		modalHTML += '<li>Birthday: ' + formatDob(dobToFormat) + '</li>';
		modalHTML += '</ul>';
		$('.modal-user-info').html(modalHTML);
	}

	const emptyUserModal = () => {
		// Function to remove modal of all employee info, this gets the modal ready for the next time it is loaded.
		$('.modal-user-info').remove();
	}

	const formatCell = (cellNum) => {
		// Strips out the first '-' in the cell number.
		// http://regexr.com/
		const cellRegex = /\)-?/g;
		let properCellFormat = cellNum.replace(cellRegex, ') ');
		return properCellFormat;
	}

	const formatDob = (dobToFormat) => {
		// Formats the Bday to match the mockup format.
		// https://regex101.com/
		const dobRegex = /\/"\d{4}-\d{2}-\d{2}\g/;
		let properDob = dobToFormat.replace(dobRegex);
		let properDob1 = properDob.split('-', 3);
		let month = properDob1[1];
		let day = properDob1[2].slice([0], [2]);
		let year = properDob1[0].slice([2], [4]);
		let properDob2 = month + '/' + day + '/' + year;
		return properDob2;
	}

	const hoverState = (elemTarget) => {
		// Add a visual cue to the current ul of employee info being hovered over.
		$(elemTarget).hover(function() {
			$(this).toggleClass('hover');
		});
	}

	const clickLeftHover = (cloud, circle) => {
		// Controls the display of previous employee's info in the modal.
		circle.click( () => {
			// Get the data attribute of the modal-user-info.
			let $duh = $('.modal-user-info');
			let $leftIdx = $duh[0].getAttribute('data');
			//Mutate obj into string
			let tes = $leftIdx.valueOf();
			//Mutate string into integer
			let tes1 = parseInt(tes);
			console.log(tes);
			// Set data attribute to new index of employee object in the cloud object so next arrow click will produce the correct employee info.
			$duh.attr('data', tes1);
			if (tes1 < 11 && circle === $right) {
				// When at employee index 11, righ arrow click stops.
				tes1 += 1;
				emptyUserModal();
				buildUserModal(cloud, tes1);
			} else if (tes1 > 11 && circle === $left) {
				// When at employee index 0, left arrow click stops.
				tes1 -= 1;
				console.log(tes1);
				emptyUserModal();
				buildUserModal(cloud, tes1);
			}
		});
	}
	// else {
	// 	tes1 = 0;
	// }  else {
	// 	test1 = 11;
	// }
	// function clickRightHover(cloud) {
	// 	// Control the display of next employee's info in modal.
	// 	$right.click(function() {
	// 		// Get the data attribute of the modal-user-info
	// 		let $duh = $('.modal-user-info');
	// 		let $rightIdx = $duh[0].getAttribute('data');
	// 		// Set data attribute to new idx value, so +1
	// 		let test = $rightIdx.valueOf();
	// 		let test1 = parseInt(test);
	// 		$duh.attr('data', test1);
	// 		// When at employee index 11, righ arrow click stops.
	// 		if (test1 <= 10) {
	// 			test1 += 1;
	// 			emptyUserModal();
	// 			buildUserModal(cloud, test1);
	// 		} else {
	// 			test1 = 11;
	// 		}
	// 	});
	// }

	const appendSearchDiv = ()=> {
		// Dynamically create & append search div & input feature so user can search the currently displayed employees.
		let searchIn = document.createElement('input');
		const $h1 = $('h1');
		searchIn.type = 'text';
		searchIn.setAttribute('class', 'employee-search');
		searchIn.placeholder = 'Type to search for employee';
		$h1.after(searchIn);
	}

	const filterUser = () => {
		// Filter through current employees on page for any matches from the input box.  Gets user input text, turns it to lower case to find any matches already displayed in the DOM elements 'li.name'.
		let $search = $('input');
		$search.keyup(function() {
			// Gets the input value, afer each keystroke, formats it to match the form in the cloud data object. Since all employee names are in lower case from randomuser.me.
			let val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
			// Gets all the elements w/ class='rando', filters them for matching characters in the employee name, keeps them displayed in the DOM if it's a match.  If the employee name doesn't match, then that employee info is hidden.
			$('.rando').show().filter(function(  ) {
				// $(this) is the current ul in the DOM. The .children(':nth-child(2)') sets the text variable strictly to the name value of each employee.  This allows the search results to instantly show or hide all matching employees.  Took me awhile to figure this part out.
				let text = $(this).children(':nth-child(2)').text().replace(/\s+g/, ' ');
				/* USE STARTS-WITH INSTEAD OF INCLUDES TO SEARCH BY BOTH NAME/USERNAME */
				// text2 can be used to allow user to search by employee username inplace of employee name.
				// let text2 = $(this).children(':nth-child(3)').text().replace(/\s+g/, ' ');
				// Returns a truthy/falsey value.  indexOf(val) returns the index of the match, the ~ inverts the index which makes it false & the ! turns it back to true, so if the name being searched for is in the DOM, its corresponding ul will stay displayed.  If not a match, it returns false & hides the corresponding employees ul.
				return !~text.indexOf(val);
			}).hide();
		});
	}
	$(document).ready( () => {
		// After the DOM is done loading, make the ajax call.
		ajax();
		hideModal();
		hoverState($left);
		hoverState($right);
		clickLeftHover(cloud, $left);
		clickLeftHover(cloud, $right);
	});
})(window);
