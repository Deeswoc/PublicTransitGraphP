let categoryModel;

async function getCategories(req, res) {
  try {
    const data = await categoryModel.getTownCategories();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
}

async function addCategories(req, res) {
  try {
    const { categories } = req.body;
    const newCategories = await categoryModel.addTownCategories(categories);
    res.status(201).send(newCategories);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
}

module.exports = (dependencies) => {
  categoryModel = dependencies.categoryModel;
  return {
    getCategories,
    addCategories,
  };
};
