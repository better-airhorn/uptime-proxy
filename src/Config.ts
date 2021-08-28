export const Config = {
	port: process.env.PORT,
	ports: {
		pg: 5432,
		redis: 6379,
	},
	url: {
		minio: process.env.MINIO_URL,
	},
};
