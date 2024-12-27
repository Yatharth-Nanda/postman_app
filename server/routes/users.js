import { config } from "dotenv";
import fastify from "fastify";
import { StreamChat } from "stream-chat";

config();

const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_PRIVATE_API_KEY
);

export async function userRoutes(app) {
  app.post("/signup", async (req, res) => {
    const { id, name, image } = req.body;

    // Log the incoming request body
    console.log("Received signup request:", { id, name, image });

    if (id == null || id === "" || name == null || name === "") {
      console.log("Invalid input:", { id, name });
      return res.status(400).send("Invalid input");
    }

    try {
      const existingUser = await streamChat.queryUsers({ id });
      if (existingUser.users.length > 0) {
        console.log("User ID has already been taken:", id);
        return res.status(400).send("User ID has already been taken");
      }

      await streamChat.upsertUser({ id, name, image });
      console.log("User created successfully:", { id, name, image });
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).send("Internal server error");
    }
  });

  app.post("/login", async (req, res) => {
    const { id } = req.body;

    // Log the incoming request body
    console.log("Received login request:", { id });

    if (id == null || id === "") {
      console.log("Invalid input:", { id });
      return res.status(400).send("Invalid input");
    }

    try {
      const {
        users: [user],
      } = await streamChat.queryUsers({ id });

      if (user == null) {
        console.log("User not authenticated:", id);
        return res.status(401).send("User not authenticated");
      }

      // Generate a token for the user
      const token = streamChat.createToken(id);

      // Log successful authentication
      console.log("User authenticated successfully:", { id, token });

      // Send the response with the token and user details
      res.status(200).send({
        token,
        user: { name: user.name, id: user.id, image: user.image },
      });
    } catch (error) {
      // Log any errors that occur during the login process
      console.error("Error during login:", error);
      res.status(500).send("Internal server error");
    }
  });
}
