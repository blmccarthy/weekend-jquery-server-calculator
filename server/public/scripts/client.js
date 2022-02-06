$(readyNow);

function readyNow(){
    // Operator button click handlers
    $('#btn-add').on('click', clickAdd);
    $('#btn-subtract').on('click', clickSubtract);
    $('#btn-multiply').on('click', clickMultiply);
    $('#btn-divide').on('click', clickDivide);
    $('#btn-decimal').on('click', clickDecimal);
    $('#btn-equals').on('click', sendInputs);

    // Number button click handlers
    $('#btn-0').on('click', click0)
    $('#btn-1').on('click', click1)
    $('#btn-2').on('click', click2)
    $('#btn-3').on('click', click3)
    $('#btn-4').on('click', click4)
    $('#btn-5').on('click', click5)
    $('#btn-6').on('click', click6)
    $('#btn-7').on('click', click7)
    $('#btn-8').on('click', click8)
    $('#btn-9').on('click', click9)

    // Clear Buttons
    $('#btn-clear').on('click', clickClear);
    $('#btn-clear-history').on('click', clickClearHistory);

    // History li Click Handler
    $('ul').on('click', 'li', clickHistoryItem);

    receiveAnswer()
}


//// GLOBAL VARS //// -------------------------------------------

let equationArray = [];


//// GET ROUTES //// --------------------------------------------


// Simply receives full history of equations and appends to DOM
function receiveAnswer(){
    console.log('in receiveAnswer GET');
    $.ajax({
        method: 'GET',
        url: '/answer',
    }).then(function(response){
        renderToDom(response);
    }).catch(function(response){
        console.log('ERROR:', response);
        
    });
}


//// POST ROUTES //// --------------------------------------------

function sendInputs(){
    console.log('sendInputs clicked');
    
    // Ensure's equation is valid before sending to server
    if (inputValidation() === false){
        return alert('Stop trying to break my my calculator 😡😡😡');
    }

    $.ajax({
        method: 'POST',     // Type of request
        url: '/sendInputs', // Route we will match on
        data: {             // Must be an object
            equationArray,
        }
    }).then(function(response) {
        console.log('sendInputs .then POST');
        receiveAnswer();
    }).catch(function(response){
        console.log('sendInputs .catch POST', response);
    });
} // end sendInputs

function clickHistoryItem(){
    // Grabs index of <li> to correlate with array object on server
    equationToRetrieve = $(this)[0].dataset.index

    $('*').removeClass('selected');
    $(this).addClass('selected');
    

    $.ajax({
        method: 'POST',             // Type of request
        url: '/retrieveHistItem',   // Route we will match on
        data: {                     // Must be an object
            equationToRetrieve,
        }
    }).then(function(res) {
        console.log('retrieveHistItem .then POST');
        console.log('res:', res);
        renderResult(res)
    }).catch(function(res){
        console.log('retrieveHistItem .catch POST', response);
    });
} // end clickHistoryItem


//// DELETE ROUTES //// ------------------------------------------

function clickClearHistory(){
    console.log('clear History clicked');
    
    $.ajax({
        method: 'DELETE',     
        url: '/deleteHistory' 
    }).then(function(res) {
        console.log('deleteHistory .then DELETE');
        renderToDom(res)
    }).catch(function(res){
        console.log('deleteHistory .catch DELETE', res);
    });
}


//// HELPER FUNCTIONS //// ---------------------------------------


// #region : Number Button Functions

function click0(){
    equationArray.push({
        digit: 0,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '0');
}
function click1(){
    equationArray.push({
        digit: 1,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '1');
}
function click2(){
    equationArray.push({
        digit: 2,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '2');
}
function click3(){
    equationArray.push({
        digit: 3,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '3');
}
function click4(){
    equationArray.push({
        digit: 4,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '4');
}
function click5(){
    equationArray.push({
        digit: 5,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '5');
}
function click6(){
    equationArray.push({
        digit: 6,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '6');
}
function click7(){
    equationArray.push({
        digit: 7,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '7');
}
function click8(){
    equationArray.push({
        digit: 8,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '8');
}
function click9(){
    equationArray.push({
        digit: 9,
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '9');
}
// #endregion


// #region : Operator Button Functions

function clickAdd(){
    equationArray.push({
        digit: '+',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' + ');
    disableOperators()
    enableDecimal()
}
function clickSubtract(){
    equationArray.push({
        digit: '-',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' - ');
    disableOperators()
    enableDecimal()
}
function clickMultiply(){
    equationArray.push({
        digit: '*',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' * ');
    disableOperators()
    enableDecimal()
}
function clickDivide(){
    equationArray.push({
        digit: '/',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' / ');
    disableOperators()
    enableDecimal()
}
function clickDecimal(){
    equationArray.push({
        digit: '.',
        type: 'decimal'
    });
    $('#input-equation').val($('#input-equation').val() + '.');
    disableDecimal()
}

function clickClear() {
    // Clears the input and equation array
    $('#input-equation').val('');
    equationArray = [];
    enableOperators()
    enableDecimal()
}

function disableOperators(){
    $('#btn-add').prop('disabled', true);
    $('#btn-subtract').prop('disabled', true);
    $('#btn-multiply').prop('disabled', true);
    $('#btn-divide').prop('disabled', true);
}

function enableOperators(){
    $('#btn-add').prop('disabled', false);
    $('#btn-subtract').prop('disabled', false);
    $('#btn-multiply').prop('disabled', false);
    $('#btn-divide').prop('disabled', false);
}

function disableDecimal(){
    $('#btn-decimal').prop('disabled', true);
}

function enableDecimal(){
    $('#btn-decimal').prop('disabled', false);
}

// #endregion


function renderToDom(res){
    console.log('in renderToDom');
    console.log('res:', res);
    
    // Renders ONLY the result
    renderResult(res)
    
    // Renders ONLY the History
    $('#math-history').empty();
    for (i = 0; i < res.length; i++){
        $('#math-history').prepend(`<li data-index="${i}">${res[i][0]} ${res[i][1]} ${res[i][2]}</li>`);
        // Adds 'selected' styling to latest equation
        if ( i === res.length-1){            
            $(`[data-index="${i}"]`).addClass('selected');
        }
    }
} // end renderToDom


function renderResult(res){
    // Grabs the last value in the flat array (aka: latest result)
    latestResult = res.flat()[res.flat().length-1]    

    // empty result & append latest result
    $('#result').empty();
    $('#result').append(latestResult);
} // end renderResult

function inputValidation(){
    let num1Exist = false;      // does 1st num exist?
    let operatorExist = false;  // does operator exist?
    let num2Exist = false;      // is last num in array a number?

    // Validates 1st digit in array is a number
    if (equationArray[0].type === 'number'){
        num1Exist = true;
    }
    // Validates that operator exists in array
    for (let i = 0; i < equationArray.length; i++){
        if (equationArray[i].type === 'operator'){
            operatorExist = true;
        }
    }
    // Validates that the final digit is a number
    if (equationArray[equationArray.length-1].type === 'number'){        
        num2Exist = true;
    }
    // Validates that ALL validations are true
    if (num1Exist && operatorExist && num2Exist){
        return true;
    } else {
        console.log(num1Exist, operatorExist, num2Exist);
        return false;
    }
} // end inputValidation