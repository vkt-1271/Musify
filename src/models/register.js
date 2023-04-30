const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true,
        trim: true
    },
    lname: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is inValid");
            }
        }
    },
    password: {
        type: String,
        require: true
    },
    confpassword:{
        type: String,
        require: true
    },
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})

// hashing password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        const passwordHash= await bcrypt.hash(this.password,10);
        this.password = passwordHash;
        this.confpassword = undefined;
    }
    next();
});

// generate token
userSchema.methods.generateAuthToken = async function(){
    try{
        let tokenU = jwt.sign({_id:this._id}, "MYNAMEISDARPANKUMARKHATRIKHIPROGROUP");
        this.tokens = this.tokens.concat({token:tokenU});
        await this.save();
        return tokenU;
    }catch(e){
        console.log(e);
    }
}


// create collection
const Register = new mongoose.model("Register",userSchema);
module.exports = Register;