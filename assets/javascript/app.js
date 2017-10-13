$(document).ready(function () {
    console.log("Ready");
    update();
});

var counter = 0;
var snapShot = '';

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

var dataDB = database.ref("data");

// Add new train on click

$("#add-train-btn").on("click", function (event) {

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

    dataDB.push({
        start: start,
        name: name,
        destination: destination,
        frequency: frequency,
        arrival: arrival,
        away: away
    });

    // console.log(current);
    // console.log(name);
    // console.log(destination);
    // console.log(start);
    // console.log(frequency);
    // console.log(formated);
    // console.log(diff);
    // console.log(apart);
    // console.log(arrival);
    // console.log(away);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});

dataDB.on("child_added", function (snapshot) {

    console.log(snapshot.val());

    counter++;

    snapShot = snapshot.val();

    var newTR = $("<tr>");

    newTR.addClass("tr-" + counter);
    $("#tbody").append(newTR);
    newTR.append("<td>" + snapshot.val().name + "</td>");
    newTR.append("<td>" + snapshot.val().destination + "</td>");
    newTR.append("<td>" + snapshot.val().frequency + "</td>");
    newTR.append("<td class='arrival'>" + snapshot.val().arrival + "</td>");
    newTR.append("<td class='away'>" + snapshot.val().away + "</td>");
    newTR.append("<hr>");

});

function update() {

    var newCounter = 0;

    dataDB.on("value", function (dataSnapshot) {
        dataSnapshot.forEach(function (snapshot) {
            newCounter++;
            var current = moment().format("hh:mm");
            var start = snapshot.val().start;
            var name = snapshot.val().name;
            var destination = snapshot.val().destination;
            var frequency = snapshot.val().frequency;
            var formated = moment(start, "hh:mm").subtract(1, "years");
            var diff = moment().diff(moment(formated), "minutes");
            var apart = diff % frequency;
            var away = frequency - apart;
            var arrival = moment().add(away, "minutes").format("hh:mm");

            // console.log(current);
            // console.log(name);
            // console.log(destination);
            // console.log(start);
            // console.log("Frequency" + frequency);
            // console.log("Formated: " + formated);
            // console.log(diff);
            // console.log(apart);
            // console.log(arrival);
            // console.log(away);

            $(".tr-" + newCounter + " .away").text(away);
            $(".tr-" + newCounter + " .arrival").text(arrival);
        });
    });
}

setInterval(update, 10000);

// ----- Things to Add -----
// Create remove and update buttons
// Change background and other styling

// ----- Known Bugs -----
// Time doesn't update upon refresh