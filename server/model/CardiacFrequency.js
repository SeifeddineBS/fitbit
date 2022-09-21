
const mongoose   = require('mongoose');
timestamps = require('mongoose-timestamp');
const bcrypt = require("bcrypt");

const cardiacSchema = new mongoose.Schema({  
  row_data: { type: String },
  frequency: { type: Number },
  number_steps: { type: Number }, 
  status: { type: String,
    enum: ["COPYING", "PENDING", "PROCESSING", "FINISHED"],
    default: "COPYING", },
  timestamp: { type: Date}, 
  metadata: Object }, {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'seconds'
    },
    autoCreate: false,
    expireAfterSeconds: 86400
  });
  
  // `Test` collection will be a timeseries collection
  module.exports = mongoose.model('Cardiac', cardiacSchema);

