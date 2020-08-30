const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const  bcrypt = require("bcrypt");
const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "non-active"]
  }
 
});

UserSchema.pre("save",async function (next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,10);    
    }
    next();
})
  
const User= model("User", UserSchema);

module.exports = User;




