const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const reclamationSchema = new mongoose.Schema({
  contents: {
    type: String,
  },

  status: {
    type: String,
    enum: ["SEEN", "NOT SEEN", "BEING PROCESSED"],
    default: "NOT SEEN",
  },
 
  
},{timestamps:true});

module.exports = mongoose.model("Reclamation", reclamationSchema);
