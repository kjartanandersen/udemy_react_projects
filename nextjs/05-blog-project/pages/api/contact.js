import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input!" });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    // console.log(newMessage);

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mdfwu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to Database" });
      return;
    }

    const db = client.db();

    try {
      const result = db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Could not insert to Database" });
      return;
    }

    res
      .status(201)
      .json({ message: "Successfully stored message", message: newMessage });
  }
}
