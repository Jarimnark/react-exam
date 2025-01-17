import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { addItem, clearCart, removeItem } from "../lib/cartSlice";
import { login, logout } from "../lib/userSlice";

export default function Exam10() {
  const user = useAppSelector((state) => state.user);

  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    price: 0,
    quantity: 1,
  });

  const handleAddItem = () => {
    if (
      newItem.id &&
      newItem.name &&
      newItem.price > 0 &&
      newItem.quantity > 0
    ) {
      dispatch(addItem(newItem));
      setNewItem({ id: "", name: "", price: 0, quantity: 1 }); // Reset the form
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="">
      <div className="p-4 bg-gray-100 rounded shadow-md">
        <h3 className="text-center font-bold m-8 text-3xl">Exam 10</h3>

        {user.isLoggedIn ? (
          <div>
            <h2 className="text-lg font-bold">Welcome, {user.name}</h2>
            <p>{user.email}</p>
            <button
              onClick={() => dispatch(logout())}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              dispatch(
                login({ id: "1", name: "John Doe", email: "john@example.com" })
              )
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        )}
      </div>
      <div className="p-4 bg-gray-100 rounded shadow-md">
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        <div className="mb-4 flex">
          {/* Form to Add Items */}
          <div className="flex flex-col">
            <label className="text-center">Item ID</label>
            <input
              type="text"
              placeholder="Item ID"
              value={newItem.id}
              onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
              className="mr-2 p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-center">Item Name</label>
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="mr-2 p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-center">Item Price</label>
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: Number(e.target.value) })
              }
              className="mr-2 p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-center">Item Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: Number(e.target.value) })
              }
              className="mr-2 p-2 border rounded"
            />
          </div>

          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Item
          </button>
        </div>

        {cart.items.length > 0 ? (
          <div>
            <ul className="border border-black p-4">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-start gap-4 py-2 items-center border-b border-black"
                >
                  <span>
                    Item ID: {item.id} : {item.name} (x{item.quantity})
                  </span>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="bg-red-300 py-1 px-3 rounded-full"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p>Total Items: {cart.totalQuantity}</p>
              <p>Total Price: ${cart.totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Clear Cart
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
