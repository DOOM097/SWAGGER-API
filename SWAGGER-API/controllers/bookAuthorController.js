const BookAuthor = require("../models/bookauthor");


exports.getAllBookAuthorIds = async (req, res) => {
  try {
    const bookAuthorIds = await BookAuthor.findAll({
      attributes: ["BookId", "AuthorId"], 
    });

    res.json(bookAuthorIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { BookId, AuthorId } = req.body;

    if (!BookId || !AuthorId) {
      return res.status(400).json({ message: "Both BookId and AuthorId are required." });
    }

    const existingRelation = await BookAuthor.findOne({ where: { BookId, AuthorId } });

    if (existingRelation) {
      return res.status(400).json({ message: "Relation already exists." });
    }

    const newRelation = await BookAuthor.create({ BookId, AuthorId });

    res.json(newRelation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAuthor = async (req, res) => {
    try {
      const { BookId, AuthorId } = req.body;
  
      if (!BookId || !AuthorId || !Array.isArray(AuthorId)) {
        return res.status(400).json({ message: "Invalid request body." });
      }
  
      await BookAuthor.destroy({ where: { BookId } });
  
      const newRelations = AuthorId.map(AuthorId => ({ BookId, AuthorId }));
      await BookAuthor.bulkCreate(newRelations);
  
      res.json({ message: "Relations updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

exports.deleteRelation = async (req, res) => {
  try {
    const { BookId, AuthorId } = req.body;

    if (!BookId || !AuthorId) {
      return res.status(400).json({ message: "Both BookId and AuthorId are required." });
    }

    const existingRelation = await BookAuthor.findOne({ where: { BookId, AuthorId } });

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
