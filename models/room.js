import { Schema, model, models } from "mongoose";
// import { participantSchema } from "./participant";

export const roomSchema = new Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
    required: [true, "Room code is required!"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator ID is required!"],
  },
  answer: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: false,
  },
  started: {
    type: Boolean,
    default: false,
  },
  participants: {
    type: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: [true, "User ID is required!"],
        },
        answer: {
          type: String,
          default: "",
        },
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    default: [],
  },
  currentQuiz: {
    type: String,
    ref: "Quiz",
  },
  archivedQuiz: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const Room = models.Room || model("Room", roomSchema);

export default Room;
