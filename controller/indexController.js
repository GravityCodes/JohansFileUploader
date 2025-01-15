const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

const validateUser = [
    body("firstname")
    .isAlpha()
    .withMessage("First name must only contain letters."),
    body("lastname")
    .isAlpha()
    .withMessage("Last name must only contain letters."),
    body("username")
    .matches(/^\S*$/)
    .withMessage("Username must not have spaces."),
    body("username")
    .custom(async (value) => {
  
      const user = await prisma.user.findUnique({
        where : {
            username: value,
        }
      });
      
      if(user){
        throw new Error("Username already taken");
      }
      return true;
    }),
    body("confirm-password")
    .custom((value, {req}) => {
      return value === req.body.password;
    })
    .withMessage("Password do not match.")
  ];

const welcomeGet = (req, res) => {
    res.render("index");
}

const signUpGet = (req, res) => {
    res.render("sign-up");
}

const signUpPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).render("sign-up", {errors: errors.array()});
        }
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if(err){
                throw err;
            }
            await prisma.user.create({
                data: {
                    firstname: req.body.firstname,
                    lastname : req.body.lastname,
                    username: req.body.username,
                    password: hash,
                }
            });
        });
        res.render("log-in");
    }
]

const logInGet = (req, res) => {
    res.render("log-in");
}

module.exports = {
    welcomeGet,
    signUpGet,
    signUpPost,
    logInGet
}