const catergoryModel = require('../models/town/categories/catagory');

exports.test = (req, res, next) => {
    res.send("hello world");
}

exports.get_categories = async(req, res, next) =>{
    try {
        let data = await catergoryModel.getTownCategories();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        });
    }
}

exports.add_categories = async(req, res, next) => {
    try{
        let categories = req.body.categories;
        await catergoryModel.addTownCategories(categories);
        res.send(201);
    }catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        });
    }
}