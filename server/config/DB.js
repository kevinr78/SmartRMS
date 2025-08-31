import mongoose from 'mongoose';

const clientOptions = {
  dbName: "flatmate_os", 
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    
    await mongoose.connect(uri, clientOptions);
    console.log("You successfully connected to MongoDB!");

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    // Exit process with failure
    process.exit(1); 
  }
};

mongoose.connection.on('error', (err) => {
  console.log(err);
});

export default connectDB;