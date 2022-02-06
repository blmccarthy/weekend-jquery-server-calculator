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

}


//// GLOBAL VARS //// -------------------------------------------

let equationArray = [];


//// GET ROUTES //// --------------------------------------------

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
    console.log('equationArray:', equationArray);
    
    // Ensure's equation is valid before sending to server
    if (inputValidation() === false){
        return alert('Please ensure you entered a valid equation!');
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
}


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
}
function clickSubtract(){
    equationArray.push({
        digit: '-',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' - ');
    disableOperators()
}
function clickMultiply(){
    equationArray.push({
        digit: '*',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' * ');
    disableOperators()
}
function clickDivide(){
    equationArray.push({
        digit: '/',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' / ');
    disableOperators()
}
function clickDecimal(){
    equationArray.push({
        digit: '.',
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '.');
}

function clickClear() {
    // Clears the input and equation array
    $('#input-equation').val('');
    equationArray = [];
    enableOperators()
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

// #endregion


function renderToDom(res){
    console.log('in renderToDom');
    console.log('res:', res);
    
    
    // Grabs the last value in the flat array (aka: latest result)
    latestResult = res.flat()[res.flat().length-1]    

    // empty result & append latest result
    $('#result').empty();
    $('#result').append(latestResult);
    
    // empty math history list & re-append updated history list
    $('#math-history').empty();
    for (let index of res){
        $('#math-history').prepend(`<li>${index[0]} ${index[1]} ${index[2]}</li>`);
    }
}

function inputValidation(){
    let num1Exist = false;      // does 1st num exist?
    let operatorExist = false;  // does operator exist?
    let num2Exist = false;      // does 2nd num exist AFTER operator?
    let operatorIndex = 0;
    // Validates 1st digit in array is a number
    if (equationArray[0].type === 'number'){
        num1Exist = true;
    }
    // Validates that operator exists in array
    for (let i = 0; i < equationArray.length; i++){
        if (equationArray[i].type === 'operator'){
            operatorExist = true;
            operatorIndex = i;
        }
    }
    // Validates that the operator isn't LAST digit in array
    if (operatorIndex < equationArray.length-1){        
        num2Exist = true;
    }
    // Validates that ALL validations are true
    if (num1Exist && operatorExist && num2Exist){
        return true;
    } else {
        console.log(num1Exist, operatorExist, num2Exist);
        return false;
    }
}