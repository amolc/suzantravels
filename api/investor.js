var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
  database: '80consult',
  user: 'cio_choice',
  password: '10gXWOqeaf',
  host: 'cxohonour.com',
});

var CRUD = require('mysql-crud');
var investorCRUD = CRUD(db, 'investor');

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: '587',
  auth: {
    user: '66ca4479851e0bd9cedc629bdff36ee6',
    pass: 'a3ec60f55a89f7fab98891e86818c8db'
  }
});

////-----------------APPLY-----------------

exports.invest = function (req, res) {

  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var email = req.body.email;
  var phone_number = req.body.phone_number;
  var company = req.body.company;
  var industry = req.body.industry;
  var website = req.body.website;
  var description = req.body.description;


  investorCRUD.create({
    'first_name': first_name,
    'last_name': last_name,
    'email': email,
    'phone_number': phone_number,
    'company': company,
    'industry': industry,
    'website': website,
    'description': description,
  }, function (err, vals) {

  })

  var recipientEmail = 'ceo@80startups.com';
  var subject = "[80STARTUPS.COM] Investor Appointment";
  var mailbody = '<table>\
                        <tr>\
                        <td><img src="http://80startups.com/img/80startups_logo.png" style="width:500px;"></td><br>\
                      </tr>\
                      <tr>\
                        <td><h1>Dear Amol Chawathe,</td>\
                      </tr>\
                      <tr>\
                      </tr>\
                      <tr>\
                        <td>You have one investor appointment with the following client:</td>\
                      </tr>\
                      <tr>\
                        <td>The details are as follow : <br><br><strong> Name:   ' + first_name + ' ' + last_name + '</strong><br><br><strong> Email:   ' + email + '</strong><br><br><strong> Contact Number:   ' + phone_number + '</strong><br><br><strong>Company:   ' + company + '</strong><br><br><strong>Industry:   ' + industry + '</strong><br><br><strong>Website   ' + website + '</strong><br><br><strong>Description:   ' + description + '</strong><br><br></td>\
                      </tr>\
                      <tr>\
                        <td>Best wishes,</td>\
                      </tr>\
                      <tr>\
                        <td><h2>80startups.com</h2></td>\
                      </tr>\
                      <tr>\
                        <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                      </tr>\
                    </table>';

  send_mail(recipientEmail, subject, mailbody);
}

///____________________END______________________

function send_mail(usermail, subject, mailbody) {

  var auth = {
    auth: {
      api_key: 'key-b4687b67307cb2598abad76006bd7a4a',
      domain: '80startups.com'
    }
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail({
    from: 'operations@80startups.com',
    to: usermail, // An array if you have multiple recipients.
    subject: subject,
    'h:Reply-To': 'operations@80startups.com',
    //You can use "html:" to send HTML email content. It's magic!
    html: mailbody,
    //You can use "text:" to send plain-text content. It's oldschool!
    text: mailbody
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      console.log('Response: ' + info);
      //res.sendStatus(200);

    }
  });
};