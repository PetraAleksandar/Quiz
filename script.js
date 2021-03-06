

/*
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
*/

//ES6 Question
class Question {
	constructor (text, answers, correct) {
		this.text = text;
		this.answers = answers;
		this.correct = correct;
	}
	isCorrectAnswer(choice) { return this.correct === choice; } 
}
/*
//QUIZ FUNCTION
function Quiz(questions) {
	this.score = 0;
	this.questionIndex = 0;
	this.questions = questions;
}
//METHOD FOR CURRENT QUESTION
Quiz.prototype.getCurrentQuestion = function () {
	return this.questions[this.questionIndex];
};
//METHOD FOR SCORE AND NEXT QUESTION INDEX
Quiz.prototype.guess = function (answer) {
	if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
		this.score ++;
	};
	this.questionIndex ++;
};
//CHECK IF IT IS THE END OF QUESTIONS
Quiz.prototype.isEnd = function () {
	return this.questionIndex >= this.questions.length;
};
*/

//ES6 Quiz
class Quiz {
	constructor(questions) {
		this.questions = questions;
		this.score = 0;
		this.questionIndex = 0;
	}
	getCurrentQuestion() {
		return this.questions[this.questionIndex];
	}
	guess(answer) {
		if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
			this.score ++;
		}
		this.questionIndex ++;
	}
	isEnd() {
		return this.questionIndex >= this.questions.length;
	}
}
/*
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
		this.populateHtml('question', array.getCurrentQuestion().text);
	},
	this.displayAnswers = function() {
		var answers = array.getCurrentQuestion().answers;
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
		var end = `<h1>End of game</h1><br><h4>Broj tacnih odgovora je: ${array.score}/${array.questions.length}
		</h4><br><button onclick='window.location.reload()'>Pokusaj opet</button>`;
		this.populateHtml('question', end);
		answersCont.style.display = "none";
	}
};*/


//ES6 QuizUI
class QuizUI {
	constructor(array) {
		this.array = array;
	}
	display() {
		if (this.array.isEnd()) {
			this.displayScore();
		} else {
			this.displayQuestion();
			this.displayAnswers();	
		}
	}
	displayQuestion() {
		this.populateHtml('question', this.array.getCurrentQuestion().text);
	}
	displayAnswers() {
		var answers = this.array.getCurrentQuestion().answers;
		for (var i = 0; i < answers.length; i++) {
			this.populateHtml('choice' + i, answers[i]);
			this.handleGuess('quess' + i, answers[i]);
		};
	}
	handleGuess(id, quess) {
		var btn = document.getElementById(id);
		btn.onclick = () => {
			this.array.guess(quess);
			new QuizUI(this.array).display();
		}
	}
	populateHtml(id, text) {
		var element = document.querySelector('#' + id);
		element.innerHTML = text;
	}
	displayScore() {
		var end = `<h1>End of game</h1><br><h4>Broj tacnih odgovora je: ${this.array.score}/${this.array.questions.length}
		</h4><br><button onclick='window.location.reload()'>Pokusaj opet</button>`;
		this.populateHtml('question', end);
		answersCont.style.display = "none";
	}
}

var thrones = [
	new Question("Simbol kuce Stark je?", ["Vuk", "Lav", "Orao", "Medved"], "Vuk"),
	new Question("Pisac knjige Pesme leda i vatre je?", ["J. K. Rowling", "R. R. Martin", "Brandon Sanders", "J. R. R. Tolkin"], "R. R. Martin"),
	new Question("Dzonov jezovuk se zove?", ["Nimerija", "Leto", "Sivi vetar", "Duh"], "Duh"),
	new Question("Koliko zmajeva im Deneris", ["1", "2", "3", "4"], "3"),
	new Question("Ko je otrovao kralja Dzofrija?", ["Rob Stark", "Lejdi Olena", "Piter  Bejlis", "Tirion Lanister"], "Lejdi Olena")
];

var potter = [
	new Question("U kojoj kuci Hogvortsa je bio Hari?", ["Grifindor", "Hapflpaf", "Revenklo", "Sliterin"], "Grifindor"),
	new Question("Kako se zvala Harijeva sova?", ["Hagrid", "Hermiona", "Helga", "Hedvig"], "Hedvig"),
	new Question("Kako se zvao Harijev kum?", ["Sirijus Blek", "Severus Snejp", "Vernon Darsli", "Remus Lupin"], "Sirijus Blek"),
	new Question("Kojeg ljubimca ima Hermiona?", ["Pas", "Sova", "Macka", "Zmija"], "Macka"),
	new Question("Koliko brace ima Ron?", ["3", "4", "5", "6"], "5")
];

var onePiece = [
	new Question("Koliko clanova nakama ima Lufi?", ["7", "8", "9", "10"], "8"),
	new Question("Sta je zanimanje Copera?", ["Lekar", "Zidar", "Navigator", "Arheolog"], "Lekar"),
	new Question("Ko je Lufiju dao sesir?", ["Zoro", "Garp", "Senks", "Sabo"], "Senks"),
	new Question("Kojoj grupi pirata je pripadala Nami?", ["Heart", "Big mama", "Red hair", "Arlong"], "Arlong"),
	new Question("Kolika je nagrada za Usopa?", ["100 miliona", "200 miliona", "300 miliona", "400 miliona"], "200 miliona")
];

var buttonThrones = document.getElementById("gameOfThrones");
var buttonHarry = document.getElementById("harryPotter");
var buttonOnePiece = document.getElementById("onePiece");
var answersCont = document.getElementById('answersContainer');

var thrones = new Quiz(thrones);
var harry = new Quiz(potter);
var piece = new Quiz(onePiece);

answersCont.style.display = "none";
var areasContainer = document.getElementById('areasContainer');


var loadQuiz = (quiz) => {
	new QuizUI(quiz).display();
	answersCont.style.display = "block";
	areasContainer.style.display = "none";
}

buttonThrones.addEventListener("click", function(){loadQuiz(thrones)});
buttonHarry.addEventListener("click", function(){loadQuiz(harry)});
buttonOnePiece.addEventListener("click", function(){loadQuiz(piece)});





