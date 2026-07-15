import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './graphQL/schema/typeDefs.js';
import { resolvers } from './graphQL/resolvers/resolvers.js';
import dotenv from 'dotenv'

dotenv.config()

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
    const app = express();
    const server = new ApolloServer({
      typeDefs,
      resolvers
    })
    await server.start()
    app.use(
      '/graphql',
      cors(),
      express.json(),
      expressMiddleware(server)
    );

    const PORT = process.env.PORT;
    app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT}`)
      console.log(`GraphQL running on http://localhost:${PORT}/graphql`);
    })
  } catch (error) {
    console.error('Server Error', error);
  }
};
startServer();