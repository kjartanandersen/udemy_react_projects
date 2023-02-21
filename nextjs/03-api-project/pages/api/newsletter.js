
import { insertDocument, connectDatabase } from "@/helpers/db-util";

const collection = "newsletter";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    var validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (validEmailRegex.test(email)) {
      console.log(email);
      let client;
      try {
        client = await connectDatabase();
      } catch (error) {
        res.status(500).json({ message: "Connecting to database failed!" });
        return;
      }

      try {
        await insertDocument(client, collection, { email: email });
        client.close();
      } catch (error) {
        res.status(500).json({ message: "Inserting data failed!" });
        return;
      }

      res.status(200).json({ message: "success!" });
    } else {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
  }
}

export default handler;
