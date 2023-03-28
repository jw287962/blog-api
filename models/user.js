const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
 username: {type: String, required: true},
 password: {type: String, required: true}, //hashed
 salt: {type: String, required: true},
 blogger: {type: Boolean},
})



// CategorySchema.virtual('URL').get(function() {
//   return `/inventory/category/${this._id}`
// });


module.exports = mongoose.model('User',userSchema)