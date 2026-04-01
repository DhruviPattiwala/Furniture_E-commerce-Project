import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      first_name: { type: String },
      last_name: { type: String },
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    companyName: { type: String },
    orderItems: [
      {
        
        itemID: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        

      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
      default : "Cash On Delivery"
    },

    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 500,
    },

    totalPrice: {
      type: Number,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
      default : Date.now()
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
      default : Date.now()
    },
  },
  {
    timestamps: true,
  }
);

export const orderModel =mongoose.models.Order || mongoose.model("Order", orderSchema);


