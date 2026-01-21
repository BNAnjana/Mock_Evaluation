import express from "express";

import productsRouter from "./routes/products.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";

const PORT = 3000;
const app = express();
app.use(express.json());

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/analytics", analyticsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});