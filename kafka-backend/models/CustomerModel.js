const mongoose = require('mongoose');
const AddressSchema = require('./AddressModel');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');


let customerSchema = new mongoose.Schema({
  custFirstName: {type: String, required: true},
  custLastName: {type: String, required: true},
  custEmail: {type: String, required: true},
  custPassword: {type: String, required: true},
  custAddress: {type: AddressSchema, required: false},
  custImage: {type: String, required: false},
  custDob: {type: Date, required: false},
  custNickname: {type: String, required: false},
  custPhone: {type: String, required: false},
  custAbout: {type: String, required: false},
});

customerSchema.pre('save', function(next){
    if(this.isModified('custPassword')){
        bcrypt.hash(this.custPassword, 8, (err, hash) => {
            if(err){
                return next(err);
            }

            this.custPassword = hash;
            next();
        });
    }
});


customerSchema.methods.comparePassword = async function(password) {
    if(!password) throw new Error('Password is missing.');
    try{
        const result = await bcrypt.compare(password, this.custPassword);
        return result;
    } catch(err){
        console.log('Error while comparing password : '+err.message);
    }
}

const customerModel = mongoose.model('customer', customerSchema);
module.exports = customerModel;