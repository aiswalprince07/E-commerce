// Login and signup related chije hongi 

const { User } = require("../model/User");
const crypto = require('crypto');
const {sanitizeUser} = require('../services/common')

exports.createUser = async (req,res) =>{
    try{
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            'sha256',
            async function (err,hashedPassword){
                const user = new User({...req.body, password: hashedPassword, salt});
                const doc = await user.save();

                req.login(sanitizeUser(doc),(err)=>{  //this also calls serializer and adds to session
                    if(err) {res.status(400).json(err);}
                    else{ 
                        res.status(201).json(sanitizeUser(doc));
                    }
                })
            }
        );
    }catch(err){
        res.status(400).json(err);
    }
}

exports.loginUser = async (req,res)=>{
    // res.json(req.user);  // req.user --> passport banata h..jab apka user authenticate ho jta h!!
    res.json(req.user);
}

exports.checkUser = async (req,res)=>{
    // res.json(req.user);  // req.user --> passport banata h..jab apka user authenticate ho jta h!!
    res.json({status:'success',user: req.user});
}