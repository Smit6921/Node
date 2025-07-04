const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");


router.post("/", async (req, res) => {
  try {
    const { userId, name, price, time } = req.body;

    if (!userId || !name || !price || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPurchase = new Purchase({ userId, name, price, time });
    await newPurchase.save();
    res.status(201).json({ message: "Purchase stored successfully" });
  } catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.find({ userId });
    res.json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;    