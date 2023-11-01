import mongoose from "mongoose";


// --- Connections --- //
const DBConnection = async () => {
    try {
        await  mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("DB Connected");
    }
    catch (error) {
        console.log(error);
    }
};

export default DBConnection;