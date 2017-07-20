/* eslint-disable */
// 	Review the Random User Generator documentation. Grab the example they provide and console.log the data so you can see what information you’ll receive and start to think about how you’ll access the correct information and display it on the page.


function displayRandomUser(data) {
	let randoHTML = '';
	$.each(data.results, function(idx, picture) {
		randoHTML += '<ul>';
		randoHTML += '<img src=' + data.results[idx].picture.medium + '>';
		randoHTML += '<li class="box name">' + data.results[idx].name.first + ' ' + data.results[idx].name.last + '</li>';
		randoHTML += '<li class="box">' + data.results[idx].email + '</li>';
		randoHTML += '<li class="box">' + data.results[idx].location.city + '</li>';
		randoHTML += '</ul>';
	});
	$('.container_12').html(randoHTML);
}	// end displayRandomUser()

function displayModal(data) {
	// Get data for the modal on user click.
}


$.ajax({
	url: 'https://randomuser.me/api/?results=12&nat=us',
	dataType: 'json',
	success: function(data) {
		console.log(data);
		console.log(data.results[0].picture.medium);

		displayRandomUser(data);
	}
});	// end .ajax()

/*	Project Instructions:
			Get and display 12 random users from The Random User Generator API
			Using photos and information that the API provides, you’ll display 12 users, along with some basic information:
			Image
			First and Last Name
			Username
			City & Country

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
