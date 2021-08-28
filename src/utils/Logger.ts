import { createLogger, LogLevelString } from 'bunyan';

export const logger = createLogger({ name: 'ba', level: 'debug' as LogLevelString });

export function getSubLogger(source: string) {
	return logger.child({ module: source });
}
