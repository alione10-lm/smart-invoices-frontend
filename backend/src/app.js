import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import { errHandler } from "./middlewares/errHandler.js";
import { notFoundMiddleware } from "./middlewares/notFound.js";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "server is running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/invoice", paymentRoutes);
app.use("/api/", statsRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Invoice Management System API",
    });
});
app.use(notFoundMiddleware);
app.use(errHandler);

export { app };
export default app;
