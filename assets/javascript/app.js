$(document).ready(function () {
    var correct, incorrect, questionArray, index, timeIsUp;
    //build timer
    var timer = {
        time: 30,
        count: function () {
            timer.time--;
            $("#time").html("Time Remaining: " + timer.time);
        },
        start: function () {
            $("#time").html("Time Remaining: " + timer.time);
            counter = setInterval(timer.count, 1000);
        },
        stop: function () {
            clearInterval(counter);
        },
        reset: function () {
            timer.time = 30;
        }
    }
    
    triviaQuestions();
    //put all questions & answers into an object
    function triviaQuestions() {
        questionArray = [{
            question: "How many breeds of goats are there?",
            answers: ["150", "25", "12", "300"],
            correctAnswer: 3
        },
        {
            question: "What chemical element gives the blood of a lobster a bluish tint?",
            answers: ["Copper", "Oxygen", "Iron", "Sulfur"],
            correctAnswer: 0
        },
        {
            question: "The llama is a domesticated camelid that is native to which continent?",
            answers: ["Australia", "South America", "Africa", "Europe"],
            correctAnswer: 1
        },
        {
            question: "What was the name of the gorilla that was shot and killed at the Cincinnati zoo in 2016 after a 3 year old boy fell into the enclosure?",
            answers: ["Zeus", "Tony", "Cecil", "Harambe"],
            correctAnswer: 3
        },
        {
            question: "What is the name for a male bee that comes from an unfertilized egg?",
            answers: ["Drone", "Boy Bee", "Zote", "Lorx"],
            correctAnswer: 0
        },
        {
            question: "Cynophobia is the fear of what kind of animal?",
            answers: ["Cats", "Dogs", "Fish", "Spiders"],
            correctAnswer: 1
        },
        {
            question: "A flamboyance is a group of what animal?",
            answers: ["Peacocks", "Ocelots", "Flamingos", "Goats"],
            correctAnswer: 2
        },
        {
            question: "What is the national animal of Scotland?",
            answers: ["Unicorn", "Goat", "Scottie Dog", "Puffin"],
            correctAnswer: 0
        },
        {
            question: "How many hearts does an octopus have?",
            answers: ["1", "7", "3", "5"],
            correctAnswer: 2
        },
        {
            question: "What is the sleepiest animal in the world, sleeping around 22 hours each day?",
            answers: ["Cheetah", "Blue Whale", "Red Fox", "Koala"],
            correctAnswer: 3
        }
        ]
        correct = 0;
        incorrect = 0;
        index = -1;
        $("#answer0, #answer1, #answer2, #answer3,#question, #again, #score, #time").hide().off("click");

        start();
    }

    function start() {
        timer.reset();
        $("#start").on("click", function () {
            $("#time").show();
            $(".quiz").css("background-color", "rgba(250,235,215,.5)")
            proceed();
        })
    }

  //decides what next (either question or gameover screen)
    function proceed() {
        index++;
        if (index < questionArray.length) {
            promptQuestion();
            timeIsUp = setTimeout(outOfTime, 30 * 1000);
        }
        else {
            gameOver();
        }
    }

    //function to ask question
    function promptQuestion() {
        timer.start();
        $("#question").show().html(questionArray[index].question);
        $("#answer0").show().html(questionArray[index].answers[0]);
        $("#answer1").show().html(questionArray[index].answers[1]);
        $("#answer2").show().html(questionArray[index].answers[2]);
        $("#answer3").show().html(questionArray[index].answers[3]);
        $("#start").hide().off("click");
        clickAnswer();
    }

    //answer right or wrong
    function clickAnswer() {
        $(".btnAnswer").on("click", function () {
            var buttonClick = parseInt($(this).attr("value"));
            if (buttonClick === questionArray[index].correctAnswer) {
                rightAnswer();
            }
            else {
                wrongAnswer();
            }
        })
    }

    //functions for 3 scenarios: right, wrong, out of time
    function rightAnswer() {
        clearTimeout(timeIsUp);
        correct++;
        timer.stop();
        timer.reset();
        $("#time").empty();
        $("#question").html("<h2>You rock!</h2>");
        $("#answer0, #answer1, #answer2, #answer3").hide().off("click");
        timeIsUp = setTimeout(proceed, 3 * 1000);
    }

    function wrongAnswer() {
        clearTimeout(timeIsUp);
        incorrect++;
        timer.stop();
        timer.reset();
        $("#time").empty();
        $("#question").html("<h2>Nope! The correct answer is " + questionArray[index].answers[questionArray[index].correctAnswer] + "</h2>");
        $("#answer0, #answer1, #answer2, #answer3").hide().off("click");
        timeIsUp = setTimeout(proceed, 3 * 1000);
    }

    function outOfTime() {
        clearTimeout(timeIsUp);
        incorrect++;
        timer.stop();
        timer.reset();
        $("#time").empty();
        $("#question").html("<h2>Too slow, Joe! The correct answer is " + questionArray[index].answers[questionArray[index].correctAnswer] + "</h2>");
        $("#answer0, #answer1, #answer2, #answer3").hide().off("click");
        timeIsUp = setTimeout(proceed, 3 * 1000);
    }

    //end of game - prompts restart
    function gameOver() {
        $("#question").html("<h2>Good Job!</h2>");
        $("#score").show().html("Your results: <br><br>Correct: " + correct + "<br>Incorrect: " + incorrect);
        $("#start").hide().off("click");
        $("#start").show().text("Play again?");
        $("#start").on("click", function () {
            triviaQuestions();
            $("#start").text("Let's Start");
        })
    }
});


