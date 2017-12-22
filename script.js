
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
function QuizUI(array) {
	this.array = array;
	//METHOD TO DISPLAY NEXT QUESTION
	this.display = function() {
		if (array.isEnd()) {
			this.displayScore();
		} else {
			this.displayQuestion();
			this.displayAnswers();	
		}
	},
	this.displayQuestion = function() {
		this.populateHtml('question', array.gerCurrentQuestion().text);
	},
	this.displayAnswers = function() {
		var answers = array.gerCurrentQuestion().answers;
		for (var i = 0; i < answers.length; i++) {
			this.populateHtml('choice' + i, answers[i]);
			this.handleGuess('quess' + i, answers[i]);
		};
	},
	this.handleGuess = function(id, guess) {
		var btn = document.getElementById(id);
		btn.onclick = function() {
			array.guess(guess);
			new QuizUI(array).display();
		}
	},
	this.populateHtml = function(id, text) {
		var element = document.querySelector('#' + id);
		//element.style.display = 'none';
		element.innerHTML = text;
	},
	this.displayScore = function() {
		var end = "<h1>End of game</h1><br><h4>Broj tacnih odgovora je: " + array.score + "/" + array.questions.length + "</h4><br><button onclick='window.location.reload()'>Pokusaj opet</button>";
		this.populateHtml('question', end);
		answersCont.style.display = "none";
	}
};

var thrones = [
	new Question("Simbol kuce Stark je?", ["Vuk", "Lav", "Orao", "Medved"], "Vuk"),
	new Question("Pisac knjige Pesme leda i vatre je?", ["J. K. Rowling", "R. R. Martin", "Brandon Sanders", "J. R. R. Tolkin"], "R. R. Martin")
];

var potter = [
	new Question("U kojoj kuci Hogvortsa je bio Hari?", ["Grifindor", "Hapflpaf", "Revenklo", "Sliterin"], "Grifindor"),
	new Question("Kako se zvala Harijeva sova?", ["Hagrid", "Hermiona", "Helga", "Hedvig"], "Hedvig")
];

var buttonThrones = document.getElementById("gameOfThrones");
var buttonHarry = document.getElementById("harryPotter");
var answersCont = document.getElementById('answersContainer');

var thrones = new Quiz(thrones);
answersCont.style.display = "none";
var areasContainer = document.getElementById('areasContainer');

buttonThrones.onclick = function(e) {
	e.preventDefault();
	new QuizUI(thrones).display();
	answersCont.style.display = "block";
	areasContainer.style.display = "none";
};

var harry = new Quiz(potter);

buttonHarry.onclick = function(e) {
	e.preventDefault();
	new QuizUI(harry).display();
	answersCont.style.display = "block";
	areasContainer.style.display = "none";
};




