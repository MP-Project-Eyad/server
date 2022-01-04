const userModel = require("./../../db/models/user");
const foodMenuModel = require("./../../db/models/foodmenu");
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
              <a href=http://localhost:3000/verifyAccount/${result._id}> Click here</a>
              </div>`,
        })
        .catch((err) => console.log(err));
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  const { userName, email, password } = req.body;

  userModel
    .findOne({ $or: [{ email }, { userName }] })
    .then(async (result) => {
      if (result) {
        if (result.email == email || result.userName == userName) {
          const secret = process.env.SECRETKEY;
          const hashedpass = await bcrypt.compare(password, result.password);

          const payload = {
            role: result.role,
            id: result._id,
            username: result.username,
            email: result.email,
          };

          option = {
            expiresIn: "6000000m",
          };

          const token = await jwt.sign(payload, secret, option);

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

const getUser = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const verifyAccount = async (req, res) => {
  const { id, code } = req.body;
  const user = await userModel.findOne({ _id: id });

  if (user.activeCode == code) {
    userModel
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

const checkEmail = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    userModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport.sendMail({
          from: process.env.EMAIL,
          to: result.email,
          subject: "Reset Your Password",
          html: `<h1>Reset Your Password</h1>
                <h2>Hello ${result.userName}</h2>
                <h4>CODE: ${passwordCode}</h4>
                <p>Please enter the code on the following link and reset your password</p>
                <a href=http://localhost:3000/resetPassword/${result._id}> Click here</a>
                </div>`,
        });

        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};

const resetPassword = async (req, res) => {
  const { id, code, password } = req.body;

  const user = await userModel.findOne({ _id: id });
  if (user.id == id) {
    if (user.passwordCode == code) {
      const hashedPassword = await bcrypt.hash(password, SALT);

      userModel
        .findByIdAndUpdate(
          id,
          { password: hashedPassword, passwordCode: "" },
          { new: true }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } else {
      res.status(400).json("Wrong Code...");
    }
  } else {
    res.status(400).json("No User with this id");
  }
};

// Cart
const addToUserCart = (req, res) => {
  const { email, ObjectId } = req.params;
  userModel.findOne({ ObjectId: req.params.ObjectId }).then((user) => {
    userModel
      .findOneAndUpdate(
        { email: email },
        { $push: { cart: ObjectId } },
        { new: true }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

const removeUserCart = (req, res) => {
  const { email, _id } = req.params;
  userModel
    .findOneAndUpdate({ email: email }, { $pull: { cart: _id } }, { new: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getCart = (req, res) => {
  const { email } = req.params;
  userModel
    .find({ email: email })
    .populate("cart")
    .exec()
    .then((result) => {
      res.send(result[0].cart);
    })
    .catch((err) => {
      res.send(err);
    });
};

const postCart = (req, res, next) => {
  const { itemId } = req.body;
  let targetItem;
  if (!itemId) {
    const error = new Error("ItemId not provided");
    error.statusCode = 404;
    throw error;
  }
  foodMenuModel
    .findById(itemId)
    .then((item) => {
      targetItem = item;
      return userModel.findById(req.token.id);
    })
    .then((user) => {
      return user.addToCart(targetItem);
    })
    .then((result) => {
      res.status(200).json({ message: "Item successfully added to cart." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

const getCartQty = (req, res, next) => {
  userModel
    .findById(req.token.id)
    .then((user) => {
      return user.populate("cart.items.itemId");
    })
    .then((user) => {
      const cartItems = user.cart.items;
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice = totalPrice + item.quantity * item.itemId.price;
      });
      res.json({ cart: cartItems, totalPrice: totalPrice });
    })

    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

const cartDelete = (req, res, next) => {
  const itemId = req.body.itemId;
  if (!itemId) {
    const error = new Error("ItemId not provided");
    error.statusCode = 404;
    throw error;
  }
  userModel
    .findById(req.token.id)

    .then((user) => {
      return user.removeFromCart(itemId);
    })
    .then((result) => {
      res.status(200).json({ message: "Item successfully removed from cart." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

const cartUpdate = (req, res, next) => {
  const { itemId } = req.params;
  if (!itemId) {
    const error = new Error("ItemId not provided");
    error.statusCode = 404;
    throw error;
  }
  userModel
    .findById(req.token.id)

    .then((user) => {
      return user.reduceQuantity(itemId);
    })
    .then((result) => {
      res.status(200).json({ message: "Item successfully updated." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  userModel
    .find({ _id: id }, { password: 0, passwordCode: 0 })
    .populate({
      path: "cart.items.itemId",
    })

    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateUser = async (req, res) => {
  // const hashpwd2 = await bcrypt.hash(password, SALT);
  const { email, password, userName, avatar } = req.body;
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(
      id,
      {
        $set: { email, password, userName, avatar },
      },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json(err);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  Register,
  login,
  getUser,
  getUserById,
  updateUser,
  verifyAccount,
  checkEmail,
  resetPassword,
  addToUserCart,
  removeUserCart,
  getCart,
  getCartQty,
  postCart,
  cartDelete,
  cartUpdate,
};
