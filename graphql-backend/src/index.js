const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { mongoDB } = require('./database/mongoConnection');

const PORT = process.env.port || 4001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
     console.log('MongoDB Connected');
     return server.listen({ port: PORT });
   })
   .then((res) => {
          console.log(`Server running at ${res.url}`);
   })
   .catch(err => {
     console.error(err)
   })
