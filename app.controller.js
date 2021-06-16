const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://dbUser:dbUser@cluster0.sedso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

exports.contactUs = (req, res) => {
    const { name, email, phone, message } = req.body;
    const oauth2Client = new OAuth2(
        "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
        "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );
    
    oauth2Client.setCredentials({
        refresh_token: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w"
    });
    const accessToken = oauth2Client.getAccessToken()
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId: "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken
        },
    });
    
    const mailOptions = {
        from: req.body.name+'" " <nodejsa@gmail.com>', // sender address
        to: 'info@redpositive.in,kranthisai85@gmail.com', // list of receivers
        subject: "Message from "+req.body.name+" via Contact Us", // Subject line
        text: "Email : "+req.body.email+"\nPhone : "+req.body.phone+" \nMessage : "+req.body.message, // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
        return res.json({error: "Failure"});
        else 
        console.log('Email sent: ' + info.response);
        return res.sendFile(__dirname + "/thankYou.html");
        // return res.json({result: "Success. Mail sent!"});
    });
    
    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "message": message
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    })
}