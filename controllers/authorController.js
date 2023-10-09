const Author = require('../models/author');


// Метод для получения всех книг
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    console.error('Ошибка при получении списка авторов:', error);
    res.status(500).json({ error: 'Ошибка при получении списка авторов' });
  }
};


module.exports = {
  getAllAuthors,
  // Другие методы...
};
