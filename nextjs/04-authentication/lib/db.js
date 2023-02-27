import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://dbAdmin:Pass.123@kjartancluster.mdfwu.mongodb.net/auth-demo?retryWrites=true&w=majority');

  return client;

};

