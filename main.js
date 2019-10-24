$(document).ready(function () {
// CREATE BUTTONS FOR THE LETTERS TO BE PICKED//
var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
var letters = alphabet.map(function(letter){
    return `
      <button id="${letter}"class="letters">${letter}</button> 
    `
})
$("#buttons").html(letters)
// FILTER THE ARRAY TO RETURN ONLY THE WORDS LONGER THAN 3 LETTERS
const longWords = commonWords.filter((words)=>words.length> 2)
     console.log(longWords)

/////////GAME FUNCTION TO BE RUN ON WINDOW REFRESH/////////
function game(){
    // DECIDE ON NEW RANDOM WORD FOR GAME
   var currentWord = longWords[Math.floor(Math.random()* longWords.length)];
   var upper = currentWord.toUpperCase();

//LOG CURRENT WORD TO CONSOLE//
console.log(`current word is '${upper}'`);
   
//DISPLAY UNDERSCORES FOR NUMBER OF LETTERS//
var wordspaces = upper.split('')
var underscores =""
 function hiddenWord(){
    for(i =0; i<wordspaces.length; i++){
        underscores+= "_"
    }
}
// CALL THE FUNCTION AND PLACE UNDERSCORES IN PLACE OF THE LETTERS FOR THE WORD
hiddenWord();
$("#wordspaces").html(underscores);

// get word length and console.log the length of the word
    var wordLength = upper.length
    console.log(`current word length is:${wordLength}`)

    //set lives value
    var lives = 5

//DISPLAY HOW MANY LIVES REMAIN
    $("#lives").html(`You have ${lives} lives left! Choose carefully!`)

//EVENT HANDLER FOR WHEN THE BUTTON IS CLICKED TO GUESS A LETTER
    var guessed = ""
    $(".letters").on('click', function(){
        
//DISABLE THE BUTTON THAT WAS CLICKED AND CHANGE CSS
    this.disabled = true;
    $(this).css("background", "red");

//GRAB THE ID OF THE BUTTON THAT WAS CLICKED
    var buttonClicked = $(this).attr('id')

//DISPLAY THE LETTER THAT WAS CLICKED AND LOG IT TO THE CONSOLE AS WELL
    console.log(guessed);
    var b = guessed += buttonClicked;
    $("#guessed").html(`<p class="para1">You have guessed</p><span class ="guessedletters">${b}</span><p class="para2">thus far. be careful...</p>`)

    //CHECK TO SEE IF THE LETTER GUESSED MATCHES A LETTER IN THE WORD
        if(currentWord.includes(buttonClicked.toLowerCase())){
            console.log(buttonClicked)

    //LOOP THROUGH THE UNDERSCORES AND FIND THE INDEX OF THE MATCHED LETTER OF THE CURRENT WORD
            for(let i =0; i <underscores.length; i++){
                if(currentWord[i]===buttonClicked.toLowerCase()){

    //REPLACE THE UNDERSCORE WITH THE LETTER OF THE MATCHED INDEX
                    wordArr = underscores.split('')
                    wordArr[i] = buttonClicked
                    underscores = wordArr.join('')
                    $("#wordspaces").html(underscores);

//IF THE REPLACED UNDERSCORES WORD MATCHES THE CURRENT WORD, END THE GAME 
                    if(underscores.toLowerCase()=== currentWord){
                        $("#lives").html("Congratulations! You win motherfucker!");
                        $("#buttons").hide();
                        $("#restart").show();
                        $("#restart").css('background','pink')
                        $("#guessed").hide();
                        document.getElementById('myAudio2').play();  
                    }
                }
            }
              
//if letter is not included and you have more than one life left
        }else if(currentWord.includes(buttonClicked) !== true&&lives >1){
            lives--;
            $("#lives").html(`You have ${lives} lives left! Choose carefully!`)

//if letter is not included and you had 1 life left
    } else if(!currentWord.includes(buttonClicked)&&lives===1){
        $("#lives").html(`You have 0 Lives left... GAME OVER.`)
        $("#buttons").hide();
        $("#restart").show();
        document.getElementById("myAudio").play();
        $("#guessed").hide();
    } 

})
//RELOAD THE PAGE WHEN RESTART BUTTON IS CLICKED//
$("#restart").on('click', function(){
    window.location.reload();
})
}
//RUN THE GAME FUNCTION ON PAGE LOAD//
game();
})
