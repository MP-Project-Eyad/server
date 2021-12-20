const userModel = require("./../../db/models/user");
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

const Register = async (req, res) => {
  const { email, password, userName, avatar, role } = req.body;
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

  const newUser = new userModel({
    email: lowerEmail,
    password: hashPass,
    passwordCode: "",
    userName,
    avatar,
    activeCode,
    role,
  });
  newUser
    .save()
    .then((result) => {
      transport
          .sendMail({
            from: process.env.EMAIL,
            to: lowerEmail,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
              <h2>Hello ${result.userName}</h2>
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

module.exports = {
    Register,
  };