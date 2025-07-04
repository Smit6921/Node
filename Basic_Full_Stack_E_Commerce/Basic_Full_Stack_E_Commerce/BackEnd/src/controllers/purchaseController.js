const Purchase = require("../models/Purchase");

exports.addPurchase = async (req, res) => {
  try {
    const { name, price, time } = req.body;
    const newPurchase = new Purchase({ name, price, time });
    await newPurchase.save();
    res.status(201).json({ message: "Purchase saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving purchase" });
  }
};

exports.getAllPurchases = async (req, res) => {
  const purchases = await Purchase.find().sort({ time: -1 });
  res.json(purchases);
};
