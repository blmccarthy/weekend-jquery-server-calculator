$(readyNow);

function readyNow(){
    // Operator button click handlers
    $('#btn-add').on('click', clickAdd);
    $('#btn-subtract').on('click', clickSubtract);
    $('#btn-multiply').on('click', clickMultiply);
    $('#btn-divide').on('click', clickDivide);
    $('#btn-decimal').on('click', clickDecimal);
    $('#btn-clear').on('click', clickClear);
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
    console.log('equationArray', equationArray);

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


//// HELPER FUNCTIONS //// ------------------------

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
}
function clickSubtract(){
    equationArray.push({
        digit: '-',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' - ');
}
function clickMultiply(){
    equationArray.push({
        digit: '*',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' * ');
}
function clickDivide(){
    equationArray.push({
        digit: '/',
        type: 'operator'
    });
    $('#input-equation').val($('#input-equation').val() + ' / ');
}
function clickDecimal(){
    equationArray.push({
        digit: '.',
        type: 'number'
    });
    $('#input-equation').val($('#input-equation').val() + '.');
}

function clickClear() {
    $('#input-equation').val('');
    equationArray = '';
}
// #endregion

function renderToDom(res){
    console.log('in renderToDom');
    console.log('res:', res);
    
    $('#result').empty();
    // $('#result').append(res[res.length-1][res.length-1]);
    console.log('response', res[res.length-1][res.length]);
    
    $('#math-history').empty();

    for (let num of res){
        $('#math-history').append(`<li>${num[0]} ${num[1]} ${num[2]} = ${num[3]}</li>`);
    }
}