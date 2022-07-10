
const DB_URL=process.env.DB_URL;

const mongoose=require('mongoose');



async function  DbConnect() {

   
try {
    await mongoose.connect(DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    console.log(" we are coonected to databse db result ");

} catch (error) {
    
    console.log("error of db we are not connect with data base");

    console.log(error);
}
  
    
}


module.exports=DbConnect;

