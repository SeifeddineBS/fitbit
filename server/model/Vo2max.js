const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const vo2maxSchema = new mongoose.Schema({    
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
    autoCreate: false, },
  {timestamps:true}
  
  );
module.exports = mongoose.model("Vo2max", vo2maxSchema);

