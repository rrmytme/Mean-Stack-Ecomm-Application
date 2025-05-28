const exprss = require("express");
const app = exprss();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const connectDatabase = require("./config/connectDB");

connectDatabase();
// exoress.json() is used to parse incoming JSON requests
app.use(exprss.json());

app.use("/api/v1/", productRoutes);
app.use("/api/v1/", orderRoutes);
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
