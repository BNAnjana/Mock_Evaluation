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

router.get("/shipped", (req, res) => {
  const shipped = readDB().orders.filter(o => o.status === "shipped");
  res.json({ count: shipped.length, orders: shipped });
});

router.get("/total-revenue/:productId", (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id == req.params.productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const totalRevenue = db.orders
    .filter(o => o.productId == product.id && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0);

  res.json({ productId: product.id, totalRevenue });
});

router.get("/alltotalrevenue", (req, res) => {
  const db = readDB();

  const totalRevenue = db.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => {
      const product = db.products.find(p => p.id === o.productId);
      return sum + o.quantity * product.price;
    }, 0);

  res.json({ totalRevenue });
});

export default router;