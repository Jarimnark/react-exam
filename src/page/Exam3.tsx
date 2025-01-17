import { useState } from "react";

interface Item {
    id: string;
    value: string;
};


export default function Exam3() {
    const itemStorage = JSON.parse(localStorage.getItem("items") || "[]")
    const [items, setItems] = useState<Item[]>(itemStorage);
    const [inputValue, setInputValue] = useState("");
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    // Create
    const createItem = () => {
        const newItem: Item = {
            id: Date.now().toString(),
            value: inputValue,
        };

        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        localStorage.setItem("items", JSON.stringify(updatedItems));
        setInputValue("");
    };

    // Show Details
    const showItemDetails = (id: string) => {
        const item = items.find((item) => item.id === id);
        if (item) {
            setSelectedItem(item);
        }
    };

    // Update
    const updateItem = (id: string, newValue: string) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, value: newValue } : item
        );
        setItems(updatedItems);
        localStorage.setItem("items", JSON.stringify(updatedItems));
    };

    // Delete
    const deleteItem = (id: string) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem("items", JSON.stringify(updatedItems));
    };

    return (
        <div className="p-4">
            <h3 className="text-center font-bold m-8 text-3xl">Exam 3</h3>


            {/* Create */}
            <div className="p-4 border border-black flex flex-col justify-center gap-6 rounded-2xl mb-4">
                <h4 className="text-center font-bold text-xl">Create</h4>
                <div className="flex justify-center gap-6">

                    <input
                        className="border border-black rounded-lg ps-4 py-1"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter a value"
                    />
                    <button className="bg-slate-500 text-white font-bold py-1 px-4 rounded-full hover:bg-slate-700 " onClick={createItem}>Add Item</button>
                </div>
            </div>

            {/* Display Items */}
            <div className="p-4 border border-black flex justify-between gap-6 rounded-2xl flex-col md:flex-row">

                <ul className="p-4 border border-black flex flex-col justify-center gap-6 rounded-2xl">
                    <div className="">

                        <h4 className="text-center font-bold text-xl">List</h4>
                        <div className="w-full text-center">edit value in input</div>

                    </div>
                    {items.map((item) => (
                        <li key={item.id} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <input className="border border-black rounded-lg ps-4 py-1"
                                type="text"
                                value={item.value}
                                onChange={(e) => updateItem(item.id, e.target.value)}
                            />
                            <div className="gap-4 flex">

                                <button className="bg-slate-500 text-white font-bold py-1 px-4 rounded-full hover:bg-slate-700 " onClick={() => deleteItem(item.id)}>Delete</button>
                                <button className="bg-slate-500 text-white font-bold py-1 px-4 rounded-full hover:bg-slate-700 " onClick={() => showItemDetails(item.id)}>Show Details</button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Display Selected Item Details */}

                <div className="flex-1   border border-black rounded-lg p-4">
                    <h2>Item Details</h2>
                    <p><strong>ID:</strong> {selectedItem?.id || '-'}</p>
                    <p><strong>Value:</strong> {selectedItem?.value || '-'}</p>
                </div>

            </div>
        </div>


    );
}