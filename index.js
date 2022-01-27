if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = require("./api/app");
const helmet = require("helmet");
const ExpressError = require("./utils/ExpressError");
const mongoose = require("mongoose");
const cron = require("node-cron");

const DB_URL =
  process.env.DB_URL || "mongodb://localhost:27017/TeamUAV_Backend";
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE IS NOW CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(helmet());

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  console.log("hi");
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER IS SERVING ON PORT ${PORT}`);
});

//cron job to keep the server alive

const cronTask = cron.schedule("*/25 * * * *", () => {
  const req = require("request");
  const opts = {
    method: "GET",
    url: "http://localhost:3000/client/heartbeat",
  };
  req(opts, (err, res) => {
    if (err) next(new ExpressError("Server not working", 500));
  });
});

cronTask.start();
