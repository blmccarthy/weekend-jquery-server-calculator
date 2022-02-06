//// START SERVER //// ------------------------------------------


const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



//// GLOBAL VARS //// -------------------------------------------


let mathHistory = [];
let result = 0;


//// GET ROUTES //// --------------------------------------------


// app.get('/test', function(req, res) {
//     console.log('in test .get');
//     res.send('test');
// })

app.get('/answer', function (req, res) {
    console.log('in answer .get');
    console.log('in /answer- result:', result);
    
    res.send(mathHistory)
});


//// POST ROUTES //// --------------------------------------------


app.post('/sendInputs', function(req, res){
    console.log('in server POST /sendInputs', req.body);
    // Parses response
    parsedEquationArray = parseArray(req.body.equationArray);
    // Solves equation in parsed Array
    result = solveEquation(parsedEquationArray);
    // Push result to parsedEquationArray
    parsedEquationArray.push(result)
    // Push complete equation to mathHistory
    mathHistory.push(parsedEquationArray)
    console.log('mathHistory:', mathHistory);
    // Post Successful Code
    res.sendStatus(201);
});

app.post('/retrieveHistItem', function(req, res){
    console.log('in /retrieveHistItem POST');
    let index = req.body.equationToRetrieve
    
    console.log(mathHistory[index]);
    res.send(mathHistory[index]);
});


//// DELETE ROUTES //// ------------------------------------------


app.delete('/deleteHistory', function(req, res){
    console.log('in /deleteHistory DELETE');
    mathHistory = [];
    res.send(mathHistory)
});

//// HELPER FUNCTIONS //// ---------------------------------------


function parseArray(arr){
    console.log('in parseArray');

    let parsedEquationArray = []; // new array to store values
    let iC = inputCounter = 0; // tells loop when to move onto next array index

    for (let object of arr){
        // solves issue with digits starting with 'undefined' value
        // example: 'undefined100' >>> '100'
        if (parsedEquationArray[iC] === undefined){
            parsedEquationArray[iC] = '';
        }
        // appends number digits to same index until a object.type:operator is found
        // example: '1' >>> '10' >>> '100'
        if (object.type === 'number'){
            parsedEquationArray[iC] += object.digit;
        }
        // operators are pushed to their own index
        else if (object.type === 'operator'){
            iC++;
            parsedEquationArray[iC] = object.digit;
            iC++;
        }    
    }
    return parsedEquationArray
} // end parseArray



function solveEquation(arr){
    console.log('in solveEquation');
    
    // even # indexes converted from string to number
    for (i = 0; i < arr.length; i++){
        if (i % 2 === 0){
            arr[i] = parseFloat(arr[i])
        }
    }

    // set variables
    let input01 = arr[0]
    let input02 = arr[2]

    // solve equation based on operator (arr[1])
    if (arr[1] === "+"){
        return input01 + input02;
    }
    if (arr[1] === "-"){
        return input01 - input02;
    }
    if (arr[1] === "*"){
        return input01 * input02;
    }
    if (arr[1] === "/"){
        return input01 / input02;
    }
    
} // end solveEquation



//// END //// ----------------------------------------------------


app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })