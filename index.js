import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import "dotenv/config";

const MONGODBKEY = process.env.MONGODB;

const wreathSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  diameter: Number,
});

export const Wreath = model("Wreath", wreathSchema);

const typeDefs = gql`
  type Query {
    getWreaths: [Wreath]
    getWreathById(ID: ID!): Wreath!
  }

  type Wreath {
    name: String
    description: String
    price: Int
    diameter: Int
  }
`;

const resolvers = {
  Query: {
    async getWreaths() {
      return await Wreath.find({});
    },
    async getWreathById(_, { id }) {
      return await Wreath.findById(id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//You want your apollo-server to interact with Mongoose by passing in your MongoDB URI
mongoose
  .connect(MONGODBKEY, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected Successfully");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running on port ${res.url}`);
  });
