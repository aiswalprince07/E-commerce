const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title: {type : String, required: true},
    description : {type: String, required: true},
    price: {type: Number, min:[0,'Wrong min price'],max:[10000,'wrong max price']},
    disCountPercentage: {type: Number, min:[0,'Wrong min discount'],max:[100,'wrong max discount']},
    rating: {type: Number, min:[0,'Wrong min rating'],max:[5,'wrong max rating'],default: 0},
    stock: {type: Number, min:[0,'Wrong min price'],default:0},
    brand: {type: String, required: true},
    category: {type: String, required:true},
    thumbnail: {type: String, required: true},
    images: {type:[String],required: true},
    deleted: {type: String, default:false},

})
// just changing the name ==> _id -> id
const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret) {delete ret._id}
})

exports.Product = mongoose.model('Product',productSchema);
