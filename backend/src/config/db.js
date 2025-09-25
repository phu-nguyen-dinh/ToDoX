import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_CONNECTION_STRING
        );
        console.log("Connect to DB successful");
    } catch (error) {
        console.log("failed to connect to DB: ", error);
        process.exit(1); // exit with error
    }
}