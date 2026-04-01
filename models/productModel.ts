import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: { type: String },
        image: { type: String },
        category: { type: ObjectId, ref: "categories" },
        description: { type: String },
        rating: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        stock: { type: Number, default: 5 },
        totalsold: { type: Number,  default: 0 },
        discount: { type: Number, default: 0 },
        discountPrice: { type: Number,  default: 0 },
        status: { type: String, default: 'old' },
    },
    { timestamps: true }
);

export const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);
