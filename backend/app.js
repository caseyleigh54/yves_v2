const express = require('express')
const bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

const app = express()
const port = 3001

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser());

app.get('/', (req, res) => res.send('WindyCode'))

app.post('/api/sendEmail', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'zoho',
        auth: {
          user: 'user@service.com',
          pass: 'password'
        }
    });
    var mailOptions = {
        from: 'admin@websiteurl.com',
        to: 'admin@websiteurl.com',
        subject: 'Inquiry from web site',
        text: req.body.text + ' user email: ' + req.body.email
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(500,'problem in sending email')
        } else {
          console.log('Email sent: ' + info.response);
          res.send(200,'ok')
        }
    });
})


app.listen(port, () => console.log(`Server app listening on port ${port}!`))
