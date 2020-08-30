const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const {userRouter} = require("./routes/userRouter");
const ifEquality = require("./views/helpers/ifEquality");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const hbs = expressHbs.create({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: path.join(__dirname, "./views/partials"),
    helpers: {
      ifEquality
    }
  });
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");
  app.set("views", path.join(__dirname, "./views"));



app.get("/",(req,res)=>{
    try {
        res.status(200).render("loginForm", {
          layout: "login",
          title: "LoginPage",
          submitTarget:"/user/verifyLogin",
          method:"POST"

        });
      } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server error");
      }
})


app.get("/signUp",(req,res)=>{
    try {
        res.status(200).render("signUpForm", {
          layout: "login",
          title: "signUpPage",
          submitTarget:"/user",
          method:"POST"
        });
      } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server error");
      }
})


app.get("/forgotPassword",(req,res)=>{
    try {
        res.status(200).render("forgotPage", {
          layout: "login",
          title: "forgotPasswordPage",
        });
      } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server error");
      }
})


app.use("/user",userRouter)

const PORT = process.env.PORT||8080
app.listen(PORT, () => {
    console.log("server running");
})