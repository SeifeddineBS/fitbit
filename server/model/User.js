const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  date_of_birth: { type: Date },
  gender: { type: String,
    enum: ["MALE", "FEMALE", "OTHER", "PERSONALY"],
    default: "MALE", },
  personal_informations: { type: String },
  phone_number: { type: Number },
  role: { type: String,
    enum: ["SUPER ADMIN", "ADMIN", "DOCTOR", "PATIENT"],
    default: "PATIENT", },
  statusP: { type: String,
    enum: ["BLOCKED", "NEW", "CORRECT"],
    default: "NEW", },  
  password: { type: String },
  timestamp: { type: Date}, 
  metadata: Object,
  resetPasswordRequest: [
    {
      date: { type: Date, default: Date.now },
      token: { type: String },
    },
  ]
 },

  { timeseries: {
    timeField: 'timestamp',
    metaField: 'metadata',
    granularity: 'seconds'
    },
    autoCreate: false,
    expireAfterSeconds: 86400
  },
  );









  
   

/*,{timestamps:true} */


userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);

