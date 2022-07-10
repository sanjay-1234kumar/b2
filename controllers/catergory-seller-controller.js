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
const upload = multer({ storage: storage }).single('caterimage');// 



const SellerCatergoryService = require('../services/product/catergory-service');

const SellerCatergory = {


  async addSellerCatergory(req, res, next) {
    upload(req, res, async (err) => {

      if (err) {

        //console.log("catergory image is not succesffuly uploaded");

        return next(err);
      }

      //console.log("file is sucessfully uploaded");

      //console.log(req.file);

      if (!(req.file)) {

        //console.log("file is sent not by user");

        return next({ status: 400, message: "please provide file" });

      }

      // {destination:"tmp/",filename:"1646456-6078.jpg"}
      // we need resize the image 

      const imagepath = req.file.destination + req.file.filename;//'tmp/4578-56.jpg'

      // new file that has been 
      const fname = `caterIm/${Date.now()}-${Math.round(Math.random() * 100000)}.jpg`;



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

        //console.log(result);

        //console.log("we are succesfully delete file ");

        req.body.catergoryimage = fname;


      } catch (error) {

        //console.log("file is is not deleted");

        //console.log(error);

        return next(error);

      }

      //console.log(req.body);


      const { name, des, catergoryimage } = req.body;

      if (!name || !des || !catergoryimage) {

        return next({ status: 400, message: "all felids are required" });

      }

      // databse related work 
      // data={name:"",des:"",catergoryimage:""},

      try {
        const result = await SellerCatergoryService.createSellerCatergory({
          name, des, catergoryimage
        });

        //console.log(result);

        const catergoryDto = {
          _id: result._id,
          name: result.name,
        }

        return res.json({ pr: true, d: catergoryDto });

      } catch (error) {

        //console.log(error);
        return next(error);
      }


    });

  },
  async getSellerCatergory(req, res, next) {

    try {
      const result = await SellerCatergoryService.findAllCatergory();

      //console.log(result);

      let tranDto = result.map((i) => {
        return {
          _id: i._id,
          name: i.name,
          des: i.des,
          catergoryimage: i.catergoryimage,
          status: i.status,
        }

      });

      return res.json(tranDto);

    } catch (error) {

      // console.log(error);

      return next(err);

    }
  },
  async findSingleCatergoryByid(req, res, next) {

    //console.log("route call edit data get catergory");
    //console.log(req.params);

    const { id } = req.params;

    if (!id) {

      //console.log("id is not provedide for catergory data");

      return next({ status: 400, message: "id is not provedide for catergory data edit" });
    }

    //find by id 
    try {
      const result = await SellerCatergoryService.fincatergorybyidwithdetails(id);

      //console.log(result);

      return res.json({ or: true, result });

    } catch (error) {

      //console.log(error);

      return next(error);

    }



  },

  async getSellerCatergoryForeditData(req, res, next) {

    //admin route only
    //console.log("route call edit data get catergory");
    //console.log(req.params);

    const { id } = req.params;

    if (!id) {

      //console.log("id is not provedide for catergory data");

      return next({ status: 400, message: "id is not provedide for catergory data edit" });
    }

    //find by id 
    try {
      const result = await SellerCatergoryService.findCatergoryByIdforEdit(id);

      //console.log(result);

      return res.json({ or: true, result });

    } catch (error) {

      // console.log(error);

      return next(error);

    }


  },

  async updateSellercatergoryByid(req, res, next) {
    //admin route only
    // console.log("route call upadate catergory");

    //console.log(req.body);

    const { id } = req.body;

    if (!id) {

      //console.log("id is not provedide for catergory data");

      return next({ status: 400, message: "id is not provedide for catergory data edit" });
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
      name, des,
    };

    try {

      const result = await SellerCatergoryService.updateCatergoryByid(id, mydata);

      //console.log(result);

      return res.json({ or: true, result });

    } catch (error) {

      //console.log(error);

      return next(error);
    }


  },



};


module.exports = SellerCatergory;











