import { Schema, model, models } from "mongoose";
import { participantSchema } from "@model/participant";
import { quizSchema } from "@model/quiz";
import nanoId from "nano-id";

export const roomSchema = new Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
    default: nanoId(13),
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
    type: [participantSchema],
    default: [],
  },
  currentQuiz: {
    type: quizSchema,
  },
  archivedQuiz: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const Room = models.Room || model("room", roomSchema);

export default Room;
