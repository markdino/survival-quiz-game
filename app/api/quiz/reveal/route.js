import Quiz from "@models/quiz";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { id } = await req.json();

  try {
    await connectToDB();
    // Find spicific quiz by it's ID and select only the answer field
    const answer = await Quiz.findById(id).select("answer");

    if (!answer)
      return new Response("Quiz not found or invalid", { status: 404 });

    return new Response(JSON.stringify(answer), { status: 200 });
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to reveal quiz's answer", { status: 500 });
  }
};
