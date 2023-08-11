import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [
      function () {
        return !this.isGuest;
      },
      "Email already exists!",
    ],
    required: [
      function () {
        return !this.isGuest;
      },
      "Email is required!",
    ],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username already taken!"],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  },
  isGuest: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    default: new Date(),
  },
});

const User = models.User || model("User", UserSchema);

export default User;
