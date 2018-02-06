$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyDsGH9wNrMMsKJwmOlfB5UqZ8Ky3tESKtw",
    authDomain: "fir-time-ed014.firebaseapp.com",
    databaseURL: "https://fir-time-ed014.firebaseio.com",
    projectId: "fir-time-ed014",
    storageBucket: "fir-time-ed014.appspot.com",
    messagingSenderId: "442479837508"
  };
  firebase.initializeApp(config);

//The variables to store the input values.
var database = firebase.database();

	var train = "";
	var destination = "";
	var time = "";
	var frequency = "";

//Created this function to input values
$("#addTrain").on("click", function(event) {
	event.preventDefault();

	train = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	time = $("#trainTime").val().trim();
	frequency = $("#frequency").val().trim();

	// var time = moment(moment(time, "hh:mm A").subtract(1, "years"),"hh:mm").format("hh:mm A");

	console.log(train);
	console.log(destination);
	console.log(time);
	console.log(frequency);

	database.ref().push({
		train:train,
		destination:destination,
		time:time,
		frequency:frequency,
	});

});

database.ref().on("child_added", function(snapshot) {
	console.log(minutesAway);
	var train = snapshot.val().train;
	var destination = snapshot.val().destination;
	var time = snapshot.val().time;
	var frequency = snapshot.val().frequency;

	var diff = moment().diff(moment(time, "hh:mm A"), "m");
	var modulo = diff % frequency;
	var waiting = time - modulo;
	var minutesAway = null
	var nextArrival = null
	var minutesAway = frequency - modulo
	// var arrival = moment().add(waiting, "m");

	nextArrival = moment().add(minutesAway, "m");
	var actualArrival = moment(nextArrival).format("hh:mm A" );

	var table = $("#train-table");

	table.append(`<tr>

		<td>${train}</td>
		<td>${destination}</td>
		<td>${frequency}</td>
		<td>${actualArrival}</td>
		<td>${minutesAway}</td>
		</tr>`);

})


});