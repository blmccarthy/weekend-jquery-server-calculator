$(readyNow);

function readyNow(){
    test();
    $('#btn-equals').on('click', sendInputs);
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


//// GET ROUTES //// --------------------------------------------






//// POST ROUTES //// --------------------------------------------


function sendInputs(){
    console.log('sendInputs clicked');
    
    $.ajax({
        method: 'POST',     // Type of request
        url: '/sendInputs', // Route we will match on
        data: {             // Must be an object
            num1: $('#input-num1').val(),
            num2: $('#input-num2').val(),
        }
    }).then( function(response) {
        console.log('sendInputs .then POST');
    }).catch(function(response){
        console.log('sendInputs .catch POST', response);
    });
}


//// HELPER FUNCTIONS //// ---------------------------------------




