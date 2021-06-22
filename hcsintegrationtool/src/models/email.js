import mongoose from "mongoose";

const Schema = mongoose.Schema;

// -Creating and defining Mongoose email Model to accomadate the structure of to be scheduled emails

const emailSchema = new Schema({
  _id: String,
  emails: [
    {
      _id: String,
      Info: String,
      FirstName: String,
      LastName: String,
      scheduled_date: String,
    },
  ],

});

const emailModel = mongoose.model("emails", emailSchema);
export { emailModel };

