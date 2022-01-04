const stripe = require("stripe")(
    "sk_test_51KDoaoKS7J2XInRQb0foitAjDhiCxowPM8iu1QnP5gVfi56J2hVKwFDijWEzoWypVDA0pLNj0HxdKkjzXyrlfyLj00paFmJsRA"
)
  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  
  // Payment
  const payment = async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  };
  
  module.exports = { payment };