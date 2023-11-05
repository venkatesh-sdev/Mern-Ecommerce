import mongoose from "mongoose";


// --- Connections --- //
const DBConnection = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("DB Connected");
};

export default DBConnection;