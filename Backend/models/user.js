const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  emailId: {
    type: String,
   

  },
  DOB: {
    type: Date,
  },
  phoneNo: {
    type: Number,
  },
 
});

module.exports = downloader = mongoose.model("downloaders", UserSchema);
