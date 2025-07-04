const mongoose = require("mongoose");

const connectDatabase = async () => {
  mongoose
    .connect("mongodb://localhost:27017/interview")
    .then((data) =>
      console.log(`Database connected with server ${data.connection.host}`)
    )
    .catch((err) => console.log(err));
};
connectDatabase();
module.exports = connectDatabase;
