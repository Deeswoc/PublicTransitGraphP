const graph = require('../routes/graphing');

exports.test = (req, res, next) => {
    res.send("hello world");
}

exports.get_categories = async(req, res, next) =>{
    try {
        let data = await graph.get_town_categories();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        });
    }
}