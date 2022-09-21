const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./server/database/connection");

const PORT = process.env.PORT || 3000;
//Import Routes
const userRouter = require("./server/routes/userRouter");
const loginRouter = require("./server/routes/loginRouter");
const resetPasswordRouter = require("./server/routes/resetPasswordRouter");
const ResultRouter = require("./server/routes/ResultRouter");
const ReclamationRouter = require("./server/routes/ReclamationRouter");
const BloodPressureRouter = require("./server/routes/BloodPressureRouter");
const AccelerationRouter = require("./server/routes/AccelerationRouter");
const BodyTemperatureRouter = require("./server/routes/BodyTemperatureRouter");
const SkinTemperatureRouter = require("./server/routes/SkinTemperatureRouter");
const SleepTrackingRouter = require("./server/routes/SleepTrackingRouter");
const CardiacFrequencyRouter = require("./server/routes/CardiacFrequencyRouter");
const Vo2maxRouter = require("./server/routes/Vo2maxRouter");





const sendMail = require("./server/services/emailService")




dotenv.config();

//Connect DB

connectDB();

//Middlewear
app.use(express.json());
//Route Middlewares
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/reset", resetPasswordRouter);
app.use("/api/results", ResultRouter);
app.use("/api/bloodpressure", BloodPressureRouter);
app.use("/api/reclamation", ReclamationRouter);
app.use("/api/acceleration", AccelerationRouter);
app.use("/api/bodytemperature", BodyTemperatureRouter);
app.use("/api/skintemperature", SkinTemperatureRouter);
app.use("/api/sleepTracking", SleepTrackingRouter);
app.use("/api/cardiacFrequency", CardiacFrequencyRouter);
app.use("/api/vo2max", Vo2maxRouter);





app.listen(PORT, () => console.log("Running"));





