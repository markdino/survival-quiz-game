import { Schema, model, models } from "mongoose";

export const participantSchema = new Schema({
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
});

const Participant =
  models.Participant || model("participant", participantSchema);

export default Participant;
