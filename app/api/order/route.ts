import { orderModel } from "@/models/orderModel";
import connectDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "@/models/productModel";
import mongoose from "mongoose";
import {toast} from "sonner";
interface OrderItemType {
    itemID: string;
    name: string;
    price: string;
    image: string;
    quantity: string;
}
export const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const data = await req.json();
        const productIds = data.orderItems.map((item: OrderItemType) => item.itemID);
        const products = await ProductModel.find({
            _id: { $in: productIds }
        });

        for (const item of data.orderItems) {
            const product = products.find(
                p => p._id.toString() === item.itemID.toString()
            );
            if (!product || product.stock < item.quantity) {
                toast.error("Not enough stock");
            }
        }

        const operations = data.orderItems.map((item: OrderItemType) => ({
            updateOne: {
                filter: { _id: item.itemID },
                update: {
                    $inc: {
                        stock: -item.quantity,
                        totalsold: item.quantity
                    }
                }
            }
        }));

        await ProductModel.bulkWrite(operations);
        data.totalPrice = Number(data.itemsPrice + data.taxPrice);
        const order = await orderModel.create(data);
        if (order) {
            return NextResponse.json({ msg: `Your order is successfully placed ` }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ msg: "fail to place new order", error: (error as Error).message }, { status: 500 });
    }
}



export const GET = async (req: NextRequest) => {
    try {
        let DateFormat = "%Y-%m-%d";
        const type = req.nextUrl.searchParams.get('type');
        const userID = req.nextUrl.searchParams.get('userID');


        if (type) {
            if (type === 'DateWise') {
                DateFormat = '%Y-%m-%d';
            } else if (type === 'MonthWise') {
                DateFormat = '%Y-%m';
            } else if (type === 'YearWise') {
                DateFormat = '%Y';
            }
        }
        else {
            DateFormat = '%Y-%m-%d';
        }

        await connectDb();
        const data = await orderModel.find();
        const countPromiseOfTotalOrders = orderModel.countDocuments({});
        const [orders, totalOrders] = await Promise.all([data, countPromiseOfTotalOrders]);

        const totalSales = await orderModel.aggregate([
            {
                $match: { isPaid: true }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" }
                }
            },
        ]);

        let userOrderItem;
        if (userID) {
            userOrderItem = await orderModel.aggregate([

                {
                    $match: {
                        user: new mongoose.Types.ObjectId(userID)
                    }
                },

                { $unwind: "$orderItems" },

                {
                    $project: {
                        user: 1,
                        createdAt: 1,
                        isDelivered: 1,
                        "orderItems.name": 1,
                        "orderItems.price": 1,
                        "orderItems.quantity": 1,
                        "orderItems.image": 1,
                        subtotal: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } },
                    }
                },

                {
                    $group: {
                        _id: {
                            user: "$user",
                            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                        },
                        totalOrderAmount: { $sum: "$subtotal" },
                        items: { $push: "$orderItems" },
                        createdAt: { $first: "$createdAt" },
                        isDelivered: { $first: "$isDelivered" },
                    }
                },

                { $sort: { createdAt: -1 } }
            ]);
        }

        const DeliveredProducts = await orderModel.aggregate([

            { $match: { isDelivered: true } },
            { $unwind: "$orderItems" },
            {
                $group: {
                    _id: "$orderItems.itemID",
                    name: { $first: "$orderItems.name" },
                    pricePerUnit: { $first: "$orderItems.price" },
                    totalSold: { $sum: "$orderItems.quantity" },
                    image: { $first: "$orderItems.image" },
                    totalRevenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } },
                    shippingAddresses: { $first: "$shippingAddress.address" },
                    DeliverTime: { $first: "$createdAt" },
                    status: { $first: "Delivered" }
                }
            }
        ]);

        const countPromiseOfTotalPending = orderModel.countDocuments({ isDelivered: false });
        const [pendingOrders, totalPending] = await Promise.all([data, countPromiseOfTotalPending]);
        const salesData = await orderModel.aggregate([
            {
                $match: { isPaid: true }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: DateFormat,
                            date: "$createdAt"
                        }
                    },
                    totalPrice: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return NextResponse.json({ msg: salesData, totalOrders: totalOrders, totalSales: totalSales, totalPending: totalPending, DeliveredProducts: DeliveredProducts, userOrderItem: userOrderItem });
    } catch (error) {
        return NextResponse.json({ msg: "fail to fetch data", error: (error as Error).message }, { status: 500 });
    }
}


