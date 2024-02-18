import { Account, Client } from "node-appwrite";

const client = new Client();

client.setEndpoint(process.env.APPWRITE_ENDPOINT || "");
client.setProject(process.env.APPWRITE_PROJECT || "");
client.setKey(process.env.APPWRITE_KEY || "");

const account = new Account(client);

export { client, account };
