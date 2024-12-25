const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Feedback storage (in-memory)
const feedbacks = [];

// Cart storage (in-memory)
const orders = [];

// Routes
app.post("/feedback", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email, and message are required!" });
  }

  feedbacks.push({ name, email, phone, message });
  res.status(200).json({ message: `Thank you, ${name}, for your feedback!` });
});

app.post("/order", (req, res) => {
  const { cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart cannot be empty!" });
  }

  orders.push({ cart, date: new Date() });
  res.status(200).json({ message: "Order placed successfully!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
