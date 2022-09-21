const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt =require ('jsonwebtoken')

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const doesExist = await User.findOne({ email: req.body.email });
  if (!doesExist) res.status(400).send({ message: "Email Not found !" });
  else {
    const passwordMatch = await bcrypt.compare(req.body.password, doesExist.password);

    if (!passwordMatch) {
        res.status(400).send({ message: "Password incorrect" });

    } else {
        const token=jwt.sign({_id:doesExist._id,email:doesExist.email},process.env.TOKEN_SECRET,{
            expiresIn:'24h'
        });
        res.header('auth-token',token).send({ message:"You are a "+doesExist.role , token:token, user:doesExist});



    }
  }
};
