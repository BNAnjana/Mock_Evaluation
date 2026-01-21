import express from "express";
import { readDB } from "../operations/db.js";

const router = express.Router();

router.get("/allorders", (req, res) => {
  const { orders } = readDB();
  let count = 0;

  orders.forEach(() => count++);

  res.json({ count, orders });
});

router.get("/cancelled-orders", (req, res) => {
  const cancelled = readDB().orders.filter(o => o.status === "cancelled");
  res.json({ count: cancelled.length, orders: cancelled });
});