import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    emailVerified: { type: Boolean },
    image: { type: String },
  },
  { 
    collection: "user", 
    timestamps: true
  } 
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;