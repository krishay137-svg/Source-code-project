const express=require("express");
const bcrypt=require("bcrypt");

const router=express.Router();

const db=require("../config/db");

router.post("/register",async function(req,res){

    let fullname=req.body.fullname;
    let email=req.body.email;
    let password=req.body.password;

    if(fullname=="" || email=="" || password==""){

        return res.send("Fill all fields");

    }

    db.query(

        "SELECT * FROM users WHERE email=?",

        [email],

        async function(error,result){

            if(result.length>0){

                return res.send("Email already exists");

            }

            let hash=await bcrypt.hash(password,10);

            db.query(

                "INSERT INTO users(fullname,email,password) VALUES(?,?,?)",

                [

                    fullname,

                    email,

                    hash

                ],

                function(error){

                    if(error){

                        console.log(error);

                        return res.send("Registration Failed");

                    }

                    res.redirect("/login");

                }

            );

        }

    );

});

router.post("/login",function(req,res){

    let email=req.body.email;

    let password=req.body.password;

    db.query(

        "SELECT * FROM users WHERE email=?",

        [email],

        async function(error,result){

            if(result.length==0){

                return res.send("User not found");

            }

            let user=result[0];

            let match=await bcrypt.compare(

                password,

                user.password

            );

            if(!match){

                return res.send("Wrong Password");

            }

            req.session.user={

                id:user.id,

                fullname:user.fullname,

                email:user.email

            };

            res.redirect("/dashboard");

        }

    );

});

router.get("/logout",function(req,res){

    req.session.destroy();

    res.redirect("/");

});

module.exports=router;