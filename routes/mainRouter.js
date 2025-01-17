const { Router } = require("express");
const mainRouter = Router();
const mainController = require("../controller/mainController");

mainRouter.get("/", mainController.homeGet);


mainRouter.get("/folder/:name", mainController.viewFolderGet);
mainRouter.post("/new-folder", mainController.newFolderPost);




mainRouter.post("/:name/add-file", mainController.addFilePost);


module.exports = mainRouter;