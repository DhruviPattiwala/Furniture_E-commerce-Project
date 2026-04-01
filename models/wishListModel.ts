import mongoose from "mongoose";
const wishListSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        wishListItems: 
            [
                { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
            ],
        
    },
    { timestamps: true }
);

export const wishListModel = mongoose.models.wishList || mongoose.model("wishList", wishListSchema);
