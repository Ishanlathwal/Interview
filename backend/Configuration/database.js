const mongoose = require("mongoose");

const connectDatabase = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) =>
      console.log(`Database connected with server ${data.connection.host}`)
    )
    .catch((err) => console.log(err));
};
connectDatabase();
module.exports = connectDatabase;
