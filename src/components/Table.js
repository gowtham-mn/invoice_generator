import React from "react";

export default function Table({ list, total}) {
  return (
    <>
      <table width={"100%"}>
        <thead>
          <tr className="bg-gray-100">
            <td className="font-bold ">Description</td>
            <td className="font-bold ">Quantity</td>
            <td className="font-bold ">Price</td>
            <td className="font-bold ">Amount</td>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-xl font-bold mt-4 mr-6">
          Rs. {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}
