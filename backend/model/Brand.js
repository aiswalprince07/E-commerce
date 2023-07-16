const mongoose = require('mongoose');
const {Schema} = mongoose;

const brandSchema = new Schema({
    label: {type: String, required: true, unique:true},
    value: {type: String, required: true, unique:true},
})
// just changing the name ==> _id -> id
const virtual = brandSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

brandSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret) {delete ret._id}
})

exports.Brand = mongoose.model('brand',brandSchema);
