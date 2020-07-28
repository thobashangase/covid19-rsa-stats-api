const dbConfig = require("../configuration/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.provincialStats = require("./provincialStats")(mongoose);

module.exports = db;

// import provincialStats from "./provincialStats";

// const connectDb = () => {
//   return mongoose
//     .connect(process.env.DATABASE_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("Connected to the database!");
//     })
//     .catch((err) => {
//       console.log("Cannot connect to the database!", err);
//       process.exit();
//     });
// };

// const models = { provincialStats };

// export { connectDb };

// export default models;
