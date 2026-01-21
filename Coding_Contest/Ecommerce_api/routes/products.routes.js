import express from "express";
import { readDB, writeDB } from "../utils/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const db = readDB();

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json(newProduct);
});

export default router;
