(function() {
  var questions = [{
    question: "*1.Why do you drink tea?",
    choices: ["Health Benefits-Diet Support/Detox","Habit and Routine","Relaxation","Medicinal(to provide energy etc.)","Alternative to Coffee","Socialize and Get Together","I don't drink tea","Other"],
    correctAnswer: 2
  }, {
    question: "*2.How often do you drink tea?",
    choices: ["Daily","2-3 times in week","Once a week","Occasionally","Never"],
    correctAnswer: 4
  }, {
    question: "*3.Where do you typically enjoy your tea?",
    choices: ["At Home","At Tea Shop/Cafe","At Work","Street Tea Stalls"],
    correctAnswer: 0
  }, {
    question: "*4.What kind of tea do you like to drink most?",
    choices: ["Kadak","Aromatic","Malty(thicker texture)","Without milk"],
    correctAnswer: 3
  }, {
    question: "*5.Tick Your Preference with respect to Tea?",
    choices: ["Price(Price matters the most to me)","Availability/Convenience(which is available nearby, regardless of the price)","Quality/Taste(I don't mind paying a premium for good quality tea)","Family Preference(I buy what my family prefer to drink)","Never"],
    correctAnswer: 4
  },{
    question: "*6.How much do you typically spend on a cup of tea?",
    choices: ["Below Rs.100","Rs.100-Rs.200","Rs.200-Rs.300","Above Rs.300"],
    correctAnswer: 4
  },{
    question: "*7.Which is the best quality of tea that comes sto your mind first?",
    choices: ["Assam","Darjeeling","Munnar","All of them","None of them"],
    correctAnswer: 4
  },{
    question: "*8.How did you get to know about tea valley tea?",
    choices: ["TV advertisement","Newspaper","Hoardings","Internet","Amazon /Flipkart","Retail store","Friend/family recommendation","Other"],
    correctAnswer: 4
  },{
    question: "*9.What drives you to a new cafe?",
    choices: ["Friend's recommendation","Bloggers/Influencers","My willingness to try out new cafe","Online Media-Zomato/Facebook", "Brand Communication and Advertising"],
    correctAnswer: 4
  },{
    question: "*10.What is your age?",
    choices: ["18 to 24","25 to 34","35 to 44","45 to 54","55 to 64","65 to 74","75 or older"],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    // var score = $('<p>',{id: 'question'});
    
    // var numCorrect = 0;
    // for (var i = 0; i < selections.length; i++) {
    //   if (selections[i] === questions[i].correctAnswer) {
    //     numCorrect++;
    //   }
    // }
    
    // score.append('You got ' + numCorrect + ' questions out of ' +
    //              questions.length + ' right!!!');
    // return score;
  }
})();