const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");

const app = express();
app.use(express.json());
app.use(cors());

const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

const userRouter = require("./routers/routes/user");
app.use(userRouter);

const companyRouter = require("./routers/routes/company");
app.use(companyRouter);

const restaurantRouter = require("./routers/routes/restaurant");
app.use(restaurantRouter);

const foodmenuRouter = require("./routers/routes/foodmenu");
app.use(foodmenuRouter);

const orderRouter = require("./routers/routes/order");
app.use(orderRouter);

const offersRouter = require("./routers/routes/offers");
app.use(offersRouter);

const paymentRouter = require("./routers/routes/payment");
app.use(paymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER RUN ON PORT${PORT}`);
});
