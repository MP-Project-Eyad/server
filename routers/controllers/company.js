const companyModel = require("./../../db/models/company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// const { options } = require("../routes/role");
const SALT = Number(process.env.SALT);

require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const companyRegister = async (req, res) => {
  const { email, password, Name, avatar, Restaurant } = req.body;
  const lowerEmail = email.toLowerCase();
  //   console.log(req.token);
  //   console.log(req);
  const hashPass = await bcrypt.hash(password, SALT);
  let activeCode = "";
  const characters = "0123456789";
  for (let i = 0; i < 4; i++) {
    activeCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  const newCompany = new companyModel({
    email: lowerEmail,
    password: hashPass,
    passwordCode: "",
    Name,
    avatar,
    activeCode,
  });
  newCompany
    .save()
    .then((result) => {
      transport
        .sendMail({
          from: process.env.EMAIL,
          to: lowerEmail,
          subject: "Please confirm your account",
          html: `<h1>Email Confirmation</h1>
              <h2>Hello ${result.Name}</h2>
              <h4>CODE: ${activeCode}</h4>
              <p>Thank you for registering. Please confirm your email by entring the code on the following link</p>
              <a href=http://localhost:3000/verify_account/${result._id}> Click here</a>
              </div>`,
        })
        .catch((err) => console.log(err));
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const companyLogin = (req, res) => {
  const { Name, email, password } = req.body;

  companyModel
    .findOne({ $or: [{ email }, { Name }] })
    .then(async (result) => {
      if (result) {
        //   console.log(result);
        if (result.email == email || result.Name == userName) {
          const secret = process.env.SECRETKEY;
          const hashedpass = await bcrypt.compare(password, result.password);
          // console.log(hashedpass);
          // console.log(secret);
          const payload = {
            role: result.role,
            id: result._id,
            name: result.Name,
            email: result.email,
          };
          console.log(result.Name);
          option = {
            expiresIn: "6000000m",
          };

          const token = await jwt.sign(payload, secret, option);
          // console.log("thistoken",token);
          if (hashedpass) {
            if (result.active == true) {
              res.status(200).json({ result, token });
            } else {
              res.status(404).json("Active your Account");
            }
          } else {
            res.status(404).json("worng email or password");
          }
        } else {
          res.status(404).json("worng email or password");
        }
      } else {
        res.status(400).json("email or UserName does not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const verifyAccountComp = async (req, res) => {
  const { id, code } = req.body;

  const user = await companyModel.findOne({ _id: id });
  console.log(user);
  if (user.activeCode == code) {
    companyModel
      .findByIdAndUpdate(id, { active: true, activeCode: "" }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong code..");
  }
};

const getCompany = (req, res) => {
  companyModel
    .find({})
    .populate("Restaurant")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  companyRegister,
  companyLogin,
  verifyAccountComp,
  getCompany,
};
