import mongoose from 'mongoose';

const connectDb = (handler) => async (req, res) => {
  try {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    return handler(req, res);
  } catch (error) {
    console.error('connectDB failed: ', error);
  }
};

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to mongo');
});

export default connectDb;

/* whitelist allow all public ip's temp to work */
