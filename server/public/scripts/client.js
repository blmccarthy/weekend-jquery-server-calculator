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
        // receiveAnswer();
    }).catch(function(response){
        console.log('sendInputs .catch POST', response);
    });
}


//// HELPER FUNCTIONS //// ---------------------------------------


// Number Button Functions

function click0(){
    equationArray.push(0);
    $('#input-equation').val($('#input-equation').val() + '0');
}
function click1(){
    equationArray.push(1);
    $('#input-equation').val($('#input-equation').val() + '1');
}
function click2(){
    equationArray.push(2);
    $('#input-equation').val($('#input-equation').val() + '2');
}
function click3(){
    equationArray.push(3);
    $('#input-equation').val($('#input-equation').val() + '3');
}
function click4(){
    equationArray.push(4);
    $('#input-equation').val($('#input-equation').val() + '4');
}
function click5(){
    equationArray.push(5);
    $('#input-equation').val($('#input-equation').val() + '5');
}
function click6(){
    equationArray.push(6);
    $('#input-equation').val($('#input-equation').val() + '6');
}
function click7(){
    equationArray.push(7);
    $('#input-equation').val($('#input-equation').val() + '7');
}
function click8(){
    equationArray.push(8);
    $('#input-equation').val($('#input-equation').val() + '8');
}
function click9(){
    equationArray.push(9);
    $('#input-equation').val($('#input-equation').val() + '9');
}

// Operator Button Functions

function clickAdd(){
    operator = '+';
    equationArray.push('+');
    $('#input-equation').val($('#input-equation').val() + ' + ');
}
function clickSubtract(){
    operator = '-';
    equationArray.push('-');
    $('#input-equation').val($('#input-equation').val() + ' - ');
}
function clickMultiply(){
    operator = '*';
    equationArray.push('*');
    $('#input-equation').val($('#input-equation').val() + ' * ');
}
function clickDivide(){
    operator = '/';
    equationArray.push('/');
    $('#input-equation').val($('#input-equation').val() + ' / ');
}
function clickDecimal(){
    equationArray.push('.');
    $('#input-equation').val($('#input-equation').val() + '.');
}

function clickClear() {
    $('#input-equation').val('');
    equationArray = '';
}

function renderToDom(res){
    console.log('in renderToDom');
    $('#result').empty();
    $('#result').append(res[res.length - 1].result);
    $('#math-history').empty();
    for (let num of res){
        $('#math-history').append(`<li>${num.num1} ${num.operator} ${num.num2} = ${num.result}</li>`)
    }
}

