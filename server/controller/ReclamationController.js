const Reclamation = require("../model/Reclamation");
var createError = require("http-errors");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const reclamation = new Reclamation({
    contents: req.body.contents,
    status: req.body.status,
    date: req.body.date,
  });

  const doesExist = await Reclamation.findOne({ reclamation: reclamation.date });
  if (doesExist) res.status(400).send({ message: "Reclamation already used!" });
  else {
    reclamation
      .save(reclamation)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while creating a create operation",
        });
      });
  }
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Reclamation
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found reclamation with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving reclamation with id " + id });
      });
  } else {
    Reclamation
      .find()
      .then((reclamation) => {
        res.send(reclamation);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving reclamation Information",
        });
      });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;
  Reclamation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update reclamation with ${id}/Maybe reclamation not found!",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status.send({ message: "Error update reclamation information" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Reclamation
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Cannot delete with id ${id}.Maybe id is wrong " });
      } else {
        res.send({
          messagge: "reclamation was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete reclamation with id=" + id,
      });
    });
};
