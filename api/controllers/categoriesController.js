const catergoryModel = require('../models/town/categories/catagory');

exports.test = (req, res, next) => {
    res.send("hello world");
}

exports.get_categories = async(req, res, next) =>{
    try {
        let data = await catergoryModel.getTownCategories();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        });
    }
}