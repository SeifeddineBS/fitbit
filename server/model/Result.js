const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resultSchema = new mongoose.Schema({ 
  uid_patient: {
    type: mongoose.Types.ObjectId, ref:"User",
    required: true,
  },
  algorithm_name: { type: String },
  details: { type: String },
  timestamp: { type: Date}, 
  metadata: Object }, //anxiety ??
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'seconds'
    },
    autoCreate: false,
    expireAfterSeconds: 86400
  }
  ,{timestamps:true});


module.exports = mongoose.model("Result", resultSchema);
