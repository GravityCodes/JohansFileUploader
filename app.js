require("dotenv").config();
const express = require('express');
const path = require("node:path");
const app = express();
const session = require("express-session");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require("@prisma/client/extension");
const passport = require('passport');
require("./config/passport");

//asset path
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000 //hour
  },
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000,  //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
}));

//form handler
app.use(express.urlencoded({extended: true}));

//passport session
app.use(passport.authenticate('session'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));