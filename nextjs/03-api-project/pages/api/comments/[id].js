
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@/helpers/db-util";

const collection = "comments";

async function handler(req, res) {
  const eventId = req.query.id;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
    return;
  }

  if (req.method === "POST") {
    // Add server side validation
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input!" });
      client.close();
      return;
    }

    console.log(email, name, text);
    const newComment = {
      email: email,
      name: name,
      text: text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, collection, newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added Comment!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const docs = await getAllDocuments(client, collection, { _id: -1 }, {eventId: eventId});
      res.status(200).json({ comments: docs });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }

  client.close();
}
export default handler;
