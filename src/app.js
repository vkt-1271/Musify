const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
require("./db/conn");
const Register = require("./models/register");
const authenticate = require("./middleware/authenticate");
const Songs = require("./models/songs");
const Artists = require("./models/artist");
const Playlist = require("./models/playlist");

const app = express();
app.use(cookieParser());

// create localhost
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/", (req,res) => {
    res.send("index");
})
const userkeep= "new";

app.get("/contact", (req,res) => {
    res.send("contact");
})

app.post("/register", async(req,res) =>{
    try{
        console.log("hi");
        const pass = req.body.password;
        const cpass = req.body.confpassword;
        const mail = req.body.email;

        const fmail = await Register.findOne({email:mail});

        if( pass === cpass && !fmail && pass!=''){
            const reguser = new Register({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: pass,
                confpassword: cpass
            })
            console.log(reguser);
            const regsuser = await reguser.save();
            return res.status(201).json("Register Successfuly");

        }else{
            return res.json("Not");
        }
    }catch(e){
        return res.status(422).json("Not");
    }
})

app.post("/login", async(req, res) =>{
    try{
        let token;
        const email = req.body.email;
        const password = req.body.password;

        const udata = await Register.findOne({email});
        const isMatch = await bcrypt.compare(password,udata.password);
        if(isMatch){
            token = await udata.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            return res.json("yes");
        }
        else{
            return res.json("Not");
        }
        
    }catch(e){
        return res.json("Not");
    }
    
})

app.post("/artist", async(req, res) =>{
    try{
        const newartist = new Artists(req.body);
        const createartist = await newartist.save();
        console.log(createartist);
        res.status(201).send(createartist);
    }catch(e){
        res.status(400).send(e);
    }
})

app.post("/songs", async(req,res) =>{
    try{
            const newsong = new Songs(req.body);
            const addsong = await newsong.save();
            console.log(addsong);
            res.status(201).send(addsong);
    }catch(e){
        res.status(400).send(e);
    }
})

// app.get("/songs", authenticate ,(req,res) =>{
//     try{
        
//         // const song = await Songs.find().populate({path:'artistId', select: ['aname']});
//         // const song1 = await Songs.find();
//         // console.log(req.params.id);
//         res.send(req.rootUser);
//     }catch(e){
//         res.status(400).send("Not");
//     }
// })

app.get("/songs", async(req,res) =>{
    try{
        const songsu = await Songs.find().select({_id:0,sname:1,stype:1});
        console.log(songsu);
        res.send(songsu);
    }
    catch(e)
    {
        res.send(e);
    }
})
app.get("/songs/:Aname", async(req,res) =>{
    try{
        const aname = req.params.Aname;
        console.log(aname);
        const songsu = await Songs.find({Aname:aname}).select({_id:0,cnt:0,__v:0});
        if(!songsu){
            const songsud = await Songs.find({stype:aname}).select({_id:0,cnt:0,__v:0});
            res.send(songsud);
        }
        console.log(songsu);
        res.send(songsu);
    }
    catch(e)
    {
        res.send(e);
    }
})


app.post("/playlist", async(req,res) =>{
    try{
        const addsong = new Playlist(req.body);
        console.log(addsong);
        const added=await addsong.save();
        res.send(added);
    }catch(e){
        res.send(e);
    }
})

app.delete("/songde/:id", async(req,res) =>{
    try{
        const _id = req.params.id;
        const deletesong = await Songs.findByIdAndDelete(_id);
        if(!req.params.id){
            return res.send("No data");
        }
        else{ res.send(deletesong)};
    }catch(e){
        res.status(500).send(e);
    }
})

app.patch("/uppass/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const updatedata = await Register.findByIdAndUpdate(_id,req.body, {
            new:true
        });

        if(!req.params.id){
            return res.status(400).send();
        }
        else{
            res.send(updatedata);
        }

    }catch(e){
        res.send(e);
    }
})



app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})

