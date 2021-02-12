const config = {
	port: process.env.PORT || 3000,
	jwtSecret: process.env.JWT_SECRET || 'secret',
	mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/user_crud'
};

export default config;
