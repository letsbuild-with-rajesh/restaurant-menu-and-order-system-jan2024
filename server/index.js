const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose')
const { resolvers } = require('./resolvers')
const { typeDefs } = require('./schema')

const config = require('config');
const PORT = config.get('PORT');
const DATABASE_URI = config.get('DATABASE_URI');

(async () => {
	const server = new ApolloServer({ typeDefs, resolvers });
	const { url } = await startStandaloneServer(server, {
		context: async ({ req }) => ({ token: req.headers.token }),
		listen: { port: PORT },
	});
	console.log(`Server ready at ${url}`);
})();

mongoose.connect(DATABASE_URI)
mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${DATABASE_URI}`)
})
