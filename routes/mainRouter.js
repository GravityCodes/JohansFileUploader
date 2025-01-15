const { Router } = require("express");
const mainRouter = Router();

mainRouter.get("/", (req, res) => {res.render("main/home")});

module.exports = mainRouter;