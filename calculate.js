
window.addEventListener('load', function() {
  var buttons = document.getElementsByTagName('button');
  for ( var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', listener);
  }
});
//object to hold calculator data
var calculator = {
  currentNum: '',
  echoText: '',
  result: '0',
  operateor: '',
  activeValue: ''
};


// function to retrieve data
function updateScreenContent(contentTxt, elementId) {
  document.getElementById(elementId).innerHTML = contentTxt;
};



//function to listen and response button press
var listener = function(event) {
//all clear if statement
if (calculator.activeValue === 'ac') {
  allClear()
}
//clear entry
else if (calculator.activeValue === 'ce') {
  clearEntry()
}
//backspace
else if (calculator.activeValue === 'bkn' && calculator.currentNum !== ''){
  backSpace()
}
//decimal point
else if (!isNaN(calculator.activeValue) || calculator.activeValue === ".") {
  decimalPoint()
}
//standard operators
else if (calculator.activeValue === '+' || calculator.activeValue === '-' || calculator.activeValue === '*' || calculator.activeValue === '/') {
  standardOperators()
}
//equals is pressed
else if (calculator.activeValue === '=') {
  equals()
}

function allClear(){
  calculator.echoText = '';
  calculator.result = '0';
  calculator.activeValue = '';
  calculator.currentNum = '';
  updateScreenContent(calculator.echoText, 'echo');
  updateScreenContent(calculator.activeValue, 'result');
}

function clearEntry(){
  calculator.echoText = calculator.echoText.slice(0, calculator.echoText.length - calculator.currentNum.length);
  calculator.currentNum = '';
  updateScreenContent(calculator.echoText, 'echo');
  updateScreenContent(calculator.currentNum, 'result');
}

function backSpace(){
  calculator.echoText = calculator.echoText.slice(0, calculator.echoText.length - 1);
  calculator.currentNum = calculator.currentNum.slice(0, calculator.currentNum.length - 1);
  updateScreenContent(calculator.echoText, 'echo');
  updateScreenContent(calculator.currentNum, 'result');

}
function decimalPoint(){
  if (calculator.currentNum === '' && calculator.activeValue === ".") {
    calculator.activeValue = '0.';
  }
  calculator.echoText += calculator.activeValue;
  calculator.currentNum += calculator.activeValue;
  
  updateScreenContent(calculator.echoText, 'echo');
  updateScreenContent(calculator.currentNum, 'result');
}
function standardOperators(){
  theLastChar = calculator.echoText.charAt(calculator.echoText.length - 1);
  if (theLastChar === '+' || theLastChar === '-' || theLastChar === '*' || theLastChar === '/') {
    calculator.echoText = calculator.echoText.slice(0, calculator.echoText.length - 1) + calculator.activeValue;
    calculator.operateor = calculator.activeValue;
    updateScreenContent(calculator.echoText, 'echo');
  } else {
    calculator.echoText += calculator.activeValue;
    updateScreenContent(calculator.echoText, 'echo');

    if (calculator.operateor === '' || calculator.operateor === undefined) {
      calculator.result = calculator.currentNum;
      calculator.operateor = calculator.activeValue;
      calculator.currentNum = '';
    } else {
      calculator.result = eval(calculator.result + calculator.operateor + calculator.currentNum).toString();
      calculator.operateor = calculator.activeValue;
      updateScreenContent(calculator.result, 'result');
      calculator.currentNum = '';
    }
  }
}
function equals(){
  calculator.echoText += calculator.activeValue;
  calculator.result = eval(calculator.result + calculator.operateor + calculator.currentNum).toString();
  updateScreenContent(calculator.echoText + calculator.result, 'echo');
  updateScreenContent(calculator.result, 'result');
  calculator.currentNum = '';
  calculator.echoText = '';
  calculator.result = '0';
  calculator.operateor = '';
  calculator.activeValue = '';
}
}