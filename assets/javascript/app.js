 var config = {
    apiKey: "AIzaSyBDxZFuWxlI7s4MNpRhYj-_pH3P53r5N3s",
    authDomain: "first-project-klayton.firebaseapp.com",
    databaseURL: "https://first-project-klayton.firebaseio.com",
    projectId: "first-project-klayton",
    storageBucket: "first-project-klayton.appspot.com",
    messagingSenderId: "964868300557"
  };

  firebase.initializeApp(config);

var database = firebase.database();

	// button for adding train to the train schedule table
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  	
  	// use moment to calculate the first train time
  var firstTrainTime = moment($("#first-time-input").val().trim(), "HH:mm").format("X");

  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    Destination: trainDestination,
    firstTrain: firstTrainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // console log train data
  console.log(newTrain.trainName);
  console.log(newTrain.trainDestination);
  console.log(newTrain.firstTrainTime);
  console.log(newTrain.frequency);

  // alert that a new train has been added
  alert("Train successfully added");

  // clears all input boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrainTime);
  console.log(frequency);

 
  // Assumptions
    var tFrequency = $("#frequency-input").val().trim();

    // Time is 3:30 AM - without a date it will assume today. 
    var firstTime = $("#first-time-input").val().trim();

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
});


