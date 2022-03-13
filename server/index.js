const express = require('express');

const cors = require('cors');

const app = express();

//use cors to allow cross origin resource sharing
// app.use(
//   cors({
//     origin: 'http://localhost:3006',
//     credentials: true,
//   })
// );
// const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let books = [];

let response= [];

app.post('/create', function(req, res) {
    console.log("this req.body: ", req.body);

    const newBook = {
        Name: req.body.Name,
        EmailAdd: req.body.EmailAdd,
        Phone: req.body.Phone,
        Experiment:req.body.Experiment
    };

   
    console.log("newBook:", newBook)
    response.push(newBook);
    console.log("response:",response);

    console.log("res.req:",res.req.body )
    return res.end(JSON.stringify(response));
});

app.get('/home', function(req, res) {
  console.log('get response');
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  console.log('response : ', JSON.stringify(response));
  res.end(JSON.stringify(response));
});

//start your server on port 3001
app.listen(3006, () => {
  console.log('Server Listening on port 3006');
});