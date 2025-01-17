const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require('multer');
const upload = multer({dest: './public/uploads'});

const homeGet = async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        ownerId: req.user.id,
      },
      select: {
        name: true,
      },
    });
    console.log(folders)
    req.session.folders = folders;
    res.render("main/home", {folders});
  }catch(err){
    throw err;
  }
}


const viewFolderGet = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where : {
        parentFolderName: req.params.name,
      }
    });
    req.session.files = files;
    req.session.folderName = req.params.name;
    res.render("main/home", {files, folderName: req.params.name, folders: req.session.folders});
  } catch(err) {
    throw err;
  }
}

const newFolderPost = async (req, res) => {
      try {
       await prisma.folder.create({
          data: {
            name: req.body.folderName,
            ownerId: req.user.id,
          }
        })
       res.redirect("/home");
      }catch(err){
        throw err
      }
}

const addFilePost = [ 
  upload.single('file'),
  async (req, res) => {
    try {
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        filetype: req.file.mimetype,
        parentFolderName: req.params.name,
        downloadlink: "hi",
      }
    });
    res.render("main/home", {files: req.session.files, folderName: req.session.folderName, folders: req.session.folders});
  }catch(err){
    throw err
  }
}];

module.exports = {
  newFolderPost,
  homeGet,
  addFilePost,
  viewFolderGet
}