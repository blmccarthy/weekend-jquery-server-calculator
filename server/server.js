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
    res.send(result)
})



//// POST ROUTES //// --------------------------------------------


app.post('/sendInputs', function(req, res){
    console.log('in server POST /sendInputs');
    console.log('req.body:', req.body);
    // req.body.result = solveEquation(req.body);

    parseArray(req.body.equationArray);

    // mathHistory.push(req.body)
    // console.log('math History', mathHistory);
    // res.send(mathHistory)
    // res.send('420');
})



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
    result = solveEquation(parsedEquationArray);
    console.log('result:', result);
    
} // end parseArray



function solveEquation(arr){
    // even indexes converted from string to number
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
  