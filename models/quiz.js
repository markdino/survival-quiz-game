import { Schema, model, models } from "mongoose";

const quizSchema = new Schema({
  question: {
    type: String,
    unique: [true, "Question already exists!"],
    required: [true, "Question is required!"],
  },
  choices: {
    type: [String],
    required: [true, "Choices is required!"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required!"],
  },
});

const Quiz = models.Quiz || model("quiz", quizSchema);

export default Quiz;
