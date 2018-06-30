var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
  database: 'fountaintours',
  user: 'root',
  password: '10gXWOqeaf',
  host: 'db.80startups.com',
});

var moment = require("moment");
var now = moment();

var CRUD = require('mysql-crud');
var consultCRUD = CRUD(db, 'contact');
var ctourCRUD = CRUD(db, 'tbl_CustomTours');
var ticketCRUD = CRUD(db,'tbl_AirTickets');
var venquiryCRUD = CRUD(db,'tbl_VisaEnquiries');
var bookCRUD = CRUD(db,'tbl_Bookings');
var vbookCRUD = CRUD(db,'tbl_VoucherBooking');

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var mandrillTransport = require('nodemailer-mandrill-transport');

//var nodemailer = require('nodemailer');
//var mg = require('nodemailer-mailgun-transport');
//var transporter = nodemailer.createTransport({
//  host: 'in-v3.mailjet.com',
//  port: '587',
//  auth: {
//    user: '66ca4479851e0bd9cedc629bdff36ee6',
//    pass: 'a3ec60f55a89f7fab98891e86818c8db'
//  }
//});

////-----------------CONTACT-----------------

exports.consult = function (req, res) {
console.log(req.body);
  var fullName = req.body.fullname;
  var email = req.body.email;
  var phoneNumber = req.body.phonenumber;
  var travelDate = req.body.travelDate;

   // var travleDate = $scope.travelDate;
    var tdate = travelDate.split("T");
    console.log(tdate);
    var travelDate = tdate[0];
  var message = req.body.message;
  var packageName = req.body.packageName;
  var packagePrice = req.body.packagePrice;
  var adults = req.body.adults;
  var Child = req.body.Child;
  var promoCode = req.body.promoCode;


  consultCRUD.create({
			'fullName': fullName,
      'email': email,
      'phonenumber': phoneNumber,
      'travelDate': travelDate,
      'packageName': packageName,
      'adults': adults,
      'Child': Child,
      'promoCode': promoCode,
      'message': message,
		},function (err,vals){

    })

    var recipientEmail = 'shital.talole@fountaintechies.com,priyarokade24@gmail.com';
    //var recipientEmail = 'pravinshelar999@gmail.com'; //,ceo@80startups.com,shital.talole@fountaintechies.com'; //,ceo@80startups.com,shital.talole@80startups.com
    var subject = "Fountain Tours Booking";
    var mailbody = '<table>\
                        <tr>\
                        <td><img src="https://ambitiontours.80startups.com/assets/img/logo1.jpg"></td><br>\
                      </tr>\
                      <tr>\
                        <td><h1>Dear Fountain Tours,</td>\
                      </tr>\
                      <tr>\
                      </tr>\
                      <tr>\
                        <td>You have one enquiry from the following client:</td>\
                      </tr>\
                      <tr>\
                        <td>The details are as follow :<br><br><strong> Package Name:   ' + packageName + '</strong><br><br><strong> Package Price: SGD  ' + packagePrice + '</strong>  <br><br><strong> Name:   ' + fullName + '</strong><br><br><strong> Email:   ' + email + '</strong><br><br><strong> Contact Number:   ' + phoneNumber + '</strong><br><br><strong> No of Adults:   ' + adults + '</strong><br><br><strong> No of Child:   ' + Child + '</strong><br><br><strong> Travel Date:   ' + travelDate + '</strong><br><br><strong>Message:   ' + message + '</strong><br><br><strong> Promo Code:   ' + promoCode + '</strong><br><br></td>\
                      </tr>\
                      <tr>\
                        <td>Best wishes,</td>\
                      </tr>\
                      <tr>\
                        <td><h2>ambitiontours.com</h2></td>\
                      </tr>\
                      <tr>\
                        <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                      </tr>\
                    </table>';

      send_mail(recipientEmail, subject, mailbody);
}

exports.booktour = function (req, res) {

  dateToday = now.format("DD/MM/YYYY hh:mm a");
  var code = req.body.promoCode || '';
  bookCRUD.create({
      'fullName': req.body.fullname,
      'email': req.body.email,
      'phonenumber': req.body.phonenumber,
      'travelDate': req.body.travelDate,
      'adults': req.body.adults,
      'Child': req.body.Child,
      'promoCode': req.body.promoCode,
      'message': req.body.message,
      'TourId' : req.body.TourId,
      'TourCost' : req.body.TourCost,
      'ChildCost' : req.body.ChildCost,
      'TotalAmount' : req.body.TotalAmount,
      'createDate' : dateToday,
      'TourTitle' :  req.body.TourTitle,
      'PaymentOption' :  req.body.paymenttype || '',
    },function (err,val){

      if (!err){

              if (req.body.TourType == 'Tour'){

              var customerEmail = req.body.email+',shital.talole@fountaintechies.com,priyarokade24@gmail.com';
              var recipientEmail = 'sales@suzantravels.com';
           //   var customerEmail = req.body.email; //,ceo@80startups.com,shital.talole@fountaintechies.com'; //,ceo@80startups.com,shital.talole@80startups.com
           //   var recipientEmail = 'komal.gaikwad@fountaintechies.com';
              var subject = "New Package Tour Enquiry.";
              var customersubject  = "Thank You for your enquiry!";

              var mailbody = '<table>\
                            <tr>\
                            <td><img src="assets/img/logo1.jpg" alt="" title=""></td><br>\
                          </tr>\
                          <tr>\
                            <td><h1>Dear Fountain Tours,</td>\
                          </tr>\
                          <tr>\
                          </tr>\
                          <tr>\
                            <td>Package Tour Enquiry Details:</td>\
                          </tr>\
                          <tr>\
                            <td><br><br><strong> Name:  ' + req.body.fullname + '</strong><br><br><strong> Email:   ' + req.body.email + '</strong><br><br><strong> Contact Number:   ' + req.body.phonenumber + '</strong><br><br><strong> Package Name:   ' + req.body.TourTitle + '</strong><br><br><strong> Price For Adult : SGD  ' + req.body.TourCost + '</strong><br><br><strong> Price For Child : SGD  ' + req.body.ChildCost + '</strong><br><br><strong> No of Adults:   ' + req.body.adults + '</strong><br><br><strong> No of Child:   ' + req.body.Child + '</strong><br><br><strong> Total Amount:   SGD ' + req.body.TotalAmount + '</strong><br><br><strong> Travel Date:   ' +  req.body.travelDate.substring(0,10) + '</strong><br><br><strong>Message:   ' + req.body.message + '</strong><br><br><strong></td>\                          </tr>\
                          <tr>\
                            <td>Best wishes,</td>\
                          </tr>\
                          <tr>\
                            <td><h2>suzantravels.com</h2></td>\
                          </tr>\
                          <tr>\
                            <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                          </tr>\
                        </table>';


                var customermailbody = '<table>\
                            <tr>\
                            <td><img src="assets/img/logo1.jpg" alt="" title=""></td><br>\
                          </tr>\
                          <tr>\
                            <td><h1>Dear ' + req.body.fullname + ',</td>\
                          </tr>\
                          <tr>\
                          </tr>\
                          <tr>\
                            <td>Package Tour Enquiry Details:</td>\
                          </tr>\
                          <tr>\
                            <td><br><br><strong> Name:  ' + req.body.fullname + '</strong><br><br><strong> Email:   ' + req.body.email + '</strong><br><br><strong> Contact Number:   ' + req.body.phonenumber + '</strong><br><br><strong> Package Name:   ' + req.body.TourTitle + '</strong><br><br><strong> Price For Adult : SGD  ' + req.body.TourCost + '</strong><br><br><strong> Price For Child : SGD  ' + req.body.ChildCost + '</strong><br><br><strong> No of Adults:   ' + req.body.adults + '</strong><br><br><strong> No of Child:   ' + req.body.Child + '</strong><br><br><strong> Total Amount:   SGD ' + req.body.TotalAmount + '</strong><br><br><strong> Travel Date:   ' +  req.body.travelDate.substring(0,10) + '</strong><br><br><strong>Message:   ' + req.body.message + '</strong><br><br><strong></td>\
                          </tr>\
                          <tr>\
                            <td>Best wishes,</td>\
                          </tr>\
                          <tr>\
                            <td><h2>suzantravels.com</h2></td>\
                          </tr>\
                          <tr>\
                            <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                          </tr>\
                        </table>';

                        send_mail(recipientEmail, subject, mailbody);
                        send_mail(customerEmail, customersubject, customermailbody);

              }

              var resdata = {
                status: true,
                value:val.insertId,
                message: 'Details successfully updated'
              };

              res.jsonp(resdata);

        }
        else
        {
            var resdata = {
                status: false,
                error: err,
                message: 'Error: Details not successfully updated. '
            };

            res.jsonp(resdata);

      }

    })

}

exports.customTour = function (req, res) {
//console.log(req.body);
  var fullName = req.body.fullname;
  var email = req.body.email;
  var phoneNumber = req.body.phonenumber;
  var travelDate = req.body.travelDate;
   dateToday = now.format("DD/MM/YYYY hh:mm a");

   // var travleDate = $scope.travelDate;
    var tdate = travelDate.split("T");
    //console.log(tdate);
    var travelDate = tdate[0];
  var message = req.body.message;
  /* var packageName = req.body.packageName;
  var packagePrice = req.body.packagePrice;
  var adults = req.body.adults;
  var Child = req.body.Child;
  var promoCode = req.body.promoCode;*/


  ctourCRUD.create({
      'FullName': fullName,
      'EmailId': email,
      'PhoneNumber': phoneNumber,
      'TravelDate': travelDate,
      'Message': message,
      'CreateDate':dateToday,
    },function (err,val){

      if (!err)
        {
              var customerEmail = req.body.email+',shital.talole@fountaintechies.com';
              var recipientEmail = 'sales@suzantravels.com';
           //   var customerEmail = req.body.email; //,ceo@80startups.com,shital.talole@fountaintechies.com'; //,ceo@80startups.com,shital.talole@80startups.com
           //   var recipientEmail = 'komal.gaikwad@fountaintechies.com';
              var subject = "New Custom Tour Enquiry.";
              var customersubject  = "Thank You For Your Enquiry!";
          var mailbody = '<table>\
                              <tr>\
                              <td><img src="https://ambitiontours.80startups.com/assets/img/logo1.jpg"></td><br>\
                            </tr>\
                            <tr>\
                              <td><h1>Dear Ambition Tours,</td>\
                            </tr>\
                            <tr>\
                            </tr>\
                            <tr>\
                              <td>Custom Tour Enquiry Details:</td>\
                            </tr>\
                            <tr>\
                              <td><br><br><strong> Name:   ' + fullName + '</strong><br><br><strong> Email:   ' + email + '</strong><br><br><strong> Contact Number:   ' + phoneNumber + '</strong><br><br><strong> Travel Date:   ' + travelDate + '</strong><br><br><strong>Message:   ' + message + '</strong><br><br></td>\
                            </tr>\
                            <tr>\
                              <td>Best wishes,</td>\
                            </tr>\
                            <tr>\
                              <td><h2>ambitiontours.com</h2></td>\
                            </tr>\
                            <tr>\
                              <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                            </tr>\
                          </table>';


            var customermailbody = '<table>\
                              <tr>\
                              <td><img src="https://ambitiontours.80startups.com/assets/img/logo1.jpg"></td><br>\
                            </tr>\
                            <tr>\
                              <td><h1>Dear '+fullName+',</td>\
                            </tr>\
                            <tr>\
                            </tr>\
                            <tr>\
                              <td>Custom Tour Enquiry Details:</td>\
                            </tr>\
                            <tr>\
                              <td><br><br><strong> Name:   ' + fullName + '</strong><br><br><strong> Email:   ' + email + '</strong><br><br><strong> Contact Number:   ' + phoneNumber + '</strong><br><br><strong> Travel Date:   ' + travelDate + '</strong><br><br><strong>Message:   ' + message + '</strong><br><br></td>\
                            </tr>\
                            <tr>\
                              <td>Best wishes,</td>\
                            </tr>\
                            <tr>\
                              <td><h2>ambitiontours.com</h2></td>\
                            </tr>\
                            <tr>\
                              <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                            </tr>\
                          </table>';



            send_mail(recipientEmail, subject, mailbody);
            send_mail(customerEmail, customersubject, customermailbody);


            var resdata = {
                status: true,
                value:val,
                message: 'Details successfully updated'
            };

            res.jsonp(resdata);
        }
        else
        {
            var resdata = {
                status: false,
                error: err,
                message: 'Error: Details not successfully updated. '
            };

            res.jsonp(resdata);
        }

    })

}


exports.airTicket = function (req, res) {

   dateToday = now.format("DD/MM/YYYY hh:mm a");
  ticketCRUD.create({
      'Name': req.body.fullname,
      'Contact': req.body.phonenumber,
      'Email': req.body.email,
      'ticketFrom' : req.body.from,
      'Destination': req.body.destination,
      'Airline': req.body.airline,
      'Type': req.body.type,
      'CreatedOn' : dateToday,
    },function (err,val){

      if (!err)
        {

            var customerEmail = req.body.email+',shital.talole@fountaintechies.com';
              var recipientEmail = 'sales@suzantravels.com';
           //   var customerEmail = req.body.email; //,ceo@80startups.com,shital.talole@fountaintechies.com'; //,ceo@80startups.com,shital.talole@80startups.com
           //   var recipientEmail = 'komal.gaikwad@fountaintechies.com';
              var subject = "New Air Ticket Enquiry";
              var customersubject  = "Thank You for your enquiry!";
              var mailbody = '<table>\
                                  <tr>\
                                  <td><img src="https://ambitiontours.80startups.com/assets/img/logo1.jpg"></td><br>\
                                </tr>\
                                <tr>\
                                  <td><h1>Dear Ambition Tours,</td>\
                                </tr>\
                                <tr>\
                                </tr>\
                                <tr>\
                                  <td>Air Ticket Enquiry Details:</td>\
                                </tr>\
                                <tr>\
                                  <td><br><br><strong> Name:   ' + req.body.fullname + '</strong><br><br><strong> Email:   ' + req.body.email + '</strong><br><br><strong> Contact Number:   ' + req.body.phonenumber + '</strong><br><br><strong> From:   ' + req.body.from + '</strong><br><br><strong> To:   ' + req.body.destination + '</strong><br><br><strong>Choice Of Airline:   ' + req.body.airline + '</strong><br><br><strong>Trip Type :   ' + req.body.type + '</strong><br><br></td>\
                                </tr>\
                                <tr>\
                                  <td>Best wishes,</td>\
                                </tr>\
                                <tr>\
                                  <td><h2>ambitiontours.com</h2></td>\
                                </tr>\
                                <tr>\
                                  <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                                </tr>\
                              </table>';

             var customermailbody = '<table>\
                                  <tr>\
                                  <td><img src="https://ambitiontours.80startups.com/assets/img/logo1.jpg"></td><br>\
                                </tr>\
                                <tr>\
                                  <td><h1>Dear '+req.body.fullname+',</td>\
                                </tr>\
                                <tr>\
                                </tr>\
                                <tr>\
                                  <td>Air Ticket Enquiry Details::</td>\
                                </tr>\
                                <tr>\
                                  <td><br><br><strong> Name:   ' + req.body.fullname + '</strong><br><br><strong> Email:   ' + req.body.email + '</strong><br><br><strong> Contact Number:   ' + req.body.phonenumber + '</strong><br><br><strong> From:   ' + req.body.from + '</strong><br><br><strong> To:   ' + req.body.destination + '</strong><br><br><strong>Choice Of Airline:   ' + req.body.airline + '</strong><br><br><strong>Trip Type :   ' + req.body.type + '</strong><br><br></td>\
                                </tr>\
                                <tr>\
                                  <td>Best wishes,</td>\
                                </tr>\
                                <tr>\
                                  <td><h2>ambitiontours.com</h2></td>\
                                </tr>\
                                <tr>\
                                  <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                                </tr>\
                              </table>';

            send_mail(recipientEmail, subject, mailbody);
            send_mail(customerEmail, customersubject, customermailbody);
            var resdata = {
                status: true,
                value:val,
                message: 'Details successfully updated'
            };

            res.jsonp(resdata);
        }
        else
        {
            var resdata = {
                status: false,
                error: err,
                message: 'Error: Details not successfully updated. '
            };

            res.jsonp(resdata);
        }

    })

}

exports.visaEnquiry = function (req, res) {

   dateToday = now.format("DD/MM/YYYY hh:mm a");
  venquiryCRUD.create({
      'Name': req.body.name,
      'Contact': req.body.phone,
      'Email': req.body.email,
      'Message': req.body.message,
      'VisaDetailId': req.body.Id,
      'CreatedOn' : dateToday,
    },function (err,val){

      if (!err)
        {

              var customerEmail = req.body.email+',shital.talole@fountaintechies.com';
              var recipientEmail = 'sales@suzantravels.com';
           //   var customerEmail = req.body.email; //,ceo@80startups.com,shital.talole@fountaintechies.com'; //,ceo@80startups.com,shital.talole@80startups.com
           //   var recipientEmail = 'komal.gaikwad@fountaintechies.com';
              var subject = "New Visa Service Enquiry";
              var customersubject  = "Thank You for your enquiry!";
              var mailbody = '<table>\
                                  <tr>\
                                  <td><img src="https://ambitiontours.80startups.com/assets/img/logo1.jpg"></td><br>\
                                </tr>\
                                <tr>\
                                  <td><h1>Dear Ambition Tours,</td>\
                                </tr>\
                                <tr>\
                                </tr>\
                                <tr>\
                                  <td>Visa Service Enquiry Details:</td>\
                                </tr>\
                                <tr>\
                                  <td><br><br><strong> Name:   ' + req.body.name + '</strong><br><br><strong> Email:   ' + req.body.email + '</strong><br><br><strong> Contact Number:   ' + req.body.phone + '</strong><br><br><strong> Country:   ' + req.body.Country + '</strong><br><br><strong>Visa Charge:   SGD ' + req.body.VisaCharge + '</strong><br><br><strong>Working Days :   ' + req.body.WorkingDays + '</strong><br><br><strong>Message :   ' + req.body.message + '</strong><br><br></td>\
                                </tr>\
                                <tr>\
                                  <td>Best wishes,</td>\
                                </tr>\
                                <tr>\
                                  <td><h2>ambitiontours.com</h2></td>\
                                </tr>\
                                <tr>\
                                  <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                                </tr>\
                              </table>';


                      var customermailbody = '<table>\
                                  <tr>\
                                  <td><img src="https://ambitiontours.80startups.com/assets/img/logo1.jpg"></td><br>\
                                </tr>\
                                <tr>\
                                  <td><h1>Dear '+req.body.name+',</td>\
                                </tr>\
                                <tr>\
                                </tr>\
                                <tr>\
                                  <td>Visa Service Enquiry Details:</td>\
                                </tr>\
                                <tr>\
                                  <td><br><br><strong> Name:   ' + req.body.name + '</strong><br><br><strong> Email:   ' + req.body.email + '</strong><br><br><strong> Contact Number:   ' + req.body.phone + '</strong><br><br><strong> Country:   ' + req.body.Country + '</strong><br><br><strong>Visa Charge:   SGD ' + req.body.VisaCharge + '</strong><br><br><strong>Working Days :   ' + req.body.WorkingDays + '</strong><br><br><strong>Message :   ' + req.body.message + '</strong><br><br></td>\
                                </tr>\
                                <tr>\
                                  <td>Best wishes,</td>\
                                </tr>\
                                <tr>\
                                  <td><h2>ambitiontours.com</h2></td>\
                                </tr>\
                                <tr>\
                                  <td bgcolor="#000000"><font color ="white">This is a one-time email. Please do not reply to this email.</font></td>\
                                </tr>\
                              </table>';

                    send_mail(recipientEmail, subject, mailbody);
                    send_mail(customerEmail, customersubject, customermailbody);
            var resdata = {
                status: true,
                value:val,
                message: 'Details successfully updated'
            };

            res.jsonp(resdata);
        }
        else
        {
            var resdata = {
                status: false,
                error: err,
                message: 'Error: Details not successfully updated. '
            };

            res.jsonp(resdata);
        }

    })

}


exports.purchasevoucher = function (req, res) {

   dateToday = now.format("DD/MM/YYYY hh:mm a");
   vbookCRUD.create({
      'VoucherId': req.body.Id,
      'Code': req.body.Code,
      'Price': req.body.Price ,
      'Quantity': req.body.Quantity,
      'TotalAmount':req.body.Price * req.body.Quantity,
      'Name': req.body.Name,
      'Contact': req.body.Contact,
      'Email': req.body.Email,
      'Request': req.body.Request,
      'Address': req.body.Address,
      'CreatedOn' : dateToday,
    },function (err,val){

      if (!err)
        {

            var resdata = {
                status: true,
                value:val.insertId,
                message: 'Details successfully added'
            };

            res.jsonp(resdata);
        }
        else
        {
            var resdata = {
                status: false,
                error: err,
                message: 'Error: Details not successfully added. '
            };

            res.jsonp(resdata);
        }

    })

}

///____________________END______________________

var transporter = nodemailer.createTransport(mandrillTransport({
    auth: {
      apiKey : 'F9E0Hvx-FBXauFHYHeulyg'
    }
}));

function send_mail(usermail, subject, mailbody) {

	  // var auth = {
	  //   auth: {
	  //     api_key: 'key-b4687b67307cb2598abad76006bd7a4a',
	  //     domain: '80startups.com'
	  //   }
	  // }

	  // var nodemailerMailgun = nodemailer.createTransport(mg(auth));

	  transporter.sendMail({
	    from: 'info@kryptobot.co',
	    to: usermail, // An array if you have multiple recipients.
	    subject: subject,
	    'h:Reply-To': 'info@kryptobot.co',
	    //You can use "html:" to send HTML email content. It's magic!
	    html: mailbody,
	    //You can use "text:" to send plain-text content. It's oldschool!
	    text: mailbody
	  }, function(err, info) {
	    if (err) {
	    	console.log(err);
	    } else {
	    	console.log(info);
	      //console.log('Response: ' + info);
	      //res.sendStatus(200);
	    }
	  });
	};
	
	
//function send_mail(usermail, subject, mailbody) {
//
//  /*var auth = {
//    auth: {
//      api_key: 'key-b4687b67307cb2598abad76006bd7a4a',
//      domain: '80startups.com'
//    }
//  }*/
//
//  var auth = {
//      auth: {
//        api_key: 'F9E0Hvx-FBXauFHYHeulyg',
//        domain: '80startups.com'
//      }
//    }
//
//  //var nodemailerMailgun = nodemailer.createTransport(mg(auth));
//  var nodemailerMailgun = nodemailer.createTransport(mg(auth));
//
//  nodemailerMailgun.sendMail({
//    from: 'info@kryptobot.co',
//    //from: 'sales@suzantravels.com',
//    to: usermail, // An array if you have multiple recipients.
//    subject: subject,
//    //'h:Reply-To': 'operations@80startups.com',
//    'h:Reply-To': 'info@kryptobot.co',
//    //You can use "html:" to send HTML email content. It's magic!
//    html: mailbody,
//    //You can use "text:" to send plain-text content. It's oldschool!
//    text: mailbody
//  }, function(err, info) {
//	  console.log(info);
//	  console.log(err);
//    if (err) {
//      console.log('Error: ' + err);
//    } else {
////      console.log(info);
//      //res.sendStatus(200);
//
//    }
//  });
//};
