const Book = require("../models/books");
const { Sequelize } = require('sequelize');
const BookAuthor = require("../models/bookauthor");
const Author = require("../models/authors");
const Category = require("../models/categories");
const BookCategory = require("../models/bookcategory");


exports.create = async (req, res) => {
    if (!req.body.title || !req.body.isbn) {
        res.status(400).send({
            message: "Title and ISBN are required fields!"
        });
        return;
    }

    const bookData = {
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        publishedDate: req.body.publishedDate,
        thumbnailUrl: req.body.thumbnailUrl,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        status: req.body.status,
    };

    try {
        const createdBook = await Book.create(bookData);

        if (req.body.authors && req.body.authors.length > 0) {
            const authorIds = [];
            for (const authorName of req.body.authors) {
                const [author, created] = await Author.findOrCreate({
                    where: { name: authorName }
                });
                authorIds.push(author.id);
                await BookAuthor.create({
                    BookId: createdBook.id,
                    AuthorId: author.id
                });
            }
        }

        if (req.body.categories && req.body.categories.length > 0) {
            const categoryIds = [];
            for (const categoryName of req.body.categories) {
                const [category, created] = await Category.findOrCreate({
                    where: { name: categoryName }
                });
                categoryIds.push(category.id);
                await BookCategory.create({
                    BookId: createdBook.id,
                    CategoryId: category.id
                });
            }
        }

        res.send(createdBook);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred."
        });
    }
}; 



exports.findAll = async (req, res) => {
    try {
        const books = await Book.findAll();
        const booksWithGenresAndAuthors = [];

        for (const book of books) {
            const bookCategoryData = await BookCategory.findAll({
                where: {
                    BookId: book.id
                }
            });

            const categoryIds = bookCategoryData.map(item => item.CategoryId);

            const categories = await Category.findAll({
                where: {
                    id: categoryIds
                }
            });
            const categoryNames = categories.map(category => category.name);

            const bookAuthorData = await BookAuthor.findAll({
                where: {
                    BookId: book.id
                }
            });

            const authorIds = bookAuthorData.map(item => item.AuthorId);

            const authors = await Author.findAll({
                where: {
                    id: authorIds
                }
            });
            const authorNames = authors.map(author => author.name);

            booksWithGenresAndAuthors.push({
                _id: book.id,
                title: book.title,
                isbn: book.isbn,
                pageCount: book.pageCount,
                publishedDate: book.publishedDate,
                thumbnailUrl: book.thumbnailUrl,
                shortDescription: book.shortDescription,
                longDescription: book.longDescription,
                status: book.status,
                authors: authorNames, 
                categories: categoryNames 
            });
        }

        res.send(booksWithGenresAndAuthors);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred."
        });
    }
};



exports.update = async (req, res) => {
    const bookId = req.params.id;

    if (!bookId) {
        res.status(400).send({
            message: "Book ID is required."
        });
        return;
    }

    try {
        const book = await Book.findByPk(bookId);

        if (!book) {
            res.status(404).send({
                message: `Book with ID ${bookId} not found.`
            });
            return;
        }

        book.title = req.body.title || book.title;
        book.isbn = req.body.isbn || book.isbn;
        book.pageCount = req.body.pageCount || book.pageCount;
        book.publishedDate = req.body.publishedDate || book.publishedDate;
        book.thumbnailUrl = req.body.thumbnailUrl || book.thumbnailUrl;
        book.shortDescription = req.body.shortDescription || book.shortDescription;
        book.longDescription = req.body.longDescription || book.longDescription;
        book.status = req.body.status || book.status;

        await book.save();

        if (req.body.authors && req.body.authors.length > 0) {
            const authorIds = [];
            for (const authorName of req.body.authors) {
                const [author, created] = await Author.findOrCreate({
                    where: { name: authorName }
                });
                authorIds.push(author.id);
                await BookAuthor.findOrCreate({
                    where: {
                        BookId: book.id,
                        AuthorId: author.id
                    }
                });
            }
            await BookAuthor.destroy({
                where: {
                    BookId: book.id,
                    AuthorId: { [Sequelize.Op.notIn]: authorIds }
                }
            });
        }

        if (req.body.categories && req.body.categories.length > 0) {
            const categoryIds = [];
            for (const categoryName of req.body.categories) {
                const [category, created] = await Category.findOrCreate({
                    where: { name: categoryName }
                });
                categoryIds.push(category.id);
                await BookCategory.findOrCreate({
                    where: {
                        BookId: book.id,
                        CategoryId: category.id
                    }
                });
            }
            await BookCategory.destroy({
                where: {
                    BookId: book.id,
                    CategoryId: { [Sequelize.Op.notIn]: categoryIds }
                }
            });
        }

        res.send({
            message: `Book with ID ${bookId} has been updated successfully.`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the book."
        });
    }
};

exports.delete = (req, res) => {
    const bookId = req.params.id;

    if (!bookId) {
        res.status(400).send({
            message: "Book ID is required."
        });
        return;
    }
    Book.findByPk(bookId)
        .then(book => {
            if (!book) {
                res.status(404).send({
                    message: `Book with ID ${bookId} not found.`
                });
            } else {
                book.destroy()
                    .then(() => {
                        res.send({
                            message: `Book with ID ${bookId} has been deleted successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while deleting the book."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};
exports.searchByTitle = (req, res) => {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm) {
        res.status(400).send({
            message: "Search term is required."
        });
        return;
    }

    Book.findAll({
        where: {
            title: {
                [Sequelize.Op.like]: `%${searchTerm}%`
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};
exports.findByAuthorName = (req, res) => {
    const authorName = req.params.name;

    if (!authorName) {
        res.status(400).send({
            message: "Author name is required."
        });
        return;
    }

    Author.findOne({
        where: {
            name: authorName
        }
    })
    .then(authorData => {
        if (!authorData) {
            res.status(404).send({
                message: `Author with name '${authorName}' not found.`
            });
            return;
        }

        BookAuthor.findAll({
            where: {
                AuthorId: authorData.id
            }
        })
        .then(bookAuthorData => {
         
            const bookIds = bookAuthorData.map(item => item.BookId);

            Book.findAll({
                where: {
                    id: bookIds
                }
            })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred."
        });
    });
};
exports.findByCategory = (req, res) => {
    const categoryName = req.params.name;

    if (!categoryName) {
        res.status(400).send({
            message: "Category name is required."
        });
        return;
    }

    Category.findOne({
        where: {
            name: categoryName
        }
    })
    .then(categoryData => {
        if (!categoryData) {
            res.status(404).send({
                message: `Category with name '${categoryName}' not found.`
            });
            return;
        }

        BookCategory.findAll({
            where: {
                CategoryId: categoryData.id
            }
        })
        .then(bookCategoryData => {
            
            const bookIds = bookCategoryData.map(item => item.BookId);

            Book.findAll({
                where: {
                    id: bookIds
                }
            })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred."
        });
    });
};
