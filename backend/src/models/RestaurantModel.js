const mongoose = require('mongoose');
const AddressSchema = require('./AddressModel');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');


let restaurantSchema = new mongoose.Schema({
  resName: {type: String, required: true},
  resEmail: {type: String, required: true},
  resPassword: {type: String, required: true},
  resAddress: {type: AddressSchema, required: false},
  resDescription: {type: String, required: false},
  resPhone: {type: String, required: false},
  resImage: {type: String, required: false},
  resDeliveryType: {type: String, required: false}
});

restaurantSchema.pre('save', function(next){
    if(this.isModified('resPassword')){
        bcrypt.hash(this.resPassword, 8, (err, hash) => {
            if(err){
                return next(err);
            }

            this.resPassword = hash;
            next();
        });
    }
});


restaurantSchema.methods.comparePassword = async function(password) {
    if(!password) throw new Error('Password is missing.');
    try{
        const result = await bcrypt.compare(password, this.resPassword);
        return result;
    } catch(err){
        console.log('Error while comparing password : '+err.message);
    }
}

const restaurantModel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantModel;