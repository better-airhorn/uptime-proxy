import 'dotenv/config';
import { createServer } from 'http';
import { connect } from 'net';
import restana from 'restana';
import { Config } from './Config';
import { getSubLogger } from './utils/Logger';

const log = getSubLogger('http');

const service = restana({
	server: createServer(),
	errorHandler: (err, req, res) => {
		log.error(err, req.body);
		res.send(500);
	},
});

service.getServer().listen(Config.port, () => {
	log.info('web server listening on port', Config.port);
});

service.get('/service/postgres', async (req, res) => {
	res.send((await connectPort(Config.ports.pg)) ? 200 : 503);
});

service.get('/service/redis', async (req, res) => {
	res.send((await connectPort(Config.ports.redis)) ? 200 : 503);
});

function connectPort(port: number) {
	return new Promise<boolean>(res => {
		const socket = connect(port);
		let connected = false;
		socket.once('connect', () => {
			connected = true;
			socket.destroy();
		});
		socket.once('error', () => {
			socket.destroy();
		});
		socket.once('close', () => {
			res(connected);
		});

		setTimeout(() => res(false), 10_000);
	});
}
