const BookCategory = require("../models/bookcategory");


exports.getAllBookCategoryIds = async (req, res) => {
  try {
    const bookCategoryIds = await BookCategory.findAll({
      attributes: ["BookId", "CategoryId"],
    });

    res.json(bookCategoryIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.create = async (req, res) => {
    try {
      const { BookId, CategoryId } = req.body;
  
      if (!BookId || !CategoryId) {
        return res.status(400).json({ message: "Both BookId and CategoryId are required." });
      }
  
      const existingRelation = await BookCategory.findOne({ where: { BookId, CategoryId } });
  
      if (existingRelation) {
        return res.status(400).json({ message: "Relation already exists." });
      }
  
      const newRelation = await BookCategory.create({ BookId, CategoryId });
  
      res.json(newRelation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.updateCategory = async (req, res) => {
    try {
      const { BookId, CategoryIds } = req.body;
  
      if (!BookId || !CategoryIds || !Array.isArray(CategoryIds)) {
        return res.status(400).json({ message: "Invalid request body." });
      }
  
      await BookCategory.destroy({ where: { BookId } });
  
      const newRelations = CategoryIds.map(CategoryId => ({ BookId, CategoryId }));
      await BookCategory.bulkCreate(newRelations);
  
      res.json({ message: "Relations updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  exports.deleteRelation = async (req, res) => {
    try {
      const { BookId, CategoryId } = req.body;
  
      if (!BookId || !CategoryId) {
        return res.status(400).json({ message: "Both BookId and CategoryId are required." });
      }
  
      const existingRelation = await BookCategory.findOne({ where: { BookId, CategoryId } });
  
      if (!existingRelation) {
        return res.status(404).json({ message: "Relation not found." });
      }
  
      await existingRelation.destroy(); 
  
      res.json({ message: "Relation deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };