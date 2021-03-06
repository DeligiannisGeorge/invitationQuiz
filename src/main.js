  $(document).ready(function(){
(function() {
  var questions = [{
    question: "Με ποια ετικέτα δηλώνουμε τον τύπο ένος html αρχείου;",
    choices: ["&lt;!DOCTYPE html&gt;", "&lt;!DOCTYPE css>", "&lt;!DOCTYPE js>", "&lt;!DOCTYPE jquery>", "&lt;!DOCTYPE>"],
    correctAnswer: 0
  }, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
  }, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
  }, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  function error(error, vis) {
    $(error).slideDown (1900, 'easeOutBounce');
    $('#next').hide();
    $(vis).css('visibility','visible');
  }

  function removeDivA() {
    if (questionCounter === 0) {
        $('#ccc').slideUp();
        $('#next').show();
    }
  }
  function removeDivB() {
    if (questionCounter === 1) {
        $('#eee').slideUp();
        $('#next').show();
    }
  }
  function removeDivC() {
    if (questionCounter === 2) {
        $('#aaa').slideUp();
        $('#next').show();
    }
  }
  function removeDivD() {
    if (questionCounter === 3) {
        $('#bbb').slideUp();
        $('#next').show();
    }
  }
  function removeDivE() {
    if (questionCounter === 4) {
        $('#ddd').slideUp();
        $('#next').show();
    }
  } 

  function addDivA() {
    if (questionCounter === 1 && selections[0] === questions[0].correctAnswer) {
        displayNext();
        $('#imgc').css('visibility','visible');
        $('#c').slideDown(1500);
    }
    else if (questionCounter === 1) {
        error('#ccc', '#imgc');
    }
  }
  function addDivB() {
    if (questionCounter === 2 && selections[1] === questions[4].correctAnswer) {
        displayNext();
        $('#imge').css('visibility','visible');
        $('#e').slideDown(1500);
    }
    else if (questionCounter === 2) {
        error('#eee', '#imge');
    }
  }
  function addDivC() {
    if (questionCounter === 3 && selections[2] === questions[0].correctAnswer) {
        displayNext();     
        $('#imga').css('visibility','visible');
        $('#a').slideDown(1500);

    }
    else if (questionCounter === 3) {
        error('#aaa', '#imga');
    }
  }
  function addDivD() {
    if (questionCounter === 4 && selections[3] === questions[3].correctAnswer) {
        displayNext();
        $('#imgb').css('visibility','visible');
        $('#b').slideDown(1500);
    }
    else if (questionCounter === 4) {
        error('#bbb', '#imgb');
    }
  }
  function addDivE() {
    if (questionCounter === 5 && selections[4] === questions[4].correctAnswer) {
        $('#imgd').css('visibility','visible');
        $('#d').slideDown(1500);
        $('#question').remove();
        $('#next').hide();
        $("#quiz").append('<p>Συγχαρητήρια! Απάντησες σωστά και στις 5 ερωτήσεις</p>');
        $("#container").slideUp(1500);
        $(".button2").show('slow'); 
    }
    else if (questionCounter === 5) {
        error('#ddd', '#imgd');

    } 
  }

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
      alert('Επίλεξε μια από τις 5 απαντήσεις, για να συνεχίσεις!');
    } else {
      questionCounter++;      
      addDivA();
      addDivB();
      addDivC();
      addDivD();
      addDivE();
    }
  });
  
  // Click handler for the 'prev' button
  $('.prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--
    removeDivA()
    removeDivB()
    removeDivC()
    removeDivD()
    removeDivE()
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
    removeDiv();
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
    
    var header = $('<h2>Ερώτηση ' + (index + 1) + ':</h2>');
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
        // $('#next').hide();
        // $('#prev').hide();
        // $('#start').show();

      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
  function final() {
      ('Συγχαρητήρια! Απάντησες σωστά και στις 5 ερωτήσεις');
  }
    return score;
  }

})();
});