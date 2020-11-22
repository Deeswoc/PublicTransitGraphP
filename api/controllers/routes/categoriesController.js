const categoryModel = require('../../models/route/categories');

exports.get_categories = async(req, res, next) =>{
    try {
        let categories = await categoryModel.getRouteCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        });
        console.error(error);
        console.error(error.stack);
    }
}

exports.get_category = async (req, res, next)=>{
    try{
        let id = req.params.id;
        category = await categoryModel.getRouteCategory(id)
        res.status(200).json(category);
    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message,
            error
        });
    }
}

exports.add_category = async(req, res, next) => {
    try{
        let category = req.body;
        let newCategory = await categoryModel.addRouteCategory(category);
        res.status(201).json(newCategory);
    }catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            stack: error.stack
        });
        
    }
}