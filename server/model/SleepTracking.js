const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sleepTrackingSchema = new mongoose.Schema({  
  row_data: { type: String },
  frequency: { type: Number },
  number_steps: { type: Number }, 
  status: { type: String,
    enum: ["COPYING", "PENDING", "PROCESSING", "FINISHED"],
    default: "COPYING", },
  timestamp: { type: Date}, 
  metadata: Object },

  { timeseries: {
    timeField: 'timestamp',
    metaField: 'metadata',
    granularity: 'seconds'
    },
    autoCreate: false,
    expireAfterSeconds: 86400
  },
  
  );
  module.exports  = mongoose.models.BMTempsTimeSeries;
module.exports = mongoose.model("SleepTracking", sleepTrackingSchema);

