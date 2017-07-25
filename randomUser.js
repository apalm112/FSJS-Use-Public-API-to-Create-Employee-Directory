/* eslint-disable */
// 	Review the Random User Generator documentation. Grab the example they provide and console.log the data so you can see what information you’ll receive and start to think about how you’ll access the correct information and display it on the page.
'use strict';

(function() {

// Object to hold the data.results Object returned from $.ajax call.
// This keeps the data accessible for rest of the script.
let cloud = {};
// source: https://gist.github.com/mshafrir/2646763
const sA =
	{
		'Alabama': 'AL',
		'Alaska': 'AK',
		'American Samoa': 'AS',
		'Arizona': 'AZ',
		'Arkansas': 'AR',
		'California': 'CA',
		'Colorado': 'CO',
		'Connecticut': 'CT',
		'Delaware': 'DE',
		'District Of Columbia': 'DC',
		'Federated States Of Micronesia': 'FM',
		'Florida': 'FL',
		'Georgia': 'GA',
		'Guam': 'GU',
		'Hawaii': 'HI',
		'Idaho': 'ID',
		'Illinois': 'IL',
		'Indiana': 'IN',
		'Iowa': 'IA',
		'Kansas': 'KS',
		'Kentucky': 'KY',
		'Louisiana': 'LA',
		'Maine': 'ME',
		'Marshall Islands': 'MH',
		'Maryland': 'MD',
		'Massachusetts': 'MA',
		'Michigan': 'MI',
		'Minnesota': 'MN',
		'Mississippi': 'MS',
		'Missouri': 'MO',
		'Montana': 'MT',
		'Nebraska': 'NE',
		'Nevada': 'NV',
		'New Hampshire': 'NH',
		'New Jersey': 'NJ',
		'New Mexico': 'NM',
		'New York': 'NY',
		'North Carolina': 'NC',
		'North Dakota': 'ND',
		'Northern Mariana Islands': 'MP',
		'Ohio': 'OH',
		'Oklahoma': 'OK',
		'Oregon': 'OR',
		'Palau': 'PW',
		'Pennsylvania': 'PA',
		'Puerto Rico': 'PR',
		'Rhode Island': 'RI',
		'South Carolina': 'SC',
		'South Dakota': 'SD',
		'Tennessee': 'TN',
		'Texas': 'TX',
		'Utah': 'UT',
		'Vermont': 'VT',
		'Virgin Islands': 'VI',
		'Virginia': 'VA',
		'Washington': 'WA',
		'West Virginia': 'WV',
		'Wisconsin': 'WI',
		'Wyoming': 'WY'
	};
let doggo = '';
let answer = '';

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
			console.log(cloud);
			displayRandomUser(data);
			displayModal(cloud);
			hideModal();
		}
	});	// end .ajax()

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
		modalHTML += '<li>' + cloud.results[targetElement].login.username + '</li>';
		modalHTML += '<li>' + cloud.results[targetElement].email + '</li>';
		modalHTML += '<li class="line">---------------------------------------------------------</li>';

		let cellNum = cloud.results[targetElement].cell;
		modalHTML += '<li>' + formatCell(cellNum) + '</li>';

		let stateToFormat = cloud.results[targetElement].location.state;

		modalHTML += '<li>' + cloud.results[targetElement].location.street + ' ' + cloud.results[targetElement].location.city + ', ' + formatState(stateToFormat) + ' ' + cloud.results[targetElement].location.postcode + '</li>';

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

	function formatState(stateToFormat) {
		let capState = stateToFormat.charAt(0).toUpperCase() + stateToFormat.slice([1]);
		if (!capState.includes(' ') ) {
			for (let key in sA) {
				if (key === capState) {
					doggo = Object.keys(sA);
					answer = Object.values(sA);
				}
			}	// end for loop
			let findState = doggo.indexOf(capState);
			let space = answer[findState];
			return space;
		} else {
			let doubleName = stateToFormat.charAt(0).toUpperCase() + stateToFormat.slice([1]);
			// Gets index of the first space in the state name.
			let num = doubleName.indexOf(' ');
			// Change second word to capitalized
			doubleName = doubleName.slice([0], [num+1]) + doubleName.charAt(num+1).toUpperCase() + doubleName.slice([num+2]);
			console.log(doubleName); // Logs: 'South Dakota'
			for (let key in sA) {
				if (key === doubleName) {
					doggo = Object.keys(sA);
					console.log(doggo);
					answer = Object.values(sA);
					console.log(answer);
				}
			}
			let findState = doggo.indexOf(doubleName);	// idx of match in answer
			console.log(findState);
			let space2 = answer[findState];	// correct state abbreviation
			console.log(space2);
			return space2;

		}
	}	// end of formatState();


})(window);

/* *********************************************************

			Project Instructions:
				Structure and style the user directory so that it roughly matches the provide mockup.
				Display the users in a grid or table
------->Add a hover state to the rows of the user table.	<--------------

				PUSH GOALS:
				TODO: Employees can be filtered by name or username
				Add a way to filter the directory by name or username.

				To do this, you’ll need to request a random user nationality that will only return data in the English alphabet. Note: you don't have to rely on the API to return search results. You'll need to write functionality that filters results once they already on the page.

				TODO:	Functionality has been added to switch back and forth between employees when the detail modal window is open.

				Add a way to move back and forth between employee detail windows when the modal window is open.
				****************************************************************************/
