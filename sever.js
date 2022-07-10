require('dotenv').config();

const express = require('express');

const path = require('path');


const app = express();

global.appRoot = path.resolve(__dirname);

const cors = require('cors');

const cookieParser = require('cookie-parser');


const customerRou = require('./customer-routes');

const DbConnect = require('./database.js');


const port = process.env.PORT || 5000;// try to convert string into number

app.use(cookieParser());


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
}));



app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/wrkIm', express.static('wrkIm'));

app.use(customerRou);// customer

DbConnect();



app.get('/', (req, res, next) => {



    return res.sendFile(__dirname + '/index.html');


});





app.use((err, req, res, next) => {



    //err.status=400 bad request err.status=401 unauthorised access 
    //err.status=403 forrbbiend err.status=404 not found 
    // err.status=500 internal server error 501=not implented
    // 502=bad gateway 503 service is unaviable 

    //console.log(err);

    let { status, message } = err;

    if (!status) {
        status = 500;
    }

    if (!message) {
        message = "Internal sever error"
    }

    return res.status(status).json({ message });
});




app.listen(port, () => {
    console.log(`sever is listening at port ${port}`);

});


