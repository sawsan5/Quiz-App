//select elments
let countSpan=document.querySelector(".count span");
let bulletsSpsnContainer=document.querySelector(".bullets .spans");
let quizAre=document.querySelector(".quiz-area");
let answerArea=document.querySelector(".answer-area");
let submitButton=document.querySelector(".submit-button");
let bullets=document.querySelector(".bullets");
let ResultsContainer=document.querySelector(".results");
let countdownElement=document.querySelector(".countdown");

let currentIndex=0;
let rightAnswer=0;
let countdownl;

function getQuestions(){
let myRequest=new XMLHttpRequest();

myRequest.onreadystatechange=function(){
    if(this.readyState===4 && this.status===200){
    let questonsObject=JSON.parse(this.responseText);
    let questionsCount=questonsObject.length;

    //create bullets+set questions count
createBullets(questionsCount);

//Add Question Data
addQuestionData(questonsObject[currentIndex],questionsCount);

 // countdown
 countdown(3,questionsCount);

//click on submit
submitButton.onclick=()=>{
    let theRightAnswer=questonsObject[currentIndex].right_answer;

    //increase index
    currentIndex++;

//check the answer
checkAnswer(theRightAnswer,questionsCount);

//remove previous question
quizAre.innerHTML="";
answerArea.innerHTML="";

//add question data
addQuestionData(questonsObject[currentIndex],questionsCount);

//handle bullets class
handleBullets();

// countdown
clearInterval(countdownl);
countdown(3,questionsCount);

//show Results
showResults(questionsCount);


};

}

};

myRequest.open("GET","html_questions.json",true);
myRequest.send();

}
getQuestions();

function createBullets(num){
    countSpan.innerHTML=num; 

    //create spans
    for(let i=0;i<num;i++){
        //create bullet
        let theBullet=document.createElement("span");

        //check if its first span
        if(i===0)
        theBullet.className="on";

        //Append bullet to main bullet container
        bulletsSpsnContainer.appendChild(theBullet);
    }
}
function addQuestionData(obj,count){
    if(currentIndex < count){
    //create H2 Question Title
    let questionTitle=document.createElement("h2");

    //create question text
    let questonText=document.createTextNode(obj['title']);

//Append Text To h2
questionTitle.appendChild(questonText);

//Append the h2 To The Quiz Area
quizAre.appendChild(questionTitle);

//creat the answer 
for(let i=1;i<=4;i++){

    //ceate main answer div 
    let mainDiv=document.createElement("div");

    //add class to main div
    mainDiv.className="answer";

    //create ridio input
    let radioInput=document.createElement("input");

    //add type +name +id +data attribute
    radioInput.type="radio";
    radioInput.name="questions";
    radioInput.id=`answer_${i}`;
    radioInput.dataset.answer=obj[`answer_${i}`];
    
    //make first option selected
    if(i==1)
    radioInput.checked=true;

    //create lable
    let theLabel=document.createElement("label");

    //add foe attribute
    theLabel.htmlFor=`answer_${i}`;

    //create lable Text
    let theLabelText=document.createTextNode(obj[`answer_${i}`]);
    
    //add the text to label
    theLabel.appendChild(theLabelText);

    //add input+label to min div
    mainDiv.appendChild(radioInput);
    mainDiv.appendChild(theLabel);

    //append all divs to answer area
    answerArea.appendChild(mainDiv);
}  
}
}
function checkAnswer(RAnswer,qCount){

    let answers=document.getElementsByName("questions");
    let theChoosenAnswer;

    for(let i=0; i<answers.length ;i++){

        if(answers[i].checked){
        theChoosenAnswer=answers[i].dataset.answer;}
    }
if(RAnswer==theChoosenAnswer)
rightAnswer++;
}

function handleBullets(){
    let bulletsSpans=document.querySelectorAll(".bullets .spans span");
    let arrayOfSpan=Array.from(bulletsSpans);
    arrayOfSpan.forEach ((span, index) => {
      if(currentIndex===index)
           span.className="on";
    });
    
}

function showResults(qCount){
    let theResults;
    if(currentIndex===qCount){
        quizAre.remove();
        answerArea.remove();
        submitButton.remove();
        bullets.remove();

        if(rightAnswer>(qCount/2) && rightAnswer<qCount){
        theResults=`<span class="good">Good</span>, 
        ${rightAnswer} From ${qCount}`;}

        else if ( rightAnswer===qCount){
        theResults=`<span class="perfect">Perfect</span>, 
        ${rightAnswer} From ${qCount}`;}

        else { theResults=`<span class="bad">try agin</span>, 
        ${rightAnswer} From ${qCount}`;}

        ResultsContainer.innerHTML=theResults;
        ResultsContainer.style.padding="10px";
        ResultsContainer.style.backgroundcolor="white";
        ResultsContainer.style.marginTop="10px";


    }

}
function countdown(duration,count){
    if(currentIndex < count){
        let minutes, seconds;
        countdownl=setInterval(function (){
            minutes=parseInt(duration/60);
            seconds=parseInt(duration%60);

            minutes=minutes < 10 ?`0${minutes}`:minutes;
            seconds=seconds < 10 ?`0${seconds}`:seconds;

         countdownElement.innerHTML=`${minutes}:${seconds}`;

if(--duration<0){
    clearInterval(countdownl);
    submitButton.click();
}

        },1000);


    }

}













