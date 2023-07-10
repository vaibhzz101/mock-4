const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const {  restaurantRouter } = require("./routes/restaurant.routes");
const orderRouter  = require("./routes/order.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Food Delivery App");
});

app.use("", userRouter);
app.use("",  restaurantRouter);
app.use("", orderRouter);

const PORT = process.env.port || 9090;
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
        console.log("Error to connect the database");
    }
    console.log(`Server listening on port ${PORT}`);
});