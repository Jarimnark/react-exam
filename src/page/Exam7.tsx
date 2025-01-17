import { useEffect, useState } from "react";


export default function Exam7() {
  const [data, setData] = useState<{ id: number; title: string; price: number }[]>([]);
  const [page, setPage] = useState(0); // Page number to calculate skip
  const [loading, setLoading] = useState(false);

  // Fetch data from the dummyjson API
  const fetchData = async () => {
    setLoading(true);
    const limit = 5;
    const skip = page * limit; // Calculate skip based on page
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`
    );
    const result = await response.json();
    setData((prevData) => [...prevData, ...result.products]);
    setLoading(false);
  };

  // Fetch initial data and subsequent pages
  useEffect(() => {
    fetchData();
  }, [page]);

  // Handle scroll event
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage((prevPage) => prevPage + 1); // Increment page
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [loading]);

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h3 className="text-center font-bold m-8 text-3xl">Exam 7</h3>
      <h1 className="text-2xl font-bold mb-6 text-center">Infinite Scroll Example</h1>
      <ul className="space-y-4">
        {data.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md border border-gray-200 transition-shadow"
          >
            <div className="text-lg font-medium text-gray-800">{item.title}</div>
            <div className="text-sm text-gray-600">${item.price.toFixed(2)}</div>
          </li>
        ))}
      </ul>
      {loading && (
        <p className="text-center mt-6 text-gray-500">Loading more items...</p>
      )}
    </div>
  );
}