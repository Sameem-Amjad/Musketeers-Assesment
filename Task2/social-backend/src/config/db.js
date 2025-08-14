import mongoose from "mongoose";
const ConnectToMongoDB = () => {
    const db = process.env.MONGODB_URI;
    mongoose
        .connect(db)
        .then((result) => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.log("An error starting database occurred");
        });
}

export default ConnectToMongoDB;
