const { dialogTitleClasses } = require("@mui/material");
const {Product} = require("../model/Product");

exports.createProduct = async (req,res) =>{
    //ye product (jo ki req.body h) wo aayegi frontend se API ke through
    const product = new Product(req.body);
    const response = await product.save();
    // console.log(response);
    try{
        const doc = await product.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchAllProducts = async (req,res) =>{
    //here we need all query string

    // filter = {"category":["smartphone",'laptops']}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}

    //TODO: we have to try with multiple category and brands after change in front-end

    let query = Product.find({});
    let totalProductsQuery = Product.find({}); // count karne ke liye query kar rhe !!

    //order ==> category --> brand  --> sort --> pagination

    if(req.query.category){
        query = query.find({category:req.query.category});
        totalProductsQuery = totalProductsQuery.find({category:req.query.category});
    }
    if(req.query.brand){
        query = query.find({brand: req.query.brand});
        totalProductsQuery = totalProductsQuery.find({brand: req.query.brand});
    }
    if(req.query._sort && req.query._order){
        // await query._sort({"title":"desc/ asc"})
        query = query.sort({[req.query._sort]:req.query._order})
    }


    const totalDocs = await totalProductsQuery.count().exec();
    console.log({totalDocs});

    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize*(page-1)).limit(pageSize);
    }

    try{
        const docs = await query.exec();
        res.set('X-Total-Count',totalDocs);// new header set kar sakte (More reference ke liye ...express Doc)
        res.status(200).json(docs);
    }catch(err){
        res.status(400).json(err);
    }
}