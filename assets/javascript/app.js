$(function () {
	// SET VARIABLES ===================================================
	var number = 0;
	var correct = 0;
	var wrong = 0;
	var unanswered = 0;

	// SET QUESTIONS & ANSWERS ARRAYS ==================================
	var questions 	= [ { category: "Science", question: "What is the symbol for Silver?", answer: "Ag", image: "silver.png" },
					    { category: "Music", question: "Les Paul is a model of which guitar maker?", answer: "Gibson", image: "les-paul.jpg" }, 
					    { category: "Technology", question: "What was the name of the first home computer to be manufactured?", answer: "Altair", image: "altair.jpg" },
					    { category: "History", question: "Who became president after the assassination of Abraham Lincoln?", answer: "Andrew Johnson", image: "andrew-johnson.jpg" },
					    { category: "Science", question: "Which is the hottest planet in the solar system?", answer: "Venus", image: "venus.jpg" },
					    { category: "Health", question: "Which organ in the human body has a name that translates as \"all flesh\"", answer: "Pancreas", image: "pancreas.jpg" },
					    { category: "Movie", question: "What movie earned Tom Hanks his third straight Oscar nomination, in 1996?", answer: "Apollo 13", image: "apollo-13.jpg" },
					    { category: "Music", question: "Which Radiohead album has been cited by musicians as one of the greatest albums of all time?", answer: "OK Computer", image: "ok-computer.jpg" },
					    { category: "History", question: "In which year did the demolition of the Berlin Wall begin?", answer: "1989", image: "berlin-wall.jpg" },
					    { category: "Science", question: "Which is the rarest blood type in humans?", answer: "AB negative", image: "ab-negative.jpg" } ];

	var answers 	= [ { A: "Hg", B: "Ag", C: "Zn", D: "Au" }, 
				        { A: "Gibson", B: "Fender", C: "Ibanez", D: "Jackson" },
						{ A: "IBM", B: "Commodore", C: "Altair", D: "Macintosh" },
						{ A: "Andrew Johnson", B: "James Buchanan", C: "James A. Garfield", D: "Franklin Pierce" }, 
						{ A: "Jupiter", B: "Mars", C: "Venus", D: "Neptune" },
						{ A: "Pancreas", B: "Liver", C: "Kidney", D: "Intestine" },
						{ A: "Forrest Gump", B: "Saving Private Ryan", C: "Sleepless in Seattle", D: "Apollo 13" },
						{ A: "Kid A", B: "OK Computer", C: "The Bends", D: "Hail to the Thief" },
						{ A: "1986", B: "1987", C: "1988", D: "1989" },
						{ A: "AB negative", B: "O negative", C: "O positive", D: "AB Positive" } ];

	// OPENING PAGE ====================================================
	// Display the header on top -----------------------------------
	var headerSec = $("<div id=\"header\">");
	var logo = $("<img src=\"assets/images/trivia.png\">");
	
	headerSec.append(logo);
	$("#container").append(headerSec);

	// Create a start button.
	var startGameBtn = $("<button id=\"btn-start\">Start Game</button>");
	$("#container").append(startGameBtn);

	// Refresh the page when start button is clicked.
	$("#btn-start").on("click", function() {

		$("#container").empty();
		refreshPage();

	})

	// REFRESH PAGE ====================================================
	function refreshPage() {

		// Display the header on top -----------------------------------
		var headerSec = $("<div id=\"header\">");
		var logo = $("<img src=\"assets/images/trivia.png\">");
		
		headerSec.append(logo);
		$("#container").append(headerSec);

		// Display the timer below the header --------------------------
		var timerSec = $("<div id=\"timer\">");
		var remainingTime = 30;
		var counter = "<h2>Time remaining: " + remainingTime + "</h2>";
		
		timerSec.append(counter);
		$("#container").append(timerSec);

		// Timer counts down from 30 to 0 ------------------------------
		var countDown = setInterval(function() {
			remainingTime--;
			counter = "<h2>Time remaining: " + remainingTime + "</h2>";
			timerSec.html(counter);

			if (remainingTime <= 5 && remainingTime > 0) {
				var warning = new Audio("assets/sounds/beep.wav");
				warning.play();
			}

			if (remainingTime === 0) {
				var timesUp = new Audio("assets/sounds/times-up.wav");
				timesUp.play();
				clearInterval(countDown);
				timerSec.html("<h2>Time is up!</h2>");
				makeTransition();

				number++;
				unanswered++;
			}
		}, 1000);

		// Display the question info below the timer -------------------
		var infoSec = $("<div id=\"info\">");
		var info = "<h2>Question " + (number + 1) + " / " + questions[number].category + "</h2>";

		infoSec.append(info);
		$("#container").append(infoSec);

		// Display the question below the info -------------------------
		var questionSec = $("<div id=\"question\">");
		var question = "<h1>" + questions[number].question + "</h1>";

		questionSec.append(question);
		$("#container").append(questionSec);

		// Display the answer options below the question ---------------
		var optionSelected = false;
		var answerSec = $("<div id=\"answer\">");

		for (var i = 0; i < 4; i++) {
			var ansObj;

			switch (i) {
				case 0:
					ansObj = answers[number].A;
					break;
				case 1:
					ansObj = answers[number].B;
					break;
				case 2:
					ansObj = answers[number].C;
					break;
				case 3:
					ansObj = answers[number].D;
					break;
				}

			var btn = $("<button class=\"btn-answer\">");
			btn.html("<h3>" + ansObj + "</h3>");
			answerSec.append(btn);
		}

		$("#container").append(answerSec);

		// Select the option to answer the question --------------------
		$(".btn-answer").on("click", function() {

			clearInterval(countDown);

			if (!optionSelected) {

				if ($(this).text() === questions[number].answer) {
					var sndCorrect = new Audio("assets/sounds/correct.wav");
					sndCorrect.play();
					infoSec.html("<h1>Correct!</h1>");
					correct++;
				} else {
					var sndWrong = new Audio("assets/sounds/wrong.wav");
					sndWrong.play();
					infoSec.html("<h1>Wrong!</h1>");
					wrong++;
				}

				makeTransition();

				number++;

			}
			// To avoid multiple selections in case the next display does not occur.
			optionSelected = true;

		})

	}

	// TRANSITIONS BETWEEN QUESTIONS ============================
	function makeTransition() {

		$("#question").html("<h1>The Answer is " + questions[number].answer + "</h1>");
		$("#answer").html("<div id=\"image-div\"><img src=\"assets/images/" + questions[number].image + "\"></div>");

		// Wait for 4 seconds before transitioning to the next display.
		setTimeout(function() {

			$("#container").empty();

			// If questions left to ask, refresh the page. Otherwise display game over and restart button.
			if (number < questions.length) {
				refreshPage();
			} else {
				$("#container").append("<img src=\"assets/images/game-over.png\" id=\"game-over\">");
				$("#container").append("<h1>Correct Answers: " + correct + "</h1>");
				$("#container").append("<h1>Incorrect Answers: " + wrong + "</h1>");
				$("#container").append("<h1>Unanswered: " + unanswered + "</h1>");

				// Create the restart button
				var btnRestart = $("<button id=\"btn-restart\">Restart</button>");
				$("#container").append(btnRestart);

				// If the restart button is clicked, the page is refreshed.
				$("#btn-restart").on("click", function() {

					$("#container").empty();
					number = 0;
					correct = 0;
					wrong = 0;
					unanswered = 0
					refreshPage();

				})
			}

		}, 4000)

	}

});


	



