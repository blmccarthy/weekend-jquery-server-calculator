$(readyNow);

function readyNow(){
    // test();
    $('#btn-add').on('click', selectAdd);
    $('#btn-subtract').on('click', selectSubtract);
    $('#btn-multiply').on('click', selectMultiply);
    $('#btn-divide').on('click', selectDivide);
    
    $('#btn-equals').on('click', sendInputs);
    // $('#btn-clear').on('click', clearInputs);
}

// function test(){ ///////////////////////////
//     $.ajax({                        
//         method: 'GET',
//         url: '/test'
//     }).then(function(response){     // What to do after server responds to our request (if successful)
//         console.log('test .then success!');
//     }).catch(function(response){    // If Server sends error, .catch() tells it how to handle it
//         console.log('test .get failed', response);
//     })        
// }


//// GLOBAL VARS //// -------------------------------------------


let equation;


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
    
    $.ajax({
        method: 'POST',     // Type of request
        url: '/sendInputs', // Route we will match on
        data: {             // Must be an object
            num1: $('#input-num1').val(),
            num2: $('#input-num2').val(),
            operator: operator
        }
    }).then(function(response) {
        console.log('sendInputs .then POST');
        console.log('equation:', equation);
        receiveAnswer();
    }).catch(function(response){
        console.log('sendInputs .catch POST', response);
    });
}


//// HELPER FUNCTIONS //// ---------------------------------------

function selectAdd(){
    operator = '+';
}
function selectSubtract(){
    operator = '-';
}
function selectMultiply(){
    operator = '*';
}
function selectDivide(){
    operator = '/';
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