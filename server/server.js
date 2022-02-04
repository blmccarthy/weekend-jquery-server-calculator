//// START SERVER //// ------------------------------------------


const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



//// GET ROUTES //// --------------------------------------------



app.get('/test', function(req, res) {
    console.log('in test .get');
    res.send('test');
})



//// POST ROUTES //// --------------------------------------------


app.post('/sendInputs', function(req, res){
    console.log('in server POST /sendInputs');
    console.log('req.body:', req.body);

})

//// HELPER FUNCTIONS //// ---------------------------------------


//// END //// ----------------------------------------------------


app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })
  