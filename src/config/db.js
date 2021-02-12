import mongoose from 'mongoose';
import config from './env.js';

const URI = config.mongoURI;
// Connect to MongoDB
mongoose
	.connect(
		URI,
		{useNewUrlParser: true}
	)
	//
	.then(() => console.log("MongoDB successfully connected"))
	// error
	.catch(err => console.log(err));

