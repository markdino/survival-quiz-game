import { Schema, model, models } from "mongoose";

export const quizSchema = new Schema({
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
  },
  type: {
    type: String,
    required: [true, "Type is required. e.g.('poll' or 'qna')"]
  }
});

const Quiz = models.Quiz || model("Quiz", quizSchema);

export default Quiz;
