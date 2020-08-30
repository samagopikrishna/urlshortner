const express = require("express");
require("../dbConfig/config");
const {email_pass} = require("../configuration.js");
const uuid = require("uuid");
const buildUrl = require("build-url");

var nodemailer = require('nodemailer');
var User = require("../models/user.js");
const userRouter = express.Router();

userRouter.post("/",(req,res)=>{
    const {email,firstname} = req.body;
    console.log(firstname);
    req.body.status = "non-active";
var url = buildUrl('http://localhost:8080/user', {
  path: "verify",
//   lowerCase: true,
  queryParams: {
      name:firstname,
    id: uuid.v4()
  }
});

    console.log(req.body);
    
    const saveUser = async () => {
        const newUser = new User({
            email: req.body.email,
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            password: req.body.password,
            status:req.body.status
        });
      
        try {
          const result = await newUser.save()
          console.log(result);

          var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "shravankumar121999@gmail.com",
          pass: email_pass
        }
      });
      
      var mailOptions = {
        from: 'shravankumar121999@gmail.com',
        to: email,
        subject: 'please click the below link to verify your mail',
       html: `
       <html>
       <body>
       <p id = "url">${url}</p>
       </body>
       </html>
       `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

            res.status(200).json({message:"please check your mail and verify the link!!!"});
        } catch (e) {
          console.error(e);
          res.status(500).send("inrernal server error");
        }
      };
      
      saveUser();




    


})


userRouter.get("/verify",async (req,res)=>{
    console.log(req.query.name);
    console.log("firstname"+req.query.name);
    console.log(req.query.id)
    const result = await User.findOneAndUpdate(
        {
          first_name: req.query.name
        },
        {
          status: "active"
        }
      );

      console.log(result);
      
    res.status(200).send("you are successfully verified please login !!!");
})


userRouter.get("/verifyLogin", (req,res)=>{
    const{email,password} =req.body;
    console.log(email,password);
    const findByProp = async () => {
        const result = await User.findOne({
          email: email 
        });
        console.log(result);
      };

      

})
module.exports = {
    userRouter
}
