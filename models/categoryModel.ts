import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    unique: true,
  },
  image : String
});

const  categoryModel = mongoose.models.Categories || mongoose.model("Categories", categorySchema);
export default categoryModel
