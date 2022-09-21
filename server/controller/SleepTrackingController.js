const SleepTracking = require("../model/SleepTracking");
var createError = require("http-errors");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const sleepTracking = new SleepTracking({
    row_data: req.body.row_data,
    frequency: req.body.frequency,
    number_steps: req.body.number_steps,
    status: req.body.status,
    timestamp: req.body.timestamp,
    metadata: req.body.metadata
  });

  const doesExist = await SleepTracking.findOne({ id_patient: sleepTracking.id_patient });
  if (doesExist) res.status(400).send({ message: "Patient already used!" });
  else {
    sleepTracking
      .save(sleepTracking)
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
    SleepTracking
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found data with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving data with id " + id });
      });
  } else {
    SleepTracking
      .find()
      .then((sleepTracking) => {
        res.send(sleepTracking);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving data Information",
        });
      });
  }
};

exports.update = async (req, res) => {
  
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const metadata = {
    id_patient: req.body.idPatient
  }
  const metadataNew = {
    id_patient: req.body.idPatientNew
  }

  SleepTracking.updateMany({"metadata":metadata},{"metadata":metadataNew}, { useFindAndModify: false })
  
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
    id_patient: req.body.idPatient
  }
  
  SleepTracking
    .deleteMany({"metadata":metadata})
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Cannot delete with id ${id}.Maybe id is wrong " });
      } else {
        res.send({
          messagge: "SleepTracking was deleted successfully", data
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete SleepTracking with id=" + id,
      });
    });
};