import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default dbConnect;
