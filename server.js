const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const env= require('dotenv');
const sgMail = require('@sendgrid/mail');
env.load();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set("views", "./views");

app.set('view engine', 'ejs');

var profile = require('./profile');

app.use('/profile', profile);

// var typedreq=require('./typed.min.js');

// app.use('/typed.in.js',typedreq);


// var typed=require('./typed1.js');
// app.use('/typed1.js',typed1);

// var frontend =require('/frontend');
// app.use('/frontendscripts',frontend);

// app.use('/typed.min.js',Typed);

app.use(express.static("pictures"));
app.use(express.static("public"));


app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'Keegan',
      lastName: 'Justis',
    }
  }


  res.render('index', data);
});


app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body })
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'Keeganjustis@gmail.com',
    from: req.body.email,
    subject: req.body.firstName + " " + req.body.lastName ,
    text: req.body.message
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
});



// const msg = {
//   to: 'keeganjustis@gmail.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);


app.listen(8000, () => {
  console.log(' listening on port 8000');
}); 
