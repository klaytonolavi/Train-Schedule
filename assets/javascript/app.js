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
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  