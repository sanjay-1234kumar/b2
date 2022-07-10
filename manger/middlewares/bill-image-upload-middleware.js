

const multer = require('multer');

const sharp = require('sharp');

const path = require('path');

const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmpbill/');//profile tmp image 
    },
    filename: function (req, file, cb) {
        const unique_name = `${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname)}`;
        //3435-545.jpg
        cb(null, unique_name);

    }
});

const upload = multer({ storage: storage }).fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }]);



async function billImageMiddleware(req, res, next) {


    console.log(" bill file middlewre calling");

    console.log(appRoot);

    upload(req, res, async (err) => {

        // upload hone ke baad
        if (err) {
            console.log("file is not uploaded");
            console.log(err);
            return next(err);

        }
        console.log("file is comes with images");


        const { files } = req;
        // {destination:"pftmp/",filename:"1646456-6078.jpg"}
        // we need resize the image 

        console.log(files);//{image1:{},image2:{}}

        if (!(files)) {
            console.log("file is sent not by user");
            return next({ status: 400, message: "please provide file" });

        }

        const { image1, image2 } = files;

        const pathIm1 = image1[0].destination + image1[0].filename;//tmp/rt5.jpg
        const pathIm2 = image2[0].destination + image2[0].filename;//tmp/yt5.jg

     console.log(pathIm1);
     console.log(pathIm2);

        // new file that has been 
        const f1name = `billIm/${Date.now()}-${Math.round(Math.random() * 100000)}.jpg`;

        // image 1 is resize
        try {
            await sharp(pathIm1).resize(1000).toFile(f1name);

            console.log("file is suceesfully resize image1 ");

        } catch (error) {
            console.log("shrap error ");
            console.log(error);
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
        // image 1 is delted
        try {
             await deletSingleImage(pathIm1);// path of first
         
            console.log("we are succesfully delete file image 1 ");

        } catch (error) {
            console.log("file is is 1 not deleted");

            console.log(error);
            return next(error);

        }
        //resize image 2
        const f2name = `billIm/${Date.now()}-${Math.round(Math.random() * 100000)}.jpg`;

        try {
            await sharp(pathIm2).resize(1000).toFile(f2name);

            console.log("file is suceesfully resize image2 ");

        } catch (error) {
            console.log("shrap error ");
            console.log(error);
            return next(error);
        }
        //delete file image 

        try {
          await deletSingleImage(pathIm2);// path of first
            
            console.log("we are succesfully delete file image 1 ");

        } catch (error) {
            console.log("file is is 1 not deleted");

            console.log(error);
            return next(error);

        }

        //file handling done 
        //attach req,body
        req.body.billOfSeller=f1name;//image1 is bill for seller
        req.body.billOfCustomer=f2name;//image2 is bill for seller

        return next();



    });



}





module.exports = billImageMiddleware;
