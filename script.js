
//QUESTION CONSTRUCTOR
function Question(text, answers, correct) {
	this.text = text;
	this.answers = answers;
	this.correct = correct;
}
//METHOD FOR CHECKING ANSWER
Question.prototype.isCorrectAnswer = function(choice) {
	return this.correct === choice;
};

//QUIZ FUNCTION
function Quiz(questions) {
	this.score = 0;
	this.questionIndex = 0;
	this.questions = questions;
}
//METHOD FOR CURRENT QUESTION
Quiz.prototype.gerCurrentQuestion = function () {
	return this.questions[this.questionIndex];
};
//METHOD FOR SCORE AND NEXT QUESTION INDEX
Quiz.prototype.guess = function (answer) {
	if (this.gerCurrentQuestion().isCorrectAnswer(answer)) {
		this.score ++;
	};
	this.questionIndex ++;
};
//CHECK IF IT IS THE END OF QUESTIONS
Quiz.prototype.isEnd = function () {
	return this.questionIndex >= this.questions.length;
};

//HANDLING UPDATES AND USER INTERFACE
var QuizUI = {
	//METHOD TO DISPLAY NEXT QUESTION
	display: function() {
		if (Quiz.isEnd()) {
			this.displayScore();
		} else {
			this.displayQuestion();
			this.displayAnswers();	
		}
	},
	displayQuestion: function() {
		this.populateHtml('question', Quiz.gerCurrentQuestion().text);
	},
	displayAnswers: function() {
		var answers = Quiz.gerCurrentQuestion().answers;
		console.log(answers);
		for (var i = 0; i < answers.length; i++) {
			this.populateHtml('choice' + i, answers[i]);
			this.handleGuess('quess' + i, answers[i]);
		};
	},
	handleGuess: function(id, guess) {
		var btn = document.getElementById(id);
		btn.onclick = function() {
			Quiz.guess(guess);
			QuizUI.display();
		}
	},
	populateHtml: function(id, text) {
		var element = document.querySelector('#' + id);
		//element.style.display = 'none';
		element.innerHTML = text;
	},
	displayScore: function() {
		var end = "<h1>End of game</h1><br><h4>Broj tacnih odgovora je: " + Quiz.score + "</h4>";
		this.populateHtml('quiz', end);
	}
};

var questions = [
	new Question("Simbol kuce Stark je?", ["Vuk", "Lav", "Orao", "Medved"], "Vuk"),
	new Question("Pisac knjige Pesme leda i vatre je?", ["J. K. Rowling", "R. R. Martin", "Brandon Sanders", "J. R. R. Tolkin"], "R. R. Martin")
];
var Quiz = new Quiz(questions);
QuizUI.display();

