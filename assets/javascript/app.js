// SET VARIABLES =====================================================
var number = 0;
var correct = 0;
var wrong = 0;
var unanswered = 0;

// SET QUESTIONS & ANSWERS ARRAYS ===============================================
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

// REFRESH PAGE ======================================================
function refreshPage() {
	// Display the timer on the screen.
	var remainingTime = 30;
	var timer = "<h2>Time remaining: " + remainingTime + "</h2>";
	$("#timer-section").html(timer);  
	
	var countDown = setInterval(function() {
		remainingTime--;
		timer = "<h2>Time remaining: " + remainingTime + "</h2>";
		$("#timer-section").html(timer);

		if (remainingTime === 0) {
			clearInterval(countDown);
			$("#timer-section").html("<h2>Time is up!</h2>");
			makeTransition();

			number++;
			unanswered++;
			console.log("Unanswered: " + unanswered);
		}
	}, 1000);

	// Display the question on the screen.
	var info = "<h2>Question " + (number + 1) + " / " + questions[number].category + "</h2>";
	$("#info-section").append(info);

	var qstn = "<h1>" + questions[number].question + "</h1>";
	$("#question-section").append(qstn);

	// Display the options under the question.
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

		var btn = $("<button>");
		btn.attr("class", "btn-answer");
		btn.html("<h3>" + ansObj + "</h3>");
		$("#answers-section").append(btn);
	}

	// Select answer.
	$(".btn-answer").on("click", function() {
		clearInterval(countDown);
		if ($(this).text() === questions[number].answer) {
			$("#info-section").html("<h1>Correct!</h1>");
			correct++;
		} else {
			$("#info-section").html("<h1>Wrong!</h1>");
			wrong++;
		}
		makeTransition();

		number++;
	})

}

function makeTransition() {
	$("#question-section").html("<h1>The Answer is " + questions[number].answer);
	$("#answers-section").html("<img src=\"assets/images/" + questions[number].image + "\">");
	
	setTimeout(function() {
		$("#timer-section").empty();
		$("#info-section").empty();
		$("#question-section").empty();
		$("#answers-section").empty();
		
		if (number < questions.length) {
			refreshPage();
		} else {
			$(".container").empty();
			$(".container").append("<img src=\"assets/images/game-over.png\" class=\"end\">");
			$(".container").append("<h1>Correct Answer: " + correct + "</h1>");
			$(".container").append("<h1>Wrong Answer: " + wrong + "</h1>");
			$(".container").append("<h1>Unanswered: " + unanswered + "</h1>");
		}
		
	}, 3000);
}



// START GAME ===============================================
refreshPage();

	



