import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function TableForm({
  description,
  setDescription,
  quantity,
  setQuantity,
  price,
  setPrice,
  amount,
  setAmount,
  setList,
  list,
  total,
  setTotal,
}) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const updateAmount = () => {
      setAmount(price * quantity);
    };
    updateAmount();
  }, [price, quantity, setAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !quantity || !price) {
      alert("Please, fill in all inputs");
    } else {
      isEditing && setIsEditing(false);
      setList((prev) => [
        ...prev,
        { id: uuidv4(), description, quantity, price, amount },
      ]);
      setTotal((prev) => prev + parseInt(amount));
      setDescription("");
      setPrice("");
      setQuantity("");
    }
  };

  const editRow = (id) => {
    const editingRow = list.find((l) => l.id === id);
    deleteRow(id);
    setIsEditing(true);
    setTotal((prev) => prev - parseInt(editingRow.amount));
    setDescription(editingRow.description);
    setPrice(editingRow.price);
    setQuantity(editingRow.quantity);
  };

  const deleteRow = (id) => {
    setList(list.filter((l) => l.id !== id));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:mt-16">
          <label htmlFor="description">Item descripiton</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>

        <div className="md:grid grid-cols-3 gap-10">
          <div className="flex flex-col">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <p>{amount}</p>
          </div>
        </div>
        <button
          type="submit"
          className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500
             hover:bg-transparent hover:text-blue-500 transition-all duration-300"
        >
          {isEditing ? "Editng Row Item" : "Add Table Item"}
        </button>
      </form>

      {/* Table items */}
      {list && (
        <>
          <table width={"100%"} className="mb-6">
            <thead>
              <tr className="bg-gray-100">
                <td className="font-bold ">Description</td>
                <td className="font-bold ">Quantity</td>
                <td className="font-bold ">Price</td>
                <td className="font-bold ">Amount</td>
                <td className="font-bold ">Delete / Edit</td>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.amount}</td>
                  <td className="flex gap-12">
                    <button onClick={() => deleteRow(item.id)}>
                      <AiOutlineDelete className="text-red-500 font-bold" />
                    </button>

                    <button onClick={() => editRow(item.id)}>
                      <AiOutlineEdit className="text-green-500 font-bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h2 className="flex items-end justify-end text-gray-800 text-xl font-bold mr-6">
              Rs. {total.toLocaleString()}
            </h2>
          </div>
        </>
      )}
    </>
  );
}
