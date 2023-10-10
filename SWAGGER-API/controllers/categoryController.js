const Category = require("../models/categories");
const BookCategory = require("../models/bookcategory");
const Sequelize = require("sequelize");

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const category = {
        name: req.body.name,
    };

    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

exports.findAll = (req, res) => {

    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};
exports.update = (req, res) => {
    const categoryId = req.params.id;

    if (!categoryId) {
        res.status(400).send({
            message: "Category ID is required."
        });
        return;
    }

    Category.findByPk(categoryId)
        .then(category => {
            if (!category) {
                res.status(404).send({
                    message: `Category with ID ${categoryId} not found.`
                });
            } else {
                category.name = req.body.name;

                category.save()
                    .then(() => {
                        res.send({
                            message: `Category with ID ${categoryId} has been updated successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while updating the category."
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
exports.delete = (req, res) => {
    const categoryId = req.params.id;

    if (!categoryId) {
        res.status(400).send({
            message: "Category ID is required."
        });
        return;
    }

    Category.findByPk(categoryId)
        .then(category => {
            if (!category) {
                res.status(404).send({
                    message: `Category with ID ${categoryId} not found.`
                });
            } else {
                category.destroy()
                    .then(() => {
                        res.send({
                            message: `Category with ID ${categoryId} has been deleted successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while deleting the category."
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
exports.getBookCountByCategory = (req, res) => {
    Category.findAll()
    .then(categories => {
        const genresWithBookCount = [];
        const promises = categories.map(category => {
            return BookCategory.count({
                where: {
                    CategoryId: category.id
                }
            })
            .then(bookCount => {
                genresWithBookCount.push({
                    genre: category,
                    bookCount: bookCount
                });
            });
        });

        Promise.all(promises)
            .then(() => {
                res.send(genresWithBookCount);
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