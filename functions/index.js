const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require('stripe')('sk_test_51JOeSiL2g1Ssnpnkk1zmHF7oWNZW4qsPMo34dPmJGqkuvNlBfQBHF48BikxEshgt9gOrombsQGCvX6T97659QGWn00DtTweSo5');

const app = express();

app.use(cors({
  origin: true,
}));

app.use(express.json());

app.post('/payments/create',  async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: 'CZK'
    });

    res
      .status(200)
      .send(paymentIntent.client_secret);

  } catch (err) {
    res
      .status(500)
      .json({
        statusCode: 500,
        message: err.message
      });
  }
})

app.get("*", (req, res) => {
    res
     .status(404)
     .send("404, Not found.");
});

exports.api = functions.https.onRequest(app);

// exports.app = functions.https.onRequest(app);

// emergency code
// gkvp-qwbl-dccg-jbam-tgoc