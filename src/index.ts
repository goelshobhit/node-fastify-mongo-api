import * as fastify from 'fastify';
import mongoose from 'mongoose';
import routes from './routes';
import { config } from './config';
const env = process.env.NODE_ENV;

// Configure App
const app = fastify.default({ logger: true });

routes.forEach(route => {
	app.route(route);
});

const start = async (): Promise<void> => {
	try {
		await app.listen({ port: config.app.port, host: '0.0.0.0' });
	} catch (err) {
		// app.log.error(err);
		process.exit(1);
	}
};
start();

export default app;

// Configure DB
if (env !== 'test') {
	mongoose
		.connect('mongodb+srv://Intuit:Tc6taH4gd6PucLzf@cluster0.mzzpd.mongodb.net/prisma?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => app.log.info('MongoDB connected...'))
		.catch(err => app.log.error(err));
}
