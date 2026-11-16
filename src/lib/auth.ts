import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hire-loop");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["admin", "seeker", "recruiter"],
        required: true,
        defaultValue: "seeker",
      },
    },
  },
   plugins: [
        admin() 
    ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
