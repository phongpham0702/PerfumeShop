const multer = require("multer");
const fs = require("fs");
const home = __dirname.replace("utils","") + "uploads";
const util = require("util");


const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      let userUID = "abc";
      let userUploadPath = home + `/${userUID}`
      
      if(!fs.existsSync(userUploadPath))
      {
        fs.mkdirSync(userUploadPath, {recursive: true})
      }
      callback(null, userUploadPath)
    },
    filename: function (req, file, callback) {
      
      let userUID = "abc";
      
      let filename = `${Date.now()}-${userUID}-${file.originalname}`;
      callback(null, filename)
    }
  });

  //Attach file limit : 5MB
  const uploadAttach = multer({ storage: diskStorage,overwrite: true, limits:{fileSize: 5*1024*1024}}).array("Attachfile" , 5);


  // Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
  let multipleUploadMiddleware = util.promisify(uploadAttach);

  module.exports = async (req,res,next) => {
    console.log(home);
    try {
      await multipleUploadMiddleware(req,res, (error) => {

        if (error) {
                    
          if(error.code == 'LIMIT_FILE_SIZE')
          {
              return res.status(200).json({code:400 ,message:"Attach files size must less than 5MB."});
          }
          
          return res.status(200).json({code:400, message:`${error}`});
        }
        next();
      })
    } catch (error) {
      console.log(error);
      return res.status(200).json({code:400, message:`${error}`});
    }

  }