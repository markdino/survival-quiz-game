import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    // Find all users
    const users = await User.find().select("-__v");

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch users", { status: 500 });
  }
};

export const POST = async (req) => {
  const userPayload = await req.json();
  const id = userPayload.id;

  try {
    await connectToDB();

    const user = await User.findById(id);

    // If user doesn't exist, register user and return data
    if (!user) {
      const newUser = new User(userPayload);
      await newUser.save();
      return new Response(JSON.stringify(newUser), { status: 201 });
    }

    // If user exist, update lastLogin and save
    user.lastLogin = new Date();
    await user.save();

    // Then return the data
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      // Handle unique constraint violation (duplicate key error)
      const field = Object.keys(error.keyPattern)[0];
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already taken!`;
      console.error({ error: message });
      return new Response(JSON.stringify({ error: message }), { status: 400 });
    } else if (error.name === "ValidationError") {
      // Handle validation errors (e.g., "required" errors)
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );
      console.error({ error: validationErrors });
      return new Response(JSON.stringify({ error: validationErrors }), {
        status: 400,
      });
    } else {
      // Handle other errors
      console.error("Error saving user:", error);
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 500,
      });
    }
  }
};
