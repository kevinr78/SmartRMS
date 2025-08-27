import mongoose from 'mongoose'

const clientOptions = {dbName:"flatmate_os", serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    const uri = process.env.MONGODB_URI;
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    console.log(process.env.NODE_ENV)
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

mongoose.connection.on('error',(err) =>{
  console.log(err);
})

export default run;
