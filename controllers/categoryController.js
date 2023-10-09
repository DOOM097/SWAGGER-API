
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
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Category."
            });
        });
}


exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving categories."
            });
        });
}
