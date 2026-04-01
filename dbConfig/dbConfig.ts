import mongoose from "mongoose";
import {toast} from "sonner";
const connectDb = async() =>{
    const connectionString = process.env.CONNECTION_STRING ?? "mongodb+srv://dhruvipatiwala_db_user:AgvykiY5fjG0dMXc@cluster0.0sojkkw.mongodb.net/Furniture_ECommerce_Application?retryWrites=true&w=majority&appName=Cluster0";
    try {
      await mongoose.connect(connectionString);
      
    } catch (error) {
        toast.error((error as Error).message);
    }
}

export default connectDb;