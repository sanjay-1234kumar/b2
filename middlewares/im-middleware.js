
const multer = require('multer');

const sharp = require('sharp');

const path = require('path');

const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'pftmp/')
  },
  filename: function (req, file, cb) {
    const unique_name = `${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname)}`;
    //3435-545.jpg
    cb(null, unique_name);

  }
});

const upload = multer({ storage: storage }).single('shopimage');// 

function handleMyFile(req, res, next) {

  //console.log('route /api/seller/activate');

  //console.log(" file middlewre calling");

  //console.log(appRoot);

  upload(req, res, async (err) => {

    if (err) {
      //console.log("file is not uploaded");
      //console.log(err);
      return next(err);

    }
    //console.log("file is sucessfully uploaded");

    //console.log(req.file);
    // {destination:"tmp/",filename:"1646456-6078.jpg"}
    // we need resize the image 

    if (!(req.file)) {

      //console.log("file is sent not by user");

      return next({ status: 400, message: "please provide file" });

    }

    const imagepath = req.file.destination + req.file.filename;//'tmp/4578-56.jpg'

    // new file that has been 
    const fname = `shopIm/${Date.now()}-${Math.round(Math.random() * 100000)}.jpg`;

    try {
      await sharp(imagepath).resize(1000).toFile(fname);

      //console.log("file is suceesfully resize ");

    } catch (error) {

      //console.log("shrap error ");
      //console.log(error);

      return next(error);
    }

    function deletSingleImage(input) {

      return new Promise((reslove, reject) => {
        fs.unlink(`${appRoot}/${input}`, (err) => {

          if (err) {
            return reject(err);
          }

          return reslove("file has been deletd");

        });
      });
    }
    try {
      const result = await deletSingleImage(imagepath);

      // console.log(result);
      // console.log("we are succesfully delete file ");

      req.body.profileImage = fname;

      next();//final next


    } catch (error) {
      //console.log("file is is not deleted");

      //console.log(error);
      return next(error);

    }

  });

}


module.exports = handleMyFile;
