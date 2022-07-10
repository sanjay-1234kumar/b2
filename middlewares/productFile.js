
const path = require('path');

const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/')
  },
  filename: function (req, file, cb) {
    const unique_name = `${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname)}`;
    //3435-545.jpg
    cb(null, unique_name);

  }
});


const upload = multer({ storage: storage }).fields([{ name: "image1", maxCount: 1 },
{ name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }, { name: "image5", maxCount: 1 }]);




function handelMutiplyFile(req, res, next) {

  //console.log("file handling start");


  upload(req, res, async (err) => {

    if (err) {

      //console.log("file is not uploaded in /hight");

      return next(err);
    }

    //console.log("file uploded sucessfully");

    const { files } = req;

    //console.log(files);

    if (!files) {

      //console.log("files are not send by user");

      return next({ status: 400, message: "file are send from seller" });

    }


    let fileArray = [];

    let num = 0;

    for (const key in files) {

      num++;

      fileArray.push({
        input: `${files[key][0].destination}${files[key][0].filename}`,
        output: `prIm/${Date.now()}-${Math.round(Math.random() * 1000000)}-${num}.jpg`,
      });

    };


    //console.log(fileArray);


    // call resize all fiel function 
    let result;

    try {

      for (let i = 0; i < fileArray.length; i++) {

        result = await sharp(fileArray[i].input).resize().toFile(fileArray[i].output);// push 

        //console.log(result);
        //console.log("resize done with suceessfully");

      }


    } catch (error) {

      // console.log("sharp resizing error");

      // console.log(error);

      return next(error);

    }


    let mymainImage = `prIm/main${Date.now()}-${Math.round(Math.random() * 1000000)}-${num}.jpg`;

    try {

      await sharp(fileArray[0].input).resize(300).toFile(mymainImage);

    } catch (error) {

      //console.log(error);

      return next(error);
    }



    function deletImage(input) {

      return new Promise((reslove, reject) => {
        fs.unlink(`${appRoot}/${input}`, (err) => {
          if (err) {

            return reject(err);
          }
          return reslove("file is deleted sucessfully");


        });

      });
    }

    let fsdel;

    try {

      for (let j = 0; j < fileArray.length; j++) {

        fsdel = await deletImage(fileArray[j].input);

        //console.log(fsdel);

      }
    } catch (error) {

      //console.log("error deleting file ");

      //console.log(error);

      return next(error);
    }



    req.body.mymainImage = mymainImage;
    req.body.primage = fileArray;//[{input:"",output:"prIm/56-67.jpg"}]


    next();

  });

}





module.exports = handelMutiplyFile;










