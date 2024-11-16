const mongoose = require("mongoose");
// mongodb://localhost:27017
const URI =
  "mongodb+srv://anas:anas@cluster0.z81xd8p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(URI, () => {
  console.log("Done");
});

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
