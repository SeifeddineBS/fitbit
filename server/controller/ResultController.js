const Result = require("../model/Result");
const User = require("../model/User");
var createError = require("http-errors");
var ObjectId = require("mongodb").ObjectId;

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const result = new Result({
    uid_patient: req.body.uid_patient,
    algorithm_name: req.body.algorithm_name,
    details: req.body.details,
    timestamp: req.body.timestamp,
    metadata: req.body.metadata,
  });

  const doesExistP = await User.findById(result.uid_patient);
  if (!doesExistP) res.status(400).send({ message: "Patient dosent exist!" });
  const doesExist = await Result.findOne({ uid_patient: result.uid_patient });
  if (doesExist) res.status(400).send({ message: "result already exist!" });

  result
    .save(result)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create operation",
      });
    });
};

exports.find = async (req, res) => {
  const id = req.params.id;
  Result.find({ uid_patient: id })
    .then((data) => {
      if (!data) {
        res.status(404).send("Results  not found ");
      } else {
        const resultsReturn = [];
        const startDate = new Date(req.body.startDate);
        const finalDate = new Date(req.body.finalDate);
        data.forEach((result) => {
          if (result.timestamp > startDate && result.timestamp < finalDate)
            resultsReturn.push(result);
        });
        if (resultsReturn.length != 0) res.status(200).send(resultsReturn);
        else res.status(404).send("Results not found between two dates");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not find Result with Patient id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const metadata = {
    anxiety: req.body.Anxiety,
  };
  const metadataNew = {
    anxiety: req.body.AnxietyNew,
  };

  Result.updateMany(
    { metadata: metadata },
    { metadata: metadataNew },
    { useFindAndModify: false }
  )

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update data with ${id}/Maybe data not found!",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status.send({ message: "Error update data information" });
    });
};

exports.delete = (req, res) => {
  const metadata = {
    anxiety: req.body.anxiety,
  };

  Result.deleteMany({ metadata: metadata })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Cannot delete with id ${id}.Maybe id is wrong " });
      } else {
        res.send({
          messagge: "Result was deleted successfully",
          data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Result with id=" + id,
      });
    });
};
