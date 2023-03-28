const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
 user: {type: Schema.Types.ObjectId, ref: "User"},  
 date: {type: Date},
 message: {type: String},
 comment: {type: Array},
})



// CategorySchema.virtual('URL').get(function() {
//   return `/inventory/category/${this._id}`
// });


module.exports = mongoose.model('Post',postSchema)