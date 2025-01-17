import usePaginator, { PaginationOptions, PaginationResponse } from "../lib/usePaginator";

interface DummyJSONProduct {
    "id": number;
    "title": string;
    "description": string;
    "category": string;
    "price": number;
    "discountPercentage": number;
    "rating": number;
    "stock": number;
    "tags": string[];
    "brand": string;
    "sku": string;
    "weight": number;
    "dimensions": {
        "width": number;
        "height": number;
        "depth": number;
    },
    "warrantyInformation": string;
    "shippingInformation": string;
    "availabilityStatus": string;
    "reviews":
    {
        "rating": number
        "comment": string;
        "date": Date;
        "reviewerName": string;
        "reviewerEmail": string;
    }[];
    "returnPolicy": string;
    "minimumOrderQuantity": number
    "meta": {
        "createdAt": Date;
        "updatedAt": Date;
        "barcode": string;
        "qrCode": string;
    },
    "images": string[];
    "thumbnail": string;
}

interface ProductDummy {
    products: {
        id: number;
        title: string;
        price: number;
    }[];
    total: number;
    skip: number;
    limit: number;
}

const fetchApi = async ({ limit, skip }: PaginationOptions): Promise<PaginationResponse<{
    id: number;
    title: string;
    price: number;
}>> => {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`);
    const data = await response.json();
    return {
        data: data.products,
        total: data.total,
    };
};

export default function Exam2() {
    const { data, currentPage, totalPages, isLoading, error, nextPage, prevPage, goToPage, refresh } = usePaginator(fetchApi);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3 className="text-center font-bold m-8 text-3xl">Exam 2</h3>

            <ul className="border border-black">
                {data.map((item, index) => (
                    <li className="text-center my-6" key={index}>item no.{item.id} - {item.title} - ${item.price}</li>
                ))}
            </ul>
            <div className=" flex justify-center mt-4">

                <div className="border border-black py-4 px-8 flex justify-center gap-6 items-center rounded-xl">

                    <button className="bg-slate-500 py-1 px-3 rounded-md" onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span className="underline">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button className="bg-slate-500 py-1 px-3 rounded-md" onClick={nextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}