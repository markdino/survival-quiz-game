import Quiz from "@models/quiz";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  const exclude = req.query?.exclude;

  console.log('Query', req.query)

    try {
      await connectToDB();

      const idsToExclude = exclude ? exclude.split(',') : [];

      const quizTotalCount = await Quiz.countDocuments({
        _id: { $nin: idsToExclude },
      });

      if (quizTotalCount === 0) {
        return new Response("No quiz found in the collection after exclusion.", {
          status: 404,
        });
      }

      // Generate a random skip value within the range of the total quizzes count
      const randomSkip = Math.floor(Math.random() * quizTotalCount);

      // Find one quiz with the random skip value and exclude IDs from the array
      const randomQuiz = await Quiz.findOne({ _id: { $nin: idsToExclude } })
        .skip(randomSkip)
        .select("-answer -__v");

      return new Response(JSON.stringify(randomQuiz), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch quiz", { status: 500 });
    }
};
