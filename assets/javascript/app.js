$(document).ready(function() {});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD56Gh18UYraZwdjWdGCzXDUipGglhxKUU",
    authDomain: "trainhw-60f93.firebaseapp.com",
    databaseURL: "https://trainhw-60f93.firebaseio.com",
    projectId: "trainhw-60f93",
    storageBucket: "trainhw-60f93.appspot.com",
    messagingSenderId: "953981947536"
};

firebase.initializeApp(config);

var database = firebase.database();

// Add new train on click

$("#add-train-btn").on("click", function(event) {

	event.preventDefault();

    // Grab user inputs and calculate other variables

    var current = moment().format("hh:mm");
	var name = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var start = $("#start-input").val().trim();
	var frequency = $("#frequency-input").val().trim();
    var formated = moment(start, "hh:mm").subtract(1, "years");
    var diff = moment().diff(moment(formated), "minutes");
    var apart = diff % frequency;
    var away = frequency - apart;
    var arrival = moment().add(away, "minutes").format("hh:mm");


    // Push to database 

	database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        arrival: arrival,
        away: away
    });

    console.log(current);
    console.log(name);
    console.log(destination);
    console.log(start);
    console.log(frequency);
    console.log(formated);
    console.log(diff);
    console.log(apart);
    console.log(arrival);
    console.log(away);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (snapshot) {

	console.log(snapshot.val());

    var newTR = $("<tr>");

	$("#tbody").append(newTR);
	newTR.append("<td>" + snapshot.val().name + "</td>");
	newTR.append("<td>" + snapshot.val().destination + "</td>");
	newTR.append("<td>" + snapshot.val().frequency + "</td>");
	newTR.append("<td>" + snapshot.val().arrival + "</td>");
	newTR.append("<td>" + snapshot.val().away + "</td>");
	newTR.append("<hr>");

});

// ----- Things to Add -----
// Create remove and update buttons
// Change background and other styling

// ----- Known Bugs -----
// Time doesn't update upon refresh
