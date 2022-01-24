var gamePattren=[];
var userClickedPattern=[];
var buttonColors=["red","blue","yellow","green"];
var level=0;
var tog="false";

//starting the game when user pressed any key tog var to make sure this is claeed only once at starting of game
  $(document).keypress(function(){
if(tog==="false"){
  $("h1").text("Level 0");
  tog="true";

//next sequence called so that a button is flashed intially and user starts the game.
  nextSequence();}
});

//this is to capture button click by user
$(".btn").click(function(event){

  //this puts the value of button pressed by user in var userChoosenColor.can also be done by $(this).attr("id");
  var userChoosenColor=event.target.id;

  //pushing user choosen buttonColor into userClickedPattern array.
  userClickedPattern.push(userChoosenColor);

  //calling playAudio and animatePress functions to play audio and run animation of this specific color.
  playAudio(userChoosenColor);
  animatePress(userChoosenColor);

  //to check if user is entering right pattren.
checkAnswer(userClickedPattern.length-1);

});

//this has index of latest vcolor clicked by the user.
function checkAnswer(lastIndex)
{
  if(userClickedPattern[lastIndex]===gamePattren[lastIndex])
  {
  //  this is to check if user has clicked all buttons of current exsisting pattern
    if(userClickedPattern.length===gamePattren.length)
    {
      //waits 1 sec and calls nextSequence function to continue the game by flashing new color
      setTimeout(nextSequence,1000);
    }
  }

//if a wrong button is pressed wrong ans audio is played.
  else
  {
    var endSound=new Audio("sounds/wrong.mp3");
    endSound.play();
    $("h1").text("Game Over, Press Any Key to Restart");

    //this class adds red color to whole screen we have also added timeout so that this class is apllied for 0.2
    //sec hence creating an effect.
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    restart();
  }
}

//reset all values
function restart()
{
  userClickedPattern.splice(0, userClickedPattern.length);
  gamePattren.splice(0, gamePattren.length);
  level=0;
  tog="false";


}

function nextSequence()
{
  userClickedPattern.splice(0, userClickedPattern.length);

//selecting the next random color

  var randomNumber=Math.random();
  randomNumber=randomNumber*4;
  randomNumber=Math.floor(randomNumber);
var randomChoosenColor=buttonColors[randomNumber];

//pushing that buttonColor into game pattern array
gamePattren.push(randomChoosenColor);


//adding flash animation to random selected buttonColors
$("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playAudio(randomChoosenColor);

level++;

$("h1").text("Level  "+level);



}
//plays audio different color has different audio associated with it.
function playAudio(randomChoosenColor){
  switch (randomChoosenColor) {
    case "red":var redSound=new Audio("sounds/red.mp3");
  redSound.play();

      break;

      case "blue":var blueSound=new Audio("sounds/blue.mp3");
      blueSound.play();

        break;

        case "yellow":var yellowSound=new Audio("sounds/yellow.mp3");
      yellowSound.play();

          break;

          case "green":var greenSound=new Audio("sounds/green.mp3");
        greenSound.play();

            break;
    default:console.log(randomChoosenColor);

  }
}

//animation added to button pressed.
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");

  },100);
}
