const mongoose = require('mongoose');

const APP_URL = process.env.BASE_URL;


const Schema = mongoose.Schema;


const workingSchema = new Schema({
    nameofwork: { type: String, required: false },
    status: { type:Boolean,default:true },
    workimage: {
        type: String, required: false, get: (workimage) => {
            return `${APP_URL}/${workimage}`;
        }
    },
}, {
    timestamps: true,
});



module.exports = mongoose.model('Working', workingSchema);
