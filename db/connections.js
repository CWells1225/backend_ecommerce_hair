import mongoose from 'mongoose';

export const mongoConnect = async uri => { 
	try {
		await mongoose.connect(uri);
		console.log('mongoDB connected');
	} catch (error){
		console.log('error connecting to mongoDB', error);
	}
}; 
