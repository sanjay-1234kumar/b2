

// multer and resize ka work karnge gye


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
const upload = multer({ storage: storage }).single('subcaterimage');// 

const SellerSubCatergoryService = require('../services/product/subcatergory-service');

const SellerCatergoryService = require('../services/product/catergory-service');

const SellerSubCatergory = {


  async createSubCatergory(req, res, next) {

    upload(req, res, async (err) => {

      if (err) {
        // console.log("sub catergory image is not succesffuly uploaded");

        return next(err);
      }

      //console.log("file is sucessfully uploaded");

      //console.log(req.file);

      if (!(req.file)) {
        console.log("file is sent not by user");
        return next({ status: 400, message: "please provide file" });

      }

      const imagepath = req.file.destination + req.file.filename;//'tmp/4578-56.jpg'

      // new file that has been 
      const fname = `caterIm/${Date.now()}-${Math.round(Math.random() * 100000)}.jpg`;

      try {
        await sharp(imagepath).resize(1000).toFile(fname);

        //console.log("file is suceesfully resize ");

      } catch (error) {

        // console.log("shrap error ");

        // console.log(error);

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
        //console.log(result);
        //console.log("we are succesfully delete file ");

        req.body.subcatergoryimage = fname;



      } catch (error) {
        // console.log("file is is not deleted");

        //  console.log(error);
        return next(error);

      }

      // databse related work 

      const { name, parent, des, subcatergoryimage } = req.body;

      //validtion work 

      if (!name || !parent || !des || !subcatergoryimage) {

        return next({ status: 400, message: "all felids are required" });

      }

      // find parent is not on db or not 
      let CaterParent;

      try {
        CaterParent = await SellerCatergoryService.findParentOfSub(parent);
        if (!CaterParent) {

          //console.log("parent catergory not found db");

          return next({ status: 400, message: "in valid aprent catergory" });

        }

        //console.log(CaterParent);

      } catch (error) {

        //console.log(error);

        return next(error);
      }

      //final store in db

      try {

        const result = await SellerSubCatergoryService.createSingleSubCatergory({
          name,
          des,
          subcatergoryimage,
          parent: CaterParent._id,
        });

        //console.log(result);

        return res.json({ pr: true, d: { _id: result._id, name: result.name } });


      } catch (error) {

        //console.log(error);

        return next(error);

      }


    });

  },

  async getAllSubCatergory(req, res, next) {

    try {
      const result = await SellerSubCatergoryService.findAllSubCatergory();

      let subCaterDto = result.map((i) => {
        return {
          _id: i._id,
          name: i.name,
          des: i.des,
          subcatergoryimage: i.subcatergoryimage,
          parent: i.parent,
          status: i.status,
        }
      });

      //console.log(result);

      return res.json(subCaterDto);

    } catch (error) {

      //console.log(error);

      return next(error);

    }
  },
  async findsinglesubcatergorybyid(req, res, next) {

    console.log(req.params);

    const { id } = req.params;

    if (!id) {

      //console.log("validition error id is proveied");

      return next({ status: 400, message: "validition error id is proveied" });
    }

    //find by id

    try {

      const result = await SellerSubCatergoryService.findsubcatergorybyidwithdetails(id);


      //console.log(result);

      return res.json({ or: true, result });

    } catch (error) {

      //console.log(error);

      return next(error);

    }


  },

  async getSubcatergoryFordataforedit(req, res, next) {

    //console.log("route call edit for subactergory ");

    //console.log(req.params);

    const { id } = req.params;

    if (!id) {

      //console.log("validition error id is proveied");

      return next({ status: 400, message: "validition error id is proveied" });
    }


    try {

      const result = await SellerSubCatergoryService.getDataforeditByid(id);

      //console.log(result);

      return res.json({ or: true, result });

    } catch (error) {

      //console.log(error);

      return next(error);

    }

  },

  async updateSellerSubcatergorybyId(req, res, next) {

    //console.log("route call update for subactergory ");


    //console.log(req.body);

    const { id } = req.body;

    if (!id) {

      // console.log("validition error id is proveied");

      return next({ status: 400, message: "validition error id is proveied" });
    }

    let { name, des } = req.body;


    if (!name || !des) {

      //console.log("validtion error all feilds are provied");

      return next({ status: 400, message: "validtion error all feilds are provied" });
    }

    //type cating 

    name = name.toLowerCase();
    des = des.toLowerCase();

    let mydata = {
      name, des
    };

    try {

      const result = await SellerCatergoryService.updateCatergoryByid(id, mydata);

     // console.log(result);

      return res.json({ or: true, result });

    } catch (error) {

      //console.log(error);

      return next(error);
    }


  },





};



module.exports = SellerSubCatergory;



