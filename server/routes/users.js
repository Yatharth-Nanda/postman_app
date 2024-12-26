import fastify from "fastify";
import { StreamChat } from "stream-chat";

const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_PRIVATE_API_KEY
);

export async function userRoutes(app) {
  app.post("/signup", async (req, res) => {
    const { id, name, image } = req.body;
    if (id == null || id === "" || name == null || name === "") {
      return res.status(400).send("Invalid input");
    }

    const existingUser = await streamChat.queryUsers({ id });
    if (existingUser.users.length > 0) {
      return res.status(400).send("User ID has already been taken  ");
    }

    await streamChat.upsertUser({ id, name, image });
  });
}
