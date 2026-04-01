
import { ProductModel } from "@/models/productModel";
import { SortOrder } from 'mongoose';
import connectDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

interface SearchQuery {
    name?: RegExp
    description?: RegExp
}
interface PriceRange {
    $gte: number;
    $lte?: number;
}
interface ItemFilter {
    $or?: SearchQuery[],
    category: string,
    price: PriceRange,
    rating: number,
}



let sortCriteria: { [key: string]: SortOrder } = { createdAt: -1 };
export const GET = async (req: NextRequest) => {
    try {
        await connectDb();
        const query = req.nextUrl.searchParams.get('query');
        const filter: Partial<ItemFilter> = {};
        const currentPage = req.nextUrl.searchParams.get('currentPage') || 1;
        const limitParam = req.nextUrl.searchParams.get('limit') || 0;
        const limit = Number(limitParam) > 0 ? Number(limitParam) : 10;
        const categoryParam = req.nextUrl.searchParams.get('category');
        const priceParam = req.nextUrl.searchParams.get('price');
        const ratingParam = req.nextUrl.searchParams.get('rating');
        const sortParam = req.nextUrl.searchParams.get('sortData');
        const skipParam = (Number(currentPage) - 1) * Number(limitParam) || 0;

        if (query) {
            const searchRegex = new RegExp(query, 'i');
            filter.$or = [
                { name: searchRegex },
                { description: searchRegex },
            ];
        }
      
        if (categoryParam) {
            { filter.category = categoryParam }
        }
        if (priceParam) {
            if (priceParam === '1000-5000') { filter.price = { $gte: 1000, $lte: 5000 }; }
            else if (priceParam === '6000-10000') { filter.price = { $gte: 6000, $lte: 10000 }; }
            else if (priceParam === '>10000') { filter.price = { $gte: 10000 }; }
        }
        if (sortParam) {
            if (sortParam === 'Name_asc') sortCriteria = { name: 1 };
            else if (sortParam === 'Name_dsc') sortCriteria = { name: -1 };
        }
        if (ratingParam) { filter.rating = parseInt(ratingParam); }

        const data = await ProductModel.find(filter).skip(skipParam).limit(Number(limit)).sort(sortCriteria);
        const countPromise = ProductModel.countDocuments({});
        const [items, totalCount] = await Promise.all([data, countPromise]);
        const totalPages = Math.ceil(totalCount / Number(limit));
        const startResult = skipParam + 1;
        const endResult = Math.min(skipParam + limit, totalCount);
        const resultText = `Showing ${startResult}–${endResult} of ${totalCount} results`;

        return NextResponse.json({
            msg: JSON.parse(JSON.stringify(items)), totalPages: totalPages, page: currentPage, total: totalCount, resultText: resultText, currentCount: data.length
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "fail to fetch data", error: (error as Error).message }, { status: 500 });
    }
}


export const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const data = await req.json();
        data.discountPrice = Number(data.price - (data.price * data.discount) / 100);
        await ProductModel.create(data);
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to add new product", error: (error as Error).message }, { status: 500 });
    }
}

