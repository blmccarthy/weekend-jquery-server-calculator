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


//// GET ROUTES //// --------------------------------------------



app.get('/test', function(req, res) {
    console.log('in test .get');
    res.send('test');
})

app.get('/answer', function (req, res) {
    console.log('in answer .get');
    res.send(mathHistory)
})



//// POST ROUTES //// --------------------------------------------


app.post('/sendInputs', function(req, res){
    console.log('in server POST /sendInputs');
    console.log('req.body:', req.body);
    req.body.result = solveEquation(req.body);
    


    mathHistory.push(req.body)
    console.log('math History', mathHistory);
    res.send(mathHistory)
})

//// HELPER FUNCTIONS //// ---------------------------------------

function solveEquation(object){
    console.log('in solveEquation');
    
    let num1 = parseFloat(object.num1);
    let num2 = parseFloat(object.num2);
    let operator = object.operator;

    // returns answer dependant on operator
    if (operator === '+'){
        console.log('in add');
        console.log(num1 + num2);
        return num1 + num2;
    }
    else if (operator === '-'){
        console.log(num1 - num2);
        return num1 - num2;
    }
    else if (operator === '*'){
        console.log(num1 * num2);
        return num1 * num2;
    }
    else if (operator === '/'){
        console.log(num1 / num2);
        return num1 / num2;
    }

}

//// END //// ----------------------------------------------------


app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })
  